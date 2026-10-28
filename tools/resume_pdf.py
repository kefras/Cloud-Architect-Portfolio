"""ATS PDF output, kept separate from HTML rendering."""

import shutil
from xml.sax.saxutils import escape as xml_escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from config import ROOT, content


def build_pdf():
    """Generate the single-column A4 resume and public download copy."""
    out = ROOT / "output" / "pdf"
    out.mkdir(parents=True, exist_ok=True)
    styles = {
        "name": ParagraphStyle(
            "name",
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=25,
            textColor=HexColor("#0b1120"),
            spaceAfter=5,
        ),
        "headline": ParagraphStyle(
            "headline", fontName="Helvetica", fontSize=9, leading=12, spaceAfter=4
        ),
        "contact": ParagraphStyle(
            "contact", fontName="Helvetica", fontSize=8.2, leading=11, spaceAfter=3
        ),
        "section": ParagraphStyle(
            "section",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=HexColor("#0f665e"),
            spaceBefore=10,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "body", fontName="Helvetica", fontSize=8.7, leading=11.7, spaceAfter=3
        ),
        "sub": ParagraphStyle(
            "sub", fontName="Helvetica-Bold", fontSize=9, leading=12, spaceAfter=2
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName="Helvetica",
            fontSize=8.5,
            leading=11.2,
            leftIndent=9,
            firstLineIndent=-7,
            spaceAfter=2,
        ),
    }
    story = []

    def para(text, key="body"):
        return Paragraph(xml_escape(text), styles[key])

    story += [
        para(content["name"], "name"),
        para(content["headline"], "headline"),
        para(
            content["location"] + " | " + content["email"] + " | " + content["phone"],
            "contact",
        ),
        para("github.com/kefras | linkedin.com/in/kefas | kefas.live", "contact"),
    ]
    story += [para("PROFESSIONAL SUMMARY", "section"), para(content["summary"])]
    story += [para("SKILLS", "section")]
    for text in content["resume_skill_summary"]:
        story.append(para(text))
    story.append(para("SELECTED PROJECTS", "section"))
    for project in content["projects"][:3]:
        block = [para(project["title"] + " | " + project["status"], "sub")] + [
            para("- " + bullet, "bullet") for bullet in project["resume"]
        ]
        story.append(KeepTogether(block))
        story.append(Spacer(1, 3))
    story.append(para("EXPERIENCE", "section"))
    for experience in content["experience"]:
        block = [
            para(experience["title"] + " | " + experience["date"], "sub"),
            para(experience["organization"]),
        ] + [para("- " + bullet, "bullet") for bullet in experience["bullets"]]
        story.append(KeepTogether(block))
        story.append(Spacer(1, 3))
    story += [
        para("EDUCATION", "section"),
        para(
            content["education"]["degree"] + " | " + content["education"]["school"],
            "sub",
        ),
        para(content["education"]["date"]),
    ]
    pdf = out / "Kefas_Etiku_Francis_ATS_Resume.pdf"
    SimpleDocTemplate(
        str(pdf),
        pagesize=A4,
        rightMargin=39,
        leftMargin=39,
        topMargin=33,
        bottomMargin=33,
        title=content["name"] + " - Resume",
        author=content["name"],
    ).build(story)
    shutil.copyfile(pdf, ROOT / "resume.pdf")
