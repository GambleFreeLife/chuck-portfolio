"use client";

import { FormEvent, useState } from "react";

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

export function AuditLeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("Got it. I will review the site myself and reply by email with the three fixes I would prioritize.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. You can email chuck@chuckbaryames.com instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="audit-success" role="status">
        <div className="audit-success-mark" aria-hidden="true">✓</div>
        <h3>Your site is in my queue.</h3>
        <p>{message}</p>
        <button type="button" onClick={() => setStatus("idle")}>Send another site</button>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={handleSubmit}>
      <div className="audit-form-header">
        <span className="audit-form-badge">FREE · NO CALL REQUIRED</span>
        <h3>Get your 3-point website audit.</h3>
        <p>Three required fields. The last question is optional.</p>
      </div>

      <label className="audit-field">
        <span>Name <small>Required</small></span>
        <input
          name="name"
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
          inputMode="url"
          autoComplete="url"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
          placeholder="yourbusiness.com"
          required
        />
      </label>

      <label className="audit-field">
        <span>What feels off? <small>Optional</small></span>
        <textarea
          name="problem"
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
        {status === "submitting" ? "Sending your site..." : "Send my site for review"}
      </button>
      <p className="audit-privacy">
        I use these details only to review your site and reply about the audit. No phone number, newsletter, or sales call required.
      </p>
    </form>
  );
}
