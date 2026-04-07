---
name: storyteller-image-maker
description: "planner가 승인한 카드 구성을 받아 이미지 톤 협의 → 카드별 프롬프트 작성 → nanobanana로 이미지 생성까지 수행하는 스킬. 사용 시점: (1) planner 승인 후 이미지 생성 단계, (2) storyteller 이미지 생성, image-maker 등의 요청이 있을 때, (3) 카드뉴스 이미지를 만들어달라고 할 때."
---

# Storyteller Image-Maker

승인된 카드 구성을 받아 이미지 모드 협의 → 프롬프트 작성 → nanobanana 생성을 수행한다.

## 워크플로우

### Step 1. 이미지 톤 협의

이미지 생성 전에 유저와 톤을 먼저 확정한다.

1. planner 기획서에서 추천된 이미지 모드(A~E) 확인
2. 유저에게 해당 모드 설명 + 적합한 이유 제시
3. 유저 승인 후 다음 단계 진행

모드 요약:
- **A** 시네마틱 빈티지 — 포토리얼, 사람 중심, 극적 자연광, 웜톤
- **B** 컨셉추얼 메타포 — 오브젝트 시각화, 클린 스튜디오, 디오라마
- **C** 에디토리얼 미니멀 — 싱글 오브젝트, 밝고 에어리한, 여백 활용
- **D** 초현실 아트 — 스케일 변환, 드림라이크, 풍부한 디테일
- **E** 다크 시네마틱 — 하이 콘트라스트, 누아르, 쿨톤

상세 스펙 및 프롬프트 프리픽스는 [references/image-style-guide.md](references/image-style-guide.md) 참조.

### Step 2. 프롬프트 작성 + 즉시 생성

톤 확정 후, **모든 카드**(표지 + 내용)에 대해:

1. planner의 `image-concept`을 기반으로 상세 영문 프롬프트 작성
2. 모드별 공통 스타일 프리픽스 적용 (세트 전체 톤 통일)
3. 카드 타입별 구도 지시 추가
4. `nanobanana__generate_image`로 즉시 생성

프롬프트 구조:
```
[모드별 스타일 프리픽스]
[카드별 장면/컨셉 — image-concept 기반 상세 묘사]
[카드 타입별 구도 지시]
[no-text 지시]
[single-image 지시]
```

> **필수 규칙 1: 모든 프롬프트 끝에 아래 문구를 반드시 추가한다.**
> ```
> IMPORTANT: Do NOT include any text, letters, words, numbers, typography, captions, labels, watermarks, or written characters of any kind in the image. The image must be purely visual with zero textual elements.
> ```

> **필수 규칙 2: 모든 프롬프트 끝에 아래 문구를 반드시 추가한다.**
> ```
> Single unified image. One camera angle, one continuous scene. Do NOT create grids, collages, multi-panel layouts, split compositions, or montages.
> ```

#### 프롬프트 작성 원칙: 단일 시점 원칙

Gemini 이미지 모델은 프롬프트에 여러 시점·디테일 포인트가 나열되면 이를 개별 패널로 분리해 2x2 그리드로 합성하는 경향이 있다. 이를 방지하기 위해 **반드시** 아래 원칙을 지킨다.

**하나의 프롬프트 = 하나의 카메라 앵글 = 하나의 장면**

- **금지:** 한 프롬프트에 여러 시선·동작·순간을 나열
  - 나쁜 예: "체스판 전경 + 빨간 여왕 클로즈업 + 앨리스 달리는 모습 + 정지된 풍경"
  - 나쁜 예: "얼음 전체 형태 + 녹아내리는 중앙부 + 물방울 떨어지는 순간 + 웅덩이"
- **허용:** 하나의 고정 시점에서 볼 수 있는 단일 장면만 묘사
  - 좋은 예: "A red chess queen towering over a miniature chessboard, tiny figures visible between the pieces"
  - 좋은 예: "A block of ice on a wooden surface, partially melted with a small pool of water forming at its base"

**체크리스트 — 프롬프트 작성 후 자가 검증:**
1. 묘사된 장면을 한 장의 사진으로 찍을 수 있는가? → No면 단순화
2. 카메라 앵글이 하나인가? (클로즈업 + 전경 혼재 금지) → 하나만 선택
3. 시간 순서가 섞여 있지 않은가? (녹기 전 + 녹는 중 + 녹은 후 금지) → 하나의 순간만 선택
4. 나열된 오브젝트가 하나의 프레임에 자연스럽게 공존하는가? → No면 핵심 오브젝트 1~2개로 축소

#### 템플릿 매핑

planner 출력의 `Template`과 카드 위치(표지/내용)로 구도를 결정한다:

| planner 출력 | 표지 (Card 1) | 내용 (Card 2+) |
|-------------|---------------|----------------|
| Template: A | tpl-a-cover | tpl-a-content |
| Template: B | tpl-b-cover | tpl-b-content |

#### 카드 타입별 구도 지시

| 카드 타입 | 구도 지시 |
|-----------|-----------|
| tpl-a-cover | 풀 프레임. 약간 높은 앵글로 피사체가 자연스럽게 상단에 위치. 바닥/표면/배경이 하단까지 자연스럽게 이어짐. 시선을 끄는 메인 비주얼. |
| tpl-a-content | 풀 프레임. 약간 높은 앵글로 피사체를 중심보다 위에 배치. 배경이 자연스럽게 하단까지 연속됨. 텍스트가 올라가므로 조화로운 비주얼. |
| tpl-b-cover | 풀 프레임. 약간 높은/부감 앵글로 피사체가 상단에 자연스럽게 위치. 장면의 바닥/표면이 하단까지 자연스럽게 이어져 하단이 차분하되 인위적으로 비지 않음. |
| tpl-b-content | 상단 ~70%만 표시됨. 약간 높은 앵글로 피사체가 상단에 위치. 장면의 표면/환경이 피사체 아래로 자연스럽게 이어짐. 하단 잘려도 구도 유지. |

#### 이미지 생성 대상

**모든 카드에 이미지가 필요하다** — 표지, 내용 구분 없이 전부 생성.

#### nanobanana 호출 설정

| 파라미터 | 값 |
|----------|-----|
| aspect_ratio | `4:5` |
| model_tier | `pro` |
| resolution | `high` |
| n | `1` |

`system_instruction`에 모드별 공통 톤 지시를 전달하여 세트 내 일관성 확보.

### Step 3. 결과 확인

- 생성된 이미지를 유저에게 제시
- 필요시 프롬프트 조정 후 재생성

#### 에러 처리

- 생성 실패 시: 프롬프트 단순화 후 재시도 (최대 2회)
- 반복 실패 시: 유저에게 알리고 프롬프트 수정 요청
- 안전 필터 차단 시: 민감 요소 제거 후 재시도

## Output

- 생성된 이미지 파일들 (PNG)
- 이미지 매핑 목록 (카드 번호 ↔ 이미지 파일 경로)
- renderer로 전달할 최종 데이터

## 참조 파일

- [references/image-style-guide.md](references/image-style-guide.md) — 모드별 스타일 프리픽스, 프롬프트 작성 예시, nanobanana system_instruction 템플릿
