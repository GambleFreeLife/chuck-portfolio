import Link from "next/link";

const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

const services = [
  {
    eyebrow: "Website conversion",
    title: "Fix the page that is losing the customer.",
    text: "I tighten the offer, mobile layout, trust proof, calls-to-action, and conversion path on the site you already have, or I build the focused page you are missing.",
    detail: "Quick Wins start at $299. Focused landing pages start at $497.",
    cta: "See landing page work",
    href: "/landing-pages",
    type: "internal",
  },
  {
    eyebrow: "Local SEO + analytics",
    title: "Make Google easier to understand and easier to act on.",
    text: "I review page targeting, Search Console, titles, metadata, internal linking, GA4, Tag Manager, and the basic local-search issues that keep good businesses invisible or unmeasured.",
    detail: "Best when you already have traffic but do not know what is working.",
    cta: "Start with the free teardown",
    href: auditHref,
    type: "external",
  },
  {
    eyebrow: "Google Ads",
    title: "Stop paying for clicks you cannot evaluate.",
    text: "I clean up campaign structure, search intent, ad copy, landing-page alignment, and conversion tracking so the account is built around customer actions instead of vanity traffic.",
    detail: "Best for established local services where one new customer is worth real money.",
    cta: "Send me your current site",
    href: auditHref,
    type: "external",
  },
  {
    eyebrow: "Brand video",
    title: "Earn attention before the visitor reaches the page.",
    text: "I also build short motion-led brand videos for social and ads. It is useful when the page converts well but not enough people stop, click, or understand the offer.",
    detail: "Real Baryames campaign examples are shown below in both social and in-store formats.",
    cta: "See the brand content",
    href: "/#video-work",
    type: "internal",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="services-section">
      <div className="wrap">
        <div className="growth-proof-heading">
          <div>
            <div className="sec-label">What I fix</div>
            <h2 className="sec-title">One person across the parts that usually get handed off.</h2>
          </div>
          <p className="sec-sub">
            The goal is not to sell you every service. It is to find the bottleneck that is costing
            you customers and fix that part first.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card tilt-card" key={service.eyebrow}>
              <div className="service-card-eyebrow">{service.eyebrow}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-card-detail">{service.detail}</div>
              {service.type === "internal" ? (
                <Link href={service.href} className="service-card-link">
                  {service.cta} <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <a href={service.href} className="service-card-link">
                  {service.cta} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
