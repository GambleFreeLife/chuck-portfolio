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
    title: "3-Video Pack",
    amount: "$247",
    suffix: null,
    note: "Save $44 vs single pricing",
    items: [
      "Three 30-second videos",
      "7-day delivery for all three",
      "2 revision rounds per video",
      "MP4 plus captioned versions for 3 platforms",
      "Music and motion designed per brand",
    ],
    cta: "Order the pack",
    href: "/order-video?plan=pack",
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
    title: "Website Quick Win",
    amount: "$299",
    suffix: null,
    note: "Starts with the free teardown",
    items: [
      "The three highest-impact fixes, implemented",
      "Page copy, calls-to-action, and mobile layout",
      "Titles, meta descriptions, and local search basics",
      "Before and after screenshots so you can see what changed",
      "Works on the site you already have, no rebuild required",
    ],
    cta: "Start with a teardown",
    href: "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20",
    featured: false,
    badge: null,
  },
  {
    category: "landing",
    title: "Landing Page",
    amount: "$497",
    suffix: null,
    note: null,
    items: [
      "One high-converting landing page",
      "$50 deposit holds the slot, balance after preview approval",
      "48-hour preview delivery",
      "3 revision rounds",
      "Pairs with your videos for full funnel",
    ],
    cta: "Build the page",
    href: "/get-started",
    featured: true,
    badge: "Most popular",
  },
  {
    category: "landing",
    title: "Full Site",
    amount: "$1,997",
    suffix: "+",
    note: null,
    items: [
      "Multi-page conversion-optimized site",
      "Includes 4 launch videos",
      "10-14 day delivery",
      "3 revision rounds",
      "SEO foundations and analytics",
    ],
    cta: "Discuss the build",
    href: "mailto:chuck@chuckbaryames.com?subject=Full%20site%20project",
    featured: false,
    badge: null,
  },
] as const;

type PricingFocus = "video" | "landing";

const sectionCopy = {
  video: {
    label: "Pricing",
    title: "Start with one video, a pack, or a content engine.",
    sub: "One 30-second brand video is $97 because the production system is narrow, not because the work is thin. Order one to see it, take the pack when you want a run of them, or use the retainer when you want consistent content every month.",
    note: "Need more than 4 a month? Custom retainers start at $497/mo. Book a call →",
    noteHref: "#contact",
  },
  landing: {
    label: "Pricing",
    title: "Start where the problem actually is.",
    sub: "If the site mostly works and is leaking, fix it. If the page needs to exist, build it. If the whole thing is holding you back, replace it. Every tier starts with a free teardown so you know which one you actually need.",
    note: "Need a custom multi-page build or a larger scope? Email me and I will quote it before you commit. →",
    noteHref: "#contact",
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
        <div className={`price-grid ${focus}-pricing-grid`}>
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
              {"note" in tier && tier.note ? <div className="price-note">{tier.note}</div> : null}
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
        <p className="pricing-footnote">
          <a href={copy.noteHref}>{copy.note}</a>
        </p>
      </div>
    </section>
  );
}
