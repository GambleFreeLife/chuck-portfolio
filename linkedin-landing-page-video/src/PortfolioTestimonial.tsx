import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SHOWCASE_COLORS } from "./constants";
import { MotionText } from "./components/MotionText";
import { sceneCrossfade, springOpacity, springRise } from "./lib/animation";

const sceneOverlap = 15;

const displayType = {
  fontFamily: "Inter, Geist, Segoe UI, Arial, sans-serif",
  letterSpacing: "-0.04em",
  textShadow: "none",
} as const;

const WarmScene: React.FC<{
  readonly children: React.ReactNode;
  readonly opacity: number;
}> = ({ children, opacity }) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 34%, ${SHOWCASE_COLORS.backgroundWarm}, ${SHOWCASE_COLORS.backgroundWarmTint} 100%)`,
        color: SHOWCASE_COLORS.inkOnLight,
        opacity,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const AttributionPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const blockOpacity = springOpacity(frame, 0);
  const y = springRise(frame, 0, 24);

  return (
    <WarmScene opacity={sceneCrossfade(frame, 0, 105)}>
      <div
        style={{
          bottom: 80,
          left: 80,
          opacity: blockOpacity,
          position: "absolute",
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            color: SHOWCASE_COLORS.mutedOnLight,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.2em",
            marginBottom: 18,
          }}
        >
          CASE STUDY
        </div>
        <div
          style={{
            color: SHOWCASE_COLORS.inkOnLight,
            fontSize: 36,
            fontWeight: 600,
          }}
        >
          Sarah Chen, founder
        </div>
        <div
          style={{
            color: SHOWCASE_COLORS.mutedOnLight,
            fontSize: 28,
            fontWeight: 400,
            marginTop: 10,
          }}
        >
          Northbound Tax & Bookkeeping
        </div>
      </div>
    </WarmScene>
  );
};

const QuoteOpen: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WarmScene opacity={sceneCrossfade(frame, 0, 225)}>
      <div
        style={{
          color: SHOWCASE_COLORS.accentAmber,
          fontSize: 280,
          fontWeight: 800,
          left: 96,
          lineHeight: 0.8,
          position: "absolute",
          top: 214,
        }}
      >
        &quot;
      </div>
      <div
        style={{
          left: 260,
          position: "absolute",
          right: 100,
          top: 420,
        }}
      >
        <MotionText
          frame={frame}
          start={30}
          end={150}
          size={64}
          maxWidth={700}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            fontWeight: 600,
            lineHeight: 1.06,
            textShadow: "none",
          }}
        >
          I had two months of runway.
        </MotionText>
        <MotionText
          frame={frame}
          start={130}
          end={225}
          size={64}
          maxWidth={700}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            fontWeight: 600,
            lineHeight: 1.06,
            marginTop: 54,
            textShadow: "none",
          }}
        >
          He turned my landing page around in three days.
        </MotionText>
      </div>
    </WarmScene>
  );
};

const StaggeredText: React.FC<{
  readonly frame: number;
  readonly text: string;
  readonly start: number;
}> = ({ frame, text, start }) => {
  return (
    <span style={{ color: SHOWCASE_COLORS.accentAmber, display: "inline-block" }}>
      {text.split("").map((letter, index) => {
        const opacity = springOpacity(frame, start + index * 2);
        const y = springRise(frame, start + index * 2, 18);

        return (
          <span
            key={`${letter}-${index}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
};

const PayoffScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WarmScene opacity={sceneCrossfade(frame, 0, 195)}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            ...displayType,
            color: SHOWCASE_COLORS.inkOnLight,
            fontSize: 140,
            fontWeight: 800,
            lineHeight: 0.96,
            maxWidth: 940,
            textAlign: "center",
          }}
        >
          <StaggeredText frame={frame} text="12 leads" start={0} /> in week one.
        </div>
        <MotionText
          frame={frame}
          start={70}
          end={195}
          size={44}
          maxWidth={820}
          color={SHOWCASE_COLORS.mutedOnLight}
          useSpringEntrance
          style={{
            fontWeight: 400,
            lineHeight: 1.22,
            marginTop: 46,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          We hired our first employee in week three.
        </MotionText>
      </AbsoluteFill>
    </WarmScene>
  );
};

const AttributionClose: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <WarmScene opacity={sceneCrossfade(frame, 0, 120)}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MotionText
          frame={frame}
          start={0}
          end={120}
          size={96}
          maxWidth={900}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            ...displayType,
            fontWeight: 800,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Sarah Chen
        </MotionText>
        <MotionText
          frame={frame}
          start={30}
          end={120}
          size={44}
          maxWidth={900}
          color={SHOWCASE_COLORS.accentAmber}
          useSpringEntrance
          style={{
            fontWeight: 600,
            marginTop: 26,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          Northbound Tax & Bookkeeping
        </MotionText>
        <MotionText
          frame={frame}
          start={60}
          end={120}
          size={28}
          maxWidth={900}
          color={SHOWCASE_COLORS.mutedOnLight}
          useSpringEntrance
          style={{
            fontWeight: 400,
            marginTop: 22,
            textAlign: "center",
            textShadow: "none",
          }}
        >
          Read the full case study
        </MotionText>
      </AbsoluteFill>
    </WarmScene>
  );
};

export const PortfolioTestimonial: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: SHOWCASE_COLORS.backgroundWarm }}>
      <Sequence durationInFrames={90 + sceneOverlap}>
        <AttributionPreview />
      </Sequence>
      <Sequence from={90} durationInFrames={210 + sceneOverlap}>
        <QuoteOpen />
      </Sequence>
      <Sequence from={300} durationInFrames={180 + sceneOverlap}>
        <PayoffScene />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <AttributionClose />
      </Sequence>
    </AbsoluteFill>
  );
};

export default PortfolioTestimonial;
