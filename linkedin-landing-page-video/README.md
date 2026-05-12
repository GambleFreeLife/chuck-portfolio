# LinkedIn landing page proof video

This is a Remotion video for Chuck's LinkedIn freelance lead generation post.

## Format

- Composition: `LinkedInLandingPageProof`
- Size: 1080 by 1350
- Aspect ratio: 4:5
- Duration: 30 seconds
- Frame rate: 30 fps
- Output: MP4

I chose 4:5 because LinkedIn currently supports 4:5, 9:16, 16:9, and 1:1 video. The 4:5 format gives more feed space than square while staying friendlier to desktop viewers than full vertical.

## Structure

- Hook, 0 to 2.5 seconds
- Tension, 2.5 to 15 seconds
- Twist, 15 to 24 seconds
- CTA, 24 to 30 seconds

The video is built as proof of work. It shows a weak first screen, diagnoses why visitors hesitate, then reveals a stronger page and the $50 down, 48-hour delivery offer.

## Files

- `src/Root.tsx` registers the Remotion composition.
- `src/PortfolioLeadGenVideo.tsx` sequences the four phases.
- `src/components/HookPhase.tsx` builds the stop-the-scroll opening.
- `src/components/TensionPhase.tsx` builds the weak template scene.
- `src/components/TwistPhase.tsx` builds the polished reveal.
- `src/components/CtaPhase.tsx` builds the end card.
- `src/copy.ts` keeps the narration timing in code.
- `script.md` contains the ElevenLabs narration script.
- `DECISIONS.md` records the creative and format decisions.

## Optional real assets

The video renders without external assets. To replace the CSS mocks with real footage, add files under `public/assets/` and update `src/assetPlaceholders.ts`.

Suggested files:

- `public/assets/problem-site.mp4`
- `public/assets/finished-page.mp4`

You can also use `.webm`, `.png`, `.jpg`, or `.jpeg`.

## Install

```powershell
npm install
```

## Preview

```powershell
npm run dev
```

## Validate

```powershell
npm run lint
```

## Render

```powershell
npm run render
```
