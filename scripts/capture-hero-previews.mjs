import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
const output=path.resolve('docs/heroes');
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const slug of ['kontur','orbit','sinyal','indeks']) {
  await page.goto(`http://127.0.0.1:4321/heroes/${slug}/`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1300);
  await page.screenshot({path:path.join(output,`${slug}-cover.png`)});
}
await browser.close();
