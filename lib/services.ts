export const services = [
  {
    id: "landing-page", title: "One-page launch", price: "$350", label: "One offer. One clear next step.",
    description: "A focused landing page for a service, offer, or new business.",
    items: ["One page, up to 5 sections", "Your supplied copy and images, polished", "Mobile layout and one contact form", "Page title, description, and launch setup", "One revision round"],
    timing: "First preview in 3 business days", cta: "Start with one page", featured: false,
  },
  {
    id: "business-website", title: "Business website", price: "$950", label: "Room to tell the whole story.",
    description: "A complete website that makes your services easy to understand.",
    items: ["Up to 5 pages with a consistent design", "Copy drafted from your business details", "Mobile layouts and a protected inquiry form", "Basic on-page SEO and inquiry tracking", "Two revision rounds and a handoff"],
    timing: "First preview in 7 business days", cta: "Plan my website", featured: true,
  },
  {
    id: "website-ads", title: "Website + ads launch", price: "$1,750", label: "A website and a way to reach people.",
    description: "Connect your website to a focused Google Search campaign.",
    items: ["Everything in Business website", "One Google Search campaign, up to 3 ad groups", "Keyword research, ad copy, and tracking", "One campaign review after 30 days", "Optional 15–30 second brand video, one format"],
    timing: "First website preview in 10 business days", cta: "Plan my launch", featured: false,
  },
] as const;

export const serviceLabels: Record<string, string> = Object.fromEntries(services.map(service => [service.id, `${service.title} (${service.price})`]));
