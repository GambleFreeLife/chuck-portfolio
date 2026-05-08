"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  deadlinePreferences,
  domainStatuses,
  IntakeSubmission,
  primaryGoals,
  validateIntakePayload,
} from "@/lib/intake";

type IntakeFormState = {
  [K in keyof IntakeSubmission]: string;
};

type FieldName = keyof IntakeFormState;

const initialFormState: IntakeFormState = {
  fullName: "",
  email: "",
  businessName: "",
  businessDescription: "",
  targetCustomer: "",
  primaryGoal: "",
  offerDescription: "",
  benefits: "",
  domainStatus: "",
  brandNotes: "",
  additionalNotes: "",
  deadlinePreference: "",
};

const requiredFieldNames: FieldName[] = [
  "fullName",
  "email",
  "businessName",
  "businessDescription",
  "targetCustomer",
  "primaryGoal",
  "offerDescription",
  "benefits",
  "domainStatus",
  "deadlinePreference",
];

type ApiResponse =
  | {
      url: string;
    }
  | {
      error: string;
      errors?: Record<string, string>;
    };

export function IntakeForm() {
  const [form, setForm] = useState<IntakeFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validation = useMemo(() => validateIntakePayload(form), [form]);
  const canSubmit = validation.ok && !isSubmitting;
  const completedRequiredCount = requiredFieldNames.filter((name) => form[name].trim().length > 0).length;

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const clientValidation = validateIntakePayload(form);

    if (!clientValidation.ok) {
      setError("Add the required details, then you can pay and start.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientValidation.data),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !("url" in result)) {
        setError("Something went wrong before checkout. Try again in a minute.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = result.url;
    } catch {
      setError("Something went wrong before checkout. Try again in a minute.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="intake-layout">
      <aside className="intake-aside" aria-label="Build brief guidance">
        <div className="intake-aside-card">
          <div className="sec-label">Build brief</div>
          <h2>Give me the page ingredients.</h2>
          <p>
            I use your answers to write the copy, plan the sections, choose the proof, and avoid
            extra back-and-forth.
          </p>
          <div className="intake-progress" aria-label="Required details completed">
            <span>
              About 4 minutes to complete. {completedRequiredCount} of {requiredFieldNames.length} done.
            </span>
            <div>
              <i style={{ width: `${(completedRequiredCount / requiredFieldNames.length) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="intake-aside-card muted">
          <h3>Have these ready.</h3>
          <ul>
            <li>Know the offer you want the page to sell.</li>
            <li>Have links to logos, colors, or examples if you have them.</li>
            <li>Know whether your domain is ready or still needs help.</li>
          </ul>
        </div>
        <div className="intake-aside-card muted">
          <h3>Scope note.</h3>
          <p>
            This build is for one focused landing page. If the brief points to a bigger project, I
            will tell you before work starts.
          </p>
        </div>
      </aside>

      <form className="intake-card" onSubmit={handleSubmit}>
        <FormSection title="Contact details" note="Use the email where you want build updates sent." />
        <Field
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={updateField}
          autoComplete="name"
          placeholder="Jane Smith"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          autoComplete="email"
          placeholder="jane@example.com"
        />
        <Field
          label="Business name"
          name="businessName"
          value={form.businessName}
          onChange={updateField}
          autoComplete="organization"
          placeholder="Your business or project name"
        />

        <FormSection title="Offer and customer" note="These answers drive the copy and page structure." />
        <TextareaField
          label="What does your business do?"
          help="Tell me what you sell, who you serve, and why customers choose you."
          name="businessDescription"
          value={form.businessDescription}
          onChange={updateField}
          placeholder="We help busy parents plan healthy meals without spending Sundays in the kitchen."
        />
        <TextareaField
          label="Target customer"
          help="Describe who this landing page should convince."
          name="targetCustomer"
          value={form.targetCustomer}
          onChange={updateField}
          placeholder="Coaches, consultants, course buyers, local customers, or another specific group."
        />
        <SelectField
          label="Primary goal of the page"
          help="Pick the action that matters most."
          name="primaryGoal"
          value={form.primaryGoal}
          onChange={updateField}
          options={primaryGoals}
        />
        <Field
          label="One-line description of the offer"
          name="offerDescription"
          value={form.offerDescription}
          onChange={updateField}
          placeholder="A 6-week coaching program for new managers."
        />
        <TextareaField
          label="Three benefits or outcomes for the customer"
          help="List three specific reasons someone should care."
          name="benefits"
          value={form.benefits}
          onChange={updateField}
          placeholder={"1. Save time each week.\n2. Feel confident before the first call.\n3. Know exactly what to do next."}
        />

        <FormSection title="Launch details" note="These answers help me avoid preventable launch delays." />
        <RadioFieldset
          label="Do you have a domain ready?"
          name="domainStatus"
          value={form.domainStatus}
          options={domainStatuses}
          onChange={updateField}
        />
        <TextareaField
          label="Brand colors or vibe"
          help="Optional. Add colors, logo links, inspiration links, competitors, or a plain-language vibe."
          name="brandNotes"
          value={form.brandNotes}
          onChange={updateField}
          required={false}
          placeholder="Clean and calm, bright and bold, luxury, local, playful, clinical, or something else."
        />
        <TextareaField
          label="Anything else I should know?"
          help="Optional. Add your current website, asset links, access notes, legal claims, offers to avoid, or anything else that would help."
          name="additionalNotes"
          value={form.additionalNotes}
          onChange={updateField}
          required={false}
          placeholder="Current website, Google Drive folder, examples you like, competitors, or notes I should not miss."
        />
        <SelectField
          label="Deadline preference"
          help="The standard preview target is 48 hours after the build starts."
          name="deadlinePreference"
          value={form.deadlinePreference}
          onChange={updateField}
          options={deadlinePreferences}
        />
        {error ? (
          <div className="form-error" role="alert">
            {error}
          </div>
        ) : null}
        <button className="flow-primary-button" type="submit" disabled={!canSubmit}>
          {isSubmitting ? "Opening checkout" : "Pay the $50 deposit and start the build"}
        </button>
        <p className="form-submit-note">
          Checkout opens after the required details are complete. The $447 balance is due only
          after you approve the preview.
        </p>
      </form>
    </div>
  );
}

function FormSection({ title, note }: { title: string; note: string }) {
  return (
    <div className="form-section-title">
      <h3>{title}</h3>
      <p>{note}</p>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

function TextareaField({
  label,
  help,
  name,
  value,
  onChange,
  required = true,
  placeholder,
}: {
  label: string;
  help?: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {help ? <small>{help}</small> : null}
      <textarea
        name={name}
        value={value}
        rows={4}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  help,
}: {
  label: string;
  name: FieldName;
  value: string;
  options: readonly string[];
  onChange: (name: FieldName, value: string) => void;
  help?: string;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {help ? <small>{help}</small> : null}
      <select name={name} value={value} required onChange={(event) => onChange(name, event.target.value)}>
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function RadioFieldset({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: FieldName;
  value: string;
  options: readonly string[];
  onChange: (name: FieldName, value: string) => void;
}) {
  return (
    <fieldset className="form-field radio-field">
      <legend>{label}</legend>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              required
              onChange={(event) => onChange(name, event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
