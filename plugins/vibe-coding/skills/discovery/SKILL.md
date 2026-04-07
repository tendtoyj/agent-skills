---
name: discovery
description: "Project discovery, UX specification development, and service naming. Use when user mentions: new project, 새 프로젝트, build something, 뭘 만들까, 아이디어, idea, concept, UX spec, service name, 서비스 이름, 네이밍, naming, what to build, 앱 만들기, discover, 기획"
user-invocable: true
---

# Discovery

> **Trigger keywords**: new project, 새 프로젝트, build something, 뭘 만들까, 아이디어, idea, concept, UX spec, service name, 서비스 이름, 네이밍, what to build, 앱 만들기, discover, 기획

Collaboratively discover your project concept, develop UX specifications, and name your service. This is the foundation that all downstream skills build upon.

---

## Project Memory Protocol

Before executing, check for the `project-memory/` directory in the project root.

- If `project-context.md` already exists and is populated:
  - Show the user a summary of the existing context
  - Ask: "기존 프로젝트를 수정하시겠어요, 아니면 새로 시작하시겠어요?"
- If `project-context.md` is empty or template-only:
  - Proceed normally — this skill will create it
- If `project-memory/` doesn't exist:
  - Create the directory and proceed

---

## Three Steps

This skill covers Steps 0, 1, and 1.5 of the vibe coding workflow.

---

## STEP 0: Adaptive Project Discovery

**Initial Open Question:**
"무엇을 만들고 싶으세요?"

**Information Density Assessment:**
Based on user response, analyze for:
- **Concept clarity:** 도메인/카테고리가 명확한지 (e.g., "메모 앱", "쇼핑몰")
- **Feature structure:** 구체적 기능이 언급되었는지 (e.g., "3개 탭: 기록, AI 분석, 결과")
- **User context:** 타겟 사용자가 힌트되었는지 (e.g., "팀 협업용")
- **Problem definition:** 해결할 문제가 명시되었는지 (e.g., "기존 도구가 너무 복잡함")
- **Technical requirements:** 기술 힌트가 있는지 (e.g., "모바일 퍼스트", "실시간 동기화")

**Scoring & Routing:**
- **High Density (5개 요소 모두 상세):** → STEP 1로 직행
- **Medium Density (핵심 3개 요소 상세):** → 2-3개 타겟 팔로우업
- **Low Density (2개 이하 또는 추상적):** → 전체 경험 기반 발견 프로세스

### "Why" First Approach

> "[Domain]을 만들어보고 싶으시다니 흥미롭네요! 어떤 계기로 [domain]을 직접 만들어보고 싶으셨어요?"

### Enhanced Natural Conversation with Examples

> "예를 들어 '[구체적인 예시 1]', '[구체적인 예시 2]', '[구체적인 예시 3]' 같은 느낌으로요.
>
> 어떤 상황이신지 말씀해주세요!"

### Expansion Discussion System

When users say "모르겠어요" or seem uncertain at ANY stage:

**3-Stage Deep Dive Strategy:**

*Stage 1: Concrete Examples + Choice*
> "괜찮아요! 보통 [domain]을 만드실 때 이런 경우들이 많아요:
> A) [구체적 예시 1 + 상황]
> B) [구체적 예시 2 + 상황]
> C) [구체적 예시 3 + 상황]
>
> 이 중에 비슷한 게 있으신가요?"

*Stage 2: Similar Case Analysis*
> "그럼 기존에 사용해보신 [similar domain] 중에서 '이건 좋았는데 저건 아쉬웠다' 하는 게 있나요?"

*Stage 3: Prototype Approach*
> "알겠어요! 그럼 일단 [가장 일반적인 가정]으로 시작해서 진행하면서 맞춰나가는 건 어떨까요?
> 언제든 '아, 이건 아니야' 하시면 바꿀 수 있어요!"

### Example Templates by Domain

*Memo/Note App:*
- "다이어트나 운동 같은 특정 주제를 체계적으로 기록하고 싶어서"
- "지금 쓰는 메모앱이 너무 복잡하거나 아쉬워서"
- "메모에 AI 분석이나 재미있는 기능을 더해보고 싶어서"

*Shopping/E-commerce:*
- "특정 분야나 취향에 특화된 쇼핑몰을 만들고 싶어서"
- "기존 쇼핑 플랫폼의 불편한 점을 개선하고 싶어서"

*Productivity Tools:*
- "특별한 워크플로우를 지원하는 도구가 필요해서"
- "현재 쓰는 생산성 도구들의 한계를 느껴서"

### Reason-Based Follow-up Matrix

Based on user's response, ask natural follow-ups:

*If "특정 주제 기록":*
- "어떤 내용을 기록하고 싶으신 건가요?"
- "개인적인 추적용인지, 다른 사람과 공유할 목적인지?"

*If "기존 앱 불편":*
- "지금 어떤 걸 쓰고 계시고, 주로 뭐가 아쉬우세요?"
- "기능적인 문제인지, 사용감 문제인지?"

*If "특별한 기능":*
- "어떤 특별한 기능을 상상하고 계세요?"
- "AI나 자동화, 소셜 기능 같은 건지?"

### Fall-back Strategies

