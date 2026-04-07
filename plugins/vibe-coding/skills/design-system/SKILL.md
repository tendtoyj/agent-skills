---
name: design-system
description: "Define the complete design system through 8 interactive modules. Use when user mentions: design system, 디자인, colors, 색상, typography, 폰트, layout, 레이아웃, theme, 테마, component style, 컴포넌트, design tokens, design preview, 디자인 프리뷰, look and feel"
user-invocable: true
---

# Design System

> **Trigger keywords**: design system, 디자인, colors, 색상, typography, 폰트, layout, 레이아웃, theme, 테마, component style, 컴포넌트, design tokens, design preview, 디자인 프리뷰

Interactively define your complete design system through 8 modules, from theme and mood to component styling. Includes a visual design preview checkpoint before moving to code generation.

---

## Project Memory Protocol

Before executing, load from `project-memory/`:

- `project-context.md` → Service name, concept, target users
- `ux-spec.md` → Design direction, functionality specs
- `mvp-scope.md` → Which pages/features are in scope
- `design-tokens.md` → Check if design system already exists

If `design-tokens.md` already has real content:
- Show summary of existing design decisions
- Ask: "기존 디자인을 수정하시겠어요, 아니면 새로 시작하시겠어요?"

If no project-memory exists:
> "프로젝트 정보가 아직 없어요. 디자인 시스템은 프로젝트 컨텍스트 없이도 진행할 수 있지만, `/vibe-coding:discovery`를 먼저 실행하시면 더 맥락에 맞는 디자인을 결정할 수 있어요."

---

## Module-by-Module Process

### KEY RULES:

1. **One module at a time** — 한 모듈씩 순서대로 진행
2. **Context-aware questions** — UX 사양과 MVP 범위를 참조하여 질문
3. **Suggest, don't just ask** — 사용자 답변 기반으로 구체적 제안
4. **Confirm before proceeding** — 각 모듈 확인 후 다음으로
5. **Track progress** — 확정된 내용 추적

---

## MODULE 1: Overall Theme & Mood

- **Core feeling:** `[e.g., "Minimalist & Sophisticated", "Playful & Organic", "Luxurious & Premium"]`
- **Visual Inspiration:** `[e.g., "linear.app dark gradients", "stripe.com whitespace"]`
- **Reference Images:** 레퍼런스 이미지가 있으면 핵심 시각적 특성 설명

> "서비스의 전체적인 분위기를 정해볼게요. [서비스명]은 어떤 느낌이었으면 좋겠어요?
>
> 예시: 깔끔하고 전문적 / 재미있고 캐주얼 / 고급스럽고 모던 / 따뜻하고 친근한
>
> 참고하고 싶은 웹사이트나 앱이 있으면 알려주세요!"

---

## MODULE 2: Layout & Spacing

- **Layout Approach:** `[e.g., "Standard centered", "Sidebar navigation", "Asymmetrical grid"]`
- **Section Separation:** `[e.g., "Clear dividers", "Seamless transitions"]`
- **Content Width:** `[e.g., "max-w-screen-xl", "Full-bleed"]`
- **Spacing Scale:** `[e.g., "Generous whitespace", "Tight and compact"]`

---

## MODULE 3: Color Palette (Enhanced Harmony System)

### Color Philosophy: Harmonious Unity

**Core Principles:**
- 1-2개의 기본 색상만 선택
- Alpha variation으로 파생 색상 생성
- 최대 5-6개 색상으로 통일감 유지

### Color Harmony Strategies

**A) Monochromatic Harmony (가장 안전)**
```
Base Color: #3B82F6
├── Ultra Light: alpha 0.05 (background tint)
├── Light: alpha 0.15 (subtle highlights)
├── Medium: alpha 0.7 (secondary elements)
└── Full: alpha 1.0 (primary CTAs)
```

**B) Complementary Harmony (강한 대비)**
```
Primary: #3B82F6 (Blue)
Secondary: #F59E0B (Complementary Orange)
+ Alpha variations for each
```

**C) Analogous Harmony (자연스러운 조화)**
```
Primary: #3B82F6 (Blue)
Secondary: #8B5CF6 (Adjacent Purple)
+ Alpha variations for each
```

### User Selection Prompt

> "색상 조화 방식을 선택해주세요:
>
> A) **Unity Focus** — 하나의 메인 색상 + alpha variations (깔끔, 전문적)
> B) **Balanced Contrast** — 두 조화 색상 + alpha variations (다이나믹하지만 안정적)
> C) **Strong Impact** — 대비가 강한 보색 (임팩트 있지만 리스크 있음)
>
> 어떤 느낌을 선호하시나요?"

