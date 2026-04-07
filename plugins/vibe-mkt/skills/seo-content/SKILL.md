---
name: seo-content
description: "Write content that ranks in search AND sounds human — articles, guides, and pages that earn traffic. Use when user mentions: SEO content, blog post, article, write content, ranking content, search optimized, content writing, SERP, People Also Ask, content refresh, programmatic content, local SEO page, SEO article, content brief, write a page, organic content, blog writing, Google ranking"
user-invocable: true
---

# SEO Content Skill

> **Trigger keywords**: SEO content, blog post, article, write content, ranking content, search optimized, content writing, SERP, People Also Ask, content refresh, update content, programmatic content, local SEO page, SEO page, write for search, organic content, blog writing, SEO article, content brief, write a page, create content, search ranking, Google ranking

Write content that ranks in search AND sounds like a human wrote it. Not keyword-stuffed filler — real articles, guides, and pages that earn traffic because they deserve to.

This skill takes keywords from **Keyword Research** and turns them into published content. It sits in the middle of the Traffic Stack:

```
KEYWORD RESEARCH → SEO CONTENT → Content Atomizer
Keyword strategy    → Ranking content → 15+ social assets per piece
```

The philosophy: "Producing high-quality content targeted towards search terms relevant to the business is a step you should definitely do. But creating content alone doesn't mean you'll show up in Google — there's still work to do on indexing, link building, and ongoing improvement."

---

## Brand Memory Protocol

Before writing any content, check for the `brand-memory/` directory.

- If `voice-profile.md` exists → apply tone, vocabulary, personality to ALL content (this is critical — SEO content still needs brand voice)
- If `positioning.md` exists → frame content through the chosen positioning angle
- If `audience.md` exists → match language level, pain points, and examples to the target reader
- If none exist → warn the user:

> "No brand memory found. I can still write content, but it won't have your brand voice or positioning. For best results, run **Brand Voice** and **Positioning Angles** first."

Proceed with generic defaults if the user wants to continue anyway.

---

## Three Modes

Detect mode from user intent:

> **Mode 1 — Create**: Write new SEO content from scratch. SERP analysis → structure design → full draft → human checkpoint.
>
> **Mode 2 — Refresh**: Update existing content that's losing rankings or outdated. Diagnose → identify gaps → rewrite/expand → re-optimize.
>
> **Mode 3 — Programmatic**: Generate content at scale from a pattern template. Design template → define variables → produce individual pages → ensure uniqueness.

**Auto-detection logic:**
- "Write a blog post about X" or "create a page for Y keyword" → Mode 1
- "Update this article" or "refresh this content" or "this page is losing traffic" → Mode 2
- "Create pages for [pattern]" or mentions "[X] in [city]" or "content at scale" → Mode 3
- Keyword research output provided with a single keyword → Mode 1
- Keyword research output provided with a programmatic pattern → Mode 3
- Ambiguous → default to Mode 1, confirm with user

---

## Input Gathering

Before writing, collect (or load from brand memory):

1. **Target keyword** — Primary keyword + 2-3 secondary keywords. Load from Keyword Research output if available, or ask directly.
2. **Content type** — Blog post, pillar guide, local SEO page, comparison page, glossary entry? If unclear, SERP analysis will determine the best format.
3. **Target audience** — Who reads this? Load from `audience.md` or ask: "What's their expertise level? What language do they use?"
4. **Competing URLs** (optional) — 2-3 URLs currently ranking for this keyword. Helps SERP analysis. "Share the top results you see, or I'll analyze based on what I know."
5. **Lead magnet to integrate** (optional) — Name and description of the opt-in offer to embed. Load from Lead Magnet output if available, or use a generic CTA.
6. **Target word count** (optional) — If not specified, SERP analysis will recommend based on competition.
7. **For Refresh mode** — The existing content URL or text to update.
8. **For Programmatic mode** — The pattern from Keyword Research (e.g., "[service] marketing in [city]") + list of variables.
9. **Language** (Optional) — 콘텐츠 작성 언어. Default: English. SEO 콘텐츠는 타겟 시장의 언어로 작성해야 검색 노출에 유리합니다.

If brand memory and keyword research output cover most of these, confirm and move on. Don't re-ask what's already documented.

