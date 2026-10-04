"use client";
import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import s from "./PortfolioHome.module.css";
const videos = [
  { id: "tailoring", title: "Baryames tailoring reel", description: "A vertical service video for social feeds.", src: "/portfolio/20261004/tailoring.mp4", poster: "/portfolio/20261004/tailoring-poster.webp", captions: "/portfolio/20261004/tailoring.vtt" },
  { id: "wash-fold", title: "Baryames wash and fold brand video", description: "A short horizontal video explaining the service.", src: "/portfolio/video/wash-fold-horizontal.mp4", poster: "/portfolio/video/wash-fold-horizontal-poster.jpg", captions: "/portfolio/20261004/wash-fold.vtt" },
];
export function PortfolioVideos() {
  const played = useRef(new Set<string>());
  return <div className={s.videoSection} id="videos"><div className={s.videoHeading}><h3>Short videos, ready to watch.</h3><p>Tap to play. Captions are on. These are work samples; any offers shown belong to the original campaign.</p></div><div className={s.videoStrip}>{videos.map(video => <figure key={video.id}><video controls playsInline preload="none" poster={video.poster} aria-label={video.title} onPlay={() => { if (!played.current.has(video.id)) { played.current.add(video.id); trackEvent("video_play", { video: video.id, location: "work" }); } }}><source src={video.src} type="video/mp4" /><track kind="captions" src={video.captions} srcLang="en" label="English" default /><p>Your browser cannot play this video. <a href={video.src}>Open the video file.</a></p></video><figcaption><strong>{video.title}</strong><span>{video.description}</span></figcaption></figure>)}</div></div>;
}
