import "./index.css";
import { Composition } from "remotion";
import { HEIGHT, FPS, SHOWCASE_TOTAL_FRAMES, TOTAL_FRAMES, WIDTH } from "./constants";
import { PortfolioLeadGenVideo } from "./PortfolioLeadGenVideo";
import { PortfolioBrandIntro } from "./PortfolioBrandIntro";
import { PortfolioServiceExplainer } from "./PortfolioServiceExplainer";
import { PortfolioTestimonial } from "./PortfolioTestimonial";
import { HeroConverter } from "./HeroConverter";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LinkedInLandingPageProof"
        component={PortfolioLeadGenVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PortfolioBrandIntro"
        component={PortfolioBrandIntro}
        durationInFrames={SHOWCASE_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PortfolioServiceExplainer"
        component={PortfolioServiceExplainer}
        durationInFrames={SHOWCASE_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PortfolioTestimonial"
        component={PortfolioTestimonial}
        durationInFrames={SHOWCASE_TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="HeroConverter"
        component={HeroConverter}
        durationInFrames={660}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
