import { HeroVideo } from "./HeroVideo";

const variants = [
  {
    src: "/demo/showcase-brand-intro",
    poster: "/demo/poster-brand-intro.jpg",
    label: "Brand intro",
    description: "Stop-the-scroll opener for a launch or relaunch.",
  },
  {
    src: "/demo/showcase-service-explainer",
    poster: "/demo/poster-service-explainer.jpg",
    label: "Service explainer",
    description: "Walks a buyer through what you do without slides.",
  },
  {
    src: "/demo/showcase-testimonial",
    poster: "/demo/poster-testimonial.jpg",
    label: "Testimonial cinematic",
    description: "Customer words rendered with kinetic type and cinematic pacing.",
  },
] as const;

export function VideoShowcase() {
  return (
    <section id="showcase" className="showcase-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Range</div>
          <h2 className="sec-title">Three styles, one production system.</h2>
          <p className="sec-sub section-sub-center">
            Every video is rendered with code, so the look stays consistent and the turnaround
            stays fast.
          </p>
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
