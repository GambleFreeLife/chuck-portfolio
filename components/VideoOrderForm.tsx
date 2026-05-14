"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type VideoOrderPlan = "single" | "pack" | "retainer";
type StylePreference =
  | "launch_promo"
  | "product_demo"
  | "explainer"
  | "testimonial_case_study"
  | "social_ad"
  | "recommend_one";

type VideoOrderFormProps = {
  plan: VideoOrderPlan;
};

type FormState = {
  full_name: string;
  email: string;
  business_name: string;
  brand_offer: string;
  target_audience: string;
  style_preference: StylePreference | "";
};

type FieldName = keyof FormState;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialFormState: FormState = {
  full_name: "",
  email: "",
  business_name: "",
  brand_offer: "",
  target_audience: "",
  style_preference: "",
};

const fieldNames = ["full_name", "email", "business_name", "brand_offer", "target_audience", "style_preference"] as const;

const styleOptions = [
  {
    value: "launch_promo",
    label: "Launch or Promo Video",
    description: "Best for announcing an offer, product, service, event, or new brand direction.",
  },
  {
    value: "product_demo",
    label: "Product or Service Demo",
    description: "Best for showing what you sell, how it works, and why someone should care.",
  },
  {
    value: "explainer",
    label: "Explainer or How-It-Works",
    description: "Best for simplifying a process, teaching the problem, or walking through your method.",
  },
  {
    value: "testimonial_case_study",
    label: "Testimonial or Case Study",
    description: "Best for turning customer results, reviews, or proof into a trust-building story.",
  },
  {
    value: "social_ad",
    label: "Social Ad or Short Promo",
    description: "Best for a direct paid or organic post built to stop the scroll and earn the click.",
  },
  {
    value: "recommend_one",
    label: "Recommend One for Me",
    description: "Best when you know the outcome but want me to choose the strongest format.",
  },
] as const;

const planOptions = [
  {
    plan: "single",
    name: "Single Video",
    price: "$97",
    cadence: "one-time",
  },
  {
    plan: "pack",
    name: "3-Video Pack",
    price: "$247",
    cadence: "one-time",
  },
  {
    plan: "retainer",
    name: "Video Retainer",
    price: "$297",
    cadence: "per month",
  },
] as const;

const planDetails = {
  single: {
    name: "Single Video",
    price: "$97 one-time",
  },
  pack: {
    name: "3-Video Pack",
    price: "$247 one-time",
  },
  retainer: {
    name: "Video Retainer",
    price: "$297/month",
  },
} as const;

function isStylePreference(value: string): value is StylePreference {
  return styleOptions.some((option) => option.value === value);
}

function validateForm(form: FormState) {
  const errors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.full_name.trim()) {
    errors.full_name = "Add your full name.";
  }

  if (!emailRegex.test(form.email.trim())) {
    errors.email = "Add a valid email address.";
  }

  if (!form.business_name.trim()) {
    errors.business_name = "Add your business name.";
  }

  if (!form.brand_offer.trim()) {
    errors.brand_offer = "Tell me what you sell.";
  }

  if (!form.target_audience.trim()) {
    errors.target_audience = "Add your target audience.";
  }

  if (!form.style_preference || !isStylePreference(form.style_preference)) {
    errors.style_preference = "Choose a video style.";
  }

  return errors;
}

function isFieldName(value: string): value is FieldName {
  return fieldNames.some((fieldName) => fieldName === value);
}

function getResponseUrl(payload: unknown) {
  if (payload && typeof payload === "object" && "url" in payload && typeof payload.url === "string") {
    return payload.url;
  }

  return null;
}

