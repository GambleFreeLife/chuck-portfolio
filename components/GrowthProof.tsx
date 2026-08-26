import Image from "next/image";

const proofItems = [
  {
    label: "Website redesign",
    text: "Rebuilt the Baryames website around clearer service paths, stronger calls-to-action, mobile usability, and local trust proof.",
  },
  {
    label: "Local search",
    text: "Implemented on-page SEO work, Search Console review, Rank Math configuration, and stronger titles, descriptions, internal links, and local intent.",
  },
  {
    label: "Measurement",
    text: "Set up and repaired GA4 and Google Tag Manager so calls, forms, appointments, directions, and other customer actions can be measured instead of guessed.",
  },
  {
    label: "Paid search",
    text: "Managed local Google Ads work, including a tailoring search campaign snapshot with about a 7.2% CTR and $1.61 average CPC.",
  },
] as const;

const baryamesMetrics = [
  { value: "11", label: "locations" },
  { value: "3,000+", label: "local reviews on the live site" },
  { value: "7.2%", label: "tailoring search CTR snapshot" },
  { value: "18", label: "booked appointment actions tracked" },
] as const;

export function GrowthProof() {
  return (
    <section id="work" className="growth-proof-section">
      <div className="wrap">
        <div className="growth-proof-heading">
          <div>
            <div className="sec-label">Proof before promises</div>
            <h2 className="sec-title">I test this work on a real local business first.</h2>
          </div>
          <p className="sec-sub">
            Baryames Cleaners is not a mock client. It is my family&apos;s operating business, and the
            work has to survive real customers, real ad spend, and real payroll.
          </p>
        </div>

        <article className="featured-case-study">
          <div className="featured-case-visual">
            <Image
              src="/portfolio/baryames-current-homepage.jpg"
              alt="Current Baryames Cleaners homepage redesign preview"
              width={1280}
              height={800}
              className="featured-case-image"
              sizes="(max-width: 900px) 92vw, 560px"
            />
          </div>
          <div className="featured-case-copy">
            <div className="case-study-kicker">BARYAMES CLEANERS · LIVE OPERATING BUSINESS</div>
            <div className="case-study-title">I redesigned the website, then built the measurement and growth work around it.</div>
            <p>
              The website is the conversion hub. From there I work across local SEO, Search Console,
              Google Ads, GA4, Tag Manager, email, Google Business Profile, and brand content so the
              traffic and the customer journey can be evaluated together.
            </p>
            <div className="case-study-tags" aria-label="Baryames workstreams">
              <span>WordPress redesign</span>
              <span>Local SEO</span>
              <span>Google Ads</span>
              <span>GA4 + GTM</span>
              <span>Email</span>
              <span>Brand content</span>
            </div>
            <a href="https://baryamescleaners.com" target="_blank" rel="noreferrer" className="case-study-link">
              Inspect the live website →
            </a>
            <div className="case-study-verification">
              Verifiable on the live site: the footer credits “Website redesign &amp; development by Chuck Baryames.”
            </div>
          </div>
        </article>

        <div className="case-study-metric-strip" role="list" aria-label="Selected Baryames proof points">
          {baryamesMetrics.map((metric) => (
            <div className="case-study-metric" role="listitem" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <p className="metric-source-note">
          Public business facts come from the live Baryames site. Campaign numbers are labeled as platform snapshots,
          not as claimed revenue attribution.
        </p>

        <div className="proof-system-grid">
          {proofItems.map((item, index) => (
            <article className="proof-system-card tilt-card" key={item.label}>
              <div className="proof-system-number">0{index + 1}</div>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="proof-clarity-note">
          <strong>I do not invent revenue attribution.</strong>
          <span>
            I show the metrics I can verify, then improve the measurement so future decisions can
            be tied to actual leads and customer actions.
          </span>
        </div>

        <article className="secondary-proof-project">
          <div className="secondary-proof-copy">
            <div className="case-study-kicker">SECOND PROOF OF WORK · FULL-STACK PRODUCT</div>
            <div className="secondary-proof-title">Bet on Recovery proves I can build the system, not just critique it.</div>
            <p>
              I designed, developed, and launched the product from concept to production. The live
              platform includes a private assessment, user accounts, subscription billing, automated
              email, and a large educational content library.
            </p>
            <div className="case-study-tags" aria-label="Bet on Recovery technology">
              <span>Next.js</span>
              <span>Supabase</span>
              <span>Stripe</span>
              <span>Vercel</span>
              <span>Analytics</span>
              <span>50+ guides</span>
            </div>
            <a href="https://betonrecovery.org" target="_blank" rel="noreferrer" className="case-study-link">
              Inspect the live product →
            </a>
          </div>
          <div className="secondary-proof-visual">
            <Image
              src="/portfolio/bet-on-recovery-current.jpg"
              alt="Bet on Recovery live product preview"
              width={1280}
              height={800}
              className="featured-case-image"
              sizes="(max-width: 900px) 92vw, 520px"
            />
          </div>
        </article>

        <div className="proof-actions">
          <a
            href="mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20"
            className="proof-primary-link"
          >
            Send me your site for a free teardown →
          </a>
          <span className="proof-action-note">You will get the first three things I would fix, not a generic sales deck.</span>
        </div>
      </div>
    </section>
  );
}
