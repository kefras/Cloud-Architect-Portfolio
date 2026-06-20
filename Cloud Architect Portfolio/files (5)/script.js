// ============== Data ==============
const skills = [
  { icon: "☁️", title: "Cloud & DevOps", items: ["AWS (EC2, S3, IAM, CloudFront)", "Cloud Architecture", "CI/CD Pipelines", "Infrastructure Monitoring"] },
  { icon: "📦", title: "Containers & Orchestration", items: ["Docker", "Kubernetes (Pods, Deployments, Services)", "Image Management", "Container Lifecycle"] },
  { icon: "💻", title: "System Administration", items: ["Linux (CLI, File Systems)", "Shell Scripting", "System Monitoring", "Troubleshooting"] },
  { icon: "⌨️", title: "Programming & Tools", items: ["Python · JavaScript · Java · C++", "Git & GitHub", "VS Code", "Netlify"] },
];

const stack = [
  {
    name: "AWS",
    desc: "EC2 · S3 · Lambda",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M6.76 10.02c0 .31.03.56.09.74.07.18.16.38.28.59.04.07.06.13.06.19 0 .08-.05.17-.16.25l-.53.36a.4.4 0 0 1-.22.08c-.08 0-.16-.04-.24-.12a2.4 2.4 0 0 1-.29-.38 6.5 6.5 0 0 1-.25-.48c-.65.77-1.47 1.16-2.46 1.16-.7 0-1.26-.2-1.67-.6-.41-.4-.62-.94-.62-1.61 0-.71.25-1.29.76-1.72.51-.43 1.19-.65 2.05-.65.28 0 .58.03.88.07.31.04.62.11.95.18v-.6c0-.64-.13-1.08-.39-1.34-.27-.26-.72-.38-1.36-.38-.29 0-.59.04-.9.11s-.61.16-.91.28a2.4 2.4 0 0 1-.29.11.5.5 0 0 1-.13.02c-.12 0-.18-.08-.18-.26v-.41c0-.13.02-.23.06-.29.04-.06.11-.12.22-.18.29-.15.64-.27 1.05-.37s.84-.15 1.3-.15c.99 0 1.72.23 2.18.68.46.45.69 1.14.69 2.06v2.71h.02zm-3.4 1.27c.27 0 .55-.05.85-.15.3-.1.56-.28.79-.52.13-.15.23-.32.28-.51.05-.19.08-.42.08-.69v-.33a6.7 6.7 0 0 0-.76-.14 6.2 6.2 0 0 0-.78-.05c-.55 0-.96.11-1.23.33-.27.22-.41.54-.41.96 0 .39.1.69.31.89.21.21.5.31.87.31zm6.71.91c-.15 0-.25-.03-.31-.08-.07-.05-.13-.16-.18-.31L7.62 5.95c-.05-.15-.08-.25-.08-.31 0-.12.06-.19.18-.19h.83c.16 0 .27.03.33.08.07.05.13.16.18.31l1.41 5.55 1.31-5.55c.04-.15.1-.26.17-.31.07-.05.18-.08.34-.08h.68c.16 0 .27.03.34.08.07.05.13.16.16.31l1.32 5.62L16 5.84c.05-.15.11-.26.17-.31.07-.05.18-.08.33-.08h.79c.12 0 .19.06.19.19 0 .04-.01.08-.02.13a1.5 1.5 0 0 1-.06.2l-2.02 6.46c-.05.16-.11.27-.18.32-.07.05-.18.08-.32.08h-.73c-.16 0-.27-.03-.34-.08-.07-.06-.13-.16-.16-.32L12.34 6.94 11.04 12.4c-.04.16-.09.27-.16.32-.07.06-.18.08-.34.08h-.47zm10.74.23c-.42 0-.84-.05-1.24-.15-.41-.1-.72-.21-.93-.34a.62.62 0 0 1-.25-.23.6.6 0 0 1-.05-.23v-.42c0-.18.06-.27.19-.27a.4.4 0 0 1 .15.03l.21.09c.27.12.56.21.87.27.32.06.62.09.93.09.49 0 .87-.09 1.13-.26.27-.17.4-.42.4-.74a.7.7 0 0 0-.18-.49c-.13-.14-.36-.27-.7-.39l-1.02-.32a2.2 2.2 0 0 1-1.12-.71c-.24-.32-.36-.66-.36-1.05 0-.31.06-.58.18-.81s.28-.43.49-.59c.21-.16.45-.29.72-.37.27-.08.55-.12.84-.12.15 0 .3.01.45.03.15.02.3.04.44.07.13.04.26.07.38.11.13.04.22.07.29.11.1.05.17.11.22.16.04.05.06.13.06.23v.39c0 .18-.06.28-.19.28-.07 0-.18-.04-.32-.1a3.74 3.74 0 0 0-1.62-.32c-.45 0-.8.07-1.04.22-.24.15-.37.38-.37.71 0 .19.07.36.21.5.14.14.4.27.77.4l1 .31c.49.16.84.38 1.05.66.21.28.31.6.31.96 0 .32-.06.61-.19.86-.13.25-.31.47-.54.65-.23.18-.5.31-.81.4-.32.1-.66.15-1.03.15z"/><path d="M21.66 17.74c-2.62 1.93-6.42 2.96-9.69 2.96-4.59 0-8.72-1.7-11.85-4.52-.25-.22-.03-.53.27-.36 3.38 1.96 7.55 3.15 11.86 3.15 2.91 0 6.1-.6 9.04-1.85.45-.18.82.29.37.62z"/><path d="M22.75 16.46c-.34-.43-2.21-.21-3.06-.1-.26.03-.3-.19-.07-.35 1.5-1.05 3.96-.75 4.24-.4.29.36-.08 2.82-1.48 4-.21.18-.42.08-.32-.15.32-.79 1.04-2.55.69-3z"/></svg>`,
  },
  {
    name: "Google Cloud",
    desc: "GCE · GKE · BigQuery",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M12.19 4.74c1.57 0 3.02.56 4.13 1.5l3.05-3.05A11 11 0 0 0 12.19 0C7.7 0 3.83 2.59 1.96 6.36l3.55 2.76c.88-2.58 3.34-4.38 6.68-4.38z"/><path d="M23.55 12.27c0-.83-.07-1.43-.22-2.05H12.18v3.71h6.51c-.13 1.07-.84 2.69-2.42 3.78l3.46 2.69c2.07-1.91 3.82-4.74 3.82-8.13z"/><path d="M5.51 14.32a6.78 6.78 0 0 1-.36-2.16c0-.75.13-1.48.34-2.16L1.96 7.24A11 11 0 0 0 .82 12.16c0 1.78.43 3.46 1.14 4.92l3.55-2.76z"/><path d="M12.19 24c3.27 0 6.02-1.07 8.04-2.93l-3.46-2.69c-.93.65-2.18 1.1-3.78 1.1-3.34 0-6.18-1.93-7.04-4.5l-3.55 2.76C2.83 21.41 7.27 24 12.19 24z"/></svg>`,
  },
  {
    name: "Kubernetes",
    desc: "Orchestration",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.31l8.4 4.84v9.7L12 21.69 3.6 16.85v-9.7L12 2.31zm0 3.69a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
  },
  {
    name: "Docker",
    desc: "Containers",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137a16.06 16.06 0 0 0 2.91-.263 12.06 12.06 0 0 0 3.792-1.377A10.14 10.14 0 0 0 17.66 16.5c1.236-1.355 1.972-2.866 2.517-4.209h.215c1.37 0 2.213-.548 2.679-1.007.309-.293.55-.65.708-1.046l.097-.286Z"/></svg>`,
  },
  {
    name: "Python",
    desc: "Automation · Scripting",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M11.91 0C5.85 0 6.23 2.63 6.23 2.63v2.74h5.78v.82H3.94S0 5.74 0 11.86s3.44 5.91 3.44 5.91h2.02v-2.86s-.11-3.44 3.38-3.44h5.74s3.27.05 3.27-3.16V3.21S18.35 0 11.91 0zM8.72 1.83a1.04 1.04 0 0 1 1.04 1.04 1.04 1.04 0 0 1-1.04 1.04 1.04 1.04 0 0 1-1.04-1.04 1.04 1.04 0 0 1 1.04-1.04z"/><path d="M12.09 24c6.06 0 5.68-2.63 5.68-2.63v-2.74h-5.78v-.82h8.07S24 18.26 24 12.14s-3.44-5.91-3.44-5.91h-2.02v2.86s.11 3.44-3.38 3.44H9.42s-3.27-.05-3.27 3.16v5.1S5.65 24 12.09 24zm3.19-1.83a1.04 1.04 0 0 1-1.04-1.04 1.04 1.04 0 0 1 1.04-1.04 1.04 1.04 0 0 1 1.04 1.04 1.04 1.04 0 0 1-1.04 1.04z"/></svg>`,
  },
  {
    name: "Linux",
    desc: "Bash · Servers",
    logo: `<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.954.954 0 0 0-.111.082c-.654.547-.846 1.127-.95 1.477-.226.756-.07 1.605-.27 1.97-.572 1.084-2.083 2.012-2.41 2.65-.28.557-.288 1.246.348 1.738.604.467 1.84.616 3.063.502 1.227-.114 2.55-.51 3.183-.81.4-.187.85-.246 1.272-.26 1.083-.046 2.121.16 3.187.234 1.066.075 2.16.014 3.183-.234.522-.126.992-.318 1.357-.52.366-.202.68-.439.972-.674.293-.235.563-.47.79-.633.226-.163.418-.262.582-.262.243 0 .421.122.582.31.16.187.305.434.582.682.276.247.728.495 1.357.495 1.083 0 2.04-.49 2.586-1.018.547-.529.857-1.122.857-1.726 0-1.024-.857-1.628-1.357-2.045-.5-.418-.857-.738-.857-1.018 0-.305.187-.522.5-.738.313-.217.747-.413 1.183-.61.435-.198.871-.396 1.183-.66.313-.265.5-.595.5-1.018 0-.83-.5-1.226-1.183-1.583-.683-.357-1.529-.66-2.183-1.018-.654-.357-1.226-.766-1.226-1.226 0-.305.187-.522.5-.738.313-.217.747-.413 1.183-.61.435-.198.871-.396 1.183-.66.313-.265.5-.595.5-1.018 0-1.044-.857-1.583-1.857-1.583-.5 0-1.044.187-1.583.418-.539.232-1.072.508-1.583.508-.357 0-.654-.122-.857-.357-.203-.235-.305-.595-.305-1.018 0-1.628-.539-3.066-1.583-4.066C16.566.541 14.992 0 13.07 0z"/></svg>`,
  },
];

