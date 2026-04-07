# Email Sequence Templates Reference

Detailed email-by-email templates for all 8 sequence types. The Welcome Sequence is defined in the main SKILL.md. This file covers the remaining 7 types.

---

## Nurture Sequence (4-6 emails / 3-4 weeks)

**Trigger:** Welcome sequence completed without converting
**Goal:** Deepen relationship, demonstrate ongoing expertise, segment by interest
**Escalation pattern:** Value → Value → Value → Soft segmentation → Gentle pitch → Direct pitch

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Value-first educational content** | 0 | Teach something immediately useful. No pitch. Establish yourself as the go-to source. |
| 2 | **Pain point deep dive** | 5 | Identify a specific pain and explore it thoroughly. Show you understand the nuance, not just the surface. |
| 3 | **Solution positioning with proof** | 10 | Introduce your approach as the answer to the pain from email 2. Back it with a specific result or case study. |
| 4 | **Social proof showcase** | 15 | Let customers tell your story. Testimonials, results, before/after. Multiple proof points, not just one. |
| 5 | **Soft CTA** | 20 | Offer a low-commitment next step: free trial, demo, resource, consultation preview. Not "buy now." |
| 6 | **Direct CTA** | 25 | Clear offer. What they get, what it costs (or what the next step is), why now. |

**Exit condition:** Clicks CTA in email 5 or 6 (moves to Conversion sequence or completes goal)
**Post-sequence:** Move to newsletter list for ongoing engagement

**Branching notes:**
- If they click links in emails 1-3 about a specific topic → tag their interest for future segmentation
- If they don't open emails 3-4 → resend email 4 with new subject line before moving to email 5

---

## Conversion Sequence (5-7 emails / 10-14 days)

**Trigger:** High-intent behavior (pricing page visit, demo request, cart add without purchase, reached nurture end)
**Goal:** Close the sale
**Escalation pattern:** Problem → Solution → Proof → Offer → Urgency → Last chance

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Problem agitation** | 0 | Resurface the core pain at its most acute. "Here's what stays the same if you don't act." |
| 2 | **Solution introduction** | 2 | Your approach as the answer. Focus on mechanism — how it works and why it's different. |
| 3 | **Proof / Case study** | 4 | A specific customer story with concrete numbers. Before/after format. Relatable to the reader. |
| 4 | **Full offer presentation** | 6 | Everything they get. Value stack if applicable. Address the top 3 objections inline. |
| 5 | **Objection handling** | 8 | FAQ format or "I know what you're thinking..." Tackle price, fit, timing, and risk head-on. |
| 6 | **Social proof + urgency** | 10 | More results from others + genuine urgency element (deadline, limited spots, price increase). |
| 7 | **Last chance** | 12-14 | Final email. Restate transformation, core offer, deadline. "After today, [consequence]." |

**Exit condition:** Purchase, booking, or signup completed
**Post-sequence:** Move to onboarding or thank-you sequence

**Branching notes:**
- Opened emails 1-3 but didn't click → insert an extra "testimonial spotlight" email between 3 and 4
- Clicked pricing/offer in email 4 but didn't convert → send a "quick question" personal email from founder on Day 7

---

## Launch Sequence (6-8 emails / 2-3 weeks)

**Trigger:** Campaign start date (manual enrollment of target segment)
**Goal:** Build anticipation, drive launch-window purchases
**Escalation pattern:** Tease → Announce → Educate → Prove → Open → Remind → Close

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Teaser / Pre-announcement** | -7 | "Something's coming." Build curiosity without revealing everything. Optional: waitlist signup. |
| 2 | **Launch announcement** | 0 | Full reveal. What it is, who it's for, what makes it different. Link to sales page. |
| 3 | **Benefits deep-dive** | 2 | Pick the top 3 benefits and go deep on each. Use scenarios, not bullet points. |
| 4 | **Social proof / Early results** | 4 | Beta testers, early users, expert endorsements. Real results from real people. |
| 5 | **FAQ / Objection handling** | 6 | "Questions we've been getting." Address the reasons people hesitate. |
| 6 | **Cart open reminder** | 8 | "In case you missed it." Recap the offer. New angle or bonus reveal. |
| 7 | **Urgency reminder** | 10 | Deadline approaching. Countdown. "Here's what you'll miss." |
| 8 | **Last chance / Cart close** | 12-14 | Final email. Door is closing. Restate transformation + offer. Clear deadline. |

**Exit condition:** Purchase completed
**Post-sequence:** Buyers → onboarding. Non-buyers → cool-down period, then nurture.

**Branching notes:**
- If they clicked the sales page in emails 2-3 but didn't buy → send an extra "behind the scenes" email between 5 and 6
- If they joined the waitlist in email 1 → add an exclusive "early access" email before the general announcement

---

## Re-engagement Sequence (3-4 emails / 10-14 days)

**Trigger:** 30-60 days of no email opens or clicks
**Goal:** Get them active again or clean the list
**Escalation pattern:** Friendly nudge → Value reminder → Incentive → Clean break

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **"We miss you" + compelling reason** | 0 | Acknowledge absence without guilt. Lead with what's new or what they're missing. |
| 2 | **Value reminder** | 4 | Highlight the best content or features since they disengaged. "Here's what you missed." |
| 3 | **Incentive or exclusive offer** | 8 | Something only for them: discount, free resource, early access. Make returning feel special. |
| 4 | **Clean break** | 12-14 | "Should we stop emailing you?" Give them an easy out. Those who stay are re-engaged; those who leave clean your list. |

