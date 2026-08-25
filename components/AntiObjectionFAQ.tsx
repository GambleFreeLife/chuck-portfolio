const faqs = [
  {
    category: "growth",
    question: "What do you actually do for a local business?",
    answer:
      "I start by finding the bottleneck. That may be a weak service page, unclear calls-to-action, poor local-search targeting, broken analytics, wasted paid-search traffic, or a gap between the ad and the landing page. I recommend the smallest useful fix first instead of forcing every business into the same package.",
  },
  {
    category: "growth",
    question: "Who am I actually hiring?",
    answer:
      "You are hiring me directly. I handle digital growth work for Baryames Cleaners, my family's business, open in Greater Lansing since 1922 and operating 11 locations. I work across websites, local SEO, Google Ads, analytics, email, and brand content there, so the recommendations come from operating inside a real local business rather than from a template.",
  },
  {
    category: "growth",
    question: "Do I need to get on a sales call?",
    answer:
      "No. Send your website URL and I will reply with the three highest-impact issues I see. If the right next step is obvious, I can quote a fixed-price project from there. We can use a call later if the scope genuinely needs one.",
  },
  {
    category: "growth",
    question: "Can you work on the website I already have?",
    answer:
      "Yes. The $299 Website Quick Win is specifically designed for improving an existing site instead of forcing a rebuild. I work with WordPress and can also build focused Next.js landing pages when a separate page makes more sense.",
  },
  {
    category: "growth",
    question: "How do you prove the work is helping?",
    answer:
      "I separate what can be measured from what cannot. I use Search Console, GA4, Tag Manager, ad-platform data, calls, forms, appointments, and other customer actions where the tracking supports it. I do not claim revenue attribution that the data cannot actually prove.",
  },
  {
    category: "video",
    question: "Who am I actually hiring?",
    answer:
      "I run marketing for Baryames Cleaners, my family business, open in Greater Lansing since 1922 and operating 11 locations. Websites, local SEO, Google Ads, conversion tracking, email, and video are all part of the work I handle there. That is a real business with real payroll, not a portfolio project.",
  },
  {
    category: "video",
    question: "Do you only do video?",
    answer:
      "No. Video is one part of the work. I also handle websites, local SEO, Google Ads, and conversion tracking. If you are not sure which part is the problem, send your URL and I will tell you what I would fix first before you spend anything.",
  },
  {
    category: "video",
    question: "Can't I just use Canva or HeyGen for free?",
    answer:
      "You can, and for some businesses that is enough. I am useful when you want the script, timing, motion, captions, and delivery handled as one narrow production system instead of learning the tools yourself.",
  },
  {
    category: "video",
    question: "What if I do not have a script?",
    answer:
      "The brief takes a few minutes. I write the script from your answers and send it for approval before I render anything, so you do not need to arrive with copy ready.",
  },
  {
    category: "video",
    question: "Does this work for service businesses, not just products?",
    answer:
      "Yes. The video can frame a service problem, explain the process, show proof, and point to one next action without needing a physical product demo.",
  },
  {
    category: "landing",
    question: "What happens if I don't love the page?",
    answer:
      "First, I use the three revision rounds to get it closer to the brief, because the goal is to make the page work. If it still genuinely does not fit what you asked for and you give clear reasons, I refund the $50 deposit and you have no obligation to pay the balance. If you stop responding for more than 7 days without feedback, the deposit stays non-refundable because the build slot and work were already spent.",
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
      "This is a productized service with a defined scope, so I can keep the process lean. The tradeoff is that the scope stays focused instead of turning into an open-ended agency engagement.",
  },
  {
    category: "landing",
    question: "Have you done this before?",
    answer:
      "Yes. Baryames Cleaners is a real local-service business where I work on website and conversion improvements. The portfolio also includes focused landing-page and concept work so you can judge the page structure, copy, and visual execution before you hire me.",
  },
] as const;

type FAQFocus = "growth" | "video" | "landing";

const sectionCopy = {
  growth: {
    label: "Before you hire me",
    title: "A few things I would want to know too.",
  },
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
  "Who am I actually hiring?",
  "What do you actually do for a local business?",
  "What if you miss the 48-hour deadline?",
  "Why a deposit at all if I haven't seen the page?",
  "Have you done this before?",
]);

export function AntiObjectionFAQ({ focus = "growth" }: { focus?: FAQFocus }) {
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
