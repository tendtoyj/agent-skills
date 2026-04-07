# card-news-memory/

> Persistent memory layer for the **card-news** plugin.
> Tracks production history, approved copy archives, and series configuration.

## Plugin Memory Relationship

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   vibe-mkt      │     │  creative-mkt   │     │   card-news     │
│                 │     │                 │     │                 │
│ brand-memory/   │────>│creative-memory/ │────>│card-news-memory/│
│   (Read)        │Read │   (Read)        │Read │   (Read/Write)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Access Rules

| Memory | Permission | Usage |
|--------|-----------|-------|
| `brand-memory/` | **Read-only** | Voice tone, positioning, brand identity |
| `research-memory/` | **Read-only** | Research-based content sources |
| `creative-memory/` | **Read-only** | Visual guidelines, storytelling frameworks |
| `card-news-memory/` | **Read & Write** | Production state, copy bank, series config |

## File Inventory

| File | Owner Skill(s) | Description |
|------|---------------|-------------|
| `production-log.md` | card-news-maker | Production history (date, topic, card count, status, output path) |
| `copy-bank.md` | copy-writer (after PASS) | Approved copy archive for few-shot reference |
| `series-config.md` | orchestrator | Brand header, account handle, default tags, color overrides |

## Auto-Load Protocol

Every card-news skill executes this sequence before starting work:

```
1. Check card-news-memory/ exists → create from card-news-memory-template/ if missing
2. Load card-news-memory/series-config.md     (brand header, handle, defaults)
3. Load card-news-memory/production-log.md    (recent production history)
4. Load card-news-memory/copy-bank.md         (approved copy for few-shot)
5. Load brand-memory/voice-profile.md         (brand tone consistency, read-only)
6. Load creative-memory/visual-guidelines.md  (visual identity, read-only)
7. Optional: Load research-memory/ files      (skill-specific, as needed)
```

## Enrichment Pattern

- Each skill appends to its own section only — **never delete** existing content
- Every entry is tagged with its source skill: `[copy-writer]`, `[card-news-maker]`, etc.
- Orchestrator handles automatic initialization on first run
