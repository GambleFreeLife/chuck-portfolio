import { About } from "@/components/About";
import { AntiObjectionFAQ } from "@/components/AntiObjectionFAQ";
import { CrossServiceCTA } from "@/components/CrossServiceCTA";
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
        <CrossServiceCTA
          eyebrow="Need attention too?"
          headline="I can build the video that sends people to the page."
          body="A focused landing page handles the conversion. Short brand video is available when the bigger problem is getting the right people to stop and click."
          href="/order-video?plan=single"
          cta="See the video order"
        />
      </main>
      <Footer />
      <HomeInteractions />
    </>
  );
}