### Color Tool Integration

> "[Khroma.co](https://www.khroma.co/)에서 AI 기반 색상 팔레트를 생성할 수 있어요. 원하시면 거기서 색상을 골라오셔도 됩니다!"

---

## MODULE 4: Typography

- **Headline Font:** `[e.g., "Pretendard", "Noto Sans KR", "Geist Sans"]`
- **Body Font:** `[e.g., "Pretendard", "Inter"]`
- **Headline Style:** `[weight, size, letter-spacing]`
- **Body Style:** `[weight, size, line-height]`

> Korean font 사용 시 CDN 링크 자동 포함:
> - Pretendard: `https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/static/pretendard.css`
> - Noto Sans KR: `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap`

---

## MODULE 5: Imagery & Icons

- **Image Style:** `[e.g., "Abstract 3D renders", "Clean screenshots", "Geometric patterns"]`
- **Icon Style (lucide-react):** `[stroke width, size, consistency]`

---

## MODULE 6: Interactivity & Animation

- **Hover Effects:** `[e.g., "Subtle scale/brightness changes"]`
- **Scroll Animations:** `[e.g., "Gentle fade-in/slide-up"]`
- **Button Interactions:** `[e.g., "Clear visual feedback"]`
- **Loading States:** `[e.g., "Skeleton loaders"]`
- **State Transitions:** `[e.g., "Smooth fade between tabs"]`

---

## MODULE 7: File Structure & Component Strategy

- **Directory Structure:**
  - `components/layout/` — Shared layouts (Header, Footer, Sidebar)
  - `components/views/` — Page-specific components
  - `components/ui/` — Base UI components (shadcn etc.)
  - `components/common/` — Reusable visual elements
- **Component Granularity:** Break large pages into smaller presentational components
- **Client Components:** `'use client'` only where essential for interactivity

---

## MODULE 8: Component Styling & Design Constraints

### Design System Constraints

**Color Usage (Enforced):**
- Maximum 5-6 colors total
- Alpha variation으로 새로운 variation 생성
- 새로운 hue 추가 금지

**Button Border Radius (Recommended):**
- `rounded-none` (0px) — Sharp
- `rounded-sm` (2px) — Subtle
- `rounded-md` (6px) — Standard
- `rounded-lg` (8px) — Soft
- `rounded-xl` (12px) — Round (일반적으로 권장)
- `rounded-2xl` (16px) — Very Round (여기까지)
- ⚠️ `rounded-3xl` (24px) — 비추천 (너무 둥글 수 있음)
- ❌ `rounded-full` — avatar/badge 전용

**Chart Style Consistency (Required):**
- Line Charts **OR** Area Charts 중 하나만 선택
- 전체 앱에서 일관되게 적용

### Component-Specific Styling
- **Buttons:** `[corners, shadow, radius]`
- **Cards:** `[border, background, shadow]`
- **Inputs:** `[style, border]`
- **Tables:** `[rows, hover, borders]`
- **Modals:** `[width, overlay]`

---

## DESIGN PREVIEW CHECKPOINT

**Module 8 완료 후**, 디자인 프리뷰를 생성합니다.

→ Reference: `skills/design-system/references/design-preview.tsx`

프리뷰에서 보여줄 것:
- **Color Palette Swatches:** 선택한 색상 + alpha variations
- **Typography Samples:** 한글/영문 헤드라인, 본문 예시
- **Component Previews:** 버튼, 카드, 폼 요소 미리보기
- **Layout Structure:** 레이아웃 와이어프레임
- **Color Harmony Validation:** 색상 조화 시각적 확인

> "디자인 시스템 미리보기를 확인해주세요. 색상, 타이포그래피, 컴포넌트 스타일이 마음에 드시나요?
>
> 수정하고 싶은 부분이 있으면 말씀해주세요. 만족스러우시면 다음 단계로 진행합니다."

---

## Saving to Project Memory

After user approves the design preview:

1. Write all 8 module decisions to `project-memory/design-tokens.md`
2. Confirm:

> ✅ 디자인 시스템 저장: `project-memory/design-tokens.md`
> ✅ 디자인 프리뷰: 승인됨
> 이후 코딩 프롬프트 생성 시 이 디자인 시스템을 적용합니다.

---

## Skill Chaining

After completing the design system:

> 디자인 시스템이 완성되었습니다! 다음 단계:
>
> 1. **Prompt Generator** — 코딩 에이전트에 전달할 프롬프트를 생성하세요
> 2. **Service Spec** — 서비스 명세 문서를 만들 수도 있어요
>
> `/vibe-coding:orchestrator`로 전체 진행 상태를 확인할 수 있습니다.
