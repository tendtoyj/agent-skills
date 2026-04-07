# Image Style Guide

모드별 스타일 프리픽스, 프롬프트 작성법, nanobanana 설정 상세.

---

## 모드별 스타일 프리픽스

프롬프트 앞에 붙여 세트 내 톤을 통일한다. 모든 프롬프트는 영문으로 작성.

### Mode A: 시네마틱 빈티지

```
Photorealistic cinematic scene. Dramatic natural lighting — golden hour glow, light streaming through blinds, warm backlight. Warm color palette: gold, amber, beige tones. Subtly desaturated with gentle vintage film grading. Fine film grain texture. High detail, editorial quality.
```

- 사람 중심, 내러티브를 직접 재현하는 장면
- 적합: 인물 스토리, 역사적 사건, 회고

### Mode B: 컨셉추얼 메타포

```
Conceptual editorial product art. Clean studio setting with beige/cream backdrop. Miniature diorama aesthetic, slightly surreal scale. Wes Anderson-inspired symmetry and color palette. Warm neutral tones. Soft even lighting. High detail, sharp focus on the central object.
```

- 콘텐츠 핵심 메타포를 오브젝트로 시각화
- 적합: 개념/구조 설명, 비유가 핵심인 콘텐츠

### Mode C: 에디토리얼 미니멀

```
Minimalist editorial photography. Single object or minimal composition against a clean, bright backdrop. Airy and light tones with restrained color palette. Modern aesthetic with generous negative space. Soft natural lighting. High detail, sharp focus.
```

- 싱글 오브젝트 또는 미니멀 구도, 여백 활용
- 적합: 제품/기술 소개, 트렌드 정리

### Mode D: 초현실 아트

```
Surreal dreamlike composition. Unexpected scale shifts, floating elements, impossible arrangements. Rich detail with an otherworldly atmosphere. Warm to neutral color palette. Soft volumetric lighting. Imaginative and visually arresting composition. High detail, editorial quality.
```

- 예상 밖의 스케일, 비현실적 조합
- 적합: 미래 전망, 파격적 주제, 상상력이 필요한 내용

### Mode E: 다크 시네마틱

```
Dark cinematic scene. High contrast, deep shadows with dramatic chiaroscuro lighting. Noir atmosphere with cool or neutral color palette. Moody and tense composition. Selective rim lighting or spotlight accents. Fine grain texture. High detail, editorial quality.
```

- 어두운 톤, 누아르 분위기, 긴장감
- 적합: 위기/갈등, 심각한 이슈, 경고성 콘텐츠

---

## 카드 타입별 구도 서픽스

스타일 프리픽스 뒤, 장면 설명 뒤에 붙여 구도를 제어한다.

### tpl-a-cover (템플릿 A 표지)

```
Full-frame composition. Use a slightly elevated camera angle so the main subject sits naturally in the upper portion of the frame. The scene should extend continuously — floor, surface, or environment receding toward the bottom — rather than cutting off abruptly. Upper area bright and detailed; lower area may darken or soften naturally. Eye-catching hero visual that works as a cover image.
```

### tpl-a-content (템플릿 A 내용)

```
Full-frame composition. Use a slightly elevated camera angle to place the main subject above center. The background and surface should continue naturally below the subject, creating a smooth visual flow from top to bottom. The image serves as a background for overlaid text. Keep the overall visual balanced and not overly complex, allowing text to remain legible.
```

### tpl-b-cover (템플릿 B 표지)

```
Full-frame composition. Use a slightly elevated or bird's-eye camera angle so the main subject naturally occupies the upper portion of the frame. The scene should continue below — a receding surface, ground plane, or environment extending toward the bottom edge — keeping the lower area visually calm but not artificially empty. The visual weight and focal point should sit in the upper half of the image.
```

### tpl-b-content (템플릿 B 내용)

```
Composition optimized for top-crop display (top ~70% visible). Use a slightly elevated camera angle so the main subject sits in the upper portion of the frame. Let the scene's surface or environment continue naturally below, providing breathing room under the subject. The bottom portion may be cropped without losing the composition.
```

---

## 프롬프트 조합 예시

### 예시 1: Mode A + tpl-b-cover

planner의 image-concept: "1970년대 실리콘밸리 차고에서 컴퓨터를 조립하는 청년"

최종 프롬프트:
```
Photorealistic cinematic scene. Dramatic natural lighting — golden hour glow, light streaming through blinds, warm backlight. Warm color palette: gold, amber, beige tones. Subtly desaturated with gentle vintage film grading. Fine film grain texture. High detail, editorial quality.

A young man in his twenties assembling a computer in a cluttered 1970s Silicon Valley garage. Wooden workbench covered with circuit boards and soldering tools. Warm sunlight filtering through a half-open garage door, casting long shadows across the scene.

Full-frame composition. Use a slightly elevated or bird's-eye camera angle so the main subject naturally occupies the upper portion of the frame. The scene should continue below — a receding surface, ground plane, or environment extending toward the bottom edge — keeping the lower area visually calm but not artificially empty. The visual weight and focal point should sit in the upper half of the image.

IMPORTANT: Do NOT include any text, letters, words, numbers, typography, captions, labels, watermarks, or written characters of any kind in the image. The image must be purely visual with zero textual elements.

Single unified image. One camera angle, one continuous scene. Do NOT create grids, collages, multi-panel layouts, split compositions, or montages.
```

