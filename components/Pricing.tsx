const tiers = [
  {
    category: "video",
    title: "Single Video",
    amount: "$97",
    suffix: null,
    items: [
      "One 30-second video",
      "48-hour delivery",
      "2 revision rounds",
      "MP4 plus captioned versions for 3 platforms",
      "Music and motion designed per brand",
    ],
    cta: "Order a video",
    href: "/order-video?plan=single",
    featured: false,
    badge: null,
  },
  {
    category: "video",
    title: "Video Retainer",
    amount: "$297",
    suffix: "/mo",
    items: [
      "4 videos per month",
      "Custom style locked to your brand",
      "Priority 24-hour delivery available",
      "Quarterly strategy session",
      "Pause or cancel any time",
    ],
    cta: "Start the retainer",
    href: "/order-video?plan=retainer",
    featured: true,
    badge: "Most popular",
  },
  {
    category: "landing",
    title: "Landing Page",
    amount: "$497",
    suffix: null,
    items: [
      "One high-converting landing page",
      "$50 deposit holds the slot, balance after preview approval",
      "48-hour preview delivery",
      "3 revision rounds",
      "Pairs with your videos for full funnel",
    ],
    cta: "Build the page",
    href: "/get-started",
    featured: false,
    badge: null,
  },
  {
    category: "landing",
    title: "Full Site",
    amount: "$1,997",
    suffix: "+",
    items: [
      "Multi-page conversion-optimized site",
      "Includes 4 launch videos",
      "10-14 day delivery",
      "3 revision rounds",
      "SEO foundations and analytics",
    ],
    cta: "Discuss the build",
    href: "mailto:cbaryames24@gmail.com?subject=Full%20site%20project",
    featured: false,
    badge: null,
  },
] as const;

type PricingFocus = "video" | "landing";

const sectionCopy = {
  video: {
    label: "Pricing",
    title: "Start with one video, then build a content engine.",
    sub: "Order one 30-second brand video for $97, or use the retainer when you want consistent motion content every month.",
  },
  landing: {
    label: "Pricing",
    title: "From one focused landing page to a full site.",
    sub: "Start with a $497 landing page when you need one conversion path, or use the full site tier when the project needs more scope.",
  },
} as const;

export function Pricing({ focus = "video" }: { focus?: PricingFocus }) {
  const visibleTiers = tiers.filter((tier) => tier.category === focus);
  const copy = sectionCopy[focus];

  return (
    <section id="pricing" className="pricing-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">{copy.label}</div>
          <h2 className="sec-title">{copy.title}</h2>
          <p className="sec-sub section-sub-center">{copy.sub}</p>
        </div>
        <div className="price-grid">
          {visibleTiers.map((tier) => (
            <div
              className={`price-card tilt-card${tier.featured ? " featured" : ""}`}
              key={tier.title}
            >
              {tier.badge ? <div className="price-badge">{tier.badge}</div> : null}
              <h3>{tier.title}</h3>
              <div className="price-amt">
                {tier.amount}
                {tier.suffix ? <span>{tier.suffix}</span> : null}
              </div>
              <ul className="price-list">
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={tier.href} className={`price-btn ${tier.featured ? "solid" : "ghost"}`}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