export function VideoOrderForm({ plan }: VideoOrderFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [selectedPlanType, setSelectedPlanType] = useState<VideoOrderPlan>(plan);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedPlan = planDetails[selectedPlanType];
  const selectedStyle = styleOptions.find((option) => option.value === form.style_preference);

  const updatePlan = (nextPlan: VideoOrderPlan) => {
    setSelectedPlanType(nextPlan);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("plan", nextPlan);
      url.searchParams.delete("canceled");
      window.history.replaceState(null, "", url.toString());
    }
  };

  const updateField = (field: FieldName, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === "style_preference" ? (isStylePreference(value) ? value : "") : value,
    }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const applyServerErrors = (payload: unknown) => {
    if (!payload || typeof payload !== "object" || !("errors" in payload)) {
      return false;
    }

    const rawErrors = payload.errors;

    if (!rawErrors || typeof rawErrors !== "object") {
      return false;
    }

    const nextErrors: FieldErrors = {};

    for (const [field, message] of Object.entries(rawErrors)) {
      if (isFieldName(field) && typeof message === "string") {
        nextErrors[field] = message;
      }
    }

    if (Object.keys(nextErrors).length === 0) {
      return false;
    }

    setErrors(nextErrors);
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/video-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          business_name: form.business_name.trim(),
          brand_offer: form.brand_offer.trim(),
          target_audience: form.target_audience.trim(),
          product_type: selectedPlanType,
        }),
      });

      const payload: unknown = await response.json();
      const checkoutUrl = getResponseUrl(payload);

      if (!response.ok || !checkoutUrl) {
        applyServerErrors(payload);
        setFormError("Checkout could not start. Check the details and try again.");
        setIsSubmitting(false);
        return;
      }

      window.location.assign(checkoutUrl);
    } catch {
      setFormError("Network hiccup. Try again and I will send you to checkout.");
      setIsSubmitting(false);
    }
  };

  return (
    <form className="video-order-form intake-card" onSubmit={handleSubmit} noValidate>
      <div className="video-order-plan">
        <p className="video-order-plan-eyebrow">Selected plan</p>
        <h2>
          {selectedPlan.name}, {selectedPlan.price}
        </h2>
        <div className="video-plan-toggle" aria-label="Choose video plan">
          {planOptions.map((option) => (
            <button
              aria-pressed={option.plan === selectedPlanType}
              className={`video-plan-option${option.plan === selectedPlanType ? " is-active" : ""}`}
              key={option.plan}
              onClick={() => updatePlan(option.plan)}
              type="button"
            >
              <span>{option.name}</span>
              <strong>
                {option.price}
                <small>{option.cadence}</small>
              </strong>
            </button>
          ))}
        </div>
      </div>

      {formError ? (
        <div className="form-error" role="alert">
          {formError}
        </div>
      ) : null}

      <label className="form-field">
        <span>Full name</span>
        <input
          name="full_name"
          type="text"
          value={form.full_name}
          onChange={(event) => updateField("full_name", event.target.value)}
          aria-invalid={Boolean(errors.full_name)}
          autoComplete="name"
          required
        />
        {errors.full_name ? <small className="field-error">{errors.full_name}</small> : null}
      </label>

      <label className="form-field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          required
        />
        {errors.email ? <small className="field-error">{errors.email}</small> : null}
      </label>

      <label className="form-field">
        <span>Business name</span>
        <input
          name="business_name"
          type="text"
          value={form.business_name}
          onChange={(event) => updateField("business_name", event.target.value)}
          aria-invalid={Boolean(errors.business_name)}
          autoComplete="organization"
          required
        />
        {errors.business_name ? <small className="field-error">{errors.business_name}</small> : null}
      </label>

      <label className="form-field">
        <span>What do you sell?</span>
        <small>A short phrase is fine. Example: landing pages for coaches.</small>
        <textarea
          name="brand_offer"
          value={form.brand_offer}
          onChange={(event) => updateField("brand_offer", event.target.value)}
          aria-invalid={Boolean(errors.brand_offer)}
          required
        />
        {errors.brand_offer ? <small className="field-error">{errors.brand_offer}</small> : null}
      </label>

      <label className="form-field">
        <span>Target audience</span>
        <small>A few words is fine. Example: local business owners.</small>
        <textarea
          name="target_audience"
          value={form.target_audience}
          onChange={(event) => updateField("target_audience", event.target.value)}
          aria-invalid={Boolean(errors.target_audience)}
          required
        />
        {errors.target_audience ? <small className="field-error">{errors.target_audience}</small> : null}
      </label>

      <label className="form-field">
        <span>Style preference</span>
        <small>Companies usually use videos for launches, demos, explainers, proof, or social ads.</small>
        <select
          className={form.style_preference ? undefined : "is-empty"}
          name="style_preference"
          value={form.style_preference}
          onChange={(event) => updateField("style_preference", event.target.value)}
          aria-invalid={Boolean(errors.style_preference)}
          required
        >
          <option value="">Choose a style</option>
          {styleOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedStyle ? <small className="style-option-note">{selectedStyle.description}</small> : null}
        {errors.style_preference ? <small className="field-error">{errors.style_preference}</small> : null}
      </label>

      <button className="flow-primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Redirecting to Stripe..." : "Continue to checkout"}
      </button>
    </form>
  );
}
