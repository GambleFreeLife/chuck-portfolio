const proofItems = [
  {
    label: "Website conversion",
    text: "Rebuilt and tightened service and location pages so the offer, proof, and next action are easier to understand on mobile and desktop.",
  },
  {
    label: "Search visibility",
    text: "Implemented on-page SEO work, Search Console review, Rank Math configuration, and stronger titles, descriptions, internal links, and local intent.",
  },
  {
    label: "Measurement",
    text: "Set up and repaired GA4 and Google Tag Manager so calls, forms, appointments, directions, and other customer actions can be measured instead of guessed.",
  },
  {
    label: "Paid search",
    text: "Managed local Google Ads work, including a tailoring search campaign that has produced about a 7.2% click-through rate in the campaign data I have reviewed.",
  },
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

        <div className="proof-live-credit">
          <span>LIVE SITE CREDIT</span>
          <strong>The Baryames website footer credits the redesign and development to Chuck Baryames.</strong>
        </div>

        <div className="proof-actions">
          <a href="https://baryamescleaners.com" target="_blank" rel="noreferrer" className="proof-primary-link">
            View the live Baryames site →
          </a>
          <a
            href="mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20"
            className="proof-secondary-link"
          >
            Ask me to review your site
          </a>
        </div>
      </div>
    </section>
  );
}
