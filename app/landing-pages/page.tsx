import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { Footer } from "@/components/Footer";
import { HomeInteractions } from "@/components/HomeInteractions";
import { LandingPagesFinalCTA } from "@/components/LandingPagesFinalCTA";
import { LandingPagesHero } from "@/components/LandingPagesHero";
import { LandingPagesProcess } from "@/components/LandingPagesProcess";
import { Nav } from "@/components/Nav";
import { OfferDetails } from "@/components/OfferDetails";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";

export default function LandingPagesPage() {
  return (
    <>
      <Nav />
      <main>
        <LandingPagesHero />
        <OfferDetails />
        <LandingPagesProcess />
        <Pricing focus="landing" />
        <Portfolio focus="landing" />
        <AntiObjectionFAQ focus="landing" />
        <About focus="landing" />
        <LandingPagesFinalCTA />
      </main>
      <Footer />
      <HomeInteractions />
    </>
  );
}
