---
name: prompt-craft
description: "Create AI character profiles and system/user prompts for your service. Use when user mentions: AI prompt, 프롬프트 작성, system prompt, character, 캐릭터, AI personality, 시스템 프롬프트, user prompt, prompt engineering, AI 성격, 말투"
user-invocable: true
---

# Prompt Craft

> **Trigger keywords**: AI prompt, 프롬프트 작성, system prompt, character, 캐릭터, AI personality, 시스템 프롬프트, user prompt, prompt engineering, AI 성격, 말투

Create custom AI characters with unique personalities, analysis methods, and output formats. Generate production-ready System Prompts and User Prompts for your service's AI features.

This skill can run **independently** at any point — it doesn't require other vibe-coding skills to have been completed first.

---

## Project Memory Protocol

Before executing, check for `project-memory/`:

- If `project-context.md` exists: Load service name, concept, target users for context
- If not: Proceed without — gather service info in Stage 1

After completion, save character info to `project-context.md` (AI Character section).

---

## Stage 1: Service Snapshot (3 min)

### Quick Service Assessment

**"30초 엘리베이터 피치 해주세요!"**

필수 정보 3가지:
- 서비스 이름 + 한 줄 설명
- 필요한 AI 기능 (뭘 분석/추천/생성할건지)
- API 입력 데이터 (어떤 정보를 받아올건지)

**질문 스크립트:**
- "사용자가 버튼 한 번 누르면 뭐가 나와야 해요?"
- "이 AI가 못하면 서비스가 망하는 핵심 기능은?"
- "경쟁사 대비 우리만의 차별점이 뭔가요?"

---

## Stage 2: Character DNA Discovery (5 min)

### Step 1: 직업/배경 선택 (1분)

> "이 AI를 사람으로 만든다면 어떤 직업?"
>
> ⚡ 3초 선택지:
> A) 미슐랭 가이드 비밀 조사원 (완벽주의 + 숨겨진 전문성)
> B) 은퇴한 게임 기획자 (패턴 발견 + 재미 추구)
> C) 전직 잡지 에디터 (트렌드 감각 + 스토리텔링)
> D) 세계여행 다녀온 사진작가 (관찰력 + 감성)
> E) 기타 (사용자 아이디어)

### Step 2: 매력적 모순 발견 (2분)

> "겉으로는 어떻게 보이지만 실제로는 어떤 사람?"
>
> 💥 모순 패턴:
> - 차가워 보이는데 → 실제로는 엄마마음
> - 무관심해 보이는데 → 실제로는 디테일 덕후
> - 완벽해 보이는데 → 실제로는 허당 매력
> - 진중해 보이는데 → 실제로는 장난기 많음
>
> 🔥 돌발 질문: "이 AI가 사용자를 놀라게 할 숨겨진 반전은?"

### Step 3: 시그니처 스타일 결정 (2분)

> "이 캐릭터만의 독특한 말버릇이나 행동은?"
>
> 🗣️ 말투 선택지:
> - 분석 시작: "자, 그럼 한번 파헤쳐볼까요?" vs "흠... 뭔가 숨겨진 게 보이는데"
> - 의외 발견: "오잉? 예상과 다른데요?" vs "어머, 이건 좀 특이한 케이스네요"
> - 마무리: "정리하자면 이런 느낌!" vs "결론은... 당신은 이런 사람!"

---

## Stage 3: Unified Creative Workshop (7 min)

### 고유 분석법 개발 (3분)

> "이 캐릭터라면 어떤 특별한 방법으로 분석할까?"
>
> 서비스 특성 기반:
> - "사용자가 올리는 [콘텐츠]에서 숨겨진 진짜 의미는?"
> - "다른 서비스는 못보는데 우리 AI만 발견할 수 있는 패턴은?"
>
> 캐릭터 특성 기반:
> - [선택한 직업] 출신이라면 어떤 관점으로 볼까?
> - [선택한 모순]이 있는 사람이라면 어떤 걸 놓치지 않을까?

### 결과물 형식 디자인 (2min)

> "사용자가 결과 받고 어떤 기분이었으면 좋겠어요?"
>
> 감정 목표 → 형식:
> - "놀라게 하고 싶다" → 반전 구조 (예상 vs 실제)
> - "공유하게 하고 싶다" → SNS 최적화 (짧고 임팩트)
> - "몰입하게 하고 싶다" → 스토리텔링 구조
> - "실용적으로 쓰게 하고 싶다" → 체크리스트/액션 아이템

### 실시간 조정 (2min)

> "지금까지 나온 아이디어 중에서..."
> - 가장 마음에 드는 부분은? → 더 강화
> - 좀 아쉬운 부분은? → 즉석 대안 제시
> - 완전 새로운 아이디어? → 기존과 믹스
>
> 🎯 80% 완성 원칙: 완벽하지 않아도 일단 진행!

---

## Stage 4: Prompt Generation & Validation (5min)

### Final Output

```
🎭 [서비스명] AI 캐릭터: [캐릭터 한 줄 소개]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 SYSTEM PROMPT:
[완성된 system prompt]

👤 USER PROMPT:
[완성된 user prompt — 변수 포함]

📱 예상 결과 샘플:
[2가지 스타일 예시]

⚡ 특별 포인트:
- 차별화 요소: [다른 서비스와 구별되는 점]
- 놀라운 기능: [사용자가 예상 못할 특징]
- 실용성: [실제 서비스 효과]

⚠️ 사용 TIP:
[토큰 제한, API별 주의사항]
```

### Validation Checklist

✅ 다른 서비스 프롬프트와 구별되나?
✅ 캐릭터 개성이 살아있나?
✅ 실제 사용하기에 실용적인가?
✅ 토큰 수가 적정한가?

---

## Question Pattern Library

### 창의성 자극 질문들
- "만약 이게 사람이라면?"
- "정반대로 한다면?"
- "10살 어린이라면 뭐라고 할까?"

### 막힐 때 돌발 질문
- "가장 예상 못한 결과가 나온다면?"
- "사용자가 깜짝 놀랄 만한 요소는?"
- "친구에게 자랑하고 싶게 만드는 포인트는?"

### 사용자 반응별 대응
- 😅 "모르겠어요" → 선택지 3개 + "일단 이거 해볼까요?"
- 🤔 "좀 더 생각해볼게요" → "완벽하지 않아도 OK! 일단 진행하면서 수정해요"
- 😰 "너무 복잡해요" → "핵심만 딱 3가지만 정해봐요"
- 🔥 "이거 재밌네요!" → "그럼 여기서 더 발전시켜볼까요?"

---

## Saving

Save the generated prompt to the project (user chooses location):
- Default: project root as `[service-name]-ai-prompt.md`
- Also update `project-memory/project-context.md` AI Character section

> ✅ AI 캐릭터 프롬프트 저장: `[파일 경로]`
> ✅ 프로젝트 컨텍스트 업데이트: AI 캐릭터 정보 추가

---

## Success Principles

1. **속도**: 각 단계 시간제한 → 완벽주의 방지
2. **선택과 집중**: 핵심 결정사항만 → 분석 마비 방지
3. **즉석 피드백**: 바로바로 조정 → 만족도 극대화
4. **80% 원칙**: 완성도보다 실행 → 빠른 결과 확인
5. **창의적 대화**: 질문으로 유도 → 능동적 참여

**🎯 목표: 20분 안에 바로 사용 가능한 고품질 프롬프트 완성!**
