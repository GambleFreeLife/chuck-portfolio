"use client";
import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import s from "./PortfolioHome.module.css";

const views = [
  { name: "The homepage", image: "/portfolio/baryames-verified-20260908.jpg", alt: "Baryames homepage showing the free pickup offer, real delivery van, and signup button", url: "https://baryamescleaners.com/", note: "The offer, the service, and the next step, all visible at a glance." },
  { name: "A service page", image: "/portfolio/baryames-wash-fold-verified-20260908.jpg", alt: "Baryames Wash and Fold service page explaining laundry service and pickup", url: "https://baryamescleaners.com/services/wash-fold/", note: "A dedicated page helps customers understand Wash & Fold before requesting pickup." },
];

export function ProjectExplorer() {
  const [selected, setSelected] = useState(0);
  const view = views[selected];
  return <div className={s.explorer}>
    <div className={s.explorerToolbar}><div className={s.viewButtons} role="group" aria-label="Choose a project preview">{views.map((item, i) => <button type="button" key={item.name} aria-pressed={i === selected} aria-controls="project-preview" onClick={() => { setSelected(i); trackEvent("project_preview", { location: i === 0 ? "homepage" : "service_page" }); }}>{item.name}</button>)}</div><span className={s.previewLabel}>Actual website screenshots</span></div>
    <div className={s.projectCanvas} id="project-preview"><a href={view.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit Baryames Cleaners: ${view.name}`} data-track="project_click" data-location="project_preview"><div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>{view.url.replace("https://", "")}</span><span aria-hidden="true">↗</span></div><Image src={view.image} alt={view.alt} width={1348} height={926} sizes="(max-width: 760px) 90vw, 1000px" /></a></div>
    <p className={s.previewCaption} aria-live="polite">{view.note}</p>
  </div>;
}
