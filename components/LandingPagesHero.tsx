import Link from "next/link";

export function LandingPagesHero() {
  return (
    <section className="hero landing-pages-hero">
      <div className="wrap">
        <div className="landing-pages-hero-inner">
          <div className="hero-name fa">LANDING PAGE SERVICES</div>
          <h1 className="fa d1">
            <span>Landing pages built to turn traffic into leads.</span>
          </h1>
          <p className="hero-sub hero-sub-wide fa d2">
            One focused page starts at $497, with a $50 slot hold and a 48-hour preview before the
            final balance comes due.
          </p>
          <ul className="hero-proof-list fa d3">
            <li>
              <strong>Offer clarity first.</strong> The page leads with what you sell, who it helps,
              and why the next step is worth taking.
            </li>
            <li>
              <strong>Trust before action.</strong> Proof, process, and objections are placed before
              the visitor reaches the form.
            </li>
            <li>
              <strong>Built for one conversion path.</strong> Every section points toward the action
              that matters most.
            </li>
          </ul>
          <div className="hero-action fa d4">
            <Link href="/get-started" className="hero-cta">
              Start the landing page brief
            </Link>
            <a href="#work" className="hero-cta-ghost">
              See the work
            </a>
          </div>
          <p className="hero-trust fa d5">
            You see the preview before the $447 balance is due, and three revision rounds are included.
          </p>
        </div>
      </div>
    </section>
  );
}
