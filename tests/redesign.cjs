/* Evidence-oriented checks for the twelve redesign requirements. No form delivery. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:8774';
const out = path.resolve(__dirname, '../.artifacts/redesign-audit');
fs.mkdirSync(out, { recursive: true });
const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../content.json')));
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const checks = [];
  const errors = [];
  const check = async (name, fn) => {
    await fn();
    checks.push(name);
    console.log('PASS', name);
  };
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base);
    for (const id of [
      'home',
      'projects',
      'skills',
      'about',
      'architecture',
      'experience',
      'communities',
      'certifications',
      'contact',
    ]) {
      await check(`AOS reveal in major section: ${id}`, async () => {
        const reveal = page.locator(`#${id} [data-aos]`).first();
        assert.ok(await reveal.count());
        await reveal.scrollIntoViewIfNeeded();
        await page.waitForFunction(
          (id) => document.querySelector(`#${id} [data-aos]`).classList.contains('aos-animate'),
          id,
        );
      });
    }
    await check(
      'All six selected projects have visuals, evidence, statuses and case-study actions',
      async () => {
        const cards = page.locator('#projects .project-card');
        assert.equal(await cards.count(), 6);
        for (const card of await cards.all()) {
          assert.equal(await card.locator('img[alt]').count(), 1);
          assert.equal(await card.locator('.status').count(), 1);
          assert.equal(await card.locator('.project-problem').count(), 1);
          assert.ok((await card.locator('.tags li').count()) >= 3);
          assert.equal(await card.getByRole('link', { name: /View case study/ }).count(), 1);
        }
      },
    );
    await check('Project hover and keyboard focus highlight the card', async () => {
      const card = page.locator('.project-card').first();
      await card.hover();
      await page.waitForTimeout(350);
      assert.notEqual(await card.evaluate((el) => getComputedStyle(el).translate), 'none');
      await card.getByRole('link', { name: /View case study/ }).focus();
      assert.ok(await card.evaluate((el) => el.matches(':focus-within')));
      assert.ok(
        await card.evaluate((el) => getComputedStyle(el).backgroundImage.includes('gradient')),
      );
    });
    await check('Nine capability cards include decorative icons and evidence links', async () => {
      assert.equal(await page.locator('.skill').count(), 9);
      assert.equal(await page.locator('.skill .line-icon[aria-hidden="true"]').count(), 9);
      assert.equal(await page.locator('.skill a').count(), 9);
      const card = page.locator('.skill').first();
      await card.hover();
      await page.waitForTimeout(250);
      assert.notEqual(await card.evaluate((el) => getComputedStyle(el).translate), 'none');
    });
    await check('Experience and education share four animated timeline cards', async () => {
      assert.equal(await page.locator('#experience .timeline-row[data-aos]').count(), 4);
      assert.match(
        await page.locator('#experience .timeline-row').last().innerText(),
        /Miva Open University/,
      );
      assert.equal(
        await page
          .locator('#experience .timeline')
          .evaluate((el) => getComputedStyle(el, '::before').width),
        '2px',
      );
    });
    await check(
      'Six confirmed credential cards have correct issuer verification links',
      async () => {
        assert.equal(await page.locator('#certifications .credential-pending').count(), 0);
        assert.equal(await page.getByRole('link', { name: 'Verify credential ↗' }).count(), 6);
        assert.deepEqual(
          await page
            .getByRole('link', { name: 'Verify credential ↗' })
            .evaluateAll((links) => links.map((link) => link.href)),
          content.certifications.map((record) => record.verification_url),
        );
        assert.match(await page.locator('#certifications').innerText(), /Google Cloud Skill Badge/);
        assert.doesNotMatch(await page.locator('#certifications').innerText(), /AWS Certified/);
      },
    );
    await check('Both architecture views respond to click and keyboard selection', async () => {
      await page.getByRole('button', { name: 'AWS portfolio', exact: true }).click();
      assert.match(await page.locator('#mapDetail').innerText(), /Route 53/);
      await page.locator('[data-stage="0"]').focus();
      await page.keyboard.press('End');
      assert.equal(await page.locator('[data-stage="3"]').getAttribute('aria-pressed'), 'true');
      assert.match(await page.locator('#mapDetail').innerText(), /API Gateway/);
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-stage="0"]').getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: 'Delivery pipeline', exact: true }).click();
      assert.match(await page.locator('#mapDetail').innerText(), /Version code/);
    });
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await check(`Card grids and timeline fit ${width}px`, async () => {
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        for (const selector of [
          '.project-card',
          '.skill',
          '#experience .timeline-row',
          '.credential-card',
        ]) {
          for (const node of await page.locator(selector).all()) {
            const box = await node.boundingBox();
            assert.ok(box && box.x >= 0 && box.x + box.width <= width + 1);
          }
        }
        const cols = await page
          .locator('.projects-grid')
          .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        assert.equal(cols, width >= 1280 ? 3 : width > 560 ? 2 : 1);
      });
    }
    await check('Reduced motion disables reveal, hover and smooth-scroll movement', async () => {
      await page.locator('.project-card').first().hover();
      assert.equal(
        await page
          .locator('.project-card')
          .first()
          .evaluate((el) => getComputedStyle(el).translate),
        'none',
      );
      assert.equal(
        await page
          .locator('.project-card')
          .first()
          .evaluate((el) => getComputedStyle(el).transform),
        'none',
      );
      assert.equal(
        await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior),
        'auto',
      );
    });
    await page.goto(base + '/projects.html');
    for (const [category, count] of [
      ['Cloud & DevOps', 8],
      ['AI Engineering', 3],
      ['Full-stack', 2],
      ['All projects', 13],
    ]) {
      await check(`Directory filter: ${category}`, async () => {
        await page.getByRole('button', { name: category, exact: true }).click();
        assert.equal(await page.locator('.project-card:visible').count(), count);
        assert.equal(await page.locator('#projectCount').innerText(), `${count} projects`);
      });
    }
    for (const route of [
      '',
      'projects.html',
      'resume.html',
      ...content.projects.map((p) => `case-studies/${p.id}.html`),
    ]) {
      await check(`Shared portrait loads on ${route || 'index.html'}`, async () => {
        await page.goto(`${base}/${route}`);
        assert.ok(
          await page.locator('.brand-avatar').evaluate(async (img) => {
            await img.decode();
            return img.naturalWidth > 0;
          }),
        );
      });
    }
    await check(
      'Touch phone navigation, filters and cloud diagram work without hover',
      async () => {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          deviceScaleFactor: 2,
          reducedMotion: 'reduce',
        });
        const phone = await context.newPage();
        phone.on('pageerror', (error) => errors.push(error.message));
        await phone.goto(base);
        await phone.locator('#navToggle').tap();
        assert.equal(await phone.locator('#navToggle').getAttribute('aria-expanded'), 'true');
        await phone.getByRole('link', { name: 'Projects', exact: true }).tap();
        assert.equal(await phone.locator('#navToggle').getAttribute('aria-expanded'), 'false');
        await phone.getByRole('button', { name: 'AI Engineering', exact: true }).tap();
        assert.equal(await phone.locator('.project-card:visible').count(), 3);
        await phone.getByRole('button', { name: 'AWS portfolio', exact: true }).tap();
        await phone.locator('[data-stage="2"]').tap();
        assert.match(await phone.locator('#mapDetail').innerText(), /relative object paths/);
        assert.ok(
          await phone
            .locator('.hero-headshot')
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        );
        assert.ok(await phone.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await context.close();
      },
    );
    await page.goto(base);
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate((theme) => (document.documentElement.dataset.theme = theme), theme);
      await page.screenshot({ path: path.join(out, `full-${theme}-desktop.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 375, height: 900 });
    await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
    await page.screenshot({ path: path.join(out, 'full-dark-mobile.png'), fullPage: true });
    await check('No runtime errors in redesigned interactions', async () =>
      assert.deepEqual(errors, []),
    );
  } finally {
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ checks, errors }, null, 2));
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