const projects = [
  { icon: "🔀", title: "End-to-End CI/CD Pipeline with Docker & GitHub Actions",
    problem: "Manual builds and deployments were slow and error-prone, with no consistent path from commit to running service.",
    solution: "Designed a CI/CD pipeline that builds, tests and deploys a containerized app to AWS EC2 on every push, pushing Docker images to a registry automatically.",
    impact: "Cut manual deployment steps significantly and made releases repeatable and predictable.",
    tags: ["GitHub Actions","Docker","AWS EC2","Linux"], category: "ci-cd", link: "https://github.com/kefras" },
  { icon: "🗂️", title: "Production-Ready Multi-Tier App Deployment",
    problem: "Needed to simulate a realistic production environment beyond a single-server demo.",
    solution: "Architected and deployed a multi-tier (frontend + backend) application on AWS EC2 with Docker, configuring networking, environment variables and secure access.",
    impact: "Produced a deployment pattern that mirrors real-world production practices and is reusable for future projects.",
    tags: ["AWS EC2","Docker","Linux","Git"], category: "cloud", link: "https://github.com/kefras" },
  { icon: "📦", title: "Kubernetes-Based Scalable Application Deployment",
    problem: "A single-container deployment couldn't handle scaling or recover automatically from failures.",
    solution: "Deployed containerized applications on a Kubernetes cluster using Deployments, Services and ReplicaSets, implementing rolling updates and self-healing.",
    impact: "Achieved horizontal scaling and automatic recovery, demonstrating high-availability deployment patterns.",
    tags: ["Kubernetes","Docker","Linux"], category: "kubernetes", link: "https://github.com/kefras" },
  { icon: "🌐", title: "Cloud-Based Static Website Deployment (AWS)",
    problem: "Static hosting needed to be fast globally and cheap to run at scale.",
    solution: "Deployed a static site on Amazon S3 with CloudFront CDN for global delivery, securing access through IAM policies.",
    impact: "Built a scalable, low-cost hosting architecture with global edge delivery.",
    tags: ["AWS S3","CloudFront","IAM"], category: "cloud", link: "https://github.com/kefras" },
  { icon: "⚙️", title: "Infrastructure Automation (IaC Practice)",
    problem: "Manually configuring cloud resources each time was slow and inconsistent.",
    solution: "Automated provisioning of cloud resources using Bash scripting and AWS CLI, practicing Infrastructure as Code principles.",
    impact: "Reduced environment setup time and made provisioning repeatable across environments.",
    tags: ["Bash","AWS","Linux","IaC"], category: "automation", link: "https://github.com/kefras" },
  { icon: "📈", title: "Monitoring & Logging Simulation",
    problem: "Without visibility into system health, issues go unnoticed until they cause downtime.",
    solution: "Set up system monitoring and logging on Linux servers, tracking CPU, memory and processes with top/htop.",
    impact: "Practiced incident response and troubleshooting workflows for faster issue detection.",
    tags: ["Linux","Monitoring","Logging"], category: "automation", link: "https://github.com/kefras" },
  { icon: "🔐", title: "AWS IAM Role & Policy Configuration",
    problem: "Over-permissioned access is a common source of cloud security incidents.",
    solution: "Configured AWS IAM roles and policies implementing least-privilege principles for a simulated production environment.",
    impact: "Reduced unnecessary access scope while preserving full operational functionality.",
    tags: ["AWS IAM","Security","Cloud"], category: "cloud", link: "https://github.com/kefras" },
  { icon: "🚀", title: "Hashgraph Developer Course Projects",
    problem: "Wanted hands-on exposure to distributed ledger technology beyond cloud-native tooling.",
    solution: "Completed hands-on projects from the Hashgraph Developer Course, building decentralized applications.",
    impact: "Gained working knowledge of an emerging distributed-systems paradigm adjacent to cloud infrastructure.",
    tags: ["Hashgraph","DApps","Distributed Ledgers"], category: "other", link: "https://github.com/kefras" },
];

