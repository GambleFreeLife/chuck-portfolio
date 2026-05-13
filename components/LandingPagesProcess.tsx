const steps = [
  {
    label: "Clarify the offer",
    description: "I turn the brief into a sharper promise, a clear audience, and one primary action.",
  },
  {
    label: "Build the proof path",
    description: "The page answers trust, fit, timeline, and risk before the visitor reaches the CTA.",
  },
  {
    label: "Ship the page",
    description: "You review the preview, use the revision rounds, and then I deploy the approved page.",
  },
] as const;

export function LandingPagesProcess() {
  return (
    <section id="how-it-works">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Conversion psychology</div>
          <h2 className="sec-title">The page is built around the decision your buyer needs to make.</h2>
          <p className="sec-sub section-sub-center">
            Pretty pages are not enough. The page needs to make the offer obvious, reduce doubt,
            and make the next step feel easy.
          </p>
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
          A focused landing page starts at $497. The $50 deposit holds the build slot, and the
          balance comes due after preview approval.
        </p>
      </div>
    </section>
  );
}
