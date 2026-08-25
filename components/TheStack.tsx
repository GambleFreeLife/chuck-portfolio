const steps = [
  {
    number: "01",
    label: "Script",
    description: "Turns your offer into a tight 30-second message a buyer actually finishes.",
  },
  {
    number: "02",
    label: "Motion render",
    description: "Timing, type, captions, and pacing are controlled precisely, not eyeballed.",
  },
  {
    number: "03",
    label: "Social delivery",
    description: "You get MP4 plus captioned cuts sized for the platforms that matter.",
  },
] as const;

export function TheStack() {
  return (
    <section id="stack" className="stack-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">The stack</div>
          <h2 className="sec-title">The production system is narrow on purpose.</h2>
          <p className="sec-sub section-sub-center">
            Every video runs the same build path, which is why the quality stays consistent and
            the 48-hour turnaround is a promise instead of a hope.
          </p>
        </div>
        <ol className="stack-grid">
          {steps.map((step) => (
            <li className="stack-column" key={step.number}>
              <div className="stack-number">{step.number}</div>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="stack-note">
          A narrow system is why one video costs $97 instead of $2,000. You are not paying for an
          agency&apos;s overhead, a producer, and three rounds of meetings.
        </p>
      </div>
    </section>
  );
}
