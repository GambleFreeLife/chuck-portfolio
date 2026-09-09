"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { getLeadContext } from "@/lib/lead-context";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  website: string;
  problem: string;
  companyWebsite: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  website: "",
  problem: "",
  companyWebsite: "",
};

const offerLabels: Record<string, string> = {
  "quick-win": "$299 Website Quick Win",
  "page-refresh": "$500 focused refresh",
  "homepage-redesign": "$1,000 homepage redesign",
  "website-redesign": "website redesign, from $2,500",
};

export function AuditLeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const started = useRef(false);
  const inFlight = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [offer, setOffer] = useState("");
  useEffect(() => { setOffer(getLeadContext().offer); }, []);
  useEffect(() => { if (status === "success") successRef.current?.focus(); }, [status]);

  function update(name: keyof FormState, value: string) {
    if (!started.current && name !== "companyWebsite") { started.current = true; trackEvent("audit_form_start", { location: "audit" }); }
    setForm((current) => ({ ...current, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, context: getLeadContext() }),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Try again.");
        return;
      }

      trackEvent("generate_lead", { method: "website_audit", offer: getLeadContext().offer });
      setStatus("success");
      setMessage("Got it. I will review the site myself and reply by email with three observations and what I would prioritize.");
      setForm(initialState);
      started.current = false;
    } catch {
      setStatus("error");
      setMessage("I could not confirm delivery. Your details are still here. You can retry or email chuck@chuckbaryames.com.");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="audit-success" role="status" tabIndex={-1} ref={successRef}>
        <div className="audit-success-mark" aria-hidden="true">✓</div>
        <h3>Your site is in my queue.</h3>
        <p>{message}</p>
        <button type="button" onClick={() => setStatus("idle")}>Send another site</button>
      </div>
    );
  }

  return (
    <form className="audit-form" method="post" action="/api/audit" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <noscript>You can submit this form or email chuck@chuckbaryames.com for your review.</noscript>
      <div className="audit-form-header">
        <span className="audit-form-badge">FREE · NO CALL REQUIRED</span>
        <h3>Tell me about your website.</h3>
        <p>About a minute to send. I aim to reply within two business days.</p>
      </div>

      {offerLabels[offer] ? <p className="offer-interest">Interested in the {offerLabels[offer]}. This conversation is free.</p> : null}

      <label className="audit-field">
        <span>Name <small>Required</small></span>
        <input
          name="name"
          minLength={2}
          maxLength={100}
          autoComplete="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Your name"
          required
        />
      </label>

      <label className="audit-field">
        <span>Email <small>Required</small></span>
        <input
          name="email"
          maxLength={160}
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@business.com"
          required
        />
      </label>

      <label className="audit-field">
        <span>Website <small>Required</small></span>
        <input
          name="website"
          maxLength={300}
          inputMode="url"
          autoComplete="url"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
          placeholder="yourbusiness.com"
          required
        />
      </label>

      <label className="audit-field">
        <span>What would you like to improve? <small>Optional</small></span>
        <textarea
          name="problem"
          maxLength={1000}
          value={form.problem}
          onChange={(event) => update("problem", event.target.value)}
          placeholder="Example: We get traffic, but very few quote requests."
          rows={3}
        />
      </label>

      <label className="audit-honeypot" aria-hidden="true">
        Company website
        <input
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(event) => update("companyWebsite", event.target.value)}
        />
      </label>

      {status === "error" && message ? (
        <div className="audit-error" role="alert">
          {message} <a href="mailto:chuck@chuckbaryames.com?subject=Website%20audit">Email me directly.</a>
        </div>
      ) : null}

      <button className="audit-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending your site..." : "Get my free website review"}
      </button>
      <p className="audit-privacy">
        I use these details only to review your site and reply about the audit. No phone number, newsletter, or sales call required. Campaign labels may accompany your request so I know which outreach brought you here.
      </p>
    </form>
  );
}
