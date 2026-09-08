"use client";

import Image from "next/image";
import { useState } from "react";

type LiveSitePreviewProps = { url: string; label: string; className?: string; priority?: boolean; };
const previews: Record<string, string> = {
  "baryamescleaners.com/": "/portfolio/baryames-verified-20260908.jpg",
  "baryamescleaners.com/services/wash-fold/": "/portfolio/baryames-wash-fold-verified-20260908.jpg",
  "betonrecovery.org/": "/portfolio/bet-on-recovery-current.jpg",
};

export function LiveSitePreview({ url, label, className = "", priority = false }: LiveSitePreviewProps) {
  const [failed, setFailed] = useState(false);
  const parsed = new URL(url);
  const source = previews[`${parsed.hostname}${parsed.pathname}`];
  return (
    <div className={`live-site-preview ${className}`.trim()}>
      <div className="live-site-browser-bar" aria-hidden="true"><span className="browser-address">{parsed.hostname}</span><span className="browser-live">PROJECT PREVIEW</span></div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="live-site-image-link" aria-label={`Open ${label}`} data-track="project_click" data-location={parsed.hostname}>
        {source && !failed ? <Image src={source} alt={`Website preview: ${label}`} width={1348} height={926} sizes="(max-width: 900px) 92vw, 560px" priority={priority} onError={() => setFailed(true)} /> : <span className="preview-fallback"><strong>{label}</strong><span>Visit the live website to explore this project.</span></span>}
        <span className="live-site-open">Visit live website ↗</span>
      </a>
    </div>
  );
}
