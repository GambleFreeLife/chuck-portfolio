import Image from "next/image";
import { LiveSitePreview } from "@/components/LiveSitePreview";

export function Hero() {
  return (
    <section className="hero portfolio-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-name">WEBSITE HELP FOR GREATER LANSING BUSINESSES</div>
          <h1><span>Make it easier for your next customer</span><span>to choose you.</span></h1>
          <p className="hero-sub">I fix confusing pages, hard-to-find contact buttons, and frustrating mobile layouts so customers can take the next step. Start with three specific recommendations for your website, free.</p>
          <div className="hero-action">
            <a href="#audit" className="hero-cta" data-track="audit_cta" data-location="hero">Get my free website review</a>
            <a href="#work" className="hero-cta-ghost" data-track="proof_click" data-location="hero">See my work</a>
          </div>
          <p className="hero-trust">A personal email from me. No phone number or sales call required.</p>
          <div className="hero-person">
            <Image src="/mypic.jpg" alt="Chuck Baryames" width={48} height={48} />
            <p><strong>Chuck Baryames</strong><span>I handle website and marketing work for my family’s business, Baryames Cleaners.</span></p>
          </div>
          <a href="#pricing" className="hero-price-link">Website fixes from $299 · Fixed scope, one-time price</a>
        </div>
        <div className="hero-proof-shell" aria-label="Baryames Cleaners website work">
          <div className="hero-proof-topline"><div><div className="hero-proof-kicker">LOCAL WORK YOU CAN CHECK</div><strong>Baryames Cleaners</strong></div><span className="hero-proof-live">11 locations</span></div>
          <LiveSitePreview url="https://baryamescleaners.com/" label="Baryames Cleaners homepage" priority />
          <div className="hero-proof-caption"><strong>A clearer path to free pickup.</strong><p>Service details, local trust, and a prominent signup button, brought together on one page.</p></div>
          <p className="hero-proof-verification">The live website footer credits my redesign and development work. Screenshot captured September 8, 2026.</p>
        </div>
      </div>
    </section>
  );
}
