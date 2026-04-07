---
name: orchestrator
description: "Vibe Coding strategy router and diagnostic tool. Diagnoses project state, identifies gaps, and routes to the right skill. Use when user mentions: what should I do next, where do I start, vibe coding, start coding, 코딩 시작, 뭐부터 해야 해, 프로젝트 진행 상태, project status, diagnose, help me build, 앱 만들기, 서비스 만들기"
user-invocable: true
---

# Vibe Coding Orchestrator

> **Trigger keywords**: what should I do next, where do I start, vibe coding, start coding, 코딩 시작, 뭐부터 해야 해, 프로젝트 상태, project status, diagnose, help me build, 앱 만들기, 서비스 만들기

Your coding project GPS. Diagnoses where you are, identifies what's missing, and routes you to the right skill — so you never face a blank page.

This skill does NOT generate code or design. It diagnoses, recommends, and routes.

---

## Project Memory Protocol — Gap Detection Mode

Unlike other skills that simply load project memory, the Orchestrator **audits** it.

### Step 1 — Scan Project Memory

Check for the `project-memory/` directory in the project root. For each file, assess whether it exists AND has real content (not just template placeholders):

```
project-memory/
├── project-context.md   → Project identity defined?
├── ux-spec.md           → UX specifications documented?
├── mvp-scope.md         → MVP scope defined?
├── design-tokens.md     → Design system decided?
└── learnings.md         → Iteration insights captured?
```

### Step 2 — Scan Project Assets

Look beyond project-memory for existing materials:

- Generated coding prompts (`prompts/` directory)
- Existing codebase (src/, app/, components/)
- Design files or screenshots
- Service specification documents
- Package.json or tech stack indicators
- AI character/prompt files

### Step 3 — Generate Status Report

Output the diagnostic in this exact format:

```
## 현재 상태

### 완료된 단계
- ✅ 프로젝트 발견 — project-context.md (서비스명: "[서비스명]")
- ✅ UX 사양 — ux-spec.md (핵심기능: "[요약]")
- ✅ 디자인 시스템 — design-tokens.md (테마: "[테마]", 색상: "[색상 하모니]")

### 미완료 단계
- ❌ MVP 범위 — 아직 정의되지 않음. 이 없이는 불필요한 기능을 만들게 됩니다.
- ❌ 코딩 프롬프트 — prompts/ 디렉토리 없음. 코딩 에이전트에 전달할 프롬프트가 필요합니다.
- ❌ 서비스 명세 — 최종 문서 없음.
```

Always include a brief note on WHY each missing piece matters.

---

## Diagnostic Questions

Use these when insufficient context exists. Ask only what you need — skip questions answerable from the scan.

### Question 1 — Project Context

If no project-memory files exist:

"어떤 서비스를 만들고 싶으신가요?
- 무엇을 만들고 싶은지?
- 누구를 위한 건지?
- 어떤 점이 특별한지?

예시: 'AI가 운동 기록을 분석해서 맞춤 루틴을 만들어주는 웹앱, 운동 초보자를 위한 서비스'"

### Question 2 — Current Goal

"지금 가장 필요한 게 뭔가요?

- **아이디어 구체화** — 아직 뭘 만들지 확실하지 않아요
- **디자인 정하기** — 어떻게 생겼으면 좋겠는지 정하고 싶어요
- **코딩 시작하기** — 빨리 코드를 만들고 싶어요
- **프롬프트 만들기** — AI 코딩 에이전트에 넣을 프롬프트가 필요해요
- **처음부터 전부** — 전체 과정을 밟고 싶어요
- **모르겠어요** — 뭐부터 해야 할지 알려주세요"

---

## The 6-Stage Build Sequence

```
01 DISCOVERY     → 프로젝트 발견. 컨셉, UX 사양, 서비스 네이밍.
02 MVP SCOPE     → 범위 정의. 뭘 만들고 뭘 미룰지.
03 DESIGN SYSTEM → 디자인 결정. 색상, 타이포, 레이아웃, 컴포넌트.
04 PROMPTS       → 코딩 에이전트 프롬프트 생성. 페이지별 상세 지시.
05 PROMPT CRAFT  → (선택) AI 캐릭터/프롬프트 엔지니어링.
06 SERVICE SPEC  → 서비스 명세 문서 출력.
```

