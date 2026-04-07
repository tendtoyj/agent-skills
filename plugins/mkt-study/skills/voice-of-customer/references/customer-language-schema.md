# customer-language.md Output Schema

Use this exact schema when writing `research-memory/customer-language.md`.

```markdown
# Customer Language Bank
> Last updated: [YYYY-MM-DD]
> Source skill: voice-of-customer

## Pain Expressions
> Complaints, frustrations, and problem descriptions in customers' own words.

| # | Expression | Context | Source | Intensity | Segment |
|---|-----------|---------|--------|-----------|---------|
| 1 | "[actual phrase]" | [what prompted this] | [platform/community] | Mild/Strong/Extreme | [segment] |

## Desire Expressions
> Wishes, aspirations, and ideal outcomes customers describe.

| # | Expression | Context | Source | Segment |
|---|-----------|---------|--------|---------|
| 1 | "[actual phrase]" | [what they want] | [platform/community] | [segment] |

## Comparison Language
> How customers evaluate, compare, and discuss alternatives.

| # | Expression | Competitors Mentioned | Criteria Used | Source |
|---|-----------|----------------------|--------------|--------|
| 1 | "[actual phrase]" | [names] | [what they compared on] | [platform] |

## Trigger Phrases
> What finally pushes customers to buy, subscribe, or switch.

| # | Expression | Trigger Type | Source |
|---|-----------|-------------|--------|
| 1 | "[actual phrase]" | Social Proof / Urgency / Value / Risk Removal / Authority / Scarcity | [platform] |

## Community Sources
> Where these expressions were collected. Reference for future mining runs.

| # | Community | Platform | URL | Relevance | Last Mined |
|---|-----------|----------|-----|-----------|-----------|
| 1 | [name] | Reddit/Discord/Forum/Twitter | [url if available] | [why relevant] | [YYYY-MM-DD] |
```

## Column Definitions

### Pain Expressions
- **Expression**: Exact or near-exact customer quote. Always in quotation marks.
- **Context**: What situation or problem prompted this statement.
- **Source**: Platform name and community (e.g., "Reddit r/marketing", "G2 Reviews").
- **Intensity**: Mild (minor annoyance), Strong (clear frustration), Extreme (anger/venting).
- **Segment**: Which audience segment from customer-insight.md this maps to.

### Desire Expressions
- **Expression**: What the customer wishes for or expects. In quotation marks.
- **Context**: The aspiration or ideal outcome they describe.
- **Source**: Platform and community.
- **Segment**: Which audience segment.

### Comparison Language
- **Expression**: How customers compare or evaluate options. In quotation marks.
- **Competitors Mentioned**: Specific product/company names referenced.
- **Criteria Used**: What dimension they compared on (price, features, UX, support, etc.).
- **Source**: Platform.

### Trigger Phrases
- **Expression**: What made them finally decide. In quotation marks.
- **Trigger Type**: One of — Social Proof, Urgency, Value Realization, Risk Removal, Authority, Scarcity.
- **Source**: Platform.

### Community Sources
- **Community**: Name of the community or channel (e.g., "r/SaaS", "Indie Hackers").
- **Platform**: Reddit, Discord, Twitter/X, Forum, Review Site, etc.
- **URL**: Direct link if available; otherwise the community homepage.
- **Relevance**: Why this community matters for this product category.
- **Last Mined**: Date this source was last searched.

## Refresh Mode Rules

When running in Refresh mode:
1. Do NOT overwrite existing expressions — append new rows below existing ones.
2. Update `> Last updated:` date at the top.
3. Add new communities to Community Sources table.
4. If an existing expression is no longer relevant, do NOT delete — add a note in Context column.
5. Re-number rows sequentially after appending.
