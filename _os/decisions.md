# decisions.md

2026-05-07 - Added project operating files - The repo was missing AGENTS.md and `_os/`, so the project rules were added before implementation work.
2026-05-07 - Added Phase 2 productized service flow - The static portfolio was migrated to Next.js so intake, Stripe Checkout, Supabase storage, and webhook routes can run on Vercel.
2026-05-07 - Added setup automation scripts - Local Supabase, Stripe, and Vercel environment setup can now be driven from PowerShell prompts without putting secrets in chat.
2026-05-07 - Added Stripe price creation helper - The $497 product and one-time price can now be created from PowerShell using Cha's local Stripe key.
2026-05-07 - Added local secret repair helper - PowerShell secure paste captured one-character secrets, so a repair script now supports safer re-entry and validation.
2026-05-07 - Fixed setup scripts to write env files without BOM - Supabase CLI could not parse PowerShell's default UTF-8 BOM in `.env.local`.
2026-05-07 - Added Phase 3 Resend email notifications - Stripe payment completion now sends admin and client emails from React Email templates.
2026-05-07 - Added email env setup helper - Resend, from-address, and admin-recipient configuration can now be added locally from PowerShell.
2026-05-07 - Made webhook email failures non-blocking - Payment fulfillment should stay successful even if Resend rejects a test-mode recipient.
2026-05-07 - Updated customer-facing name to Chuck - Email and thank-you copy now match the owner's preferred name.
2026-05-07 - Added codebase audit export helper - The project can now generate a Claude-ready source bundle without secrets or build artifacts.
2026-05-08 - Repositioned homepage around the build-first landing page offer - LinkedIn traffic now sees the $50 commitment, 48-hour preview, and pay-after-approval mechanism before secondary offers.
2026-05-08 - Refactored homepage into React components - The homepage no longer depends on a giant HTML string and can be edited section by section.
2026-05-08 - Removed the free teardown modal - The page now focuses on the productized offer and no longer stores trapped leads in localStorage.
2026-05-08 - Updated Stripe and webhook observability - The Stripe API version now uses the documented current API version and missing intake metadata is logged.
2026-05-08 - Fixed the thank-you email fallback - Customers now see cbaryames24@gmail.com instead of a placeholder when FROM_EMAIL is not set.
2026-05-08 - Simplified the homepage hero - The headline now leads with the 48-hour preview and pay-after-approval mechanism instead of making visitors calculate the offer.
2026-05-08 - Added offer details and fit checks - The homepage now explains deliverables and screens for right-fit buyers before visitors reach the intake form.
2026-05-08 - Upgraded the intake brief UI - The form now has guided sections, progress feedback, stronger helper text, and a sidebar that reduces buyer uncertainty.
2026-05-08 - Switched intake checkout to a $50 deposit - The productized landing page flow now collects only the upfront commitment while the $447 balance is billed manually after approval.
2026-05-08 - Added production env guard for Stripe setup - The Vercel env helper now stops before pushing test Stripe keys to production.
2026-05-08 - Added a production deposit price fallback - The checkout route uses the live $50 price if STRIPE_DEPOSIT_PRICE_ID is missing, while still allowing the env var to override it.
2026-05-08 - Wired portfolio images into case cards - The homepage now shows polished visual proof instead of gradient placeholders.
2026-05-08 - Changed the hero to a price-contrast hook - The first viewport now makes the agency alternative and $50 starting commitment obvious.
2026-05-08 - Compressed hero proof bullets - Visitors can scan the start, preview, and balance-payment promise faster.
2026-05-08 - Unified primary CTA copy - Nav, hero, and final CTA now all send visitors to start the build for $50.
2026-05-08 - Opened key FAQ items by default - Deadline, deposit, and proof answers now address cold-visitor objections before extra clicks.
2026-05-08 - Reduced the hero photo size - The first viewport now gives more space to the conversion offer.
2026-05-08 - Reframed intake progress around time - The form now signals a short 4-minute commitment instead of emphasizing field count.
2026-05-08 - Rewrote About for trust - The section now explains Chuck's background and why the fast build process exists.
2026-05-08 - Added a social share image - LinkedIn and other previews now have a branded Open Graph image.
2026-05-08 - Added subtle depth to Other Offerings - The secondary pricing section now feels intentional without competing with the cards.
2026-05-08 - Softened productized-scope rejection copy - Bigger projects are routed to the higher-scope tiers instead of being turned away.
2026-05-08 - Hardened the portfolio and checkout path - The app now has clearer intake validation, safer checkout setup, baseline security headers, patched dependencies, self-hosted fonts, reduced-motion handling, and regression tests.
2026-05-08 - Added LinkedIn Remotion video project - The repo now has a self-contained 4:5 proof-of-work video package for marketing the landing page service.
2026-05-08 - Tightened the LinkedIn video script and captions - The marketing video now uses fewer lines, longer centered text holds, and calls out the $50 down and 48-hour delivery offer.
2026-05-08 - Revised the LinkedIn video hierarchy - The video now uses scene-specific motion text and a diagnosis rail so captions do not compete with webpage mockups.
2026-05-11 - Rendered three showcase variants - VideoShowcase section now has brand intro, service explainer, and testimonial cinematic examples covering the three most common video use cases.
2026-05-11 - Built video-first component suite - HeroVideo, VideoShowcase, TheStack, Pricing, StickyMobileCTA, and VideoOrderForm are now available for the page restructure, replacing OtherOfferings with the new four-tier Pricing component.
2026-05-11 - Wired video-first homepage layout - Hero, Nav, HowItWorks, AntiObjectionFAQ, Portfolio, About, FinalCTA, and HomeInteractions updated to reflect video-as-hero positioning. OtherOfferings replaced by four-tier Pricing component. StickyMobileCTA enabled on mobile after hero scroll-past.
2026-05-11 - Created remotion-branded-video-system skill - The Remotion video production patterns are now captured in linkedin-landing-page-video/SKILL.md so future client work and showcase variants can reference the standard without re-spec'ing.
2026-05-11 - Rendered conversion-focused hero video - HeroConverter composition addresses the three primary buyer objections (price, speed, suspicion) through structure and demonstrates the mechanism that makes the offer real. Output at public/demo/hero-converter.*
2026-05-11 - Wired the video order flow - /order-video page, /api/video-order route, /video-thank-you page, Stripe webhook handling for video orders, and two new email templates are live. The video CTAs no longer 404.
