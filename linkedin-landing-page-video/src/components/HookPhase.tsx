import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { clampProgress, crispEase, rise } from "../lib/animation";
import { MotionText } from "./MotionText";

export const HookPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = clampProgress(frame, 0, 26);
  const pulse = interpolate(frame, [0, 90], [0, 1], {
    easing: crispEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: "0 86px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 122,
          right: 122,
          top: 220,
          height: 620,
          borderRadius: 38,
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: `scale(${interpolate(pulse, [0, 1], [0.94, 1])})`,
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: enter,
          transform: `translateY(${rise(enter, 22)}px)`,
          width: "100%",
        }}
      >
        <div
          style={{
            color: COLORS.accent,
            fontSize: 24,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          First screen audit
        </div>
        <MotionText
          frame={frame}
          start={0}
          end={75}
          size={92}
          maxWidth={900}
          style={{
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Your site gets clicks.
          <br />
          <span style={{ color: COLORS.accent }}>But no calls.</span>
        </MotionText>
      </div>
    </AbsoluteFill>
  );
};
