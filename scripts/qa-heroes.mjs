import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BKC_PREVIEW_URL || 'http://127.0.0.1:4321';
const output = path.resolve('docs/heroes');
await mkdir(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const results = [];
const ensure = (value,message) => { if (!value) throw new Error(message); };
const slugs = ['kontur','orbit','sinyal','indeks'];
const selectors = {kontur:'.kontur-scanner',orbit:'.orbit-trajectory--one',sinyal:'[data-sinyal-globe]',indeks:'.indeks-scanner'};
const readMotion = async (page,slug) => page.locator(selectors[slug]).evaluate((element,kind) => kind === 'sinyal' ? element.dataset.frame : `${getComputedStyle(element).transform}|${getComputedStyle(element).left}`,slug);
try {
  for (const width of [1440,390,360,768,1024]) {
    const context = await browser.newContext({viewport:{width,height:width>800?1000:844},reducedMotion:'reduce'});
    const page = await context.newPage();
    for (const slug of slugs) {
      const errors=[];
      const listener=e=>errors.push(e.message);
      page.on('pageerror',listener);
      await page.goto(`${base}/heroes/${slug}/`,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,height:document.documentElement.scrollHeight,broken:[...document.images].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src),h1:document.querySelectorAll('h1').length,skipBottom:document.querySelector('.h-skip').getBoundingClientRect().bottom}));
      ensure(!layout.overflow&&layout.h1===1&&layout.broken.length===0&&layout.skipBottom<0,`${slug}/${width}: layout ${JSON.stringify(layout)}`);
      const reduced=await page.locator('[data-motion-toggle]').isDisabled();
      ensure(reduced,`${slug}/${width}: reduced-motion control`);
      if (width === 1440 || width === 390) {
        const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        const violations=axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
        results.push({slug,width,...layout,errors,violations});
        await page.screenshot({path:path.join(output,`${slug}-${width===1440?'desktop':'mobile'}.png`),fullPage:true});
        if(width===1440) await page.screenshot({path:path.join(output,`${slug}-cover.png`)});
        ensure(!violations.length,`${slug}/${width}: axe violations`);
      } else results.push({slug,width,...layout,errors});
      ensure(!errors.length,`${slug}/${width}: JS errors`);
      page.off('pageerror',listener);
    }
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();
  const anchors=new Set();
  for(const slug of slugs) {
    await page.goto(`${base}/heroes/${slug}/`,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const before=await readMotion(page,slug);
    await page.waitForTimeout(300);
    ensure(before!==await readMotion(page,slug),`${slug}: motion must advance`);
    await page.locator('[data-motion-toggle]').click();
    const paused=await readMotion(page,slug);
    await page.waitForTimeout(300);
    ensure(paused===await readMotion(page,slug),`${slug}: pause must freeze`);
    await page.reload({waitUntil:'networkidle'});
    ensure(await page.locator('html').getAttribute('data-motion')==='paused',`${slug}: pause persistence`);
    const heading=await page.locator('h1').evaluate(element=>({text:element.textContent,opacity:getComputedStyle(element).opacity,height:element.getBoundingClientRect().height}));
    ensure(heading.opacity==='1'&&heading.height>0,`${slug}: heading visible while paused`);
    if(slug==='kontur') {
      await page.locator('button[data-density="detail"]').click();
      ensure(await page.locator('[data-kontur-field]').getAttribute('data-density')==='detail','Contour density');
      ensure(await page.locator('.kontur-detail').evaluate(e=>getComputedStyle(e).opacity)==='1','Detail visible');
    }
    if(slug==='indeks') {
      for(const choice of ['riset','belajar','lapangan']) {
        await page.locator(`[data-indeks-choice="${choice}"]`).click();
        ensure(await page.locator(`[data-indeks-copy="${choice}"]`).isVisible(),`Indeks ${choice} copy`);
        ensure(await page.locator(`[data-indeks-choice="${choice}"]`).getAttribute('aria-pressed')==='true',`Indeks ${choice} state`);
      }
    }
    for(const href of await page.locator('a[href]').evaluateAll(elements=>elements.map(el=>el.getAttribute('href')))) if(href.startsWith('/')&&href.includes('#')) anchors.add(href);
    await page.locator('[data-motion-toggle]').click();
    results.push({slug,check:'motion-and-interaction',status:'pass'});
  }
  for(const href of anchors) {
    await page.goto(`${base}${href}`,{waitUntil:'domcontentloaded'});
    ensure(await page.locator(`#${href.split('#')[1]}`).count()>0,`Missing linked anchor ${href}`);
  }
  await context.close();
  for(const slug of slugs) {
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const page=await nojs.newPage();
    await page.goto(`${base}/heroes/${slug}/`,{waitUntil:'networkidle'});
    ensure(await page.locator('h1').isVisible(),`${slug}: no-JS heading`);
    if(slug==='sinyal') ensure((await page.locator('.sinyal-static-earth').textContent()).includes('#'),'ASCII fallback');
    await nojs.close();
  }
  results.push({check:'cross-route-anchors-and-static-fallback',status:'pass',anchors:[...anchors]});
} finally {
  await writeFile(path.join(output,'qa-results.json'),JSON.stringify(results,null,2));
  await browser.close();
}
console.log(JSON.stringify(results,null,2));
