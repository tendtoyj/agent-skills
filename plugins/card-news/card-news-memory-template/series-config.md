# Series Config

> Brand defaults for card-news production. Initialized by `orchestrator` on first run.
> Edit this file to customize recurring brand elements across all card-news sets.

## Brand Header

| Field | Value | Notes |
|-------|-------|-------|
| Brand Name | `TODAY'S PICKS` | Displayed in cover & outro header |
| Header Style | Uppercase, letter-spacing 2.4px | Match `.hdr__brand` CSS |

## Account

| Field | Value |
|-------|-------|
| Handle | `@your_account` |
| Display in Outro | Yes |

## Default Tags

Tags used when no topic-specific tags are provided:

```
#태그1, #태그2, #태그3
```

## Color Overrides

Override CSS variables for brand customization. Leave empty to use template defaults.

| Variable | Default | Override |
|----------|---------|----------|
| `--highlight` | `#fff3a0` | |
| `--feature-bg` | `#FFFBDD` | |
| `--fg` | `#000000` | |
| `--bg` | `#FFFFFF` | |

## Fonts

| Role | Default | Override |
|------|---------|----------|
| Sans | `Noto Sans KR` | |
| Handwriting | `Nanum Pen Script` | |

## Defaults

| Setting | Value |
|---------|-------|
| Default card count | 4 |
| Default language | 한국어 |
| Image style | Clean editorial, no text in images |
