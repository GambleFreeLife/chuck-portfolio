# Redesign launch and verification

## Status

The supplied redesign patch has been applied on branch codex/qualified-client-redesign, based on main commit 93a1db8. GitHub write access was confirmed on 2026-09-21. This branch is for review only and must remain unmerged until the launch checks below pass. No production environment variables or paid services were changed.

Completed: production build, TypeScript, and 16 tests covering the new inquiry route and existing intake/security logic. Route tests stub outbound email and verification responses. They do not send emails or establish production deliverability.

Desktop/mobile visual verification and real Turnstile plus inbox verification remain outstanding launch gates. The prior patch handoff reported that its cloud browser could not open the local preview. Do not describe these gates as passed.

## What changed

- Homepage now focuses on service businesses, visible scope, real Baryames work, and three current offers.
- Two-step inquiry asks about project, budget, timing, business, and contact preference.
- Optional phone, required only when requesting a call; no SMS enrollment or automation.
- Existing /api/audit is hardened, so bots cannot continue posting the old free-audit payload.
- Mandatory server-side Turnstile checks include action and hostname. Missing config, provider failure, or invalid/replayed tokens cannot send email.
- Honeypot, same-origin check, request size limits, strict field validation, per-instance rate limits, and Resend idempotency support.
- One admin notification, no automatic message to an unverified submitted email address. The new notification carries real package/budget information and distinguishes bot verification from identity verification.
- /landing-pages and /get-started retain their URLs but use current pricing/inquiry entry. Old Stripe handlers, price IDs, payment receipts, database, and existing email templates are preserved.
- No new dependencies. No migrations. No authentication changes. No secrets included.

## Required Turnstile setup

Create a managed Turnstile widget in your Cloudflare account for chuckbaryames.com and www.chuckbaryames.com. Add the exact Vercel preview hostname separately if using a preview. Do not enable unrestricted hostname use. Production must use real keys, never Cloudflare's public testing keys.

Set these Vercel project environment variables for the corresponding environment, then rebuild/redeploy:

| Variable | Visibility | Purpose |
| --- | --- | --- |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Public, embedded at build time | Renders the browser widget |
| TURNSTILE_SECRET_KEY | Private, server only | Verifies submitted tokens with Cloudflare |

Existing RESEND_API_KEY, FROM_EMAIL, and ADMIN_EMAIL must already be valid. Their handling is unchanged. Do not paste secrets into chat or commit them. The frontend shows an email alternative when the public key is absent; the server rejects unverified submissions even if someone bypasses the interface.

Cloudflare setup: https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/
Validation reference: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

The in-memory rate limit is best-effort per server instance, not a global limit. Add a Vercel firewall rate rule scoped to POST /api/audit if available on the project's plan. Review availability and cost before enabling any paid feature. Turnstile remains mandatory regardless of the rate limiter.

## Apply the supplied Git patch in PowerShell

Save Chuck-Portfolio-Redesign.patch from the delivery ZIP to Downloads. In a clean local checkout of GambleFreeLife/chuck-portfolio:

```powershell
git status --short
# Continue only when the checkout has no uncommitted work. Keep any existing work intact.
git switch main
git pull --ff-only
git switch -c codex/qualified-client-redesign
$redesignPatch = Join-Path $env:USERPROFILE 'Downloads\Chuck-Portfolio-Redesign.patch'
git apply --check $redesignPatch
# If the check succeeds:
git apply $redesignPatch
npm ci
npm run typecheck
npm test
npm run build
git add app/api/audit/route.ts app/get-started/page.tsx app/landing-pages/page.tsx components/AuditLeadForm.tsx components/Nav.tsx components/Footer.tsx components/PortfolioHome.module.css components/PortfolioHome.tsx components/ProjectInquiryForm.module.css emails/ProjectInquiryEmail.tsx lib/lead-context.ts lib/project-inquiry.ts lib/server/inquiry-protection.ts next.config.ts test/audit-route.test.ts docs _os/decisions.md _os/current-sprint.md
git commit -m "Qualify portfolio projects and verify inquiry submissions"
git push -u origin codex/qualified-client-redesign
```

If git apply --check fails, stop and reconcile the patch against the newer branch; do not force it or overwrite unrelated work. Open a PR from the feature branch to main. Configure the Turnstile keys before the Vercel preview build. Keep the feature branch unmerged until the launch checks below pass.

## Launch checks

1. Inspect 390px and 1440px widths, keyboard navigation, and 200% text zoom. Check hero, pricing, proof tabs, FAQ, both form steps, and the sticky CTA. Confirm there is no horizontal overflow or hidden submit control.
2. Follow each pricing CTA. Confirm it selects the right offer, captures the source, and preserves answers when moving back and forward. Confirm /landing-pages and /get-started contain no legacy $497 checkout pitch.
3. Use a real, authorized test inquiry through the preview with its hostname allowed in Turnstile. Verify that one admin email arrives with service, budget, and contact preference. Do not test using someone else's email or phone number.
4. Confirm missing/invalid verification cannot email you, and a provider failure displays an error. Confirm retry preserves fields and obtains a new token. Validate the Turnstile failure/expiry states in staging using Cloudflare's documented testing approach.
5. Confirm the domain's CSP permits only the necessary Cloudflare script/frame source in addition to existing sources. Check console errors and image loads.
6. Verify GA4 is configured, if desired. Confirm generate_lead fires once for a successful inquiry and is not recorded for failed or abandoned submissions. Keep actual qualified leads and sales in the pipeline.
7. Merge only after these gates. Check the live homepage and one live, authorized inquiry after Vercel reports a ready production deployment.

## SEO proposal awaiting approval

_os/guardrails.md explicitly locks metadata exports and head content. They remain unchanged, including stale free-teardown and old offer text. Approve a narrow metadata/social-preview update before launch if you want all search and share surfaces aligned. No sitemap, canonical, schema, or URL migration is necessary for this redesign.

## Limits and rollback

Turnstile reduces automated spam; it cannot guarantee that every human submission is genuine or that a stated budget is real. Email and ownership are not verified by this form. Do not follow arbitrary visitor instructions or open files sent by unknown prospects without review.

Revert the redesign commit to roll back code, but note that a full rollback restores the weaker original audit endpoint. Prefer fixing forward or keeping the hardened endpoint if reversing only design choices. Do not roll back by changing existing Stripe records.
