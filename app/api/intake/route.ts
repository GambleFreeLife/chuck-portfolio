import { NextResponse } from "next/server";
import { validateIntakePayload } from "@/lib/intake";
import { getOptionalEnv } from "@/lib/server/env";
import { getStripe } from "@/lib/server/stripe";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

type InsertedIntake = {
  id: string;
};

const liveDepositPriceId = "price_1TUdFHLVDWlcf7W7vOYWogME";

function jsonError(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ error: message, errors }, { status });
}

function getDepositPriceId() {
  return getOptionalEnv("STRIPE_DEPOSIT_PRICE_ID") ?? liveDepositPriceId;
}

function getSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");

  if (origin !== requestOrigin) {
    return null;
  }

  return requestOrigin;
}

export async function POST(request: Request) {
  const origin = getSameOrigin(request);

  if (!origin) {
    return jsonError("Request origin is not allowed.", 403);
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
    const session = await stripe.checkout.sessions.create({
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
    });

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
  } catch {
    return jsonError("Checkout is not configured yet.", 500);
  }
}
