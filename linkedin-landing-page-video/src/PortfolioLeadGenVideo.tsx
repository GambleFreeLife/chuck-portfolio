import { AbsoluteFill, Sequence } from "remotion";
import { PHASES, FPS } from "./constants";
import { toFrame } from "./lib/animation";
import { Background } from "./components/Background";
import { HookPhase } from "./components/HookPhase";
import { TensionPhase } from "./components/TensionPhase";
import { TwistPhase } from "./components/TwistPhase";
import { CtaPhase } from "./components/CtaPhase";

export const PortfolioLeadGenVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#05070d",
        overflow: "hidden",
      }}
    >
      <Background />
      <Sequence
        from={toFrame(PHASES.hook.start, FPS)}
        durationInFrames={toFrame(PHASES.hook.end - PHASES.hook.start, FPS)}
        premountFor={FPS}
      >
        <HookPhase />
      </Sequence>
      <Sequence
        from={toFrame(PHASES.tension.start, FPS)}
        durationInFrames={toFrame(
          PHASES.tension.end - PHASES.tension.start,
          FPS,
        )}
        premountFor={FPS}
      >
        <TensionPhase />
      </Sequence>
      <Sequence
        from={toFrame(PHASES.twist.start, FPS)}
        durationInFrames={toFrame(PHASES.twist.end - PHASES.twist.start, FPS)}
        premountFor={FPS}
      >
        <TwistPhase />
      </Sequence>
      <Sequence
        from={toFrame(PHASES.cta.start, FPS)}
        durationInFrames={toFrame(PHASES.cta.end - PHASES.cta.start, FPS)}
        premountFor={FPS}
      >
        <CtaPhase />
      </Sequence>
    </AbsoluteFill>
  );
};