---

## Skill Routing Logic

### Route 1: 처음부터 시작 (From Scratch)

**Trigger**: 아이디어만 있거나, 아무것도 없는 상태

```
Step 1: DISCOVERY
  → /vibe-coding:discovery    프로젝트 발견 + UX 사양 + 서비스 네이밍
  → Saves: project-context.md, ux-spec.md

Step 2: MVP SCOPE
  → /vibe-coding:mvp-scope    MVP 범위 정의
  → Saves: mvp-scope.md

  ⟐ CHECKPOINT — 컨셉 + 범위 확인 후 디자인 진행

Step 3: DESIGN SYSTEM
  → /vibe-coding:design-system  디자인 시스템 결정 (Module 1~8)
  → Saves: design-tokens.md

Step 4: PROMPT GENERATION
  → /vibe-coding:prompt-generator  코딩 에이전트 프롬프트 생성
  → Saves: prompts/*.md

Step 5 (선택): EXTRAS
  → /vibe-coding:prompt-craft    AI 캐릭터/프롬프트 생성
  → /vibe-coding:service-spec    서비스 명세 문서
```

### Route 2: 디자인부터 시작

**Trigger**: 컨셉은 있지만 디자인이 미정

**Prerequisite**: project-context.md와 mvp-scope.md가 있어야 함. 없으면 Route 1 권장.

```
Step 1: DESIGN SYSTEM
  → /vibe-coding:design-system

Step 2: PROMPT GENERATION
  → /vibe-coding:prompt-generator
```

### Route 3: 프롬프트만 필요

**Trigger**: 디자인까지 완료, 코딩 에이전트 프롬프트만 필요

**Prerequisite**: design-tokens.md가 있어야 함.

```
Step 1: PROMPT GENERATION
  → /vibe-coding:prompt-generator

Step 2 (선택): SERVICE SPEC
  → /vibe-coding:service-spec
```

### Route 4: AI 캐릭터/프롬프트만 필요

**Trigger**: 서비스의 AI 캐릭터 프롬프트를 만들고 싶음

```
Step 1: PROMPT CRAFT
  → /vibe-coding:prompt-craft (독립 실행 가능)
```

---

## Output Format

Every Orchestrator response follows this structure:

> **Language**: 사용자가 언어를 지정하면 해당 언어로 출력합니다. 기본값은 한국어입니다.

```
## 현재 상태
[Gap detection results — 완료/미완료]

## 추천 다음 단계
프로젝트 유형: [type] | 목표: [goal]

### Step 1: [스킬명]
[왜 이걸 먼저 해야 하는지]
[스킬 실행 프롬프트]

### Step 2: [스킬명]
[왜 다음에 이걸 해야 하는지]
[스킬 실행 프롬프트]

## 전체 로드맵
Discovery:     ✅ 프로젝트 발견 → ✅ UX 사양 → ✅ 서비스 네이밍
MVP Scope:     ✅ 범위 정의
Design System: → 디자인 시스템 (현재 단계)
Prompts:       ○ 코딩 프롬프트 생성
Extras:        ○ AI 프롬프트 · ○ 서비스 명세
```

### Skill Invocation Prompts

For each recommended skill, provide a ready-to-use prompt:

```
"/vibe-coding:[skill-name]을 실행해주세요.
컨텍스트: [프로젝트 요약]
목표: [기대 결과]
참조: project-memory/ 파일 확인"
```

---

## Returning Users & Skill Chaining

When the user invokes the Orchestrator again, always start with a fresh scan of project-memory/ and the project folder. Show what's changed, celebrate progress, and recommend the next step.

The Orchestrator remembers context through files, not conversation history. It's the home base you return to between skills — just say "다음에 뭐 해야 해?" to re-run the full diagnosis.
