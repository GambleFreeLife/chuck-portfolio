import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendLandingPagePaymentEmails, sendVideoOrderPaymentEmails } from "@/lib/server/email";
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
    const videoOrderId = session.metadata?.video_order_id;
    const isSmokeTest =
      event.id.startsWith("evt_live_webhook_smoke_") || session.id?.startsWith("cs_live_webhook_smoke_");

    if (videoOrderId) {
      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null;

      const { data, error } = await getSupabaseAdmin()
        .from("video_orders")
        .update({
          stripe_payment_status: "paid",
          paid_at: new Date().toISOString(),
          stripe_session_id: session.id,
          stripe_subscription_id: stripeSubscriptionId,
        })
        .eq("id", videoOrderId)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: "Video order payment status could not be updated." }, { status: 500 });
      }

      try {
        await sendVideoOrderPaymentEmails(data);
      } catch (error) {
        const emailError = error instanceof Error ? error.message : "Unknown email error";
        console.error("Video order emails failed", emailError);
      }
    } else if (!intakeId) {
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
        const emailError = error instanceof Error ? error.message : "Unknown email error";
        console.error(
          "Payment emails failed",
          emailError,
        );

        if (isSmokeTest) {
          return NextResponse.json({ received: true, emailSent: false, emailError });
        }
      }

      if (isSmokeTest) {
        return NextResponse.json({ received: true, emailSent: true });
      }
    }
  }

  return NextResponse.json({ received: true });
}
