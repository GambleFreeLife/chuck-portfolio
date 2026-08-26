const work = [
  {
    src: "/portfolio/baryames-wash-fold-horizontal.mp4",
    poster: "/portfolio/baryames-wash-fold-poster.jpg",
    label: "Wash & Fold in-store campaign",
    description:
      "A 30-second horizontal brand piece built for in-store screens, with the service promise readable even when the screen is muted.",
    format: "16:9 · in-store display",
    className: "",
  },
  {
    src: "/portfolio/baryames-skip-trip-vertical.mp4",
    poster: "/portfolio/baryames-skip-trip-poster.jpg",
    label: "Skip the Trip social campaign",
    description:
      "A vertical service story built around one customer benefit and one action, then adapted across Baryames marketing channels.",
    format: "9:16 · social",
    className: "showcase-card-vertical",
  },
] as const;

export function VideoShowcase() {
  return (
    <section id="video-work" className="showcase-section secondary-service-section">
      <div className="wrap">
        <div className="growth-proof-heading">
          <div>
            <div className="sec-label">Real brand content</div>
            <h2 className="sec-title">When attention is the leak, I can build the video too.</h2>
          </div>
          <div className="secondary-service-copy">
            <p className="sec-sub">
              These are real Baryames assets, not portfolio mockups. I use the same business context
              to write the message, design the motion, and produce content for social, ads, and store screens.
            </p>
            <a href="/order-video?plan=single" className="inline-service-cta">
              See video options →
            </a>
          </div>
        </div>
        <div className="showcase-grid real-work-grid">
          {work.map((item) => (
            <article className={`showcase-card real-work-card ${item.className}`} key={item.src}>
              <div className="real-video-frame">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  aria-label={item.label}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
              <div className="showcase-meta">
                <div className="video-format-label">{item.format}</div>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
