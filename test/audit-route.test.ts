import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, it } from "node:test";
import ts from "typescript";
import { normalizeLeadContext } from "../lib/lead-context.ts";

// Exercise the actual route with a stubbed email provider; never send real email.
function routeWith(outcomes: Array<"accepted" | "rejected" | "throws">) {
  const sent: Array<Record<string, unknown>> = [];
  const code = ts.transpileModule(readFileSync(new URL("../app/api/audit/route.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports: Record<string, unknown> = {};
  const json = (body: unknown, options?: { status: number }) => ({ body, status: options?.status ?? 200 });
  const stubs: Record<string, unknown> = {
    "next/server": { NextResponse: { json } },
    "@/emails/AuditConfirmationEmail": { __esModule: true, default: (x: unknown) => x },
    "@/emails/AuditRequestWithContextEmail": { __esModule: true, default: (x: unknown) => x },
    "@/lib/lead-context": { normalizeLeadContext },
    "@/lib/server/env": { getOptionalEnv: () => undefined, getRequiredEnv: () => "test@example.com" },
    "@/lib/server/resend": { getResend: () => ({ emails: { send: async (message: Record<string, unknown>) => {
      sent.push(message); const outcome = outcomes.shift() ?? "accepted";
      if (outcome === "throws") throw new Error("Provider unavailable");
      return { error: outcome === "rejected" ? { message: "Rejected" } : null };
    } } }) },
  };
  runInNewContext(code, { exports, require: (name: string) => { assert.ok(name in stubs, `Unexpected import: ${name}`); return stubs[name]; }, URL, Map, Date, Response, console: { error: () => undefined } });
  const post = exports.POST as (req: unknown) => Promise<{ status: number; body: { ok?: boolean; error?: string } }>;
  return { sent, submitNative: (payload: Record<string, string>) => post({ headers: new Headers({ "content-type": "application/x-www-form-urlencoded" }), formData: async () => new Map(Object.entries(payload)) }) as unknown as Promise<Response>, submit: (payload: unknown) => post({ headers: new Headers(), json: async () => payload }) };
}
const valid = { name: "Test Owner", email: "owner@example.com", website: "example.com", problem: "Button issue" };
describe("Audit request delivery", () => {
  it("accepts a native form without JavaScript and returns a readable receipt", async () => { const r = routeWith(["accepted", "accepted"]); const result = await r.submitNative(valid); assert.equal(result.status, 200); assert.match(result.headers.get("content-type") ?? "", /text\/html/); assert.match(await result.text(), /request was received/); assert.equal(r.sent.length, 2); });
  it("shows native-form errors without reflecting submitted personal details", async () => { const r = routeWith([]); const result = await r.submitNative({ ...valid, email: "invalid-personal-value" }); assert.equal(result.status, 400); const html = await result.text(); assert.match(html, /Enter a valid email/); assert.doesNotMatch(html, /invalid-personal-value/); assert.equal(r.sent.length, 0); });
  it("acknowledges a delivered lead", async () => { const r = routeWith(["accepted", "accepted"]); const result = await r.submit(valid); assert.equal(result.status, 200); assert.equal(result.body.ok, true); assert.equal(r.sent.length, 2); });
  it("still acknowledges the lead if confirmation throws", async () => { const r = routeWith(["accepted", "throws"]); const result = await r.submit(valid); assert.equal(result.status, 200); assert.equal(result.body.ok, true); });
  it("still acknowledges the lead if confirmation is rejected", async () => { const r = routeWith(["accepted", "rejected"]); assert.equal((await r.submit(valid)).body.ok, true); });
  it("does not claim delivery when the admin notification fails", async () => { const r = routeWith(["rejected"]); const result = await r.submit(valid); assert.equal(result.status, 503); assert.equal(result.body.ok, undefined); assert.equal(r.sent.length, 1); });
  it("rejects malformed addresses and keeps invalid leads out of email", async () => { for (const website of ["localhost", "https://user:password@example.com", "javascript:alert(1)"]) { const r = routeWith([]); assert.equal((await r.submit({ ...valid, website })).status, 400); assert.equal(r.sent.length, 0); } });
  it("ignores the honeypot without sending mail", async () => { const r = routeWith([]); assert.equal((await r.submit({ ...valid, companyWebsite: "spam" })).status, 200); assert.equal(r.sent.length, 0); });
  it("validates source labels and carries offer interest to the admin", async () => { const r = routeWith([]); await r.submit({ ...valid, context: { source: "linkedin", medium: "outreach", campaign: "lansing-week1", offer: "quick-win" } }); const fields = r.sent[0].react as Record<string,unknown>; assert.equal(fields.source, "linkedin"); assert.equal(fields.offer, "quick-win"); assert.equal(fields.website, "https://example.com/"); });
});
describe("Lead source hygiene", () => {
  it("drops emails, URLs and unsupported fields", () => { assert.deepEqual(normalizeLeadContext({ source: "owner@example.com", medium: "https://example.com", campaign: "safe-campaign", offer: "arbitrary", password: "example" }), { source: "", medium: "", campaign: "safe-campaign", offer: "" }); });
});
