import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, it } from "node:test";
import ts from "typescript";
import { normalizeLeadContext } from "../lib/lead-context.ts";
import { serviceLabels } from "../lib/services.ts";
import { validateIntakePayload } from "../lib/intake.ts";

function moduleFrom(file: string, imports: Record<string, unknown> = {}, globals: Record<string, unknown> = {}) {
  const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports: Record<string, unknown> = {};
  runInNewContext(code, { exports, require: (name: string) => { assert.ok(name in imports, `Unexpected import: ${name}`); return imports[name]; }, URL, URLSearchParams, Map, Set, Date, Response, Request, TextDecoder, AbortSignal, console: { error: () => undefined }, ...globals });
  return exports;
}

type Options = { verify?: Record<string, unknown> | "throws"; env?: Record<string, string>; emailError?: boolean; emailThrows?: boolean };
function routeWith(options: Options = {}) {
  const sent: Array<{ message: Record<string, unknown>; options: Record<string, unknown> | undefined }> = [];
  let checks = 0;
  const verification = moduleFrom("../lib/server/turnstile.ts", {}, {
    process: { env: options.env ?? { TURNSTILE_SECRET_KEY: "unit-test-secret", NODE_ENV: "production", VERCEL_ENV: "production" } },
    fetch: async () => { checks++; if (options.verify === "throws") throw new Error("Offline"); return Response.json(options.verify ?? { success: true, hostname: "chuckbaryames.com", action: "project_inquiry" }); },
  });
  const security = moduleFrom("../lib/server/form-security.ts");
  const route = moduleFrom("../app/api/audit/route.ts", {
    "next/server": { NextResponse: { json: Response.json } },
    "@/emails/ProjectInquiryEmail": { __esModule: true, default: (x: unknown) => x },
    "@/lib/lead-context": { normalizeLeadContext }, "@/lib/services": { serviceLabels },
    "@/lib/server/turnstile": verification, "@/lib/server/form-security": security,
    "@/lib/server/env": { getRequiredEnv: () => "admin@example.com" },
    "@/lib/server/resend": { getResend: () => ({ emails: { send: async (message: Record<string, unknown>, emailOptions?: Record<string, unknown>) => { sent.push({ message, options: emailOptions }); if (options.emailThrows) throw new Error("Offline"); return { error: options.emailError ? {} : null }; } } }) },
  });
  const post = route.POST as (request: Request) => Promise<Response>;
  function submit(payload: unknown, headers: Record<string, string> = {}, native = false) {
    return post(new Request("https://chuckbaryames.com/api/audit", { method: "POST", headers: { origin: "https://chuckbaryames.com", "content-type": native ? "application/x-www-form-urlencoded" : "application/json", ...headers }, body: native ? new URLSearchParams(payload as Record<string, string>) : JSON.stringify(payload) }));
  }
  return { sent, submit, post, checks: () => checks };
}
const valid = { name: "Test Owner", email: "owner@example.com", website: "example.com", problem: "I need a website for my local business.", turnstileToken: "valid-unit-test-token", submissionId: "12345678-1234-4234-8234-123456789abc" };

