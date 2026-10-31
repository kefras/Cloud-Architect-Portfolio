"""Page assembly; long HTML belongs in templates/, reusable pieces in components.py."""

import json
from config import ROOT, content, featured_projects, resume_sections
from rendering import render_template
from components import (
    escape_html,
    link,
    head,
    nav,
    footer,
    title,
    project_card,
    experience_html,
    skill_card,
    stage_button,
    resume_skill,
    resume_project,
    case_section,
    project_source,
    project_filters,
    credential_cards,
    community_cards,
)
from rendering import write_html


def build_home():
    """Assemble homepage sections from shared components."""
    featured = featured_projects()
    person = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": content["name"],
        "url": "https://kefas.live/",
        "description": content["summary"],
        "email": escape_html(content["email"]),
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Abuja",
            "addressCountry": "NG",
        },
        "sameAs": [content["github"], content["linkedin"]],
    }
    page = head(
        "Kefas Etiku Francis | Cloud, DevOps & Full-Stack Engineering",
        "Explore cloud infrastructure, delivery automation and full-stack projects by Kefas Etiku Francis, a Computer Science undergraduate in Abuja.",
    ) + nav(home=True)
    page += render_template(
        "build_home.html",
        {
            "person_schema": json.dumps(person),
            "professional_headline": escape_html(content["headline"]),
            "projects_link": link("#projects", "Explore projects ↗", "button primary"),
            "resume_link": link("resume.html", "View resume", "button secondary"),
            "pdf_link": link("resume.pdf", "Download PDF ↓", "text-link pdf-download"),
            "github_link": link(content["github"], "GitHub ↗"),
            "linkedin_link": link(content["linkedin"], "LinkedIn ↗"),
            "projects_heading": title(
                "01 / SELECTED WORK",
                "Engineering, made tangible.",
                "Inspect the code, understand the decisions, and see where each project stands.",
            ),
            "project_cards": "".join(project_card(project) for project in featured),
            "project_filters": project_filters(featured),
            "project_count": len(featured),
            "project_directory_link": link(
                "projects.html",
                f"Explore all {len(content['projects'])} projects →",
                "button secondary",
            ),
            "capabilities_heading": title(
                "02 / CAPABILITIES",
                "A connected engineering toolkit.",
                "Project evidence and current learning, with a clear distinction between the two.",
            ),
            "capability_cards": "".join(
                (
                    skill_card(skill, index)
                    for index, skill in enumerate(content["skills"])
                )
            ),
            "about_heading": title(
                "03 / ABOUT", "Curious by nature.\nPractical by approach."
            ),
            "architecture_heading": title(
                "ENGINEERING NOTE / INTERACTIVE",
                "Follow the delivery path.",
                "An illustrative system map. Select a stage to explore its purpose; this is not a live deployment monitor.",
            ),
            "architecture_stages": "".join(
                (
                    stage_button(index, name, subtitle)
                    for index, (name, subtitle) in enumerate(
                        [
                            ("Source control", "Git / GitHub"),
                            ("Build & inspect", "Actions / Trivy"),
                            ("Package & store", "Docker / ECR"),
                            ("Run & observe", "Runtime / logs"),
                        ]
                    )
                )
            ),
            "experience_heading": title(
                "04 / EXPERIENCE & EDUCATION", "A foundation built through practice."
            ),
            "experience_items": experience_html(),
            "credential_cards": credential_cards(),
            "community_cards": community_cards(),
            "graduation_date": escape_html(content["education"]["date"]),
            "degree": escape_html(content["education"]["degree"]),
            "school": escape_html(content["education"]["school"]),
            "contact_heading": title(
                "06 / LET’S CONNECT", "Good work starts\nwith a conversation."
            ),
            "email": escape_html(content["email"]),
            "contact_github": link(content["github"], "GitHub ↗"),
            "contact_linkedin": link(content["linkedin"], "LinkedIn ↗"),
            "contact_phone": link("tel:+2348102839482", content["phone"]),
        },
    )
    write_html(ROOT / "index.html", page + footer())


