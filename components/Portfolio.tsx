import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

type PortfolioCase = {
  category: "video" | "landing";
  href: string;
  badge: string;
  badgeTone: "gold" | "teal" | "coral";
  imageSrc?: string;
  imageAlt: string;
  videoSrc?: string;
  posterSrc?: string;
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
    category: "landing",
    href: "https://baryamescleaners.com",
    badge: "Live business",
    badgeTone: "gold",
    imageSrc: "/portfolio/baryames-current-homepage.jpg",
    imageAlt: "Current Baryames Cleaners homepage redesign preview",
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
    category: "landing",
    href: "https://betonrecovery.org",
    badge: "Live product",
    badgeTone: "teal",
    imageSrc: "/portfolio/bet-on-recovery-current.jpg",
    imageAlt: "Bet on Recovery full-stack product preview",
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
        label: "Content system",
        text: "The live site now supports a large search-focused resource library alongside the core product experience.",
      },
    ],
    tags: ["Next.js", "Supabase", "Stripe", "Vercel"],
  },
  {
    category: "video",
    href: "/order-video?plan=single",
    badge: "Real campaign",
    badgeTone: "gold",
    videoSrc: "/portfolio/baryames-wash-fold-horizontal",
    posterSrc: "/portfolio/baryames-wash-fold-poster.jpg",
    imageAlt: "Baryames Cleaners Wash and Fold in-store brand video",
    eyebrow: "Baryames Cleaners, in-store display",
    title: "Wash & Fold Brand Campaign",
    description:
      "A real 30-second Baryames campaign designed to communicate the service promise clearly on an in-store screen, even when muted.",
    details: [
      {
        label: "Goal",
        text: "Make Wash & Fold easy to understand at a glance while customers are already inside the store.",
      },
      {
        label: "Execution",
        text: "Readable offer hierarchy, brand-consistent motion, and a format built for horizontal digital signage.",
      },
      {
        label: "Reuse",
        text: "The same creative system can be adapted for social, ads, and other screen sizes without rebuilding the campaign from zero.",
      },
    ],
    tags: ["Brand video", "In-store signage", "Motion design"],
  },
  {
    category: "video",
    href: "/order-video?plan=single",
    badge: "Real campaign",
    badgeTone: "teal",
    videoSrc: "/portfolio/baryames-skip-trip-vertical",
    posterSrc: "/portfolio/baryames-skip-trip-poster.jpg",
    imageAlt: "Baryames Cleaners Skip the Trip vertical service campaign",
    eyebrow: "Baryames Cleaners, vertical social",
    title: "Skip the Trip Service Campaign",
    description:
      "A real vertical Baryames service story built around one customer benefit, one simple process, and one next action.",
    details: [
      {
        label: "Goal",
        text: "Turn pickup and delivery from an abstract service into a simple, memorable convenience message.",
      },
      {
        label: "Execution",
        text: "Mobile-first pacing, large readable type, and a benefit-led story designed to work with or without sound.",
      },
      {
        label: "Conversion path",
        text: "Understand the convenience, see the steps, then move toward pickup and delivery signup.",
      },
    ],
    tags: ["Vertical video", "Service marketing", "Conversion copy"],
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
    sub: "These examples show how trust, offer clarity, and a direct next step turn traffic into calls, bookings, and inquiries.",
  },
} as const;

function publicAssetExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function Portfolio({ focus = "video" }: { focus?: PortfolioFocus }) {
  const visibleCases = cases.filter((project) => project.category === focus);
  const copy = sectionCopy[focus];

  return (
    <section id="work">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">{copy.label}</div>
          <h2 className="sec-title">{copy.title}</h2>
          <p className="sec-sub section-sub-center">{copy.sub}</p>
        </div>
        <div className="case-grid">
          {visibleCases.map((project) => (
            <a
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              className="case-card tilt-card"
              key={project.title}
            >
              <div className="case-preview-wrap">
                <div className="case-preview">
                  <div className={`case-badge ${project.badgeTone}`}>{project.badge}</div>
                  {project.videoSrc && publicAssetExists(`${project.videoSrc}.mp4`) ? (
                    <video
                      className="case-preview-video"
                      aria-label={project.imageAlt}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={project.posterSrc}
                      preload="metadata"
                    >
                      <source src={`${project.videoSrc}.webm`} type="video/webm" />
                      <source src={`${project.videoSrc}.mp4`} type="video/mp4" />
                    </video>
                  ) : project.imageSrc && publicAssetExists(project.imageSrc) ? (
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      width={1280}
                      height={800}
                      className="case-preview-image"
                    />
                  ) : (
                    <div className="case-preview-pending">Screenshot pending</div>
                  )}
                </div>
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
                <div className="case-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
