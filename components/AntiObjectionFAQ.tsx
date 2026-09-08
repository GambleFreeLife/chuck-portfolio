const faqs = [
  { category: "growth", question: "Do I need a new website?", answer: "Often the useful first step is a small change to your existing site. The $299 Quick Win covers up to three agreed edits on one page. If your platform or the requested changes need a different approach, I will explain that before quoting." },
  { category: "growth", question: "What happens after the free review?", answer: "You get three specific observations by email. You can use them yourself or ask for a fixed-price scope. There is no required call or ongoing contract." },
  { category: "growth", question: "Who am I actually hiring?", answer: "Chuck Baryames. I handle the work myself, including copy, design, and implementation. Baryames Cleaners is my family's business, and I also work with Soup Spoon Cafe on catering marketing." },
  { category: "growth", question: "Do you guarantee more customers?", answer: "No. Results depend on traffic, demand, your offer, and how inquiries are handled. I commit to the agreed work and help identify what can be measured. Where the data supports it, we compare qualified inquiries and bookings before and after the changes." },
  { category: "growth", question: "What if my website gets very little traffic?", answer: "Then a redesign alone may not be the right next step. I will check the page for obvious obstacles and explain if reaching more relevant people should be the priority. Traffic data requires access to your analytics; a public website review cannot establish visitor counts." },
  { category: "growth", question: "What access and extra costs should I expect?", answer: "A free review needs only your public URL. For paid work, I will specify the website access needed and confirm the scope in writing. Hosting, domains, paid tools, and new integrations are separate costs when needed. Please do not send passwords through this form." },
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
      "Yes. Baryames Cleaners is a real local-service business where I work on website and conversion improvements. I also built and launched Bet on Recovery as a full-stack web product, so you can inspect both real business work and a live product before you hire me.",
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
