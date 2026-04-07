# Discovery Scenario Guide

## Scenario Routing Decision Tree

```
User arrives
│
├── Has Input 1 (UX Spec) + Input 2 (MVP Scope)?
│   ├── YES → SCENARIO B: Review + Naming
│   └── NO
│       ├── Has partial inputs?
│       │   ├── YES → SCENARIO C: Gap Analysis + Refinement
│       │   └── NO → SCENARIO A: Full Discovery
│       └── Has existing codebase?
│           ├── YES → Analyze existing code, extract implicit specs
│           └── NO → Start from scratch
```

## Information Density Scoring Examples

### High Density (Direct to STEP 1)
> "팀 프로젝트용 문서관리 웹앱, Notion의 깔끔한 UI와 Dropbox 스타일 파일관리를 결합, 현재 여러 툴에 파일이 흩어져서 팀원들이 자료 찾기 어려워함, 모바일에서도 잘 보이고 실시간 협업 기능 필요"

Score: concept ✅ + features ✅ + user context ✅ + problem ✅ + technical ✅

### Medium Density (2-3 follow-ups)
> "개인 일기 관리를 위한 웹앱, 음성으로 기록하고 AI가 감정 분석해서 인사이트 제공"

Score: concept ✅ + features ✅ + problem ⚠️ (implied)

### Low Density (Full discovery)
> "메모 앱을 만들고 싶어요"

Score: concept ⚠️ (vague)

## Domain-Specific Question Banks

### Memo/Note App
- "다이어트나 운동 같은 특정 주제를 체계적으로 기록하고 싶어서"
- "지금 쓰는 메모앱이 너무 복잡하거나 아쉬워서"
- "메모에 AI 분석이나 재미있는 기능을 더해보고 싶어서"
- "완전히 새로운 방식의 메모 경험을 상상해보셔서"

### Shopping/E-commerce
- "특정 분야나 취향에 특화된 쇼핑몰을 만들고 싶어서"
- "기존 쇼핑 플랫폼의 불편한 점을 개선하고 싶어서"
- "쇼핑에 새로운 경험이나 기능을 결합하고 싶어서"

### Productivity Tools
- "특별한 워크플로우나 방식을 지원하는 도구가 필요해서"
- "현재 쓰는 생산성 도구들의 한계를 느껴서"
- "생산성 향상을 위한 새로운 접근 방식을 시도해보고 싶어서"

### Social/Community
- "특정 관심사를 가진 사람들의 커뮤니티가 필요해서"
- "기존 SNS에서 못하는 특별한 소통 방식을 원해서"

### Dashboard/Analytics
- "여러 데이터를 한눈에 보고 싶어서"
- "현재 수동으로 하고 있는 분석을 자동화하고 싶어서"
