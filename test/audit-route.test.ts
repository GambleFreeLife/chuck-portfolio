import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, it } from "node:test";
import ts from "typescript";
import { normalizeLeadContext } from "../lib/lead-context.ts";
import { validateProjectInquiry } from "../lib/project-inquiry.ts";
import { readLimitedJson, verifyHuman, rateLimited } from "../lib/server/inquiry-protection.ts";

const valid = { name: "Test Owner", email: "owner@example.com", business: "Example Company", website: "example.com", problem: "We offer cleaning in Lansing and want more quote requests.", service: "landing-page", budget: "1250-2499", timeline: "this-month", contactMethod: "email", phone: "", authorized: true, turnstileToken: "test-response", requestId: "82a402f0-e0f4-4140-a679-435a435aa254" };
function routeWith(options: { human?: boolean; missingSecret?: boolean; deliveryFails?: boolean; limited?: boolean; verificationThrows?: boolean } = {}) {
  const sent: Array<{ message: Record<string, unknown>; options: Record<string, unknown> }> = [];
  let checks = 0;
  const code = ts.transpileModule(readFileSync(new URL("../app/api/audit/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports: Record<string, unknown> = {};
  const stubs: Record<string, unknown> = {
    "next/server": { NextResponse: { json: (body: unknown, opts: ResponseInit) => Response.json(body, opts) } },
    "@/emails/ProjectInquiryEmail": { __esModule: true, default: (x: unknown) => x },
    "@/lib/lead-context": { normalizeLeadContext },
    "@/lib/project-inquiry": { validateProjectInquiry },
    "@/lib/server/inquiry-protection": { readLimitedJson, rateLimited: () => !!options.limited, verifyHuman: async () => { checks++; if (options.verificationThrows) throw new Error(); return options.human !== false; } },
    "@/lib/server/env": { getRequiredEnv: (name: string) => { if (name === "TURNSTILE_SECRET_KEY" && options.missingSecret) throw new Error(); return "test-only"; } },
    "@/lib/server/resend": { getResend: () => ({ emails: { send: async (message: Record<string, unknown>, opts: Record<string, unknown>) => { sent.push({ message, options: opts }); return { error: options.deliveryFails ? { message: "Rejected" } : null }; } } }) },
  };
  runInNewContext(code, { exports, require: (name: string) => { assert.ok(name in stubs, name); return stubs[name]; }, URL, console: { error: () => undefined } });
  const post = exports.POST as (request: Request) => Promise<Response>;
  return { sent, checks: () => checks, submit: (payload: unknown = valid, headers: Record<string, string> = {}) => post(new Request("https://chuckbaryames.com/api/audit", { method: "POST", headers: { "content-type": "application/json", origin: "https://chuckbaryames.com", ...headers }, body: JSON.stringify(payload) })) };
}
describe("Qualified inquiry endpoint", () => {
  it("delivers only one owner notification after verification", async () => {
    const r = routeWith(); const response = await r.submit({ ...valid, context: { source: "linkedin", medium: "outreach", offer: "landing-page" } });
    assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true }); assert.equal(r.checks(), 1); assert.equal(r.sent.length, 1);
    assert.equal(r.sent[0].message.replyTo, valid.email); assert.equal(r.sent[0].options.idempotencyKey, `project-inquiry/${valid.requestId}`);
    const fields = r.sent[0].message.react as Record<string, unknown>; assert.equal(fields.source, "linkedin"); assert.equal(fields.service, "landing-page");
  });
  it("rejects the old audit-only spam payload before mail", async () => { const r = routeWith(); assert.equal((await r.submit({ name: "Charles Rodriguez", email: "someone@example.com", website: "example.com", problem: "Please add me to your newsletter and send updates by email." })).status, 400); assert.equal(r.sent.length, 0); });
  it("requires token, valid action verification, and configuration", async () => {
    for (const opts of [{ human: false }, { missingSecret: true }, { verificationThrows: true }]) { const r = routeWith(opts); assert.ok((await r.submit()).status >= 400); assert.equal(r.sent.length, 0); }
    const r = routeWith(); assert.equal((await r.submit({ ...valid, turnstileToken: "" })).status, 400); assert.equal(r.sent.length, 0);
  });
  it("rejects cross-origin and legacy native form requests", async () => { const r = routeWith(); assert.equal((await r.submit(valid, { origin: "https://other.example" })).status, 403); assert.equal((await r.submit(valid, { origin: "" })).status, 403); assert.equal((await r.submit(valid, { "content-type": "application/x-www-form-urlencoded" })).status, 415); assert.equal(r.sent.length, 0); });
  it("does not email honeypots, malformed payloads, oversized input, or throttled clients", async () => {
    const r = routeWith(); assert.equal((await r.submit({ ...valid, companyWebsite: "spam" })).status, 200);
    assert.equal((await r.submit(null)).status, 400); assert.equal((await r.submit([valid])).status, 400);
    assert.equal((await r.submit({ ...valid, problem: "x".repeat(13000) })).status, 400); assert.equal(r.sent.length, 0);
    assert.equal((await routeWith({ limited: true }).submit()).status, 429);
  });
  it("does not claim success when email fails", async () => { const r = routeWith({ deliveryFails: true }); const response = await r.submit(); assert.equal(response.status, 503); assert.equal((await response.json()).ok, undefined); });
  it("requires real qualification selections and an optional phone only for calls", () => {
    for (const replacement of [{ service: "arbitrary" }, { budget: "" }, { authorized: "true" }, { problem: "hello" }, { business: "" }, { contactMethod: "call", phone: "" }, { phone: "not-a-number" }, { service: "lead-generation", adBudget: "" }]) assert.ok(validateProjectInquiry({ ...valid, ...replacement }).error);
    assert.ok(validateProjectInquiry({ ...valid, website: "", phone: "" }).value);
    assert.ok(validateProjectInquiry({ ...valid, contactMethod: "call", phone: "+1 (517) 555-0123" }).value);
    assert.ok(validateProjectInquiry({ ...valid, service: "lead-generation", adBudget: "1000-1999" }).value);
  });
  it("rejects unsafe website addresses and sanitizes attribution", () => {
    for (const website of ["localhost", "https://user:pass@example.com", "javascript:alert(1)", "127.0.0.1", "host.internal"]) assert.ok(validateProjectInquiry({ ...valid, website }).error);
    assert.deepEqual(normalizeLeadContext({ source: "owner@example.com", medium: "https://example.com", campaign: "safe", offer: "arbitrary" }), { source: "", medium: "", campaign: "safe", offer: "" });
  });
});
describe("Server bot verification", () => {
  it("checks success, hostname, and action, including replay rejection", async () => {
    const original = globalThis.fetch;
    try {
      for (const [result, expected] of [
        [{ success: true, hostname: "chuckbaryames.com", action: "project_inquiry" }, true],
        [{ success: false, "error-codes": ["timeout-or-duplicate"] }, false],
        [{ success: true, hostname: "attacker.example", action: "project_inquiry" }, false],
        [{ success: true, hostname: "chuckbaryames.com", action: "other" }, false],
      ] as const) {
        globalThis.fetch = async () => Response.json(result);
        assert.equal(await verifyHuman("test", "chuckbaryames.com", "test-only"), expected);
      }
      assert.equal(await verifyHuman("", "chuckbaryames.com", "test-only"), false);
      assert.equal(await verifyHuman("test", "chuckbaryames.com", ""), false);
    } finally { globalThis.fetch = original; }
  });
  it("expires a per-instance rate limit and rejects oversized chunked bodies", async () => {
    for (let i = 0; i < 5; i++) assert.equal(rateLimited("test-ip", 1), false);
    assert.equal(rateLimited("test-ip", 1), true); assert.equal(rateLimited("test-ip", 3600002), false);
    const request = new Request("https://example.com", { method: "POST", body: JSON.stringify({ large: "x".repeat(12001) }) });
    await assert.rejects(() => readLimitedJson(request));
  });
});
