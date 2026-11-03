"""Verify a source-only checkout rebuilds the published site reproducibly."""

import importlib.util
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def load_packager(path):
    spec = importlib.util.spec_from_file_location("sync_package", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def public_bytes(root, packager):
    paths = [root / name for name in packager.PUBLIC_FILES]
    for directory in packager.PUBLIC_DIRECTORIES:
        paths.extend(path for path in (root / directory).rglob("*") if path.is_file())
    return {path.relative_to(root).as_posix(): path.read_bytes() for path in paths}


class SourceBuildTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        artifacts = ROOT / ".artifacts"
        artifacts.mkdir(exist_ok=True)
        cls.temp = tempfile.TemporaryDirectory(prefix="source-build-", dir=artifacts)
        cls.root = Path(cls.temp.name).resolve()
        # Verify the recursive cleanup target is inside our test artifact folder.
        assert artifacts.resolve() in cls.root.parents
        cls.addClassCleanup(cls.temp.cleanup)
        for name in ("templates", "css", "tools", "assets", "headshot", "js"):
            shutil.copytree(
                ROOT / name,
                cls.root / name,
                ignore=shutil.ignore_patterns("__pycache__"),
            )
        (cls.root / "case-studies").mkdir()
        for name in ("content.json", "script.js", "theme.js", "robots.txt"):
            shutil.copy2(ROOT / name, cls.root / name)
        assert not (cls.root / "index.html").exists()
        assert not (cls.root / "projects.html").exists()
        cls.build()
        cls.packager = load_packager(cls.root / "tools/package_site.py")
        cls.first = public_bytes(cls.root, cls.packager)
        cls.build()
        cls.second = public_bytes(cls.root, cls.packager)

    @classmethod
    def build(cls):
        result = subprocess.run(
            [sys.executable, "tools/build.py"],
            cwd=cls.root,
            text=True,
            capture_output=True,
            timeout=120,
        )
        assert result.returncode == 0, result.stdout + result.stderr

    def test_source_only_build_matches_current_public_files(self):
        expected = public_bytes(ROOT, load_packager(ROOT / "tools/package_site.py"))
        self.assertEqual(set(self.first), set(expected))
        for name in expected:
            with self.subTest(file=name):
                self.assertEqual(self.first[name], expected[name])

    def test_consecutive_builds_are_byte_identical(self):
        self.assertEqual(self.first, self.second)

    def test_package_includes_all_public_assets_and_no_source(self):
        destination = self.root / "public-dist"
        count = self.packager.package_site(destination)
        actual = {
            p.relative_to(destination).as_posix()
            for p in destination.rglob("*")
            if p.is_file()
        }
        self.assertEqual(count, len(self.first))
        self.assertEqual(actual, set(self.first))
        self.assertIn("projects.html", actual)
        self.assertIn("headshot/kefas-headshot-96.webp", actual)
        self.assertIn("assets/vendor/aos-2.3.4/aos.js", actual)
        self.assertFalse(
            any(
                name.startswith(
                    ("tools/", "templates/", "tests/", "docs/", ".github/", ".aws/")
                )
                for name in actual
            )
        )


if __name__ == "__main__":
    unittest.main()
