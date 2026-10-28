# Project and resume content verification

Updated 28 October 2026. This revision replaces the earlier three-project CV selection. It distinguishes source implementation, historical lab evidence, owner-supplied deployment evidence and future work.

## Identity and experience

Name, Abuja location, B.Sc. Computer Science at Miva Open University and expected graduation in 2027 come from the user. The title **DevOps & Cloud Engineer Intern** and **Build and Ship Academy Ltd | Remote** were explicitly confirmed by the user. Other experience dates remain user-supplied. Education start year is omitted because prior local/public records disagreed. No employer verification or certification claim is added.

## Project evidence matrix

| Project | Evidence reviewed | What can be described | Limits |
| --- | --- | --- | --- |
| [AWS portfolio](https://github.com/kefras/Cloud-Architect-Portfolio) | Current application/workflow/package source, CORS preflight, owner-confirmed manual S3 upload | Portfolio delivery work, API Gateway contact integration, documented CloudFront/OAC and Lambda/SES design | GitHub deployment credentials failed; manual upload subsequently confirmed by owner. Lambda/IAM/email delivery not independently inspected |
| [AWS container delivery](https://github.com/kefras/Production-Grade-AWS-EKS-Microservices-Deployment-with-Terraform-and-Kubernetes) | Dockerfile and GitHub Actions workflow | Non-root Nginx container, Docker build, advisory Trivy report, SHA-tagged ECR push | No Terraform/EKS manifests were present in the reviewed tree. No enforced scan gate or production deployment claimed |
| [Kubernetes orchestration](https://github.com/kefras/kubernetes-scalable-app) | deployment.yaml and service.yaml; tree 9ce9ef918c085f98d1cd99332271618b90933ed2 | Three configured replicas, CPU/memory requests and limits, label-selected NodePort Service | No HPA or readiness/liveness probes in those manifests; no current cluster/scale benchmark inspected |
| [EC2 Docker application](https://github.com/kefras/DevOps-Cloud-Engineer-Practical-Evaluation-Assignment) | README and selected EC2 build/deploy screenshots; tree 8ae9704329ede935e824b318f522506dae95a820 | Successful historical Nginx image build and deploy.sh run, port conflict/build-context troubleshooting | Dockerfile/deploy.sh not standalone tracked files; no current instance availability or zero-downtime result claimed |
| [ALB/Auto Scaling lab](https://github.com/kefras/High-Availability-Web-Tier-Project-2-) | README and target-group screenshots; tree 94f41812e27b4520f1890f93c4ae102c23662286 | Documented launch-template/ASG work and a healthy target at screenshot capture time | Minimum capacity one does not prove continuous multi-AZ redundancy. No measured failover or uptime adopted |
| [RDS lab](https://github.com/kefras/aws-cloud-databases-lab) | README and architecture asset inventory; tree f8566401b686ab69cf27b67c299c60e13fa0c2dc | Documented subnet-group, ingress and connectivity work | Documentation-backed; no IaC or measured failure/restore logs reviewed |
| [CloudWatch operations](https://github.com/kefras/aws-architecture-observability-security) | README and alarm screenshots; tree fc216d35fd484dba7d1a16d49d95e709b92d5863 | Configured CPU alarm; documented dashboard/SNS path | Screenshot shows Insufficient data. No successful incident notification, remediation or calculated savings claimed |
| [Terraform foundations](https://github.com/kefras/terraform-github-actions-aws-pipeline) | AWS provider/S3 resource and S3-sync example | Foundational Terraform/S3 practice | Placeholder deployment destination; not a multi-environment EKS platform |
| NovaMart Multi-Agent RAG | Authorized owner-account review of private source structure and implementation symbols | High-level Bedrock/Strands orchestration, retrieval helpers, DynamoDB/Lambda tools, tracing/Guardrail hooks and deployment tooling | Repository stays private. No private source, configs, identifiers or screenshots published. No runtime/model/test execution or live AgentCore deployment claimed |
| [Digital Twin AI](https://github.com/kefras/digital-twin-ai) | pipeline.py, semantic_retriever.py, pdf_chat.py, three test files and CI; tree 9a9acd80247d87d4bed53355209d14b2ff0a538f | Semantic retrieval, rule-based knowledge-base path, separate Gemini PDF path, embedding/search components and core tests | The repository screenshot records 21 tests historically. No fresh project test run/model call here; those tests do not establish PDF answer quality. README's older repository link is not reused |
| [ETIKU AI](https://github.com/kefras/etiku-ai) | assistant.py, entry point, session_storage.py, supabase_storage.py; tree 2310c6fea69f7284369494c4a7f849621fc6cd36 | Gemini streaming, settings and conversation management; newer auth/storage integration in source | README and supplied screenshot describe the older session-only demo. Current source uses Supabase. Hosted persistence, schema and RLS not verified; RAG/PDF/voice remain ETIKU roadmap items |
| [NASENI LIMS](https://github.com/kefras/naseni-research-lims) | Previously reviewed FastAPI/auth, React/TypeScript and Compose source | In-development research record and sample workflow | No institutional endorsement, operational screenshots or production-deployment claim |
| [RouteNG](https://github.com/kefras/RouteNG) | Previously reviewed Express/PostgreSQL API and vanilla frontend | Transportation MVP, cookie authentication and row-locked booking source | No live-payment/user-volume claim; payment integration optional |

The supplied Streamlit URLs and screenshots are included as demo evidence/links. The web reader could not open the hosted pages during this review. No prompts, sign-ins, PDF uploads or paid model requests were sent.

## Review of other candidates

`devops-cicd-pipeline` contains README/screenshots but no checked-in workflow, Dockerfile or Terraform source in the reviewed tree; it is not used to justify all README feature claims. `dockerized-app-deploy-v2` overlaps the stronger practical-evaluation evidence and is not counted as an additional independent flagship. Repository titles and descriptions alone are not treated as proof of implemented scope.

## Resume selection

The ATS CV explicitly includes five Cloud/DevOps projects and two AI projects on one A4 page. The web resume also covers further AWS labs and software work. This is controlled through content.json rather than an implicit first-three-project slice. Skills now include demonstrated AI work instead of marking all AI implementation evidence as pending.

## Credentials and remaining confirmations

Credential cards remain unpublished until owner, exact title, issuer, issue/expiry dates and verification links are reconciled. Training badges are not represented as AWS professional certifications. Experience dates and the education start-year conflict remain unchanged pending confirmation. Future institutional NASENI material requires appropriate public-release authorization.

To strengthen the cloud labs, supply the actual Dockerfile/deploy.sh, reproducible ALB/ASG/RDS/CloudWatch configuration and measured drill logs. Never add uptime, failover, savings or user-count metrics without supporting evidence. Proposed next projects are listed only in PROJECT_STRATEGY.md and are not represented as completed work.
