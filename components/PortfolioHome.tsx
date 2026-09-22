import Image from "next/image";
import { AuditLeadForm } from "@/components/AuditLeadForm";
import { HomeInteractions } from "@/components/HomeInteractions";
import { services } from "@/lib/services";
import s from "./PortfolioHome.module.css";

const questions = [
  { q: "Which package should I choose?", a: "Choose One-page launch for one offer and supplied content. Choose Business website for several services and help writing the copy. Choose Website + ads launch when you also have a budget for Google Search ads. If you are unsure, tell me what you need and I will suggest the smallest useful project." },
  { q: "What is included in the price?", a: "Each package covers the design, development, revisions, and launch work listed above. Hosting, your domain, paid tools, and ad spend are separate. Shops, booking systems, custom apps, and ongoing marketing need a separate scope. I confirm the total in writing before you pay." },
  { q: "How do payment and timing work?", a: "These packages are 50% to begin and 50% after you approve the agreed work, before launch. Preview timing starts after I receive your deposit, access, and content. We agree on a launch date together. Revisions cover the original scope, and extras are quoted first." },
  { q: "Can you improve my current website?", a: "Yes. I work with WordPress and custom websites. I will check your platform and access first. If a few focused changes will do the job, I can quote those separately. You do not need to buy a full rebuild." },
  { q: "What does the ads and video package cover?", a: "One Google Search campaign for one business, with up to three ad groups, conversion tracking, and one review 30 days after the campaign starts. Ad spend is paid directly to Google. Ongoing management is separate. If useful, I can also make one 15–30 second video from your supplied brand assets, in one format with one revision. Filming is not included." },
  { q: "Will this guarantee more customers?", a: "No one can promise that from a redesign alone. Traffic quality, your offer, demand, and follow-up all matter. I build a clearer path to an inquiry and help you measure it, so future decisions can be based on real leads and sales." },
];
function Arrow() { return <span aria-hidden="true">↗</span>; }

