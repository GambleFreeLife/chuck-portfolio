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
