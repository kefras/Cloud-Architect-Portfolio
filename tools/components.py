"""Reusable HTML components. All plain-text data is escaped here."""

import html
from config import ROOT, content
from rendering import render_template


def escape_html(text):
    """Escape plain text before inserting it into HTML."""
    return html.escape(str(text), quote=True)


def link(url, label, cls=""):
    """Create a safe, reusable text link."""
    return f'<a class="{cls}" href="{escape_html(url)}">{escape_html(label)}</a>'


def head(title, description, path="", prefix=""):
    """Render shared metadata and asset references for any page."""
    return render_template(
        "head.html",
        {
            "page_title": escape_html(title),
            "page_description": escape_html(description),
            "full_name": escape_html(content["name"]),
            "canonical_path": path,
            "asset_prefix": prefix,
            "feature_scripts": "\n".join(
                (
                    f'<script src="{prefix}js/{feature}.js" defer></script>'
                    for feature in [
                        "core",
                        "theme",
                        "navigation",
                        "projects",
                        "architecture",
                        "contact",
                    ]
                )
            ),
        },
    )


def nav(prefix="", home=False):
    """Render the shared navigation with page-relative links."""
    targets = [
        ("home", "Home"),
        ("projects", "Projects"),
        ("about", "About"),
        ("skills", "Skills"),
        ("experience", "Experience"),
    ]
    links = "".join(
        (
            link(("#" if home else prefix + "index.html#") + index, label)
            for index, label in targets
        )
    )
    links += link(prefix + "resume.html", "Resume") + link(
        "#contact" if home else prefix + "index.html#contact", "Contact"
    )
    return render_template(
        "nav.html", {"asset_prefix": prefix, "navigation_links": links}
    )


def project_card(project):
    """Render one project from the structured content source."""
    return render_template(
        "project_card.html",
        {
            "project_category": escape_html(project["category"]),
            "project_id": project["id"],
            "project_title": escape_html(project["title"]),
            "diagram_file": project["visual"],
            "diagram_description": escape_html(
                "Architecture schematic: " + " to ".join(project["architecture"])
            ),
            "project_label": escape_html(project["label"]),
            "project_status": escape_html(project["status"]),
            "project_intro": escape_html(project["intro"]),
            "project_problem": escape_html(project["problem"]),
            "project_contribution": escape_html(
                project["contribution"].split(" Individual")[0]
            ),
            "technology_tags": "".join(
                ("<li>" + escape_html(tag) + "</li>" for tag in project["tags"])
            ),
            "case_study_link": link(
                "case-studies/" + project["id"] + ".html", "View case study →"
            ),
            "repository_link": link(
                "https://github.com/kefras/" + project["repo"], "GitHub ↗"
            ),
        },
    )


def list_items(items):
    """Render escaped list text shared by tags, experience and resume bullets."""
    return "".join((f"<li>{escape_html(item)}</li>" for item in items))


def footer(prefix=""):
    """Render the shared footer with page-relative navigation."""
    return render_template(
        "footer.html",
        {
            "asset_prefix": prefix,
            "github_link": link(content["github"], "GitHub ↗"),
            "linkedin_link": link(content["linkedin"], "LinkedIn ↗"),
            "pdf_link": link(prefix + "resume.pdf", "Resume PDF ↓"),
        },
    )


def title(kicker, name, description=""):
    """Render a reusable section heading with an optional introduction."""
    introduction = ""
    if description:
        introduction = f'<p class="muted section-intro">{escape_html(description)}</p>'
    return render_template(
        "section-heading.html",
        {
            "kicker": escape_html(kicker),
            "heading": escape_html(name),
            "introduction": introduction,
        },
    )


def experience_html():
    """Use the same experience component on the homepage and web resume."""
    return "".join(
        (
            render_template(
                "experience-row.html",
                {
                    "date": escape_html(experience["date"]),
                    "role": escape_html(experience["title"]),
                    "organization": escape_html(experience["organization"]),
                    "bullets": list_items(experience["bullets"]),
                },
            )
            for experience in content["experience"]
        )
    )


def skill_card(skill, index):
    """Link demonstrated capabilities to their supporting project."""
    evidence = ""
    if skill["source"]:
        evidence = link(
            "case-studies/" + skill["source"] + ".html", "See project evidence ↗"
        )
    return render_template(
        "skill-card.html",
        {
            "number": f"{index + 1:02}",
            "name": escape_html(skill["name"]),
            "items": escape_html(skill["items"]),
            "level": escape_html(skill["level"]),
            "evidence_link": evidence,
        },
    )


def stage_button(index, name, subtitle):
    """Keep architecture buttons consistent and initially select the first."""
    return render_template(
        "stage-button.html",
        {
            "index": index,
            "number": f"{index + 1:02}",
            "pressed": str(index == 0).lower(),
            "name": escape_html(name),
            "subtitle": escape_html(subtitle),
        },
    )


def resume_skill(skill):
    """Retain evidence labels in the expanded web resume."""
    return render_template(
        "resume-skill.html",
        {
            "name": escape_html(skill["name"]),
            "items": escape_html(skill["items"]),
            "level": escape_html(skill["level"]),
        },
    )


def resume_project(project):
    """Build a concise project entry from the shared resume bullets."""
    return render_template(
        "resume-project.html",
        {
            "project_link": link(
                "https://github.com/kefras/" + project["repo"], project["title"]
            ),
            "status": escape_html(project["status"]),
            "bullets": list_items(project["resume"]),
        },
    )


def case_section(index, heading, text):
    """Render an anchorable case-study section."""
    return render_template(
        "case-section.html",
        {"index": index, "heading": escape_html(heading), "text": escape_html(text)},
    )
