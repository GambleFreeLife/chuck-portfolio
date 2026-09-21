import Image from "next/image";
import { AuditLeadForm } from "@/components/AuditLeadForm";
import { HomeInteractions } from "@/components/HomeInteractions";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import s from "./PortfolioHome.module.css";

const packages = [
  { id: "landing-page", label: "A stronger place to send people", title: "Focused landing page", price: "$1,250", suffix: "one time", detail: "One service. One page. A clear path to an inquiry.", items: ["Copy, design, and build for one page", "A focused contact form and mobile layout", "Form submission and contact-click tracking", "Two revision rounds and launch checks"], timing: "Typical first preview: 5 business days", cta: "Discuss my landing page" },
  { id: "lead-generation", label: "For an ongoing flow of inquiries", title: "Google Ads + landing page", price: "$750", suffix: "/ month", setup: "+ $1,000 one-time setup", detail: "Reach people searching for your service, then give them a clear reason to contact you.", items: ["One Search campaign, service, and market", "One landing page included at setup", "Weekly campaign checks and optimization", "One page improvement and one review call monthly", "Monthly reporting on spend and lead quality"], timing: "For $1,000–$3,000/month in ad spend, paid to Google separately", cta: "Discuss my lead generation", featured: true },
  { id: "website-redesign", label: "A better foundation for your business", title: "Business website", price: "$2,500", from: true, suffix: "one time", detail: "A consistent website that makes your services easier to understand and choose.", items: ["Up to five core pages, scoped in writing", "Copy, design, build, and navigation", "Contact form and essential conversion tracking", "Two revision rounds and a handoff walkthrough"], timing: "Typical first preview: 10 business days", cta: "Discuss my website" },
];
const questions = [
  { q: "Which service is right for me?", a: "If you already have traffic from referrals, LinkedIn, or outreach, a focused page may be the right first step. If you need to reach people actively looking for your service, we can assess Google Ads. A larger website makes sense when several services or pages need work. I will recommend a scope after learning about the business." },
  { q: "How much should I budget for Google Ads?", a: "My standard package is $750 per month plus a $1,000 setup. Advertising spend is separate, paid directly to Google. I scope this package for $1,000 to $3,000 in monthly ad spend. We check search demand, likely costs, and the value of a new customer before committing. Some markets need a bigger budget or a different approach." },
  { q: "What is included in the monthly service?", a: "One Google Search campaign for one service and one market, one landing page built at setup, agreed conversion tracking, weekly campaign checks, one page improvement, and one 30-minute review call each month. Additional markets, campaigns, pages, video, CRM integrations, and automated messaging are separately scoped." },
  { q: "How do payment and cancellation work?", a: "Website projects are 50% to begin and 50% after approval, before launch. Ongoing marketing has a one-time setup fee and a monthly management fee. It is month to month with 30 days’ notice to cancel. We confirm scope, payment dates, and timing in writing before any payment. Paid accounts and delivered website work belong to you." },
  { q: "Do you use AI?", a: "Yes. I use AI to help with research, drafts, code, and analysis. I personally review the work, test the customer path, and remain responsible for what I deliver. Your project has a named person behind it, and you can reach me directly." },
  { q: "Can you guarantee leads or sales?", a: "I cannot promise a number of customers. Demand, competition, budget, your offer, and your sales follow-up all affect results. We define useful measures before launch, distinguish contact clicks from actual inquiries, and review which inquiries become booked work when your records allow it." },
  { q: "Can I keep my existing website and accounts?", a: "Yes. I work with WordPress and custom sites, and I check access and platform limitations before quoting. You keep ownership of your domain and advertising accounts. Hosting, domains, call-tracking tools, and other paid software are separate when required and identified in the scope." },
];

