const faqs = [
  {
    category: "video",
    question: "Can't I just use Canva or HeyGen for free?",
    answer:
      "Canva makes templates. HeyGen makes AI avatars. Neither is purpose-built for the kinetic type, frame-perfect timing, and 48-hour iteration cycle that makes a video stop the LinkedIn scroll. The $97 is what your time is worth doing it yourself.",
  },
  {
    category: "video",
    question: "What if I do not have a script?",
    answer:
      "The brief takes 3 minutes. I write the script from your answers and send it for approval before I render anything. You never have to write copy.",
  },
  {
    category: "video",
    question: "Does this work for service businesses, not just products?",
    answer:
      "Yes. Most of the showcase examples are service businesses. The video frames the transformation you offer, not the product specs.",
  },
  {
    category: "landing",
    question: "What happens if I don't love the page?",
    answer:
      "First, I use the three revision rounds to get it closer to the brief, because the goal is to make the page work. If it still genuinely does not fit what you asked for and you give clear reasons, I refund the $50 deposit and you have no obligation to pay the balance. If you stop responding for more than 7 days without feedback, the deposit stays non-refundable because the build slot and work were already spent. Otherwise, three revision rounds and an honest look at the page give us plenty of room to land it.",
  },
  {
    category: "landing",
    question: "What if you miss the 48-hour deadline?",
    answer:
      "If I miss the 48-hour deadline, I refund the $50 deposit automatically, and you can decide whether you still want me to finish the build.",
  },
  {
    category: "landing",
    question: "Why a deposit at all if I haven't seen the page?",
    answer:
      "The deposit filters out tire-kickers and holds a real build slot, but it does not ask you to trust me with the full project before you see the page. That $50 is the only commitment to start.",
  },
  {
    category: "landing",
    question: "What if I want changes after seeing the first version?",
    answer:
      "You get three revision rounds after the first version, so we can tighten the copy, layout, offer details, and fit before the page is considered done.",
  },
  {
    category: "landing",
    question: "Why aren't you charging more?",
    answer:
      "This is a productized service with a defined scope, so I can keep it lean. Agencies charge $5k because they carry bigger teams, longer processes, and more overhead than this build needs.",
  },
  {
    category: "landing",
    question: "Have you done this before?",
    answer:
      "Yes, both as past client work and as portfolio builds you can see in the work section below. Baryames Cleaners is a real local-service landing page built around a single conversion path. The Eby Dental concept is a redesign showing how a healthcare practice page can rebuild trust above the fold. The 48-hour build process is the same one I am offering you here.",
  },
] as const;

type FAQFocus = "video" | "landing";

const sectionCopy = {
  video: {
    label: "Fair questions",
    title: "What you need to know before you order.",
  },
  landing: {
    label: "Fair questions",
    title: "Here is how the build-first landing page offer works.",
  },
} as const;

const openByDefault = new Set([
  "What if you miss the 48-hour deadline?",
  "Why a deposit at all if I haven't seen the page?",
  "Have you done this before?",
]);

export function AntiObjectionFAQ({ focus = "video" }: { focus?: FAQFocus }) {
  const visibleFaqs = faqs.filter((faq) => faq.category === focus);
  const copy = sectionCopy[focus];

  return (
    <section id="faq" className="faq-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">{copy.label}</div>
          <h2 className="sec-title">{copy.title}</h2>
        </div>
        <div className="faq-grid">
          {visibleFaqs.map((faq) => (
            <details className="faq-item" key={faq.question} open={openByDefault.has(faq.question)}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
