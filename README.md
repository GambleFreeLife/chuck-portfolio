# Chuck portfolio

Next.js portfolio and project inquiry form, with separate landing-page and video checkout flows. The homepage service definitions live in `lib/services.ts`.

The September 22 redesign has passed 38 automated tests, type checking, a production build, and local responsive browser checks. Production activation is blocked until the real Cloudflare Turnstile keys are configured and verified. Actual email delivery, paid checkout, spam reduction, and conversion improvement have not been verified for this release. See the [release evidence](RESEARCH-AND-RELEASE-20260922.md).

## Run and check

From the repository root, use the existing npm scripts:

```powershell
npm ci
npm run dev
```

To validate a change, run:

```powershell
npm test
npm run typecheck
npm run build
```

`npm start` serves the completed production build. The tests use Node's `--experimental-strip-types` option, so use a Node version that supports it.

## Form configuration

Follow [TURNSTILE-SETUP.md](TURNSTILE-SETUP.md) for widget creation, Vercel configuration, and local testing. `.env.example` lists the two new Turnstile variables only; existing email, database, and payment settings are configured separately. Keep private values in untracked local environment files or Vercel. The form needs JavaScript and a valid security check; direct email is the fallback.

Current homepage events include `services_cta`, `inquiry_cta`, `proof_click`, `project_click`, `offer_click`, `email_click`, `inquiry_form_start`, and `generate_lead`. `generate_lead` records provider acceptance of an inquiry, not inbox receipt or a qualified lead. GA4 remains optional through `NEXT_PUBLIC_GA_MEASUREMENT_ID`; local data-layer events alone are not stored analytics.

## Documentation

Use these references for current work and earlier release history:

| Reference | Purpose |
| --- | --- |
| [September 22 release](RESEARCH-AND-RELEASE-20260922.md) | Research, scope, validation evidence, and pending production checks |
| [Turnstile setup](TURNSTILE-SETUP.md) | Required widget and environment configuration |
| [Design direction](DESIGN.md) | Current layout, service ladder, and interaction conventions |
| [Project instructions](AGENTS.md) | Repository operating rules |
| [Stack](_os/stack.md), [voice](_os/voice.md), and [guardrails](_os/guardrails.md) | Owner-maintained conventions and change restrictions |
| [Current sprint](_os/current-sprint.md) and [decisions](_os/decisions.md) | Implementation status and decision history |
| [September 9 review](REDESIGN-REVIEW.md) and [September 8 update](CONVERSION-UPDATE.md) | Historical release records, not current setup instructions |
| [LinkedIn video project](linkedin-landing-page-video/README.md) | Separate Remotion project's setup and rendering commands |
| [Video script](linkedin-landing-page-video/script.md), [decisions](linkedin-landing-page-video/DECISIONS.md), and [production skill](linkedin-landing-page-video/SKILL.md) | Video project's script and production references |
