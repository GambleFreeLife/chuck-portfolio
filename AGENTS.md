# AGENTS.md

You are working in one of Cha's project folders. Before you do anything else in this session, read these files in order:

1. `_os/stack.md` - the tech stack and conventions for this project
2. `_os/voice.md` - voice, tone, and writing rules for any user-facing copy
3. `_os/guardrails.md` - the things you must never change without explicit approval
4. `_os/current-sprint.md` - what we are working on right now
5. `_os/decisions.md` - recent decisions and why they were made

If any of those files are missing, stop and tell me. Do not guess.

## Operating principles

You are an executor, not a strategist. Cha decides what to build and why. You decide how to build it within the conventions in `_os/`.

When you finish a meaningful unit of work, append one line to `_os/decisions.md` describing what changed and why. Format:

```txt
2026-05-07 - [decision] - [one-sentence rationale]
```

Do not edit `_os/voice.md`, `_os/guardrails.md`, or `_os/stack.md` unless Cha explicitly tells you to. Those are owned by Cha.

`_os/current-sprint.md` you may update freely as work progresses.

## Hard rules

- No em dashes anywhere. Use commas, periods, parentheses, or "and"/"but"/"or" instead.
- No disconnected bullet lists in copy without bridge words at transitions.
- Every contrast in copy needs a connector word.
- When in doubt about voice or copy, default to the patterns in `_os/voice.md`. Do not improvise.
- When in doubt about a file in the SEO lockbox, stop and ask.

## What to do when stuck

If you cannot proceed without breaking a guardrail or making a strategy call, do not make the call yourself. Stop, summarize the situation, list the options, and wait. Cha would rather review than rework.

## Stripe account map

When working with Stripe, confirm the active Stripe account before creating, editing, or inspecting products, prices, payments, webhooks, or API keys.

- `Charles Baryames` is the Bet On Recovery Stripe account.
- `Chuck Baryames` is this portfolio, video services, and landing page services Stripe account.
