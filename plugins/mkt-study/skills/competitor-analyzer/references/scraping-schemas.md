# Extraction Schemas — Competitor Analyzer

`WebFetch`의 `prompt`에 넣어 쓰는 추출 스키마입니다. competitor-analyzer 스킬의 Step 2, 3에서 사용합니다.

> **사용법**: 아래 스키마를 그대로 `WebFetch`의 `prompt` 안에 붙여넣고, 앞에 `"아래 JSON 형식으로만 답하세요. 페이지에 없는 항목은 null, 목록이 비면 []. 절대 추측하지 마세요. 문구는 원문 그대로 옮기세요."`를 덧붙입니다. `WebFetch`는 스키마를 강제하지 않으므로 결과 검증은 직접 해야 합니다.

---

## Homepage Messaging Schema

이 스키마를 `WebFetch` 프롬프트에 넣어 경쟁사 홈페이지의 메시징 요소를 추출합니다.

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

이 스키마를 `WebFetch` 프롬프트에 넣어 경쟁사 가격 페이지의 가격 구조를 추출합니다.

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

## URL Discovery without a crawler

When the pricing page URL isn't obvious:

```json
{
  "url": "[competitor homepage]",
  "search": "pricing"
}
```

Common pricing page patterns: `/pricing`, `/plans`, `/packages`, `/buy`, `/get-started`
