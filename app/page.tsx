import { HomeInteractions } from "@/components/HomeInteractions";
import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { CrossServiceCTA } from "@/components/CrossServiceCTA";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TheStack } from "@/components/TheStack";
import { VideoShowcase } from "@/components/VideoShowcase";

export default function HomePage() {
  return (
    <>
      <div className="cursor-glow" id="cursorGlow" aria-hidden="true" />
      <canvas id="shapes-canvas" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <VideoShowcase />
        <HowItWorks />
        <Pricing focus="video" />
        <TheStack />
        <AntiObjectionFAQ focus="video" />
        <Portfolio focus="video" />
        <About focus="video" />
        <FinalCTA />
        <CrossServiceCTA
          eyebrow="Need the other half?"
          headline="Need somewhere for video traffic to land?"
          body="A sharp video earns the click, and a focused landing page turns that click into a real lead."
          href="/landing-pages"
          cta="See landing page services"
        />
      </main>
      <StickyMobileCTA />
      <Footer />
      <HomeInteractions />
    </>
  );
}
