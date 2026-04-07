---
name: implement-plan
description: Execute approved plan files in the current workspace by 3-digit plan number (NNN), resolving thoughts/plans/NNN_*.md and completing phases in checkbox order without skipping.
---

# Implement Plan

Execute one unchecked phase at a time from a selected plan file.

## Required Input

- Ask user for a 3-digit plan number (`NNN`) before starting.
- Accept only `NNN` format (`001`-`999`).

## Plan File Resolution

1. Resolve candidates in current workspace: `thoughts/plans/{NNN}_*.md`.
2. If no file matches, report missing file and suggest `/create-plan`.
3. If multiple files match, list candidates and ask user to choose one exact file.
4. If exactly one file matches, select it.
5. Read selected plan file first.

## Execution Rules

1. Find first unchecked phase header: `## - [ ] Phase N: ...`.
2. Execute only that first unchecked phase.
3. Do not skip unchecked phases.
4. Mark satisfied success criteria as `([x])`.
5. Mark phase checkbox `- [x]` only when all success criteria are satisfied.
6. After each phase, run full gate: lint, typecheck, tests.
7. Create commit(s) for completed phase.
8. Repeat until no unchecked phase remains.
9. Report completion when all phases are checked.

## Context Notes

- Follow selected plan only.
- Use `-` instead of `/` for git branch names when needed.
