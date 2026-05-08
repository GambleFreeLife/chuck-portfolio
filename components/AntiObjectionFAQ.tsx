const faqs = [
  {
    question: "What happens if I don't love the page?",
    answer:
      "First, I use the three revision rounds to get it closer to the brief, because the goal is to make the page work. If it still genuinely does not fit what you asked for and you give clear reasons, I refund the $50 deposit and you have no obligation to pay the balance. If you stop responding for more than 7 days without feedback, the deposit stays non-refundable because the build slot and work were already spent. Otherwise, three revision rounds and an honest look at the page give us plenty of room to land it.",
  },
  {
    question: "What if you miss the 48-hour deadline?",
    answer:
      "If I miss the 48-hour deadline, I refund the $50 deposit automatically, and you can decide whether you still want me to finish the build.",
  },
  {
    question: "Why a deposit at all if I haven't seen the page?",
    answer:
      "The deposit filters out tire-kickers and holds a real build slot, but it does not ask you to trust me with the full project before you see the page. That $50 is the only commitment to start.",
  },
  {
    question: "What if I want changes after seeing the first version?",
    answer:
      "You get three revision rounds after the first version, so we can tighten the copy, layout, offer details, and fit before the page is considered done.",
  },
  {
    question: "Why aren't you charging more?",
    answer:
      "This is a productized service with a defined scope, so I can keep it lean. Agencies charge $5k because they carry bigger teams, longer processes, and more overhead than this build needs.",
  },
  {
    question: "Have you done this before?",
    answer:
      "Yes, both as past client work and as portfolio builds you can see in the work section below. Baryames Cleaners is a real local-service landing page built around a single conversion path. The Eby Dental concept is a redesign showing how a healthcare practice page can rebuild trust above the fold. The 48-hour build process is the same one I am offering you here.",
  },
] as const;

export function AntiObjectionFAQ() {
  return (
    <section id="faq" className="faq-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Fair questions</div>
          <h2 className="sec-title">Here is how the build-first offer works.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
