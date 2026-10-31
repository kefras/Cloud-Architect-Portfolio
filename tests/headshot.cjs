/* Verify the portrait against the packaged S3 directory, without external APIs. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:8771';
const out = path.resolve(__dirname, '../.artifacts/headshot-tests');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  const results = [];
  const check = async (name, work) => {
    await work();
    results.push(name);
    console.log('PASS', name);
  };
  try {
    const page = await browser.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base);
    await check('Packaged headshot returns a valid PNG with exact-case path', async () => {
      const response = await page.request.get(`${base}/headshot/kefas-headshot.png`);
      assert.equal(response.status(), 200);
      assert.match(response.headers()['content-type'], /image\/png/);
      const dimensions = await page.locator('.hero-headshot').evaluate(async (img) => {
        await img.decode();
        return [img.naturalWidth, img.naturalHeight, img.getAttribute('fetchpriority')];
      });
      assert.ok(dimensions[0] > 0 && dimensions[1] > 0);
      assert.equal(dimensions[2], 'high');
      assert.match(
        await page.locator('.hero-headshot').evaluate((img) => img.currentSrc),
        /\.webp$/,
      );
    });
    await check('Local AOS initializes and completes the portrait entrance', async () => {
      await page.waitForSelector('.aos-enabled .hero-portrait.aos-animate');
      await page.waitForTimeout(800);
      assert.equal(
        await page.locator('.hero-portrait').evaluate((el) => getComputedStyle(el).opacity),
        '1',
      );
    });
    for (const [width, height] of [
      [320, 800],
      [375, 900],
      [390, 844],
      [768, 1024],
      [1024, 768],
      [1440, 1000],
      [1920, 1080],
      [844, 390],
    ]) {
      await check(`Portrait fits ${width}x${height} without overflow`, async () => {
        await page.setViewportSize({ width, height });
        const image = page.locator('.hero-headshot');
        await image.scrollIntoViewIfNeeded();
        const box = await image.boundingBox();
        assert.ok(box && box.width > 200 && box.height > 260);
        assert.ok(box.x >= 0 && box.x + box.width <= width);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        assert.ok(Math.abs(box.width / box.height - 0.75) < 0.02);
        await page.screenshot({ path: path.join(out, `portrait-${width}x${height}.png`) });
      });
    }
    await check('Fine-pointer hover lifts the frame without moving the layout', async () => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.locator('.hero-portrait').hover();
      await page.waitForTimeout(350);
      assert.notEqual(
        await page.locator('.portrait-frame').evaluate((el) => getComputedStyle(el).transform),
        'none',
      );
    });
    await check(
      'Reduced motion stays visible and disables transforms, including hover',
      async () => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForFunction(
          () => !document.documentElement.classList.contains('aos-enabled'),
        );
        for (const selector of ['.hero-portrait', '.portrait-frame']) {
          assert.equal(
            await page.locator(selector).evaluate((el) => getComputedStyle(el).transform),
            'none',
          );
        }
        assert.equal(
          await page.locator('.hero-portrait').evaluate((el) => getComputedStyle(el).opacity),
          '1',
        );
        await page.reload();
        assert.equal(await page.locator('html.aos-enabled').count(), 0);
      },
    );
    for (const mode of ['no JavaScript', 'failed AOS']) {
      await check(`Portrait remains visible with ${mode}`, async () => {
        const context = await browser.newContext({
          javaScriptEnabled: mode !== 'no JavaScript',
          viewport: { width: 375, height: 900 },
        });
        if (mode === 'failed AOS') await context.route('**/aos.js', (route) => route.abort());
        const fallback = await context.newPage();
        fallback.on('pageerror', (e) => errors.push(e.message));
        await fallback.goto(base);
        const portrait = fallback.locator('.hero-portrait');
        assert.equal(await portrait.evaluate((el) => getComputedStyle(el).opacity), '1');
        assert.equal(await portrait.evaluate((el) => getComputedStyle(el).transform), 'none');
        assert.ok(
          await fallback
            .locator('.hero-headshot')
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        );
        await context.close();
      });
    }
    await check('No runtime errors', async () => assert.deepEqual(errors, []));
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ results, errors }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
