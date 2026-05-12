import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { clampProgress, rise } from "../lib/animation";

export const CtaPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const card = clampProgress(frame, 0, 28);
  const title = clampProgress(frame, 6, 24);
  const offer = clampProgress(frame, 34, 24);
  const url = clampProgress(frame, 86, 26);
  const name = clampProgress(frame, 120, 20);
  const underline = interpolate(url, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "0 86px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: 999,
          background:
            "radial-gradient(circle, rgba(21,184,255,0.14), transparent 66%)",
          opacity: card,
          transform: `scale(${interpolate(card, [0, 1], [0.86, 1])})`,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: card,
          transform: `translateY(${rise(card, 24)}px)`,
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: COLORS.text,
            fontSize: 74,
            lineHeight: 1.02,
            fontWeight: 920,
            letterSpacing: 0,
            opacity: title,
            transform: `translateY(${rise(title, 18)}px)`,
            textShadow: "0 18px 54px rgba(0,0,0,0.5)",
          }}
        >
          Need a sharper
          <br />
          landing page?
        </div>
        <div
          style={{
            marginTop: 34,
            color: COLORS.accent,
            fontSize: 31,
            fontWeight: 900,
            letterSpacing: 0,
            opacity: offer,
            transform: `translateY(${rise(offer, 16)}px)`,
          }}
        >
          $50 down. 48-hour delivery.
        </div>
        <div
          style={{
            marginTop: 58,
            color: COLORS.text,
            fontSize: 45,
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: 0,
            opacity: url,
            transform: `translateY(${rise(url, 18)}px)`,
          }}
        >
          See examples at
          <br />
          chuck-portfolio.vercel.app
        </div>
        <div
          style={{
            width: `${underline * 520}px`,
            height: 5,
            borderRadius: 999,
            margin: "26px auto 32px",
            background: COLORS.accent,
            boxShadow: "0 0 30px rgba(21,184,255,0.65)",
          }}
        />
        <div
          style={{
            color: COLORS.muted,
            fontSize: 30,
            fontWeight: 780,
            letterSpacing: 0,
            opacity: name,
            transform: `translateY(${rise(name, 12)}px)`,
          }}
        >
          Chuck Baryames
        </div>
      </div>
    </AbsoluteFill>
  );
};
