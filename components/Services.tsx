const services = [
  { title: "The offer is hard to understand", text: "I clarify what you do, who you help, and why someone should contact you, then place that information where visitors will see it." },
  { title: "Contacting you takes too much effort", text: "I review buttons, forms, and mobile layouts so customers have a straightforward way to call or request a quote." },
  { title: "You cannot tell what is working", text: "I review the tracking you have and identify what can measure real inquiries. Analytics or integration work gets a separate scope when needed." },
];
export function Services() {
 return <section id="services" className="services-section"><div className="wrap"><div className="growth-proof-heading"><div><div className="sec-label">Where I can help</div><h2 className="sec-title">Fix the friction between interest and inquiry.</h2></div><p className="sec-sub">A good fit for local service businesses with an existing website and a specific page that needs work. If traffic is the bigger issue, I will say so.</p></div><div className="services-grid problem-grid">{services.map((item,i) => <article className="service-card" key={item.title}><div className="service-index">0{i+1}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>;
}
