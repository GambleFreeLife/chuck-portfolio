import AdminNewClientEmail from "@/emails/AdminNewClientEmail";
import ClientConfirmationEmail from "@/emails/ClientConfirmationEmail";
import type { Database } from "./database.types";
import { getRequiredEnv } from "./env";
import { getResend } from "./resend";

type IntakeRow = Database["public"]["Tables"]["intake_submissions"]["Row"];

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

function getSupabaseRowUrl(intakeId: string) {
  const projectRef = getProjectRefFromSupabaseUrl();
  const filter = encodeURIComponent(`id=eq.${intakeId}`);

  return `https://supabase.com/dashboard/project/${projectRef}/editor?schema=public&table=intake_submissions&filter=${filter}`;
}

export async function sendLandingPagePaymentEmails(intake: IntakeRow) {
  const resend = getResend();
  const from = getRequiredEnv("FROM_EMAIL");
  const adminEmail = getRequiredEnv("ADMIN_EMAIL");
  const supabaseRowUrl = getSupabaseRowUrl(intake.id);

  const adminEmailResult = await resend.emails.send(
    {
      from,
      to: adminEmail,
      subject: `New landing page deposit: ${intake.business_name}`,
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
