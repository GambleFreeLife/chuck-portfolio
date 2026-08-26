import { NextRequest, NextResponse } from "next/server";
import AuditConfirmationEmail from "@/emails/AuditConfirmationEmail";
import AuditRequestEmail from "@/emails/AuditRequestEmail";
import { getOptionalEnv, getRequiredEnv } from "@/lib/server/env";
import { getResend } from "@/lib/server/resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 6;

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Unsupported protocol");
  }

  return parsed.toString();
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const honeypot = typeof data.companyWebsite === "string" ? data.companyWebsite.trim() : "";

  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const websiteInput = typeof data.website === "string" ? data.website.trim() : "";
  const problem = typeof data.problem === "string" ? data.problem.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }

  if (!emailPattern.test(email) || email.length > 160) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  if (websiteInput.length < 3 || websiteInput.length > 300) {
    return NextResponse.json({ error: "Enter your website." }, { status: 400 });
  }

  if (problem.length > 1000) {
    return NextResponse.json({ error: "Keep the optional note under 1,000 characters." }, { status: 400 });
  }

  let website: string;

  try {
    website = normalizeWebsite(websiteInput);
  } catch {
    return NextResponse.json({ error: "Enter a valid website address." }, { status: 400 });
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
      react: AuditRequestEmail({
        name,
        email,
        website,
        problem: problem || null,
      }),
    });

    if (adminResult.error) {
      throw new Error("Admin notification failed");
    }

    const confirmationResult = await resend.emails.send({
      from,
      to: email,
      ...(replyTo ? { replyTo } : {}),
      subject: "I got your website",
      react: AuditConfirmationEmail({ name, website }),
    });

    if (confirmationResult.error) {
      console.error("Audit confirmation email failed after lead delivery.");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "I could not send the audit request right now. Email chuck@chuckbaryames.com instead.",
      },
      { status: 503 },
    );
  }
}
