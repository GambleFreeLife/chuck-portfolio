import type { ReactNode } from "react";
import { Img, OffthreadVideo, staticFile } from "remotion";

type MediaDropZoneProps = {
  readonly assetPath: string | null;
  readonly fallback: ReactNode;
  readonly label: string;
};

export const MediaDropZone: React.FC<MediaDropZoneProps> = ({
  assetPath,
  fallback,
  label,
}) => {
  if (!assetPath) {
    return <>{fallback}</>;
  }

  const source = staticFile(assetPath);

  if (assetPath.endsWith(".mp4") || assetPath.endsWith(".webm")) {
    return (
      <OffthreadVideo
        src={source}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        aria-label={label}
      />
    );
  }

  return (
    <Img
      src={source}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      alt={label}
    />
  );
};
