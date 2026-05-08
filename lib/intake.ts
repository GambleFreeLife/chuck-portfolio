export const primaryGoals = [
  "Capture email leads",
  "Sell a product",
  "Book a call/consultation",
  "Other",
] as const;

export const domainStatuses = [
  "Yes, I have one",
  "No, help me pick one",
  "I'll send it after payment",
] as const;

export const deadlinePreferences = [
  "ASAP, within 48 hours",
  "Within 1 week",
  "No rush",
] as const;

export type PrimaryGoal = (typeof primaryGoals)[number];
export type DomainStatus = (typeof domainStatuses)[number];
export type DeadlinePreference = (typeof deadlinePreferences)[number];

export type IntakeSubmission = {
  fullName: string;
  email: string;
  businessName: string;
  businessDescription: string;
  targetCustomer: string;
  primaryGoal: PrimaryGoal;
  offerDescription: string;
  benefits: string;
  domainStatus: DomainStatus;
  brandNotes: string | null;
  additionalNotes: string | null;
  deadlinePreference: DeadlinePreference;
};

export type IntakeValidationResult =
  | { ok: true; data: IntakeSubmission }
  | { ok: false; errors: Record<string, string> };

const fieldLimits: Partial<Record<keyof IntakeSubmission, number>> = {
  fullName: 120,
  email: 254,
  businessName: 160,
  businessDescription: 1200,
  targetCustomer: 800,
  offerDescription: 300,
  benefits: 800,
  brandNotes: 1000,
  additionalNotes: 1200,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(payload: Record<string, unknown>, key: string) {
  const value = readString(payload, key);
  return value.length > 0 ? value : null;
}

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return options.includes(value);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function checkMaxLength(
  errors: Record<string, string>,
  key: keyof IntakeSubmission,
  value: string | null,
  label: string,
) {
  const maxLength = fieldLimits[key];

  if (maxLength && value && value.length > maxLength) {
    errors[key] = `${label} is too long. Keep it under ${maxLength} characters.`;
  }
}

export function validateIntakePayload(payload: unknown): IntakeValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, errors: { form: "Submit the form again." } };
  }

  const errors: Record<string, string> = {};
  const fullName = readString(payload, "fullName");
  const email = readString(payload, "email");
  const businessName = readString(payload, "businessName");
  const businessDescription = readString(payload, "businessDescription");
  const targetCustomer = readString(payload, "targetCustomer");
  const primaryGoal = readString(payload, "primaryGoal");
  const offerDescription = readString(payload, "offerDescription");
  const benefits = readString(payload, "benefits");
  const domainStatus = readString(payload, "domainStatus");
  const brandNotes = readOptionalString(payload, "brandNotes");
  const additionalNotes = readOptionalString(payload, "additionalNotes");
  const deadlinePreference = readString(payload, "deadlinePreference");
  const primaryGoalIsValid = isOneOf(primaryGoal, primaryGoals);
  const domainStatusIsValid = isOneOf(domainStatus, domainStatuses);
  const deadlinePreferenceIsValid = isOneOf(deadlinePreference, deadlinePreferences);

  if (!fullName) errors.fullName = "Add your full name.";
  if (!email || !isValidEmail(email)) errors.email = "Add a valid email.";
  if (!businessName) errors.businessName = "Add your business name.";
  if (!businessDescription) errors.businessDescription = "Tell me what your business does.";
  if (!targetCustomer) errors.targetCustomer = "Tell me who the page is for.";
  if (!primaryGoalIsValid) errors.primaryGoal = "Choose the primary goal.";
  if (!offerDescription) errors.offerDescription = "Add a one-line offer description.";
  if (!benefits) errors.benefits = "List three benefits or outcomes.";
  if (!domainStatusIsValid) errors.domainStatus = "Choose a domain answer.";
  if (!deadlinePreferenceIsValid) {
    errors.deadlinePreference = "Choose a deadline preference.";
  }

  checkMaxLength(errors, "fullName", fullName, "Full name");
  checkMaxLength(errors, "email", email, "Email");
  checkMaxLength(errors, "businessName", businessName, "Business name");
  checkMaxLength(errors, "businessDescription", businessDescription, "Business description");
  checkMaxLength(errors, "targetCustomer", targetCustomer, "Target customer");
  checkMaxLength(errors, "offerDescription", offerDescription, "Offer description");
  checkMaxLength(errors, "benefits", benefits, "Benefits");
  checkMaxLength(errors, "brandNotes", brandNotes, "Brand notes");
  checkMaxLength(errors, "additionalNotes", additionalNotes, "Additional notes");

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      businessName,
      businessDescription,
      targetCustomer,
      primaryGoal: primaryGoal as PrimaryGoal,
      offerDescription,
      benefits,
      domainStatus: domainStatus as DomainStatus,
      brandNotes,
      additionalNotes,
      deadlinePreference: deadlinePreference as DeadlinePreference,
    },
  };
}
