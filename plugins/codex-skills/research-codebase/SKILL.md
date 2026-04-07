---
name: research-codebase
description: Comprehensive codebase research for implementation planning with parallel investigation and synthesized findings. Use when the user asks to deeply analyze architecture, trace behavior across components, compare patterns, or produce a structured research note saved as the next numbered file in a project's thoughts/research directory.
---

# Research Codebase

## Initial Setup

When invoked, respond with:
```
I'm ready to research the codebase. Please provide your research question or area of interest, and I'll analyze it thoroughly by exploring relevant components and connections.
```

Then wait for the user's research query.

## Steps To Follow After Receiving The Research Query

1. Read directly mentioned files first.
- If the user mentions specific files, read them fully first.
- Read those files in the main context before spawning sub-tasks.

2. Analyze and decompose the research question.
- Break query into composable research areas.
- Identify relevant components, patterns, and architecture.
- Track subtasks with a checklist.

3. Spawn parallel sub-agent tasks for comprehensive research.
- Run concurrent sub-tasks for independent research areas.
- Keep each sub-task narrow and explicit.

4. Wait for all sub-tasks and synthesize findings.
- Wait until all sub-tasks are complete.
- Connect findings across components.
- Include specific file paths and line numbers.
- Highlight patterns and architectural decisions.

5. Generate the research document.
Use this structure:
```markdown
---
date: [Current date and time in ISO format]
researcher: Claude
topic: "[User's Question/Topic]"
tags: [research, codebase, relevant-component-names]
status: complete
---

# Research: [User's Question/Topic]

## Research Question
[Original user query]

## Summary
[High-level findings answering the user's question]

## Detailed Findings

### [Component/Area 1]
- Finding with reference (file.ext:line)
- Connection to other components
- Implementation details

### [Component/Area 2]
...

## Code References
- `path/to/file.py:123` - Description of what's there
- `another/file.ts:45` - Description of the code block

## Architecture Insights
[Patterns, conventions, and design decisions discovered]

## Open Questions
[Any areas that need further investigation]
```

6. Save and present findings.
- Save to the next numbered file under the research directory.
- Present concise summary + key file references to the user.

## Dynamic File Path And Name (Required)

Always determine output path dynamically.

1. Resolve project root.
- Prefer `git rev-parse --show-toplevel`.
- If unavailable, use current working directory.

2. Resolve research directory.
- Prefer `<project-root>/thoughts/research`.
- If missing, search under project root for directories named `thoughts/research`.
- If multiple found, select the shallowest path.
- If none found, create `<project-root>/thoughts/research`.

3. Compute next sequence number.
- Scan files matching `NNN_*.md` where `NNN` is exactly three digits.
- Use `max(NNN) + 1`.
- Zero-pad to three digits.

4. Create topic slug.
- Summarize topic into short title.
- Convert title to lowercase kebab-case ASCII.
- Use filename pattern: `NNN_<slug>.md`.

5. Use bundled helper script.
```bash
python "$CODEX_HOME/skills/research-codebase/scripts/create_research_note.py" \
  --topic "<short-topic-summary>" \
  --question "<original-user-query>" \
  --bootstrap
```
- Script prints absolute file path.
- `--bootstrap` writes starter template.
- Replace starter sections with final findings.

## Important Notes

- Prefer parallel sub-tasks for speed.
- Ground findings in concrete code references.
- Keep research note self-contained.
- Include cross-component connections, not isolated facts.
