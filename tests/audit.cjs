/* Optional axe + Lighthouse QA. Install QA-only packages outside the site. */
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const qa = path.resolve(
  process.env.PORTFOLIO_QA_DIR || path.join(__dirname, '../../qa/node_modules'),
);
const out = path.resolve(__dirname, '../.artifacts/tests');
fs.mkdirSync(out, { recursive: true });
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:8765';
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: 'msedge',
    args: ['--remote-debugging-port=9223'],
  });
  try {
    const page = await browser.newPage();
    const axe = fs.readFileSync(path.join(qa, 'axe-core/axe.min.js'), 'utf8');
    const audits = [];
    const projects = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../content.json'), 'utf8'),
    ).projects;
    for (const route of [
      '',
      'resume.html',
      'projects.html',
      ...projects.map((project) => `case-studies/${project.id}.html`),
    ]) {
      for (const width of [375, 1440])
        for (const theme of ['dark', 'light']) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(base + '/' + route);
          await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
          await page.addScriptTag({ content: axe });
          const r = await page.evaluate(() =>
            axe.run(document, {
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'],
              },
            }),
          );
          audits.push({
            route: route || 'index.html',
            width,
            theme,
            violations: r.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
            })),
            passes: r.passes.length,
          });
          console.log(
            'AXE',
            route || 'index.html',
            width,
            theme,
            'violations',
            r.violations.length,
          );
        }
    }
    fs.writeFileSync(path.join(out, 'axe-results.json'), JSON.stringify(audits, null, 2));
    if (audits.some((a) => a.violations.length)) process.exitCode = 1;
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.goto(base);
    await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'));
    await page.screenshot({ path: path.join(out, 'homepage-desktop-top.png') });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.screenshot({ path: path.join(out, 'homepage-mobile-top.png') });
    const { default: lighthouse } = await import(
      pathToFileURL(path.join(qa, 'lighthouse/core/index.js')).href
    );
    const reports = [];
    for (const preset of ['mobile', 'desktop']) {
      const flags = {
        port: 9223,
        output: ['json', 'html'],
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      };
      const configuration =
        preset === 'desktop'
          ? {
              extends: 'lighthouse:default',
              settings: {
                formFactor: 'desktop',
                screenEmulation: {
                  mobile: false,
                  width: 1440,
                  height: 900,
                  deviceScaleFactor: 1,
                  disabled: false,
                },
                throttling: {
                  rttMs: 40,
                  throughputKbps: 10240,
                  cpuSlowdownMultiplier: 1,
                  requestLatencyMs: 0,
                  downloadThroughputKbps: 0,
                  uploadThroughputKbps: 0,
                },
              },
            }
          : undefined;
      const r = await lighthouse(base, flags, configuration);
      fs.writeFileSync(path.join(out, `lighthouse-${preset}.json`), r.report[0]);
      fs.writeFileSync(path.join(out, `lighthouse-${preset}.html`), r.report[1]);
      const scores = Object.fromEntries(
        Object.entries(r.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]),
      );
      reports.push({ preset, scores, version: r.lhr.lighthouseVersion });
      console.log('LIGHTHOUSE', preset, JSON.stringify(scores));
    }
    fs.writeFileSync(path.join(out, 'lighthouse-summary.json'), JSON.stringify(reports, null, 2));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