const filterCategories = [
  { key: "all", label: "All" },
  { key: "cloud", label: "Cloud" },
  { key: "kubernetes", label: "Kubernetes" },
  { key: "ci-cd", label: "CI/CD" },
  { key: "automation", label: "Automation" },
  { key: "other", label: "Other" },
];

const certs = [
  { name: "AWS Cloud Quest: Generative AI Practitioner", issuer: "Amazon Web Services", year: "2026", url: "https://www.credly.com/badges/45ffa510-cf69-4ca3-b84f-ddf3cb43eea9/public_url", img: "https://images.credly.com/images/15fa08e6-ca73-4fa3-94ed-c36f7f157313/image.png" },
  { name: "AWS Cloud Quest: Cloud Practitioner", issuer: "Amazon Web Services", year: "2026", url: "https://www.credly.com/badges/2b7bbe3e-783a-4bee-948f-a3521f833db4/public_url", img: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/image.png" },
  { name: "Introduction to Linux (LFS101)", issuer: "The Linux Foundation", year: "2026", url: "https://www.credly.com/badges/60abffb8-96d3-42cd-a11f-36f4f6b6f822/public_url", img: "https://images.credly.com/images/97a95d07-04c3-4afb-952a-6bcf46ddb87e/image.png" },
  { name: "Introduction to Kubernetes (LFS158)", issuer: "The Linux Foundation", year: "2026", url: "https://www.credly.com/badges/e81f1b94-e6ed-454f-b4f8-eb0e9c95abbb/public_url", img: "https://images.credly.com/images/4b5a8636-c554-482d-bbdc-7925fb3624c3/image.png" },
  { name: "Kubernetes & Cloud Native Essentials (LFS250)", issuer: "The Linux Foundation", year: "2026", url: "https://www.credly.com/badges/ef6e71ed-5c17-4d2b-8c60-fbb7d0ffac2d/public_url", img: "https://images.credly.com/images/7404ca0d-98e1-48b6-a2a3-de8d7dcd85b5/image.png" },
  { name: "Cloud Engineering (ST-1096)", issuer: "Schull Technologies, Lagos", year: "Nov 2025 - Feb 2026", url: "https://drive.google.com/file/d/1T07H3Tnzpzk6Qx1TTVhiB5InkvuYxE91/view?usp=sharing", img: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/image.png" },
  { name: "Hashgraph Developer Course", issuer: "The Hashgraph Association", year: "2026", url: "https://drive.google.com/file/d/1f7Eh8flxd52KU0CsNgsEchPl7wbi_r5b/view?usp=sharing", img: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/image.png" },
  { name: "AWS Scholars: Analyze Data using AI with PartyRock", issuer: "AWS AI & ML Scholarship", year: "2026", url: "https://cdn.getblueshift.com/bee/images/ed5b8755-0989-4944-9ca5-287bb68e4a22/AWS%20AI%20%26%20ML%20Scholarship%20Badges%20-%20Project%20-%20Analyze%20Data%20-%20Dark%403x.jpg", img: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/image.png" },
  { name: "AWS Scholars: Build Your First AI Productivity App", issuer: "AWS AI & ML Scholarship", year: "2026", url: "https://cdn.getblueshift.com/bee/images/ed5b8755-0989-4944-9ca5-287bb68e4a22/AWS%20AI%20%26%20ML%20Scholarship%20Badges%20-%20Project%20-%20Build%20your%20first%20AI%20-%20Dark%403x.jpg", img: "https://images.credly.com/images/30816e43-2550-4e1c-be22-3f03c5573bb9/image.png" },
];

const timeline = [
  { icon: "🎓", date: "2023 — 2027 (In View)", title: "B.Sc. Computer Science", place: "Miva Open University, Abuja", desc: "Building strong fundamentals in algorithms, distributed systems and software engineering — with a focus on cloud infrastructure and DevOps practices." },
  { icon: "🎖️", date: "2026 — Present", title: "Cloud Computing Micro-credential", place: "Africa Agility & Oz", desc: "Tracks: Cloud & Infrastructure, Cloud Security, and AI for Cloud." },
  { icon: "🚀", date: "2026 — Present", title: "DevOps & Cloud Projects - SIWES (Students Industrial Work Experience Scheme)", place: "BUILD AND SHIP ACADEMY LTD, UK", desc: "Designing and shipping CI/CD pipelines, multi-tier AWS deployments and Kubernetes workloads — focusing on reliability, automation and developer experience." },
  { icon: "💼", date: "Nov 2025 - Feb 2026", title: "Cloud Engineering Training", place: "Schull Technologies, Lagos", desc: "Intensive hands-on training covering AWS services, container orchestration, CI/CD workflows and production cloud deployments." },
  { icon: "📘", date: "2025 — 2026", title: "Linux Foundation Coursework", place: "Linux Foundation Coursework Kubernetes African Developer Training Program by Andela", desc: "Completed Introduction to Linux, Introduction to Kubernetes, and Kubernetes & Cloud Native Essentials — building deep familiarity with the cloud-native ecosystem." },
  { icon: "📜", date: "2026", title: "Hashgraph Developer Course", place: "The Hashgraph Association", desc: "Completed the Hashgraph Developer Course, building decentralized applications and exploring distributed ledger technologies." },
  { icon: "🏆", date: "2026", title: "AWS AI & ML Scholarship Achievements", place: "Amazon Web Services/Udacity", desc: "Earned badges for 'Analyze Data using AI with PartyRock' and 'Build Your First AI Productivity App' projects — demonstrating applied AI/ML skills on AWS." }
];

// ============== Render ==============
const $ = (sel) => document.querySelector(sel);

$("#skillsGrid").innerHTML = skills.map(s => `
  <div class="glass card skill-card reveal">
    <div class="skill-head">
      <div class="stat-icon">${s.icon}</div>
      <h4>${s.title}</h4>
    </div>
    <ul>${s.items.map(i => `<li>${i}</li>`).join("")}</ul>
  </div>
`).join("");

$("#stackGrid").innerHTML = stack.map(t => `
  <div class="glass card stack-item reveal">
    <div class="logo">${t.logo}</div>
    <h3>${t.name}</h3>
    <p class="muted xs">${t.desc}</p>
  </div>
`).join("");

function renderProjects(category) {
  const list = category === "all" ? projects : projects.filter(p => p.category === category);
  $("#projectsGrid").innerHTML = list.map(p => `
    <article class="glass project-card reveal in">
      <div class="project-head">
        <div class="project-icon">${p.icon}</div>
        <a class="icon-btn glass" href="${p.link}" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z"/></svg>
        </a>
      </div>
      <h3>${p.title}</h3>
      <dl class="project-psi">
        <div><dt>Problem</dt><dd>${p.problem}</dd></div>
        <div><dt>Solution</dt><dd>${p.solution}</dd></div>
        <div><dt>Impact</dt><dd>${p.impact}</dd></div>
      </dl>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <a class="project-link" href="${p.link}" target="_blank" rel="noreferrer">View on GitHub →</a>
    </article>
  `).join("");
}

$("#filterBar").innerHTML = filterCategories.map((c, i) => `
  <button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${c.key}">${c.label}</button>
`).join("");

renderProjects("all");

$("#filterBar").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  $("#filterBar").querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProjects(btn.dataset.cat);
});

$("#certsGrid").innerHTML = certs.map(c => `
  <a class="glass cert reveal" href="${c.url}" target="_blank" rel="noreferrer">
    <div class="cert-badge-img" data-loading="true">
      <div class="badge-skeleton" aria-hidden="true"></div>
      <img src="${c.img}" alt="${c.name} badge" loading="lazy" referrerpolicy="no-referrer"
        onload="this.parentElement.dataset.loading='false'"
        onerror="this.parentElement.dataset.loading='error'; this.remove();"/>
      <div class="badge-fallback" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>Badge</span>
      </div>
    </div>
    <h3>${c.name}</h3>
    <p class="issuer">${c.issuer}</p>
    <div class="meta"><span>${c.year}</span><span class="verify">Verify →</span></div>
  </a>
`).join("");

$("#timelineList").innerHTML = timeline.map(i => `
  <div class="tl-item reveal">
    <div class="tl-dot">${i.icon}</div>
    <div class="glass tl-content">
      <p class="tl-date">${i.date}</p>
      <h3>${i.title}</h3>
      <p class="tl-place">${i.place}</p>
      <p class="tl-desc">${i.desc}</p>
    </div>
  </div>
`).join("");

$("#year").textContent = new Date().getFullYear();

// ============== Scroll progress + back to top ==============
const progressBar = $("#scrollProgress");
const backToTop = $("#backToTop");
const onScrollProgress = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + "%";
  backToTop.classList.toggle("visible", scrolled > 600);
};
onScrollProgress();
window.addEventListener("scroll", onScrollProgress);
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ============== Nav scroll ==============
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll);

