import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { container, divider, eyebrow, heading, label, link, main, panel, text, value } from "./styles";

export type AuditRequestEmailProps = {
  name: string;
  email: string;
  website: string;
  problem: string | null;
};

function Field({ labelText, children }: { labelText: string; children: string | null }) {
  return (
    <>
      <Text style={label}>{labelText}</Text>
      <Text style={value}>{children && children.length > 0 ? children : "Not provided"}</Text>
    </>
  );
}

export default function AuditRequestEmail({ name, email, website, problem }: AuditRequestEmailProps) {
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
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
