export const serviceOptions = {
  "lead-generation": "Google Ads + landing page: $1,000 setup + $750/month",
  "landing-page": "Focused landing page: $1,250 one time",
  "website-redesign": "Business website: from $2,500",
  "recommendation": "Help me choose the right scope",
} as const;
export const budgetOptions = {
  "1250-2499": "$1,250 to $2,499",
  "2500-4999": "$2,500 to $4,999",
  "5000-plus": "$5,000 or more",
  "need-guidance": "I need guidance on the budget",
} as const;
export const timelineOptions = {
  "this-month": "Within a month",
  "1-3-months": "In the next 1 to 3 months",
  "planning": "Planning a future project",
} as const;
export const adBudgetOptions = {
  "1000-1999": "$1,000 to $1,999/month",
  "2000-3000": "$2,000 to $3,000/month",
  "3000-plus": "More than $3,000/month",
  "need-guidance": "Help me work out a viable budget",
} as const;
export type ProjectInquiry = {
  name: string; email: string; business: string; website: string; phone: string;
  contactMethod: "email" | "call"; problem: string;
  service: keyof typeof serviceOptions; budget: keyof typeof budgetOptions;
  timeline: keyof typeof timelineOptions; adBudget: keyof typeof adBudgetOptions | "";
};
const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
const has = <T extends object>(choices: T, value: string): value is Extract<keyof T, string> => Object.hasOwn(choices, value);
export function validateProjectInquiry(data: Record<string, unknown>): { value: ProjectInquiry; error?: never } | { error: string; value?: never } {
  const name = clean(data.name), email = clean(data.email).toLowerCase(), business = clean(data.business);
  const phone = clean(data.phone), problem = clean(data.problem), websiteInput = clean(data.website);
  const service = clean(data.service), budget = clean(data.budget), timeline = clean(data.timeline), adBudget = clean(data.adBudget);
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name)) return { error: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return { error: "Enter a valid email address." };
  if (business.length < 2 || business.length > 120 || /[\r\n]/.test(business)) return { error: "Enter your business name." };
  if (!has(serviceOptions, service) || !has(budgetOptions, budget) || !has(timelineOptions, timeline)) return { error: "Choose a service, budget, and timeline." };
  if (service === "lead-generation" && !has(adBudgetOptions, adBudget)) return { error: "Choose an advertising budget." };
  if (data.contactMethod !== "email" && data.contactMethod !== "call") return { error: "Choose how you would like me to reply." };
  if ((phone && (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15 || phone.length > 35)) || (data.contactMethod === "call" && !phone)) return { error: "Enter a valid phone number for a call, or choose email." };
  if (problem.length < 30 || problem.length > 1500) return { error: "Tell me about your service, customers, and goal in 30 to 1,500 characters." };
  if (data.authorized !== true) return { error: "Confirm that you are contacting me about a project for your business or a business you represent." };
  let website = "";
  if (websiteInput) {
    try {
      if (websiteInput.length > 300) throw new Error();
      const url = new URL(/^https?:\/\//i.test(websiteInput) ? websiteInput : `https://${websiteInput}`);
      if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || !url.hostname.includes(".") || /^\d+(\.\d+){3}$/.test(url.hostname) || /[\[\]]/.test(url.hostname) || /\.(local|internal|localhost)$/i.test(url.hostname)) throw new Error();
      website = url.toString();
    } catch { return { error: "Enter a public website address, or leave it blank if you do not have one yet." }; }
  }
  return { value: { name, email, business, phone, website, problem, service, budget, timeline, adBudget: service === "lead-generation" && has(adBudgetOptions, adBudget) ? adBudget : "", contactMethod: data.contactMethod } };
}
