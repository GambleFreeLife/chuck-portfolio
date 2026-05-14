const deliverables = [
  {
    title: "Conversion copy",
    text: "I turn your intake into clear page copy, so visitors understand the offer and the next step quickly.",
  },
  {
    title: "Custom Next.js build",
    text: "I build a responsive page in Next.js, so it feels polished on phones, tablets, and desktops.",
  },
  {
    title: "Preview URL",
    text: "I send the finished page on a temporary URL, so you can review the real page before release.",
  },
  {
    title: "Three revision rounds",
    text: "You get three rounds to tighten copy, layout, proof, and offer details before approval.",
  },
  {
    title: "Domain deployment",
    text: "After the balance is paid, I deploy the approved page to your domain within 24 hours.",
  },
  {
    title: "Launch check",
    text: "I check mobile layout, links, forms, and page structure before the page goes live.",
  },
] as const;

const goodFit = [
  "You have one clear offer that needs a focused landing page.",
  "You can answer the intake clearly and review the preview within a few days.",
  "You want a clean page without meetings, long timelines, or a big agency process.",
] as const;

const notFit = [
  "You need more than one focused landing page in this build, since a multi-page site or full brand identity is a different scope.",
  "You want open-ended strategy calls or unlimited revisions without a defined finish line.",
  "You cannot give feedback within 7 days after the preview is ready.",
] as const;

export function OfferDetails() {
  return (
    <section id="included" className="offer-details-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">What you get</div>
          <h2 className="sec-title">A finished landing page, not just a mockup.</h2>
          <p className="sec-sub section-sub-center">
            The scope is tight on purpose, so the 48-hour promise stays real and the page has a
            clear job.
          </p>
        </div>

        <div className="deliverables-grid">
          {deliverables.map((item) => (
            <div className="deliverable-card tilt-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="fit-grid">
          <div className="fit-card">
            <h3>This is a good fit when:</h3>
            <ul>
              {goodFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="fit-card muted-fit">
            <h3>This is not the right fit when:</h3>
            <ul>
              {notFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="fit-bridge">
              If your project is bigger than one focused landing page, the audit, sprint, and full
              website tiers below are sized for it. Or email{" "}
              <a href="mailto:chuck@chuckbaryames.com">chuck@chuckbaryames.com</a> and we&apos;ll talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
