#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import subprocess
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

FILE_PATTERN = re.compile(r"^(\d{3})_.+\.md$")


def resolve_project_root(explicit_root: str | None) -> Path:
    if explicit_root:
        return Path(explicit_root).expanduser().resolve()

    try:
        output = subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"],
            stderr=subprocess.DEVNULL,
            text=True,
        ).strip()
        if output:
            return Path(output).resolve()
    except Exception:
        pass

    return Path.cwd().resolve()


def find_research_dir(project_root: Path) -> Path:
    canonical = project_root / "thoughts" / "research"
    if canonical.is_dir():
        return canonical

    candidates = []
    for path in project_root.rglob("research"):
        if not path.is_dir():
            continue
        if path.parent.name == "thoughts":
            candidates.append(path)

    if candidates:
        return sorted(candidates, key=lambda p: (len(p.parts), str(p)))[0]

    canonical.mkdir(parents=True, exist_ok=True)
    return canonical


def next_sequence(research_dir: Path) -> int:
    highest = 0
    for entry in research_dir.iterdir():
        if not entry.is_file():
            continue
        match = FILE_PATTERN.match(entry.name)
        if not match:
            continue
        highest = max(highest, int(match.group(1)))
    return highest + 1


def slugify(topic: str) -> str:
    normalized = unicodedata.normalize("NFKD", topic)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii").lower()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")
    if not slug:
        return "research-note"
    return slug[:60].strip("-") or "research-note"


def build_template(topic: str, question: str) -> str:
    now = datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
    return f"""---
date: {now}
researcher: Claude
topic: \"{topic}\"
tags: [research, codebase]
status: complete
---

# Research: {topic}

## Research Question
{question}

## Summary
[TBD]

## Detailed Findings

## Code References

## Architecture Insights
[TBD]

## Open Questions
[TBD]
"""


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Create the next numbered research note path under thoughts/research."
    )
    parser.add_argument("--topic", required=True, help="Short topic summary used for filename slug")
    parser.add_argument("--question", default="", help="Original research question")
    parser.add_argument("--project-root", default=None, help="Optional project root override")
    parser.add_argument(
        "--bootstrap",
        action="store_true",
        help="Write a starter markdown document at the computed path",
    )
    args = parser.parse_args()

    project_root = resolve_project_root(args.project_root)
    research_dir = find_research_dir(project_root)

    seq = next_sequence(research_dir)
    slug = slugify(args.topic)
    output_path = research_dir / f"{seq:03d}_{slug}.md"

    if args.bootstrap:
        question = args.question.strip() or args.topic.strip()
        output_path.write_text(build_template(args.topic.strip(), question), encoding="utf-8")

    print(str(output_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
