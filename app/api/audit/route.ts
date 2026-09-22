import { NextResponse } from "next/server";
import ProjectInquiryEmail from "@/emails/ProjectInquiryEmail";
import { getRequiredEnv } from "@/lib/server/env";
import { getResend } from "@/lib/server/resend";
import { normalizeLeadContext } from "@/lib/lead-context";
import { serviceLabels } from "@/lib/services";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { FormRequestError, isFormRateLimited, readFormPayload } from "@/lib/server/form-security";

export async function POST(request: Request) {
  const native = request.headers.get("content-type")?.includes("application/x-www-form-urlencoded");
  function respond(body: { ok?: boolean; error?: string }, status = 200) {
    if (!native) return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
    // Only fixed server copy enters this HTML, never submitted fields.
    return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project inquiry | Chuck Baryames</title><main><h1>${body.ok ? "Your inquiry was received." : "Your inquiry could not be sent."}</h1><p>${body.error || "I aim to reply within two business days."}</p><p><a href="mailto:chuck@chuckbaryames.com">Email Chuck</a></p><a href="/">Return to the website</a></main></html>`, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  }
  if (isFormRateLimited(request)) return respond({ error: "Too many requests. Please try again in ten minutes." }, 429);
  let data: Record<string, unknown>;
  try { data = await readFormPayload(request); }
  catch (error) { return respond({ error: error instanceof FormRequestError ? error.message : "Submit the form again." }, error instanceof FormRequestError ? error.status : 400); }
  if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) return respond({ ok: true });
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const websiteInput = typeof data.website === "string" ? data.website.trim() : "";
  const problem = typeof data.problem === "string" ? data.problem.trim() : "";
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)) return respond({ error: "Enter your name." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return respond({ error: "Enter a valid email." }, 400);
  if (problem.length < 10 || problem.length > 2000) return respond({ error: "Tell me a little about your project in 10 to 2,000 characters." }, 400);
  let website = "";
  if (websiteInput) {
    try {
      if (websiteInput.length > 300) throw new Error("Too long");
      const parsed = new URL(/^https?:\/\//i.test(websiteInput) ? websiteInput : `https://${websiteInput}`);
      if (!/^https?:$/.test(parsed.protocol) || parsed.username || parsed.password || !parsed.hostname.includes(".")) throw new Error("Invalid URL");
      website = parsed.toString();
    } catch { return respond({ error: "Enter a valid website address, or leave it blank." }, 400); }
  }
  const verification = await verifyTurnstile(data.turnstileToken ?? data["cf-turnstile-response"], "project_inquiry");
  if (!verification.ok) return respond({ error: verification.error }, verification.status);
  const context = normalizeLeadContext(data.context ?? { offer: data.offer });
  const service = serviceLabels[context.offer] || (context.offer === "focused-help" ? "Focused refresh / Google Ads review" : "Help choosing a service");
  const submissionId = typeof data.submissionId === "string" && /^[a-f0-9-]{36}$/i.test(data.submissionId) ? data.submissionId : undefined;
  try {
    const result = await getResend().emails.send({ from: getRequiredEnv("FROM_EMAIL"), to: getRequiredEnv("ADMIN_EMAIL"), replyTo: email, subject: `Portfolio project: ${service}`, react: ProjectInquiryEmail({ name, email, website, problem, service, context }) }, submissionId ? { idempotencyKey: `project-inquiry/${submissionId}` } : undefined);
    if (result.error) throw new Error("Notification failed");
    // Never send automated mail to an unverified visitor-supplied address.
    return respond({ ok: true });
  } catch { console.error("Project inquiry delivery failed."); return respond({ error: "Your inquiry could not be sent. Please retry or email chuck@chuckbaryames.com." }, 503); }
}
