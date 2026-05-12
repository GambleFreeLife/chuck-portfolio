import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, main, panel, text } from "./styles";

export type VideoOrderClientEmailProps = {
  fullName: string;
  businessName: string;
  planName: string;
  amountPaid: string;
};

export default function VideoOrderClientEmail({
  fullName,
  businessName,
  planName,
  amountPaid,
}: VideoOrderClientEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your video order is confirmed, and the first preview comes after script approval.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>Video order confirmed</Text>
            <Heading style={heading}>Your video order is confirmed.</Heading>
            <Text style={text}>Hi {fullName},</Text>
            <Text style={text}>
              I received the brief and payment for {businessName}. Your plan is {planName}, and
              the payment received was {amountPaid}.
            </Text>
            <Text style={text}>
              Within 24 hours, I will send the script preview to your email. Once you approve the
              script, I will render the first video preview within 48 hours.
            </Text>
            <Text style={text}>
              After you approve the video, I will deliver the MP4 plus captioned versions for
              LinkedIn, X, and Instagram.
            </Text>
            <Hr style={divider} />
            <Text style={text}>
              If you forgot anything, reply to this email or send it to cbaryames24@gmail.com.
            </Text>
            <Text style={text}>Chuck</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
