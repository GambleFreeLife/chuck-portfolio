# Portfolio conversion release, September 22, 2026

## Outcome and scope

Help small service business owners understand Chuck's work, choose a bounded service, and send a legitimate inquiry. Success means more qualified inquiries and paid projects per eligible visitor, with fewer spam messages. Conversion is a complex system; security enforcement and responsive layout are directly testable. A prettier page or more form submissions alone is not commercial success.

User authorized research, redesign, pricing decisions, Cloudflare setup, security fixes, and production deployment. Start at production commit 93a1db8 in a separate worktree because the older local main has unrelated uncommitted changes. No payment products, payment amounts, database policies, or locked SEO exports change.

## Research and limits

- [Unbounce professional services benchmarks](https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/): mobile was 81% of visits but converted below desktop (8.3% vs 11.6%). Simpler copy correlated with better conversion. Observational industry data, not freelance portfolio A/B results or a forecast for Chuck.
- [Unbounce methodology](https://unbounce.com/conversion-benchmark-report/methodology/): July 2023 through July 2024 dataset, 464 million visitors and 41,000 landing pages. Historical evidence, not new 2026 performance.
- [Designjoy](https://www.designjoy.co/): visible scope and pricing, clear process, founder accountability, work examples, and objections addressed near purchase. Borrow clarity, not the subscription model or unverified revenue claims.
- [Oak Harbor Web Designs](https://oakharborwebdesigns.com/): small-business positioning, real linked projects, explicit page limits and ongoing costs. Public prices are supplier offers, not evidence of the right price for Chuck. Do not copy absolute security/performance promises.
- [NN/g form usability](https://www.nngroup.com/articles/web-form-design/): visible labels, a short single-column path, and clear required/optional fields. Website becomes optional so new businesses can inquire.
- [Cloudflare server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) and [CSP guidance](https://developers.cloudflare.com/turnstile/reference/content-security-policy/): verify server-side, check action and hostname, and reject invalid tokens before side effects.

## Baseline audit

The live page requires a website and sells a free review rather than a qualified project conversation. Entry pricing is $500 for edits and $1,000 for a homepage. Ads capability is absent from packages. Large repeated proof and value sections delay pricing. API has a honeypot and per-instance rate limiting but no CAPTCHA, no same-origin gate, and no bounded body reader. Production CSP allows unsafe-eval.

## Decisions

Restrained light/ink design, one primary inquiry action, visible entry price, live work before service comparison, ascending packages on mobile, short process, concise FAQs, protected form. Family-business work is labeled; no invented testimonials, results, certifications, or paid clients. $350/$950/$1,750 are bounded experiments, not proven optimums. Entry tier uses supplied content and one revision. Ads spend, hosting, domains, ongoing management, and integrations are separate. Video is optional supporting creative in the top package, without an ROI claim.

## Acceptance and feedback

Check desktop, tablet, narrow mobile, keyboard, pricing selection, FAQs, error recovery, CAPTCHA expiry, and accepted/blocked submissions. Verify deployed commit, production headers, and rejection of missing/invalid tokens. Email remains a no-JavaScript fallback. Security tests must verify side-effect ordering and fail-closed behavior.

Immediate: delivery, rendering, challenge paths. Intermediate: accepted inquiries classified as spam/unqualified/qualified, by offer and source. Business: paid projects per eligible unique visitor by source/device, revenue and delivery hours by tier. Review October 22, 2026, or once traffic supports useful comparison. No reliable baseline denominator supplied; improvement remains unverified. Keep private evidence outside git and record aggregate outcomes only.

## Release evidence

Implementation complete in `codex/portfolio-conversion-20260922`, based on production 93a1db8. Production deployment is pending real Cloudflare credentials in Vercel. Do not merge while the form has no working widget configuration.

- `npm test`: 38 tests passed. Covers CAPTCHA gating, exact hostname/action, expiration/reuse failures, missing configuration, production test-key rejection, request origin and body limits, per-instance request cap, validation, provider failure, idempotency forwarding, and legacy checkout side-effect ordering.
- `npm run typecheck` and optimized Next.js 16.3.6 production build passed. Existing indexed routes and payment contracts are preserved.
- `npm audit`: zero known vulnerabilities after compatible dependency updates. This is not a guarantee of no vulnerabilities.
- Live local Chromium: 320, 390, 768, 1024, and 1440px checked without horizontal overflow or clipped fields. Screenshots inspected. Pricing choices preserve typed form details and campaign source; keyboard FAQ interaction works. Error and success states move focus, unchanged retries keep their delivery key, edited retries rotate it, and sending another inquiry reloads the widget. No page JavaScript errors were observed.
- Isolated widget simulations verify expiration and provider failure disable submission, with recovery through retry. Public Cloudflare test widget rendered locally; local submission responses were mocked so no real messages or checkout sessions were created.
- Website preflight: all six public pages returned 200 and referenced assets passed. Private QA evidence is under `.gstack/qa/` and excluded from git.
- Actual production-build runtime: all six pages loaded with no page JavaScript errors; missing-token POST returned 400; missing configuration disabled the form with an email fallback; CSP allows the Cloudflare script/frame without unsafe-eval. This check caught and fixed Next's internal-host mismatch in origin validation. All forms now compare the browser origin against the actual Host and protocol, with regression coverage for forged forwarded-host and cross-origin requests.
- Independent security review found two issues, both resolved: edited retries now use a fresh delivery key, and the setup guide no longer claims dummy Siteverify responses can satisfy strict hostname/action validation.
- Related service-page links now explain the separate $497 expedited offer and point to the new value ladder. Existing checkout payment amounts remain unchanged.

Deployed preview at commit 914821a was inspected in Chromium on Vercel: homepage 200, expected redesigned content, same-origin missing-CAPTCHA POST 400, Cloudflare allowed in CSP, unsafe-eval absent, and the missing-configuration fallback visible. The preview-only Vercel feedback script is blocked by the existing strict CSP; the application itself rendered correctly. [Redesign PR #6](https://github.com/GambleFreeLife/chuck-portfolio/pull/6) remains draft until activation.

Dependency patches shipped separately through [PR #7](https://github.com/GambleFreeLife/chuck-portfolio/pull/7) to production commit f9b3e1a. That exact dependency-only branch passed its 17 existing tests, typecheck, build, and six-route local preflight. Vercel production is READY; live chuckbaryames.com passes all six route/asset checks. A live browser confirmed the existing design and form still load without page JavaScript errors, and an empty submission returns 400 without sending email. This release does not activate CAPTCHA or publish the redesign.

Remaining release checks: real Managed widget configured in Vercel, production redesign commit verified after merge, production missing/invalid-token rejection, and an owner-triggered valid inquiry with receipt confirmation. No real email delivery, paid checkout, spam reduction, or conversion improvement is claimed from these tests.

Outcome status: implementation and local runtime pass. Production activation and business outcome remain unverified. Observation run: `portfolio-conversion-20260922` in the local outcome ledger. Roll back by reverting the release commits and deploying the previous main revision; do not restore vulnerable dependency versions without reviewing the security tradeoff.