*Round 1: Assumption Offering*
> "괜찮아요! 일단 [domain]을 만들고 싶다고 하신 걸 보면 [가장 일반적인 이유] 같은 느낌인 것 같은데, 이 방향이 맞나요?"

*Round 2: Inspiration Examples*
> "보통 [domain]을 만들고 싶어하시는 분들은 [이유 예시들] 같은 경우가 많거든요."

*Round 3: Proceed with Assumption*
> "알겠어요! 그럼 일단 [구체적인 가정]으로 진행해보면서 필요하면 조정해나가도 될까요?"

### Progress Transparency

- After analysis: "말씀해주신 걸 보니 [명확한 컨셉/방향]을 염두에 두고 계시는 것 같네요..."
- After "why" exploration: "주된 동기가 [파악된 이유]인 것 같네요..."
- When sufficient: "[동기 + 컨셉 요약]이시군요! 이제 상세한 사양을 정리해보겠습니다."

---

## STEP 1: UX Specifications Development

**Key Areas to Cover (Detailed Specifications Only):**

### Design Direction & Aesthetics

- Any visual inspiration or style preferences?
- Preferred mood/feeling (e.g., professional, playful, minimal)?
- Any specific design constraints?

**Reference Research Guide:**
> "디자인 레퍼런스가 필요하시면 이런 검색어로 찾아보시면 도움이 될 거예요:
>
> - '[domain] modern UI design 2024'
> - 'minimalist [specific feature] interface examples'
> - '[industry] dashboard design inspiration'
>
> 찾아보신 레퍼런스가 있으시면 알려주세요!"

### Detailed Functionality Specifications

- Specific feature interactions and behaviors
- Advanced user flows and edge cases
- Technical considerations or constraints

**Note:** Skip basic elements already established in STEP 0. Avoid asking about specific colors, fonts, exact spacing — those will be covered in the design-system skill.

---

## STEP 1.5: Service Naming

**Purpose:** 확정된 UX 명세와 사용자 동기를 바탕으로 서비스의 정체성을 반영하는 이름을 결정

### Naming Process

1. **핵심 키워드 추출**
   - STEP 0에서 파악된 동기와 문제
   - STEP 1에서 정의된 핵심 기능과 차별화 포인트
   - 타겟 사용자의 특성과 사용 맥락

2. **네이밍 방향 설정**
   > "서비스 이름을 짓기 전에, 어떤 느낌의 이름을 원하시는지 여쭤볼게요:
   >
   > A) **기능 중심:** 서비스가 하는 일을 직관적으로 (예: TaskFlow, MemoSync)
   > B) **감성 중심:** 사용자 경험이나 감정을 담은 (예: Harmony, Bloom)
   > C) **브랜드 중심:** 기억하기 쉽고 독특한 조합형 (예: Notion, Figma)
   > D) **한글 이름:** 친근하고 직관적인 한국어 이름
   >
   > 어떤 방향이 좋으실까요?"

3. **이름 후보 생성**
   - 3-5개 후보 제시
   - 각 후보별 의미와 선택 이유 설명

4. **최종 이름 확정**
   - 확정된 이름을 이후 모든 파일에 자동 적용

### Naming Guidelines

- **길이:** 2-12자 권장
- **발음:** 말하기 쉽고 기억하기 쉬운 조합
- **의미:** 핵심 가치나 경험과 연관성
- **확장성:** 기능 확장 시에도 어색하지 않을 것

### Naming Template

```
서비스 이름 후보:

1. **[이름1]** - [의미/이유]
   "사용자가 [핵심경험]을 할 때 [연상되는 감정/이미지]"

2. **[이름2]** - [의미/이유]
   "[주요기능]과 [사용맥락]의 조합"

3. **[이름3]** - [의미/이유]
   "[타겟사용자]가 [기대하는 결과]를 얻는다는 의미"
```

---

## Saving to Project Memory

After completing all three steps:

1. Write project identity and motivation to `project-memory/project-context.md`
2. Write UX specifications to `project-memory/ux-spec.md`
3. Confirm save:

> ✅ 프로젝트 컨텍스트 저장: `project-memory/project-context.md`
> ✅ UX 사양 저장: `project-memory/ux-spec.md`
> 이후 모든 스킬이 이 정보를 자동으로 참조합니다.

---

## Scenarios

### SCENARIO A: No inputs provided
1. STEP 0 → Adaptive Discovery
2. STEP 1 → UX Specifications Development
3. STEP 1.5 → Service Naming
4. Save to project-memory

### SCENARIO B: Inputs already provided
1. Review provided inputs for completeness
2. STEP 1.5 → Service Naming (if name not defined)
3. Save to project-memory

### SCENARIO C: Inputs need modification
1. Gap analysis on existing inputs
2. Interactive refinement
3. STEP 1.5 → Service Naming (if needed)
4. Save to project-memory

---

## Skill Chaining

After completing discovery:

> 프로젝트 발견이 완료되었습니다! 다음 단계:
>
> 1. **MVP Scope** — MVP 범위를 정의해서 불필요한 작업을 줄이세요
> 2. **Design System** — 디자인 시스템을 결정하세요 (MVP 범위 정의 후 권장)
>
> `/vibe-coding:orchestrator`로 전체 진행 상태를 확인할 수 있습니다.
