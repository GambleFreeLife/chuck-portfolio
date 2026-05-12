import { HomeInteractions } from "@/components/HomeInteractions";
import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
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
        <Pricing />
        <TheStack />
        <AntiObjectionFAQ />
        <Portfolio />
        <About />
        <FinalCTA />
      </main>
      <StickyMobileCTA />
      <Footer />
      <HomeInteractions />
    </>
  );
}
