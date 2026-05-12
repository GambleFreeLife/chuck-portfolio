const tiers = [
  {
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

export function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Pricing</div>
          <h2 className="sec-title">From a single video to a full funnel.</h2>
          <p className="sec-sub section-sub-center">
            Start with a $97 video. Add the retainer when you want consistency. Add a landing page
            when you need the clicks to convert.
          </p>
        </div>
        <div className="price-grid">
          {tiers.map((tier) => (
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
