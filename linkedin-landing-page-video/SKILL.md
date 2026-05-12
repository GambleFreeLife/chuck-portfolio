---
name: remotion-branded-video-system
description: "Use this skill whenever Cha asks to render a new branded video using Remotion for a client, a new showcase variant, a marketing piece, or any 4:5 vertical kinetic-typography video. Triggers: 'render a video for', 'new brand intro', 'add a showcase variant', 'render with Remotion', 'video for retainer client', or any reference to producing a branded short. Do NOT use for editing existing videos in other tools or for non-Remotion video work."
compatibility: "Windows PowerShell, requires the linkedin-landing-page-video Remotion project as a base"
---

# Remotion Branded Video System

## When to Use This Skill

Use this skill when rendering a new homepage showcase variant, producing a branded short for a retainer client, or creating a one-off marketing video from the existing Remotion system. Do not use it for editing existing video files in CapCut, Premiere, or another non-Remotion tool.

## Standard Composition Specifications

- Aspect ratio: 4:5 vertical, 1080x1350.
- Frame rate: 30 fps.
- Duration: 600 frames, or 20 seconds, for showcase loops.
- Duration: 900 frames, or 30 seconds, for client deliverables.
- Background: light warm white `#FAFAF7` or dark near-black `#0A0A0A`, based on the variant.
- Render formats: MP4 with H.264 at CRF 18 baseline and CRF 20 fallback, plus WebM with VP9 at CRF 30 baseline and CRF 33 fallback.
- Poster: JPG extracted from a representative frame, and the middle of the composition is usually best.
- File size targets: MP4 under 3 MB, WebM under 500 KB, and poster JPG under 50 KB.

## Color Token System

Tokens live in `src/constants.ts` under `SHOWCASE_COLORS`, and composition files must import from that object instead of hardcoding hex values.

| Skill token | Hex | Code token | Usage |
| --- | --- | --- | --- |
| `--background-warm` | `#FAFAF7` | `SHOWCASE_COLORS.backgroundWarm` | Light backgrounds |
| `--background-dark` | `#0A0A0A` | `SHOWCASE_COLORS.backgroundDark` | Dark backgrounds |
| `--ink-on-light` | `#0A0A0A` | `SHOWCASE_COLORS.inkOnLight` | Text on light |
| `--ink-on-dark` | `#FAFAF7` | `SHOWCASE_COLORS.inkOnDark` | Text on dark |
| `--accent-coral` | `#FF4D2E` | `SHOWCASE_COLORS.accentCoral` | Energetic default accent and brand intro variants |
| `--accent-emerald` | `#1F7A5C` | `SHOWCASE_COLORS.accentEmerald` | Calm service explainer variants |
| `--accent-amber` | `#C9A961` | `SHOWCASE_COLORS.accentAmber` | Cinematic testimonial variants |
| `--muted-on-light` | `#6B6B6B` | `SHOWCASE_COLORS.mutedOnLight` | Secondary text on light |
| `--muted-on-dark` | `#8B8B8B` | `SHOWCASE_COLORS.mutedOnDark` | Secondary text on dark |
| `--hairline-on-light` | `#E5E5E0` | `SHOWCASE_COLORS.hairlineOnLight` | Subtle dividers on light |
| `--hairline-on-dark` | `#2A2A2A` | `SHOWCASE_COLORS.hairlineOnDark` | Subtle dividers on dark |

## Motion Principles

- Make every text entrance fade from opacity 0 to 1 over 12 frames, and move from `translateY(24px)` to `translateY(0)` over 18 frames.
- Use `spring()` with config `{ damping: 200, mass: 0.5, stiffness: 100 }` for all entrances.
- Hold every key text element for at least 60 frames before exit.
- Use 15-frame crossfades between scenes.
- Do not use linear easing.
- Use tight display letter spacing for type at 100px or larger, usually `-0.04em`.
- Reuse `MotionText` from `src/components/MotionText.tsx` and helpers from `src/lib/animation.ts`.

## Available Variant Patterns

