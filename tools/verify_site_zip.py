"""Read-only S3 ZIP verification: manifest, bytes and exact-case relative paths."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
import posixpath
import re
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile

from package_site import ROOT, PUBLIC_FILES, PUBLIC_DIRECTORIES


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.references = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        self.references.extend(attrs[key] for key in ("src", "href") if key in attrs)
        self.references.extend(
            entry.strip().split()[0]
            for entry in attrs.get("srcset", "").split(",")
            if entry.strip()
        )


def verify(archive):
    """Never extract an archive; inspect its public files directly in memory."""
    with ZipFile(archive) as bundle:
        names = bundle.namelist()
        assert bundle.testzip() is None, "ZIP integrity failure"
        assert len(names) == len(set(names)), "Duplicate ZIP entries"
        assert all(
            not name.startswith("/")
            and "\\" not in name
            and ".." not in name.split("/")
            for name in names
        ), "Unsafe ZIP path"
        files = {name: bundle.read(name) for name in names}
    expected = set(PUBLIC_FILES)
    for directory in PUBLIC_DIRECTORIES:
        expected.update(
            p.relative_to(ROOT).as_posix()
            for p in (ROOT / directory).rglob("*")
            if p.is_file()
        )
    assert set(files) == expected, "ZIP differs from the public allowlist"
    for name, data in files.items():
        assert data == (ROOT / name).read_bytes(), "Source mismatch: " + name
    pages = {
        name: Page(data.decode("utf-8"))
        for name, data in files.items()
        if name.endswith(".html")
    }
    count = 0

    def reference(owner, value):
        nonlocal count
        url = urlsplit(value)
        if url.scheme or url.netloc:
            return
        target = (
            posixpath.normpath(
                posixpath.join(posixpath.dirname(owner), unquote(url.path))
            )
            if url.path
            else owner
        )
        if url.path.startswith("/"):
            target = unquote(url.path).lstrip("/")
        assert target in files, f"Missing or wrong-case path: {owner} -> {value}"
        if url.fragment and target in pages:
            assert (
                unquote(url.fragment) in pages[target].ids
            ), f"Missing anchor: {owner} -> {value}"
        count += 1

    for owner, page in pages.items():
        for value in page.references:
            reference(owner, value)
    for owner, data in files.items():
        if owner.endswith(".css"):
            for value in re.findall(r"url\(\s*['\"]?([^'\")]+)", data.decode("utf-8")):
                reference(owner, value.strip())
    return {
        "files": len(files),
        "html_pages": len(pages),
        "relative_references": count,
        "integrity": "PASS",
        "exact_case_paths": "PASS",
        "source_bytes": "PASS",
    }


if __name__ == "__main__":
    import json

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    print(json.dumps(verify(parser.parse_args().archive), indent=2))
