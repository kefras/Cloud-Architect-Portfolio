> The full redesign audit in REDESIGN_AUDIT.md supersedes the homepage-only AOS scope and earlier package counts below. The shared header now uses a 96px delivery image, and section reveals operate across generated HTML pages.

# Hero headshot — 31 October 2026

This local change integrates the supplied professional portrait. It does not change project content, publish the broader redesign brief, or deploy the site.

## Maintained source

- `templates/home/home.html`: semantic figure/picture, meaningful alt text, explicit 1086 × 1448 dimensions and eager/high-priority loading. The original PNG is preserved without retouching. Browsers choose among 320/480/720/1086-pixel WebP delivery copies; PNG is the fallback.
- `tools/portrait_assets.py`: reproducibly generates the four responsive WebP sizes from the original image during every build. At quality 84, files range from about 11 KB to 101 KB instead of downloading the 2.08 MB original on supported browsers.
- `css/03-hero.css`: gradient frame, restrained shadow, fine-pointer hover lift and separate transforms for entrance/hover.
- `css/08-responsive.css`: centered portrait remains visible at mobile/tablet widths; desktop uses the two-column hero.
- `templates/head.html` and `tools/components.py`: pinned local AOS CSS/JS load only on the homepage, before initialization.
- `js/animations.js` and `script.js`: one-time AOS entrance, reduced-motion support (including preference changes), and visible content when JavaScript or AOS fails.
- `tools/package_site.py`: includes `headshot/`; vendor files and MIT license are included through `assets/`.

Official dependency: [AOS 2.3.4 source and integration documentation](https://github.com/michalsnik/aos/tree/v2.3.4). Its files are checked in locally, with no production CDN dependency.

## Rebuild and package

Run `python tools/build.py` from the repository root. Edit source templates/CSS rather than generated index.html/styles.css. Then run `python tools/package_site.py --output .artifacts/headshot-release` with a new or empty output directory. A nonempty destination is deliberately rejected.

For a future S3 upload, upload the package contents at the existing website root. Preserve `headshot/kefas-headshot.png`, `assets/vendor/aos-2.3.4/` and `js/animations.js` exactly, along with the rebuilt HTML/CSS/JS. S3 object names are case-sensitive. Do not upload the source repository or an archive into the website root. Keep the existing bucket permissions and CloudFront origin configuration.

No AWS upload, CloudFront invalidation, commit or push is part of this change. Local static HTTP verification confirms compatible paths and PNG content type; an authenticated S3 upload has not been tested.

## Verification

The rebuilt static package passed 973 offline checks, 126 browser regressions and 15 portrait-specific checks. Final axe scans reported zero violations across 64 page/theme/viewport combinations. Local Lighthouse Performance measured 98 mobile / 95 desktop, with 100 Accessibility, Best Practices and SEO on both. These are local measurements; no production deployment was performed. Screenshots were visually reviewed. Exact-case asset and srcset paths were verified against the 52-file package.

The clean local release is S3_UPLOAD_HEADSHOT, with Kefas-Portfolio-Headshot-S3.zip alongside it. S3_UPLOAD_CLOUD_AI was also refreshed, preserving the user-added archive inside that folder. Prefer the clean release folder for any future upload. Original maintained files were backed up under .artifacts/before-headshot-original; previous upload files were backed up under .artifacts/before-headshot-upload.