def build_studies():
    """Generate one case study for each configured project."""
    for project in content["projects"]:
        blocks = [
            ("Problem & context", project["problem"]),
            ("Objectives", project["objective"]),
            ("My role & project work", project["contribution"]),
            ("Technical implementation", project["implementation"]),
            ("Engineering decisions", project["decisions"]),
            ("Challenges & solutions", project["challenges"]),
            ("Testing & verification", project["verification"]),
            ("Current status", project["current"]),
            ("Lessons & next steps", project["lessons"]),
        ]
        page = head(
            project["title"] + " | Kefas Etiku Francis",
            project["intro"],
            "case-studies/" + project["id"] + ".html",
            "../",
        ) + nav("../")
        page += render_template(
            "build_studies.html",
            {
                "project_label": escape_html(project["label"]),
                "project_title": escape_html(project["title"]),
                "project_intro": escape_html(project["intro"]),
                "project_status": escape_html(project["status"]),
                "technology_tags": "".join(
                    ("<li>" + escape_html(tag) + "</li>" for tag in project["tags"])
                ),
                "repository_link": project_source(
                    project, "Inspect source on GitHub ↗", "button secondary"
                ),
                "diagram_file": project["visual"],
                "diagram_description": escape_html(
                    "Architecture schematic: " + " to ".join(project["architecture"])
                ),
                "case_contents": "".join(
                    (
                        link("#part-" + str(index), label)
                        for index, (label, _) in enumerate(blocks)
                    )
                ),
                "architecture_path": escape_html(" → ".join(project["architecture"])),
                "case_sections": "".join(
                    (
                        case_section(index, heading, text)
                        for index, (heading, text) in enumerate(blocks)
                    )
                ),
                "contact_link": link(
                    "../index.html#contact", "Discuss this work →", "button primary"
                ),
                "resume_link": link("../resume.html", "View resume", "text-link"),
            },
        )
        write_html(
            ROOT / "case-studies" / f"{project['id']}.html", page + footer("../")
        )


def build_resume():
    """Generate the web resume from the same facts as the PDF."""
    skills = "".join((resume_skill(skill) for skill in content["skills"]))
    project_sections = "".join(
        "<section><h2>"
        + escape_html(section["heading"])
        + "</h2>"
        + "".join(resume_project(project) for project in section["projects"])
        + "</section>"
        for section in resume_sections(include_web_extras=True)
    )
    page = (
        head("Kefas Etiku Francis | Resume", content["summary"], "resume.html") + nav()
    )
    page += render_template(
        "build_resume.html",
        {
            "full_name": escape_html(content["name"]),
            "professional_headline": escape_html(content["headline"]),
            "location": escape_html(content["location"]),
            "email_link": link("mailto:" + content["email"], content["email"]),
            "phone": escape_html(content["phone"]),
            "github_link": link(content["github"], "github.com/kefras"),
            "linkedin_link": link(content["linkedin"], "linkedin.com/in/kefas"),
            "portfolio_link": link("https://kefas.live", "kefas.live"),
            "summary": escape_html(content["summary"]),
            "skill_items": skills,
            "project_sections": project_sections,
            "experience_items": experience_html(),
            "degree": escape_html(content["education"]["degree"]),
            "school": escape_html(content["education"]["school"]),
            "graduation_date": escape_html(content["education"]["date"]),
        },
    )
    write_html(ROOT / "resume.html", page + footer())


def build_project_directory():
    """Keep the full project collection available without overwhelming the hero page."""
    projects = content["projects"]
    page = (
        head(
            "Cloud, DevOps & AI Projects | Kefas Etiku Francis",
            "Explore practical AWS deployments, Kubernetes and CI/CD labs, AI applications and software engineering projects.",
            "projects.html",
        )
        + nav()
    )
    page += render_template(
        "project-directory.html",
        {
            "project_cards": "".join(
                project_card(project, heading_level=2) for project in projects
            ),
            "project_filters": project_filters(projects),
            "project_count": len(projects),
        },
    )
    write_html(ROOT / "projects.html", page + footer())
