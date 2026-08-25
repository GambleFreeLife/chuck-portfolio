import Link from "next/link";

const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

const offers = [
  {
    title: "3-point teardown",
    price: "$0",
    note: "Best first step",
    items: [
      "Send me your website URL",
      "I identify the three highest-impact issues I see",
      "You get a direct reply with what I would fix first",
      "No call required and no obligation to hire me",
    ],
    cta: "Send your site",
    href: auditHref,
    featured: false,
  },
  {
    title: "Website Quick Win",
    price: "$299",
    note: "Most owners should start here",
    items: [
      "I implement the top three agreed website fixes",
      "Copy, calls-to-action, and mobile conversion cleanup",
      "Basic on-page SEO and local-search cleanup where relevant",
      "Before and after summary of what changed",
    ],
    cta: "Start with the teardown",
    href: auditHref,
    featured: true,
  },
  {
    title: "Growth Sprint",
    price: "$599",
    note: "For a bigger leak",
    items: [
      "Focused review across website, SEO, ads, and measurement",
      "Up to five priority page or tracking improvements",
      "GA4, Tag Manager, or Search Console cleanup where relevant",
      "A short handoff showing what changed and what to watch next",
    ],
    cta: "Ask if a sprint fits",
    href: auditHref,
    featured: false,
  },
] as const;

export function GrowthPricing() {
  return (
    <section id="pricing" className="pricing-section growth-pricing-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Simple starting points</div>
          <h2 className="sec-title">Pay for the fix, not a pile of meetings.</h2>
          <p className="sec-sub section-sub-center">
            Fixed-price work keeps the first decision small. If the audit shows that you need a
            different scope, I will tell you before you spend anything.
          </p>
        </div>
        <div className="growth-price-grid">
          {offers.map((offer) => (
            <article
              className={`growth-price-card tilt-card${offer.featured ? " featured" : ""}`}
              key={offer.title}
            >
              <div className="growth-price-note">{offer.note}</div>
              <h3>{offer.title}</h3>
              <div className="growth-price-amount">{offer.price}</div>
              <ul>
                {offer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={offer.href} className={offer.featured ? "growth-price-btn solid" : "growth-price-btn"}>
                {offer.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-footnote">
          Need a standalone conversion page instead? <Link href="/landing-pages">Landing pages start at $497.</Link>
        </p>
      </div>
    </section>
  );
}
