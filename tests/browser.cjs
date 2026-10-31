/* Browser regression checks. All contact POSTs are intercepted, never delivered. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:8765';
const out = path.resolve(__dirname, '../.artifacts/tests');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  const errors = [];
  const context = await browser.newContext({ colorScheme: 'dark' });
  await context.route('https://fpl6eii032.execute-api.us-east-1.amazonaws.com/**', (route) =>
    route.abort(),
  );
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const check = async (name, fn) => {
    await fn();
    results.push({ name, passed: true });
    console.log('PASS', name);
  };
  try {
    await check('Local homepage returns 200', async () =>
      assert.equal((await page.goto(base)).status(), 200),
    );
    await check('Featured projects immediately follow hero', async () =>
      assert.deepEqual(
        await page
          .locator('main > section')
          .evaluateAll((nodes) => nodes.slice(0, 2).map((n) => n.id)),
        ['home', 'projects'],
      ),
    );
    for (const width of [320, 375, 768, 860, 1024, 1440]) {
      for (const theme of ['dark', 'light']) {
        await check(`No horizontal overflow: ${width}px ${theme}`, async () => {
          await page.setViewportSize({ width, height: 950 });
          await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
          assert.ok(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
            JSON.stringify(
              await page.evaluate(() => ({
                scroll: document.documentElement.scrollWidth,
                width: innerWidth,
              })),
            ),
          );
          assert.equal(await page.locator('.project-card:visible').count(), 6);
        });
      }
      if (width < 860) {
        await check(`Mobile menu opens/closes at ${width}px`, async () => {
          await page.locator('#navToggle').click();
          assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'true');
          assert.equal(await page.locator('#navigation').isVisible(), true);
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'false');
          assert.equal(
            await page.locator('#navToggle').evaluate((el) => el === document.activeElement),
            true,
          );
        });
      } else assert.equal(await page.locator('#navigation').isVisible(), true);
    }
    await check('Menu remains usable while resizing between 768 and 859px', async () => {
      await page.setViewportSize({ width: 768, height: 950 });
      await page.locator('#navToggle').click();
      await page.setViewportSize({ width: 820, height: 950 });
      assert.equal(await page.locator('#navigation').isVisible(), true);
      await page.setViewportSize({ width: 860, height: 950 });
      assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'), 'false');
    });
    await check('Filter buttons update projects and accessible count', async () => {
      await page.getByRole('button', { name: 'Cloud & DevOps', exact: true }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      assert.equal(await page.locator('#projectCount').innerText(), '3 projects');
      await page.getByRole('button', { name: 'All projects', exact: true }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 6);
    });
    await check('Architecture keyboard selection and wrap-around', async () => {
      const node = page.locator('[data-stage="0"]');
      await node.focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-stage="1"]').getAttribute('aria-pressed'), 'true');
      assert.match(await page.locator('#mapDetail').innerText(), /Turn source into an artifact/);
      await page.keyboard.press('End');
      await page.keyboard.press('ArrowRight');
      assert.equal(await node.getAttribute('aria-pressed'), 'true');
    });
    await check('Theme persists after reload', async () => {
      await page.evaluate(() => {
        document.documentElement.dataset.theme = 'dark';
        localStorage.setItem('portfolio-theme', 'dark');
      });
      await page.locator('#themeToggle').click();
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    });
    await check('Form rejects empty and invalid fields with focus and announcements', async () => {
      await page.locator('#submitBtn').click();
      assert.equal(await page.locator('[aria-invalid=true]').count(), 4);
      assert.equal(
        await page.locator('#cname').evaluate((el) => el === document.activeElement),
        true,
      );
      await page.locator('#cname').fill('Test');
      await page.locator('#cemail').fill('invalid');
      await page.locator('#csubject').fill('Test');
      await page.locator('#cmsg').fill('A test message for mocked requests.');
      await page.locator('#submitBtn').click();
      assert.equal(await page.locator('#cemail').getAttribute('aria-invalid'), 'true');
    });
    const fill = async () => {
      await page.locator('#cname').fill('Test');
      await page.locator('#cemail').fill('test@example.com');
      await page.locator('#csubject').fill('Mock test');
      await page.locator('#cmsg').fill('A test message used only in intercepted requests.');
    };
    for (const status of [200, 400, 429, 500]) {
      await check(`Mocked contact HTTP ${status}`, async () => {
        await page.route('**/contact', (route) =>
          route.fulfill({ status, contentType: 'application/json', body: '{}' }),
        );
        await fill();
        await page.locator('#submitBtn').click();
        await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
        const note = await page.locator('#formNote').innerText();
        assert.match(note, status === 200 ? /accepted/ : status === 429 ? /Too many/ : /could not/);
        assert.equal(
          await page.locator('#cmsg').inputValue(),
          status === 200 ? '' : 'A test message used only in intercepted requests.',
        );
        await page.unroute('**/contact');
      });
    }
    await check('Mocked network failure preserves input', async () => {
      await page.route('**/contact', (route) => route.abort('failed'));
      await fill();
      await page.locator('#submitBtn').click();
      await page.waitForFunction(() => !document.getElementById('submitBtn').disabled);
      assert.match(await page.locator('#formNote').innerText(), /could not/);
      await page.unroute('**/contact');
    });
    await check('Mocked timeout abort restores the form', async () => {
      await page.route('**/contact', () => {});
      await fill();
      await page.locator('#submitBtn').click();
      await page.waitForFunction(
        () => !document.getElementById('submitBtn').disabled,
        {},
        { timeout: 16000 },
      );
      assert.match(await page.locator('#formNote').innerText(), /timed out/);
      await page.unroute('**/contact');
    });
    await check('Honeypot does not submit', async () => {
      await fill();
      await page.locator('#website').evaluate((el) => (el.value = 'spam'));
      await page.locator('#submitBtn').click();
      assert.match(await page.locator('#formNote').innerText(), /direct email/);
      await page.locator('#website').evaluate((el) => (el.value = ''));
    });
    await check('Reduced-motion preference disables smooth scrolling', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
        'auto',
      );
    });
    await check(
      'Home has one h1, main landmark, labelled controls, alt text and no duplicate ids',
      async () => {
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('main').count(), 1);
        assert.equal(await page.locator('img:not([alt])').count(), 0);
        assert.deepEqual(
          await page
            .locator('[id]')
            .evaluateAll((els) =>
              els.map((el) => el.id).filter((id, i, all) => all.indexOf(id) !== i),
            ),
          [],
        );
        assert.equal(
          await page
            .locator(
              'input[required]:not([aria-describedby]),textarea[required]:not([aria-describedby])',
            )
            .count(),
          0,
        );
      },
    );
    for (const width of [320, 375, 768, 860, 1024, 1440]) {
      for (const route of [
        'resume.html',
        'projects.html',
        ...JSON.parse(
          fs.readFileSync(path.join(__dirname, '../content.json'), 'utf8'),
        ).projects.map((project) => `case-studies/${project.id}.html`),
      ]) {
        await check(`${route}: ${width}px overflow and response`, async () => {
          await page.setViewportSize({ width, height: 950 });
          assert.equal((await page.goto(base + '/' + route)).status(), 200);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        });
      }
    }
    await check('Directory organizes all 13 projects by discipline', async () => {
      await page.goto(base + '/projects.html');
      assert.equal(await page.locator('.project-card:visible').count(), 13);
      await page.getByRole('button', { name: 'Cloud & DevOps', exact: true }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 8);
      await page.getByRole('button', { name: 'AI Engineering', exact: true }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      await page.getByRole('button', { name: 'Full-stack', exact: true }).click();
      assert.equal(await page.locator('.project-card:visible').count(), 2);
      assert.equal(await page.locator('a[href*="github.com/kefras/novamart"]').count(), 0);
      await page.goto(base + '/resume.html');
      const headings = await page.locator('.resume-paper h2').allTextContents();
      assert.ok(
        headings.indexOf('Cloud & DevOps Projects') < headings.indexOf('AI Engineering Projects'),
      );
      assert.match(await page.locator('.resume-paper').innerText(), /ETIKU AI/);
      assert.match(await page.locator('.resume-paper').innerText(), /Digital Twin AI/);
    });
    await check('Resume PDF download target returns PDF', async () => {
      const response = await page.request.get(base + '/resume.pdf');
      assert.equal(response.status(), 200);
      assert.match(response.headers()['content-type'], /pdf/);
    });
    await check('Web resume print layout is single-column', async () => {
      await page.goto(base + '/resume.html');
      await page.emulateMedia({ media: 'print' });
      assert.equal(
        await page
          .locator('.timeline-row')
          .first()
          .evaluate((el) => getComputedStyle(el).display),
        'block',
      );
      await page.emulateMedia({ media: 'screen' });
    });
    await check('Static content remains available without JavaScript', async () => {
      const nojs = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 375, height: 900 },
      });
      const p = await nojs.newPage();
      await p.goto(base);
      assert.equal(await p.locator('.project-card').count(), 6);
      assert.equal(await p.getByRole('link', { name: 'Explore projects' }).count(), 1);
      assert.equal(await p.locator('#navigation').isVisible(), true);
      assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await nojs.close();
    });
    await page.goto(base);
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
    await page.screenshot({ path: path.join(out, 'homepage-dark-desktop.png'), fullPage: true });
    await page.evaluate(() => (document.documentElement.dataset.theme = 'light'));
    await page.screenshot({ path: path.join(out, 'homepage-light-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
    await page.screenshot({ path: path.join(out, 'homepage-dark-mobile.png'), fullPage: true });
    await page.goto(base + '/resume.html');
    await page.setViewportSize({ width: 1024, height: 1000 });
    await page.screenshot({ path: path.join(out, 'resume-web.png'), fullPage: true });
    await check('No JavaScript runtime errors', async () => assert.deepEqual(errors, []));
  } catch (error) {
    results.push({ name: 'FAIL', passed: false, error: error.stack });
    console.error(error);
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(
      path.join(out, 'browser-results.json'),
      JSON.stringify({ results, errors }, null, 2),
    );
    await browser.close();
  }
})();
