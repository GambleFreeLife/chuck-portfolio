import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";
import { budgetOptions, serviceOptions, timelineOptions, adBudgetOptions, type ProjectInquiry } from "@/lib/project-inquiry";
import type { LeadContext } from "@/lib/lead-context";
import { container, divider, eyebrow, heading, label, main, text, value } from "./styles";
export default function ProjectInquiryEmail(props: ProjectInquiry & LeadContext) {
  const fields = [
    ["Business", props.business], ["Name", props.name], ["Email", props.email],
    ["Reply preference", props.contactMethod === "call" ? "Phone call about this project" : "Email"],
    ["Phone", props.phone || "Not supplied"], ["Website (visitor-provided)", props.website || "No current website"],
    ["Service", serviceOptions[props.service]], ["Initial service budget", budgetOptions[props.budget]],
    ["Monthly advertising budget", props.adBudget ? adBudgetOptions[props.adBudget] : "Not applicable"],
    ["Timeline", timelineOptions[props.timeline]], ["Project goal", props.problem],
    ["Source / medium (visitor-provided)", `${props.source || "Direct / untagged"} / ${props.medium || "Not supplied"}`],
    ["Campaign / offer", `${props.campaign || "Not supplied"} / ${props.offer || props.service}`],
  ];
  return <Html><Head /><Preview>Project inquiry from {props.business}</Preview><Body style={main}><Container style={container}>
    <Text style={eyebrow}>New project inquiry</Text><Heading style={heading}>{props.business} is interested in working with you.</Heading>
    <Text style={text}>Review the goal, budget, and timing, then reply with a fit decision or a short call invitation. No free audit has been promised.</Text>
    <Text style={text}>The form passed a bot check. Business identity, ownership, and budget are self-reported and still need your review. A phone number is not marketing SMS consent.</Text>
    <Hr style={divider} />{fields.map(([title, content]) => <div key={title}><Text style={label}>{title}</Text><Text style={value}>{content}</Text></div>)}
  </Container></Body></Html>;
}
