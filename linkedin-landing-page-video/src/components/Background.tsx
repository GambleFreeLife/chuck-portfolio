import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TOTAL_FRAMES } from "../constants";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, TOTAL_FRAMES], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(145deg, #05070d 0%, #07121a 42%, #05070d 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.34,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translateY(${drift}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 88,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 22%, rgba(21,184,255,0.18), transparent 34%), radial-gradient(circle at 50% 100%, rgba(46,229,157,0.08), transparent 42%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.16), rgba(5,7,13,0.5))",
        }}
      />
    </AbsoluteFill>
  );
};
