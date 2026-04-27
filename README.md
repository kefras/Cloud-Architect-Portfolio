# 🌐 AWS Cloud Architect Portfolio
**A secure, high-availability personal portfolio architected on AWS.**

Live Demo: [https://kefas.live](https://kefas.live)

## 📖 Project Overview
This project demonstrates a production-ready deployment of a static portfolio. Moving beyond basic web hosting, this architecture focuses on **security at the edge**, **global content delivery**, and **infrastructure best practices**. 

By utilizing **Origin Access Control (OAC)**, the S3 origin remains entirely private, forcing all traffic through a secure, SSL-encrypted CloudFront distribution.

## 🏗️ Architecture
The infrastructure is built using the following AWS services:

* **Amazon S3**: Hosts the static website assets (HTML/CSS) in a private bucket.
* **Amazon CloudFront**: Acts as a Content Delivery Network (CDN) to serve content globally with low latency.
* **AWS Route 53**: Manages DNS and domain delegation for `kefas.live`.
* **AWS Certificate Manager (ACM)**: Handles SSL/TLS certificates for end-to-end HTTPS encryption.
* **Origin Access Control (OAC)**: Restricts bucket access strictly to CloudFront, preventing direct S3 URL exposure.

## 🛡️ Security Features
* **Least Privilege IAM Policies**: Configured specific JSON policies to allow only the CloudFront Service Principal to perform `s3:GetObject` actions.
* **SSL/TLS Encryption**: Enforced HTTPS redirects to ensure all user data is encrypted in transit.
* **Private Origin**: The S3 bucket has "Block All Public Access" enabled, serving as a secure origin shield.

## 🚀 Key Technical Challenges & Solutions
### The "Access Denied" (403) Hurdle
**Challenge:** Initially encountered 403 errors when transitioning from S3 Public Hosting to CloudFront OAC.  
**Solution:** Identified that the S3 REST endpoint must be used instead of the website endpoint. Updated the S3 Bucket Policy with a unique CloudFront `SourceArn` condition to complete the security "handshake."

### DNS Propagation & SSL Validation
**Challenge:** Validating the custom domain via ACM.  
**Solution:** Utilized Route 53 DNS validation to issue a public certificate in the `us-east-1` region, enabling the professional "padlock" icon on the custom domain.

## 🛠️ Tech Stack
* **Cloud:** AWS (S3, CloudFront, Route 53, ACM, IAM)
* **Frontend:** HTML5, CSS3
* **Tools:** Git, GitHub

## 👨‍💻 About the Author
**Kefas Etiku Francis**  
*BSc. Computer Science Student | Cloud & DevOps Enthusiast*  
SIWES Trainee at **Build and Ship Academy**

---
