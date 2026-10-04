"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getLeadContext } from "@/lib/lead-context";
import { trackEvent } from "@/lib/analytics";
import { serviceLabels } from "@/lib/services";
import { Turnstile } from "@/components/Turnstile";

const emptyForm = { name: "", email: "", website: "", problem: "", companyWebsite: "" };
export function AuditLeadForm() {
  const [form, setForm] = useState(emptyForm);
  const [offer, setOffer] = useState("free-review");
  const [submittedOffer, setSubmittedOffer] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false), submissionId = useRef("");
  const submittedPayload = useRef("");
  const successRef = useRef<HTMLDivElement>(null), errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    submissionId.current = crypto.randomUUID();
    const syncOffer = () => { const selected = getLeadContext().offer; setOffer(serviceLabels[selected] ? selected : "free-review"); };
    syncOffer(); window.addEventListener("portfolio-offer", syncOffer); window.addEventListener("popstate", syncOffer);
    return () => { window.removeEventListener("portfolio-offer", syncOffer); window.removeEventListener("popstate", syncOffer); };
  }, []);
  useEffect(() => { if (status === "success") successRef.current?.focus(); if (status === "error") errorRef.current?.focus(); }, [status]);
  function update(name: keyof typeof emptyForm, value: string) {
    setForm(current => ({ ...current, [name]: value }));
    if (status === "error") { setStatus("idle"); setMessage(""); }
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (!token) { setStatus("error"); setMessage("Complete the security check before sending."); return; }
    inFlight.current = true; setStatus("submitting"); setMessage("");
    try {
      const details = { ...form, name: form.name.trim(), email: form.email.trim().toLowerCase(), website: form.website.trim(), problem: form.problem.trim(), context: { ...getLeadContext(), offer } };
      const fingerprint = JSON.stringify(details);
      // Preserve the key for an unchanged retry; edited inquiries need a new key.
      if (submittedPayload.current !== fingerprint) { submissionId.current = crypto.randomUUID(); submittedPayload.current = fingerprint; }
      const response = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...details, turnstileToken: token, submissionId: submissionId.current }), signal: AbortSignal.timeout(25000) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) { setStatus("error"); setMessage(result.error || "Your inquiry could not be sent. Please retry."); return; }
      if (!form.companyWebsite.trim()) trackEvent("generate_lead", { method: details.context.offer === "free-review" ? "website_review" : "project_inquiry", offer: details.context.offer });
      setSubmittedOffer(details.context.offer); setStatus("success"); setForm(emptyForm);
    } catch { setStatus("error"); setMessage("I could not confirm delivery. Your details are still here. Please retry or email me."); }
    finally { inFlight.current = false; setToken(""); setResetKey(value => value + 1); }
  }
  if (status === "success") return <div className="audit-success" role="status" tabIndex={-1} ref={successRef} aria-labelledby="inquiry-success-title">
    <span className="audit-success-mark" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    <h3 id="inquiry-success-title">Your request is in.</h3>
    <p>{submittedOffer === "free-review" ? "I’ll review your website and email three things I’d fix within 2 business days. You don’t need to book a call." : "I’ll review your details and reply personally within 2 business days with a recommended next step."}</p>
    {submittedOffer !== "free-review" && <p className="audit-success-next"><strong>What happens next</strong>If we’re a fit, I’ll send a written scope before asking for a deposit.</p>}
    <button type="button" onClick={() => { submissionId.current = crypto.randomUUID(); setStatus("idle"); }}>Send another inquiry <span aria-hidden="true">↗</span></button>
  </div>;
  return <form className="audit-form" method="post" action="/api/audit" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
    <noscript>The security check needs JavaScript. Please email chuck@chuckbaryames.com about your project.</noscript>
    <div className="audit-form-header"><h3>Send your website or project.</h3><p>I’ll reply personally within 2 business days.</p></div>
    <label className="audit-field"><span>Name <small>Required</small></span><input name="name" minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name" required /></label>
    <label className="audit-field"><span>Email <small>Required</small></span><input name="email" type="email" maxLength={160} autoComplete="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@business.com" required /></label>
    <label className="audit-field"><span>Website <small>{offer === "free-review" ? "Required for a free review" : "Optional"}</small></span><input name="website" maxLength={300} inputMode="url" autoComplete="url" value={form.website} onChange={e => update("website", e.target.value)} placeholder="yourbusiness.com" required={offer === "free-review"} /></label>
    <label className="audit-field"><span>What do you need?</span><select name="offer" value={offer} onChange={e => setOffer(e.target.value)}>{Object.entries(serviceLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}<option value="">Help me choose</option></select></label>
    <label className="audit-field"><span>Message <small>Optional</small></span><textarea name="problem" maxLength={2000} rows={3} value={form.problem} onChange={e => update("problem", e.target.value)} placeholder="Tell me what your business does and what you’d like to improve." /></label>
    <label className="audit-honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={e => update("companyWebsite", e.target.value)} /></label>
    <Turnstile action="project_inquiry" onToken={setToken} resetKey={resetKey} />
    {status === "error" && <div className="audit-error" role="alert" tabIndex={-1} ref={errorRef}>{message} <a href="mailto:chuck@chuckbaryames.com?subject=Website%20project">Email me directly.</a></div>}
    <button className="audit-submit" type="submit" disabled={status === "submitting" || !token}>{status === "submitting" ? "Sending your request..." : "Send my request"}</button>
    <p className="audit-privacy">I use your details to reply to your request. This does not add you to a mailing list. Read the <a href="/privacy">Privacy Policy</a> for details about the form, analytics, and the Cloudflare security check.</p>
  </form>;
}
