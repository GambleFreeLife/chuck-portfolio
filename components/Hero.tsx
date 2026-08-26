import Image from "next/image";

const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

export function Hero() {
  return (
    <section className="hero">
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
            <a href={auditHref} className="hero-cta">
              Send me your site for a free teardown
            </a>
            <a href="#work" className="hero-cta-ghost">
              See proof of work
            </a>
          </div>
          <p className="hero-trust fa d4">
            Send your URL. I&apos;ll reply with the three highest-impact things I&apos;d fix first.
            No call required and no retainer required.
          </p>
          <p className="hero-stack-trust fa d5">
            Website redesign · local SEO · paid search · analytics · brand content
          </p>
        </div>

        <div className="hero-proof-shell fa d2" aria-label="Baryames Cleaners proof of work">
          <a
            className="hero-proof-card hero-proof-card-link"
            href="https://baryamescleaners.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the live Baryames Cleaners website"
          >
            <div className="hero-proof-topline">
              <div className="hero-proof-kicker">CURRENT PROVING GROUND</div>
              <span className="hero-proof-live">LIVE SITE ↗</span>
            </div>
            <div className="hero-proof-image-wrap current-site-preview">
              <Image
                src="/portfolio/baryames-current-homepage.jpg"
                alt="Current Baryames Cleaners homepage redesign preview"
                width={1280}
                height={800}
                className="hero-proof-image"
                priority
                sizes="(max-width: 900px) 92vw, 470px"
              />
            </div>
            <div className="hero-proof-copy">
              <strong>Baryames Cleaners</strong>
              <span>
                Full website redesign plus local SEO, paid search, analytics, email, and brand content.
              </span>
            </div>
            <div className="hero-proof-metrics" role="list" aria-label="Selected proof points">
              <div role="listitem">
                <strong>11</strong>
                <span>Locations</span>
              </div>
              <div role="listitem">
                <strong>3,000+</strong>
                <span>Local reviews</span>
              </div>
              <div role="listitem">
                <strong>7.2%</strong>
                <span>Search CTR example</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
