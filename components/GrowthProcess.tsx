const steps = [
 { label: "Get a useful review", description: "Send your website. I will email three specific observations and what I would fix first, aiming to reply within two business days." },
 { label: "Choose a clear scope", description: "If you want help, we agree on the exact changes, price, access needed, and delivery date before paid work begins." },
 { label: "Review the work", description: "I implement the changes, check the agreed customer path, and show you what changed. We identify which business results you can track next." },
];
export function GrowthProcess() { return <section id="process" className="growth-process-section"><div className="wrap"><div className="section-center"><div className="sec-label">How it works</div><h2 className="sec-title">You talk to the person doing the work.</h2></div><ol className="process-grid growth-process-grid">{steps.map((step,i) => <li className="process-step" key={step.label}><div className="process-number">{i+1}</div><h3>{step.label}</h3><p>{step.description}</p></li>)}</ol></div></section>; }
