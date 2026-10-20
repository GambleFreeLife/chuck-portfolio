import Image from "next/image";
import { ArtPicture } from "@/components/ArtPicture";
import { AuditLeadForm } from "@/components/AuditLeadForm";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { HomeInteractions } from "@/components/HomeInteractions";
import { PortfolioVideos } from "@/components/PortfolioVideos";
import { SoupSpoonProof } from "@/components/SoupSpoonProof";
import { services, foundingPlacesAvailable, primaryCta } from "@/lib/services";
import { soupSpoon, soupSpoonShots as shot, soupSpoonSpeedIndex, soupSpoonHeadlineStats } from "@/lib/soup-spoon";
import s from "./PortfolioHome.module.css";

const asset = "/portfolio/20261004";

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
function ReviewLink({ location, className, short }: { location: string; className?: string; short?: string }) {
  return <a className={className} href="?offer=free-review#audit" data-track="cta_click" data-label={primaryCta} data-location={location} data-offer="free-review">
    {short ? <><span className={s.longLabel}>{primaryCta}</span><span className={s.shortLabel}>{short}</span></> : primaryCta}<Arrow />
  </a>;
}

export function PortfolioHome() {
  return <div className={s.site}>
    <a className={s.skip} href="#main-content">Skip to content</a>
    <header className={s.header}><div className={s.container}>
      <a href="/" className={s.wordmark} aria-label="Chuck Baryames home">chuck baryames<span>.</span></a>
      <nav className={s.nav} aria-label="Primary navigation">
        <a href="#soup-spoon" className={s.navLink}>Before and after</a>
        <a href="#work" className={s.navLink}>Work</a>
        <a href="#pricing" className={s.navLink}>Pricing</a>
        <ReviewLink location="navigation" className={s.navCta} short="3 free fixes" />
      </nav>
    </div></header>

    <main id="main-content">
      <section className={`hero ${s.hero}`}><div className={s.container}>
        <div className={s.heroGrid}>
          <div className={`${s.heroCopy} ${s.heroTop}`}>
            <p className={s.badge}><span className={s.pulse} aria-hidden="true" />New: {soupSpoon.name}, live since Oct 19</p>
            <h1>Your website should bring in customers. <em>Here’s what that looks like.</em></h1>
            <p className={s.intro}>I redesigned {soupSpoon.name}’s whole website in {soupSpoon.place}. Drag the line to compare the old site with the new one.</p>
          </div>
          <figure className={s.heroShow}>
            <div className={s.browser}>
              <div className={s.browserBar}><span className={s.lights} aria-hidden="true"><i /><i /><i /></span><span className={s.address}>soupspooncafe.com</span></div>
              <BeforeAfterSlider
                className={s.heroSlider}
                label="Compare the old and new Soup Spoon Cafe homepage"
                beforeLabel="Before"
                afterLabel="After"
                before={<ArtPicture wide={shot.desktopBefore} narrow={shot.phoneBefore} alt="The old Soup Spoon Cafe homepage: a logo over a food photo and one button" eager wideSizes="(max-width: 1100px) 92vw, 760px" narrowSizes="(max-width: 700px) 86vw, 360px" />}
                after={<ArtPicture wide={shot.desktopAfter} narrow={shot.phoneAfter} alt="The new Soup Spoon Cafe homepage with Order online, Reserve a table, Call and Get directions up front" eager priority wideSizes="(max-width: 1100px) 92vw, 760px" narrowSizes="(max-width: 700px) 86vw, 360px" />}
              />
            </div>
            <figcaption className={s.heroCaption}><span><strong>{soupSpoon.name}</strong> homepage. Before: Oct 16, 2026. After: live now.</span><a href={soupSpoon.url} target="_blank" rel="noopener noreferrer" data-track="case_study_click" data-project="soup-spoon" data-location="hero_caption">Visit the live site <Arrow /></a></figcaption>
          </figure>
          <div className={`${s.heroCopy} ${s.heroBottom}`}>
            <div className={s.heroActions}>
              <ReviewLink location="hero" className={s.button} />
              <a className={s.ghostButton} href={soupSpoon.caseStudy} data-track="case_study_click" data-project="soup-spoon" data-location="hero">See the full project <span aria-hidden="true">→</span></a>
            </div>
            <p className={s.heroNote}>Send your URL and I’ll email three things I’d fix within 2 business days. No call required.</p>
            <p className={s.trust}><strong>Websites from $750.</strong> You work directly with me, and I run marketing for my family’s 11-location business, open since 1922.</p>
          </div>
        </div>
        <dl className={s.statStrip}>{soupSpoonHeadlineStats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
      </div></section>

      <section className={s.phoneSection} id="soup-spoon"><div className={s.container}>
        <div className={s.sectionHeading}>
          <div><p className={s.eyebrow}><span className={s.dot} />The Soup Spoon project</p><h2>What a hungry customer sees first, <em>before and after.</em></h2></div>
          <p>Most restaurant visits start on a phone. The old homepage gave people one button, but the new one puts the four things they came for on the first screen.</p>
        </div>
        <div className={s.phoneCompare}>
          <figure className={s.phoneCard}>
            <span className={`${s.sideTag} ${s.sideBefore}`}>Before</span>
            <div className={s.phoneFrame}><Image src={shot.phoneBefore.src} width={shot.phoneBefore.width} height={shot.phoneBefore.height} alt={shot.phoneBefore.alt} sizes="(max-width: 700px) 44vw, 300px" /></div>
            <figcaption><p>On the old site, a visitor got:</p><ul className={s.minus}><li>one button, which opened a reservations page with no menu,</li><li>a phone link that didn’t dial,</li><li>and a menu on a separate website, with no way to order.</li></ul></figcaption>
          </figure>
          <figure className={s.phoneCard}>
            <span className={`${s.sideTag} ${s.sideAfter}`}>After</span>
            <div className={s.phoneFrame}><Image src={shot.phoneAfter.src} width={shot.phoneAfter.width} height={shot.phoneAfter.height} alt={shot.phoneAfter.alt} sizes="(max-width: 700px) 44vw, 300px" /></div>
            <figcaption><p>On the new site, they get:</p><ul className={s.plus}><li>Order online, Reserve a table, Call and Get directions on the first screen,</li><li>a bar that keeps Order, Reserve and Call in reach while they scroll,</li><li>and the menu on the restaurant’s own site, which the staff update themselves.</li></ul></figcaption>
          </figure>
        </div>
      </div></section>

      <section className={s.scoreSection} id="results"><div className={s.container}>
        <div className={s.sectionHeading}>
          <div><p className={s.eyebrow}><span className={s.dot} />Measured, not guessed</p><h2>Google scored the old site and the new one. <em>Here’s the difference.</em></h2></div>
          <p>These are Google’s own website checks, so anyone can rerun them. The page also fills in on a phone in {soupSpoonSpeedIndex.after.replace(" s", " seconds")}, down from {soupSpoonSpeedIndex.before.replace(" s", "")}.</p>
        </div>
        <SoupSpoonProof />
      </div></section>

      <section className={s.jobSection}><div className={s.container}>
        <div className={s.sectionHeading}>
          <div><p className={s.eyebrow}><span className={s.dot} />More than a new look</p><h2>The redesign came with the parts <em>that bring in business.</em></h2></div>
          <p>A good-looking homepage is the start. For Soup Spoon, I also built the pages and campaign that turn interest into orders and catering requests.</p>
        </div>
        <div className={s.jobGrid}>
          <article className={s.jobCard}>
            <div className={s.jobVisual}><div className={s.miniPhones}><Image src={shot.cateringAfter.src} width={shot.cateringAfter.width} height={shot.cateringAfter.height} alt={shot.cateringAfter.alt} sizes="160px" /><Image src={shot.quoteForm.src} width={shot.quoteForm.width} height={shot.quoteForm.height} alt={shot.quoteForm.alt} sizes="160px" /></div></div>
            <h3>A catering page that asks for the order</h3>
            <p>Prices sit up front, and a short quote form needs only a name and email, so a catering search turns into a request instead of a voicemail.</p>
          </article>
          <article className={s.jobCard}>
            <div className={s.jobVisual}>
              <div className={s.ad} role="img" aria-label="Example Soup Spoon catering search ad">
                <p className={s.adTop}><b>Sponsored</b><span>soupspooncafe.com/catering</span></p>
                <p className={s.adTitle}>Boxed Lunches From $13 | Get a Free Catering Quote</p>
                <p className={s.adText}>No order minimum. Pickup, delivery &amp; setup, or full service. Boxed lunches from $13.</p>
              </div>
            </div>
            <h3>A Google Ads campaign that finds the customers</h3>
            <p>I built and run the catering campaign that sends Lansing searchers to that page, and it tracks quote requests and phone taps so the ad money can be judged.</p>
          </article>
          <article className={s.jobCard}>
            <div className={s.jobVisual}><Image className={s.jobShot} src={shot.menuAfter.src} width={shot.menuAfter.width} height={shot.menuAfter.height} alt={shot.menuAfter.alt} sizes="(max-width: 800px) 90vw, 400px" /></div>
            <h3>A menu the staff change themselves</h3>
            <p>The menu moved onto the restaurant’s own site. The staff update dishes and prices and print menus on their own, without calling anyone.</p>
          </article>
        </div>
        <a className={s.caseLink} href={soupSpoon.caseStudy} data-track="case_study_click" data-project="soup-spoon" data-location="job_section">Read the full Soup Spoon case study <span aria-hidden="true">→</span></a>
      </div></section>

      <section className={s.workSection} id="work"><div className={s.container}>
        <div className={s.sectionHeading}>
          <div><p className={s.eyebrow}><span className={s.dot} />More work</p><h2>Before Soup Spoon, <em>my own family’s business.</em></h2></div>
          <p>I redesigned the website for Baryames Cleaners and run its marketing, and I built Bet on Recovery from scratch.</p>
        </div>
        <div className={s.workGrid}>
          <article className={s.workCard}>
            <BeforeAfterSlider
              className={s.workSlider}
              intro={false}
              label="Compare the Baryames Cleaners homepage before and after the October 3 update"
              beforeLabel="Before"
              afterLabel="After"
              before={<Image src={asset + "/baryames-before.webp"} width={1200} height={805} alt="The Baryames Cleaners homepage before the October 3 update" sizes="(max-width: 800px) 90vw, 620px" />}
              after={<Image src={asset + "/baryames-desktop.webp"} width={1200} height={833} alt="The Baryames Cleaners homepage now, with tailoring appointments and free pickup up front" sizes="(max-width: 800px) 90vw, 620px" />}
            />
            <div className={s.workBody}>
              <p className={s.role}>Family business · 11 locations</p>
              <h3>Baryames Cleaners</h3>
              <p>I redesigned and built the website, and I run its tailoring Google Ads, iContact email campaigns and video. Tailoring appointments, pickup signup and service details now each have a direct link.</p>
              <a className={s.projectLink} href="https://baryamescleaners.com/" target="_blank" rel="noopener noreferrer" data-track="case_study_click" data-project="baryames" data-location="work">Explore the Baryames website <Arrow /></a>
            </div>
          </article>
          <article className={s.workCard}>
            <div className={s.workImage}><Image src={asset + "/recovery-desktop.webp"} width={1200} height={833} alt="The Bet on Recovery website on a computer" sizes="(max-width: 800px) 90vw, 620px" /></div>
            <div className={s.workBody}>
              <p className={s.role}>My own project</p>
              <h3>Bet on Recovery</h3>
              <p>I designed, wrote and built the site, so the project’s purpose and resources sit together in one place.</p>
              <a className={s.projectLink} href="https://betonrecovery.org/" target="_blank" rel="noopener noreferrer" data-track="case_study_click" data-project="recovery" data-location="work">Explore Bet on Recovery <Arrow /></a>
            </div>
          </article>
        </div>
        <PortfolioVideos />
      </div></section>

      <section className={s.pricingSection} id="pricing"><div className={s.container}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}><span className={s.dot} />Services and pricing</p><h2>A clear scope <em>before you pay.</em></h2></div><p>Choose the starting point that fits your business. I’ll confirm the details in writing before a deposit.</p></div>
        <div className={s.packages}>{services.map((service,index) => <article className={`${s.package} ${service.featured ? s.featured : ""}`} key={service.id}>
          {service.featured && <p className={s.popular}>Most popular</p>}
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
        <div><p className={s.eyebrow}><span className={s.dot} />About and how it works</p><h2>You’ll work <em>directly with me.</em></h2><p>I’m Chuck, based in Lansing, Michigan. I handle the design, writing, and build, and you’ll talk to the person doing the work. I use modern tools, including AI, and review what ships.</p></div>
      </div><ol className={s.steps}><li><span>01</span><h3>Send your website or project.</h3><p>For the free review, send your URL and I’ll reply with three things I’d fix. If you’re starting fresh, tell me what you need.</p></li><li><span>02</span><h3>Agree on the scope.</h3><p>For paid work, you’ll get the deliverables, price, and timing in writing before a deposit.</p></li><li><span>03</span><h3>Review, approve, and launch.</h3><p>You’ll see a preview, use your included revision rounds, and approve the work before it goes live.</p></li></ol></div></section>

      <section className={s.faqSection} id="faq"><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}><span className={s.dot} />A few useful details</p><h2>Before we <em>get started.</em></h2></div><div className={s.questions}>{questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>

      <section className={s.contactSection} id="audit"><div className={`${s.container} ${s.contactGrid}`}>
        <div className={s.contactCopy}>
          <p className={s.eyebrow}><span className={s.dot} />A useful place to start</p>
          <h2 id="contact-title" tabIndex={-1}>{primaryCta}</h2>
          <p>Send your URL for a short review, or choose a service to tell me about a project. I’ll look at your site the way I looked at Soup Spoon’s.</p>
          <ul className={s.contactPoints}><li>Three specific fixes, by email</li><li>Within 2 business days</li><li>No call and no obligation</li></ul>
          <a href="mailto:chuck@chuckbaryames.com" className={s.contactEmail} data-track="email_click" data-location="contact">chuck@chuckbaryames.com <Arrow /></a>
        </div>
        <div className={s.formShell}><AuditLeadForm /></div>
      </div></section>
    </main>

    <footer className={s.footer}><div className={s.container}><div><a href="/" className={s.wordmark}>chuck baryames<span>.</span></a><p>Websites and marketing · Lansing, Michigan</p></div><div className={s.footerLinks}><a href="#soup-spoon">Before and after</a><a href={soupSpoon.caseStudy}>Soup Spoon case study</a><a href="#pricing">Pricing</a><a href="/privacy">Privacy Policy</a><a href="mailto:chuck@chuckbaryames.com" data-track="email_click" data-location="footer">Email Chuck</a></div><p>© 2026 Chuck Baryames</p></div></footer>
    <div className={`sticky-mobile-cta ${s.mobileCta}`}><ReviewLink location="mobile_sticky" /></div>
    <HomeInteractions />
  </div>;
}
