import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <Image
          src="/mypic.jpg"
          width={120}
          height={120}
          priority
          alt="Chuck Baryames"
          className="hero-photo tilt-card fa"
        />
        <div className="hero-name fa d1">CHUCK BARYAMES</div>
        <h1 className="fa d2">
          <span>Agencies want $5k upfront.</span>
          <span>This page starts at $50.</span>
        </h1>
        <p className="hero-sub hero-sub-wide fa d3">
          Start with a refundable $50 deposit, review the finished preview, and pay the rest only
          when it is approved.
        </p>
        <ul className="hero-proof-list fa d4" aria-label="Build-first offer details">
          <li>
            <strong>No payment to start.</strong> $50 holds your build slot, refundable if I miss
            the deadline.
          </li>
          <li>
            <strong>Preview in 48 hours.</strong> I send a real URL, you judge the actual page.
          </li>
          <li>
            <strong>Pay the balance only when you love it.</strong> Then your page goes live within
            24 hours.
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
