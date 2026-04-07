---
name: card-news-copy-writer
description: "Write copy for Instagram card-news (1080x1350). Receives a topic and immediately writes all placeholder copy with strict character limits. Outputs structured markdown for downstream skills. Use when user mentions: 카드뉴스 카피, card news copy, 카드뉴스 글, 카드뉴스 문구, write card news, 카드뉴스 텍스트, 카피 작성, card copy, 카드뉴스 초안"
user-invocable: true
---

# Card-News Copy Writer

> 컨텍스트를 로드하고, 사용자에게 주제를 확인한 뒤 카드뉴스 카피를 작성한다.

---

## 핵심 규칙

1. 컨텍스트 파일을 로드한다 (아래 "컨텍스트 로드" 참고). 없는 파일은 사용자에게 알린 후 기본값으로 진행한다.
2. 주제가 불명확하면 사용자에게 확인한다 (주제, 톤, 타겟 등)
3. 확인 후 카피를 작성한다
4. 기본 구조: 4장 (cover → content-image → content-features → outro)
5. 사용자가 장수나 구조를 명시하면 그대로 따른다
6. 글자수 제한을 지킨다 (아래 테이블 참고)
7. 출력은 구조화된 마크다운 한 덩어리로

---

## 컨텍스트 로드

카피 작성 전에 아래 파일들을 읽고, 
**파일이 없으면 사용자에게 보고한 후, 카피 작성으로 넘어간다.** 

| 파일 | 용도 | 없으면 |
|------|------|--------|
| `card-news-memory/series-config.md` | 브랜드명, 핸들, 태그, 컬러 | 기본값 사용 (Brand, @account) |
| `card-news-memory/copy-bank.md` | 과거 승인 카피 (톤 참고) | 참고 없이 작성 |
| `brand-memory/voice-profile.md` | 브랜드 보이스, 톤 | 중립적 전문 한국어 톤 |

**규칙:**
- 읽기 성공하면 카피에 반영한다 (브랜드명, 핸들, 톤 등)
- 읽기 실패하면 **경고 노출 후 기본값으로 진행**

---

## 글자수 제한

모든 글자수는 **hard maximum**. 1자라도 넘으면 렌더링 깨짐.
카운팅: 한글 1자 = 영문 1자 = 공백 1자 = 특수문자 1자 = 1.

| Field | Max | Card Type |
|-------|-----|-----------|
| accent-text | 6 | Cover |
| highlight-keyword | 6 | Cover, Content-Image, Content-Features |
| cover-title | 6 | Cover |
| cover-subtitle | 20 | Cover |
| tag-N | 8 each | Cover |
| category | 8 | Content-Image, Content-Features |
| title-line-1 (keyword 포함) | 12 | Content-Image, Content-Features |
| title-line-2 | 12 | Content-Image, Content-Features |
| body-line-N | 20 each | Content-Image, Content-Features |
| feature-N-title | 12 | Content-Features |
| feature-N-description | 25 | Content-Features |
| outro-line-N | 12 | Outro |
| account-handle | 15 | Outro |

**주의:** `title-line-1`에 `highlight-keyword`가 인라인 포함됨 — keyword + 나머지 합산 12자 이내.

---

## 카드 타입별 작성 가이드

### Cover (첫 장)
- **accent-text**: 손글씨 느낌의 짧은 감탄사/훅 (예: "핵심만 쏙", "알아볼까?")
- **highlight-keyword** + **cover-title**: 합쳐서 하나의 헤드라인을 이룸
- **cover-subtitle**: 헤드라인 보충 한 줄
- **tags**: 주제 카테고리 2~4개 (예: #경제, #투자, #재테크)

### Content-Image (중간 — 이미지 카드)
- **category**: 카테고리 필 (예: #경제)
- **highlight-keyword** → **title-line-1** 안에 인라인 포함
- **title-line-2**: 두 번째 제목줄
- **body-line-1~3**: 본문 2~3줄 (제목 반복 금지, 정보 추가)
- **image-alt**: 이상적인 이미지 설명 (image-generator가 사용)

### Content-Features (중간 — 3포인트 카드)
- category, highlight-keyword, title-line-1, title-line-2: 위와 동일
- **feature-1~3-title**: 각 포인트 제목
- **feature-1~3-description**: 각 포인트 설명
- **feature-1~3-icon-hint**: 아이콘 힌트 단어 (예: "heart", "clock", "shield")
- **body-line-1~3**: 요약 본문

### Outro (마지막 장)
- **outro-line-1~3**: 마무리 메시지 2~3줄 (따뜻한 CTA 포함)
- **account-handle**: 계정 핸들 (사용자가 안 알려주면 `@account`로 표기)

---

## 출력 포맷

주제를 받으면 아래 포맷으로 **바로 출력**한다:

```markdown
# Card-News Copy: [주제]

> Date: YYYY-MM-DD
> Cards: N
> Structure: cover → [types] → outro

---

## Card 1 — Cover

- **accent-text**: [text] ([N]자)
- **highlight-keyword**: [text] ([N]자)
- **cover-title**: [text] ([N]자)
- **cover-subtitle**: [text] ([N]자)
- **tags**: [tag-1], [tag-2], [tag-3]

## Card 2 — Content-Image

- **category**: [text] ([N]자)
- **highlight-keyword**: [text] ([N]자)
- **title-line-1**: [text] ([N]자, keyword 포함)
- **title-line-2**: [text] ([N]자)
- **image-alt**: [이미지 설명]
- **body-line-1**: [text] ([N]자)
- **body-line-2**: [text] ([N]자)
- **body-line-3**: [text] ([N]자)

## Card 3 — Content-Features

- **category**: [text] ([N]자)
- **highlight-keyword**: [text] ([N]자)
- **title-line-1**: [text] ([N]자, keyword 포함)
- **title-line-2**: [text] ([N]자)
- **feature-1-title**: [text] ([N]자)
- **feature-1-description**: [text] ([N]자)
- **feature-1-icon-hint**: [word]
- **feature-2-title**: [text] ([N]자)
- **feature-2-description**: [text] ([N]자)
- **feature-2-icon-hint**: [word]
- **feature-3-title**: [text] ([N]자)
- **feature-3-description**: [text] ([N]자)
- **feature-3-icon-hint**: [word]
- **body-line-1**: [text] ([N]자)
- **body-line-2**: [text] ([N]자)
- **body-line-3**: [text] ([N]자)

## Card N — Outro

- **outro-line-1**: [text] ([N]자)
- **outro-line-2**: [text] ([N]자)
- **outro-line-3**: [text] ([N]자)
- **account-handle**: [handle]
```

---

## 하지 않는 것

- 카피 평가 (→ copy-evaluator)
- 아이콘 선택 (→ contents-manager)
- 이미지 생성 (→ image-generator)
- HTML 렌더링 (→ card-news-maker)

컨텍스트 로드 후 카피 작성에만 집중한다.
