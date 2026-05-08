const steps = [
  {
    label: "Intake",
    description:
      "You fill out the 12-question intake first, and you do not pay anything before the brief is clear.",
  },
  {
    label: "$50 to start",
    description:
      "Then a refundable $50 deposit holds your slot, so I can build without a sales call or meeting.",
  },
  {
    label: "Preview build",
    description:
      "Within 48 hours, I build the page on a temporary preview URL, and you review the real work.",
  },
  {
    label: "Balance and domain",
    description:
      "After you approve, you pay the $447 balance, and within 24 hours your page is live on your domain.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">How it works</div>
          <h2 className="sec-title">You see the page before you pay the balance.</h2>
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
        <p className="process-note">Total cost is $497, and you only commit $50 to start.</p>
      </div>
    </section>
  );
}
