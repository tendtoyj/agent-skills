# creative-memory/

> Persistent memory layer for the **creative-mkt** plugin.
> Every creative-mkt skill reads from and writes to this directory.

## Plugin Memory Relationship

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   mkt-study     │     │   vibe-mkt      │     │  creative-mkt   │
│                 │     │                 │     │                 │
│ research-memory/│────>│ brand-memory/   │────>│creative-memory/ │
│   (Write)       │Read │   (Write)       │Read │   (Write)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Access Rules

| Memory             | Permission       | Usage                                              |
|--------------------|------------------|----------------------------------------------------|
| `research-memory/` | **Read-only**    | Market trends, competitor visuals, customer insights |
| `brand-memory/`    | **Read-only**    | Brand voice, positioning, audience profiles         |
| `creative-memory/` | **Read & Write** | Visual guides, frameworks, trends, examples, log    |

## File Inventory

| File                         | Owner Skill(s)                | Description                                  |
|------------------------------|-------------------------------|----------------------------------------------|
| `visual-guidelines.md`      | visual-extractor              | Brand visual identity                        |
| `storytelling-frameworks.md`| framework-builder             | Brand-customized storytelling frameworks      |
| `trend-angles.md`           | trend-scout                   | Trend angles + brand relevance               |
| `content-examples.md`       | post-writer, series-planner   | High-performing content as few-shot reference |
| `creative-log.md`           | All skills                    | Execution history + dedup + performance tracking |

## Auto-Load Protocol

Every creative-mkt skill executes this sequence before starting work:

```
1. Check creative-memory/ exists → create from template if missing
2. Load brand-memory/voice-profile.md   (brand tone consistency)
3. Load brand-memory/positioning.md     (message framing)
4. Load ALL .md files in creative-memory/ (except README.md)
5. Optional: Load research-memory/ files (skill-specific, as needed)
```

## Enrichment Pattern

- Each skill appends to its own section only — **never delete** existing content
- Every entry is tagged with its source skill: `[post-writer]`, `[series-planner]`, etc.
- Orchestrator handles automatic initialization on first run