export function PortfolioHome() {
  return <div className={s.site}>
    <a className={s.skip} href="#main-content">Skip to content</a>
    <header className={s.header}><div className={s.container}>
      <a href="/" className={s.wordmark} aria-label="Chuck Baryames home">chuck baryames<span>.</span></a>
      <nav className={s.nav} aria-label="Primary navigation"><a href="#work">Work</a><a href="#pricing">Services & pricing</a><a className={s.navCta} href="#audit" data-track="inquiry_cta" data-location="navigation">Let’s talk <Arrow /></a></nav>
    </div></header>
    <main id="main-content">
      <section className={`hero ${s.hero}`}><div className={s.container}><div className={s.heroGrid}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}><span className={s.dot} /> Independent web design & Google Ads</p>
          <h1>A better website.<br /><em>A clearer path<br />to your next customer.</em></h1>
          <p className={s.intro}>I help small service businesses turn what they do well into a website people understand, trust, and know how to act on.</p>
          <div className={s.heroActions}><a className={s.button} href="#pricing" data-track="services_cta" data-location="hero">Find your starting point <Arrow /></a><span>Websites from <strong>$350</strong><br />One-time project pricing</span></div>
          <div className={s.signature}><Image src="/portfolio/chuck-portrait-enhanced.png" alt="Chuck Baryames" width={48} height={48} sizes="48px" /><p>Designed and built by me, Chuck.<br /><span>Based in Michigan. Working with you directly.</span></p></div>
        </div>
        <div className={s.heroWork}>
          <div className={s.workLabel}><span>A REAL BUSINESS. MY ACTUAL WORK.</span><span>01 / SELECTED PROJECT</span></div>
          <a className={s.heroComposition} href="#work" aria-label="See the Baryames Cleaners project" data-track="proof_click" data-location="hero"><div className={s.desktopPreview}><div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>baryamescleaners.com</span><Arrow /></div><Image src="/portfolio/baryames-verified-20260908.jpg" alt="Baryames Cleaners website with the free pickup offer and a clear signup button" width={1348} height={926} loading="eager" fetchPriority="high" sizes="(max-width: 800px) 90vw, 50vw" /></div><div className={s.phonePreview}><Image src="/portfolio/baryames-mobile-20260909.png" alt="Baryames website adapted for mobile" width={390} height={844} sizes="(max-width: 800px) 25vw, 160px" /></div></a>
          <div className={s.heroCaption}><strong>Baryames Cleaners</strong><span>Website, copy & development <Arrow /></span></div>
        </div>
      </div><div className={s.heroBottom}><span>Clear scope before you pay</span><span>Desktop & mobile included</span><span>Your website, in your accounts</span></div></div></section>

      <section className={s.workSection} id="work"><div className={s.container}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>Selected work</p><h2>See what I <em>bring to the table.</em></h2></div><p>Website design, development, and marketing work for my family’s business.</p></div>
        <div className={s.workGrid}>
          <a className={s.workCard} href="https://baryamescleaners.com/" target="_blank" rel="noopener noreferrer" data-track="project_click" data-location="business_website"><div className={s.workImage}><Image src="/portfolio/baryames-verified-20260908.jpg" alt="Baryames Cleaners homepage" width={1348} height={926} sizes="(max-width: 800px) 90vw, 55vw" /></div><div className={s.workDescription}><div><span className={s.smallLabel}>Website design & development</span><h3>A local service, made simple.</h3><p>Clear services, visible pickup buttons, and a design that works on a phone.</p></div><Arrow /></div></a>
          <a className={s.workCard} href="https://baryamescleaners.com/services/wash-fold/" target="_blank" rel="noopener noreferrer" data-track="project_click" data-location="service_page"><div className={`${s.workImage} ${s.secondaryImage}`}><Image src="/portfolio/baryames-wash-fold-verified-20260908.jpg" alt="Wash and Fold service page showing how laundry pickup works" width={1348} height={926} sizes="(max-width: 800px) 90vw, 40vw" /></div><div className={s.workDescription}><div><span className={s.smallLabel}>Service page & copy</span><h3>One page. One useful next step.</h3><p>The offer, how it works, and a direct path to pickup signup.</p></div><Arrow /></div></a>
        </div><p className={s.proofNote}>My role: website design, copy, development, and ongoing marketing for Baryames Cleaners.</p>
      </div></section>

      <section className={s.pricingSection} id="pricing"><div className={s.container}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>Services & pricing</p><h2>Start with what you need.<br /><em>Build from there.</em></h2></div><p>A simple page, a full website, or help launching ads. Each has a clear scope and a one-time price.</p></div>
        <div className={s.packages}>{services.map((service, index) => <article className={`${s.package} ${service.featured ? s.featured : ""}`} key={service.id}>
          <div className={s.packageTop}><span>0{index + 1}</span><span>{service.featured ? "FOR YOUR CORE SERVICES" : index === 0 ? "A FOCUSED START" : "READY FOR PAID TRAFFIC"}</span></div>
          <h3>{service.title}</h3><p className={s.packageDetail}>{service.description}</p><p className={s.price}>{service.price}<span>one time</span></p><p className={s.included}>Here’s what’s included:</p>
          <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul><p className={s.timing}>{service.timing}</p><a href={`?offer=${service.id}#audit`} className={s.packageButton} data-track="offer_click" data-location={service.id}>{service.cta}<Arrow /></a>
        </article>)}</div>
        <div className={s.priceNotes}><p><strong>50% to start. 50% after approval.</strong><br />Preview timing starts once I have your content, access, and deposit. We confirm scope and timing in writing.</p><p><strong>You stay in control of the costs.</strong><br />Hosting, domains, paid tools, and ad spend are separate. Ongoing ads management and custom integrations are quoted separately.</p></div>
        <div className={s.smallProject}><p><strong>Already have a site?</strong> I can quote a focused refresh or a Google Ads review, too.</p><a href="?offer=focused-help#audit" data-track="offer_click" data-location="focused-help">Tell me what needs work <Arrow /></a></div>
      </div></section>

      <section className={s.aboutSection} id="about"><div className={`${s.container} ${s.aboutGrid}`}>
        <div className={s.portrait}><Image src="/portfolio/chuck-portrait-enhanced.png" alt="Chuck Baryames, independent designer and developer" width={768} height={768} sizes="(max-width: 800px) 80vw, 320px" /><span>Lansing, Michigan · Working remotely</span></div>
        <div className={s.aboutCopy}><p className={s.eyebrow}>Your designer. Your developer. Your point of contact.</p><h2>Hi, I’m Chuck.<br /><em>I’ll be doing the work.</em></h2><p>I handle website and marketing work for Baryames Cleaners, my family’s business. I think about the whole customer journey, from finding a service to getting in touch.</p><p>I use modern tools, including AI, to keep production efficient. I handle the design decisions, check the work, and stay responsible for what ships.</p><div className={s.skills}><span>Web design & development</span><span>Google Ads</span><span>Conversion tracking</span><span>Brand video</span></div></div>
      </div></section>

      <section className={s.processSection} id="process"><div className={s.container}><div className={s.sectionHeading}><div><p className={s.eyebrow}>How we’ll work together</p><h2>From first message <em>to live website.</em></h2></div></div><ol className={s.steps}>
        <li><span>01 / A short conversation</span><h3>Tell me what you need.</h3><p>Send your idea, website, or biggest frustration. I reply personally, usually within two business days. No call required.</p></li>
        <li><span>02 / A written plan</span><h3>Know the scope and price.</h3><p>We agree on the deliverables, timing, and price before a deposit. You’ll know what is included.</p></li>
        <li><span>03 / A preview, then a launch</span><h3>Review it before it goes live.</h3><p>I build it, you give feedback, and I test the agreed customer path on desktop and mobile before launch.</p></li>
      </ol></div></section>
      <section className={s.faqSection} id="faq"><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}>A few useful details</p><h2>Before we<br /><em>get started.</em></h2></div><div className={s.questions}>{questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
      <section className={s.contactSection} id="audit"><div className={`${s.container} ${s.contactGrid}`}><div className={s.contactCopy}><p className={s.eyebrow}>Let’s make the next step simple</p><h2>What are you<br /><em>working on?</em></h2><p>A new business, an outdated website, or a better place to send your ad traffic. Tell me a little about it.</p><p>I’ll reply with a recommended next step and whether I’m a good fit. No obligation and no required call.</p><a href="mailto:chuck@chuckbaryames.com?subject=Website%20project" className={s.contactEmail} data-track="email_click" data-location="contact">chuck@chuckbaryames.com <Arrow /></a><p className={s.responseNote}>A personal reply within two business days is my aim.</p></div><div className={s.formShell}><AuditLeadForm /></div></div></section>
    </main>
    <footer className={s.footer}><div className={s.container}><a href="/" className={s.wordmark}>chuck baryames<span>.</span></a><p>Thoughtful websites. A straightforward working relationship.</p><a href="#main-content">Back to top ↑</a></div><div className={`${s.container} ${s.legal}`}><span>© 2026 Chuck Baryames</span><span>Independent design & development</span></div></footer>
    <div className={`sticky-mobile-cta ${s.mobileCta}`}><a href="#audit" data-track="inquiry_cta" data-location="mobile_sticky">Tell me about your project <Arrow /></a></div>
    <HomeInteractions />
  </div>;
}
