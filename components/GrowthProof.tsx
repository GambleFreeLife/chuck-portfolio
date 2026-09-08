import { LiveSitePreview } from "@/components/LiveSitePreview";

const changes = [
  { number: "01", title: "Explain the offer", text: "Customers see what pickup includes, how it works, and whether there is a delivery fee before being asked to sign up." },
  { number: "02", title: "Make the next step obvious", text: "Pickup buttons lead directly to the customer signup page. Service links give visitors another clear path when they need more detail." },
  { number: "03", title: "Answer the practical questions", text: "Pricing, service information, local reviews, and FAQs help customers decide whether the service fits their needs." },
];
export function GrowthProof() {
  return (
    <section id="work" className="growth-proof-section">
      <div className="wrap">
        <div className="growth-proof-heading"><div><div className="sec-label">Selected work</div><h2 className="sec-title">A real business. A clearer customer journey.</h2></div><p className="sec-sub">I work on Baryames Cleaners’ website and marketing. It is my family’s business, serving Greater Lansing since 1922.</p></div>
        <article className="featured-case-study premium-case-study">
          <div className="featured-case-visual"><LiveSitePreview url="https://baryamescleaners.com/services/wash-fold/" label="Baryames Cleaners Wash & Fold service page" /><div className="proof-source-row"><span>Service-page screenshot · September 8, 2026</span></div></div>
          <div className="featured-case-copy"><div className="case-study-kicker">BARYAMES CLEANERS · WEBSITE & MARKETING</div><h3 className="case-study-title">Help visitors understand the service and request pickup.</h3><p>I rebuilt service pages and the homepage around the questions a customer needs answered: what it costs, how pickup works, and how to get started.</p><div className="case-study-outcome-list"><div><strong>My role</strong><span>Page design, copy, WordPress implementation, and ongoing marketing work.</span></div><div><strong>What you can inspect</strong><span>The live service pages, signup links, FAQs, and website credit.</span></div></div><a className="case-study-link" href="https://baryamescleaners.com/services/wash-fold/" target="_blank" rel="noopener noreferrer" data-track="project_click" data-location="baryames_case">Explore the service page ↗</a></div>
        </article>
        <div className="proof-system-grid">{changes.map(item => <article className="proof-system-card" key={item.number}><div className="proof-system-number">{item.number}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="proof-measurement"><strong>What counts as a result?</strong><p>The pages show the work I delivered. To evaluate business results, I look for qualified inquiries, confirmed bookings, and paid orders where tracking allows. An ad click or a signup-button click alone does not prove a new customer.</p></div>
        <details className="additional-work"><summary>More work: Bet on Recovery, a web product I built</summary><div className="secondary-proof-project"><div className="secondary-proof-copy"><div className="case-study-kicker">INDEPENDENT PROJECT</div><h3 className="secondary-proof-title">From the first visit to an interactive assessment.</h3><p>I designed and developed Bet on Recovery, including its public website and assessment experience. This is an example of my product-building work.</p><a href="https://betonrecovery.org/" className="case-study-link" target="_blank" rel="noopener noreferrer">Explore the product ↗</a></div><div className="secondary-proof-visual"><LiveSitePreview url="https://betonrecovery.org/" label="Bet on Recovery project" /></div></div></details>
      </div>
    </section>
  );
}
