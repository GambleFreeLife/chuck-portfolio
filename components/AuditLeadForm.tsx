"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getLeadContext } from "@/lib/lead-context";
import { trackEvent } from "@/lib/analytics";
import { serviceLabels } from "@/lib/services";
import { Turnstile } from "@/components/Turnstile";

const emptyForm = { name: "", email: "", website: "", problem: "", companyWebsite: "" };
export function AuditLeadForm() {
  const [form, setForm] = useState(emptyForm);
  const [offer, setOffer] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false), inFlight = useRef(false), submissionId = useRef("");
  const submittedPayload = useRef("");
  const successRef = useRef<HTMLDivElement>(null), errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    submissionId.current = crypto.randomUUID();
    const syncOffer = () => { const selected = getLeadContext().offer; setOffer(serviceLabels[selected] || selected === "focused-help" ? selected : ""); };
    syncOffer(); window.addEventListener("portfolio-offer", syncOffer); window.addEventListener("popstate", syncOffer);
    return () => { window.removeEventListener("portfolio-offer", syncOffer); window.removeEventListener("popstate", syncOffer); };
  }, []);
  useEffect(() => { if (status === "success") successRef.current?.focus(); if (status === "error") errorRef.current?.focus(); }, [status]);
  function update(name: keyof typeof emptyForm, value: string) {
    if (!started.current && name !== "companyWebsite") { started.current = true; trackEvent("inquiry_form_start", { location: "contact" }); }
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
      trackEvent("generate_lead", { method: "project_inquiry", offer }); setStatus("success"); setForm(emptyForm); started.current = false;
    } catch { setStatus("error"); setMessage("I could not confirm delivery. Your details are still here. Please retry or email me."); }
    finally { inFlight.current = false; setToken(""); setResetKey(value => value + 1); }
  }
  if (status === "success") return <div className="audit-success" role="status" tabIndex={-1} ref={successRef} aria-labelledby="inquiry-success-title">
    <span className="audit-success-mark" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    <h3 id="inquiry-success-title">Inquiry sent.</h3>
    <p>Thanks for telling me about your project. I’ll review your details and reply personally with a recommended next step.</p>
    <p className="audit-success-next"><strong>What happens next</strong>Look for my reply in your inbox, usually within two business days.</p>
    <button type="button" onClick={() => { submissionId.current = crypto.randomUUID(); setStatus("idle"); }}>Send another inquiry <span aria-hidden="true">↗</span></button>
  </div>;
  return <form className="audit-form" method="post" action="/api/audit" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
    <noscript>The security check needs JavaScript. Please email chuck@chuckbaryames.com about your project.</noscript>
    <div className="audit-form-header"><h3>Tell me about your project.</h3><p>A few details are all I need to start.</p></div>
    <label className="audit-field"><span>Name <small>Required</small></span><input name="name" minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name" required /></label>
    <label className="audit-field"><span>Email <small>Required</small></span><input name="email" type="email" maxLength={160} autoComplete="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@business.com" required /></label>
    <label className="audit-field"><span>What can I help with? <small>Optional</small></span><select name="offer" value={offer} onChange={e => setOffer(e.target.value)}><option value="">Help me choose</option>{Object.entries(serviceLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}<option value="focused-help">A refresh or Google Ads review</option></select></label>
    <label className="audit-field"><span>Website <small>Optional</small></span><input name="website" maxLength={300} inputMode="url" autoComplete="url" value={form.website} onChange={e => update("website", e.target.value)} placeholder="yourbusiness.com, if you have one" /></label>
    <label className="audit-field"><span>Your business and project goal <small>Required</small></span><textarea name="problem" minLength={10} maxLength={2000} rows={3} value={form.problem} onChange={e => update("problem", e.target.value)} placeholder="What do you offer, what would you like to improve, and do you have a deadline?" aria-describedby="project-goal-help" required /><small id="project-goal-help">A few sentences are enough. I’ll help you work out the scope.</small></label>
    <label className="audit-honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" value={form.companyWebsite} onChange={e => update("companyWebsite", e.target.value)} /></label>
    <Turnstile action="project_inquiry" onToken={setToken} resetKey={resetKey} />
    {status === "error" && <div className="audit-error" role="alert" tabIndex={-1} ref={errorRef}>{message} <a href="mailto:chuck@chuckbaryames.com?subject=Website%20project">Email me directly.</a></div>}
    <button className="audit-submit" type="submit" disabled={status === "submitting" || !token}>{status === "submitting" ? "Sending your inquiry…" : "Send my project details ↗"}</button>
    <p className="audit-privacy">I use your details to reply about your project. No mailing list. Source labels help me understand how you found me. Cloudflare processes the security check under its <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
  </form>;
}