// ============== Mobile menu ==============
const toggle = $("#navToggle");
const menu = $("#mobileMenu");
const closeMenu = () => { menu.hidden = true; document.body.classList.remove("menu-open"); };
const openMenu = () => { menu.hidden = false; document.body.classList.add("menu-open"); };
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.hidden ? openMenu() : closeMenu();
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) closeMenu();
});
window.addEventListener("resize", () => { if (window.innerWidth >= 768) closeMenu(); });

// ============== Reveal on scroll ==============
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ============== Contact Form Submit ==============
$("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const btn = $("#submitBtn"); 
    const name = document.getElementById("cname").value;
    const email = document.getElementById("cemail").value;
    const msg = document.getElementById("cmsg").value;

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
        const res = await fetch("https://fpl6eii032.execute-api.us-east-1.amazonaws.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, 
                email: email, 
                message: msg
            })
        });

        if (res.ok) {
            btn.textContent = "✓ Message sent";
            $("#contactForm").reset();
            
            // Wait 3 seconds, then reset the button to normal
            setTimeout(() => {
                btn.textContent = "Send message →";
                btn.disabled = false;
            }, 3000);
            
        } else {
            throw new Error("Server responded with error");
        }
    } catch (err) {
        console.error(err);
        btn.textContent = "X Network error";
        btn.disabled = false;
    }
});

// ============== Theme toggle ==============
const root = document.documentElement;
const themeBtn = $("#themeToggle");
const iconSun = $("#iconSun");
const iconMoon = $("#iconMoon");

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    iconSun.hidden = true;
    iconMoon.hidden = false;
  } else {
    root.removeAttribute("data-theme");
    iconSun.hidden = false;
    iconMoon.hidden = true;
  }
}

const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(stored || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});
