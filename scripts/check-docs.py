#!/usr/bin/env python3
"""Validate local Markdown links, INDEX coverage and machine-local paths."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
INDEX = DOCS / "INDEX.md"
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
LOCAL_PATH_RE = re.compile(
    r"(?:file:///|[A-Za-z]:[/\\]server|(?:^|[\s`(])/Users/|(?:^|[\s`(])/home/[^/]+/)"
)


def markdown_files() -> list[Path]:
    files = list(DOCS.rglob("*.md"))
    files.extend(path for path in ROOT.glob("*.md") if path.is_file())
    gang_readme = ROOT / "plugins" / "CorePlugin" / "gang" / "README.md"
    if gang_readme.is_file():
        files.append(gang_readme)
    return sorted(set(files))


def main() -> int:
    errors: list[str] = []
    files = markdown_files()

    for source in files:
        text = source.read_text(encoding="utf-8")
        if LOCAL_PATH_RE.search(text):
            errors.append(f"machine-local path: {source.relative_to(ROOT)}")

        for raw_target in LINK_RE.findall(text):
            if raw_target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = raw_target.split("#", 1)[0]
            if not target:
                continue
            resolved = (source.parent / target).resolve()
            if not resolved.exists():
                errors.append(
                    f"broken link: {source.relative_to(ROOT)} -> {raw_target}"
                )

    index_text = INDEX.read_text(encoding="utf-8")
    for source in sorted(DOCS.rglob("*.md")):
        if source == INDEX:
            continue
        relative = source.relative_to(DOCS).as_posix()
        if relative not in index_text and source.name not in index_text:
            errors.append(f"missing from docs/INDEX.md: {relative}")

    if errors:
        print("Documentation check failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Documentation check passed ({len(files)} Markdown files).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
