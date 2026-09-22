import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import type { LeadContext } from "@/lib/lead-context";

export default function ProjectInquiryEmail({ name, email, website, problem, service, context }: { name: string; email: string; website: string; problem: string; service: string; context: LeadContext }) {
  return <Html><Head /><Preview>New portfolio project inquiry</Preview><Body style={{ background: "#f6f8f5", fontFamily: "Arial, sans-serif" }}><Container style={{ padding: "28px", background: "#fff" }}>
    <Heading>New project inquiry</Heading><Text><strong>Name:</strong> {name}<br /><strong>Email:</strong> {email}<br /><strong>Service:</strong> {service}<br /><strong>Website:</strong> {website || "No website supplied"}</Text>
    <Text style={{ whiteSpace: "pre-wrap" }}>{problem}</Text><Text>Source: {context.source || "Direct / unknown"}<br />Medium: {context.medium || "Unknown"}<br />Campaign: {context.campaign || "None"}</Text><Text>Reply to this email to respond to the inquiry.</Text>
  </Container></Body></Html>;
}
