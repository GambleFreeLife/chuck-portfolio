# guardrails.md

These are the things you must never modify, replace, or "improve" without explicit approval from Cha. This file exists because past changes to these systems caused production damage that took weeks to recover from.

If a task requires touching anything in this file, stop. Summarize what you want to change, why, and what the impact would be. Wait for approval. Cha would rather review than rework.

## SEO lockbox

You may not modify any of the following without explicit, in-chat approval:

- `app/sitemap.ts`, `app/sitemap.xml`, or any sitemap generator
- `app/robots.ts` or `public/robots.txt`
- `app/layout.tsx` `metadata` exports (title, description, openGraph, twitter, robots, canonical)
- Per-page `metadata` exports or `generateMetadata` functions
- Any `<head>` content, including JSON-LD schema markup
- Canonical URL logic anywhere in the app
- The folder structure of `app/` in ways that change route URLs
- Slugs in dynamic routes (`[slug]`, `[id]`, etc.) for pages that are already indexed
- Redirects in `next.config.js` or `next.config.mjs`
- The `hreflang` tags if multilingual
- Existing H1, H2, or H3 tags on pages that rank for a query

You may *propose* changes to these. You may not *make* changes to these.

If a refactor or new feature would require touching one of these, surface it in the proposal phase, not in the diff.

## Auth and database lockbox

You may not modify without approval:

- Supabase RLS policies on existing tables
- Existing migrations (write new migrations, never edit old ones)
- `auth.users` schema or any trigger that touches it
- The Supabase service role key handling code
- Existing OAuth provider configuration

You may add new tables, new policies, and new migrations freely.

## Payments lockbox

You may not modify without approval:

- The Stripe webhook handler logic for existing event types
- Existing price IDs, product IDs, or product names
- Subscription state machine logic (active, past_due, canceled, etc.)
- Trial duration logic
- The customer creation flow

You may add new event handlers, new products in code, and new metadata fields freely.

## Email and cron lockbox

You may not modify without approval:

- Existing scheduled cron jobs in `vercel.json` or `app/api/cron/`
- The Resend API key handling
- Existing email templates that have been sent to real users (modifying them mid-drip would create inconsistency)
- Drip sequence ordering or timing once it's live

You may add new cron jobs, new templates, and new sequences freely.

## Environment and secrets lockbox

Absolute rules, no approval path:

- Never commit `.env`, `.env.local`, or any file containing real secrets
- Never log, echo, or write to a comment any value that looks like an API key, JWT, or password
- Never push code that hardcodes a secret as a fallback
- Never add new environment variables without telling Cha what they are and why

## What to do when a task brushes against the lockbox

The pattern is always the same:

1. Stop coding.
2. Write a short proposal in chat: what you want to do, why, what the risk is, what the rollback would be.
3. Wait for Cha to say yes, no, or "do it differently."
4. Only then proceed.

This is not a slowdown. The last time the SEO lockbox got overwritten without review, traffic took a measurable hit. Reviewing a proposal takes two minutes. Rebuilding rankings takes months.
