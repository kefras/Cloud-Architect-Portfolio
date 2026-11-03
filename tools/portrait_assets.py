"""Create responsive delivery copies; preserve the supplied PNG unchanged."""

from PIL import Image, ImageOps
from config import ROOT


def build_portrait_assets():
    """Bound downloads to the rendered size without retouching the portrait."""
    folder = ROOT / "headshot"
    with Image.open(folder / "kefas-headshot.png") as source:
        portrait = ImageOps.exif_transpose(source).convert("RGB")
        for width in (96, 320, 480, 720, 1086):
            height = round(portrait.height * width / portrait.width)
            portrait.resize((width, height), Image.Resampling.LANCZOS).save(
                folder / f"kefas-headshot-{width}.webp",
                "WEBP",
                quality=84,
                method=6,
            )
