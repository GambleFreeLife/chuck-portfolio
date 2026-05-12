import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, label, link, main, muted, panel, text, value } from "./styles";

export type VideoOrderAdminEmailProps = {
  videoOrderId: string;
  createdAt: string | null;
  fullName: string;
  email: string;
  businessName: string;
  brandOffer: string;
  targetAudience: string;
  stylePreference: string;
  productType: string;
  planName: string;
  amountPaid: string;
  stripeSessionId: string | null;
  stripeSubscriptionId: string | null;
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

export default function VideoOrderAdminEmail(props: VideoOrderAdminEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New video order from {props.businessName}, {props.amountPaid}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>Video order received</Text>
            <Heading style={heading}>New video order: {props.businessName}</Heading>
            <Text style={text}>
              Payment is confirmed for {props.planName}. Review the brief, send the script preview
              within 24 hours, and start the 48-hour render clock after script approval.
            </Text>
            <Text style={muted}>
              Supabase row:{" "}
              <Link href={props.supabaseRowUrl} style={link}>
                open video order
              </Link>
            </Text>
            <Hr style={divider} />
            <Field labelText="Full name">{props.fullName}</Field>
            <Field labelText="Email">{props.email}</Field>
            <Field labelText="Business name">{props.businessName}</Field>
            <Field labelText="What do they sell?">{props.brandOffer}</Field>
            <Field labelText="Target audience">{props.targetAudience}</Field>
            <Field labelText="Style preference">{props.stylePreference}</Field>
            <Field labelText="Plan">{props.planName}</Field>
            <Field labelText="Product type">{props.productType}</Field>
            <Field labelText="Amount paid">{props.amountPaid}</Field>
            <Hr style={divider} />
            <Field labelText="Stripe payment status">{props.stripePaymentStatus}</Field>
            <Field labelText="Paid at">{props.paidAt}</Field>
            <Field labelText="Stripe session ID">{props.stripeSessionId}</Field>
            <Field labelText="Stripe subscription ID">{props.stripeSubscriptionId}</Field>
            <Field labelText="Video order row ID">{props.videoOrderId}</Field>
            <Field labelText="Created at">{props.createdAt}</Field>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
