import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { CrossServiceCTA } from "@/components/CrossServiceCTA";
import { Footer } from "@/components/Footer";
import { HomeInteractions } from "@/components/HomeInteractions";
import { LandingPagesFinalCTA } from "@/components/LandingPagesFinalCTA";
import { LandingPagesHero } from "@/components/LandingPagesHero";
import { LandingPagesProcess } from "@/components/LandingPagesProcess";
import { Nav } from "@/components/Nav";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";

export default function LandingPagesPage() {
  return (
    <>
      <Nav activePage="landing-pages" />
      <main>
        <LandingPagesHero />
        <LandingPagesProcess />
        <Pricing focus="landing" />
        <Portfolio focus="landing" />
        <AntiObjectionFAQ focus="landing" />
        <About focus="landing" />
        <LandingPagesFinalCTA />
        <CrossServiceCTA
          eyebrow="Need traffic too?"
          headline="Need video to drive traffic?"
          body="A landing page converts better when people are already warmed up, and a short brand video gives them a reason to click."
          href="/"
          cta="See brand videos"
        />
      </main>
      <Footer />
      <HomeInteractions />
    </>
  );
}
