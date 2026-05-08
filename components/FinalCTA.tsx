import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="cta-section" id="start">
      <div className="wrap">
        <div className="cta-box">
          <h2>See the finished preview before you pay the balance.</h2>
          <p>
            Start with the $50 deposit, review the page within 48 hours, and pay the rest only
            after approval.
          </p>
          <Link href="/get-started" className="cta-main-btn">
            Hold my build slot for $50
          </Link>
          <p className="cta-trust">
            If I miss the 48-hour deadline, your $50 comes back automatically. If the page misses
            your brief after three revision rounds and you can tell me why, your $50 comes back too.
          </p>
        </div>
      </div>
    </section>
  );
}
