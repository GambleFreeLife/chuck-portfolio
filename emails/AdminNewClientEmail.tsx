import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, label, link, main, muted, panel, text, value } from "./styles";

export type AdminNewClientEmailProps = {
  intakeId: string;
  createdAt: string | null;
  fullName: string;
  email: string;
  businessName: string;
  businessDescription: string;
  targetCustomer: string;
  primaryGoal: string;
  offerDescription: string;
  benefits: string;
  domainStatus: string;
  brandNotes: string | null;
  additionalNotes: string | null;
  deadlinePreference: string;
  stripeSessionId: string | null;
  stripePaymentStatus: string | null;
  paidAt: string | null;
  supabaseRowUrl: string;
};

function Field({ labelText, children }: { labelText: string; children: string | null }) {
  return (
    <>
      <Text style={label}>{labelText}</Text>
      <Text style={value}>{children && children.length > 0 ? children : "Not provided"}</Text>
    </>
  );
}

export default function AdminNewClientEmail(props: AdminNewClientEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New $50 landing page deposit from {props.businessName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>Deposit received</Text>
            <Heading style={heading}>New landing page deposit: {props.businessName}</Heading>
            <Text style={text}>
              The $50 deposit is confirmed. Build the 48-hour preview, then send a manual Stripe
              link for the $447 balance after the page is approved.
            </Text>
            <Text style={muted}>
              Supabase row:{" "}
              <Link href={props.supabaseRowUrl} style={link}>
                open intake submission
              </Link>
            </Text>
            <Hr style={divider} />
            <Field labelText="Full name">{props.fullName}</Field>
            <Field labelText="Email">{props.email}</Field>
            <Field labelText="Business name">{props.businessName}</Field>
            <Field labelText="What does the business do?">{props.businessDescription}</Field>
            <Field labelText="Target customer">{props.targetCustomer}</Field>
            <Field labelText="Primary goal">{props.primaryGoal}</Field>
            <Field labelText="Offer description">{props.offerDescription}</Field>
            <Field labelText="Benefits or outcomes">{props.benefits}</Field>
            <Field labelText="Domain status">{props.domainStatus}</Field>
            <Field labelText="Brand colors or vibe">{props.brandNotes}</Field>
            <Field labelText="Anything else">{props.additionalNotes}</Field>
            <Field labelText="Deadline preference">{props.deadlinePreference}</Field>
            <Hr style={divider} />
            <Field labelText="Stripe deposit status">{props.stripePaymentStatus}</Field>
            <Field labelText="Deposit paid at">{props.paidAt}</Field>
            <Field labelText="Stripe session ID">{props.stripeSessionId}</Field>
            <Field labelText="Intake row ID">{props.intakeId}</Field>
            <Field labelText="Created at">{props.createdAt}</Field>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