---

## Mode 1: Create — Full Process

### Step 1: SERP Analysis

Analyze the competitive landscape for the target keyword before writing a single word. This shapes every decision.

**Analyze top 10 results for:**

1. **Content structure patterns**
   - Average word count across top results
   - Common H2 sections (appear in 5+ results = must-have)
   - Rare H2 sections (appear in <3 results = potential gap/opportunity)
   - Content format: listicle, how-to, guide, comparison?

2. **Content angle analysis**
   - What perspective do top results take?
   - Where do they cluster? Where are the gaps?
   - What's the dominant tone — corporate, casual, technical, beginner-friendly?

3. **People Also Ask (PAA) mapping**
   - Collect 5-10 PAA questions for the target keyword
   - For each: decide integration method — H2 section, FAQ entry, or internal link opportunity
   - Identify Featured Snippet opportunities (definition paragraph, numbered list, or table)

4. **Quality assessment**
   - How deep is existing content? Thin or comprehensive?
   - How fresh? When was it last updated?
   - What original data, examples, or insights do they include?
   - What's missing across ALL top results? (= our biggest opportunity)

5. **Search intent verification**
   - Informational, commercial, navigational, or transactional?
   - Do top results match the keyword research intent classification?
   - Adjust content type if SERP shows different intent than expected

**SERP Analysis Output:**
- Recommended word count (aim 10-20% deeper than competition average)
- Must-cover topics (common across top results)
- Differentiation opportunity (gaps in existing content)
- Featured Snippet target (format + question)
- Content angle recommendation (connected to positioning.md)

### Step 2: Content Structure Design

Build the skeleton before writing. Structure is based on SERP analysis, not guesswork.

```
[SEO Title] — 60 chars max, primary keyword included, click-worthy
[Meta Description] — 160 chars max, primary keyword + CTA
[URL Slug] — short, descriptive, primary keyword, hyphens

H1: [Page title — close to SEO title but can be longer/more natural]

[Introduction] (100-150 words)
├── Hook: statistic, question, bold claim, or relatable scenario
├── Problem/situation framing: why the reader should care
├── What this article covers (set expectations)
└── Primary keyword within first 100 words

[Body Sections — 3-7 sections]
H2: [Must-Have Topic 1] (secondary keyword where natural)
  ├── Core content + evidence/examples/data
  ├── H3: [Subsection] (if section needs 300+ words)
  └── [PAA question answered inline if relevant]

H2: [Differentiation Section — our unique angle]
  └── Content that exists nowhere else in top results

H2: [Must-Have Topic 2]

H2: [Practical/Actionable Section]
  └── Steps, tools, templates — something the reader can DO

[★ Lead Magnet / CTA Integration Point]
  └── Natural bridge: "Want the checklist version? Download it here."

H2: FAQ (if PAA questions remain)
  └── Schema-ready Q&A format

[Conclusion] (75-100 words)
├── Key takeaways (2-3 sentences)
├── Clear next step for the reader
└── Final CTA
```

**Content type variations:**

| Type | Key Differences | Word Count |
|------|----------------|------------|
| Blog Post | Standard structure above | 1,500-3,000 |
| Pillar Guide | 7-12 H2s, table of contents, comprehensive | 3,000-5,000 |
| Local SEO Page | City-specific data, local proof, geo-keywords | 1,500-2,500 |
| Comparison Page | Side-by-side table, pros/cons, "best for" sections | 1,500-2,500 |
| Glossary/Definition | Short, precise definition, Featured Snippet optimized | 500-1,000 |

### Step 3: Write the Content

Follow these rules for every sentence:

**Writing principles:**
- 8th-grade reading level for general audiences. Adjust up for technical readers
- Short paragraphs: 2-4 sentences max
- Subheadings every 200-300 words
- At least one data point, example, or quote per section
- Active voice. Always
- "You" language — talk to the reader directly
- Front-load key information in each section
- Benefits over features. "So what?" test for every claim

**SEO writing rules:**
- Primary keyword in: title, first paragraph, 1-2 H2s, meta description, URL slug
- Secondary keywords: distributed naturally across body and subheadings
- No keyword stuffing — if it reads awkwardly, remove the keyword
- Internal links: 2-3 to related content on the site (descriptive anchor text, not "click here")
- External links: 1-2 to authoritative sources (builds trust with readers and search engines)
- Image alt text: descriptive, include keyword where genuinely relevant

