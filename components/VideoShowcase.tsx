const campaigns = [
  {
    eyebrow: "WASH & FOLD · MULTI-FORMAT CAMPAIGN",
    title: "Wash & Fold in-store campaign",
    description:
      "I built the message, pacing, layout, and motion around an actual Baryames service, then adapted the creative for wide in-store displays and vertical screens without forcing one crop to do both jobs.",
    horizontal: {
      src: "/portfolio/video/wash-fold-horizontal.mp4",
      poster: "/portfolio/video/wash-fold-horizontal-poster.jpg",
      label: "Wash & Fold horizontal campaign video",
    },
    vertical: {
      src: "/portfolio/video/wash-fold-vertical.mp4",
      poster: "/portfolio/video/wash-fold-vertical-poster.jpg",
      label: "Wash & Fold vertical campaign video",
    },
  },
  {
    eyebrow: "SKIP THE TRIP · SERVICE CAMPAIGN",
    title: "Skip the Trip social campaign",
    description:
      "This campaign centers on free pickup and delivery, with a vertical version for mobile attention and a wide version designed to stay understandable on a muted TV in a physical location.",
    horizontal: {
      src: "/portfolio/video/skip-trip-horizontal.mp4",
      poster: "/portfolio/video/skip-trip-horizontal-poster.jpg",
      label: "Skip the Trip horizontal campaign video",
    },
    vertical: {
      src: "/portfolio/video/skip-trip-vertical.mp4",
      poster: "/portfolio/video/skip-trip-vertical-poster.jpg",
      label: "Skip the Trip vertical campaign video",
    },
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
              These are real Baryames campaign assets, not portfolio mockups. Video is supporting proof
              that I can carry the business message through the page, the ad, social, and the store.
            </p>
            <a href="/order-video?plan=single" className="inline-service-cta">
              See standalone video options →
            </a>
          </div>
        </div>

        <div className="campaign-showcase-list">
          {campaigns.map((campaign, index) => (
            <article className={`campaign-showcase${index % 2 === 1 ? " reverse" : ""}`} key={campaign.eyebrow}>
              <div className="campaign-copy">
                <div className="case-study-kicker">{campaign.eyebrow}</div>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <div className="campaign-format-row" aria-label="Formats delivered">
                  <span>16:9 display</span>
                  <span>9:16 vertical</span>
                  <span>Muted-screen ready</span>
                </div>
              </div>
              <div className="campaign-media-pair">
                <div className="campaign-wide-frame">
                  <video controls playsInline preload="none" poster={campaign.horizontal.poster} aria-label={campaign.horizontal.label}>
                    <source src={campaign.horizontal.src} type="video/mp4" />
                  </video>
                </div>
                <div className="campaign-phone-shell" aria-label="Vertical video preview">
                  <div className="campaign-phone-speaker" aria-hidden="true" />
                  <video controls playsInline preload="none" poster={campaign.vertical.poster} aria-label={campaign.vertical.label}>
                    <source src={campaign.vertical.src} type="video/mp4" />
                  </video>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
