import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendLandingPagePaymentEmails } from "@/lib/server/email";
import { getRequiredEnv } from "@/lib/server/env";
import { getStripe } from "@/lib/server/stripe";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, getRequiredEnv("STRIPE_WEBHOOK_SECRET"));
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const intakeId = session.metadata?.intake_id;

    if (!intakeId) {
      console.error("Stripe checkout session completed without intake_id metadata.", session.id);
    } else {
      const { data, error } = await getSupabaseAdmin()
        .from("intake_submissions")
        .update({
          stripe_payment_status: "deposit_paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", intakeId)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: "Payment status could not be updated." }, { status: 500 });
      }

      try {
        await sendLandingPagePaymentEmails(data);
      } catch (error) {
        console.error(
          "Payment emails failed",
          error instanceof Error ? error.message : "Unknown email error",
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
