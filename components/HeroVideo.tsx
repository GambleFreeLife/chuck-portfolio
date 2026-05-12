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
        playsInline
        poster={poster}
        preload={priority ? "metadata" : "none"}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <img className="poster-fallback" src={poster} alt={ariaLabel} loading={priority ? "eager" : "lazy"} />
    </div>
  );
}
