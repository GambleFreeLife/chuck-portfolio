import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { GrowthPricing } from "@/components/GrowthPricing";
import { GrowthProcess } from "@/components/GrowthProcess";
import { GrowthProof } from "@/components/GrowthProof";
import { Hero } from "@/components/Hero";
import { HomeInteractions } from "@/components/HomeInteractions";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { VideoShowcase } from "@/components/VideoShowcase";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="conversion-home">
        <Hero />
        <GrowthProof />
        <GrowthPricing />
        <Services />
        <GrowthProcess />
        <About focus="growth" />
        <AntiObjectionFAQ focus="growth" />
        <FinalCTA />
        <details className="wrap additional-work video-details"><summary>Also available: brand video, with real Baryames examples</summary><VideoShowcase /></details>
      </main>
      <StickyMobileCTA />
      <Footer />
      <HomeInteractions />
    </>
  );
}