**Featured Snippet optimization:**
- For "What is X?" queries → write a 40-60 word definition paragraph immediately under the H2
- For "How to X?" queries → use a numbered list with clear step labels
- For comparison queries → use a clean HTML/markdown table
- Match the format Google already shows in the Featured Snippet for that query

**Brand voice application:**
- Apply voice-profile.md USE words actively throughout
- Strictly avoid voice-profile.md AVOID words
- Maintain personality traits consistently — if the brand is "confidently boring," don't suddenly get hype-y
- Read the draft aloud: does it sound like the brand?

### Step 4: Lead Magnet Integration

Embed the lead magnet naturally. This was a standout feature in the original demo: "I like how it integrated our lead magnet on this page."

**Integration points (pick 1-2, never more):**

1. **Inline CTA** (mid-article): Place after a section that directly relates to the lead magnet
   - Pattern: "Want to put this into practice? [Lead magnet name] walks you through it step by step."

2. **Content upgrade**: Offer a downloadable version of the article's key takeaway
   - Pattern: "Download the complete [checklist/template/guide] →"

3. **End-of-article CTA**: After the conclusion, as a natural next step
   - Pattern: "Ready to take action? Start with our [lead magnet name] — it takes 5 minutes and shows you exactly where to focus."

**Integration rules:**
- The lead magnet must be relevant to the article's topic. Don't force it
- Frame as additional value for the reader, not an ad
- If no lead magnet is specified, suggest a generic CTA (newsletter signup, free consultation, etc.)
- Never use pop-up/aggressive language in the text itself

### Step 5: On-Page SEO Checklist

Verify every element before delivering:

| Element | Requirement | ✓ |
|---------|-------------|---|
| Title tag | 60 chars max, primary keyword, compelling | [ ] |
| Meta description | 160 chars max, primary keyword, CTA | [ ] |
| URL slug | Short, descriptive, primary keyword, hyphens | [ ] |
| H1 | One per page, primary keyword included | [ ] |
| H2/H3 hierarchy | Logical nesting, secondary keywords where natural | [ ] |
| Primary keyword placement | In first 100 words, naturally distributed | [ ] |
| Internal links | 2-3 links, descriptive anchor text | [ ] |
| External links | 1-2 authoritative sources | [ ] |
| Image alt text | Descriptive, keyword where relevant | [ ] |
| Schema markup | Article schema minimum. FAQ schema if FAQ section exists. HowTo if step-by-step | [ ] |

### Step 6: Human Checkpoint

**This is not optional.** Every piece of content gets this checklist before publishing. Deliver it as part of the output.

See `references/human-checkpoint-guide.md` for the full checklist. Summary:

**Fact-check & accuracy:**
- [ ] All statistics have verifiable sources
- [ ] All claims are supported (opinions clearly marked as opinions)
- [ ] All links work (no 404s, no redirects to irrelevant pages)
- [ ] Product/service information is current

**Expertise & originality (E-E-A-T):**
- [ ] Personal experience or professional insight has been added
- [ ] Content includes something the reader can't find elsewhere
- [ ] The article answers "Why should WE write this?" — not just anyone

**AI tells removed:**
- [ ] No "delve" / "landscape" (metaphorical) / "paradigm" / "tapestry" / "unleash"
- [ ] No "leverage" (as verb) / "navigate" (metaphorical) / "realm"
- [ ] No "In today's [X]" / "It's important to note that" / "As we navigate"
- [ ] No excessive adverbs: "truly", "incredibly", "absolutely", "fundamentally"
- [ ] Read aloud — does it sound like a person or a language model?

**Brand voice consistency:**
- [ ] USE words from voice profile are present
- [ ] AVOID words from voice profile are absent
- [ ] Overall tone matches brand personality

**Final SEO check:**
- [ ] On-Page SEO checklist (Step 5) fully passed
- [ ] Meta description is genuinely click-worthy (not just keyword-stuffed)
- [ ] Internal links feel natural, not forced

---

## Mode 2: Refresh — Update Existing Content

For content that's already published but losing rankings, getting stale, or underperforming.

