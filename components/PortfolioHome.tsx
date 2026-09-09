import Image from "next/image";
import { AuditLeadForm } from "@/components/AuditLeadForm";
import { HomeInteractions } from "@/components/HomeInteractions";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import s from "./PortfolioHome.module.css";

const packages = [
  { id: "page-refresh", label: "For a page that needs a little help", title: "Focused refresh", price: "$500", detail: "Keep your site. Improve the parts that are getting in the way.", items: ["Up to three agreed improvements on one page", "Copy, contact buttons, or mobile layout", "One revision round and device checks"], timing: "Typical first preview: 2–3 business days", cta: "Ask about a refresh" },
  { id: "homepage-redesign", label: "For a stronger first impression", title: "Homepage redesign", price: "$1,000", detail: "Give your business a homepage you are proud to send people to.", items: ["New homepage copy, design, and build", "Your work, reviews, and offer put in the right order", "A clear inquiry path and mobile layout", "Two revision rounds and launch checks"], timing: "Typical first preview: 5 business days", cta: "Talk about my homepage", featured: true },
  { id: "website-redesign", label: "For a site you have outgrown", title: "Website redesign", price: "$2,500", from: true, detail: "Bring your core pages together into one clear, consistent website.", items: ["Up to five core pages, scoped before we start", "Copy, design, build, and navigation", "Contact form setup and device checks", "Two revision rounds and a handoff walkthrough"], timing: "Typical first preview: 10 business days", cta: "Talk about my website" },
];

const questions = [
  { q: "Do I need a whole new website?", a: "Maybe all you need is a better homepage, clearer copy, or an easier way to get in touch. Send me your URL and I will recommend the smallest useful project. A full rebuild only makes sense if the rest of the site needs the work too." },
  { q: "Can you work with my current website?", a: "I work with WordPress and custom websites. I will check your platform and access before confirming a price. You can keep your existing site address. If your platform limits what is possible, we will discuss that before work starts." },
  { q: "How do payment and revisions work?", a: "For these custom projects, we agree on the scope, total price, and delivery date in writing. Payment is 50% to begin and 50% after you approve the agreed work, before launch. The included revision rounds cover changes within that scope. Extra pages or features are quoted before I build them." },
  { q: "What do you need from me?", a: "To start the conversation, just your website and what you want to improve. Once we agree on a project, I will ask for access, your logo, real photos, and accurate service details. Preview timing starts after I have the agreed materials and deposit." },
  { q: "What costs are separate?", a: "Hosting, domains, paid software, e-commerce, booking integrations, and ongoing marketing are separate when needed. Your written scope will identify any of these before you commit. There is no required monthly retainer for the design work." },
  { q: "Will a redesign bring in more customers?", a: "A clear website can make it easier for visitors to understand your business and contact you. The number of new customers also depends on your traffic, demand, offer, and follow-up. I do not guarantee sales. We can agree on useful measures, such as qualified inquiries and booked work, before launch." },
];

