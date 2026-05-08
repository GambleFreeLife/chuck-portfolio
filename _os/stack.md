# stack.md

The default stack and conventions Cha uses across projects. Override per project only when there is a real reason.

## Default stack

- **Framework:** Next.js (App Router unless the existing repo uses Pages Router, in which case match the repo)
- **Database and auth:** Supabase (Postgres + Supabase Auth + Row Level Security)
- **Payments:** Stripe (subscription model with trial, plus one-time where it fits)
- **Hosting:** Vercel
- **Email:** Resend (with React Email components for templates)
- **Cron and scheduled jobs:** Vercel Cron
- **Analytics:** A Supabase `page_views` table for owned analytics, plus whatever the project layers on top
- **Styling:** Tailwind CSS, mobile-first, no UI libraries unless explicitly added
- **Language:** TypeScript by default

## Environment

- Cha is on Windows and uses PowerShell. All shell commands you suggest must work in PowerShell. Do not give bash-only one-liners without a PowerShell equivalent.
- Local dev is `npm run dev`. Use `npm` not yarn or pnpm unless the repo already uses something else.
- Environment variables live in `.env.local`. Never commit them. Never echo them back in code or logs.

## File and folder conventions

- App routes live under `app/` for App Router projects.
- Reusable components live under `components/`.
- Server-only code (Supabase service role, Stripe secret, Resend) lives in `lib/server/` or in route handlers.
- Client-safe utilities live in `lib/`.
- Database migrations and SQL live in `supabase/migrations/` if present.
- API routes use route handlers (`app/api/.../route.ts`), not the legacy `pages/api`.

## Code style

- TypeScript strict mode on. Fix type errors, do not silence them with `any` or `@ts-ignore`.
- Server components by default. Add `"use client"` only when needed.
- Server-side data fetching first, client fetching only when interactivity demands it.
- Tailwind utility classes inline. No separate CSS files unless the project already has them.
- Comments explain *why*, not *what*. Skip obvious comments.

## What to ask before diverging

If you want to add a new dependency, swap a library, change the routing pattern, or restructure folders, stop and ask first. Defaults exist for a reason. Cha has shipped multiple projects on this stack and consistency across projects is more valuable than micro-optimizing one repo.
