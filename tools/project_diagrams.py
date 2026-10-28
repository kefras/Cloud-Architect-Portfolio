"""Generate safe, code-native project schematics without cloud identifiers."""

from html import escape
from config import ROOT, content


def build_project_diagrams():
    """Preserve existing art and create consistent schematics for new projects."""
    for project in content["projects"]:
        output = ROOT / "assets" / project["visual"]
        if output.exists():
            continue
        accent = "#7dd3fc" if project["category"] == "AI Engineering" else "#43d8c7"
        parts = [
            f"""<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360">
<defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#263a50" stroke-width=".5"/></pattern></defs>
<rect width="720" height="360" fill="#0c1727"/><rect width="720" height="360" fill="url(#grid)"/>
<text x="32" y="38" fill="{accent}" font-size="11" font-family="monospace">{escape(project['title'].upper())}</text>
<text x="32" y="68" fill="#a2b1c7" font-size="12" font-family="Arial">Project schematic. No live telemetry, account identifiers or private data.</text>"""
        ]
        for index, stage in enumerate(project["architecture"]):
            x = 32 + index * 173
            y = 130 if index % 2 == 0 else 155
            if index < 3:
                destination_y = 175 if index % 2 else 200
                parts.append(
                    f'<path d="M{x+142} {y+45}H{x+158}V{destination_y}H{x+173}" fill="none" stroke="{accent}" stroke-width="1.5"/>'
                )
            parts.append(
                f'<rect x="{x}" y="{y}" width="142" height="100" rx="5" fill="#111f33" stroke="#3a506b"/><rect x="{x}" y="{y}" width="142" height="3" fill="{accent}"/><text x="{x+12}" y="{y+27}" fill="{accent}" font-size="10" font-family="monospace">0{index+1}</text><text x="{x+12}" y="{y+58}" fill="#f8fafc" font-size="12" font-family="Arial">{escape(stage)}</text>'
            )
        parts.append(
            f'<line x1="32" y1="304" x2="688" y2="304" stroke="#2c3d55"/><text x="32" y="332" fill="#a2b1c7" font-size="10" font-family="monospace">{escape(project["status"].upper())}</text><text x="688" y="332" text-anchor="end" fill="{accent}" font-size="10" font-family="monospace">KF / SYSTEM NOTES</text></svg>'
        )
        output.write_text("\n".join(parts), encoding="utf-8")