describe("Protected project inquiry", () => {
  it("delivers one admin email only after verification, with a retry idempotency key", async () => {
    const r = routeWith(); const response = await r.submit(valid);
    assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true });
    assert.equal(r.checks(), 1); assert.equal(r.sent.length, 1); assert.equal(r.sent[0].message.to, "admin@example.com");
    assert.equal(r.sent[0].message.replyTo, valid.email); assert.equal(r.sent[0].options?.idempotencyKey, `project-inquiry/${valid.submissionId}`);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
  it("accepts a new business with no website", async () => { const r = routeWith(); assert.equal((await r.submit({ ...valid, website: "" })).status, 200); });
  it("preserves all new service selections and source labels", async () => {
    for (const offer of ["landing-page", "business-website", "website-ads", "focused-help"]) {
      const r = routeWith(); assert.equal((await r.submit({ ...valid, context: { offer, source: "linkedin", campaign: "launch" } })).status, 200);
      const fields = r.sent[0].message.react as { service: string; context: { offer: string; source: string } };
      assert.equal(fields.context.offer, offer); assert.equal(fields.context.source, "linkedin"); assert.ok(fields.service.length > 0);
    }
  });
  for (const [label, token] of [["missing", undefined], ["empty", ""], ["oversized", "a".repeat(2049)]]) {
    it(`blocks ${label} challenge without email or verification calls`, async () => { const r = routeWith(); assert.equal((await r.submit({ ...valid, turnstileToken: token })).status, 400); assert.equal(r.sent.length, 0); assert.equal(r.checks(), 0); });
  }
  for (const result of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: true, hostname: "evil.example", action: "project_inquiry" },
    { success: true, hostname: "chuckbaryames.com", action: "other_form" },
    { success: true, action: "project_inquiry" },
    { success: "true", hostname: "chuckbaryames.com", action: "project_inquiry" },
  ]) it(`rejects invalid verification ${JSON.stringify(result)}`, async () => { const r = routeWith({ verify: result }); assert.equal((await r.submit(valid)).status, 400); assert.equal(r.sent.length, 0); });
  it("accepts www hostname", async () => { const r = routeWith({ verify: { success: true, hostname: "www.chuckbaryames.com", action: "project_inquiry" } }); assert.equal((await r.submit(valid)).status, 200); });
  it("fails closed during a Cloudflare outage", async () => { const r = routeWith({ verify: "throws" }); assert.equal((await r.submit(valid)).status, 503); assert.equal(r.sent.length, 0); });
  it("fails closed without a configured secret", async () => { const r = routeWith({ env: {} }); assert.equal((await r.submit(valid)).status, 503); assert.equal(r.sent.length, 0); assert.equal(r.checks(), 0); });
  it("rejects public test secrets in Vercel production", async () => { const r = routeWith({ env: { TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA", VERCEL_ENV: "production" } }); assert.equal((await r.submit(valid)).status, 503); assert.equal(r.checks(), 0); });
  it("rejects a forged origin before side effects", async () => { const r = routeWith(); assert.equal((await r.submit(valid, { origin: "https://attacker.example" })).status, 403); assert.equal(r.checks(), 0); });
  it("rejects cross-site fetches", async () => { const r = routeWith(); assert.equal((await r.submit(valid, { "sec-fetch-site": "cross-site" })).status, 403); });
  it("accepts a matching public Host when Next uses an internal URL", async () => {
    const r = routeWith();
    const response = await r.post(new Request("https://localhost/api/audit", { method: "POST", headers: { origin: "https://chuckbaryames.com", host: "chuckbaryames.com", "content-type": "application/json" }, body: JSON.stringify(valid) }));
    assert.equal(response.status, 200); assert.equal(r.sent.length, 1);
  });
  it("rejects mismatched hosts, schemes, and forged forwarded-host headers", async () => {
    const cases: Record<string, string>[] = [{host:"attacker.example"}, {origin:"http://chuckbaryames.com"}, {origin:"https://attacker.example", "x-forwarded-host":"attacker.example"}, {origin:"null"}, {origin:"https://chuckbaryames.com/path"}];
    for (const headers of cases) {
      const r = routeWith(); assert.equal((await r.submit(valid, headers)).status, 403); assert.equal(r.checks(), 0);
    }
  });
  it("bounds the actual request body without Content-Length", async () => { const r = routeWith(); assert.equal((await r.submit({ ...valid, problem: "x".repeat(17000) })).status, 413); assert.equal(r.checks(), 0); });
  it("rejects an unsupported content type", async () => { const r = routeWith(); assert.equal((await r.submit(valid, { "content-type": "text/plain" })).status, 415); });
  it("rejects arrays and malformed JSON", async () => {
    const r = routeWith(); assert.equal((await r.submit([])).status, 400);
    assert.equal((await r.post(new Request("https://chuckbaryames.com/api/audit", { method: "POST", headers: { origin: "https://chuckbaryames.com", "content-type": "application/json" }, body: "{" }))).status, 400);
  });
  it("does not report success if delivery fails", async () => { for (const options of [{ emailError: true }, { emailThrows: true }]) { const r = routeWith(options); const response = await r.submit(valid); assert.equal(response.status, 503); assert.equal((await response.json()).ok, undefined); } });
  it("ignores a filled honeypot without side effects", async () => { const r = routeWith(); assert.equal((await r.submit({ ...valid, companyWebsite: "spam" })).status, 200); assert.equal(r.sent.length, 0); assert.equal(r.checks(), 0); });
  it("rejects unsafe or malformed website values", async () => { for (const website of ["localhost", "https://user:password@example.com", "javascript:alert(1)"]) { const r = routeWith(); assert.equal((await r.submit({ ...valid, website })).status, 400); assert.equal(r.sent.length, 0); } });
  it("validates required message and email before verification", async () => { for (const field of [{ problem: "" }, { email: "invalid" }, { name: "A\r\nB" }]) { const r = routeWith(); assert.equal((await r.submit({ ...valid, ...field })).status, 400); assert.equal(r.checks(), 0); } });
  it("enforces a per-instance attempt cap", async () => { const r = routeWith(); for (let i = 0; i < 6; i++) await r.submit({}); assert.equal((await r.submit(valid)).status, 429); assert.equal(r.sent.length, 0); });
  it("requires CAPTCHA for native POSTs too", async () => { const r = routeWith(); const response = await r.submit({ ...valid, turnstileToken: "", email: "owner@example.com" }, {}, true); assert.equal(response.status, 400); assert.match(await response.text(), /security check/); assert.equal(r.sent.length, 0); });
  it("accepts a native request with a valid CAPTCHA field", async () => { const r = routeWith(); const { turnstileToken, ...form } = valid; const response = await r.submit({ ...form, "cf-turnstile-response": turnstileToken }, {}, true); assert.equal(response.status, 200); assert.match(await response.text(), /inquiry was received/); });
});
describe("Lead context privacy", () => {
  it("rejects personal information and arbitrary fields", () => { assert.deepEqual(normalizeLeadContext({ source: "owner@example.com", medium: "https://example.com", campaign: "safe", offer: "arbitrary", password: "x" }), { source: "", medium: "", campaign: "safe", offer: "" }); });
});

describe("Legacy checkout CAPTCHA gates", () => {
  const intake = { fullName: "Jane Smith", email: "jane@example.com", businessName: "Local business", businessDescription: "A local service business serving homeowners.", targetCustomer: "Homeowners in the local area.", primaryGoal: "Book a call/consultation", offerDescription: "A helpful service for local homeowners.", benefits: "Clear service, easy booking, and helpful staff.", domainStatus: "Yes, I have one", deadlinePreference: "ASAP, within 48 hours" };
  const video = { full_name: "Jane Smith", email: "jane@example.com", business_name: "Local business", brand_offer: "A local service", target_audience: "Local homeowners", style_preference: "recommend_one", product_type: "single" };
  for (const [endpoint, payload, action] of [["intake", intake, "landing_intake"], ["video-order", video, "video_order"]] as const) {
    it(`${endpoint} blocks before database or checkout access`, async () => {
      let effects = 0, checkedAction = "";
      const route = moduleFrom(`../app/api/${endpoint}/route.ts`, {
        "next/server": { NextResponse: { json: Response.json } },
        "@/lib/intake": { validateIntakePayload },
        "@/lib/server/env": {},
        "@/lib/server/form-security": moduleFrom("../lib/server/form-security.ts"),
        "@/lib/server/turnstile": { verifyTurnstile: async (_token: unknown, value: string) => { checkedAction = value; return { ok: false, status: 400, error: "Security check required" }; } },
        "@/lib/server/stripe": { getStripe: () => { effects++; throw new Error("Forbidden before CAPTCHA"); } },
        "@/lib/server/supabase": { getSupabaseAdmin: () => { effects++; throw new Error("Forbidden before CAPTCHA"); } },
      });
      const post = route.POST as (r: Request) => Promise<Response>;
      const response = await post(new Request(`https://chuckbaryames.com/api/${endpoint}`, { method: "POST", headers: { origin: "https://chuckbaryames.com", "content-type": "application/json" }, body: JSON.stringify(payload) }));
      assert.equal(response.status, 400); assert.equal(checkedAction, action); assert.equal(effects, 0);
    });
  }
});
