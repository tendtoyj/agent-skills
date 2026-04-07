# Coding Agent Prompt Template

## PRIMARY OBJECTIVE

Generate visually striking, modern, and highly polished frontend components and page structures based on the defined scope. Prioritize aesthetics, creative layout, sophisticated styling, and smooth micro-interactions. Structure the code with good separation of concerns to facilitate future development.

This template is **coding agent-agnostic** — it works with Cursor, Claude Code, Windsurf, or any AI coding assistant.

---

## MODULE 1: OVERALL THEME & MOOD

- **Core feeling:** `[placeholder]`
- **Visual Inspiration:** `[placeholder]`
- **Reference Images:** `[placeholder]`

---

## MODULE 2: LAYOUT & SPACING

- **Layout Approach:** `[placeholder]`
- **Section/Component Separation:** `[placeholder]`
- **Content Width:** `[placeholder]`
- **Spacing Scale:** `[placeholder]`

---

## MODULE 3: COLOR PALETTE (Harmonious System)

### Core Colors (Required):
- **Primary Base:** `[#hex]`
- **Primary Light:** `[Primary + alpha 0.1-0.2]`
- **Primary Subtle:** `[Primary + alpha 0.05-0.08]`
- **Neutral Dark:** `[#hex — text]`
- **Neutral Light:** `[#hex — background]`

### Optional Accent:
- **Secondary Base:** `[#hex]`
- **Secondary Light:** `[Secondary + alpha 0.15]`

### Alpha Variation Guide:
```css
primary-base: [#hex];           /* CTAs, links, focus states */
primary-hover: [#hex + darker]; /* hover states */
primary-light: [rgba 0.15];     /* backgrounds, highlights */
primary-subtle: [rgba 0.05];    /* subtle backgrounds */
```

---

## MODULE 4: TYPOGRAPHY

- **Headline Font:** `[placeholder]`
- **Body Font:** `[placeholder]`
- **Headline Style:** `[placeholder]`
- **Body Style:** `[placeholder]`
- **Hierarchy:** `[placeholder]`

---

## MODULE 5: IMAGERY & ICONS

- **Image Style:** `[placeholder]`
- **Icon Style:** `[placeholder — e.g., lucide-react, size, stroke width]`

---

## MODULE 6: INTERACTIVITY & ANIMATION

- **Hover Effects:** `[placeholder]`
- **Scroll Animations:** `[placeholder]`
- **Button Interactions:** `[placeholder]`
- **Loading States:** `[placeholder]`
- **State Transitions:** `[placeholder]`

---

## MODULE 7: FILE STRUCTURE & COMPONENT STRATEGY

- **Directory Structure:**
  - `components/layout/` — Shared layout components
  - `components/views/` — Page-specific view components
  - `components/ui/` — Base UI components
  - `components/common/` — Reusable visual elements
- **Component Granularity:** `[placeholder]`
- **Client/Server Component Strategy:** `[placeholder]`

---

## MODULE 8: COMPONENT STYLING & DESIGN CONSTRAINTS

### Enforced Constraints:
- **Max Colors:** 5-6 total (use alpha variations, not new hues)
- **Button Radius:** `[placeholder — xl recommended, avoid 3xl]`
- **Chart Type:** `[Line OR Area — choose one, apply consistently]`

### Component Styles:
- **Buttons:** `[placeholder]`
- **Cards:** `[placeholder]`
- **Inputs:** `[placeholder]`
- **Tables:** `[placeholder]`
- **Modals:** `[placeholder]`

---

## MODULE 9: REQUIRED PAGES/VIEWS (MVP Scope)

Structure for each page:

- **Page/View Name:** `[Name]`
- **Route Path:** `[URL path]`
- **Layout Component:** `[shared layout reference]`
- **Key Components:**
  - `[Component Name]`: `[description + styling notes]`
- **Specific Notes:** `[overriding styles, interactions, critical notes]`

`[Pages will be dynamically generated based on MVP scope]`

---

## MODULE 10: TECHNICAL IMPLEMENTATION NOTES

- Use **Next.js App Router** structure (or specified framework)
- Create page files corresponding to routes in Module 9
- Use `tsx` files, kebab-case filenames
- Use **shadcn/ui** as base components (or specified component library)
- Style via **Tailwind CSS** according to Modules 1-8
- Use **lucide-react** for icons
- Apply harmonious color system (max 5-6 colors with alpha variations)
- Follow button radius recommendations
- Maintain chart style consistency
- **Korean Font Support:** Include CDN links when applicable
- Implement **responsive design**
- Ensure **accessibility** (semantic HTML)
- Follow separation of concerns (Module 7)
- Use placeholder data and `#` for external links
- Use functional `<Link>` components for internal navigation

### Service Name Integration:
- **Project Title:** "[SERVICE-NAME] — MVP"
- **Component naming:** Consider service name where appropriate
