// Update only when an outside website client's qualifying deposit is accepted.
export const foundingPlacesAvailable = 3;
export const primaryCta = "Get 3 free fixes for your website";
export const services = [
  {
    id: "landing-page", title: "Landing Page", price: "$750", foundingPrice: "$550",
    label: "One offer. One clear next step.",
    description: "One page built to turn ad, email, or social traffic into calls and inquiries.",
    items: ["1 page, up to 6 sections; copy from your intake", "Mobile and desktop layouts", "Spam-protected form and/or click-to-call", "GA4: successful forms and phone-link clicks", "Title, description and social preview image", "1 revision round"],
    timing: "First preview in 3 business days", cta: "Start with Landing Page", featured: false,
  },
  {
    id: "business-website", title: "Business Website", price: "$1,950", foundingPrice: "$1,450",
    label: "Best fit for most local service businesses",
    description: "A complete website that makes your services easy to understand.",
    items: ["Up to 5 pages with a consistent design", "Copy from your business details", "Mobile layouts and spam-protected form", "On-page SEO and LocalBusiness schema", "GA4: successful forms, phone and email clicks", "2 revision rounds and a handoff"],
    timing: "First preview in 7 business days", cta: "Start with Business Website", featured: true,
  },
  {
    id: "website-ads", title: "Website + Google Ads Launch", price: "$3,250", foundingPrice: "$2,450",
    label: "Ready for paid traffic",
    description: "A website and a focused Search campaign built together.",
    items: ["Everything in Business Website", "1 Search campaign, up to 3 ad groups", "Keyword research, ad copy and negatives", "Google Ads conversions linked to GA4", "15-30 sec brand video from your assets: 1 format, 1 revision, no filming", "30-day review with written recommendations"],
    timing: "First website preview in 10 business days", cta: "Start with Website + Google Ads Launch", featured: false,
  },
] as const;
export const serviceLabels: Record<string, string> = {
  "free-review": "3 free website fixes",
  ...Object.fromEntries(services.map(service => [service.id, service.title])),
  "ads-management": "Google Ads management", "email-campaigns": "Email campaigns",
  "short-video": "Short-form video", "brand-video": "One-off brand video", "focused-help": "Focused fixes",
};
