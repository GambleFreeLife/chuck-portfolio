import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ASSET_PLACEHOLDERS } from "../assetPlaceholders";
import { COLORS } from "../constants";
import { clampProgress, fadeInOut, rise } from "../lib/animation";
import { BrowserFrame } from "./BrowserFrame";
import { MediaDropZone } from "./MediaDropZone";
import { WeakTemplateMock } from "./MockScreens";

const DIAGNOSIS_LINES = [
  {
    start: 0,
    end: 75,
    eyebrow: "Recognition",
    text: "That usually feels like a traffic problem.",
  },
  {
    start: 75,
    end: 150,
    eyebrow: "Pattern",
    text: "Most of the time, it is clarity.",
  },
  {
    start: 150,
    end: 225,
    eyebrow: "Issue 1",
    text: "The headline is vague.",
  },
  {
    start: 225,
    end: 300,
    eyebrow: "Issue 2",
    text: "The button is easy to ignore.",
  },
  {
    start: 300,
    end: 375,
    eyebrow: "Issue 3",
    text: "The proof shows up too late.",
  },
] as const;

const CALLOUTS = [
  {
    start: 150,
    end: 225,
    label: "Vague headline",
    top: 454,
    left: 694,
    lineWidth: 178,
  },
  {
    start: 225,
    end: 300,
    label: "Soft CTA",
    top: 626,
    left: 720,
    lineWidth: 116,
  },
  {
    start: 300,
    end: 375,
    label: "Late proof",
    top: 807,
    left: 648,
    lineWidth: 146,
  },
] as const;

export const TensionPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const browser = clampProgress(frame, 0, 36);
  const rail = clampProgress(frame, 8, 28);
  const pageScale = interpolate(frame, [0, 375], [0.92, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pageX = interpolate(browser, [0, 1], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: "112px 58px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 66,
          top: 258,
          width: 360,
          opacity: rail,
          transform: `translateY(${rise(rail, 24)}px)`,
        }}
      >
        <DiagnosisRail frame={frame} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 408,
          top: 235,
          width: 622,
          opacity: browser,
          transform: `translateX(${pageX}px) scale(${pageScale})`,
          transformOrigin: "center center",
          filter: "saturate(0.82) contrast(0.94) blur(0.4px)",
        }}
      >
        <BrowserFrame title="template-preview.local" dimmed>
          <MediaDropZone
            assetPath={ASSET_PLACEHOLDERS.problemSite}
            fallback={<WeakTemplateMock />}
            label="Weak website screen recording placeholder"
          />
        </BrowserFrame>
      </div>
      {CALLOUTS.map((callout) => (
        <IssueCallout
          key={callout.label}
          frame={frame}
          start={callout.start}
          end={callout.end}
          label={callout.label}
          top={callout.top}
          left={callout.left}
          lineWidth={callout.lineWidth}
        />
      ))}
    </AbsoluteFill>
  );
};

const DiagnosisRail: React.FC<{
  readonly frame: number;
}> = ({ frame }) => {
  const active =
    DIAGNOSIS_LINES.find((line) => {
      return frame >= line.start && frame < line.end;
    }) ?? DIAGNOSIS_LINES[DIAGNOSIS_LINES.length - 1];
  const activeOpacity = fadeInOut(frame, active.start, active.end, 12);
  const enter = clampProgress(frame, active.start, 18);

  return (
    <div
      style={{
        minHeight: 430,
        borderLeft: `3px solid ${COLORS.accent}`,
        padding: "12px 0 0 28px",
      }}
    >
      <div
        style={{
          color: COLORS.accent,
          fontSize: 19,
          fontWeight: 900,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        {active.eyebrow}
      </div>
      <div
        style={{
          color: COLORS.text,
          fontSize: 52,
          lineHeight: 1.02,
          fontWeight: 900,
          letterSpacing: 0,
          opacity: activeOpacity,
          transform: `translateY(${rise(enter, 18)}px)`,
          textShadow: "0 16px 45px rgba(0,0,0,0.5)",
        }}
      >
        {active.text}
      </div>
      <div
        style={{
          display: "flex",
          gap: 9,
          marginTop: 34,
        }}
      >
        {DIAGNOSIS_LINES.map((line) => {
          const isActive = line.text === active.text;
          return (
            <div
              key={line.text}
              style={{
                width: isActive ? 44 : 17,
                height: 5,
                borderRadius: 999,
                background: isActive ? COLORS.accent : "rgba(255,255,255,0.18)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const IssueCallout: React.FC<{
  readonly frame: number;
  readonly start: number;
  readonly end: number;
  readonly label: string;
  readonly top: number;
  readonly left: number;
  readonly lineWidth: number;
}> = ({ frame, start, end, label, top, left, lineWidth }) => {
  const opacity = fadeInOut(frame, start, end, 14);
  const draw = clampProgress(frame, start + 6, 20);
  const pulse = interpolate(frame, [start, start + 30, end], [0.5, 1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 15,
          height: 15,
          borderRadius: 999,
          background: COLORS.accent,
          boxShadow: `0 0 ${22 + pulse * 22}px rgba(21,184,255,0.78)`,
          transform: `scale(${0.8 + pulse * 0.24})`,
        }}
      />
      <div
        style={{
          width: lineWidth * draw,
          height: 2,
          background: COLORS.accent,
          boxShadow: "0 0 18px rgba(21,184,255,0.7)",
        }}
      />
      <div
        style={{
          padding: "9px 13px",
          borderRadius: 999,
          background: "rgba(5,7,13,0.76)",
          border: "1px solid rgba(21,184,255,0.42)",
          color: COLORS.text,
          fontSize: 18,
          fontWeight: 850,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};
