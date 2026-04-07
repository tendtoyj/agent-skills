# Competitive Intel — Output Schema

Use this exact schema when writing `research-memory/competitive-intel.md`.
Tag every `[competitor-finder]` section. Leave `[competitor-analyzer]` and `[competitor-visual]` sections as empty scaffolds.

```markdown
# Competitive Intelligence
> Last updated: [YYYY-MM-DD]
> Source skills: competitor-finder → competitor-analyzer → competitor-visual

## Competitive Set
> [competitor-finder]

### Direct Competitors
| # | Company | URL | One-liner | Why Competitor |
|---|---------|-----|-----------|----------------|
| 1 | [name] | [url] | [description] | [reasoning] |

### Indirect Competitors
| # | Company | URL | One-liner | Why Competitor |
|---|---------|-----|-----------|----------------|
| 1 | [name] | [url] | [description] | [reasoning] |

## Positioning & Messaging Matrix
> [competitor-finder]

| Competitor | Positioning | Core Value Props | Target Audience | Pricing Model | Price Range |
|-----------|-------------|-----------------|-----------------|---------------|-------------|
| [name] | [tagline] | [benefits] | [who] | [model] | [range] |

## Website Messaging Detail
> [competitor-analyzer] — to be filled by competitor-analyzer skill
<!-- Populated by competitor-analyzer (Firecrawl): headlines, CTAs, social proof, pricing page detail -->

## Design Patterns & Visual Audit
> [competitor-visual] — to be filled by competitor-visual skill
<!-- Populated by competitor-visual (Playwright): screenshots, color palettes, layout, visual tone -->

## Channel Activity Matrix
> [competitor-finder]

| Competitor | Content | Social | SEO/Ads | Email | Community |
|-----------|---------|--------|---------|-------|-----------|
| [name] | [level] | [platforms + level] | [level] | [level] | [level] |

*Levels: Strong / Moderate / Weak / Absent*

## Gaps & Opportunities
> [competitor-finder]

### Underserved Channels
[Channels most competitors neglect]

### Positioning Whitespace
[Unclaimed positioning angles]

### Messaging Gaps
[Customer needs competitors don't address]
```

## Refresh Mode Rules

- Do NOT overwrite the entire file
- Update only `[competitor-finder]` sections that changed
- Add new competitors to existing tables (don't replace the table)
- Append `> Updated: [date]` below each changed section header
- **NEVER touch** `[competitor-analyzer]` or `[competitor-visual]` sections

## research-log.md Entry Format

```
| [YYYY-MM-DD] | competitor-finder | Full Discovery / Refresh | [X direct + Y indirect competitors identified, key gaps] | Perplexity |
```
