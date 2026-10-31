# Credential verification — 31 October 2026

The owner supplied eight links during this audit. Six public Credly records were inspected in the browser. Cards reproduce the displayed title, issuer, recipient and issue date; they are classified as skill/training/course badges, not AWS exam certifications. No sign-in, credential change or account modification was performed.

| Credential | Issuer | Recipient displayed | Issue date | Result |
| --- | --- | --- | --- | --- |
| [Manage Kubernetes in Google Cloud Skill Badge](https://www.credly.com/badges/883171dd-b834-4ece-8837-eda169bdb6e5/public_url) | Google Cloud | Francis Kefas | 11 September 2026 | PASS — public record read |
| [AWS Cloud Quest: Cloud Practitioner - Training Badge](https://www.credly.com/badges/2b7bbe3e-783a-4bee-948f-a3521f833db4/public_url) | Amazon Web Services Training and Certification | Kefas Etiku Francis | 4 April 2026 | PASS — public record read |
| [AWS Cloud Quest: Generative AI Practitioner - Training Badge](https://www.credly.com/badges/45ffa510-cf69-4ca3-b84f-ddf3cb43eea9/public_url) | Amazon Web Services Training and Certification | Kefas Etiku Francis | 22 April 2026 | PASS — public record read |
| [LFS158: Introduction to Kubernetes](https://www.credly.com/badges/e81f1b94-e6ed-454f-b4f8-eb0e9c95abbb/public_url) | The Linux Foundation | Kefas Etiku Francis | 19 March 2026 | PASS — public record read |
| [LFS101: Introduction to Linux](https://www.credly.com/badges/60abffb8-96d3-42cd-a11f-36f4f6b6f822/public_url) | The Linux Foundation | Kefas Etiku Francis | 16 March 2026 | PASS — public record read |
| [LFS250: Kubernetes and Cloud Native Essentials](https://www.credly.com/badges/ef6e71ed-5c17-4d2b-8c60-fbb7d0ffac2d/public_url) | The Linux Foundation | Kefas Etiku Francis | 21 March 2026 | PASS — public record read |

The Google Cloud record displays **Francis Kefas**, as shown on the owner-supplied badge page. Other supplied Credly records display **Kefas Etiku Francis**. The Google Cloud badge was previously mislabeled as an AWS Certified credential in a legacy portfolio; that label is not reused.

## Excluded records

- [Oz Cloud Infrastructure Expert](https://university.ozlunara.com/verify/OZ-2026-F2F70646-TCLOUDEXPERT): the public page displays **Credential Not Found**.
- [Oz Cloud Security Architect](https://university.ozlunara.com/verify/OZ-2026-F2F70646-TCLOUDARCHITECT): the public page displays **Credential Not Found**.

Neither unresolved Oz record is published in the credential grid. Their absence does not establish why the record is unavailable; the issuer or owner must reconcile the URLs. The page suggests an incorrect URL or revocation as possibilities, which this audit does not determine.

## Publication rules

`content.json` controls the grid. A record requires confirmed=true plus name, issuer, date, kind, recipient and an HTTPS verification_url. Rendering escapes text and rejects incomplete records or credential-bearing/non-HTTPS URLs. The renderer has negative-case tests and a visible empty state for future collections with no confirmed records. Source/test fixtures are excluded from the public ZIP.
