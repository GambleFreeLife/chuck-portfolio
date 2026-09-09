# Portfolio redesign review · September 9, 2026

## Outcome and scope

Redesigned the homepage for prospects considering a website project. Baryames Cleaners leads the page with actual desktop and mobile screenshots and a selectable service-page preview. Rewrote the offer, pricing, process, questions, and contact section. Custom packages are inquiry-first: $500 refresh, $1,000 homepage, website from $2,500. 50% deposit, balance after approval before launch. These prices are a starting hypothesis, not a validated revenue-maximizing result.

Implementation was isolated from unfinished payment/email changes in the original checkout. Existing checkout routes, prices, API handlers, email templates, dependencies, and SEO metadata were preserved.

## Verification

- Production build and TypeScript check passed.
- 17 tests passed, including provider rejection, confirmation failure, native form responses, validation, honeypot, source hygiene, and each new package reaching the admin notification data.
- Browser widths checked: 320, 390, 768, 1024, 1440. No root horizontal overflow, clipped inputs, or missing homepage anchor targets. Desktop, mobile, pricing, case study, and form screenshots visually inspected.
- Project selector changes screenshot, description, pressed state, and destination. FAQ expands. Package link opens the contact section and displays the selected package. Mobile sticky CTA hides while contact is visible.
- Real local form failure preserves entered details and shows a direct email fallback. Stubbed browser success focuses the receipt and emits the existing lead event with package context. No real email sent by these checks.
- Fresh production browser load had no console errors. The deliberately induced local email failure returned the expected 503. An earlier screenshot-before-hydration warning was reproduced as a browser screenshot timing artifact and absent on a fresh settled load.
- Corrected faint placeholders, dark inherited focus backgrounds, overly tall form spacing, a wrapping navigation arrow at 320px, and a cramped tablet hero.
- Deterministic route/asset checks passed on /, /landing-pages, /get-started, /order-video. Payment processing was not exercised.

## Evidence and limits

Desktop source: public/portfolio/baryames-verified-20260908.jpg. Service source: public/portfolio/baryames-wash-fold-verified-20260908.jpg. Mobile source: public/portfolio/baryames-mobile-20260909.png, captured from the live Baryames homepage at 390×844. Family-business relationship is disclosed. No uplift or sales result is claimed.

Local browser evidence is stored in D:/Codex/Temp/portfolio-*.png and portfolio-browser-qa.json. Live inbox delivery remains unverified; the redesign preserves the existing Resend backend, and provider simulation does not prove receipt in Zoho. The existing global social preview still describes the separate $497 landing-page offer; it was left intact under the repo metadata lockbox.

Implementation: PASS. Measured conversion lift and $1,000 collected within seven days: NOT YET ACHIEVED. Measure qualified replies, inquiries, deposits, and collected revenue after outreach. With 50% deposits, two $1,000 projects would produce $1,000 upfront; this is arithmetic, not a sales forecast.

Design rationale is consistent with Nielsen Norman Group's research on [visible pricing](https://www.nngroup.com/articles/show-price/) and [credibility](https://www.nngroup.com/articles/trustworthy-design/). Those sources do not establish that this particular design or price will convert.

## Requested polish revision

Kept the approved palette, layout, pricing, and primary CTA. Strengthened the hero around service-business owners: a better first impression and an easier path to hiring them. Balanced headline wrapping to avoid an isolated final word.

Research reviewed September 9: [Oak Harbor Web Designs](https://oakharborwebdesigns.com/) names its small-business audience and service directly; [Oak Web Designs](https://www.oakwebdesigns.com/) makes the done-for-you service and working relationship explicit. These are positioning examples, not verified conversion-rate benchmarks. This headline remains a hypothesis to evaluate through qualified inquiries and paid projects.

Replaced the scaled homepage screenshot with a clearly labeled condensed project preview containing native, readable text. Removed the rotated screenshot and overlapping phone treatment. Customer-review excerpts now appear immediately below the phone line; the large trust-section introduction is omitted. Howard W. and Gary & Karen Q. excerpts and five-star ratings were verified on the [live Baryames homepage](https://baryamescleaners.com/). They are cleaning-customer reviews, not endorsements of Chuck's web design. The service-page view remains an actual screenshot. The live client website was not changed.

Enhanced the original 200px portrait with image generation and visually reviewed the result. Original photo retained; the restoration improves display clarity but generated detail is not recovered original camera detail.

Validation: production build and typecheck passed; all 17 existing tests passed. Checked 320, 390, 768, 1024 and 1440px widths: no root overflow or broken loaded images. Preview body text remains at least 15px. Verified both case-study controls and destinations, contact anchor and existing form action. Visually reviewed desktop, mobile proof, and portrait. No new console errors appeared on the final local page loads; the browser history contains an earlier live-client-site network error. No real email or checkout transaction was sent.

Implementation and requested visual changes: PASS. Conversion lift and collected revenue: not measured. Evidence: D:/Codex/Temp/portfolio-revision-*.png.
