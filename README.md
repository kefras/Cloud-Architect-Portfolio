🌐 AWS Cloud Architect Portfolio
A secure, high-availability personal portfolio architected on AWS.

Live Demo: https://kefas.live

📖 Project Overview
This project demonstrates a production-ready deployment of a static portfolio. Moving beyond basic web hosting, this architecture focuses on security at the edge, global content delivery, and infrastructure best practices.

By utilizing Origin Access Control (OAC), the S3 origin remains entirely private, forcing all traffic through a secure, SSL-encrypted CloudFront distribution.

🏗️ Architecture
The infrastructure is built using the following AWS services:

Amazon S3: Hosts the static website assets (HTML/CSS) in a private bucket.

Amazon CloudFront: Acts as a Content Delivery Network (CDN) to serve content globally with low latency.

AWS Route 53: Manages DNS and domain delegation for kefas.live.

AWS Certificate Manager (ACM): Handles SSL/TLS certificates for end-to-end HTTPS encryption.

Origin Access Control (OAC): Restricts bucket access strictly to CloudFront, preventing direct S3 URL exposure.

🛡️ Security Features
Least Privilege IAM Policies: Configured specific JSON policies to allow only the CloudFront Service Principal to perform s3:GetObject actions.

SSL/TLS Encryption: Enforced HTTPS redirects to ensure all user data is encrypted in transit.

Private Origin: The S3 bucket has "Block All Public Access" enabled, serving as a secure origin shield.

🚀 Key Technical Challenges & Solutions
The "Access Denied" (403) Hurdle
Challenge: Initially encountered 403 errors when transitioning from S3 Public Hosting to CloudFront OAC.
Solution: Identified that the S3 REST endpoint must be used instead of the website endpoint. Updated the S3 Bucket Policy with a unique CloudFront SourceArn condition to complete the security "handshake."

DNS Propagation & SSL Validation
Challenge: Validating the custom domain via ACM.
Solution: Utilized Route 53 DNS validation to issue a public certificate in the us-east-1 region, enabling the professional "padlock" icon on the custom domain.

🛠️ Tech Stack
Cloud: AWS (S3, CloudFront, Route 53, ACM, IAM)

Frontend: HTML5, CSS3

Tools: Git, GitHub

👨‍💻 About the Author
Kefas Etiku Francis BSc. Computer Science Student | Cloud & DevOps Enthusiast SIWES Trainee at Build and Ship Academy.

# Professional Portfolio | Kefas Etiku Francis

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg?style=for-the-badge)](https://kefras.netlify.app/)


🌐 AWS Cloud Architect Portfolio

A secure, high-availability personal portfolio architected on AWS.

🔗 Live Demo: https://kefas.live

📖 Project Overview

This project demonstrates a production-ready deployment of a static portfolio on AWS.

Rather than basic file hosting, this architecture focuses on:

🔐 Security at the edge
🌍 Global content delivery
⚙️ Infrastructure best practices

By implementing Origin Access Control (OAC), the S3 origin remains completely private—ensuring that all traffic is routed securely through CloudFront with SSL encryption.

🏗️ Architecture

The infrastructure is built using the following AWS services:

Amazon S3
Hosts static website assets (HTML, CSS) in a private bucket
Amazon CloudFront
Serves content globally via CDN with low latency
AWS Route 53
Handles DNS and domain routing for kefas.live
AWS Certificate Manager (ACM)
Provides SSL/TLS certificates for HTTPS
Origin Access Control (OAC)
Restricts direct access to S3, allowing only CloudFront
🛡️ Security Features
Least Privilege IAM Policies
Custom policies allowing only CloudFront to access S3 objects
SSL/TLS Encryption
Enforced HTTPS across the entire application
Private S3 Bucket
“Block All Public Access” enabled—no direct exposure
Secure Content Delivery
All traffic routed through CloudFront
🚀 Key Technical Challenges & Solutions
🔴 The “Access Denied (403)” Challenge

Problem:
Encountered 403 errors when switching from public S3 hosting to CloudFront with OAC.

Solution:

Switched from S3 website endpoint to S3 REST endpoint
Updated bucket policy with CloudFront SourceArn condition
Ensured proper permissions between CloudFront and S3
🌐 DNS & SSL Configuration

Problem:
Validating domain and enabling HTTPS

Solution:

Used Route 53 for DNS validation
Requested SSL certificate via ACM in us-east-1
Successfully enabled HTTPS (🔒 padlock)
🛠️ Tech Stack
Cloud: AWS (S3, CloudFront, Route 53, ACM, IAM)
Frontend: HTML5, CSS3
Tools: Git, GitHub
📸 Architecture Diagram (Optional)

(You can add a diagram screenshot here later)

<p align="center">
  <img src="images/architecture.png" width="600"/>
</p>
👨‍💻 About the Author

Kefas Etiku Francis
🎓 BSc. Computer Science Student
☁️ Cloud & DevOps Enthusiast
🚀 SIWES Trainee at Build and Ship Academy

⭐️ Acknowledgment

Special thanks to my mentor for guidance throughout this project and for emphasizing real-world cloud architecture practices.

📌 Future Improvements
CI/CD pipeline with GitHub Actions
Infrastructure as Code (Terraform)
Monitoring with CloudWatch
Custom error pages
