# Portfolio conversion update

Historical record for September 8, 2026. The offers, event names, confirmation emails, and native-form behavior below describe that release. Use the [current README](README.md), [September 22 release evidence](RESEARCH-AND-RELEASE-20260922.md), and [Turnstile setup](TURNSTILE-SETUP.md) for the current implementation and pending activation checks.

## Changes

- Replaced on-demand third-party screenshots with locally served, verified Baryames screenshots captured September 8, 2026. Added a useful fallback link when an image fails.
- Focused the homepage on website improvements for Greater Lansing businesses, with a direct free-review CTA and visible local operator identity.
- Replaced unrelated credibility metrics with inspectable project work. No claims of verified conversion lift or revenue attribution.
- Defined a $299 Quick Win as up to three agreed edits on one existing page, with one revision round and desktop/mobile checks. Kept the $497 landing-page offer and existing payment flow. Removed the broadly scoped $599 sprint from the homepage.
- Moved pricing earlier and moved video/product examples into optional sections. Kept existing routes.
- Added safe, bounded source labels to the audit notification through a new email template. Existing email templates, keys, Stripe IDs, payment logic, and database code remain intact.
- Fixed a false-failure path after admin email acceptance. Confirmation email failures no longer make the lead request fail. Added form limits, duplicate-click protection, a timeout, a working native POST fallback for browsers without JavaScript, and a visible direct-email alternative.
- Added optional GA4 page views and funnel events. No analytics account or ID is fabricated.

## Configure analytics

Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with the portfolio web stream's actual `G-...` ID in Vercel, then redeploy. This is a public measurement identifier, not a secret. Do not use a client's property ID.

The variable is intentionally optional. When absent, no Google tag is loaded and events are not transmitted to GA4. Local data-layer events alone are not stored analytics.

In GA4, mark `generate_lead` as the primary inquiry key event. It fires only after the audit endpoint confirms that the admin notification was accepted by the email provider. It does not mean the message reached an inbox, the lead qualified, or a sale occurred. Avoid configuring a second tag to send the same data-layer events if using the built-in Google tag integration.

Other events: `audit_cta`, `proof_click`, `project_click`, `offer_click`, `email_click`, and `audit_form_start`. Keep them as diagnostic events. Names, email addresses, submitted websites, and free-text answers are not included in event payloads. Page URLs omit query strings and fragments.

Use source tags such as `?utm_source=linkedin&utm_medium=outreach&utm_campaign=lansing-week1`. Only letters, digits, underscores, and hyphens are accepted in source labels. Do not put personal details in these labels. Campaign labels persist within a browser-tab session and accompany submitted leads even before analytics is configured. They are visitor-supplied labels, not verified attribution.

Review the analytics property's enhanced-measurement and privacy settings before enabling collection. Disable automatic form-interaction events if they duplicate the explicitly instrumented form-start event. Keep the site's privacy disclosures appropriate to the collection actually enabled.

## Checks and release

Run `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`.

`npm run dev` still starts Next.js. A small wrapper translates the supervised preview's `--host` and `--strictPort` arguments into Next.js-compatible flags; normal development needs no extra flags.

Before production release:

1. Review the revised offer, scope, and two-business-day review target.
2. Confirm all required mail settings already used by `/api/audit` are configured for the intended Vercel environment: `RESEND_API_KEY`, `FROM_EMAIL`, and `ADMIN_EMAIL`, with `REPLY_TO_EMAIL` optional.
3. Submit one owner-controlled test audit after release. Check the provider log, admin inbox, reply-to address, customer confirmation, source labels, and the GA4 event if configured. Unit tests use a stub email provider and do not establish real delivery.
4. Verify the existing paid landing-page flow separately with the portfolio Stripe account. Payment behavior was not changed or exercised by this update.

SEO metadata, route URLs, redirects, and the existing social image were preserved. The social image still references the separate $497 landing-page offer; consider a future dedicated review for homepage metadata and sharing previews.

No pre/post conversion uplift has been established. Evaluate the revision against actual qualified traffic and accepted inquiries, then reconcile closed sales manually.

## Verified status, September 8, 2026

Type checking, the production build, and all 16 tests passed. Tests cover the actual audit route with a stub email provider, including the JavaScript-free form fallback. The desktop preview and actual Baryames image loading were inspected. Client hydration did not complete in the supervised preview, so a full browser form submission and an actual mobile-device check remain release gates. This is not evidence that those checks passed in production.

GitHub rejected write access for the connected integration. No branch, pull request, or production deployment was created. The downloadable revision contains the source changes and captured project images. Upload the source to a review branch in your existing repository, let Vercel create a preview, and complete the checks above before merging.
