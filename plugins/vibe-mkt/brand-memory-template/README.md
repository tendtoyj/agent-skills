# Brand Memory — Template

## What This Is
Brand Memory is the shared context layer for all Vibe Marketing skills. Every skill checks for a `brand-memory/` directory in **your project root** and adapts its output to match your brand.

This folder contains **empty templates**. You don't need to copy these manually — skills will scaffold them automatically when you run them.

## How It Works

```
your-project/              ← your working directory
├── brand-memory/          ← created automatically by skills
│   ├── voice-profile.md   ← written by /vibe-mkt:brand-voice
│   ├── positioning.md     ← written by /vibe-mkt:positioning-angles
│   ├── audience.md        ← written manually or via orchestrator
│   ├── campaigns.md       ← updated after each campaign/launch
│   └── learnings.md       ← updated after results analysis
└── ...
```

## Quickstart

1. Open your project in Claude Code
2. Run `/vibe-mkt:orchestrator` — it scans for gaps and tells you what to do first
3. Run `/vibe-mkt:brand-voice` — creates `brand-memory/voice-profile.md`
4. Run `/vibe-mkt:positioning-angles` — creates `brand-memory/positioning.md`
5. All other skills automatically read brand-memory and stay on-brand

## Manual Setup (Optional)

If you want to pre-populate brand-memory before running skills:

```bash
cp -r brand-memory-template/ your-project/brand-memory/
```

Then fill in the templates manually.

## How Skills Use Brand Memory
- **Brand Voice** writes `voice-profile.md`
- **Positioning Angles** writes `positioning.md`
- **Direct Response Copy** reads both to write on-brand copy
- **Email Sequences** reads voice + audience to match tone
- **Content Atomizer** reads voice to maintain consistency across platforms
- **SEO Content** reads voice + audience to write human-sounding content
- **Newsletter** reads voice for consistent engagement
- **Lead Magnet** reads audience + positioning for relevant offers
