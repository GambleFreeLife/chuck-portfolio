const steps = [
  {
    number: "01",
    label: "Script",
    description: "Turns your offer into a tight 30-second message.",
  },
  {
    number: "02",
    label: "Motion render",
    description: "Uses code to control timing, type, captions, and pacing.",
  },
  {
    number: "03",
    label: "Social delivery",
    description: "Gives you MP4 plus captioned versions for the platforms that matter.",
  },
] as const;

export function TheStack() {
  return (
    <section id="stack" className="stack-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">The stack</div>
          <h2 className="sec-title">
            The production system is narrow on purpose.
          </h2>
          <p className="sec-sub section-sub-center">
            I use the same repeatable build path for every video, so the work stays precise and
            the turnaround stays fast.
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
          Remotion, Codex, and Next.js keep the workflow repeatable instead of reinventing every
          frame by hand.
        </p>
      </div>
    </section>
  );
}
