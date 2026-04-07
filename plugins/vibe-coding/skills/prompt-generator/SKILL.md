---
name: prompt-generator
description: "Generate coding agent prompts for each page/view. Use when user mentions: coding prompt, 코딩 프롬프트, generate prompt, 프롬프트 생성, code generation, 코드 생성, page prompt, build pages, 페이지 만들기, implementation prompt, Cursor prompt, Claude Code prompt, coding agent"
user-invocable: true
---

# Prompt Generator

> **Trigger keywords**: coding prompt, 코딩 프롬프트, generate prompt, 프롬프트 생성, code generation, 코드 생성, page prompt, build pages, 페이지 만들기, implementation prompt, Cursor prompt, Claude Code prompt

Generate comprehensive, coding agent-agnostic prompts for building your MVP pages. These prompts work with Cursor, Claude Code, Windsurf, or any AI coding assistant.

---

## Project Memory Protocol

Before executing, load ALL from `project-memory/`:

- `project-context.md` → Service name, concept (REQUIRED)
- `ux-spec.md` → UX specifications (REQUIRED)
- `mvp-scope.md` → MVP feature/page scope (REQUIRED)
- `design-tokens.md` → Design system decisions (REQUIRED)
- `learnings.md` → Past iteration insights (if available)

**If any required file is missing:**
> "코딩 프롬프트를 생성하려면 다음이 필요합니다:
> - ❌ [missing file] — `/vibe-coding:[skill-name]`으로 생성하세요
>
> 또는 필요한 정보를 지금 직접 알려주시면 진행할 수 있어요."

Also reference: `skills/design-system/references/coding-prompt-template.md`

---

## Step 1: Page Inventory

MVP 범위에서 정의된 페이지 목록을 확인합니다.

```
## 생성할 페이지 목록
1. [페이지명] (`/경로`) — [핵심 목적]
2. [페이지명] (`/경로`) — [핵심 목적]
3. ...
```

> "다음 페이지들의 프롬프트를 생성할 예정이에요. 순서나 내용을 조정하고 싶으시면 말씀해주세요."

---

## Step 2: Page-by-Page Prompt Generation

각 페이지에 대해 상세 프롬프트를 생성합니다.

### Per-Page Prompt Structure

```markdown
# [페이지명] Implementation Prompt

## Context
- Service: [서비스명]
- Page: [페이지명] (`/경로`)
- Purpose: [이 페이지의 목적]
- User Flow: [사용자가 이 페이지에서 하는 것]

## Design System
[design-tokens.md에서 가져온 디자인 시스템 요약]
- Theme: [테마]
- Primary Color: [색상 + alpha variations]
- Typography: [폰트]
- Button Radius: [radius]
- Card Style: [스타일]

## Layout
- Layout Component: [사용할 레이아웃]
- Content Width: [너비]
- Spacing: [여백]

## Components Required
1. **[컴포넌트명]**
   - Purpose: [목적]
   - Content: [내용]
   - Styling: [스타일 노트]
   - Interactions: [인터랙션]

2. **[컴포넌트명]**
   ...

## Technical Requirements
- Framework: [Next.js App Router / etc.]
- Component Library: [shadcn/ui / etc.]
- Styling: [Tailwind CSS]
- Icons: [lucide-react]
- File path: `app/[route]/page.tsx`
- Related components: `components/views/[PageName]/`

## Responsive Behavior
- Desktop: [데스크톱 레이아웃]
- Mobile: [모바일 적응]

## Placeholder Data
[이 페이지에서 사용할 목업 데이터]

## Notes
- [페이지 특수 요구사항]
- [디자인 시스템 예외사항]
```

---

## Step 3: Shared Components Prompt

페이지별 프롬프트 외에, 공통 컴포넌트 프롬프트도 생성합니다.

```markdown
# Shared Components Implementation Prompt

## Layout Components
### AppLayout (`components/layout/AppLayout.tsx`)
- [레이아웃 구조 설명]
- [Header, Sidebar, Footer 포함 여부]

### [기타 공유 레이아웃]
...

## Common Components
### [컴포넌트명] (`components/common/[name].tsx`)
- Purpose: [목적]
- Props: [주요 프로퍼티]
- Styling: [디자인 시스템 적용 방법]
```

---

## Step 4: Master Prompt Assembly

모든 개별 프롬프트를 하나의 마스터 프롬프트로 조합하는 옵션도 제공합니다.

> "프롬프트 생성 완료! 어떻게 사용하시겠어요?
>
> A) **페이지별 개별 프롬프트** — 한 페이지씩 코딩 에이전트에 전달 (권장)
> B) **마스터 프롬프트 하나로** — 전체를 한 번에 전달 (작은 프로젝트용)
> C) **공통 컴포넌트 먼저 + 페이지별** — 공통 요소 먼저 만들고 페이지 추가"

---

## Step 5: Output

### Individual Page Prompts
각 프롬프트를 `prompts/` 디렉토리에 저장합니다.

```
prompts/
├── 00-shared-components.md
├── 01-landing.md
├── 02-dashboard.md
├── 03-settings.md
└── ...
```

### Prompt Usage Guide
프롬프트와 함께 사용 가이드를 제공합니다.

```markdown
# Prompt Usage Guide

## 권장 순서
1. `00-shared-components.md` — 공통 레이아웃과 컴포넌트 먼저
2. `01-landing.md` — 랜딩 페이지
3. ... (나머지 페이지 순서대로)

## 코딩 에이전트별 팁
- **Cursor**: 프롬프트를 Composer에 붙여넣기
- **Claude Code**: 프롬프트를 메시지로 전달
- **Windsurf**: 프롬프트를 Cascade에 입력
- **기타**: 프롬프트를 AI 채팅에 붙여넣기

## 주의사항
- 레퍼런스 이미지가 있으면 함께 첨부하세요
- 각 페이지 프롬프트에는 디자인 시스템이 포함되어 있어 독립 실행 가능
- 생성된 코드 검토 후 필요하면 learnings.md에 인사이트 기록
```

---

## Saving

1. Write each prompt to `prompts/[nn]-[page-name].md`
2. Write usage guide to `prompts/README.md`
3. Confirm:

> ✅ 코딩 프롬프트 생성 완료: `prompts/` 디렉토리
> - [N]개 페이지 프롬프트 + 1개 공통 컴포넌트 프롬프트
> - 사용 가이드: `prompts/README.md`
>
> 이제 프롬프트를 코딩 에이전트에 전달하세요!

---

## Skill Chaining

After generating prompts:

> 코딩 프롬프트가 준비되었습니다! 다음 옵션:
>
> 1. **Service Spec** — 서비스 명세 문서를 생성하세요
> 2. **Prompt Craft** — AI 캐릭터 프롬프트가 필요하면 실행하세요
> 3. 코드 생성 후 피드백이 있으면 `project-memory/learnings.md`에 기록하세요
>
> `/vibe-coding:orchestrator`로 전체 진행 상태를 확인할 수 있습니다.