### 예시 2: Mode B + tpl-b-content

planner의 image-concept: "돈세탁을 세탁기로 시각화"

최종 프롬프트:
```
Conceptual editorial product art. Clean studio setting with beige/cream backdrop. Miniature diorama aesthetic, slightly surreal scale. Wes Anderson-inspired symmetry and color palette. Warm neutral tones. Soft even lighting. High detail, sharp focus on the central object.

A vintage pastel-colored washing machine with its door open, dollar bills and gold coins tumbling out onto a pristine surface. Soap bubbles floating around the bills. The scene is arranged like a carefully styled product photograph.

Composition optimized for top-crop display (top ~70% visible). Use a slightly elevated camera angle so the main subject sits in the upper portion of the frame. Let the scene's surface or environment continue naturally below, providing breathing room under the subject. The bottom portion may be cropped without losing the composition.

IMPORTANT: Do NOT include any text, letters, words, numbers, typography, captions, labels, watermarks, or written characters of any kind in the image. The image must be purely visual with zero textual elements.

Single unified image. One camera angle, one continuous scene. Do NOT create grids, collages, multi-panel layouts, split compositions, or montages.
```

### 예시 3: Mode E + tpl-a-cover

planner의 image-concept: "금융 위기의 긴장감"

최종 프롬프트:
```
Dark cinematic scene. High contrast, deep shadows with dramatic chiaroscuro lighting. Noir atmosphere with cool or neutral color palette. Moody and tense composition. Selective rim lighting or spotlight accents. Fine grain texture. High detail, editorial quality.

A dimly lit trading floor at night. Rows of monitors casting blue-white glow on empty leather chairs. A single red ticker arrow pointing downward dominates the central screen. Papers scattered on the floor suggest hasty departure.

Full-frame composition. Use a slightly elevated camera angle so the main subject sits naturally in the upper portion of the frame. The scene should extend continuously — floor, surface, or environment receding toward the bottom — rather than cutting off abruptly. Upper area bright and detailed; lower area may darken or soften naturally. Eye-catching hero visual that works as a cover image.

IMPORTANT: Do NOT include any text, letters, words, numbers, typography, captions, labels, watermarks, or written characters of any kind in the image. The image must be purely visual with zero textual elements.

Single unified image. One camera angle, one continuous scene. Do NOT create grids, collages, multi-panel layouts, split compositions, or montages.
```

---

## nanobanana system_instruction 템플릿

모드별 `system_instruction`으로 전달하여 세트 전체 일관성을 확보한다.

> **공통 규칙:** "series"라는 표현을 사용하지 않는다. Gemini 모델이 "series"를 여러 이미지 합성으로 해석하는 경향이 있으므로 "consistent style"로 대체한다. 모든 system_instruction에 anti-grid 지시를 포함한다.

### Mode A
```
You are generating a single editorial image. Maintain consistent cinematic vintage aesthetic: photorealistic, warm gold/amber/beige tones, dramatic natural lighting, subtle film grain, gentle vintage color grading. Every image should match the same editorial photo style. Output exactly one unified image — no grids, collages, multi-panel layouts, or split compositions. CRITICAL: Never include any text, letters, words, numbers, typography, captions, labels, or watermarks in the generated images. All images must be purely visual with zero textual elements.
```

### Mode B
```
You are generating a single editorial image. Maintain consistent conceptual editorial style: clean beige/cream studio backdrop, miniature diorama aesthetic, Wes Anderson-inspired symmetry, warm neutral tones, soft even lighting. Every image should match the same curated product art style. Output exactly one unified image — no grids, collages, multi-panel layouts, or split compositions. CRITICAL: Never include any text, letters, words, numbers, typography, captions, labels, or watermarks in the generated images. All images must be purely visual with zero textual elements.
```

### Mode C
```
You are generating a single editorial image. Maintain consistent editorial minimalist aesthetic: clean bright backdrop, single object or minimal composition, restrained color palette, generous negative space, modern airy feel. Every image should match the same minimalist editorial style. Output exactly one unified image — no grids, collages, multi-panel layouts, or split compositions. CRITICAL: Never include any text, letters, words, numbers, typography, captions, labels, or watermarks in the generated images. All images must be purely visual with zero textual elements.
```

### Mode D
```
You are generating a single editorial image. Maintain consistent surreal dreamlike aesthetic: unexpected scale shifts, floating elements, warm-to-neutral tones, soft volumetric lighting, rich imaginative detail. Every image should match the same otherworldly editorial style. Output exactly one unified image — no grids, collages, multi-panel layouts, or split compositions. CRITICAL: Never include any text, letters, words, numbers, typography, captions, labels, or watermarks in the generated images. All images must be purely visual with zero textual elements.
```

### Mode E
```
You are generating a single editorial image. Maintain consistent dark cinematic aesthetic: high contrast, deep shadows, cool/neutral palette, noir atmosphere, dramatic chiaroscuro lighting. Every image should match the same moody editorial style. Output exactly one unified image — no grids, collages, multi-panel layouts, or split compositions. CRITICAL: Never include any text, letters, words, numbers, typography, captions, labels, or watermarks in the generated images. All images must be purely visual with zero textual elements.
```
