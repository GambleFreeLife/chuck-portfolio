const steps = [
  {
    label: "Brief in 3 minutes",
    description: "Tell me your offer, your audience, and pick a style from the showcase.",
  },
  {
    label: "Preview in 48 hours",
    description: "Watch the actual rendered video and request changes within 7 days.",
  },
  {
    label: "Final delivery",
    description:
      "Approved video lands in your inbox as MP4 plus captioned versions for LinkedIn, X, and Instagram.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">How it works</div>
          <h2 className="sec-title">You see the rendered video before you approve.</h2>
        </div>
        <ol className="process-grid">
          {steps.map((step, index) => (
            <li className="process-step tilt-card" key={step.label}>
              <div className="process-number">{index + 1}</div>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="process-note">
          $97 for one video. $297 a month for four. Landing pages start at $497 when the video
          needs somewhere to send clicks.
        </p>
      </div>
    </section>
  );
}
