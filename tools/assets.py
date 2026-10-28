"""Original vector architecture artwork and a raster social preview; no external assets."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from html import escape

ROOT = Path(__file__).resolve().parents[1]


def diagram(filename, title, subtitle, nodes, footer, accent="#43d8c7"):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360"><defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#263a50" stroke-width=".5"/></pattern></defs><rect width="720" height="360" fill="#0c1727"/><rect width="720" height="360" fill="url(#grid)"/><text x="32" y="37" fill="{accent}" font-size="10" font-family="monospace" letter-spacing="2">{escape(title)}</text><text x="32" y="68" fill="#a2b1c7" font-size="12" font-family="Arial">{escape(subtitle)}</text>"""
    for i, (name, sub) in enumerate(nodes):
        x = 32 + i * 173
        y = 130 if i % 2 == 0 else 155
        if i < 3:
            svg += f'<path d="M{x+142} {y+45} H{x+158} V{175 if i%2 else 200} H{x+173}" fill="none" stroke="{accent}" stroke-width="1.5"/>'
        svg += f'<rect x="{x}" y="{y}" width="142" height="100" rx="5" fill="#111f33" stroke="#3a506b"/><rect x="{x}" y="{y}" width="142" height="3" rx="1" fill="{accent}"/><text x="{x+14}" y="{y+26}" fill="{accent}" font-size="10" font-family="monospace">0{i+1}</text><text x="{x+14}" y="{y+54}" fill="#f8fafc" font-size="14" font-weight="bold" font-family="Arial">{escape(name)}</text><text x="{x+14}" y="{y+77}" fill="#a2b1c7" font-size="10" font-family="monospace">{escape(sub)}</text>'
    svg += f'<line x1="32" y1="304" x2="688" y2="304" stroke="#2c3d55"/><text x="32" y="331" fill="#a2b1c7" font-size="10" font-family="monospace">{escape(footer)}</text><text x="688" y="331" text-anchor="end" fill="{accent}" font-size="10" font-family="monospace">KF / SYSTEM NOTES</text></svg>'
    (ROOT / "assets" / filename).write_text(svg, encoding="utf-8")


diagram(
    "lims.svg",
    "RESEARCH WORKFLOW / APPLICATION ARCHITECTURE",
    "Generic software schematic. No institutional or laboratory data.",
    [
        ("Workspace", "React / TypeScript"),
        ("API + roles", "FastAPI / JWT"),
        ("Records", "PostgreSQL"),
        ("History", "Tracking / audit"),
    ],
    "IN DEVELOPMENT / SOURCE REVIEWED",
)
diagram(
    "delivery.svg",
    "COMMIT TO CONTAINER / ARTIFACT PIPELINE",
    "Verified source path ends at image publication to Amazon ECR.",
    [
        ("Source", "GitHub commit"),
        ("Build", "Docker / Nginx"),
        ("Inspect", "Trivy report"),
        ("Publish", "Amazon ECR"),
    ],
    "BUILD / SCAN / PUSH",
    "#7dd3fc",
)
diagram(
    "routeng.svg",
    "ROUTENG / BOOKING WORKFLOW",
    "Nigeria-focused transportation MVP. No live transaction data.",
    [
        ("Discover", "City / ride search"),
        ("Request", "Express / JWT"),
        ("Reserve", "PostgreSQL lock"),
        ("Coordinate", "Booking status"),
    ],
    "MVP / PAYMENTS OPTIONAL",
)
diagram(
    "terraform.svg",
    "INFRASTRUCTURE AS CODE / FOUNDATIONAL LAB",
    "A small, inspectable Terraform example.",
    [
        ("Declare", "Terraform HCL"),
        ("Configure", "AWS provider"),
        ("Resource", "S3 bucket"),
        ("Delivery", "S3 sync example"),
    ],
    "LEARNING LAB / DEPLOYMENT UNVERIFIED",
    "#7dd3fc",
)
im = Image.new("RGB", (1200, 630), "#0b1120")
draw = ImageDraw.Draw(im)
for x in range(720, 1200, 32):
    draw.line((x, 0, x, 630), fill="#19283c")
for y in range(0, 630, 32):
    draw.line((720, y, 1200, y), fill="#19283c")
fontroot = Path("C:/Windows/Fonts")


def font(size, bold=False):
    return ImageFont.truetype(
        str(fontroot / ("segoeuib.ttf" if bold else "segoeui.ttf")), size
    )


draw.text((68, 57), "KEFAS.LIVE / ENGINEERING PORTFOLIO", font=font(19), fill="#43d8c7")
draw.text((64, 142), "Kefas Etiku", font=font(76, True), fill="#f8fafc")
draw.text((64, 233), "Francis.", font=font(76, True), fill="#43d8c7")
draw.text(
    (69, 370),
    "Cloud & DevOps · Full-Stack · AI Engineering",
    font=font(27),
    fill="#f8fafc",
)
draw.text(
    (69, 431),
    "Projects, architecture and engineering decisions.",
    font=font(24),
    fill="#a2b1c7",
)
draw.line((69, 526, 1130, 526), fill="#2c3d55", width=2)
draw.text((69, 552), "Abuja, Nigeria", font=font(19), fill="#a2b1c7")
draw.text((918, 552), "kefas.live", font=font(23, True), fill="#43d8c7")
draw.rounded_rectangle(
    (816, 127, 1105, 314), radius=12, fill="#111c2e", outline="#3c536c", width=2
)
draw.text((852, 176), "</>", font=font(68, True), fill="#43d8c7")
im.save(ROOT / "assets" / "og-image.png", optimize=True)
print("Created 4 vector architecture diagrams and 1200x630 social preview.")
