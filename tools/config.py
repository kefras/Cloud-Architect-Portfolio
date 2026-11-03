"""Paths and shared content used by every output renderer."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "templates"
content = json.loads((ROOT / "content.json").read_text(encoding="utf-8"))

# Selection is explicit: adding/reordering a portfolio card cannot hide CV work.
PROJECTS_BY_ID = {project["id"]: project for project in content["projects"]}


def featured_projects():
    """Resolve the short homepage showcase from the complete directory."""
    return [
        PROJECTS_BY_ID[identifier] for identifier in content["featured_project_ids"]
    ]


def resume_sections(include_web_extras=False):
    """Use the same ordered Cloud/AI selection in both resume renderers."""
    sections = list(content["resume_sections"])
    if include_web_extras:
        sections += content.get("resume_web_extras", [])
    return [
        {
            "heading": section["heading"],
            "projects": [
                PROJECTS_BY_ID[identifier] for identifier in section["projects"]
            ],
        }
        for section in sections
    ]
