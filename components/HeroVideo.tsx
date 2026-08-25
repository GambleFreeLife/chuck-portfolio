"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";

type HeroVideoProps = {
  src: string;
  poster: string;
  ariaLabel: string;
  priority?: boolean;
  aspectRatio?: string;
};

type HeroVideoStyle = CSSProperties & {
  "--aspect-ratio": string;
};

export function HeroVideo({
  src,
  poster,
  ariaLabel,
  priority = false,
  aspectRatio = "4 / 5",
}: HeroVideoProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const frameStyle: HeroVideoStyle = {
    "--aspect-ratio": aspectRatio,
  };

  return (
    <div className="hero-video-frame" style={frameStyle}>
      <video
        aria-label={ariaLabel}
        autoPlay
        loop
        muted
        className={videoFailed ? "is-video-unavailable" : undefined}
        onCanPlay={() => setVideoFailed(false)}
        onError={() => setVideoFailed(true)}
        playsInline
        poster={poster}
        preload={priority ? "auto" : "metadata"}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <Image
        className="poster-fallback"
        src={poster}
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 720px) 100vw, 360px"
        priority={priority}
      />
    </div>
  );
}
