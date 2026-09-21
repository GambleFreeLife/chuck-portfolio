# current-sprint.md

Build the productized landing page service flow for chuck-portfolio:

- Preserve the existing homepage SEO surface.
- Add `/get-started` intake form for the `$497` one-time service.
- Store intake submissions in Supabase.
- Route paid clients through Stripe Checkout.
- Add `/thank-you` for the post-payment handoff.
- Add Stripe webhook handling for paid status.
- Add Resend notification emails in the next phase after approval.

## Status

Phase 2 implementation works locally. Phase 3 email notifications are being added to the Stripe webhook.
2026-09-09: Portfolio redesign implemented and verified in an isolated checkout. Next business validation is qualified inquiries and paid deposits, not visual scores. See REDESIGN-REVIEW.md.

2026-09-21: Qualified-project redesign implemented on codex/qualified-client-redesign. Build and 16 tests pass. Deployment requires GitHub write access and real Turnstile keys; browser visual QA, live inbox verification, and an approved metadata alignment remain. See docs/REDESIGN-LAUNCH.md and docs/CLIENT-ACQUISITION-PLAN.md.
