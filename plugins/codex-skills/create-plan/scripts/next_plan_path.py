#!/usr/bin/env python3
"""Compute next numbered plan file path: NNN_title_summary.md."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

PLAN_FILE_RE = re.compile(r"^(?P<num>\d{3})_(?P<slug>.+)\.md$")


def slugify(text: str) -> str:
    value = text.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "_", value)
    value = re.sub(r"_+", "_", value).strip("_")
    return value or "plan"


def next_number(plans_dir: Path) -> int:
    max_num = -1
    for path in plans_dir.iterdir():
        if not path.is_file():
            continue
        match = PLAN_FILE_RE.match(path.name)
        if not match:
            continue
        num = int(match.group("num"))
        max_num = max(max_num, num)
    return max_num + 1


def build_path(workspace: Path, title: str) -> Path:
    plans_dir = workspace / "thoughts" / "plans"
    plans_dir.mkdir(parents=True, exist_ok=True)

    num = next_number(plans_dir)
    if num > 999:
        raise ValueError("No available 3-digit plan number left (max 999).")

    slug = slugify(title)[:80]
    return plans_dir / f"{num:03d}_{slug}.md"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Return next thoughts/plans path using NNN_title_summary.md format."
    )
    parser.add_argument("--workspace", required=True, help="Workspace root path")
    parser.add_argument("--title", required=True, help="Plan title used for slug")
    args = parser.parse_args()

    workspace = Path(args.workspace).expanduser().resolve()
    if not workspace.exists() or not workspace.is_dir():
        print(f"Workspace is not a directory: {workspace}", file=sys.stderr)
        return 1

    try:
        result = build_path(workspace=workspace, title=args.title)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    print(str(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