**Exit condition:** Opens or clicks any email → move back to active segment. Clicks "unsubscribe" or completes email 4 without engagement → remove from active marketing.
**Post-sequence:** Re-engaged subscribers → return to nurture or newsletter

**Re-entry:** Can re-enter after 90 days of new inactivity (maximum 2 times, then permanent removal from automated sequences)

---

## Win-back Sequence (3-5 emails / 30 days)

**Trigger:** Customer cancelled, subscription expired, or service ended
**Goal:** Recover the relationship and the revenue
**Escalation pattern:** Check-in → What's new → Incentive → Feedback → Farewell

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Friendly check-in** | 3 | "We noticed you left." Ask what went wrong. Genuine, not defensive. |
| 2 | **What's changed** | 10 | Product updates, new features, improvements since they left. Address common cancellation reasons. |
| 3 | **Special offer** | 17 | Win-back incentive: discount, extended trial, free month, upgrade. Time-limited. |
| 4 | **Feedback request** | 24 | Even if they won't come back, ask for honest feedback. Shows you care. Useful for product. |
| 5 | **Door open farewell** | 30 | "We'll leave the light on." No pressure. Share a resource. Make it easy to return later. |

**Exit condition:** Reactivates account or takes the win-back offer
**Post-sequence:** Reactivated → onboarding refresh. Not reactivated → suppress from marketing for 90 days, then low-frequency newsletter only.

**Re-entry:** Allowed once more after 6 months if they churn again. After second win-back attempt, no further automated outreach.

---

## Upgrade / Upsell Sequence (3-5 emails / 2-3 weeks)

**Trigger:** Usage milestone, feature limit reached, success signal, or time-on-plan threshold
**Goal:** Move the customer to a higher tier or add complementary product/service
**Escalation pattern:** Celebrate → Show the ceiling → Reveal what's next → Prove the ROI → Make it easy

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Success celebration** | 0 | "You've hit [milestone]!" Recognize their achievement. Reinforce they made a great choice. |
| 2 | **Feature gap or ceiling** | 5 | Show what they're bumping into. Not as a problem — as a sign of growth. "You've outgrown this level." |
| 3 | **Upgrade benefits with proof** | 10 | What the next level unlocks. Use specific customer stories of what happened after upgrading. |
| 4 | **Limited-time incentive** | 15 | Upgrade discount, bonus feature, free migration, extended trial of premium. Time-bound. |
| 5 | **Plan comparison** | 18-20 | Side-by-side: current plan vs. next plan. Make the gap tangible. ROI calculation if possible. |

**Exit condition:** Upgrades or explicitly declines
**Post-sequence:** Upgraded → onboarding for new tier. Not upgraded → suppress upsell for 90 days, continue regular nurture.

**Branching notes:**
- If they click the comparison in email 5 but don't upgrade → send a "quick question — what's holding you back?" personal email on Day 22

---

## Educational Drip Sequence (5-8 emails / 4-6 weeks)

**Trigger:** Expressed interest in a specific topic, enrolled in a course, or signed up for a content series
**Goal:** Teach progressively, build authority, convert to paid at the end
**Escalation pattern:** Foundation → Build → Advance → Apply → Graduate → Convert

| # | Purpose | Day | Key Element |
|---|---------|-----|-------------|
| 1 | **Welcome + what you'll learn** | 0 | Set expectations. Preview the journey. Quick win from lesson 1 content. |
| 2 | **Lesson 1: Foundational concept** | 3 | Core idea everything else builds on. Simple, clear, immediately applicable. |
| 3 | **Lesson 2: Intermediate concept** | 7-10 | Build on the foundation. Introduce complexity. Include exercise or action item. |
| 4 | **Lesson 3: Advanced concept** | 14-17 | The "aha" moment. Connect earlier lessons into a bigger picture. |
| 5 | **Practical application** | 21-24 | Hands-on exercise or template. "Now put it all together." |
| 6 | **Resource roundup** | 28-31 | Additional reading, tools, and references. Position yourself as the curator. |
| 7 | **Graduation + next steps** | 35-38 | Celebrate completion. Summarize key takeaways. Bridge to paid offer. |
| 8 | **Conversion** | 40-42 | Direct offer. "You've learned the foundation. Here's how to go further." |

**Exit condition:** Completes paid conversion or reaches final email
**Post-sequence:** Converted → onboarding. Not converted → add to nurture with topic-interest tag.

**Branching notes:**
- If they don't open lesson emails for 2 consecutive sends → pause sequence and send a "still interested?" check-in
- If they complete exercises (clicks exercise link) → tag as "high engagement" for priority in conversion email

---

## Writing Notes for All Templates

When writing any sequence from these templates:

1. **First email is always the most important.** If they don't open #1, nothing else matters. Invest extra time in the subject line and opening hook.
2. **Every email should stand alone.** Someone might open email 4 first. It should still make sense and provide value.
3. **End every email with a reason to open the next one.** A teaser, a promise, a cliffhanger. Build anticipation across the arc.
4. **Personalization goes beyond `{{first_name}}`.** Reference their specific trigger action, their industry, their stage. Make them feel seen.
5. **PS lines are prime real estate.** Many readers scroll to the PS first. Use it for social proof, a bonus, or a secondary CTA.
