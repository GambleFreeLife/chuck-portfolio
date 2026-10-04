import Image from "next/image";
import { AuditLeadForm } from "@/components/AuditLeadForm";
import { HomeInteractions } from "@/components/HomeInteractions";
import { PortfolioVideos } from "@/components/PortfolioVideos";
import { services, foundingPlacesAvailable, primaryCta } from "@/lib/services";
import s from "./PortfolioHome.module.css";

const asset = "/portfolio/20261004";
const projects = [
  { id: "baryames", name: "Baryames Cleaners", role: "Family business", type: "Website, Google Ads, email and video", url: "https://baryamescleaners.com/", problem: "Customers need to find the right service and know how to book, sign up, or get in touch.", work: "I redesigned and developed the website. I also handle its tailoring Google Ads, iContact email campaigns, and video.", result: "Tailoring appointments, pickup signup, and service information now have direct links to act.", before: "baryames-before.webp", beforeLabel: "Homepage opening, before the October 3 update", beforeWidth: 1200, beforeHeight: 805 },
  { id: "recovery", name: "Bet on Recovery", role: "My own project", type: "Design, copy and development", url: "https://betonrecovery.org/", problem: "Explain the purpose of a recovery project and make its resources easy to explore.", work: "I designed, wrote, and built the site.", result: "A live website that brings the project’s purpose and resources together.", before: "", beforeLabel: "", beforeWidth: 0, beforeHeight: 0 },
  { id: "soup-spoon", name: "Soup Spoon Cafe", role: "Catering page and campaign", type: "Website and Google Ads · Lansing", url: "https://soupspooncafe.com/catering-special-events/", problem: "Catering visitors need menu details and a clear way to ask about their event.", work: "I rebuilt the catering page with a quote form and built the Google Ads catering campaign, which I run.", result: "Visitors can review catering options and send an event request from the page.", before: "soup-spoon-before.webp", beforeLabel: "Archived catering page, before the September 5 rebuild", beforeWidth: 720, beforeHeight: 4195 },
] as const;
const questions = [
  { q: "What do I get with the free website review?", a: "Three specific things I’d fix on your website, sent by email within 2 business days. It’s a short review, with no obligation to hire me and no required call. The fixes are recommendations; implementation is separate." },
  { q: "Will a new website guarantee more customers?", a: "No one can promise that from a redesign alone. Your offer, traffic, reputation, and follow-up all matter. I can make the next step clearer and set up tracking so we can see what happens." },
  { q: "What do you need from me?", a: "A short intake about your business, access to the accounts we’ll use, and any photos, branding, or footage you want included. I write the website copy from your business details. The preview clock starts when the agreed inputs and deposit are in." },
  { q: "Can you work on my existing website?", a: "Yes. Send the URL and what needs attention. I’ll review it and quote a focused fix or explain when a larger rebuild makes more sense." },
  { q: "How do revisions work?", a: "Landing Page includes one round. Business Website and the website portion of Website + Google Ads Launch include two. Send one consolidated set of feedback per round. New pages, features, or a changed scope are quoted before I do extra work." },
  { q: "Do I have to sign a long contract?", a: "No. Website projects have a written scope and payment schedule. Monthly services are month-to-month, with 30 days’ notice to cancel." },
  { q: "Do I own my website?", a: "Yes. It lives in your accounts, and you keep access after the project. I’ll provide a handoff. Any third-party tools, fonts, or stock assets remain subject to their own licenses, with costs agreed in advance." },
  { q: "Is ad spend included?", a: "No. You pay Google directly from your own account. The launch package covers setup and a 30-day review. Ongoing campaign management is the separate monthly service." },
  { q: "Do you film the videos?", a: "These packages use photos and footage you supply and have permission to use. I handle the edit, on-screen text, and captions. Filming is not included." },
];
function Arrow() { return <span aria-hidden="true">↗</span>; }
function ReviewLink({ location, className }: { location: string; className?: string }) {
  return <a className={className} href="?offer=free-review#audit" data-track="cta_click" data-label={primaryCta} data-location={location} data-offer="free-review">{primaryCta}<Arrow /></a>;
}
export function PortfolioHome() {
  return <div className={s.site}>
    <a className={s.skip} href="#main-content">Skip to content</a>
    <header className={s.header}><div className={s.container}>
      <a href="/" className={s.wordmark} aria-label="Chuck Baryames home">chuck baryames<span>.</span></a>
      <nav className={s.nav} aria-label="Primary navigation"><a href="#work">Work</a><a href="#pricing">Pricing</a><ReviewLink location="navigation" className={s.navCta} /></nav>
    </div></header>
    <main id="main-content">
      <section className={`hero ${s.hero}`}><div className={s.container}><div className={s.heroGrid}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}><span className={s.dot} /> Websites and marketing for Michigan service businesses</p>
          <h1>Make it easier for your next customer <em>to choose you.</em></h1>
          <p className={s.intro}>I build websites and run Google Ads, email campaigns, and short video for local service businesses in Michigan.</p>
          <p className={s.trust}>I run marketing for my family’s 11-location business, open since 1922.</p>
          <div className={s.heroActions}><ReviewLink location="hero" className={s.button} /><a className={s.textLink} href="#pricing">See pricing <span aria-hidden="true">↓</span></a></div>
          <p className={s.heroNote}>Send your URL. I’ll reply with three things I’d fix. No call required.</p>
          <p className={s.startPrice}>Websites from <strong>$750.</strong></p>
        </div>
        <div className={s.heroWork}>
          <div className={s.workLabel}><span>Real work. A local business.</span><span>01 / Baryames</span></div>
          <a className={s.heroComposition} href="#work" aria-label="baryamescleaners.com: see the project">
            <div className={s.desktopPreview}><div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>baryamescleaners.com</span><Arrow /></div><Image src={asset + "/baryames-desktop.webp"} alt="Baryames homepage with tailoring appointments and free pickup navigation" width={1200} height={833} loading="eager" fetchPriority="high" sizes="(max-width: 800px) 86vw, 48vw" /></div>
            <div className={s.phonePreview}><Image src={asset + "/baryames-mobile.webp"} alt="The Baryames homepage on a phone" width={390} height={844} loading="eager" fetchPriority="high" sizes="(max-width: 800px) 24vw, 150px" /></div>
          </a>
          <div className={s.heroCaption}><strong>Baryames Cleaners</strong><span>Website, copy and development</span></div>
        </div>
      </div><div className={s.heroBottom}><span>Clear scope before you pay</span><span>Work directly with Chuck</span><span>Your website, in your accounts</span></div></div></section>

      <section className={s.workSection} id="work"><div className={s.container}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>Selected work</p><h2>Work you can <em>look through.</em></h2></div><p>See the pages, campaigns, and videos I’ve made, with my role in each project.</p></div>
        <div className={s.projectGrid}>{projects.map(project => <article className={s.project} key={project.id}>
          <div className={s.projectImages}><Image src={`${asset}/${project.id}-desktop.webp`} alt={`${project.name} desktop website, October 4, 2026`} width={1200} height={833} sizes="(max-width: 800px) 85vw, 31vw" /><Image className={s.projectPhone} src={`${asset}/${project.id}-mobile.webp`} alt={`${project.name} mobile website`} width={390} height={844} sizes="(max-width: 800px) 22vw, 100px" /></div>
          <div className={s.projectBody}><p className={s.role}>{project.role}</p><h3>{project.name}</h3><p className={s.projectType}>{project.type}</p>
            <dl><dt>The problem</dt><dd>{project.problem}</dd><dt>What I did</dt><dd>{project.work}</dd><dt>{project.id === "recovery" ? "The result" : "What changed"}</dt><dd>{project.result}</dd></dl>
            {project.id === "soup-spoon" && <p className={s.scopeNote}>My work covers the catering page and campaign. The overall website was built by another provider.</p>}
            {project.before && <details className={s.before}><summary>See the before view <span aria-hidden="true">+</span></summary><figure><div className={s.beforeImage}><Image src={asset + "/" + project.before} alt={project.beforeLabel} width={project.beforeWidth} height={project.beforeHeight} sizes="(max-width: 800px) 80vw, 350px" /></div><figcaption>{project.beforeLabel}. Compare with the current view above. This shows a visual change, not measured sales results.</figcaption></figure></details>}
            <a className={s.projectLink} href={project.url} target="_blank" rel="noopener noreferrer" data-track="case_study_click" data-project={project.id} data-location="work">Explore {project.id === "soup-spoon" ? "the catering page" : project.id === "recovery" ? "Bet on Recovery" : "the Baryames website"}<Arrow /></a>
          </div>
        </article>)}</div>
        <div className={s.campaigns} id="campaigns">
          <div><p className={s.eyebrow}>Supporting work</p><h3>Campaign examples</h3><p>Google Ads for Soup Spoon catering and Baryames tailoring, plus a Baryames iContact email.</p></div>
          <div className={s.adExamples}>
            <figure><figcaption>Soup Spoon · Catering Search campaign</figcaption><strong>Lansing catering</strong><p>General Lansing Catering and Corporate &amp; Office campaign groups.</p></figure>
            <figure><figcaption>Baryames · Tailoring Search campaign</figcaption><strong>Tailor Near Me · Book Online · Alterations in Lansing</strong><p>Examples of campaign copy, with a clear route to the service.</p></figure>
          </div>
          <figure className={s.emailExample}><a href={asset + "/email.webp"} target="_blank" rel="noopener noreferrer" aria-label="Open the full Baryames email sample"><Image src={asset + "/email.webp"} alt="Baryames sweater season email design and copy work sample" width={750} height={854} sizes="(max-width: 800px) 45vw, 260px" /></a><figcaption>Baryames iContact email · September 2026. <a href={asset + "/email.webp"} target="_blank" rel="noopener noreferrer">Open full sample <Arrow /></a></figcaption></figure>
        </div>
        <PortfolioVideos />
      </div></section>

      <section className={s.pricingSection} id="pricing"><div className={s.container}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>Services and pricing</p><h2>A clear scope <em>before you pay.</em></h2></div><p>Choose the starting point that fits your business. I’ll confirm the details in writing before a deposit.</p></div>
        <div className={s.packages}>{services.map((service,index) => <article className={`${s.package} ${service.featured ? s.featured : ""}`} key={service.id}>
          <p className={s.packageTop}><span>0{index + 1}</span><span>{service.label}</span></p>
          <h3>{service.title}</h3><p className={s.packageDetail}>{service.description}</p>
          <p className={s.price}>{service.price}<span>one time</span></p>
          {foundingPlacesAvailable > 0 && <p className={s.foundingPrice}>Founding-client rate <strong>{service.foundingPrice}</strong></p>}
          <p className={s.included}>Here’s what’s included:</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
          <p className={s.timing}>{service.timing}</p><a href={`?offer=${service.id}#audit`} className={s.packageButton} data-track="select_tier" data-offer={service.id} data-location="pricing">{service.cta}<Arrow /></a>
        </article>)}</div>
        <p className={s.timingNote}>Preview timing starts after the agreed scope, deposit, details, assets and access are in. Launch follows your approval.</p>
        <div className={s.addons}><h3>Ongoing help</h3><div className={s.addonRow}>
          <p><a href="?offer=ads-management#audit" data-track="cta_click" data-offer="ads-management" data-label="Google Ads management" data-location="monthly"><strong>Google Ads <span>$400/month</span></strong></a>Search terms, negatives, bids, budget and a monthly calls-and-leads report. Up to $3,000/month ad spend; above that, quoted.</p>
          <p><a href="?offer=email-campaigns#audit" data-track="cta_click" data-offer="email-campaigns" data-label="Email campaigns" data-location="monthly"><strong>Email campaigns <span>$240/month</span></strong></a>2 campaigns in your existing platform, including copy, design, sending, and a results summary.</p>
          <p><a href="?offer=short-video#audit" data-track="cta_click" data-offer="short-video" data-label="Short-form video" data-location="monthly"><strong>Short-form video <span>$600/month</span></strong></a>4 vertical videos, 15-60 seconds each, from your footage, with captions for Reels, Shorts, and Facebook.</p>
        </div><p className={s.finePrint}>Month-to-month. Cancel with 30 days’ notice.</p></div>
        <div className={s.oneoffs}><p><a href="?offer=brand-video#audit" data-track="cta_click" data-offer="brand-video" data-label="Brand video" data-location="oneoffs"><strong>One-off brand video: $400</strong> <Arrow /></a>A 15-30 second edit from your photos and footage, one format and one revision. Filming is not included.</p><p><strong>Focused fixes: quoted after review.</strong><a className={s.textLink} href="?offer=focused-help#audit" data-track="cta_click" data-offer="focused-help" data-label="Tell me what needs work" data-location="oneoffs">Tell me what needs work <Arrow /></a></p></div>
        {foundingPlacesAvailable > 0 && <aside className={s.founding} id="founding"><h3>Founding-client rates</h3><p><strong>{foundingPlacesAvailable} of 3 places available</strong> across all website packages, for my first outside website clients. Availability is confirmed in your scope.</p><p>In exchange: case-study permission and honest feedback. A testimonial is appreciated if you’re happy, never required to be positive. We’ll agree on any results before publication.</p></aside>}
        <p className={s.payment}><strong>50% to start, 50% after approval, before launch.</strong> Monthly services are billed monthly. Hosting, domain, tools, and ad spend are separate and stay in your accounts.</p>
        <p className={s.finePrint}>Phone-link clicks show intent to call. Measuring completed calls requires a suitable call-tracking setup, with any tool costs agreed separately.</p>
      </div></section>

      <section className={s.aboutSection} id="about"><div className={s.container}><div className={s.aboutIntro}>
        <Image src="/portfolio/chuck-portrait-enhanced.png" alt="Chuck Baryames" width={140} height={140} sizes="(max-width: 600px) 88px, 140px" />
        <div><p className={s.eyebrow}>About and how it works</p><h2>You’ll work <em>directly with me.</em></h2><p>I’m Chuck, based in Lansing, Michigan. I handle the design, writing, and build, and you’ll talk to the person doing the work. I use modern tools, including AI, and review what ships.</p></div>
      </div><ol className={s.steps}><li><span>01</span><h3>Send your website or project.</h3><p>For the free review, send your URL and I’ll reply with three things I’d fix. If you’re starting fresh, tell me what you need.</p></li><li><span>02</span><h3>Agree on the scope.</h3><p>For paid work, you’ll get the deliverables, price, and timing in writing before a deposit.</p></li><li><span>03</span><h3>Review, approve, and launch.</h3><p>You’ll see a preview, use your included revision rounds, and approve the work before it goes live.</p></li></ol></div></section>
      <section className={s.faqSection} id="faq"><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}>A few useful details</p><h2>Before we <em>get started.</em></h2></div><div className={s.questions}>{questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
      <section className={s.contactSection} id="audit"><div className={`${s.container} ${s.contactGrid}`}><div className={s.contactCopy}><p className={s.eyebrow}>A useful place to start</p><h2 id="contact-title" tabIndex={-1}>{primaryCta}</h2><p>Send your URL for a short review, or choose a service to tell me about a project.</p><a href="mailto:chuck@chuckbaryames.com" className={s.contactEmail} data-track="email_click" data-location="contact">chuck@chuckbaryames.com <Arrow /></a></div><div className={s.formShell}><AuditLeadForm /></div></div></section>
    </main>
    <footer className={s.footer}><div className={s.container}><div><a href="/" className={s.wordmark}>chuck baryames<span>.</span></a><p>Websites and marketing · Lansing, Michigan</p></div><div className={s.footerLinks}><a href="#work">Work</a><a href="#pricing">Pricing</a><a href="/privacy">Privacy Policy</a><a href="mailto:chuck@chuckbaryames.com" data-track="email_click" data-location="footer">Email Chuck</a></div><p>© 2026 Chuck Baryames</p></div></footer>
    <div className={`sticky-mobile-cta ${s.mobileCta}`}><ReviewLink location="mobile_sticky" /></div>
    <HomeInteractions />
  </div>;
}
