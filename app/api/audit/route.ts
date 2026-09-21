import { NextRequest, NextResponse } from "next/server";
import ProjectInquiryEmail from "@/emails/ProjectInquiryEmail";
import { normalizeLeadContext } from "@/lib/lead-context";
import { validateProjectInquiry } from "@/lib/project-inquiry";
import { getRequiredEnv } from "@/lib/server/env";
import { getResend } from "@/lib/server/resend";
import { rateLimited, readLimitedJson, verifyHuman } from "@/lib/server/inquiry-protection";
export const runtime = "nodejs";
// Keep the endpoint, but never accept the old unverified audit payload.
export async function POST(request: NextRequest) {
  const respond = (body: { ok?: boolean; error?: string }, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const expected = new URL(request.url);
  if (request.headers.get("origin") !== expected.origin || request.headers.get("sec-fetch-site") === "cross-site") return respond({ error: "Please send your inquiry from the website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return respond({ error: "Please use the project inquiry form, or email chuck@chuckbaryames.com." }, 415);
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return respond({ error: "Too many attempts. Please try later or email chuck@chuckbaryames.com." }, 429);
  let payload: unknown;
  try { payload = await readLimitedJson(request); } catch { return respond({ error: "The request is invalid or too large." }, 400); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return respond({ error: "Invalid request." }, 400);
  const data = payload as Record<string, unknown>;
  if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) return respond({ ok: true });
  const parsed = validateProjectInquiry(data);
  if (!parsed.value) return respond({ error: parsed.error }, 400);
  const token = typeof data.turnstileToken === "string" ? data.turnstileToken : "";
  if (!token || token.length > 2048) return respond({ error: "Please complete the security check and try again." }, 400);
  const requestId = typeof data.requestId === "string" ? data.requestId : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) return respond({ error: "Please refresh the page and try again." }, 400);
  try {
    // Missing configuration and verification outages must never bypass the check.
    const secret = getRequiredEnv("TURNSTILE_SECRET_KEY");
    if (!await verifyHuman(token, expected.hostname, secret)) return respond({ error: "The security check expired or failed. Please try again." }, 400);
    const result = await getResend().emails.send({
      from: getRequiredEnv("FROM_EMAIL"), to: getRequiredEnv("ADMIN_EMAIL"),
      replyTo: parsed.value.email, subject: `Project inquiry: ${parsed.value.business}`,
      react: ProjectInquiryEmail({ ...parsed.value, ...normalizeLeadContext(data.context) }),
    }, { idempotencyKey: `project-inquiry/${requestId}` });
    if (result.error) throw new Error("Delivery failed");
    // Avoid sending automatic mail to an unverified submitted address.
    return respond({ ok: true });
  } catch {
    console.error("Project inquiry verification or delivery unavailable.");
    return respond({ error: "I could not confirm delivery. Please email chuck@chuckbaryames.com, or try again shortly." }, 503);
  }
}
