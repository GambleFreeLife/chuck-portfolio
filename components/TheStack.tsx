const steps = [
  {
    number: "01",
    label: "Video",
    description: "Stops the scroll on LinkedIn and earns the click.",
  },
  {
    number: "02",
    label: "Landing page",
    description: "Captures the click into a real lead.",
  },
  {
    number: "03",
    label: "Email sequence",
    description: "Nurtures the lead until they buy.",
  },
] as const;

export function TheStack() {
  return (
    <section id="stack" className="stack-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">The stack</div>
          <h2 className="sec-title">
            Video alone does not convert. A landing page without traffic is invisible.
          </h2>
          <p className="sec-sub section-sub-center">
            Most freelancers sell pieces. I build the whole funnel because the video is wasted if
            the page is confusing, and the page is wasted if the video does not exist to send
            traffic.
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
        <p className="stack-note">Email sequences coming soon, available now for retainer clients.</p>
      </div>
    </section>
  );
}
