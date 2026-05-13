import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-name fa">CHUCK BARYAMES</div>
          <h1 className="fa d1">
            <span>Agencies charge $2,000</span>
            <span>per brand video.</span>
            <span>Mine start at $97.</span>
          </h1>
          <p className="hero-sub fa d2">
            Built with code, rendered frame-perfect, delivered in 48 hours. The same system I use
            for my own LinkedIn lands client-quality video for a tenth of the price.
          </p>
          <div className="hero-action fa d3">
            <Link href="/order-video?plan=single" className="hero-cta">
              Order one video, $97
            </Link>
            <Link href="/order-video?plan=retainer" className="hero-cta-ghost">
              Get 4 a month, $297
            </Link>
          </div>
          <p className="hero-trust fa d4">
            Pay once at checkout. Preview in 48 hours. Full refund if I miss the deadline.
          </p>
          <p className="hero-stack-trust fa d5">Stack: Remotion, Next.js, Codex, Vercel</p>
        </div>
        <div className="hero-video fa d2">
          <HeroVideo
            src="/demo/linkedin-ad"
            poster="/demo/poster-hero.jpg"
            ariaLabel="Sample brand video by Chuck Baryames"
            aspectRatio="1 / 1"
            priority
          />
        </div>
      </div>
    </section>
  );
}
