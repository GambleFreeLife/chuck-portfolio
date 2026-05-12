import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";
import { SHOWCASE_COLORS } from "./constants";
import { MotionText } from "./components/MotionText";
import { drawProgress, sceneCrossfade, springOpacity, springRise } from "./lib/animation";

const type = {
  fontFamily: "Inter, Geist, Segoe UI, Arial, sans-serif",
  letterSpacing: "-0.04em",
  textShadow: "none",
} as const;

const centered = {
  alignItems: "center",
  justifyContent: "center",
} as const;

const PriceStagger: React.FC<{
  readonly frame: number;
  readonly start: number;
  readonly size: number;
  readonly color: string;
}> = ({ frame, start, size, color }) => {
  return (
    <div
      style={{
        ...type,
        color,
        fontSize: size,
        fontWeight: 800,
        lineHeight: 0.86,
        textAlign: "center",
      }}
    >
      {"$97.".split("").map((character, index) => {
        const characterStart = start + index * 2;
        const opacity = springOpacity(frame, characterStart);
        const y = springRise(frame, characterStart, 24);

        return (
          <span
            key={`${character}-${index}`}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {character}
          </span>
        );
      })}
    </div>
  );
};

const SceneOne: React.FC<{ readonly frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill
      style={{
        ...centered,
        background: SHOWCASE_COLORS.backgroundWarm,
        opacity: sceneCrossfade(frame, 0, 135),
      }}
    >
      <MotionText
        frame={frame}
        start={0}
        end={135}
        size={96}
        maxWidth={900}
        color={SHOWCASE_COLORS.inkOnLight}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.98,
          textAlign: "center",
        }}
      >
        How long did this take to make?
      </MotionText>
      <MotionText
        frame={frame}
        start={90}
        end={135}
        size={160}
        maxWidth={900}
        color={SHOWCASE_COLORS.accentCoral}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.92,
          marginTop: 34,
          textAlign: "center",
        }}
      >
        48 hours.
      </MotionText>
    </AbsoluteFill>
  );
};

const SceneTwo: React.FC<{ readonly frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill
      style={{
        ...centered,
        background: SHOWCASE_COLORS.backgroundWarm,
        opacity: sceneCrossfade(frame, 120, 255),
      }}
    >
      <MotionText
        frame={frame}
        start={120}
        end={255}
        size={96}
        maxWidth={900}
        color={SHOWCASE_COLORS.inkOnLight}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.98,
          textAlign: "center",
        }}
      >
        And how much did it cost?
      </MotionText>
      <div style={{ marginTop: 36 }}>
        <PriceStagger frame={frame} start={198} size={200} color={SHOWCASE_COLORS.accentCoral} />
      </div>
    </AbsoluteFill>
  );
};

const SceneThree: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const lineProgress = drawProgress(frame, 330, 24);

  return (
    <AbsoluteFill
      style={{
        background: SHOWCASE_COLORS.backgroundWarm,
        opacity: sceneCrossfade(frame, 240, 405),
        overflow: "hidden",
      }}
    >
      <div
        style={{
          left: 80,
          position: "absolute",
          right: 80,
          top: 284,
        }}
      >
        <MotionText
          frame={frame}
          start={240}
          end={405}
          size={64}
          maxWidth={920}
          color={SHOWCASE_COLORS.mutedOnLight}
          useSpringEntrance
          style={{
            fontWeight: 600,
            lineHeight: 1.05,
            textAlign: "left",
            textShadow: "none",
          }}
        >
          Most LinkedIn videos look the same.
        </MotionText>
        <div
          style={{
            background: SHOWCASE_COLORS.accentCoral,
            height: 3,
            marginTop: 50,
            transform: `scaleX(${lineProgress})`,
            transformOrigin: "left center",
            width: 920,
          }}
        />
        <MotionText
          frame={frame}
          start={354}
          end={405}
          size={110}
          maxWidth={920}
          color={SHOWCASE_COLORS.inkOnLight}
          useSpringEntrance
          style={{
            ...type,
            fontWeight: 800,
            lineHeight: 0.94,
            marginTop: 46,
            textAlign: "left",
          }}
        >
          Yours doesn&apos;t have to.
        </MotionText>
      </div>
    </AbsoluteFill>
  );
};

const SceneFour: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const codeColor = interpolateColors(drawProgress(frame, 450, 18), [0, 1], [
    SHOWCASE_COLORS.inkOnLight,
    SHOWCASE_COLORS.accentCoral,
  ]);

  return (
    <AbsoluteFill
      style={{
        ...centered,
        background: SHOWCASE_COLORS.backgroundWarm,
        opacity: sceneCrossfade(frame, 390, 555),
      }}
    >
      <MotionText
        frame={frame}
        start={390}
        end={555}
        size={140}
        maxWidth={980}
        color={SHOWCASE_COLORS.inkOnLight}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.92,
          textAlign: "center",
        }}
      >
        Built with <span style={{ color: codeColor }}>code.</span>
      </MotionText>
      <MotionText
        frame={frame}
        start={468}
        end={555}
        size={140}
        maxWidth={980}
        color={SHOWCASE_COLORS.inkOnLight}
        useSpringEntrance
        style={{
          ...type,
          fontWeight: 800,
          lineHeight: 0.92,
          marginTop: 42,
          textAlign: "center",
        }}
      >
        Not agencies.
      </MotionText>
    </AbsoluteFill>
  );
};

const SceneFive: React.FC<{ readonly frame: number }> = ({ frame }) => {
  const background = interpolateColors(drawProgress(frame, 540, 18), [0, 1], [
    SHOWCASE_COLORS.backgroundWarm,
    SHOWCASE_COLORS.backgroundDark,
  ]);

  return (
    <AbsoluteFill
      style={{
        ...centered,
        background,
        opacity: sceneCrossfade(frame, 540, 660),
      }}
    >
      <MotionText
        frame={frame}
        start={558}
        end={660}
        size={72}
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
        Order one video.
      </MotionText>
      <div style={{ marginTop: 32 }}>
        <PriceStagger frame={frame} start={588} size={240} color={SHOWCASE_COLORS.accentCoral} />
      </div>
      <MotionText
        frame={frame}
        start={624}
        end={660}
        size={36}
        maxWidth={900}
        color={SHOWCASE_COLORS.mutedOnDark}
        useSpringEntrance
        style={{
          fontWeight: 400,
          lineHeight: 1.16,
          marginTop: 28,
          textAlign: "center",
          textShadow: "none",
        }}
      >
        First preview in 48 hours.
      </MotionText>
    </AbsoluteFill>
  );
};

export const HeroConverter: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: SHOWCASE_COLORS.backgroundWarm }}>
      <SceneOne frame={frame} />
      <SceneTwo frame={frame} />
      <SceneThree frame={frame} />
      <SceneFour frame={frame} />
      <SceneFive frame={frame} />
    </AbsoluteFill>
  );
};

export default HeroConverter;
