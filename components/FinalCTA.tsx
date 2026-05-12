import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="cta-section" id="start">
      <div className="wrap">
        <div className="cta-box">
          <h2>Order a video this week, see the rendered preview in 48 hours.</h2>
          <p>
            Start with one at $97, or go straight to the retainer at $297 a month for four.
          </p>
          <div className="cta-actions">
            <Link href="/order-video?plan=single" className="cta-main-btn">
              Order a video, $97
            </Link>
            <a href="mailto:cbaryames24@gmail.com?subject=Video%20retainer" className="cta-ghost-btn">
              Talk about the retainer
            </a>
          </div>
          <p className="cta-trust">
            Pay once at checkout. Preview in 48 hours. Full refund if I miss the deadline.
          </p>
        </div>
      </div>
    </section>
  );
}
