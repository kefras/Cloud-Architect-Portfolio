"""Paths and shared content used by every output renderer."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "templates"
content = json.loads((ROOT / "content.json").read_text(encoding="utf-8"))
