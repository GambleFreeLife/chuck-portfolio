import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ASSET_PLACEHOLDERS } from "../assetPlaceholders";
import { COLORS } from "../constants";
import { clampProgress, fadeInOut, rise } from "../lib/animation";
import { BrowserFrame } from "./BrowserFrame";
import { MediaDropZone } from "./MediaDropZone";
import { PolishedLandingPageMock } from "./MockScreens";

const REVEAL_CALLOUTS = [
  {
    start: 86,
    end: 172,
    label: "Clear promise",
    top: 448,
    left: 618,
    width: 168,
  },
  {
    start: 132,
    end: 218,
    label: "One next step",
    top: 676,
    left: 620,
    width: 154,
  },
  {
    start: 180,
    end: 270,
    label: "$50 start",
    top: 902,
    left: 606,
    width: 132,
  },
] as const;

const REVEAL_LINES = [
  {
    start: 0,
    end: 90,
    eyebrow: "Rebuild",
    text: "I rebuild the first screen around one decision.",
  },
  {
    start: 90,
    end: 180,
    eyebrow: "Decision",
    text: "What do they get, and why now?",
  },
  {
    start: 180,
    end: 270,
    eyebrow: "Start",
    text: "$50 down starts the build.",
  },
] as const;

export const TwistPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const panel = clampProgress(frame, 0, 38);
  const activeLine =
    REVEAL_LINES.find((line) => {
      return frame >= line.start && frame < line.end;
    }) ?? REVEAL_LINES[REVEAL_LINES.length - 1];
  const statement = clampProgress(frame, activeLine.start, 24);
  const statementOpacity = fadeInOut(frame, activeLine.start, activeLine.end, 12);
  const scale = interpolate(panel, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(panel, [0, 1], [38, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: "0 54px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 74,
          right: 74,
          top: 104,
          opacity: statementOpacity,
          transform: `translateY(${rise(statement, 18)}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: COLORS.accent,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {activeLine.eyebrow}
        </div>
        <div
          style={{
            color: COLORS.text,
            fontSize: 48,
            lineHeight: 1.04,
            fontWeight: 900,
            letterSpacing: 0,
            textShadow: "0 15px 45px rgba(0,0,0,0.48)",
          }}
        >
          {activeLine.text}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 280,
          width: 964,
          opacity: panel,
          transform: `translateY(${y}px) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <BrowserFrame title="finished-page.vercel.app">
          <MediaDropZone
            assetPath={ASSET_PLACEHOLDERS.finishedPage}
            fallback={<PolishedLandingPageMock />}
            label="Finished landing page screen recording placeholder"
          />
        </BrowserFrame>
      </div>
      {REVEAL_CALLOUTS.map((callout) => (
        <RevealCallout
          key={callout.label}
          frame={frame}
          start={callout.start}
          end={callout.end}
          label={callout.label}
          top={callout.top}
          left={callout.left}
          width={callout.width}
        />
      ))}
    </AbsoluteFill>
  );
};

const RevealCallout: React.FC<{
  readonly frame: number;
  readonly start: number;
  readonly end: number;
  readonly label: string;
  readonly top: number;
  readonly left: number;
  readonly width: number;
}> = ({ frame, start, end, label, top, left, width }) => {
  const opacity = fadeInOut(frame, start, end, 16);
  const draw = clampProgress(frame, start + 8, 22);
  const enter = clampProgress(frame, start, 18);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        opacity,
        transform: `translateY(${rise(enter, 12)}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: width * draw,
            height: 2,
            background: COLORS.accent,
            boxShadow: "0 0 18px rgba(21,184,255,0.72)",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: COLORS.accent,
            boxShadow: "0 0 24px rgba(21,184,255,0.78)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 12,
          display: "inline-flex",
          padding: "8px 12px",
          borderRadius: 999,
          background: "rgba(5,7,13,0.74)",
          border: "1px solid rgba(21,184,255,0.4)",
          color: COLORS.text,
          fontSize: 17,
          fontWeight: 850,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};
