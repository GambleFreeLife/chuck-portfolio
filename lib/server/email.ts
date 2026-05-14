import AdminNewClientEmail from "@/emails/AdminNewClientEmail";
import ClientConfirmationEmail from "@/emails/ClientConfirmationEmail";
import VideoOrderAdminEmail from "@/emails/VideoOrderAdminEmail";
import VideoOrderClientEmail from "@/emails/VideoOrderClientEmail";
import type { Database } from "./database.types";
import { getOptionalEnv, getRequiredEnv } from "./env";
import { getResend } from "./resend";

type IntakeRow = Database["public"]["Tables"]["intake_submissions"]["Row"];
type VideoOrderRow = Database["public"]["Tables"]["video_orders"]["Row"];

function getEmailErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string") {
      return message;
    }
  }

  return "Unknown Resend error.";
}

function getProjectRefFromSupabaseUrl() {
  const url = new URL(getRequiredEnv("SUPABASE_URL"));
  return url.hostname.split(".")[0] ?? "";
}

function getSupabaseRowUrl(table: "intake_submissions" | "video_orders", rowId: string) {
  const projectRef = getProjectRefFromSupabaseUrl();
  const filter = encodeURIComponent(`id=eq.${rowId}`);

  return `https://supabase.com/dashboard/project/${projectRef}/editor?schema=public&table=${table}&filter=${filter}`;
}

function getVideoPlanName(productType: string) {
  if (productType === "retainer") {
    return "Video Retainer";
  }

  if (productType === "pack") {
    return "3-Video Pack";
  }

  return "Single Video";
}

function getVideoAmountPaid(productType: string) {
  if (productType === "retainer") {
    return "$297/month";
  }

  if (productType === "pack") {
    return "$247";
  }

  return "$97";
}

function getVideoStyleLabel(stylePreference: string) {
  if (stylePreference === "launch_promo") {
    return "Launch or promo video";
  }

  if (stylePreference === "product_demo") {
    return "Product or service demo";
  }

  if (stylePreference === "explainer") {
    return "Explainer or how-it-works";
  }

  if (stylePreference === "testimonial_case_study") {
    return "Testimonial or case study";
  }

  if (stylePreference === "social_ad") {
    return "Social ad or short promo";
  }

  if (stylePreference === "service_explainer") {
    return "Service explainer";
  }

  if (stylePreference === "testimonial_cinematic") {
    return "Testimonial cinematic";
  }

  if (stylePreference === "recommend_one") {
    return "Recommend one";
  }

  return "Brand intro";
}

function getReplyToField() {
  const replyTo = getOptionalEnv("REPLY_TO_EMAIL");

  return replyTo ? { replyTo } : {};
}

export async function sendLandingPagePaymentEmails(intake: IntakeRow) {
  const resend = getResend();
  const from = getRequiredEnv("FROM_EMAIL");
  const adminEmail = getRequiredEnv("ADMIN_EMAIL");
  const supabaseRowUrl = getSupabaseRowUrl("intake_submissions", intake.id);

  const adminEmailResult = await resend.emails.send(
    {
      from,
      to: adminEmail,
      subject: `New landing page deposit: ${intake.business_name}`,
      ...getReplyToField(),
      react: AdminNewClientEmail({
        intakeId: intake.id,
        createdAt: intake.created_at,
        fullName: intake.full_name,
        email: intake.email,
        businessName: intake.business_name,
        businessDescription: intake.business_description,
        targetCustomer: intake.target_customer,
        primaryGoal: intake.primary_goal,
        offerDescription: intake.offer_description,
        benefits: intake.benefits,
        domainStatus: intake.domain_status,
        brandNotes: intake.brand_notes,
        additionalNotes: intake.additional_notes,
        deadlinePreference: intake.deadline_preference,
        stripeSessionId: intake.stripe_session_id,
        stripePaymentStatus: intake.stripe_payment_status,
        paidAt: intake.paid_at,
        supabaseRowUrl,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `landing-page-admin-${intake.id}`,
      },
    },
  );

  if (adminEmailResult.error) {
    throw new Error(`Admin notification email failed: ${getEmailErrorMessage(adminEmailResult.error)}`);
  }

  const clientEmailResult = await resend.emails.send(
    {
      from,
      to: intake.email,
      subject: "Got your deposit. Building starts now.",
      ...getReplyToField(),
      react: ClientConfirmationEmail({
        fullName: intake.full_name,
        businessName: intake.business_name,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `landing-page-client-${intake.id}`,
      },
    },
  );

  if (clientEmailResult.error) {
    throw new Error(`Client confirmation email failed: ${getEmailErrorMessage(clientEmailResult.error)}`);
  }
}

export async function sendVideoOrderAdminEmail(order: VideoOrderRow) {
  const resend = getResend();
  const from = getRequiredEnv("FROM_EMAIL");
  const adminEmail = getRequiredEnv("ADMIN_EMAIL");
  const supabaseRowUrl = getSupabaseRowUrl("video_orders", order.id);
  const planName = getVideoPlanName(order.product_type);
  const amountPaid = getVideoAmountPaid(order.product_type);
  const stylePreference = getVideoStyleLabel(order.style_preference);

  const adminEmailResult = await resend.emails.send(
    {
      from,
      to: adminEmail,
      subject: `New video order: ${order.business_name}`,
      ...getReplyToField(),
      react: VideoOrderAdminEmail({
        videoOrderId: order.id,
        createdAt: order.created_at,
        fullName: order.full_name,
        email: order.email,
        businessName: order.business_name,
        brandOffer: order.brand_offer,
        targetAudience: order.target_audience,
        stylePreference,
        productType: order.product_type,
        planName,
        amountPaid,
        stripeSessionId: order.stripe_session_id,
        stripeSubscriptionId: order.stripe_subscription_id,
        stripePaymentStatus: order.stripe_payment_status,
        paidAt: order.paid_at,
        supabaseRowUrl,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `video-order-admin-${order.id}`,
      },
    },
  );

  if (adminEmailResult.error) {
    throw new Error(`Video admin notification email failed: ${getEmailErrorMessage(adminEmailResult.error)}`);
  }
}

export async function sendVideoOrderClientEmail(order: VideoOrderRow) {
  const resend = getResend();
  const from = getRequiredEnv("FROM_EMAIL");
  const planName = getVideoPlanName(order.product_type);
  const amountPaid = getVideoAmountPaid(order.product_type);

  const clientEmailResult = await resend.emails.send(
    {
      from,
      to: order.email,
      subject: "Your video order is confirmed, preview in 48 hours",
      ...getReplyToField(),
      react: VideoOrderClientEmail({
        fullName: order.full_name,
        businessName: order.business_name,
        planName,
        amountPaid,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `video-order-client-${order.id}`,
      },
    },
  );

  if (clientEmailResult.error) {
    throw new Error(`Video client confirmation email failed: ${getEmailErrorMessage(clientEmailResult.error)}`);
  }
}

export async function sendVideoOrderPaymentEmails(order: VideoOrderRow) {
  await sendVideoOrderAdminEmail(order);
  await sendVideoOrderClientEmail(order);
}
