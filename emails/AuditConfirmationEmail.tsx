import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import { container, eyebrow, heading, main, panel, text } from "./styles";

export default function AuditConfirmationEmail({ name, website }: { name: string; website: string }) {
  return (
    <Html>
      <Head />
      <Preview>I got your website. I will review it myself.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>Website audit received</Text>
            <Heading style={heading}>I got it, {name}.</Heading>
            <Text style={text}>
              I have {website}. I will review the site and reply with the three highest-impact things I would fix first.
            </Text>
            <Text style={text}>
              You do not need to book a call or choose a service first. If I see a worthwhile next step, I will explain it clearly in the reply.
            </Text>
            <Text style={text}>Chuck Baryames</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
