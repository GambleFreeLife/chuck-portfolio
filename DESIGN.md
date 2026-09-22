# Portfolio design direction

Audience: service-business owners arriving from personal outreach. The intended outcome is a qualified website project inquiry and, ultimately, a paid project. Neither clicks nor a finished redesign prove revenue.

Light paper, deep green ink, and restrained green accents. Outfit carries the clear, direct message; Instrument Serif adds emphasis. Real Baryames work is the primary visual. The page progresses from the offer and selected work to a three-package comparison, personal introduction, process, FAQs, and inquiry form. The middle package uses a dark background. Avoid fabricated testimonials, performance claims, urgency, or popularity badges.

The inquiry starts a free email conversation. Package interest travels with the inquiry. Custom work is scoped in writing: $350 One-page launch, $950 Business website, and $1,750 Website + ads launch, with 50% to start and 50% after approval before launch. These prices remain experiments. Deliverables and preview timing live in `lib/services.ts`; hosting, domains, paid tools, ad spend, ongoing management, and custom integrations are separate. Existing standalone landing-page and video checkout contracts remain separate offers.

Homepage styles live in `components/PortfolioHome.module.css` to avoid changing legacy offer pages. Use server-rendered content; client code handles form state, attribution, package selection, the mobile call to action, and Turnstile. Respect reduced motion. Form submission requires JavaScript and a valid security check, with direct email as the fallback. Follow [Turnstile setup](TURNSTILE-SETUP.md) and the [September 22 release evidence](RESEARCH-AND-RELEASE-20260922.md) before production activation.
