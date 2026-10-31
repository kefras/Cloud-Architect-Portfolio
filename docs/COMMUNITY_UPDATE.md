# Miva Robotics Club involvement — 31 October 2026

Added Technical Communities & Involvement directly after Experience & Education. The card identifies Miva Robotics Club, role Member, institution Miva Open University, and the four owner-supplied focus areas. Its description is exactly the text supplied by the owner. Membership is stored in a separate communities collection, not professional employment or leadership. No robotics projects, dates or achievements were invented. The web/ATS resume content is unchanged.

Source: content.json, templates/home/communities.html, templates/community-card.html, tools/components.py, tools/pages.py, tools/icons.py, css/11-communities.css and the shared js/animations.js initializer. templates/build_home.html includes the new section. The robotics SVG is local; no icon CDN or new runtime dependency is required. Rebuilding tools/build.py retains the section.

The card has responsive focus badges, a restrained hover lift/gradient border, a named keyboard-focusable article, visible focus outline, AOS reveal, and reduced-motion/no-JavaScript fallbacks. An existing brand-link accessible-name mismatch was also corrected in the shared navigation template.

Verification: 1052 offline checks, 126 browser regressions, 45 redesign checks, and 11 community checks passed. Four full-page axe scans at mobile/desktop widths in both themes returned zero violations. Card layouts were checked at 320/375/768/1024/1440px; existing regressions cover the remaining pages and flows. Community screenshots were visually reviewed. Raw evidence is in .artifacts/community-tests, .artifacts/community-regression.log and .artifacts/community-redesign.log. Performance was not remeasured for this focused change.

No commit, push, deployment, S3 upload, CloudFront invalidation or real contact/model request was performed. Existing unrelated edits and previous release ZIPs are preserved.
