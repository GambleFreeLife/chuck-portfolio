import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, label, link, main, panel, text, value } from "./styles";

export type AuditRequestWithContextEmailProps = {
  name: string;
  email: string;
  website: string;
  problem: string | null;
  source: string;
  medium: string;
  campaign: string;
  offer: string;
};

function Field({ labelText, children }: { labelText: string; children: string | null }) {
  return (
    <>
      <Text style={label}>{labelText}</Text>
      <Text style={value}>{children && children.length > 0 ? children : "Not provided"}</Text>
    </>
  );
}

export default function AuditRequestWithContextEmail({ name, email, website, problem, source, medium, campaign, offer }: AuditRequestWithContextEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New free website audit request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={panel}>
            <Text style={eyebrow}>New website audit request</Text>
            <Heading style={heading}>{name} sent a site to review.</Heading>
            <Text style={text}>
              Review the website, identify the three highest-impact fixes, and reply directly to the prospect.
            </Text>
            <Hr style={divider} />
            <Field labelText="Name">{name}</Field>
            <Field labelText="Email">{email}</Field>
            <Text style={label}>Website</Text>
            <Text style={value}>
              <Link href={website} style={link}>{website}</Link>
            </Text>
            <Field labelText="What feels off">{problem}</Field>
            <Field labelText="Source (visitor-provided)">{source || "Direct / not tagged"}</Field>
            <Field labelText="Medium">{medium}</Field>
            <Field labelText="Campaign">{campaign}</Field>
            <Field labelText="Offer interest">{offer === "quick-win" ? "$299 Website Quick Win" : "Free website review"}</Field>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
