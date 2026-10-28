# Project strategy for Cloud and DevOps applications

Reviewed 28 October 2026. The aim is to make practical work easy to assess. No project list can guarantee an employer's attention; clear implementation, reproducible tests and explained tradeoffs give a reviewer stronger evidence than broad production claims.

## How the projects are organized

The one-page ATS CV now has **five Cloud/DevOps projects first**, followed by **two AI projects**. The web resume also includes additional infrastructure labs and software projects. The homepage highlights six projects and links to a complete, filterable directory of 13.

| Placement | Project | Why it belongs there |
| --- | --- | --- |
| Core Cloud/DevOps CV | AWS Portfolio & Serverless Contact | Actual hosting work, current site, deployment packaging and contact integration |
| Core Cloud/DevOps CV | Container delivery on AWS | Inspectable Dockerfile and GitHub Actions build/report/push configuration |
| Core Cloud/DevOps CV | Kubernetes Application Orchestration | Inspectable Deployment and Service manifests with replicas and resource budgets |
| Core Cloud/DevOps CV | Dockerized Application on EC2 | Historical EC2 build and deploy-script evidence, Linux troubleshooting |
| Core Cloud/DevOps CV | NovaMart Multi-Agent RAG | AWS agent/workflow implementation; private source remains private |
| AI section | Digital Twin AI | Retrieval/PDF-chat implementation, embedding/search tests and demo evidence |
| AI section | ETIKU AI | Streaming integration, UI/state management and model settings; current auth/storage code identified |
| Additional Cloud labs | ALB/Auto Scaling, RDS, CloudWatch, foundational Terraform | Relevant practical breadth, clearly labelled by the evidence available |
| Software section | NASENI LIMS and RouteNG | Useful application/database experience without displacing the Cloud/DevOps work |

The former `projects[:3]` selection has been removed. `featured_project_ids`, `resume_sections` and `resume_web_extras` in content.json now control each output explicitly.

## Three stronger next projects — proposed, not completed

These extend existing work. They are not listed as completed projects or skills on the CV, and this task does not create cloud resources.

### 1. Reproducible AWS application delivery

Start from the current portfolio/container work. Put the actual deployment configuration under Terraform, use a tested GitHub Actions release workflow and authenticate through a narrowly scoped GitHub OIDC role. Demonstrate a clean deployment and a rollback with captured logs.

Deliverables to build:

- Versioned infrastructure definitions and documented environment inputs.
- Formatting/validation and meaningful infrastructure tests.
- A reviewed deployment plan, immutable image/artifact reference and rollback procedure.
- OIDC trust conditions restricted to the intended repository/ref or environment.
- Deployment and rollback evidence with measured timestamps, not invented speed improvements.

This directly addresses the current static AWS-key failure and the gap between README scope and checked-in Terraform. GitHub documents how OIDC removes the need for long-lived AWS secrets, including restrictions on trusted subjects: [GitHub OIDC for AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws). Terraform provides native testing features: [Terraform testing](https://developer.hashicorp.com/terraform/cli/test).

### 2. Observable service and recovery exercise

Build on the ALB, RDS and CloudWatch labs. Define the dashboards/alarms as code, run a controlled failure, record the observed signal and notification, follow a runbook and restore the application or data.

Deliverables to build:

- A defined service objective and an explicit failure scenario.
- Dashboard/alarms as code, structured logs and a recorded notification receipt.
- A runbook, recovery steps and a short incident review.
- A backup/restore test with measured recovery time and stated data-loss boundary.
- A distinction between an estimate from a pricing tool and a measured bill.

The current alarm screenshot shows **Insufficient data**, so the next meaningful evidence is an observed state transition and response. The [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) provides a useful review structure for reliability, security, operations and cost tradeoffs. Any paid lab should have an explicit budget and teardown procedure before execution; no cost estimate is asserted here.

### 3. Deploy and evaluate one AI application as an engineered service

Choose Digital Twin or ETIKU rather than creating another shallow chatbot. Add a reproducible runtime, CI, safe secret injection, health checks and evaluation artifacts. Keep model integration tests separate from local unit tests and from answer-quality evaluation.

Deliverables to build:

- Container/build configuration and a documented deployment path.
- Mocked model/network tests plus an explicitly authorized integration-test procedure.
- A fixed question/document evaluation set, retrieval/source checks and abstention tests.
- Basic request/error/latency telemetry and a measured API-cost record.
- Documented storage boundaries and authentication tests; reconcile ETIKU's session-only README with its newer Supabase-backed code.

Success should be supported by test outputs and an architecture walkthrough. None of these proposed improvements is presented as already implemented.

## Immediate repository improvements

Before adding new project names, commit the actual scripts/manifests currently visible only in screenshots: the EC2 Dockerfile/deploy.sh, ALB/ASG configuration, RDS setup and CloudWatch alarm/dashboard definitions. Add a safe sample configuration, setup/teardown steps, verification commands and a short troubleshooting note to each repository. Remove or qualify unmeasured uptime/cost claims and outdated README links.
