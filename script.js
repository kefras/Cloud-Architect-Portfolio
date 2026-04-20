// ============== Data ==============
const skills = [
  { icon: "☁️", title: "Cloud & DevOps", items: ["AWS (EC2, S3, IAM, CloudFront)", "Cloud Architecture", "CI/CD Pipelines", "Infrastructure Monitoring"] },
  { icon: "📦", title: "Containers & Orchestration", items: ["Docker", "Kubernetes (Pods, Deployments, Services)", "Image Management", "Container Lifecycle"] },
  { icon: "💻", title: "System Administration", items: ["Linux (CLI, File Systems)", "Shell Scripting", "System Monitoring", "Troubleshooting"] },
  { icon: "⌨️", title: "Programming & Tools", items: ["Python · JavaScript · Java · C++", "Git & GitHub", "VS Code", "Netlify"] },
];

const stack = [
  { name: "AWS", desc: "EC2 · S3 · Lambda", logo: "🟧" },
  { name: "Google Cloud", desc: "GCE · GKE · BigQuery", logo: "🔵" },
  { name: "Kubernetes", desc: "Orchestration", logo: "⎈" },
  { name: "Docker", desc: "Containers", logo: "🐳" },
  { name: "Python", desc: "Automation · Scripting", logo: "🐍" },
  { name: "Linux", desc: "Bash · Servers", logo: "🐧" },
];

const projects = [
  { icon: "🔀", title: "End-to-End CI/CD Pipeline with Docker & GitHub Actions", desc: "Designed a complete CI/CD pipeline that builds, tests and deploys a containerized app to AWS EC2 on every push — pushing Docker images to a registry and reducing manual deployment effort drastically.", tags: ["GitHub Actions","Docker","AWS EC2","Linux"], link: "https://github.com/kefras" },
  { icon: "🗂️", title: "Production-Ready Multi-Tier App Deployment", desc: "Architected and deployed a multi-tier (frontend + backend) application on AWS EC2 with Docker. Configured networking, environment variables and secure configurations to simulate real-world production practices.", tags: ["AWS EC2","Docker","Linux","Git"], link: "https://github.com/kefras" },
  { icon: "📦", title: "Kubernetes-Based Scalable Application Deployment", desc: "Deployed containerized applications on a Kubernetes cluster using Deployments, Services and ReplicaSets — implementing rolling updates, self-healing and horizontal scaling for high availability.", tags: ["Kubernetes","Docker","Linux"], link: "https://github.com/kefras" },
  { icon: "🌐", title: "Cloud-Based Static Website Deployment (AWS)", desc: "Deployed a static site on Amazon S3 with CloudFront CDN for global delivery, secured access through IAM policies and built a scalable, cost-efficient hosting architecture.", tags: ["AWS S3","CloudFront","IAM"], link: "https://github.com/kefras" },
  { icon: "⚙️", title: "Infrastructure Automation (IaC Practice)", desc: "Automated provisioning of cloud resources using Bash scripting and AWS CLI — practicing Infrastructure as Code principles for repeatable, low-touch environment setups.", tags: ["Bash","AWS","Linux","IaC"], link: "https://github.com/kefras" },
  { icon: "📈", title: "Monitoring & Logging Simulation", desc: "Set up system monitoring and logging on Linux servers — tracking CPU, memory and processes with top/htop and practicing incident response and troubleshooting workflows.", tags: ["Linux","Monitoring","Logging"], link: "https://github.com/kefras" },
];

const certs = [
  { name: "AWS Cloud Practitioner Essentials & Cloud Quest", issuer: "Amazon Web Services", year: "2026", url: "https://aws.amazon.com/training/", grad: "linear-gradient(135deg,#FF9900,#FFB347)", letter: "AWS" },
  { name: "Cloud Engineering Training", issuer: "Schull Technologies, Lagos", year: "Nov. 2025 - Feb 2026", url: "#", grad: "linear-gradient(135deg,#06B6D4,#3B82F6)", letter: "☁" },
  { name: "Introduction to Linux (LFS101)", issuer: "The Linux Foundation", year: "2026", url: "https://training.linuxfoundation.org/training/introduction-to-linux/", grad: "linear-gradient(135deg,#FACC15,#F59E0B)", letter: "🐧" },
  { name: "Introduction to Kubernetes (LFS158)", issuer: "The Linux Foundation", year: "2026", url: "https://training.linuxfoundation.org/training/introduction-to-kubernetes/", grad: "linear-gradient(135deg,#326CE5,#5B8DEF)", letter: "⎈" },
  { name: "Kubernetes & Cloud Native Essentials (LFS250)", issuer: "The Linux Foundation", year: "2026", url: "https://training.linuxfoundation.org/training/kubernetes-and-cloud-native-essentials-lfs250/", grad: "linear-gradient(135deg,#7C3AED,#A855F7)", letter: "K8s" },
  { name: "Project Management for Artisans", issuer: "CIPMN", year: "Sept 2025", url: "#", grad: "linear-gradient(135deg,#10B981,#22C55E)", letter: "PM" },
];

const timeline = [
  { icon: "🎓", date: "2024 — 2027 (In View)", title: "B.Sc. Computer Science", place: "Miva Open University, Abuja", desc: "Building strong fundamentals in algorithms, distributed systems and software engineering — with a focus on cloud infrastructure and DevOps practices." },
  { icon: "💼", date: "Nov. 2025 - Feb. 2026", title: "Cloud Engineering Training", place: "Schull Technologies, Lagos", desc: "Intensive hands-on training covering AWS services, container orchestration, CI/CD workflows and production cloud deployments." },
  { icon: "📘", date: "2025 — 2026", title: "Linux Foundation Coursework", place: " Kubernetes African Developer Training Program by Andela", desc: "Completed Introduction to Linux, Introduction to Kubernetes, and Kubernetes & Cloud Native Essentials — building deep familiarity with the cloud-native ecosystem." },
  { icon: "🚀", date: "2026 — Present", title: "DevOps & Cloud Projects - SIWES (Students Industrial Work Experience Scheme)", place: "BUILD AND SHIP ACADEMY LTD, UK", desc: "Designing and shipping CI/CD pipelines, multi-tier AWS deployments and Kubernetes workloads — focusing on reliability, automation and developer experience." },
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

$("#projectsGrid").innerHTML = projects.map(p => `
  <article class="glass project-card reveal">
    <div class="project-head">
      <div class="project-icon">${p.icon}</div>
      <a class="icon-btn glass" href="${p.link}" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
    </div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <a class="project-link" href="${p.link}" target="_blank" rel="noreferrer">View on GitHub →</a>
  </article>
`).join("");

$("#certsGrid").innerHTML = certs.map(c => `
  <a class="glass cert reveal" href="${c.url}" ${c.url === "#" ? "" : 'target="_blank" rel="noreferrer"'}>
    <div class="cert-badge" style="background:${c.grad}">${c.letter}</div>
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

// ============== Contact form (mailto) ==============
$("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#cname").value.trim();
  const email = $("#cemail").value.trim();
  const msg = $("#cmsg").value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:kefasetikufrancis@gmail.com?subject=${subject}&body=${body}`;
  $("#submitBtn").textContent = "✓ Opening email…";
  setTimeout(() => { $("#submitBtn").textContent = "Send message →"; e.target.reset(); }, 3000);
});
