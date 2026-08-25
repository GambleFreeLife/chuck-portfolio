const steps = [
  {
    label: "Diagnose",
    description:
      "I look at the site, search presence, ads, and measurement before I recommend a project. The first goal is to find the leak, not create a bigger scope.",
  },
  {
    label: "Fix",
    description:
      "I implement the agreed changes myself, so the strategy, copy, tracking, and page work do not disappear between handoffs.",
  },
  {
    label: "Measure",
    description:
      "I leave you with a clearer way to judge what happened next, using the customer actions that matter to your business whenever the data supports it.",
  },
] as const;

export function GrowthProcess() {
  return (
    <section id="process" className="growth-process-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">How I work</div>
          <h2 className="sec-title">Find the bottleneck, fix it, then measure the change.</h2>
          <p className="sec-sub section-sub-center">
            You do not need a six-month marketing engagement to find out whether I can help.
          </p>
        </div>
        <ol className="process-grid growth-process-grid">
          {steps.map((step, index) => (
            <li className="process-step tilt-card" key={step.label}>
              <div className="process-number">{index + 1}</div>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="process-note">
          Start with the smallest project that can create a measurable improvement. Expand only
          when the next problem is clear.
        </p>
      </div>
    </section>
  );
}
