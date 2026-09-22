import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel:'chrome',headless:true });
const base = process.env.BKC_PREVIEW_URL || 'http://127.0.0.1:4321';
const results=[];
try {
  const page=await browser.newPage();
  for(const width of [360,768,1024]) {
    await page.setViewportSize({width,height:900});
    for(const slug of ['atlas','observatorium','ruang','']) {
      await page.goto(`${base}/${slug ? slug+'/' : ''}`,{waitUntil:'networkidle'});
      const result=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        brokenAnchors:Array.from(document.querySelectorAll('a[href^="#"]')).filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),
        brokenImages:Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
      }));
      results.push({slug:slug||'gallery',width,...result});
      if(result.overflow||result.brokenAnchors.length||result.brokenImages.length)throw new Error(JSON.stringify(results.at(-1)));
    }
  }
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:width===1440?1000:844});
    await page.goto(`${base}/observatorium/`,{waitUntil:'networkidle'});
    await page.screenshot({path:`docs/mockups/observatorium-${width===1440?'desktop':'mobile'}.png`,fullPage:true});
    if(width===1440)await page.screenshot({path:'docs/mockups/observatorium-cover.png'});
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const slug of ['atlas','observatorium','ruang']) {
    await page.goto(`${base}/${slug}/`,{waitUntil:'networkidle'});
    await page.locator('[data-explorer]').screenshot({path:`docs/mockups/${slug}-map.png`});
    if(slug==='atlas') {
      await page.locator('[data-open="project-pesisir"]').first().click();
      await page.locator('#project-pesisir').screenshot({path:'docs/mockups/project-detail.png'});
    }
  }
}finally{
  await mkdir('docs/mockups',{recursive:true});
  await writeFile('docs/mockups/layout-results.json',JSON.stringify(results,null,2));
  await browser.close();
}
console.log(JSON.stringify(results,null,2));
