import Link from "next/link";

export function LandingPagesFinalCTA() {
  return (
    <section className="cta-section" id="start">
      <div className="wrap">
        <div className="cta-box">
          <h2>Give your traffic somewhere clear to land.</h2>
          <p>
            Send the brief, hold the build slot for $50, and I will send the first landing page
            preview within 48 hours.
          </p>
          <div className="cta-actions">
            <Link href="/get-started" className="cta-main-btn">
              Start the landing page brief
            </Link>
            <a href="mailto:cbaryames24@gmail.com?subject=Landing%20page%20project" className="cta-ghost-btn">
              Ask a question first
            </a>
          </div>
          <p className="cta-trust">
            Three revision rounds are included, and the $447 balance only comes due after you
            approve the preview.
          </p>
        </div>
      </div>
    </section>
  );
}
