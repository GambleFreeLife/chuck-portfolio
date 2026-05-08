import { HomeInteractions } from "@/components/HomeInteractions";
import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { OfferDetails } from "@/components/OfferDetails";
import { OtherOfferings } from "@/components/OtherOfferings";
import { Portfolio } from "@/components/Portfolio";

export default function HomePage() {
  return (
    <>
      <div className="cursor-glow" id="cursorGlow" />
      <canvas id="shapes-canvas" />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <OfferDetails />
        <AntiObjectionFAQ />
        <Portfolio />
        <About />
        <OtherOfferings />
        <FinalCTA />
      </main>
      <Footer />
      <HomeInteractions />
    </>
  );
}
