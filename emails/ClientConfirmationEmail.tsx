import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, main, panel, text } from "./styles";

export type ClientConfirmationEmailProps = {
  fullName: string;
  businessName: string;
};

export default function ClientConfirmationEmail({
  fullName,
  businessName,
}: ClientConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your $50 deposit is in and the landing page build starts now.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>Deposit received</Text>
            <Heading style={heading}>Got your deposit. Building starts now.</Heading>
            <Text style={text}>Hi {fullName},</Text>
            <Text style={text}>
              I received your intake form and $50 deposit for {businessName}. I have what I need
              to start your landing page preview.
            </Text>
            <Text style={text}>
              Within 4 hours, I will send a quick confirmation email with my plan for the page.
              Within 48 hours, you will have a temporary URL to review.
            </Text>
            <Text style={text}>
              You get 3 rounds of revisions. Once the page is approved, I will send the Stripe
              link for the $447 balance, then I will deploy it to your domain within 24 hours of
              payment.
            </Text>
            <Hr style={divider} />
            <Text style={text}>
              If there is anything you forgot to include, reply to this email and send it over.
            </Text>
            <Text style={text}>Chuck</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
