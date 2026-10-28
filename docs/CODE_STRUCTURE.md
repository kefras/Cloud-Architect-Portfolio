# Maintaining the portfolio

The source is split into reusable pieces; generated files stay readable. No framework or runtime package was added.

## Browser code

`theme.js` applies the saved theme before paint. Deferred scripts then load in order: `js/core.js`, feature scripts, and the small `script.js` bootstrap. One `window.Portfolio` namespace holds the shared DOM/pressed-state helpers and initializers. Features return when their controls are absent, allowing all pages to share the same initialization path.

`js/contact.js` separates validation messages, field validation, form validation, pending state, failure messages and network submission. It retains the existing payload, timeout, honeypot, announcements and retry behavior. No real messages were used for testing.

`css/` contains ten ordered sources, covering tokens, common elements, navigation, hero, projects, capabilities, experience/contact, page layouts, responsive adjustments and accessibility/printing. `tools/build_workflow.py` combines them into `styles.css` without minification or extra browser requests.

## HTML and build helpers

`templates/home/` has one partial per homepage section. `templates/` also contains navigation, metadata, footer, heading, project, skill, experience and resume components. `tools/components.py` escapes content and renders reusable fragments. `tools/pages.py` assembles pages. `tools/rendering.py` handles strict named-slot substitution and readable HTML output while preserving inline text. `tools/resume_pdf.py` owns the PDF layout. `tools/config.py` loads the shared content and paths.

The normal command remains:

```powershell
python tools/build.py
```

Change facts in `content.json`, HTML in templates, style sources in `css/`, and interactions in `js/`. Do not maintain generated HTML and source templates separately. The PDF skill-summary text now also lives in content.json rather than being duplicated in the PDF renderer.

## Requested wording

The experience record now reads **DevOps & Cloud Engineer Intern** followed by **Build and Ship Academy Ltd | Remote**. The homepage, web resume and generated ATS PDF all use this record. Dates and organization wording are unchanged.

## Preservation

The complete pre-refactor source was copied to `portfolio-refactor/original` in the writable workspace. Existing Git changes, unrelated images and prototype files are preserved. No commit, push or deployment is part of this refactor.


## Project selection

`content.json` now defines `featured_project_ids`, `resume_sections` and `resume_web_extras`. `tools/config.py` resolves these identifiers for both resume renderers. `tools/pages.py` also builds the full projects.html directory; `tools/project_diagrams.py` creates safe schematics for new entries. `tools/components.py` renders available category filters and suppresses source links for private projects. Add a project once, then select it explicitly for the homepage or CV.
