"""Offline structural, link, content and ATS checks; no external requests."""

from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re, xml.etree.ElementTree as ET
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
results = []


def check(name, condition):
    assert condition, name
    results.append(name)
    print("PASS", name)


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.ids = []
        self.h1 = 0
        self.images = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "img":
            self.images.append(a)
        for key in ["src", "href"]:
            if key in a:
                self.links.append(a[key])


pages = {
    f: Page(f.read_text(encoding="utf-8"))
    for f in [
        ROOT / "index.html",
        ROOT / "resume.html",
        ROOT / "projects.html",
        *(ROOT / "case-studies").glob("*.html"),
    ]
}
for f, p in pages.items():
    relative = str(f.relative_to(ROOT))
    check(relative + ": unique ids", len(p.ids) == len(set(p.ids)))
    check(relative + ": exactly one h1", p.h1 == 1)
    check(
        relative + ": image alternatives",
        all(
            i.get("alt") or (i.get("class") == "brand-avatar" and "alt" in i)
            for i in p.images
        ),
    )
    for url in p.links:
        u = urlsplit(url)
        if u.scheme or u.netloc:
            continue
        target = (f.parent / unquote(u.path)).resolve() if u.path else f
        check(relative + ": local target " + url, target.exists())
        if u.fragment and target.suffix == ".html":
            check(relative + ": anchor " + url, u.fragment in pages[target].ids)
public = "\n".join(f.read_text(encoding="utf-8") for f in pages)
check(
    "Unsupported production claims removed",
    not any(
        t in public.lower()
        for t in [
            "99.99%",
            "35%",
            "13+ production",
            "available for senior",
            "zero downtime",
            "99.9%",
        ]
    ),
)
for f in pages:
    t = f.read_text(encoding="utf-8")
    check(
        str(f.relative_to(ROOT)) + ": canonical and social image",
        'rel="canonical"' in t and "og:image" in t,
    )
ET.parse(ROOT / "sitemap.xml")
check("Sitemap XML parses", True)
pdf = PdfReader(ROOT / "resume.pdf")
text = "\n".join(p.extract_text() for p in pdf.pages)
check(
    "ATS PDF is one A4 page",
    len(pdf.pages) == 1 and abs(float(pdf.pages[0].mediabox.width) - 595.276) < 1,
)
check("ATS PDF has selectable text", len(text) > 2000)
check("ATS PDF has no replacement characters", "\ufffd" not in text)
sections = [
    "PROFESSIONAL SUMMARY",
    "SKILLS",
    "CLOUD & DEVOPS PROJECTS",
    "AI ENGINEERING PROJECTS",
    "EXPERIENCE",
    "EDUCATION",
]
check(
    "ATS extraction section order",
    [text.index(s) for s in sections] == sorted(text.index(s) for s in sections),
)
d = json.loads((ROOT / "content.json").read_text(encoding="utf-8"))
check(
    "Resume identity and education match source",
    all(
        x in text
        for x in [
            d["name"],
            d["education"]["school"],
            d["education"]["date"],
            d["email"],
        ]
    ),
)
check(
    "Download PDF matches generated original",
    (ROOT / "resume.pdf").read_bytes()
    == (ROOT / "output/pdf/Kefas_Etiku_Francis_ATS_Resume.pdf").read_bytes(),
)
project_lookup = {project["id"]: project for project in d["projects"]}
cv_projects = [
    project_lookup[identifier]
    for section in d["resume_sections"]
    for identifier in section["projects"]
]
for project in cv_projects:
    check(
        project["id"] + ": PDF and web share bullets",
        all(
            " ".join(b.split()) in " ".join(text.split())
            and b in (ROOT / "resume.html").read_text(encoding="utf-8")
            for b in project["resume"]
        ),
    )
check(
    "Cloud projects lead the CV",
    len(d["resume_sections"][0]["projects"]) == 5
    and d["resume_sections"][0]["heading"] == "Cloud & DevOps Projects",
)
check(
    "Both supplied AI projects are in the CV",
    all(
        project_lookup[identifier]["title"] in text
        for identifier in ["digital-twin", "etiku-ai"]
    ),
)
for project in d["projects"]:
    if project.get("visibility") == "private":
        private_url = "https://github.com/kefras/" + project["repo"]
        check(
            "Private source is not linked publicly: " + project["id"],
            private_url not in public,
        )


def luminance(color):
    if len(color) == 4:
        color = "#" + "".join(c * 2 for c in color[1:])
    rgb = [int(color[i : i + 2], 16) / 255 for i in (1, 3, 5)]
    lin = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in rgb]
    return sum(v * w for v, w in zip(lin, [0.2126, 0.7152, 0.0722]))


css = re.sub(r"\s+", "", (ROOT / "styles.css").read_text(encoding="utf-8"))
for theme, block in [
    ("dark", css.split(":root{", 1)[1].split("}", 1)[0]),
    ("light", css.split(":root[data-theme='light']{", 1)[1].split("}", 1)[0]),
]:
    tokens = dict(re.findall(r"--([a-z-]+):(#[0-9a-fA-F]{3,6})", block))
    for fg in ["text", "muted", "accent", "sky", "error"]:
        for bg in ["bg", "surface", "surface-alt"]:
            a, b = sorted([luminance(tokens[fg]), luminance(tokens[bg])])
            ratio = (b + 0.05) / (a + 0.05)
            check(f"{theme} {fg}/{bg} contrast {ratio:.2f}:1", ratio >= 4.5)
    a, b = sorted([luminance(tokens["accent"]), luminance(tokens["accent-ink"])])
    check(f"{theme} primary button contrast", (b + 0.05) / (a + 0.05) >= 4.5)
# The requested role must remain consistent across every resume output.
from html import unescape

new_role = "DevOps & Cloud Engineer Intern"
for filename in ("index.html", "resume.html"):
    page_text = unescape((ROOT / filename).read_text(encoding="utf-8"))
    check(
        filename + ": updated internship title",
        new_role in page_text
        and "DevOps & Cloud Projects - SIWES Intern" not in page_text,
    )
check(
    "ATS PDF: updated internship title",
    new_role in text and "DevOps & Cloud Projects - SIWES Intern" not in text,
)

out = ROOT / ".artifacts" / "tests"
out.mkdir(parents=True, exist_ok=True)
(out / "static-results.json").write_text(
    json.dumps({"passed": len(results), "checks": results}, indent=2), encoding="utf-8"
)
(out / "resume-extracted.txt").write_text(text, encoding="utf-8")
print(f"{len(results)} offline checks passed.")