### Brand Intro Pattern

Use this for product launches, new offers, and energetic announcements. It uses a light background, coral accent, four to five scenes, and energetic pacing. Reference `src/PortfolioBrandIntro.tsx`.

### Service Explainer Pattern

Use this for service businesses, professional services, and educational content. It uses a dark background, emerald accent, three to four scenes, calm pacing, and a three-step process visualization. Reference `src/PortfolioServiceExplainer.tsx`.

### Testimonial Cinematic Pattern

Use this for customer quotes, case studies, and social proof. It uses a warm-tinted background, amber accent, four scenes, slower cinematic pacing, and a quote-driven layout. Reference `src/PortfolioTestimonial.tsx`.

## How to Render a New Video

1. Choose the closest variant pattern from the three patterns above.
2. Copy the corresponding composition file, for example:

```powershell
cd linkedin-landing-page-video; Copy-Item src/PortfolioBrandIntro.tsx src/NewVideoName.tsx
```

3. Update the copy strings to match the new client or use case.
4. Adjust scene timing only when necessary, because the established timing is calibrated for retention.
5. Register the new composition in `src/Root.tsx` alongside the existing four compositions.
6. Render MP4, WebM, and poster outputs:

```powershell
cd linkedin-landing-page-video; npx remotion render NewVideoName ../public/demo/output-name.mp4 --codec=h264 --crf=18; npx remotion render NewVideoName ../public/demo/output-name.webm --codec=vp9 --crf=30; npx remotion still NewVideoName ../public/demo/poster-output-name.jpg --frame=200
```

7. Verify file sizes against targets, and re-render with higher CRF values if needed.
8. For client deliverables, also export a captioned version using the captioning step below.

## Captioning for Multi-Platform Distribution

Captions are baked in for muted autoplay. Use the existing `MotionText` primitive as the caption text renderer, and set a `caption` prop to `true` if the component exposes one in the working branch. If it does not, extend `MotionText` first rather than creating a second caption system.

Place captions in the lower third, 80px from the bottom edge. Use Inter 600 at 36px with a semi-transparent background pill, `rgba(0,0,0,0.7)` on light backgrounds and `rgba(255,255,255,0.15)` on dark backgrounds. Render the captioned version with a `-captioned.mp4` suffix.

## Client Brief Mapping

| Client tells us | Choose variant |
| --- | --- |
| "We're launching X" or "Introducing Y" | Brand Intro |
| "We help businesses do X" or "Our process is" | Service Explainer |
| "Here's what a customer said" or "Case study" | Testimonial Cinematic |
| "We need a quick scroll-stopper" | Brand Intro |
| "We're a serious B2B company" | Service Explainer, dark |
| "We have a great success story" | Testimonial Cinematic |

## File Naming Convention

- Showcase variants on the homepage: `showcase-[variant-name].mp4`.
- Hero and marketing videos: `[campaign-name].mp4`.
- Client deliverables: `client-[client-slug]-[video-purpose].mp4`.
- Posters: `poster-[matching-name].jpg`.

Use lowercase slugs with hyphens. Do not use spaces or special characters in output filenames.

## Validation Checklist

Before delivering any rendered video, confirm:

- File sizes are within targets, with MP4 under 3 MB, WebM under 500 KB, and poster JPG under 50 KB.
- No linear easing appears anywhere in the composition.
- All colors reference tokens from `src/constants.ts`.
- The composition is registered in `src/Root.tsx`.
- The preview server renders the new composition without errors.
- Existing four compositions still render without regressions.

## Common Mistakes to Avoid

- Do not hardcode hex colors instead of using tokens from `src/constants.ts`.
- Do not make variants visually similar by only swapping copy. If you find yourself doing this, stop and ask for direction.
- Do not render at the wrong aspect ratio. Use 1080x1350 unless the user specifically directs otherwise.
- Do not use fonts other than Inter, which is the production standard.
- Do not forget to update `src/Root.tsx` after creating a new composition.
- Do not name files with spaces or special characters.
