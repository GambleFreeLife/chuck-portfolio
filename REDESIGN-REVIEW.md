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
