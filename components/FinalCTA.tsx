import { AuditLeadForm } from "@/components/AuditLeadForm";

export function FinalCTA() {
  return (
    <section className="cta-section audit-section" id="audit">
      <div className="wrap">
        <div className="audit-grid">
          <div className="audit-copy">
            <div className="sec-label">Start with evidence</div>
            <h2>Send me your website. I&apos;ll tell you what I would fix first.</h2>
            <p>
              You do not need to choose between SEO, ads, a redesign, or a new landing page before we
              know where the leak is. I will look at the actual site first.
            </p>
            <div className="audit-expectations">
              <div><strong>1</strong><span>You send the site.</span></div>
              <div><strong>2</strong><span>I review the customer path, search visibility, and measurement clues.</span></div>
              <div><strong>3</strong><span>I reply with the three fixes I would prioritize.</span></div>
            </div>
            <p className="cta-trust">
              If I do not see a worthwhile fix, I will say so. If I do, you can hire me to implement it or use the feedback yourself.
            </p>
          </div>
          <AuditLeadForm />
        </div>
      </div>
    </section>
  );
}
