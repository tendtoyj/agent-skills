# Firecrawl Scraping Schemas — Competitor Analyzer

Reference schemas for `firecrawl_scrape` JSON extraction. Used in Steps 2 and 3 of the competitor-analyzer skill.

---

## Homepage Messaging Schema

Use this schema with `firecrawl_scrape` to extract messaging elements from competitor homepages.

```json
{
  "url": "[homepage URL]",
  "formats": [{
    "type": "json",
    "prompt": "Extract the main messaging elements from this landing page: the primary headline, supporting text, value proposition, calls to action, social proof (customer logos, testimonials, metrics), and overall tone",
    "schema": {
      "type": "object",
      "properties": {
        "hero_headline": { "type": "string" },
        "sub_headline": { "type": "string" },
        "value_proposition": { "type": "string" },
        "target_audience_signals": {
          "type": "array", "items": { "type": "string" }
        },
        "cta_buttons": {
          "type": "array", "items": { "type": "string" }
        },
        "social_proof_logos": {
          "type": "array", "items": { "type": "string" }
        },
        "social_proof_testimonials": {
          "type": "array", "items": { "type": "string" }
        },
        "social_proof_metrics": {
          "type": "array", "items": { "type": "string" }
        },
        "tone_keywords": {
          "type": "array", "items": { "type": "string" }
        }
      }
    }
  }],
  "onlyMainContent": true
}
```

### Field Guide

| Field | What to Look For | Example |
|-------|-----------------|---------|
| `hero_headline` | The H1 or most prominent text on the page | "The all-in-one marketing platform" |
| `sub_headline` | Supporting text directly below the headline | "Automate, nurture, and close more deals" |
| `value_proposition` | The core promise — what outcome do they deliver? | "Grow your business 3x faster with AI-powered automation" |
| `target_audience_signals` | Words that reveal who the page is for | "for growing businesses", "built for marketers", "solo creators" |
| `cta_buttons` | All call-to-action button text on the page | "Start Free Trial", "Book a Demo", "See Pricing" |
| `social_proof_logos` | Company/brand logos displayed as trust signals | "Google", "Spotify", "Airbnb" |
| `social_proof_testimonials` | Customer quotes or case study snippets | "Increased our conversion by 40%" |
| `social_proof_metrics` | Quantified trust signals | "10,000+ businesses", "4.8/5 on G2" |
| `tone_keywords` | Adjectives and verbs that define the brand voice | "confident", "playful", "action-oriented" |

---

## Pricing Page Schema

Use this schema with `firecrawl_scrape` to extract pricing structure from competitor pricing pages.

```json
{
  "url": "[pricing URL]",
  "formats": [{
    "type": "json",
    "prompt": "Extract all pricing information: pricing model type, plan names and prices, features per plan, free tier details, enterprise options, and how prices are framed (monthly vs annual, discounts)",
    "schema": {
      "type": "object",
      "properties": {
        "pricing_model": { "type": "string" },
        "plans": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "price_monthly": { "type": "string" },
              "price_annual": { "type": "string" },
              "key_features": { "type": "array", "items": { "type": "string" } },
              "limitations": { "type": "array", "items": { "type": "string" } }
            }
          }
        },
        "free_tier_details": { "type": "string" },
        "enterprise_option": { "type": "string" },
        "price_framing_tactics": { "type": "string" }
      }
    }
  }],
  "onlyMainContent": true
}
```

### Pricing Model Types

| Model | Description | Look For |
|-------|-------------|----------|
| **Freemium** | Free tier + paid upgrades | "Free plan", "Get started free" |
| **Free Trial** | Time-limited full access | "14-day free trial", "Try free for 30 days" |
| **Subscription** | Recurring monthly/annual | "$XX/month", "billed annually" |
| **One-time** | Single purchase | "$XX one-time", "lifetime access" |
| **Usage-based** | Pay per usage metric | "per email sent", "per 1,000 contacts" |
| **Hybrid** | Combination of above | Base subscription + usage overages |

### Price Framing Tactics to Note

- **Annual discount**: "Save 20% with annual billing" — anchoring on monthly price
- **Most popular badge**: Highlighting a specific tier to steer choices
- **Feature gating**: Which features are locked behind higher tiers?
- **Contact Sales**: No public price = enterprise/high-touch model
- **Per-seat vs flat**: Individual pricing vs team-wide pricing
- **Decoy pricing**: A tier that exists mainly to make another look attractive

---

## Fallback: Markdown Format

If JSON extraction returns empty or minimal content, fall back to markdown:

```json
{
  "url": "[URL]",
  "formats": ["markdown"],
  "onlyMainContent": true
}
```

Then manually extract the messaging elements from the markdown output.

---

## URL Discovery with firecrawl_map

When the pricing page URL isn't obvious:

```json
{
  "url": "[competitor homepage]",
  "search": "pricing"
}
```

Common pricing page patterns: `/pricing`, `/plans`, `/packages`, `/buy`, `/get-started`
