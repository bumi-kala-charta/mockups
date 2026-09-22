import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BKC_PREVIEW_URL || 'http://127.0.0.1:4321';
const output = path.resolve('docs/mockups');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const ensure = (condition, message) => { if (!condition) throw new Error(message); };

try {
  for (const viewport of [{ width:1440,height:1000,name:'desktop' },{ width:390,height:844,name:'mobile' }]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor:1, reducedMotion:'reduce' });
    const page = await context.newPage();
    for (const slug of ['atlas','observatorium','ruang']) {
      const errors = [];
      const listener = error => errors.push(error.message);
      page.on('pageerror', listener);
      await page.goto(`${base}/${slug}/`, { waitUntil:'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      ensure(!overflow, `${slug}/${viewport.name}: horizontal overflow`);
      ensure(await page.locator('h1').count() === 1, `${slug}: h1 count`);
      const brokenImages = await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src));
      ensure(brokenImages.length === 0, `Broken images: ${brokenImages.join(',')}`);
      await page.locator('[data-project-filter="Riset"]').click();
      ensure(await page.locator('[data-project-card]:visible').count() === 2, `${slug}: project filter`);
      await page.locator('[data-project-filter="Semua"]').click();
      await page.locator('[data-map-filter="Kegiatan"]').click();
      ensure(await page.locator('[data-map-select]:visible').count() === 2, `${slug}: map filter`);
      await page.locator('[data-map-select="gnss"]').click();
      ensure(await page.locator('[data-map-detail="gnss"]').isVisible(), `${slug}: map selection`);
      await page.locator('[data-map-detail="gnss"] [data-open="publication-gnss"]').click();
      ensure(await page.locator('dialog#publication-gnss').isVisible(), `${slug}: linked publication`);
      await page.locator('#publication-gnss [data-open="project-gnss"]').click();
      ensure(await page.locator('dialog#project-gnss').isVisible(), `${slug}: related project`);
      await page.locator('#project-gnss [data-dialog-map="gnss"]').click();
      ensure(await page.locator('dialog[open]').count() === 0, `${slug}: map navigation closes dialog`);
      await page.locator('[data-map-filter="Semua"]').click();
      await page.locator('[data-map-select="pesisir"]').click();
      await page.locator('[data-zoom="in"]').click();
      ensure((await page.locator('[data-explorer] .map-world').getAttribute('style'))?.includes('1.25'), `${slug}: zoom`);
      await page.locator('[data-zoom="reset"]').click();
      await page.locator('.header-cta').click();
      await page.locator('[data-collab-topic="1"]').click();
      ensure((await page.locator('.collab-guidance h3').textContent())?.includes('pertanyaan riset'), `${slug}: collab topic`);
      await page.keyboard.press('Escape');
      ensure(await page.locator('dialog[open]').count() === 0, `${slug}: Escape`);
      if (viewport.name === 'mobile') {
        await page.locator('.mobile-toggle').click();
        ensure(await page.locator('.primary-nav').isVisible(), `${slug}: mobile nav`);
        await page.locator('.primary-nav a[href="#pengetahuan"]').click();
        ensure(!(await page.locator('.primary-nav').isVisible()), `${slug}: mobile nav close`);
      }
      if (slug === 'ruang') {
        await page.locator('.activity-detail').nth(1).locator('summary').click();
        ensure(await page.locator('.activity-detail').nth(1).getAttribute('open') !== null, 'Ruang accordion');
        await page.locator('.activity-detail').nth(0).locator('summary').click();
      }
      await page.evaluate(() => {window.scrollTo(0,0);document.activeElement?.blur();});
      const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const violations = axe.violations.map(v => ({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
      await page.screenshot({ path:path.join(output,`${slug}-${viewport.name}.png`), fullPage:true });
      if (viewport.name === 'desktop') await page.screenshot({path:path.join(output,`${slug}-cover.png`)});
      results.push({slug,viewport:viewport.name,overflow,brokenImages,errors,violations,height:await page.evaluate(()=>document.documentElement.scrollHeight)});
      ensure(errors.length === 0, `${slug}: ${errors.join('; ')}`);
      ensure(violations.length === 0, `${slug}/${viewport.name}: accessibility violations, see qa-results.json`);
      page.off('pageerror',listener);
    }
    await page.goto(base,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    ensure(!(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth + 1)),`Gallery ${viewport.name} overflow`);
    await page.screenshot({path:path.join(output,`gallery-${viewport.name}.png`),fullPage:true});
    await context.close();
  }
  const nojs = await browser.newContext({ javaScriptEnabled:false,viewport:{width:390,height:844} });
  const page = await nojs.newPage();
  await page.goto(`${base}/atlas/`);
  ensure(await page.locator('[data-project-card]').count() === 6,'No-JS portfolio accessible');
  results.push({check:'no-js',status:'content renders; modal and map controls need JavaScript'});
  await nojs.close();
} finally {
  await writeFile(path.join(output,'qa-results.json'),JSON.stringify(results,null,2));
  await browser.close();
}
console.log(JSON.stringify(results.map(({slug,viewport,errors,violations,height,...rest})=>({slug,viewport,errors,violations:violations?.map(v=>({id:v.id,nodes:v.nodes.length})),height,...rest})),null,2));
