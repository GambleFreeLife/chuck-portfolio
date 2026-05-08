const offerings = [
  {
    title: "Revenue Leak Audit",
    amount: "$300",
    items: [
      "Homepage and key page review",
      "Mobile and form friction check",
      "Top 5 fixes ranked by impact",
      "Rewritten hero section and CTA",
      "Credited toward a build project",
      "Delivered within 48 hours",
    ],
    cta: "Request Audit",
    href: "mailto:cbaryames24@gmail.com?subject=Revenue%20leak%20audit",
    featured: false,
  },
  {
    title: "Lead Fix Sprint",
    amount: "$950",
    items: [
      "One priority page cleaned up or rebuilt",
      "Conversion-focused copy included",
      "CTA, trust, FAQ, and form improvements",
      "Mobile responsive implementation",
      "Basic analytics and SEO foundations",
      "2 rounds of revisions",
      "3-5 day delivery",
    ],
    cta: "Fix My Page",
    href: "mailto:cbaryames24@gmail.com?subject=Lead%20fix%20sprint",
    featured: true,
  },
  {
    title: "Business Website",
    amount: "$1,997",
    suffix: "+",
    items: [
      "Multi-page website redesign",
      "Copywriting and page structure",
      "Service pages built for lead capture",
      "Contact, quote, or booking flow",
      "SEO foundations and analytics",
      "3 rounds of revisions",
      "10-14 day delivery",
    ],
    cta: "Discuss Website",
    href: "mailto:cbaryames24@gmail.com?subject=Business%20website%20project",
    featured: false,
  },
] as const;

export function OtherOfferings() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="wrap">
        <div className="sec-label">Other ways to work together</div>
        <h2 className="sec-title">Choose these when the $497 page is too small for the job.</h2>
        <p className="sec-sub section-sub-center">
          The build-first offer is for one focused landing page, but these options fit deeper
          fixes, bigger scopes, or full-site work.
        </p>
        <div className="price-grid other-offerings-grid">
          {offerings.map((offering) => (
            <div className={`price-card tilt-card${offering.featured ? " pop" : ""}`} key={offering.title}>
              {offering.featured ? <div className="price-badge">Fastest fix</div> : null}
              <h3>{offering.title}</h3>
              <div className="price-amt">
                {offering.amount}
                {"suffix" in offering ? <span>{offering.suffix}</span> : null}
              </div>
              <ul className="price-list">
                {offering.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href={offering.href} className={`price-btn ${offering.featured ? "solid" : "ghost"}`}>
                {offering.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
