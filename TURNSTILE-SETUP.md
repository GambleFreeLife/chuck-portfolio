# Production spam protection

The server rejects submissions unless Cloudflare verifies a single-use token with the expected action and an allowed hostname. No fail-open mode exists. All three public submission endpoints are protected, including legacy checkout forms.

1. In [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile), create a **Managed** widget named **Chuck portfolio forms**. Add `chuckbaryames.com` and `www.chuckbaryames.com`. Add the exact Vercel preview hostname only if testing the real widget on preview. DNS does not need to move to Cloudflare. The free plan is sufficient.
2. In [the portfolio Vercel environment settings](https://vercel.com/freshandclean0240-2608s-projects/chuck-portfolio/settings/environment-variables), set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the public Site key and `TURNSTILE_SECRET_KEY` to the Secret key for Production and Preview. Keep the secret out of chat and git. Rebuild after changing the public key.
3. Check the widget completes on the live domain, submit an explicitly labeled owner test, confirm exactly one admin email, and confirm missing/invalid tokens are rejected. Allowed actions are `project_inquiry`, `landing_intake`, and `video_order`.

For local widget rendering only, Cloudflare documents public test site key `1x00000000000000000000AA`. Dummy verification responses do not carry trustworthy action/hostname information, so this strict backend intentionally rejects them. Local browser tests must stub the submission endpoint; server tests use an isolated Siteverify stub and never send email. Never use test keys for production. A real visitor must pass the real production widget before claiming end-to-end delivery verified.

The in-process request cap is secondary protection, not a distributed rate-limit guarantee. Turnstile validation applies across instances. A valid human visitor can still send an unwanted message. No system guarantees zero spam.
