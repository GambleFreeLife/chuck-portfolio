import { NextResponse } from "next/server";
import { validateIntakePayload } from "@/lib/intake";
import { getRequiredEnv } from "@/lib/server/env";
import { getStripe } from "@/lib/server/stripe";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

type InsertedIntake = {
  id: string;
};

const maxRequestBytes = 16_000;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 6;
const intakeAttempts = new Map<string, { count: number; resetAt: number }>();

function jsonError(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ error: message, errors }, { status });
}

function getDepositPriceId() {
  return getRequiredEnv("STRIPE_DEPOSIT_PRICE_ID");
}

function getSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");

  if (origin !== requestOrigin) {
    return null;
  }

  return requestOrigin;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(request: Request) {
  const clientIp = getClientIp(request);
  const now = Date.now();
  const current = intakeAttempts.get(clientIp);

  if (!current || current.resetAt <= now) {
    intakeAttempts.set(clientIp, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return false;
  }

  current.count += 1;

  return current.count > rateLimitMaxRequests;
}

function isRequestTooLarge(request: Request) {
  const contentLength = request.headers.get("content-length");

  if (!contentLength) {
    return false;
  }

  const byteLength = Number.parseInt(contentLength, 10);

  return Number.isFinite(byteLength) && byteLength > maxRequestBytes;
}

export async function POST(request: Request) {
  const origin = getSameOrigin(request);

  if (!origin) {
    return jsonError("Request origin is not allowed.", 403);
  }

  if (isRateLimited(request)) {
    return jsonError("Too many checkout attempts. Wait a few minutes, then try again.", 429);
  }

  if (isRequestTooLarge(request)) {
    return jsonError("The intake is too long. Shorten it, then try again.", 413);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError("Submit the form again.", 400);
  }

  const validation = validateIntakePayload(payload);

  if (!validation.ok) {
    return jsonError("Add the required details, then try again.", 400, validation.errors);
  }

  try {
    const supabase = getSupabaseAdmin();
    const stripe = getStripe();
    const intake = validation.data;

    const { data, error: insertError } = await supabase
      .from("intake_submissions")
      .insert({
        full_name: intake.fullName,
        email: intake.email,
        business_name: intake.businessName,
        business_description: intake.businessDescription,
        target_customer: intake.targetCustomer,
        primary_goal: intake.primaryGoal,
        offer_description: intake.offerDescription,
        benefits: intake.benefits,
        domain_status: intake.domainStatus,
        brand_notes: intake.brandNotes,
        additional_notes: intake.additionalNotes,
        deadline_preference: intake.deadlinePreference,
        stripe_payment_status: "pending_deposit",
      })
      .select("id")
      .single();

    if (insertError || !data) {
      return jsonError("The intake could not be saved.", 500);
    }

    const row = data as InsertedIntake;
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          {
            price: getDepositPriceId(),
            quantity: 1,
          },
        ],
        success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}&intake_id=${row.id}`,
        cancel_url: `${origin}/get-started?canceled=true`,
        customer_email: intake.email,
        metadata: {
          intake_id: row.id,
          payment_phase: "deposit",
        },
        payment_intent_data: {
          metadata: {
            intake_id: row.id,
            payment_phase: "deposit",
          },
        },
      },
      {
        idempotencyKey: `landing-page-deposit-${row.id}`,
      },
    );

    if (!session.url) {
      return jsonError("Checkout could not be opened.", 500);
    }

    const { error: updateError } = await supabase
      .from("intake_submissions")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", row.id);

    if (updateError) {
      return jsonError("Checkout could not be linked to the intake.", 500);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown intake checkout error";
    console.error("Intake checkout failed", errorMessage);
    return jsonError("Checkout is not configured yet.", 500);
  }
}