### When to Refresh
- Published 6+ months ago, never updated
- Rankings dropping (down 10+ positions from peak)
- Traffic declining over 3+ months
- Information is outdated (old stats, deprecated tools, expired trends)
- New competitors have published better content on the same keyword

### Refresh Process

**Step 1: Diagnose current content**
- Structure: Does it follow modern best practices? (H2 hierarchy, readable paragraphs, internal links)
- Depth: Is it comprehensive compared to current top results?
- Keywords: Does it target the right keywords? Are there new related keywords to add?
- On-page SEO: Title, meta, URL, alt text — all optimized?
- Freshness: What specific information is outdated?

**Step 2: Re-analyze the SERP**
- What's changed since the original content was published?
- New competitors? New content angles? New PAA questions?
- Has search intent shifted? (e.g., informational → commercial)

**Step 3: Identify update opportunities**
- Missing sections that current top results all cover
- Outdated stats, tools, references, or examples to replace
- New PAA questions to answer
- Sections that are too thin and need expansion
- Sections that are no longer relevant and should be removed or consolidated

**Step 4: Execute the refresh**
- Rewrite outdated sections with current information
- Add new sections to close gaps
- Re-optimize on-page SEO elements (title, meta, headings)
- Update internal links (new content may exist to link to)
- Refresh the publication date after substantial changes

**Step 5: Human Checkpoint**
- Apply the same full checklist from Mode 1, Step 6
- Pay special attention to factual accuracy — stale facts are worse than no facts

---

## Mode 3: Programmatic — Content at Scale

For patterns like "[service] marketing in [city]" where one template produces dozens or hundreds of pages. Born from the original demo where HVAC marketing pages were generated for multiple cities.

### Programmatic Process

**Step 1: Confirm the pattern**
- Load from Keyword Research output or receive directly
- Pattern examples: "[trade] marketing in [city]", "[product] for [audience]", "[tool A] vs [tool B]"

**Step 2: Design the shared template**
- Create a content structure that works for ALL variations:

```
H1: [Variable A] Marketing in [Variable B]: The Complete Guide
Meta: "[Variable A] companies in [Variable B] need marketing that actually works. Here's the playbook."

[Intro: Why {Variable B} is a {market size adjective} market for {Variable A}]

H2: Why [Variable B] [Variable A] Companies Need Digital Marketing
→ {City-specific market data + industry pain points}

H2: [Number] Marketing Strategies That Work for [Variable A] in [Variable B]
→ {Strategies with local context}

H2: How Much Should [Variable B] [Variable A] Companies Spend on Marketing?
→ {Budget guidance with regional cost data}

H2: How to Choose a Marketing Partner in [Variable B]
→ {Local considerations}

[★ Lead Magnet CTA]

H2: FAQ
→ {Mix of universal + location-specific questions}

[Conclusion + CTA]
```

**Step 3: Define variable-specific content**
- For each variable combination, specify unique elements:
  - City: population, market size, competition level, local stats, seasonal factors
  - Service/Trade: industry pain points, typical customer, regulatory concerns, common objections
- Each page must have at least 40% unique content (not just swapped variables)

**Step 4: Uniqueness safeguards**
- Beyond variable swaps, each page needs:
  - Local data points (population, industry stats, market size)
  - City/region-specific tips or considerations
  - Unique FAQ questions (at least 2 per page)
  - Localized social proof if available
- Canonical URL strategy: each page is self-canonical (each targets a unique keyword)

**Step 5: Generate sample batch**
- Produce 3-5 sample pages for review
- Apply Human Checkpoint to samples
- Get user approval before generating the rest

**Step 6: Publication schedule**
- Never publish all pages at once — velocity signals matter
- Recommended cadence: 3-5 pages per week
- Start with highest-priority locations/keywords (from Keyword Research quick wins)

---

## Publishing Guidelines

These come directly from the Vibe Marketing SEO Principles. Include them with every output:

**Quality over quantity**: One excellent piece beats five mediocre pieces. If the content isn't genuinely useful, don't publish it.

**Don't publish all at once**: Velocity signals matter. Spread publications across days/weeks.

