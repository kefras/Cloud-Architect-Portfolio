# Current repository update

This change replaces old root files and duplicate uploaded folders with the latest refactored portfolio. The old versions remain in Git history.

Removed from the current tree:

- `Cloud Architect Portfolio/` and all nested historical copies.
- `Etiku master portfolio/`.
- The old `images/` directory and unreferenced root architecture PNGs.
- `kefas_e_francis_resume.pdf`, replaced by the current `resume.pdf`.

Included: the current homepage and web resume, ATS PDF, case studies, modular JavaScript and CSS, HTML templates, shared content, build helpers, tests and documentation. The internship title is **DevOps & Cloud Engineer Intern**, with **Build and Ship Academy Ltd | Remote** retained.

The original workflow uploaded only index.html. The updated workflow validates pull requests and deploys all required browser assets only on main. `tools/package_site.py` creates an explicit public-file package and excludes development sources and documentation. No bucket deletion, CloudFront invalidation, IAM change or real contact message is part of this update.

The local folder `C:\MY DOCUMENT AND FILES\Cloud Architect Portfolio` and its uncommitted work were not used as the Git checkout. A clean clone based on the current remote main was used, avoiding a reset or force push of the stale local branch.

Verification of this repository update: 361 offline checks passed; 65 browser checks passed against the actual 24-file public deployment package; JavaScript syntax and deployment-workflow YAML syntax passed. Development files and obvious credential patterns were checked before staging. Tests, screenshots and reports are kept under the ignored `.artifacts/tests/` directory. No production deployment was performed while preparing the review branch.