export function PortfolioHome() {
  return (
    <div className={s.site}>
      <a className={s.skip} href="#main-content">Skip to content</a>
      <header className={s.header}>
        <div className={s.container}>
          <a href="/" className={s.wordmark} aria-label="Chuck Baryames home">chuck baryames<span aria-hidden="true">.</span></a>
          <nav className={s.nav} aria-label="Primary navigation">
            <a href="#work">The work</a><a href="#pricing">The price</a>
            <a className={s.navCta} href="#audit" data-track="audit_cta" data-location="navigation">Let’s talk <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main-content">
        <section className={`hero ${s.hero}`}>
          <div className={s.container}>
            <div className={s.heroGrid}>
              <div className={s.heroCopy}>
                <p className={s.eyebrow}>Independent web designer · Lansing, Michigan</p>
                <h1>Your work is good.<br />Your website should <em>make that obvious.</em></h1>
                <p className={s.intro}>I redesign websites for service businesses, with clear copy, thoughtful design, and an easier way for your next customer to get in touch.</p>
                <a className={s.button} href="#audit" data-track="audit_cta" data-location="hero">Let’s improve your website <span aria-hidden="true">↗</span></a>
                <p className={s.heroNote}>Start with a free review. Get a useful answer from me.</p>
              </div>
              <div className={s.heroWork}>
                <div className={s.workLabel}><span>REAL WORK, LIVE IN THE WORLD</span><span>01 / BARYAMES CLEANERS</span></div>
                <a className={s.heroComposition} href="#work" aria-label="Explore my Baryames Cleaners website redesign" data-track="proof_click" data-location="hero">
                  <div className={s.desktopPreview}>
                    <div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>baryamescleaners.com</span><span aria-hidden="true">↗</span></div>
                    <Image src="/portfolio/baryames-verified-20260908.jpg" alt="Baryames Cleaners homepage redesign with a clear free pickup offer and a prominent signup button" width={1348} height={926} loading="eager" sizes="(max-width: 760px) 90vw, 50vw" />
                  </div>
                  <div className={s.phonePreview}>
                    <Image src="/portfolio/baryames-mobile-20260909.png" alt="The same Baryames homepage on a phone" width={390} height={844} sizes="(max-width: 760px) 26vw, 175px" priority />
                  </div>
                  <span className={s.projectArrow} aria-hidden="true">↗</span>
                </a>
                <div className={s.heroCaption}><strong>Baryames Cleaners</strong><span>Website redesign, copy & development</span></div>
              </div>
            </div>
            <div className={s.heroBottom}><span>Good design earns attention. A clear next step gives it somewhere to go.</span><a href="#work">Take a closer look <span aria-hidden="true">↓</span></a></div>
          </div>
        </section>
        <section className={s.caseSection} id="work">
          <div className={s.container}>
            <div className={s.sectionHeading}><p className={s.eyebrow}>Featured work / Baryames Cleaners</p><span className={s.smallLabel}>Design · Copy · WordPress</span></div>
            <div className={s.caseIntro}><h2>A familiar local name.<br /><em>A fresh first impression.</em></h2><p>I redesigned my family’s dry cleaning website around a simple customer benefit: getting the laundry done without making another trip.</p></div>
            <ProjectExplorer />
            <div className={s.caseNotes}>
              <p className={s.caseRole}><strong>My part in the project</strong>Website design, copy, development, and ongoing marketing for Baryames Cleaners.</p>
              <div><h3>Lead with the reason to choose them.</h3><p>The free pickup offer is front and center, with the practical details close by: same in-store prices and no subscription.</p></div>
              <div><h3>Make the next step feel easy.</h3><p>Clear service pages, visible pickup buttons, and answers to common questions help visitors find their way to signup.</p></div>
            </div>
            <a className={s.textLink} href="https://baryamescleaners.com/" target="_blank" rel="noopener noreferrer" data-track="project_click" data-location="case_study">Explore the live website <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        <section className={s.valueSection}>
          <div className={`${s.container} ${s.valueGrid}`}>
            <div><p className={s.eyebrow}>Built around your customer</p><h2>More than a new look.<br /><em>A reason to reach out.</em></h2><p className={s.sectionIntro}>Your visitor has a few questions. Your website should make the answers easy to find.</p></div>
            <div className={s.valueList}>
              <div><span>01</span><div><h3>“Is this what I need?”</h3><p>Clear words that explain what you do, who you help, and what makes your service worth considering.</p></div></div>
              <div><span>02</span><div><h3>“Can I trust this business?”</h3><p>Your real work, photos, and customer reviews, presented with the same care you put into your service.</p></div></div>
              <div><span>03</span><div><h3>“How do I get started?”</h3><p>A clear way to call, book, or request a quote, with forms and layouts checked on desktop and mobile.</p></div></div>
            </div>
          </div>
        </section>
        <section className={s.pricingSection} id="pricing">
          <div className={s.container}>
            <p className={s.eyebrow}>The right amount of website</p>
            <div className={s.pricingHeading}><h2>A clear scope.<br /><em>An actual price.</em></h2><p>Start with what your business needs. I handle the copy, design, and build, and you work directly with me.</p></div>
            <div className={s.packages}>{packages.map(pkg => <article className={`${s.package} ${pkg.featured ? s.featured : ""}`} key={pkg.id}>
              <p className={s.packageLabel}>{pkg.label}</p><h3>{pkg.title}</h3><p className={s.price}>{pkg.from && <span>From </span>}{pkg.price}</p><p className={s.packageDetail}>{pkg.detail}</p>
              <ul>{pkg.items.map(item => <li key={item}>{item}</li>)}</ul><p className={s.timing}>{pkg.timing}</p>
              <a href={`?offer=${pkg.id}#audit`} className={s.packageButton} data-track="offer_click" data-location={pkg.id}>{pkg.cta}<span aria-hidden="true">↗</span></a>
            </article>)}</div>
            <div className={s.priceNotes}><p><strong>50% to start. 50% after approval.</strong> Scope and timing agreed before you pay. Preview timing starts once I have your materials and deposit.</p><p>Hosting, domains, paid tools, e-commerce, and new booking integrations are separate when needed. No required design retainer.</p></div>
          </div>
        </section>
        <section className={s.aboutSection} id="about">
          <div className={`${s.container} ${s.aboutGrid}`}>
            <div className={s.portrait}><Image src="/mypic.jpg" alt="Chuck Baryames, your designer and developer" width={768} height={768} sizes="(max-width: 760px) 80vw, 370px" /><span>Based in Lansing. Working with businesses anywhere.</span></div>
            <div className={s.aboutCopy}><p className={s.eyebrow}>A person, not a project handoff</p><h2>Hi, I’m Chuck.<br /><em>I’ll be doing the work.</em></h2><p>I handle website and marketing work for Baryames Cleaners, my family’s business. That means thinking beyond the page: what the customer needs, how the service works, and what happens after someone gets in touch.</p><p>When you hire me, you talk to the person writing the copy, designing the page, and building it. Send a question or a revision and it comes straight to me.</p><a href="#audit" className={s.textLink} data-track="audit_cta" data-location="about">Tell me about your website <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
        <section className={s.processSection} id="process"><div className={s.container}><div className={s.processHeading}><p className={s.eyebrow}>From your URL to your new website</p><h2>Easy to start.<br /><em>Clear at every step.</em></h2></div><ol className={s.steps}>
          <li><span>01 / Tell me what you need</span><h3>Send your website.</h3><p>I take a look and email you specific observations and what I would improve first. The review is free.</p></li>
          <li><span>02 / Know what you are getting</span><h3>Agree on the plan.</h3><p>We confirm the pages, price, and timeline in writing. You know what is included before paying a deposit.</p></li>
          <li><span>03 / See it before it goes live</span><h3>Review. Refine. Launch.</h3><p>You get a preview, we work through revisions, and I check the agreed customer path before launch.</p></li>
        </ol></div></section>
        <section className={s.faqSection} id="faq"><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}>Good questions</p><h2>Before we<br /><em>get started.</em></h2></div><div className={s.questions}>{questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
        <section className={s.contactSection} id="audit"><div className={`${s.container} ${s.contactGrid}`}>
          <div className={s.contactCopy}><p className={s.eyebrow}>Your next step</p><h2>Let’s make your<br />website <em>worth<br />sending people to.</em></h2><p>Send me your URL. I’ll reply with three specific observations, what I would prioritize, and a next step if you want my help.</p><p>No obligation. No required call. I aim to reply within two business days.</p><a href="mailto:chuck@chuckbaryames.com?subject=Website%20project" className={s.contactEmail} data-track="email_click" data-location="contact">chuck@chuckbaryames.com <span aria-hidden="true">↗</span></a></div>
          <div className={s.formShell}><AuditLeadForm /></div>
        </div></section>
      </main>
      <footer className={s.footer}><div className={s.container}><a href="/" className={s.wordmark}>chuck baryames<span>.</span></a><p>Thoughtful websites. A straightforward working relationship.</p><a href="#main-content">Back to top ↑</a></div><div className={`${s.container} ${s.legal}`}><span>© 2026 Chuck Baryames</span><span>Independent design & development</span></div></footer>
      <div className={`sticky-mobile-cta ${s.mobileCta}`}><a href="#audit" data-track="audit_cta" data-location="mobile_sticky">Let’s improve your website <span aria-hidden="true">↗</span></a></div>
      <HomeInteractions />
    </div>
  );
}
