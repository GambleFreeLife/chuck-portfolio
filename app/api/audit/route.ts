import { NextRequest, NextResponse } from "next/server";
import AuditConfirmationEmail from "@/emails/AuditConfirmationEmail";
import AuditRequestWithContextEmail from "@/emails/AuditRequestWithContextEmail";
import { getOptionalEnv, getRequiredEnv } from "@/lib/server/env";
import { getResend } from "@/lib/server/resend";

import { normalizeLeadContext } from "@/lib/lead-context";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 6;

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if ((parsed.protocol !== "http:" && parsed.protocol !== "https:") || parsed.username || parsed.password || !parsed.hostname.includes(".")) {
    throw new Error("Unsupported protocol");
  }

  return parsed.toString();
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  for (const [key, value] of rateLimit) { if (value.resetAt <= now) rateLimit.delete(key); }
  if (rateLimit.size >= 5000 && !rateLimit.has(ip)) return true;
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const nativeForm = request.headers.get("content-type")?.includes("application/x-www-form-urlencoded") ?? false;
  function respond(body: { ok?: boolean; error?: string }, options?: { status: number }) {
    if (!nativeForm) return NextResponse.json(body, options);
    const heading = body.ok ? "Your website review request was received." : "Your request could not be sent.";
    // Only fixed server messages enter this HTML response, never submitted values.
    const detail = body.ok ? "I will review your site and reply by email. I aim to respond within two business days." : body.error;
    return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Website review | Chuck Baryames</title><body><main><h1>${heading}</h1><p>${detail}</p><p><a href="mailto:chuck@chuckbaryames.com">Email Chuck</a></p><p><a href="/">Return to the website</a></p></main></body></html>`, { status: options?.status ?? 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  }
  if (isRateLimited(getClientIp(request))) {
    return respond({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = nativeForm ? Object.fromEntries(await request.formData()) : await request.json();
  } catch {
    return respond({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return respond({ error: "Invalid request." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const honeypot = typeof data.companyWebsite === "string" ? data.companyWebsite.trim() : "";

  if (honeypot.length > 0) {
    return respond({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const websiteInput = typeof data.website === "string" ? data.website.trim() : "";
  const problem = typeof data.problem === "string" ? data.problem.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return respond({ error: "Enter your name." }, { status: 400 });
  }

  if (!emailPattern.test(email) || email.length > 160) {
    return respond({ error: "Enter a valid email." }, { status: 400 });
  }

  if (websiteInput.length < 3 || websiteInput.length > 300) {
    return respond({ error: "Enter your website." }, { status: 400 });
  }

  if (problem.length > 1000) {
    return respond({ error: "Keep the optional note under 1,000 characters." }, { status: 400 });
  }

  let website: string;

  try {
    website = normalizeWebsite(websiteInput);
  } catch {
    return respond({ error: "Enter a valid website address." }, { status: 400 });
  }

  try {
    const resend = getResend();
    const from = getRequiredEnv("FROM_EMAIL");
    const adminEmail = getRequiredEnv("ADMIN_EMAIL");
    const replyTo = getOptionalEnv("REPLY_TO_EMAIL");

    const adminResult = await resend.emails.send({
      from,
      to: adminEmail,
      replyTo: email,
      subject: `Website audit request: ${new URL(website).hostname}`,
      react: AuditRequestWithContextEmail({
        name,
        email,
        website,
        problem: problem || null,
        ...normalizeLeadContext(data.context),
      }),
    });

    if (adminResult.error) {
      throw new Error("Admin notification failed");
    }

    // Once the admin email is accepted, a confirmation failure must not invite duplicate submissions.
    try {
      const confirmationResult = await resend.emails.send({
        from,
        to: email,
        ...(replyTo ? { replyTo } : {}),
        subject: "I got your website",
        react: AuditConfirmationEmail({ name, website }),
      });
      if (confirmationResult.error) console.error("Audit confirmation email failed after lead delivery.");
    } catch {
      console.error("Audit confirmation email failed after lead delivery.");
    }

    return respond({ ok: true });
  } catch {
    return respond(
      {
        error: "I could not send the audit request right now. Email chuck@chuckbaryames.com instead.",
      },
      { status: 503 },
    );
  }
}
