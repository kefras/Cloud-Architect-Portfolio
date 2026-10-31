# Kefas Etiku Francis - Engineering Portfolio and AWS Hosting

A buildless HTML/CSS/JavaScript portfolio with a coordinated web resume, four evidence-based case studies and a one-page ATS PDF. No framework migration or production changes.

[Visit kefas.live](https://kefas.live/) · [Web resume](https://kefas.live/resume.html) · [Download resume](https://kefas.live/resume.pdf)

This repository contains one current portfolio at its root. Earlier duplicate folders and obsolete resume files have been removed from the current tree; previous versions remain available in Git history.

## AWS architecture

The portfolio uses Amazon CloudFront to deliver static content from a private Amazon S3 bucket, secured through Origin Access Control (OAC). Amazon Route 53 manages domain routing, while AWS Certificate Manager (ACM) provides the TLS certificate for HTTPS delivery.

Contact-form submissions are sent to Amazon API Gateway, processed by AWS Lambda, and delivered to the portfolio owner through Amazon SES. End-to-end contact submission and email delivery have been successfully tested, and CORS preflight for https://kefas.live has been verified.

The repository contains the frontend, reusable build tools and GitHub Actions deployment workflow. AWS backend resources, IAM policies, monitoring and budgets are configured separately.

![Week 12 AWS Infrastructure Architecture](https://github.com/kefras/Cloud-Architect-Portfolio/blob/main/Kefas-Portfolio-AWS-Architecture.png)



## Preview

From this folder:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765. The contact endpoint permits the production origin; local-preview submissions may be rejected by CORS. Use direct email for real contact. The browser test suite intercepts contact requests and never sends email.

## Content and generation

Edit `content.json` for identity, resume facts, skills and project evidence. The internship title is **DevOps & Cloud Engineer Intern**, at **Build and Ship Academy Ltd | Remote**. Both resume versions and the homepage use that same record.

`tools/build.py` is a small build entry point. The maintained sources are organized by responsibility:

| Change | Edit |
| --- | --- |
| Homepage sections | `templates/home/` |
| Shared navigation, project cards, experience rows and resume entries | `templates/` and `tools/components.py` |
| Page assembly and content mapping | `tools/pages.py` |
| Theme tokens, shared styles and section layouts | `css/00-tokens.css` through `css/09-accessibility-print.css` |
| Navigation, themes, filters, architecture or contact behavior | The matching file in `js/` |
| Shared browser helpers | `js/core.js` |
| Page initialization | `script.js` |
| ATS PDF layout | `tools/resume_pdf.py` |

Each feature initializer ignores pages without its controls, so the same scripts can be reused across the portfolio, resume and case studies. All feature scripts use one `window.Portfolio` namespace and deferred loading in a declared order. This preserves local-file preview support without JavaScript module/CORS requirements.

HTML templates use named `${slots}` and optional `<!-- include: home/section.html -->` partials. Plain content is escaped by shared rendering helpers. Missing template values fail the build. Comments explain component boundaries, accessibility behavior and error handling.

Rebuild after editing templates, content or CSS sources. The build produces readable `index.html`, `resume.html`, case studies, sitemap, both PDF copies and one combined `styles.css`. This keeps the CSS to one browser request while retaining smaller editable source files. Direct changes to generated HTML or `styles.css` will be replaced by the next build. The PDF condenses the same facts for one page; the web resume provides fuller evidence labels.

```powershell
python -m pip install -r tools/requirements.txt
python tools/assets.py
python tools/build.py
python tests/validate.py
node --check script.js
node --check theme.js
```

Generation uses ReportLab, Pillow and pypdf. Original SVG diagrams are generated from software architecture descriptions; no stock imagery or institutional screenshots are used. Assets contain no runtime external dependencies. `assets/og-image.png` is 1200×630.

To run browser regression checks with an installed Edge browser and Playwright on Node's module path:

```powershell
node tests/browser.cjs
```

Start the local server first. `PORTFOLIO_TEST_URL` can override its origin. Test artifacts are written to `.artifacts/tests/`, which Git ignores.

Optional automated accessibility and Lighthouse audits use QA packages outside the website:

```powershell
npm install --prefix ../qa --no-audit --no-fund lighthouse axe-core playwright
```

Set `NODE_PATH` to the installed Playwright module directory, then run `node tests/audit.cjs`. `PORTFOLIO_QA_DIR` can override the QA `node_modules` path. The recorded run used Lighthouse 13.6.0, axe-core 4.14.0 and installed Edge. Reproduce with the same versions and lockfile for direct comparisons; score variation is expected across machines.

## Files to deploy after a separate release decision

Run `python tools/package_site.py` after building. It creates an allowlisted `public-dist/` directory containing the HTML, PDF, stylesheet, scripts, sitemap, robots file and the `js/`, `assets/` and `case-studies/` directories. Use an empty output directory for each run. Source templates, documentation, tests and credentials are excluded from the deployment package.

The GitHub Actions workflow validates pull requests. A push or merge to `main` also syncs the complete public package to S3, using the existing `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `S3_BUCKET_NAME` repository secrets. It no longer uploads only index.html. It does not delete existing S3 objects or perform a CloudFront invalidation; cached content may require the existing CDN refresh process. Opening a pull request does not deploy the website.

## Behavior and accessibility

- Shared 860px desktop/mobile navigation breakpoint; Escape closes the menu and restores focus.
- Static HTML includes all primary content; no reveal gate or typing loop. Navigation remains usable without JavaScript.
- Theme storage failures do not break the site. Light/dark theme tokens, visible focus and reduced-motion support.
- Project filters use `aria-pressed`; the illustrative architecture supports Tab, arrows, Home/End, Enter and touch.
- Contact validation, associated errors, status announcements, bounded fields, honeypot, duplicate-request guard and 12-second timeout. These client controls do not replace backend validation or spam mitigation.
- Separate A4 ATS PDF with selectable text and logical extraction order; web print CSS is also single-column.

Read `docs/PORTFOLIO_AUDIT.md`, `docs/CONTENT_VERIFICATION.md`, `docs/IMPLEMENTATION_SUMMARY.md` and `docs/TEST_RESULTS.md` for evidence, measured results and outstanding limits.
