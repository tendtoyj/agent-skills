# Research Memory

> Shared context store for all research skills.
> Symmetric with `brand-memory/` but dedicated to market research outputs.

## Purpose

Research Memory is the **single source of truth** for all research findings.
Every research skill writes its output here; marketing execution skills read from here.

## Access Rules

```
                Write               Read
                ─────              ─────
research-memory/    Research skills only    Research skills + Marketing skills
brand-memory/       Marketing skills only   Marketing skills (+ Research skills read-only)
```

- **Research skills** → Read & Write to research-memory/
- **Marketing skills** → Read-only from research-memory/
- **Nobody** writes to both memory systems in a single skill

## Auto-Load Protocol

On every research skill invocation, BEFORE any analysis:

1. Check if `research-memory/` directory exists
2. If YES → Read ALL `.md` files in `research-memory/` (except README.md)
3. Use this context to:
   - Avoid redundant research (skip already-covered areas)
   - Build on existing findings (deepen, not repeat)
   - Maintain consistency across skills
4. If NO → Proceed without prior context (first run)

## File Index

| File | Source Skill(s) | Description |
|------|----------------|-------------|
| `market-landscape.md` | market-scanner | Market size, structure, trends, seasonality |
| `competitive-intel.md` | competitor-finder → competitor-analyzer → competitor-visual | Competitive set, positioning, messaging, design (sequential enrichment) |
| `customer-insight.md` | audience-profiler | Segments, journey map, pain points, media consumption |
| `customer-language.md` | voice-of-customer | Real customer language: pains, desires, comparisons, triggers |
| `strategy-brief.md` | research-synthesizer → expert-validator | Cross-analysis insights, expert consensus, strategic recommendations |
| `research-log.md` | All skills | Execution history for tracking and refresh |

## Enrichment Pattern

Some files are built by multiple skills in sequence:

```
competitive-intel.md:
  competitor-finder (Perplexity) → base structure: competitive set, positioning, channels
        ↓
  competitor-analyzer (Firecrawl) → enrichment: website messaging, pricing, CTAs, copy
        ↓
  competitor-visual (Playwright) → enrichment: design patterns, screenshots, visual tone

strategy-brief.md:
  research-synthesizer → base structure: cross-analysis, recommendations
        ↓
  expert-validator → enrichment: expert consensus, divergence points
```

**Enrichment rules:**
- Later skills NEVER delete existing content — only add/update their own sections
- Each section is tagged with `[skill-name]` to show which skill authored it
- A later skill running alone preserves all prior content

## Relationship to Marketing Skills

Marketing execution skills can reference research-memory files to produce better output:

- `06-direct-response-copy` → reads `customer-language.md` for real customer phrasing
- `07-seo-content` → reads `market-landscape.md` for trend context
- `09-email-sequences` → reads `customer-language.md` + `customer-insight.md`
- `03-positioning-angles` → reads `competitive-intel.md` for gap analysis
- `02-brand-voice` → reads `customer-language.md` for tone calibration

## File Status

| File | Status |
|------|--------|
| market-landscape.md | ⬜ Empty (scaffold) |
| competitive-intel.md | ⬜ Empty (scaffold) |
| customer-insight.md | ⬜ Empty (scaffold) |
| customer-language.md | ⬜ Empty (scaffold) |
| strategy-brief.md | ⬜ Empty (scaffold) |
| research-log.md | ⬜ Empty (scaffold) |
