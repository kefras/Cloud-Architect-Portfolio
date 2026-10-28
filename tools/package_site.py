"""Create an allowlisted static deployment folder without publishing source files.

Run after tools/build.py. A nonempty output directory is rejected so this tool
never cleans or overwrites an arbitrary collection of files.
"""
import argparse
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_FILES = (
    "index.html", "resume.html", "resume.pdf", "styles.css", "script.js",
    "theme.js", "robots.txt", "sitemap.xml",
)
PUBLIC_DIRECTORIES = ("assets", "case-studies", "js")


def package_site(output):
    """Copy only browser assets, never tests, templates, docs or credentials."""
    output = output.resolve()
    if output == ROOT or ROOT not in output.parents:
        raise ValueError("Deployment output must be a subdirectory of this repository.")
    if output.exists() and any(output.iterdir()):
        raise ValueError("Use an empty deployment output directory.")

    for directory in PUBLIC_DIRECTORIES:
        if not (ROOT / directory).is_dir():
            raise FileNotFoundError("Missing public directory: " + directory)

    files = [ROOT / name for name in PUBLIC_FILES]
    for directory in PUBLIC_DIRECTORIES:
        files.extend(path for path in (ROOT / directory).rglob("*") if path.is_file())
    missing = [str(path.relative_to(ROOT)) for path in files if not path.is_file()]
    if missing:
        raise FileNotFoundError("Missing public assets: " + ", ".join(missing))

    for source in files:
        destination = output / source.relative_to(ROOT)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
    return len(files)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "public-dist")
    arguments = parser.parse_args()
    print(f"Packaged {package_site(arguments.output)} public files into {arguments.output}.")
