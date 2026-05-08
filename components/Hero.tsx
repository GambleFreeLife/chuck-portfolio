import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <Image
          src="/mypic.jpg"
          width={160}
          height={160}
          priority
          alt="Chuck Baryames"
          className="hero-photo tilt-card fa"
        />
        <div className="hero-name fa d1">CHUCK BARYAMES</div>
        <h1 className="fa d2">I build conversion-focused landing pages in 48 hours.</h1>
        <p className="hero-sub hero-sub-wide fa d3">
          Start with a refundable $50 deposit, review the finished preview, and pay the rest only
          when it is approved.
        </p>
        <ul className="hero-proof-list fa d4" aria-label="Build-first offer details">
          <li>
            First you send the brief with no payment, then a refundable $50 deposit holds the build
            slot.
          </li>
          <li>
            Within 48 hours, I send a finished preview on a temporary URL, so you can judge the real
            page.
          </li>
          <li>
            After you approve it, you pay the balance, and I put the page on your domain within 24
            hours.
          </li>
        </ul>
        <div className="hero-action fa d5">
          <Link href="/get-started" className="hero-cta">
            Start the build for $50
          </Link>
          <p className="hero-trust">The $50 deposit is the only commitment before the preview is ready.</p>
        </div>
      </div>
    </section>
  );
}
