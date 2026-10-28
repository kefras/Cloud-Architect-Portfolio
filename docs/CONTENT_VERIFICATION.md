# Content verification

Evidence reviewed on 28 October 2026. Repository files are evidence of implementation, not proof of production operation, authorship of every commit, adoption or performance.

## Identity and experience

Name, Abuja location, B.Sc. Computer Science at Miva Open University and expected graduation in 2027 come from the explicit user request. Email, phone and LinkedIn URL come from supplied source files. The public [LinkedIn profile](https://ng.linkedin.com/in/kefas) corroborates the early-career positioning, education, Build and Ship association and Cloud Quest training badge titles.

The SIWES, Schull training and Miva Buddy dates are retained as user-supplied resume facts, with narrower descriptions and no quantified results. They are not independently employer-verified. Start year is omitted from education: the local resume says 2023 while the public LinkedIn record says 2024. Only the user-confirmed expected graduation is used. Founder/lead-instructor and additional honors were omitted pending confirmation.

## Project evidence

| Project | Reviewed revision / files | Supported claims | Limits |
| --- | --- | --- | --- |
| [NASENI Research LIMS](https://github.com/kefras/naseni-research-lims) | Tree `9d32bffb8af8bc9c141c1539bea0c5b2f2289e6b`; backend/app/main.py, backend/app/auth.py, frontend/package.json, frontend/src/app/App.tsx, compose.yaml | FastAPI, React/TypeScript, PostgreSQL/SQLAlchemy, Docker Compose, JWT, role dependencies, sample history and audit routes | In development; no institutional endorsement or live operation verified. README says no frontend, but source contains one. Generic diagram only; no operational records/screenshots reproduced |
| [Container delivery on AWS](https://github.com/kefras/Production-Grade-AWS-EKS-Microservices-Deployment-with-Terraform-and-Kubernetes) | Tree `175a90212429e944e9de1e0f584dc319090c55d9`; Dockerfile `f99acbbef6bfd0a250ee67ab353d948252a3a318`; workflow `e9c4f3ff9f0fc5ca5342b3fdb03308b3eebdb4d2` | Non-root Nginx container; GitHub Actions builds, scans and pushes SHA/latest tags to ECR | No Terraform/Kubernetes files in tree. Trivy exit-code 0 is advisory. AWS access-key secret references are configuration, not exposed literal credentials. No workflow executed or cloud access performed |
| [RouteNG](https://github.com/kefras/RouteNG) | Tree `a1200ed557dffa85612b2b6ee69beea091b0bd72`; README, package.json, src/server.js | Vanilla HTML/CSS/JS frontend; Express/PostgreSQL; JWT cookies; ride/booking routes; row locks; optional Paystack initialize/verify routes | MVP. No production user numbers, live payments, booking correctness or end-to-end test result verified. README lists reconciliation, webhooks and operational controls as unfinished |
| [Terraform foundations](https://github.com/kefras/terraform-github-actions-aws-pipeline) | terraform/main.tf `cecf7c4a5b8893e363a0af1894bc866e526b92b9`; workflow `0df775edb7e277b82c824991a6ff3ea1c2cb9e70` | AWS provider plus one S3 bucket resource; illustrative S3 sync workflow | Foundational lab, not EKS infrastructure. Workflow bucket is a placeholder. No apply performed |
| [NovaMart candidate](https://github.com/kefras/novamart-aws-agentcore-multi-agent-rag) | README fetch returns GitHub 404; absent from accessible owner repository search | User supplied a project name and candidate technologies | Not published as implemented work. 404 does not prove nonexistence: private, renamed or unavailable access is possible |

Repository search reviewed the accessible kefras catalog to choose inspectable work. Other projects were not automatically imported because the old portfolio descriptions were not sufficient evidence of their outcomes. Public case studies include ten requested topics: context, objectives, role, architecture, implementation, decisions, challenges, verification, status and lessons. Lessons are presented as design observations and next steps, not invented personal anecdotes.

## Credentials

No verified certification list is published until issuer records can be reconciled. This avoids converting training badges into professional certifications.

- AWS Certified Cloud Practitioner and AWS Certified Solutions Architect cards reused URLs also assigned to Google Cloud cards. Exact certification name, level, issuer record, badge ownership and validity are unresolved.
- Cloud Quest Cloud Practitioner and Generative AI Practitioner titles appear in the supplied resume and public profile as **training badges**, issued April 2026; issuer verification pages were unavailable to the web reader. They are not treated as AWS certifications.
- Linux Foundation LFS101/LFS158/LFS250, Oz University credentials, Hashgraph/Hedera and other awards require accessible issuer evidence and owner/title/date confirmation.
- Generic repeated Credly badge artwork was removed.

## Information to confirm

1. Exact employment/internship start and end dates, official organization/role names, and ongoing status.
2. Education start year if it should appear (2023 local vs 2024 public profile).
3. Issuer verification links or certificates with owner name, credential title, issue/expiry dates and identifier.
4. Accessible NovaMart repository and implementation/test evidence.
5. Individual contributions and team roles for all featured projects. Repository ownership alone is not commit attribution.
6. Written clearance for any future institutional NASENI screenshots, branding or operational detail. Current visuals contain no such material.
7. Any verified public demos. None is linked as live without evidence.
8. Supporting test logs before adding latency, uptime, cost, throughput or user-count metrics.

The current resume deliberately omits unsupported certification claims and measured performance results. A skills-oriented professional headline is not represented as employment in three disciplines.
