import { LiveSitePreview } from "@/components/LiveSitePreview";

type PortfolioCase = {
  href: string;
  badge: string;
  badgeTone: "gold" | "teal";
  eyebrow: string;
  title: string;
  description: string;
  details: Array<{
    label: string;
    text: string;
  }>;
  tags: string[];
};

const cases: PortfolioCase[] = [
  {
    href: "https://baryamescleaners.com",
    badge: "Live business",
    badgeTone: "gold",
    eyebrow: "Operating local business, 11 locations",
    title: "Baryames Cleaners Website Redesign & Growth",
    description:
      "A full website redesign plus ongoing SEO, paid search, analytics, email, and conversion work for a family business serving Greater Lansing since 1922.",
    details: [
      {
        label: "Website",
        text: "Rebuilt the customer journey around clearer service paths, mobile usability, trust proof, and stronger next actions.",
      },
      {
        label: "Growth",
        text: "Connected the site to local SEO, Search Console, Google Ads, GA4, Tag Manager, email, and Google Business Profile work.",
      },
      {
        label: "Proof",
        text: "The live site serves 11 locations and publicly credits the website redesign and development to Chuck Baryames.",
      },
    ],
    tags: ["WordPress", "Local SEO", "Google Ads", "Analytics"],
  },
  {
    href: "https://betonrecovery.org",
    badge: "Live product",
    badgeTone: "teal",
    eyebrow: "Solo-built full-stack product",
    title: "Bet on Recovery Product Design & Development",
    description:
      "A live web product I designed, developed, and launched from concept to production, proving I can execute beyond a marketing mockup.",
    details: [
      {
        label: "Product",
        text: "Private assessment, user accounts, educational content, and a structured path from first visit into the app.",
      },
      {
        label: "Engineering",
        text: "Built with Next.js, Supabase, Stripe, and Vercel, including subscription billing and automated email workflows.",
      },
      {
        label: "Execution",
        text: "Strategy, interface design, development, deployment, analytics, and ongoing iteration all live in one working product.",
      },
    ],
    tags: ["Next.js", "Supabase", "Stripe", "Vercel"],
  },
];

type PortfolioFocus = "video" | "landing";

const sectionCopy = {
  video: {
    label: "Portfolio",
    title: "Video examples built with the same production system",
    sub: "The examples below show how the motion, timing, copy, and render pipeline come together for short brand videos.",
  },
  landing: {
    label: "Portfolio",
    title: "Landing pages built around one clear conversion path",
    sub: "The proof below comes from live work, not concept mockups. Baryames shows local-business execution, and Bet on Recovery shows full-stack product execution.",
  },
} as const;

export function Portfolio({ focus = "landing" }: { focus?: PortfolioFocus }) {
  const copy = sectionCopy[focus];

  return (
    <section id="work" className="landing-proof-section">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">{copy.label}</div>
          <h2 className="sec-title">{copy.title}</h2>
          <p className="sec-sub section-sub-center">{copy.sub}</p>
        </div>
        <div className="case-grid live-case-grid">
          {cases.map((project) => (
            <article className="case-card live-case-card" key={project.title}>
              <div className="case-preview-wrap">
                <div className={`case-badge ${project.badgeTone}`}>{project.badge}</div>
                <LiveSitePreview url={project.href} label={project.title} />
              </div>
              <div className="case-body">
                <div className="case-eyebrow">{project.eyebrow}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="case-details">
                  {project.details.map((detail) => (
                    <div className="case-detail" key={detail.label}>
                      <strong>{detail.label}</strong>
                      <span>{detail.text}</span>
                    </div>
                  ))}
                </div>
                <div className="case-card-footer">
                  <div className="case-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" className="case-live-link">
                    Inspect live work ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
