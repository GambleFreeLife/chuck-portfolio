import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateIntakePayload } from "../lib/intake.ts";

const validPayload = {
  fullName: "Jane Smith",
  email: "jane@example.com",
  businessName: "Smith Coaching",
  businessDescription: "Coaching for new managers who need calmer systems.",
  targetCustomer: "First-time managers at growing service businesses.",
  primaryGoal: "Book a call/consultation",
  offerDescription: "A 6-week coaching program for new managers.",
  benefits: "Make better decisions, lead clearer meetings, and avoid burnout.",
  domainStatus: "Yes, I have one",
  brandNotes: "",
  additionalNotes: "",
  deadlinePreference: "ASAP, within 48 hours",
};

describe("validateIntakePayload", () => {
  it("accepts a complete productized landing page brief", () => {
    const result = validateIntakePayload(validPayload);

    assert.equal(result.ok, true);
  });

  it("rejects invalid email even when every required field is present", () => {
    const result = validateIntakePayload({
      ...validPayload,
      email: "not-an-email",
    });

    assert.equal(result.ok, false);

    if (!result.ok) {
      assert.equal(result.errors.email, "Add a valid email.");
    }
  });

  it("rejects oversized free-text fields before they reach Supabase or Stripe", () => {
    const result = validateIntakePayload({
      ...validPayload,
      businessDescription: "x".repeat(1201),
    });

    assert.equal(result.ok, false);

    if (!result.ok) {
      assert.match(result.errors.businessDescription, /too long/);
    }
  });

  it("trims optional empty strings to null", () => {
    const result = validateIntakePayload({
      ...validPayload,
      brandNotes: "   ",
      additionalNotes: "   ",
    });

    assert.equal(result.ok, true);

    if (result.ok) {
      assert.equal(result.data.brandNotes, null);
      assert.equal(result.data.additionalNotes, null);
    }
  });
});
