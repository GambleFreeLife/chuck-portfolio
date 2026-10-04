# Approved portfolio upgrade

Chuck approved checkpoint 1 on October 4, 2026. Scope: implement approved prices/copy/proof and tracking, then an accessible preview with four-viewport screenshots and comparable Lighthouse results. Production and Stripe live changes remain unapproved.

Baseline: production 1c831ffd35ecd1f6af58dccaaae75d8b94067743. Isolated branch codex/portfolio-client-upgrade-20261004. Audit and approved copy: ../portfolio-upgrade-2026-10-04/.

Business outcome: more qualified prospects becoming paying clients at sustainable rates. Immediate test: readable offer/proof, reliable scoping request and accurate events. Paid deposits and delivery contribution, not free-review clicks or Lighthouse scores, determine business success.

Implementation decisions:

- Retain Next.js, existing fonts, CSS modules, protected API and provider integrations. No new runtime dependencies.
- Centralize website prices, founding availability and offer labels. Three available places as confirmed; manual count changes require real sales evidence.
- Add approved work and compact visible campaign/video proof. No performance metrics or fabricated before images.
- Make the free-review website required and message optional; paid inquiries accept no existing website. Preserve honeypot, same-origin checks, rate limit, Turnstile and email idempotency.
- Track successful delivery only. Use static event identifiers, sanitize page URLs, and keep personal form data out of GA4.
- Keep existing legacy payment endpoints and links intact. Replace legacy marketing with current-offer guidance; preserve agreed-order forms with an explicit legacy notice and current-service link.
- Add privacy, truthful schema, updated social preview and metadata, covered by the explicit original request and checkpoint approval.

Validation: existing regression suite plus focused tests of free-review validation, offer context and analytics privacy; production build and typecheck; real browser desktop/mobile checks, axe, keyboard, links, poster/playback behavior and successful-response event semantics. Use intercepted test responses only in clearly labeled local component behavior tests, not as claims of provider delivery. One real baseline delivery already verified in the audit; do not send additional notifications without specific need/authorization.

Risks and containment: preserve original dirty checkout; preview only; no checkout price or webhook mutations; no fabricated analytics ID. GA4 account owner and LinkedIn URL requested while independent implementation proceeds. A missing account blocks actual property activation, not the rest of the preview work.
