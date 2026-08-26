type LiveSitePreviewProps = {
  url: string;
  label: string;
  className?: string;
  priority?: boolean;
};

function getScreenshotUrl(url: string) {
  return `https://image.thum.io/get/maxAge/24/noanimate/width/960/crop/750/${url}`;
}

export function LiveSitePreview({ url, label, className = "", priority = false }: LiveSitePreviewProps) {
  return (
    <div className={`live-site-preview ${className}`.trim()}>
      <div className="live-site-browser-bar" aria-hidden="true">
        <span className="browser-dot red" />
        <span className="browser-dot amber" />
        <span className="browser-dot green" />
        <span className="browser-address">{new URL(url).hostname}</span>
        <span className="browser-live">LIVE</span>
      </div>
      <a href={url} target="_blank" rel="noreferrer" className="live-site-image-link" aria-label={`Open ${label}`}>
        {/*
          This intentionally uses a direct screenshot stream instead of next/image.
          The image is generated from the current public URL so the portfolio never presents a fabricated website mockup as proof.
        */}
        <img
          src={getScreenshotUrl(url)}
          alt={`Live screenshot of ${label}`}
          width="1280"
          height="800"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
        <span className="live-site-open">Open live site ↗</span>
      </a>
    </div>
  );
}
