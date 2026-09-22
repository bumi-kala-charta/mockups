import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.BKC_PREVIEW_URL || 'http://127.0.0.1:4321';
const output = path.resolve('docs/company-profiles');
const slugs = ['atlas', 'observatorium', 'ruang'];
const results = [];
const ensure = (condition, message) => { if (!condition) throw new Error(message); };
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [1440, 1024, 768, 390, 360]) {
    const context = await browser.newContext({ viewport: { width, height: width > 800 ? 1000 : 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const slug of slugs) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on('pageerror', onError);
      const response = await page.goto(`${base}/${slug}/tentang/`, { waitUntil: 'networkidle' });
      ensure(response.ok(), `${slug}: profile route unavailable`);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: Array.from(document.images).filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
        missingAnchors: Array.from(document.querySelectorAll('a[href^="#"]')).filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.getAttribute('href')),
      }));
      ensure(!layout.overflow && !layout.brokenImages.length && !layout.missingAnchors.length, `${slug}/${width}: ${JSON.stringify(layout)}`);
      ensure(await page.locator('h1').count() === 1, `${slug}: heading structure`);
      ensure(await page.locator('#visi-misi h2').count() === 2, `${slug}: vision and mission`);
      ensure(await page.locator('.profile-value').count() === 6, `${slug}: all company values`);
      if (width <= 800) {
        await page.locator('.mobile-toggle').click();
        ensure(await page.locator('.primary-nav').isVisible(), `${slug}: mobile menu`);
        await page.keyboard.press('Escape');
        ensure(await page.locator('.mobile-toggle').getAttribute('aria-expanded') === 'false', `${slug}: menu Escape`);
      }
      if (width === 1440 || width === 390) {
        // Native FAQ must work with the keyboard, and only one answer stays expanded.
        const summaries = page.locator('.profile-faq summary');
        await summaries.first().focus();
        await page.keyboard.press('Enter');
        ensure(await page.locator('.profile-faq details[open]').count() === 1, `${slug}: keyboard FAQ`);
        await summaries.nth(1).click();
        ensure(await page.locator('.profile-faq details[open]').count() === 1, `${slug}: exclusive FAQ`);
        await summaries.nth(1).click();
        const cta = page.locator('.profile-contact [data-open="collab"]');
        await cta.click();
        ensure(await page.locator('#collab').isVisible(), `${slug}: contact dialog`);
        await page.locator('[data-collab-topic="2"]').click();
        ensure((await page.locator('.collab-guidance h3').textContent()).includes('kebutuhan belajar'), `${slug}: topic guidance`);
        await page.keyboard.press('Escape');
        ensure(await page.locator('dialog[open]').count() === 0, `${slug}: dialog closes`);
        ensure(await cta.evaluate(el => el === document.activeElement), `${slug}: focus returns to contact CTA`);
        // Validate all internal routes and fragment destinations, including links back to the landing page.
        const brokenLinks = await page.evaluate(async () => {
          const links = [...new Set(Array.from(document.querySelectorAll('a[href]')).map(a => a.href))];
          const documents = new Map();
          const failures = [];
          for (const href of links) {
            const url = new URL(href);
            if (url.origin !== location.origin) continue;
            if (!documents.has(url.pathname)) {
              const res = await fetch(url.pathname);
              documents.set(url.pathname, { ok: res.ok, doc: new DOMParser().parseFromString(await res.text(), 'text/html') });
            }
            const { ok, doc } = documents.get(url.pathname);
            if (!ok || (url.hash && !doc.getElementById(decodeURIComponent(url.hash.slice(1))))) failures.push(href);
          }
          return failures;
        });
        ensure(!brokenLinks.length, `${slug}: broken links ${brokenLinks.join(', ')}`);
        await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement?.blur(); });
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        const violations = axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
        results.push({ slug, width, ...layout, brokenLinks, errors, violations });
        const size = width === 1440 ? 'desktop' : 'mobile';
        await page.screenshot({ path: path.join(output, `${slug}-${size}.png`), fullPage: true });
        await page.screenshot({ path: path.join(output, `${slug}-${size}-cover.png`) });
        ensure(!violations.length, `${slug}/${width}: accessibility violations, see qa-results.json`);
      } else {
        results.push({ slug, width, ...layout, errors });
      }
      ensure(!errors.length, `${slug}: ${errors.join('; ')}`);
      page.off('pageerror', onError);
    }
    await context.close();
  }
  const page = await browser.newPage();
  for (const slug of slugs) {
    await page.goto(`${base}/${slug}/`);
    await page.locator('.primary-nav a', { hasText: 'Tentang BKC' }).click();
    ensure(new URL(page.url()).pathname === `/${slug}/tentang/`, `${slug}: home-to-profile navigation`);
    for (const target of slugs) {
      await page.locator(`.exploration-options a[href="/${target}/tentang/"]`).click();
      ensure(await page.locator(`body.theme-${target}.profile-page`).count() === 1, `${target}: profile theme switch`);
    }
  }
  await page.goto(base);
  ensure(await page.locator('.gallery-profile-link').count() === 3, 'Gallery profile entries');
  results.push({ check: 'navigation', status: 'landing links, gallery entries, and profile-to-profile switching pass' });
  await page.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await nojs.newPage();
  for (const slug of slugs) {
    await staticPage.goto(`${base}/${slug}/tentang/`);
    ensure(await staticPage.locator('.profile-mission li').count() === 4, `${slug}: no-JS mission`);
    await staticPage.locator('.profile-faq summary').first().click();
    ensure(await staticPage.locator('.profile-faq details[open]').count() === 1, `${slug}: no-JS FAQ`);
  }
  await nojs.close();
  results.push({ check: 'no-js', status: 'all three profiles and native FAQs work' });
} finally {
  await writeFile(path.join(output, 'qa-results.json'), JSON.stringify(results, null, 2));
  await browser.close();
}
console.log(JSON.stringify(results, null, 2));
