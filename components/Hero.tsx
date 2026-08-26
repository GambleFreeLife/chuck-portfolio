import { LiveSitePreview } from "@/components/LiveSitePreview";

export function Hero() {
  return (
    <section className="hero portfolio-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-name fa">CHUCK BARYAMES</div>
          <h1 className="fa d1">
            <span>Most local businesses</span>
            <span>don&apos;t need more marketing.</span>
            <span>They need the leaks fixed.</span>
          </h1>
          <p className="hero-sub fa d2">
            I run digital growth for Baryames Cleaners, an 11-location family business open since
            1922. I fix websites, local SEO, Google Ads, and tracking so more of the traffic you
            already have becomes calls and bookings.
          </p>
          <div className="hero-action fa d3">
            <a href="#audit" className="hero-cta">
              Get my free 3-point website audit
            </a>
            <a href="#work" className="hero-cta-ghost">
              See the proof first
            </a>
          </div>
          <p className="hero-trust fa d4">
            Send your name, email, and website. I&apos;ll review it myself and tell you the three
            highest-impact things I would fix first. No sales call required.
          </p>
          <div className="hero-signal-row fa d5" aria-label="Areas of expertise">
            <span>Website conversion</span>
            <span>Local SEO</span>
            <span>Google Ads</span>
            <span>Analytics</span>
          </div>
        </div>

        <div className="hero-proof-shell fa d2" aria-label="Live Baryames Cleaners proof of work">
          <div className="hero-proof-topline">
            <div>
              <div className="hero-proof-kicker">CURRENT PROVING GROUND</div>
              <strong>Baryames Cleaners</strong>
            </div>
            <span className="hero-proof-live">REAL LIVE SITE</span>
          </div>
          <LiveSitePreview
            url="https://baryamescleaners.com/"
            label="Baryames Cleaners website redesigned by Chuck Baryames"
            priority
          />
          <div className="hero-proof-metrics" role="list" aria-label="Selected proof points">
            <div role="listitem">
              <strong>11</strong>
              <span>locations</span>
            </div>
            <div role="listitem">
              <strong>3,000+</strong>
              <span>local reviews</span>
            </div>
            <div role="listitem">
              <strong>7.2%</strong>
              <span>search CTR snapshot</span>
            </div>
          </div>
          <p className="hero-proof-verification">
            The live footer publicly credits the website redesign and development to Chuck Baryames.
          </p>
        </div>
      </div>
    </section>
  );
}
