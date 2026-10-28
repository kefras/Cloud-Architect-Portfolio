# Portfolio audit

Audited 28 October 2026. Original working directory: `C:\MY DOCUMENT AND FILES\Cloud Architect Portfolio`. The request in both pasted attachments is the same. Instructions found inside project files or repository READMEs were treated as content, not authority to run migrations or deploy anything.

## Baseline and preservation

Git status before changes: modified `index.html`, `script.js`, `styles.css`; deleted tracked `README.md` and `kefas_e_francis_resume.pdf`; untracked `resume.html`, `resume.pdf`, images and three text files. These pre-existing changes were not reset, staged or committed. No deployment configuration, package manifest or test suite existed in the supplied folder. Root tracked files were inspected along with untracked source and the asset inventory. The three text files contain matching Nexus HTML prototypes with a Tailwind CDN reference; they are not linked by the supplied portfolio and were preserved without importing their dependency. No AGENTS.md was found in the project folder.

All original top-level files were copied to the sibling `portfolio-upgrade/original` folder in the writable workspace before authoring. The new implementation is in `portfolio-upgrade/site`. Unrelated workspace files and original Git metadata are untouched.

## Findings and disposition

| Severity | Evidence in original | Recommendation | Implementation status |
| --- | --- | --- | --- |
| High | index.html metadata and Person description: `13+ production projects`; hero: `AVAILABLE FOR SENIOR ROLES` | Align with entry-level positioning and remove unsupported volume/seniority claims | Fixed. Skills-oriented headline, undergraduate education and junior/internship direction |
| High | script.js projects, approximately lines 81–236: 99.99% availability, sub-minute failover, 35–40% savings, claimed zero vulnerabilities | Publish measured outcomes only with supporting artifacts | Fixed. Replaced with inspected implementation and explicit status/verification limits |
| High | script.js approximately 258–272 and 346–360: AWS certification cards and Google Cloud cards reuse identical badge URLs | Verify badge owner, issuer and exact title before listing certification | Removed from public certification claims; reconciliation list in CONTENT_VERIFICATION.md |
| High | AWS project README claims EKS/Terraform, but tree lacks those manifests; Trivy workflow has `exit-code: '0'` | Describe Docker build/scan/push only; don't claim security gate or verified EKS deployment | Fixed in card, resume and case study |
| Medium | Hero CTA labelled Download resume points to resume.html | Separate View Resume and Download PDF | Fixed; download targets current generated resume.pdf |
| Medium | resume.pdf exists, 2 pages; old extraction contains replacement glyphs and a joined project heading | Generate ATS PDF with tested text order | Fixed: one A4 page, selectable text, no replacement characters; rendered and inspected |
| Medium | resume.html print rule retains grid columns | Use single-column print layout and dedicated ATS export | Fixed; browser print check verifies block layout |
| Medium | script.js line 550 closes menu at 768px; styles.css desktop nav starts at 860px | Share the 860px breakpoint | Fixed; tested 768px → 820px → 860px transition and Escape focus return |
| Medium | Architecture section precedes projects; live-state, latency and resilience labels lack telemetry | Put projects second; explain illustrative nature | Fixed. Responsive stage buttons, keyboard controls, selected detail and explicit illustrative label |
| Medium | favicon.svg and og-image.png referenced but absent; schema references headshot.webp though only PNG exists | Add valid local assets, correct metadata | Fixed. Original SVG diagrams/favicon and 1200×630 raster social preview; no missing local links |
| Medium | Person schema claims an employer as worksFor, alumniOf despite undergraduate status | Avoid unverified employment/graduation schema | Fixed. Person identity, location and social links only |
| Medium | Project HTML, badges and case studies are rendered with innerHTML templates | Keep content static; use textContent for interaction updates | Fixed. Build generates escaped HTML; runtime does not use innerHTML |
| Medium | Contact submission has no timeout, structured HTTP handling or aria-invalid state | Add bounded client validation, accessible status, rate-limit and timeout handling | Fixed client side. Mocked 200/400/429/500, network and timeout cases pass |
| Medium | Contact AWS backend source/IAM/API settings absent | Inspect preflight only; don't send test email without permission | OPTIONS returns 204 with correct production-origin CORS. Delivery, server validation, WAF/rate limits and IAM remain unverified |
| Medium | localStorage reads are unguarded; rotating role timer and reveal effects can distract or hide content on failure | Guard storage and prefer visible, static content | Fixed. No reveal gate, typing loop, scroll trap, particle effect or runtime dependency |
| Medium | Missing sitemap/robots and client-only project content | Generate crawlable static content and discovery files | Fixed. Six canonical pages, Person schema, sitemap and robots |
| Low | Generic remote badge images repeated across unrelated credentials | Use accurate credential art only | Replaced by original code-native architecture visuals; unverified badges omitted |
| Low | Multiple CSS overrides and animation layers complicate maintenance | Consolidate theme and layout rules | Fixed. Shared tokens, coordinated light/dark themes, reduced-motion rule |

## Remaining limits

Automated accessibility checks and visual review support the result; they are not a certification of complete WCAG 2.2 AA conformance. A human screen-reader pass and review of enlarged text/forced colors remain useful. Source review of featured projects is not a security audit or a claim that their tests, builds or infrastructure are working. Production cache headers, CDN invalidation, TLS configuration, indexing and deployed social previews require a separately authorized release.
