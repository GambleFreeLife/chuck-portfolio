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
      <main>
        <Hero />
        <GrowthProof />
        <Services />
        <GrowthProcess />
        <GrowthPricing />
        <VideoShowcase />
        <AntiObjectionFAQ focus="growth" />
        <About focus="growth" />
        <FinalCTA />
      </main>
      <StickyMobileCTA />
      <Footer />
      <HomeInteractions />
    </>
  );
}