| Scenario | Recommended Cadence |
|----------|-------------------|
| Single article | Human checkpoint → publish within 1-2 days |
| Content series / pillar | 1-2 articles per week, consistent schedule |
| Programmatic SEO batch | 3-5 pages per week, rolling |
| Content refresh | As needed, prioritize highest-traffic pages |

**Post-publish checklist:**
- Request indexing in Google Search Console
- Add internal links from existing content to the new page
- Share via social channels (hand off to **Content Atomizer** for 15+ assets)
- Set a reminder: check rankings after 2-4 weeks
- Schedule a refresh review in 6 months

---

## Quality Checklist

Before delivering any output, self-audit:

- [ ] **SERP analysis was performed** — structure is based on competitive data, not assumptions
- [ ] **Content structure matches SERP opportunity** — must-have topics covered, differentiation present
- [ ] **On-Page SEO checklist passed** — every technical element verified
- [ ] **Lead magnet/CTA integrated naturally** — relevant, not forced, max 2 placements
- [ ] **Human Checkpoint attached** — full checklist included with the output
- [ ] **Brand voice is consistent** — voice profile applied, AI tells removed
- [ ] **Quality over quantity** — content is genuinely useful, not just long
- [ ] **Handoff-ready** — Content Atomizer can extract hooks and insights from this piece

If any item fails, revise before presenting.

---

## Example Output (Abbreviated)

Based on the "Boring Money" demo — HVAC marketing page for Phoenix.

**Metadata:**
```
title: "HVAC Marketing in Phoenix: The No-BS Guide for 2026"
meta: "Phoenix HVAC companies are leaving money on the table. Here's the playbook that works for trade businesses doing $2-10M."
slug: hvac-marketing-phoenix | keyword: "HVAC marketing in Phoenix"
schema: Article + FAQ
```

**Content structure:**
```markdown
# HVAC Marketing in Phoenix: The No-BS Guide

Phoenix has over 2,000 HVAC companies fighting for the same homeowners.
Most run the same playbook: a truck wrap, a prayer, and a $3K/month
agency retainer that produces nothing but reports. Here's what actually works.

## Why Phoenix Is a Goldmine for HVAC Companies (That Market Right)
→ [Phoenix metro adds 60K+ residents/year, 106°F summers, every homeowner needs HVAC]

## 5 Marketing Strategies That Actually Work for Phoenix HVAC
→ [Emergency keywords, review machine, seasonal calendar, local ads, referrals]

★ Lead Magnet CTA: "Take our 5-Minute Marketing Audit"

## How Much Should Phoenix HVAC Companies Spend on Marketing?
→ [PAA answer: 5-10% of gross revenue, with Phoenix-specific cost context]

## FAQ → [PAA questions: "Does SEO work for HVAC?", "How to get more leads?"]
## Conclusion → [Pick one strategy, commit 90 days, take the audit]
```

**Human Checkpoint (attached with output):**
```
✅ Fact-check: Phoenix population data — verify 2025 census
⚠️ Expertise: Add real client example about Phoenix market
⚠️ AI tells: Section 2 uses "landscape" — replace
✅ Brand voice: "Confidently Boring" consistent
✅ Lead magnet: Audit integrated at natural breakpoint
✅ On-page SEO: All items passed
```

---

## Saving & Handoff

After delivering content:

**Language rule**: 섹션 헤더와 테이블 컬럼명은 영어로 유지합니다. 본문, 셀 값, 설명, 분석 텍스트는 사용자가 지정한 언어로 작성합니다. 언어가 지정되지 않으면 English로 작성합니다.

1. Save to the project folder as `[keyword-slug]-content.md` (e.g., `hvac-marketing-phoenix-content.md`)
2. Include the Human Checkpoint as a separate section at the bottom or as a companion file
3. Suggest next steps:

> "Content is ready for human review (see the checkpoint below). After publishing:
>
> 1. **Content Atomizer** — Turn this article into 15+ social posts, newsletter sections, and short-form content
> 2. **Newsletter** — Feature this article in your next newsletter edition
> 3. **Keyword Research** — Ready for the next keyword? Run another Discover cycle for your next quick win."

4. Update `brand-memory/campaigns.md` with:
   - Keyword targeted
   - Content type and URL (once published)
   - Publication date
   - Status (drafted / reviewed / published)
