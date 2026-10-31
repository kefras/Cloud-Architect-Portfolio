/* Membership content, presentation and accessibility checks against the static build. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:8775';
const out = path.resolve(__dirname, '../.artifacts/community-tests');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const checks = [],
    errors = [];
  const check = async (name, fn) => {
    await fn();
    checks.push(name);
    console.log('PASS', name);
  };
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base);
    const card = page.locator('.involvement-card');
    await check('Membership is separate from work and immediately after experience', async () => {
      assert.equal(await page.locator('#experience + #communities').count(), 1);
      assert.equal(await page.locator('#experience .involvement-card').count(), 0);
      assert.equal(await card.locator('h3').innerText(), 'Miva Robotics Club');
      assert.equal(await card.locator('.status').innerText(), 'Member');
      assert.equal(await card.locator('.eyebrow').innerText(), 'Miva Open University');
      assert.equal(
        await card.locator('p.muted').innerText(),
        "Member of Miva Open University's Robotics Club, participating in a technical learning community focused on robotics, AI, practical engineering skills, and collaborative innovation.",
      );
      assert.deepEqual(await card.locator('.tags li').allTextContents(), [
        'Robotics',
        'Artificial Intelligence',
        'Automation',
        'Collaborative Technical Learning',
      ]);
      assert.equal(await card.locator('.line-icon[aria-hidden="true"]').count(), 1);
      assert.doesNotMatch(await card.innerText(), /leader|president|employ|award|built a robot/i);
    });
    await check('Shared AOS reveals the membership card', async () => {
      await card.scrollIntoViewIfNeeded();
      await page.waitForSelector('.involvement-card[data-aos="fade-up"].aos-animate');
    });
    await check('Keyboard focus is visible and named', async () => {
      await card.focus();
      assert.ok(await card.evaluate((el) => el === document.activeElement));
      assert.equal(await card.evaluate((el) => getComputedStyle(el).outlineStyle), 'solid');
      assert.equal(await card.getAttribute('aria-labelledby'), 'miva-robotics-title');
    });
    await check('Fine-pointer hover lifts the card', async () => {
      await card.hover();
      await page.waitForTimeout(300);
      assert.notEqual(await card.evaluate((el) => getComputedStyle(el).translate), 'none');
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const axePath = path.join(process.env.PORTFOLIO_QA_DIR, 'axe-core/axe.min.js');
    const axe = fs.readFileSync(axePath, 'utf8');
    const scans = [];
    for (const width of [320, 375, 768, 1024, 1440]) {
      await check(`Card fits ${width}px and reduced motion disables lift`, async () => {
        await page.setViewportSize({ width, height: 1000 });
        await card.scrollIntoViewIfNeeded();
        const box = await card.boundingBox();
        assert.ok(box.x >= 0 && box.x + box.width <= width + 1);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        assert.equal(await card.evaluate((el) => getComputedStyle(el).translate), 'none');
        assert.equal(await card.evaluate((el) => getComputedStyle(el).transform), 'none');
      });
      if ([375, 1440].includes(width)) {
        for (const theme of ['dark', 'light']) {
          await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
          await page.addScriptTag({ content: axe });
          const violations = await page.evaluate(async () =>
            (await axe.run(document)).violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            })),
          );
          assert.deepEqual(violations, []);
          scans.push({ width, theme, violations });
          await page
            .locator('#communities')
            .screenshot({ path: path.join(out, `community-${width}-${theme}.png`) });
        }
      }
    }
    await check('Community stays visible without JavaScript', async () => {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 375, height: 900 },
      });
      const fallback = await context.newPage();
      await fallback.goto(base);
      assert.equal(await fallback.locator('.involvement-card').count(), 1);
      assert.equal(
        await fallback.locator('.involvement-card').evaluate((el) => getComputedStyle(el).opacity),
        '1',
      );
      await context.close();
    });
    await check('No runtime errors', async () => assert.deepEqual(errors, []));
    fs.writeFileSync(
      path.join(out, 'results.json'),
      JSON.stringify({ checks, scans, errors }, null, 2),
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
