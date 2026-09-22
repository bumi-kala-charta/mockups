import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const base=process.env.BKC_PREVIEW_URL||'http://127.0.0.1:4321';
const results=[];
const ensure=(condition,message)=>{if(!condition)throw Error(message);};
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000}});
  const page=await context.newPage();
  await page.goto(`${base}/heroes/`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  results.push({page:'gallery',width,...layout,violations:axe.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))});
  ensure(!layout.overflow&&!layout.broken.length&&!axe.violations.length,`Gallery ${width}`);
  await page.screenshot({path:`docs/heroes/gallery-${width===1440?'desktop':'mobile'}.png`,fullPage:true});
  if(width===1440)await page.locator('.hg-grid').screenshot({path:'docs/heroes/four-heroes-overview.png'});
  await page.goto(base,{waitUntil:'networkidle'});
  ensure(await page.locator('.gallery-hero-link').isVisible(),'Link from old gallery');
  await page.locator('.gallery-hero-link').click();
  ensure(new URL(page.url()).pathname==='/heroes/','Gallery navigation');
  if(width===390) {
   await page.goto(`${base}/heroes/kontur/`,{waitUntil:'networkidle'});
   await page.locator('.h-mobile-nav summary').click();
   ensure(await page.locator('.h-mobile-nav nav').isVisible(),'Mobile menu');
   await page.locator('.h-mobile-nav nav a').first().click();
   ensure(new URL(page.url()).pathname==='/ruang/','Mobile menu destination');
  }
  await context.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const staticPage=await nojs.newPage();
 for(const slug of ['kontur','orbit','sinyal','indeks']) {
  await staticPage.goto(`${base}/heroes/${slug}/`,{waitUntil:'networkidle'});
  ensure(await staticPage.locator('h1').isVisible(),'No-JS heading');
  ensure(await staticPage.evaluate(()=>document.getAnimations().length)===0,`No-JS static ${slug}`);
 }
 await nojs.close();
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(`${base}/heroes/sinyal/`,{waitUntil:'networkidle'});
 await page.locator('[data-sinyal-globe][data-ready=true]').waitFor();
 await page.goto(`${base}/heroes/`);
 await page.goBack({waitUntil:'networkidle'});
 const previous=await page.locator('[data-sinyal-globe]').getAttribute('data-frame');
 await page.waitForTimeout(350);
 ensure(previous!==await page.locator('[data-sinyal-globe]').getAttribute('data-frame'),'ASCII resumes after history back');
 results.push({check:'mobile-menu-no-js-history-back',status:'pass'});
 await page.close();
} finally {
 await writeFile('docs/heroes/gallery-qa-results.json',JSON.stringify(results,null,2));
 await browser.close();
}
console.log(JSON.stringify(results,null,2));
