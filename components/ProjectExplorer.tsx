"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import s from "./ProjectExplorer.module.css";

const views = [
  {
    id: "homepage", label: "Homepage", category: "Website design & development",
    title: "Make the next step obvious.",
    description: "Baryames offers in-store cleaning and free pickup. The homepage needs to make both options easy to find.",
    detail: "I led with the pickup offer, grouped the services, and placed clear signup links where customers make a decision.",
    image: "/portfolio/baryames-verified-20260908.jpg",
    alt: "Baryames Cleaners homepage with its free pickup offer, local delivery van, and signup button",
    url: "https://baryamescleaners.com/", link: "Explore the live website", video: "",
  },
  {
    id: "service-page", label: "Service page", category: "Service positioning & copy",
    title: "Give one service room to shine.",
    description: "Wash & Fold has its own page, so customers can understand the service without searching through the whole website.",
    detail: "The page explains the laundry service, answers practical questions, and points to pickup signup.",
    image: "/portfolio/baryames-wash-fold-verified-20260908.jpg",
    alt: "Baryames Wash and Fold page introducing the laundry service and pickup signup",
    url: "https://baryamescleaners.com/services/wash-fold/", link: "Explore the service page", video: "",
  },
  {
    id: "brand-video", label: "Brand video", category: "Supporting creative",
    title: "Carry the same message into video.",
    description: "A short Wash & Fold video connects the service, the local team, and the pickup offer in the same brand style.",
    detail: "This is an example of supporting creative I can make alongside a website. Video is optional in the Website + ads launch package.",
    image: "/portfolio/video/wash-fold-horizontal-poster.jpg",
    alt: "Baryames Wash and Fold brand video",
    url: "https://baryamescleaners.com/services/wash-fold/", link: "See the service behind the video", video: "/portfolio/video/wash-fold-horizontal.mp4",
  },
] as const;

export function ProjectExplorer() {
  const [selected, setSelected] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const panelId = useId();
  const view = views[selected];

  return <div className={s.explorer}>
    <div className={s.toolbar}>
      <div className={s.viewButtons} role="group" aria-label="Explore the Baryames project">
        {views.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => {
          setSelected(index);
          setVideoError(false);
          trackEvent("project_preview", { location: item.id });
        }}>{item.label}</button>)}
      </div>
      <span className={s.projectName}>Baryames Cleaners · Family business</span>
    </div>
    <div className={s.project} id={panelId}>
      <div className={`${s.canvas} ${view.video ? s.videoCanvas : ""}`}>
        {view.video ? <div className={s.videoWrap}>
          <video key={view.id} src={view.video} controls playsInline preload="none" poster={view.image} aria-label={view.alt} aria-describedby={`${panelId}-description`} onError={() => setVideoError(true)} onPlay={() => trackEvent("video_play", { location: "baryames_case_study" })}>
            Your browser does not support this video.
          </video>
          {videoError && <p role="status" className={s.videoError}>The video could not load. You can still explore the service page below.</p>}
          <details className={s.videoSummary}><summary>Read the video summary</summary><p>Laundry baskets give way to washing, folding, and clean laundry ready for a drawer. On-screen copy introduces Baryames Wash & Fold, shows laundry handled locally in Lansing, and ends with pricing and a free pickup and delivery offer.</p></details>
        </div> : <a key={view.id} className={s.browser} href={view.url} target="_blank" rel="noopener noreferrer" aria-label={view.link} data-track="project_click" data-location={view.id}>
          <div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>{view.url.replace("https://", "")}</span><span aria-hidden="true">↗</span></div>
          <Image src={view.image} alt={view.alt} width={1348} height={926} sizes="(max-width: 800px) 90vw, (max-width: 1100px) 60vw, 780px" />
        </a>}
      </div>
      <div className={s.description} aria-live="polite">
        <p className={s.category}>{view.category}</p>
        <h3>{view.title}</h3>
        <p id={`${panelId}-description`}>{view.description}</p>
        <p>{view.detail}</p>
        <div className={s.role}><span>My role</span><p>{view.video ? "Video concept, editing, and branded motion." : "Website design, copy, and development."}</p></div>
        {view.url && <a className={s.projectLink} href={view.url} target="_blank" rel="noopener noreferrer" data-track="project_click" data-location={`${view.id}_details`}>{view.link}<span aria-hidden="true">↗</span></a>}
      </div>
    </div>
  </div>;
}
