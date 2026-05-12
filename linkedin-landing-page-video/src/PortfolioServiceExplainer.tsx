import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SHOWCASE_COLORS } from "./constants";
import { MotionText } from "./components/MotionText";
import { drawProgress, sceneCrossfade, springOpacity, springRise } from "./lib/animation";

const sceneOverlap = 15;

const displayType = {
  fontFamily: "Inter, Geist, Segoe UI, Arial, sans-serif",
  letterSpacing: "-0.04em",
  textShadow: "none",
} as const;

const DarkScene: React.FC<{
  readonly children: React.ReactNode;
  readonly opacity: number;
}> = ({ children, opacity }) => {
  return (
    <AbsoluteFill
      style={{
        background: SHOWCASE_COLORS.backgroundDark,
        color: SHOWCASE_COLORS.inkOnDark,
        opacity,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: `radial-gradient(circle at 50% 25%, ${SHOWCASE_COLORS.accentEmerald}26, transparent 34%)`,
          inset: 0,
          position: "absolute",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const underline = drawProgress(frame, 112, 24);

  return (
    <DarkScene opacity={sceneCrossfade(frame, 0, 165)}>
      <div
        style={{
          left: 96,
          position: "absolute",
          right: 96,
          top: 400,
        }}
      >
        <MotionText
          frame={frame}
          start={0}
          end={165}
          size={96}
          maxWidth={900}
          color={SHOWCASE_COLORS.inkOnDark}
          useSpringEntrance
          style={{
            fontWeight: 600,
            lineHeight: 1.02,
            textShadow: "none",
          }}
        >
          Your tooth breaks
        </MotionText>
        <MotionText
          frame={frame}
          start={16}
          end={165}
          size={96}
          maxWidth={900}
          color={SHOWCASE_COLORS.inkOnDark}
          useSpringEntrance
          style={{
            fontWeight: 600,
            lineHeight: 1.02,
            textShadow: "none",
          }}
        >
          on a Tuesday.
        </MotionText>
        <div style={{ marginTop: 74, position: "relative", width: "fit-content" }}>
          <MotionText
            frame={frame}
            start={72}
            end={165}
            size={48}
            maxWidth={900}
            color={SHOWCASE_COLORS.mutedOnDark}
            useSpringEntrance
            style={{
              fontWeight: 400,
              lineHeight: 1.16,
              textShadow: "none",
            }}
          >
            Most dentists can see you next month.
          </MotionText>
          <div
            style={{
              background: SHOWCASE_COLORS.accentEmerald,
              bottom: -8,
              height: 4,
              left: 548,
              position: "absolute",
              transform: `scaleX(${underline})`,
              transformOrigin: "left center",
              width: 254,
            }}
          />
        </div>
      </div>
    </DarkScene>
  );
};

const PivotScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <DarkScene opacity={sceneCrossfade(frame, 0, 165)}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MotionText
          frame={frame}
          start={0}
          end={165}
          size={160}
          maxWidth={920}
          color={SHOWCASE_COLORS.inkOnDark}
          useSpringEntrance
          style={{
            ...displayType,
            fontWeight: 800,
            lineHeight: 0.96,
            textAlign: "center",
          }}
        >
          We see you <span style={{ color: SHOWCASE_COLORS.accentEmerald }}>today.</span>
        </MotionText>
      </AbsoluteFill>
    </DarkScene>
  );
};

const processSteps = [
  ["01", "Scan", "3D imaging in 60 seconds"],
  ["02", "Mill", "Crown printed in-office while you wait"],
  ["03", "Place", "Fitted and done in 90 minutes total"],
] as const;

const ProcessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const firstLine = drawProgress(frame, 82, 18);
  const secondLine = drawProgress(frame, 118, 18);

  return (
    <DarkScene opacity={sceneCrossfade(frame, 0, 195)}>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: 42,
          gridTemplateColumns: "repeat(3, 1fr)",
          left: 76,
          position: "absolute",
          right: 76,
          top: 520,
        }}
      >
        {processSteps.map(([number, title, description], index) => {
          const start = index * 24;
          const itemOpacity = springOpacity(frame, start);
          const y = springRise(frame, start, 24);

          return (
            <div
              key={title}
              style={{
                opacity: itemOpacity,
                textAlign: "center",
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  color: SHOWCASE_COLORS.accentEmerald,
                  fontSize: 120,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                {number}
              </div>
              <div
                style={{
                  color: SHOWCASE_COLORS.inkOnDark,
                  fontSize: 36,
                  fontWeight: 600,
                  marginTop: 28,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: SHOWCASE_COLORS.mutedOnDark,
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: 1.24,
                  marginTop: 16,
                }}
              >
                {description}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          background: SHOWCASE_COLORS.accentEmerald,
          height: 3,
          left: 342,
          position: "absolute",
          top: 592,
          transform: `scaleX(${firstLine})`,
          transformOrigin: "left center",
          width: 188,
        }}
      />
      <div
        style={{
          background: SHOWCASE_COLORS.accentEmerald,
          height: 3,
          left: 552,
          position: "absolute",
          top: 592,
          transform: `scaleX(${secondLine})`,
          transformOrigin: "left center",
          width: 188,
        }}
      />
    </DarkScene>
  );
};

const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <DarkScene opacity={sceneCrossfade(frame, 0, 120)}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MotionText
          frame={frame}
          start={0}
          end={120}
          size={120}
          maxWidth={900}
          color={SHOWCASE_COLORS.inkOnDark}
          useSpringEntrance
          style={{
            ...displayType,
            fontWeight: 800,
            lineHeight: 0.96,
            textAlign: "center",
          }}
        >
          Same-day crowns.
        </MotionText>
        <MotionText
          frame={frame}
          start={34}
          end={120}
          size={56}
          maxWidth={900}
          color={SHOWCASE_COLORS.accentEmerald}
          useSpringEntrance
          style={{
            fontWeight: 600,
            marginTop: 44,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          Mercer Family Dental
        </MotionText>
        <MotionText
          frame={frame}
          start={64}
          end={120}
          size={40}
          maxWidth={900}
          color={SHOWCASE_COLORS.mutedOnDark}
          useSpringEntrance
          style={{
            fontWeight: 400,
            marginTop: 22,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          Call (555) 240-6781
        </MotionText>
      </AbsoluteFill>
    </DarkScene>
  );
};

export const PortfolioServiceExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: SHOWCASE_COLORS.backgroundDark }}>
      <Sequence durationInFrames={150 + sceneOverlap}>
        <ProblemScene />
      </Sequence>
      <Sequence from={150} durationInFrames={150 + sceneOverlap}>
        <PivotScene />
      </Sequence>
      <Sequence from={300} durationInFrames={180 + sceneOverlap}>
        <ProcessScene />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default PortfolioServiceExplainer;
