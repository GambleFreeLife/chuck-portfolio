import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

const variants = [
  {
    src: "/demo/showcase-brand-intro",
    poster: "/demo/poster-brand-intro.jpg",
    label: "Brand intro",
    description: "A fast opener for a launch, relaunch, or local offer that needs attention first.",
  },
  {
    src: "/demo/showcase-service-explainer",
    poster: "/demo/poster-service-explainer.jpg",
    label: "Service explainer",
    description: "A short visual path through the problem, service, and next action without a slide deck.",
  },
  {
    src: "/demo/showcase-testimonial",
    poster: "/demo/poster-testimonial.jpg",
    label: "Testimonial cinematic",
    description: "Customer proof turned into motion content that can work on social, ads, and landing pages.",
  },
] as const;

export function VideoShowcase() {
  return (
    <section id="video-work" className="showcase-section secondary-service-section">
      <div className="wrap">
        <div className="growth-proof-heading">
          <div>
            <div className="sec-label">Also available</div>
            <h2 className="sec-title">When attention is the leak, I can build the video too.</h2>
          </div>
          <div className="secondary-service-copy">
            <p className="sec-sub">
              Video is one tool in the stack, not the entire offer. I use it when the problem is
              getting the right person to stop, understand, and click.
            </p>
            <Link href="/order-video?plan=single" className="inline-service-cta">
              Order one 30-second video for $97 →
            </Link>
          </div>
        </div>
        <div className="showcase-grid">
          {variants.map((variant) => (
            <div className="showcase-card tilt-card" key={variant.src}>
              <HeroVideo src={variant.src} poster={variant.poster} ariaLabel={`${variant.label} video`} />
              <div className="showcase-meta">
                <h3>{variant.label}</h3>
                <p>{variant.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
