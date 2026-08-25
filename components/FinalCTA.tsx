const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

export function FinalCTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="wrap">
        <div className="cta-box growth-cta-box">
          <div className="sec-label">Start with evidence</div>
          <h2>Send me your website. I&apos;ll tell you what I would fix first.</h2>
          <p>
            You do not need to choose between SEO, ads, a redesign, or a new landing page before we
            know where the leak is.
          </p>
          <div className="cta-actions">
            <a href={auditHref} className="cta-main-btn">
              Get the free 3-point teardown
            </a>
            <a href="#work" className="cta-ghost-btn">
              Review the proof first
            </a>
          </div>
          <p className="cta-trust">
            No call required. No retainer required. If I do not see a worthwhile fix, I will say so.
          </p>
        </div>
      </div>
    </section>
  );
}
