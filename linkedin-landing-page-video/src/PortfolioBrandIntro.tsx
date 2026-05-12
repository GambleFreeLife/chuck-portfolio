import { AbsoluteFill, Sequence, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { SHOWCASE_COLORS } from "./constants";
import { MotionText } from "./components/MotionText";
import { drawProgress, sceneCrossfade, springOpacity, springRise } from "./lib/animation";

const sceneOverlap = 15;

const type = {
  fontFamily: "Inter, Geist, Segoe UI, Arial, sans-serif",
  letterSpacing: "-0.04em",
  textShadow: "none",
} as const;

const CenterFrame: React.FC<{
  readonly children: React.ReactNode;
  readonly opacity: number;
  readonly background?: string;
}> = ({ children, opacity, background = SHOWCASE_COLORS.backgroundWarm }) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background,
        color: SHOWCASE_COLORS.inkOnLight,
        justifyContent: "center",
        opacity,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const LogoFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneCrossfade(frame, 0, 75);
  const blockOpacity = springOpacity(frame, 0);
  const y = springRise(frame, 0, 24);

  return (
    <CenterFrame opacity={opacity}>
      <div
        style={{
          opacity: blockOpacity,
          textAlign: "center",
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            ...type,
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 0.94,
          }}
        >
          NORTHFIELD ROAST
        </div>
        <div
          style={{
            background: SHOWCASE_COLORS.hairlineOnLight,
            height: 2,
            margin: "34px auto 24px",
            width: 280,
          }}
        />
        <div
          style={{
            color: SHOWCASE_COLORS.mutedOnLight,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.2em",
          }}
        >
          EST. 2026
        </div>
      </div>
    </CenterFrame>
  );
};

const BoldClaim: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneCrossfade(frame, 0, 135);
  const strike = drawProgress(frame, 60, 18);

  return (
    <CenterFrame opacity={opacity}>
      <div style={{ width: 800 }}>
        <MotionText
          frame={frame}
          start={0}
          end={135}
          size={180}
          maxWidth={800}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            ...type,
            fontWeight: 800,
            lineHeight: 0.92,
            textAlign: "left",
          }}
        >
          Most coffee
        </MotionText>
        <MotionText
          frame={frame}
          start={8}
          end={135}
          size={180}
          maxWidth={800}
          color={SHOWCASE_COLORS.mutedOnLight}
          useSpringEntrance
          style={{
            ...type,
            fontWeight: 800,
            lineHeight: 0.92,
            position: "relative",
            textAlign: "left",
            width: "fit-content",
          }}
        >
          is fine.
          <span
            style={{
              background: SHOWCASE_COLORS.accentCoral,
              height: 12,
              left: 0,
              position: "absolute",
              top: "52%",
              transform: `scaleX(${strike})`,
              transformOrigin: "left center",
              width: "100%",
            }}
          />
        </MotionText>
      </div>
    </CenterFrame>
  );
};

const attributes = [
  ["01", "ORIGIN", "Ethiopia Yirgacheffe"],
  ["02", "ROAST", "Light, blueberry notes"],
  ["03", "SHIP", "Roasted Tuesday, in your cup Friday"],
] as const;

const ProductScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneCrossfade(frame, 0, 195);

  return (
    <CenterFrame opacity={opacity}>
      <div style={{ width: 920 }}>
        <MotionText
          frame={frame}
          start={0}
          end={195}
          size={220}
          maxWidth={920}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            ...type,
            fontWeight: 800,
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          Ours <span style={{ color: SHOWCASE_COLORS.accentCoral }}>isn&apos;t.</span>
        </MotionText>
        <MotionText
          frame={frame}
          start={28}
          end={195}
          size={28}
          maxWidth={920}
          color={SHOWCASE_COLORS.mutedOnLight}
          useSpringEntrance
          style={{
            fontWeight: 600,
            letterSpacing: "0.15em",
            lineHeight: 1.3,
            marginTop: 42,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          SINGLE-ORIGIN. SLOW-ROASTED. SHIPPED FRESH.
        </MotionText>
        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: 82,
          }}
        >
          {attributes.map(([number, label, value], index) => {
            const itemOpacity = springOpacity(frame, 56 + index * 12);
            const itemY = springRise(frame, 56 + index * 12, 24);

            return (
              <div
                key={label}
                style={{
                  borderTop: `2px solid ${SHOWCASE_COLORS.hairlineOnLight}`,
                  opacity: itemOpacity,
                  paddingTop: 22,
                  transform: `translateY(${itemY}px)`,
                }}
              >
                <div
                  style={{
                    color: SHOWCASE_COLORS.accentCoral,
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {number} {label}
                </div>
                <div
                  style={{
                    color: SHOWCASE_COLORS.mutedOnLight,
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 1.18,
                    marginTop: 12,
                  }}
                >
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CenterFrame>
  );
};

const PriceReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = sceneCrossfade(frame, 0, 135);

  return (
    <CenterFrame opacity={opacity}>
      <MotionText
        frame={frame}
        start={0}
        end={135}
        size={200}
        maxWidth={900}
        color={SHOWCASE_COLORS.inkOnLight}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.95,
          textAlign: "center",
        }}
      >
        <span style={{ color: SHOWCASE_COLORS.accentCoral }}>$18</span> a bag.
      </MotionText>
      <MotionText
        frame={frame}
        start={30}
        end={135}
        size={36}
        maxWidth={900}
        color={SHOWCASE_COLORS.mutedOnLight}
        useSpringEntrance
        style={{
          fontWeight: 400,
          marginTop: 34,
          textAlign: "center",
          textShadow: "none",
        }}
      >
        Subscribe and save 20%.
      </MotionText>
    </CenterFrame>
  );
};

const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const background = interpolateColors(
    interpolate(frame, [0, 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    [0, 1],
    [SHOWCASE_COLORS.backgroundWarm, SHOWCASE_COLORS.backgroundDark],
  );

  return (
    <CenterFrame opacity={sceneCrossfade(frame, 0, 120)} background={background}>
      <MotionText
        frame={frame}
        start={12}
        end={120}
        size={64}
        maxWidth={900}
        color={SHOWCASE_COLORS.inkOnDark}
        useSpringEntrance
        style={{
          fontWeight: 600,
          lineHeight: 1,
          textAlign: "center",
          textShadow: "none",
        }}
      >
        Launching Monday.
      </MotionText>
      <MotionText
        frame={frame}
        start={42}
        end={120}
        size={96}
        maxWidth={1000}
        color={SHOWCASE_COLORS.inkOnDark}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 1,
          marginTop: 36,
          textAlign: "center",
        }}
      >
        northfield<span style={{ color: SHOWCASE_COLORS.accentCoral }}>roast</span>.com
      </MotionText>
    </CenterFrame>
  );
};

export const PortfolioBrandIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: SHOWCASE_COLORS.backgroundWarm }}>
      <Sequence durationInFrames={60 + sceneOverlap}>
        <LogoFlash />
      </Sequence>
      <Sequence from={60} durationInFrames={120 + sceneOverlap}>
        <BoldClaim />
      </Sequence>
      <Sequence from={180} durationInFrames={180 + sceneOverlap}>
        <ProductScene />
      </Sequence>
      <Sequence from={360} durationInFrames={120 + sceneOverlap}>
        <PriceReveal />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export default PortfolioBrandIntro;
