"use client";
import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { getLeadContext } from "@/lib/lead-context";
import { trackEvent } from "@/lib/analytics";
import { serviceOptions, budgetOptions, timelineOptions, adBudgetOptions } from "@/lib/project-inquiry";
import s from "./ProjectInquiryForm.module.css";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void; remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const empty = { name: "", email: "", business: "", website: "", phone: "", contactMethod: "email", problem: "", service: "", budget: "", timeline: "", adBudget: "", companyWebsite: "", authorized: false };

export function AuditLeadForm({ initialService = "" }: { initialService?: string }) {
  const [form, setForm] = useState({ ...empty, service: initialService });
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [securityError, setSecurityError] = useState(false);
  const widget = useRef<HTMLDivElement>(null), heading = useRef<HTMLHeadingElement>(null), receipt = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null), requestId = useRef("");
  const inFlight = useRef(false), started = useRef(false);
  useEffect(() => {
    const offer = getLeadContext().offer;
    const aliases: Record<string, string> = { "homepage-redesign": "landing-page", "page-refresh": "recommendation", "quick-win": "recommendation" };
    const selection = aliases[offer] || offer;
    if (Object.hasOwn(serviceOptions, selection)) setForm(current => ({ ...current, service: selection }));
  }, []);
  useEffect(() => { if (step === 2) heading.current?.focus(); }, [step]);
  useEffect(() => { if (status === "success") receipt.current?.focus(); }, [status]);
  useEffect(() => {
    if (step !== 2 || status === "success" || !scriptReady || !siteKey || !widget.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey, action: "project_inquiry", theme: "light", size: "flexible",
      callback: (value: string) => { setToken(value); setSecurityError(false); },
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setSecurityError(true); },
    });
    return () => { if (widgetId.current) window.turnstile?.remove(widgetId.current); widgetId.current = null; setToken(""); };
  }, [step, scriptReady, status === "success"]);

  function update<K extends keyof typeof empty>(name: K, value: (typeof empty)[K]) {
    if (!started.current && name !== "companyWebsite") { started.current = true; trackEvent("project_form_start", { location: "inquiry" }); }
    requestId.current = "";
    setForm(current => ({ ...current, [name]: value }));
    if (status === "error") { setStatus("idle"); setMessage(""); }
  }
  function resetSecurity() {
    setToken(""); setSecurityError(false);
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) { setStep(2); trackEvent("project_form_details", { offer: form.service }); return; }
    if (inFlight.current) return;
    if (!token) { setStatus("error"); setMessage("Please finish the security check, or email me if it cannot load."); return; }
    inFlight.current = true;
    setStatus("submitting"); setMessage("");
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/audit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken: token, requestId: requestId.current, context: { ...getLeadContext(), offer: form.service } }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Please try again or email me directly.");
      trackEvent("generate_lead", { method: "project_inquiry", offer: form.service });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "I could not confirm delivery. Your answers are saved here. Please retry or email me.");
      resetSecurity();
    } finally { inFlight.current = false; }
  }
  function select(name: "service" | "budget" | "timeline" | "adBudget", label: string, choices: Record<string, string>, hint?: string) {
    return <label className={s.field}><span>{label}</span><select name={name} value={form[name]} onChange={event => update(name, event.target.value)} required><option value="" disabled>Select an option</option>{Object.entries(choices).map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select>{hint && <small>{hint}</small>}</label>;
  }
  if (status === "success") return <div className={s.success} role="status" tabIndex={-1} ref={receipt}><span className={s.successMark} aria-hidden="true">✓</span><h3>Your inquiry is on its way to me.</h3><p>I’ll review your goal, budget, and timeline and aim to reply within two business days. If it looks like a fit, we’ll agree on the next step.</p><p>You have not booked a service or been charged.</p><a href="/#work">Take another look at the work</a></div>;
  return <form className={s.form} onSubmit={submit} aria-busy={status === "submitting"}>
    <noscript>Please enable JavaScript for the secure form, or email chuck@chuckbaryames.com about your project.</noscript>
    <div className={s.progress} aria-label={`Step ${step} of 2`}><span className={s.active}>01 / Your project</span><span className={step === 2 ? s.active : ""}>02 / Your details</span></div>
    <h3 tabIndex={-1} ref={heading}>{step === 1 ? "What would you like to improve?" : "Where should I reply?"}</h3>
    <p className={s.lead}>A short project inquiry. No payment and no obligation.</p>
    <fieldset disabled={status === "submitting"}>
      {step === 1 ? <>
        {select("service", "What do you need?", serviceOptions)}
        {select("budget", "Initial budget for my services", budgetOptions, "For ongoing marketing, include setup and the first month. Advertising spend is separate.")}
        {form.service === "lead-generation" && select("adBudget", "Monthly budget paid to Google", adBudgetOptions, "We check local demand and costs before agreeing on a campaign.")}
        {select("timeline", "When would you like to start?", timelineOptions)}
        <label className={s.field}><span>What would make this project worthwhile?</span><textarea name="problem" value={form.problem} onChange={e => update("problem", e.target.value)} minLength={30} maxLength={1500} rows={4} required placeholder="Tell me what you sell, where you serve customers, and what you want to improve." /><small>A few specific sentences help me assess the fit.</small></label>
        <button className={s.submit} type="submit">Continue to contact details <span aria-hidden="true">→</span></button>
      </> : <>
        <div className={s.summary}><strong>{serviceOptions[form.service as keyof typeof serviceOptions]}</strong><button type="button" onClick={() => setStep(1)}>Edit project details</button></div>
        <div className={s.row}><label className={s.field}><span>Your name</span><input name="name" value={form.name} onChange={e => update("name", e.target.value)} autoComplete="name" minLength={2} maxLength={100} required /></label><label className={s.field}><span>Business name</span><input name="business" value={form.business} onChange={e => update("business", e.target.value)} autoComplete="organization" minLength={2} maxLength={120} required /></label></div>
        <label className={s.field}><span>Email address</span><input name="email" value={form.email} onChange={e => update("email", e.target.value)} type="email" autoComplete="email" maxLength={160} required /><small>Use the address you check for business inquiries.</small></label>
        <label className={s.field}><span>Current website <small>Optional</small></span><input name="website" value={form.website} onChange={e => update("website", e.target.value)} autoComplete="url" inputMode="url" maxLength={300} placeholder="yourbusiness.com" /></label>
        <label className={s.field}><span>How should I reply?</span><select name="contactMethod" value={form.contactMethod} onChange={e => update("contactMethod", e.target.value)}><option value="email">Email me first</option><option value="call">Call me about this project</option></select></label>
        <label className={s.field}><span>Phone number <small>{form.contactMethod === "call" ? "Required for a call" : "Optional"}</small></span><input name="phone" value={form.phone} onChange={e => update("phone", e.target.value)} type="tel" autoComplete="tel" maxLength={35} required={form.contactMethod === "call"} /><small>I’ll use your details for this inquiry. You are not joining a marketing text list.</small></label>
        <label className={s.confirm}><input name="authorized" type="checkbox" checked={form.authorized} onChange={e => update("authorized", e.target.checked)} required /><span>I’m asking about a paid project for my business or a business I represent, and I have reviewed the starting prices.</span></label>
        <div className={s.trap} aria-hidden="true"><label>Leave this field empty<input name="companyWebsite" autoComplete="off" tabIndex={-1} value={form.companyWebsite} onChange={e => update("companyWebsite", e.target.value)} /></label></div>
        {siteKey ? <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setScriptReady(true)} onError={() => setSecurityError(true)} /><div ref={widget} className={s.security} />{securityError && <p className={s.error} role="alert">The security check could not load. {widgetId.current ? <><button type="button" onClick={resetSecurity}>Try the check again</button> or </> : <>Reload this page or </>}<a href="mailto:chuck@chuckbaryames.com">email me</a>.</p>}</> : <p className={s.error} role="status">The secure form is temporarily unavailable. <a href="mailto:chuck@chuckbaryames.com?subject=Project%20inquiry">Email me your project details</a>.</p>}
        {message && <p className={s.error} role="alert">{message} <a href="mailto:chuck@chuckbaryames.com">Email Chuck</a></p>}
        <button className={s.submit} type="submit" disabled={status === "submitting" || !siteKey}>{status === "submitting" ? "Sending your inquiry…" : "Send project inquiry"}<span aria-hidden="true">↗</span></button>
        <p className={s.privacy}>Your details go to Chuck to respond to this project. The form uses Cloudflare for spam protection and Resend for email delivery. Please do not include passwords or sensitive customer information.</p>
      </>}
    </fieldset>
  </form>;
}