export function PortfolioHome({ initialService = "", inquiryOnly = false }: { initialService?: string; inquiryOnly?: boolean }) {
  return <div className={s.site}>
    <a className={s.skip} href="#main-content">Skip to content</a>
    <header className={s.header}><div className={s.container}>
      <a href="/" className={s.wordmark} aria-label="Chuck Baryames home">chuck baryames<span aria-hidden="true">.</span></a>
      <nav className={s.nav} aria-label="Primary navigation"><a href={inquiryOnly ? "/#work" : "#work"}>The work</a><a href={inquiryOnly ? "/#pricing" : "#pricing"}>Services & pricing</a><a className={s.navCta} href="#audit" data-track="project_cta" data-location="navigation">Discuss a project</a></nav>
    </div></header>
    <main id="main-content">
      {!inquiryOnly && <>
      <section className={`hero ${s.hero}`}><div className={s.container}>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>Websites & Google Ads for service businesses</p>
            <h1>Make it easier<br />for your next customer<br /><em>to choose you.</em></h1>
            <p className={s.intro}>I build clear websites and focused Google Ads campaigns that help turn interest into inquiries. You work directly with me, from the first conversation to launch and beyond.</p>
            <a className={s.button} href="#audit" data-track="project_cta" data-location="hero">Find the right project <span aria-hidden="true">↗</span></a>
            <p className={s.heroNote}>Pages from $1,250 · Ongoing marketing $750/month + setup</p>
            <div className={s.heroIdentity}><Image src="/portfolio/chuck-portrait-enhanced.png" alt="Chuck Baryames" width={48} height={48} /><span><strong>Chuck Baryames</strong>Independent. Based in Lansing, Michigan.</span></div>
          </div>
          <div className={s.heroWork}>
            <div className={s.workLabel}><span>SEE THE WORK</span><span>BARYAMES CLEANERS</span></div>
            <a className={s.heroComposition} href="#work" aria-label="Explore my Baryames Cleaners website work" data-track="proof_click" data-location="hero">
              <div className={s.desktopPreview}><div className={s.browserBar}><span aria-hidden="true">● ● ●</span><span>baryamescleaners.com</span><span aria-hidden="true">↗</span></div><Image src="/portfolio/baryames-verified-20260908.jpg" alt="Baryames Cleaners homepage with its free pickup offer and clear signup button" width={1348} height={926} priority sizes="(max-width: 900px) 90vw, 50vw" /></div>
              <div className={s.phonePreview}><Image src="/portfolio/baryames-mobile-20260909.png" alt="The Baryames homepage adapted for mobile" width={390} height={844} sizes="(max-width: 760px) 26vw, 175px" /></div>
            </a>
            <div className={s.heroCaption}><strong>A real local business.</strong><span>Copy, website, and ongoing marketing.</span></div>
          </div>
        </div>
        <div className={s.heroBottom}><span>Clear scope and pricing</span><span>Your accounts stay yours</span><span>One person accountable for the work</span></div>
      </div></section>
      <section className={s.fitSection}><div className={`${s.container} ${s.fitGrid}`}><p className={s.eyebrow}>A good fit when</p><p>You run an established service business, have room for more customers, and can follow up with inquiries. You want a useful improvement you can measure.</p></div></section>
      <section className={s.pricingSection} id="pricing"><div className={s.container}>
        <p className={s.eyebrow}>Choose the next step for your business</p>
        <div className={s.pricingHeading}><h2>Start focused.<br /><em>Build from there.</em></h2><p>Choose a standalone website project or ongoing help bringing people to it. Every engagement starts with an agreed scope.</p></div>
        <div className={s.packages}>{packages.map(pkg => <article className={`${s.package} ${pkg.featured ? s.featured : ""}`} key={pkg.id}>
          <p className={s.packageLabel}>{pkg.label}</p><h3>{pkg.title}</h3><div className={s.price}>{pkg.from && <span>From</span>}{pkg.price}<small>{pkg.suffix}</small></div>
          {pkg.setup && <p className={s.setup}>{pkg.setup}</p>}<p className={s.packageDetail}>{pkg.detail}</p>
          <p className={s.included}>Your scope includes:</p><ul>{pkg.items.map(item => <li key={item}>{item}</li>)}</ul><p className={s.timing}>{pkg.timing}</p>
          <a href={`?offer=${pkg.id}#audit`} className={s.packageButton} data-track="offer_click" data-location={pkg.id}>{pkg.cta}<span aria-hidden="true">↗</span></a>
        </article>)}</div>
        <div className={s.priceNotes}><p><strong>Know the total before you commit.</strong> Ads, hosting, domains, and paid tools are separate. Larger scopes are quoted before work starts.</p><p><strong>Keep ownership and flexibility.</strong> No required website retainer. Marketing is month to month with 30 days’ notice. Preview timing starts after access, materials, and deposit.</p></div>
      </div></section>
      <section className={s.caseSection} id="work"><div className={s.container}>
        <div className={s.sectionHeading}><p className={s.eyebrow}>Work you can inspect / Baryames Cleaners</p><span className={s.smallLabel}>Copy · Design · Development</span></div>
        <div className={s.caseIntro}><h2>A familiar local name.<br /><em>A clearer customer path.</em></h2><p>I handle website and marketing work for my family’s dry cleaning business. The site gives customers a clear reason to choose pickup and an easier way to start.</p></div>
        <ProjectExplorer />
        <div className={s.caseNotes}><p className={s.caseRole}><strong>My role</strong>Website copy, design, development, and ongoing marketing. This is a family-business engagement.</p><div><h3>Make the offer easy to understand.</h3><p>The pickup benefit, service details, and practical questions sit close to the signup path.</p></div><div><h3>Give each service a clear next step.</h3><p>Focused pages help customers find the right service, get answers, and take action on mobile or desktop.</p></div></div>
        <div className={s.proofFooter}><a className={s.textLink} href="https://baryamescleaners.com/" target="_blank" rel="noopener noreferrer" data-track="project_click" data-location="case_study">Explore the live website <span aria-hidden="true">↗</span></a><p>Shown as evidence of my work. No revenue increase is claimed.</p></div>
      </div></section>
      <section className={s.valueSection}><div className={`${s.container} ${s.valueGrid}`}>
        <div><p className={s.eyebrow}>A connected approach</p><h2>From the first click<br /><em>to a real conversation.</em></h2><p className={s.sectionIntro}>A useful marketing system connects the message, the page, and what happens after someone gets in touch.</p></div>
        <div className={s.valueList}><div><span>01</span><div><h3>Reach the right people.</h3><p>Focus your message on a specific service and the customers who need it. For ads, start with relevant searches in your market.</p></div></div><div><span>02</span><div><h3>Give them a reason to act.</h3><p>Use clear copy, real proof, and an easy contact path. Make the next step work on a phone.</p></div></div><div><span>03</span><div><h3>Learn from actual inquiries.</h3><p>Review lead quality with you and use that feedback to improve the campaign. Track booked work when your records support it.</p></div></div></div>
      </div></section>
      <section className={s.aboutSection} id="about"><div className={`${s.container} ${s.aboutGrid}`}>
        <div className={s.portrait}><Image src="/portfolio/chuck-portrait-enhanced.png" alt="Chuck Baryames, independent website and marketing specialist" width={768} height={768} sizes="(max-width: 760px) 80vw, 370px" /><span>Based in Lansing. Available for projects across the U.S.</span></div>
        <div className={s.aboutCopy}><p className={s.eyebrow}>Direct access to the person doing the work</p><h2>Hi, I’m Chuck.<br /><em>I stay close to the business.</em></h2><p>Working inside Baryames Cleaners has taught me to think beyond the website: what customers need to know, how the service works, and how inquiries get handled.</p><p>I bring that practical approach to your project. I use AI to help with research, writing, code, and analysis, then personally review and test the work. You get a clear scope and a direct line to me.</p><a href="#audit" className={s.textLink} data-track="project_cta" data-location="about">Tell me about your business <span aria-hidden="true">↗</span></a></div>
      </div></section>
      <section className={s.processSection} id="process"><div className={s.container}><div className={s.processHeading}><p className={s.eyebrow}>How we work together</p><h2>A clear plan.<br /><em>Then useful work.</em></h2></div><ol className={s.steps}>
        <li><span>01 / Check the fit</span><h3>Tell me the goal.</h3><p>Share your service, budget, and timing. I review the inquiry and aim to reply within two business days.</p></li>
        <li><span>02 / Agree on the scope</span><h3>Know what you’re buying.</h3><p>If we’re a fit, we confirm the deliverables, price, access, and timeline in writing before you pay.</p></li>
        <li><span>03 / Launch and learn</span><h3>Put the work to use.</h3><p>Review a preview, refine it, and launch. With ongoing marketing, we review performance and lead quality each month.</p></li>
      </ol></div></section>
      <section className={s.faqSection} id="faq"><div className={`${s.container} ${s.faqLayout}`}><div><p className={s.eyebrow}>Before you decide</p><h2>Good questions.<br /><em>Straight answers.</em></h2></div><div className={s.questions}>{questions.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
      </>}
      <section className={s.contactSection} id="audit"><div className={`${s.container} ${s.contactGrid}`}>
        <div className={s.contactCopy}><p className={s.eyebrow}>Let’s see if we’re a fit</p>{inquiryOnly ? <h1>Tell me what<br />you want to <em>improve.</em></h1> : <h2>Tell me what<br />you want to <em>improve.</em></h2>}<p>A few details help me recommend a useful scope and tell you whether I can help.</p><div className={s.contactExpectations}><strong>What happens next</strong><p>I review your inquiry personally, then reply with questions or a suggested next step. We agree on the project before any payment.</p></div><p>Projects from $1,250. Marketing from $750/month plus $1,000 setup and separate ad spend.</p><a href="mailto:chuck@chuckbaryames.com?subject=Project%20inquiry" className={s.contactEmail} data-track="email_click" data-location="contact">Prefer email? Write to Chuck <span aria-hidden="true">↗</span></a></div>
        <div className={s.formShell}><AuditLeadForm initialService={initialService} /></div>
      </div></section>
    </main>
    <footer className={s.footer}><div className={s.container}><a href="/" className={s.wordmark}>chuck baryames<span>.</span></a><p>Clear websites. Focused marketing. Direct accountability.</p><a href="#main-content">Back to top ↑</a></div><div className={`${s.container} ${s.legal}`}><span>© 2026 Chuck Baryames</span><span>Lansing, Michigan · Independent website & marketing services</span></div></footer>
    {!inquiryOnly && <div className={`sticky-mobile-cta ${s.mobileCta}`}><a href="#audit" data-track="project_cta" data-location="mobile_sticky">Discuss a project <span aria-hidden="true">↗</span></a></div>}
    <HomeInteractions />
  </div>;
}
