const cases = [
  {
    href: "https://baryames-landing.vercel.app",
    badge: "View project",
    badgeTone: "gold",
    previewClass: "case-preview-baryames",
    eyebrow: "Local business, dry cleaning",
    title: "Baryames Cleaners Landing Page",
    description:
      "A focused local-service landing page built around one high-value action: getting more pickup and delivery requests.",
    previewTitle: "Baryames",
    previewSubtitle: "Cleaners",
    previewMeta: "Est. 1922, Greater Lansing",
    details: [
      {
        label: "Problem",
        text: "Too many services and locations can make the next step feel scattered.",
      },
      {
        label: "Fix",
        text: "Lead with pickup and delivery, trust proof, simple steps, and a direct request form.",
      },
      {
        label: "Conversion path",
        text: "Trust the business, understand the offer, schedule a free pickup.",
      },
    ],
    tags: ["Pickup booking form", "Trust architecture", "Mobile responsive"],
  },
  {
    href: "https://eby-dental-landing.vercel.app",
    badge: "Concept",
    badgeTone: "teal",
    previewClass: "case-preview-eby",
    eyebrow: "Concept redesign, dental practice",
    title: "Eby Dental Care Concept Redesign",
    description:
      "A concept redesign showing how a healthcare service page can build trust and make appointment requests feel easier.",
    previewTitle: "Eby Dental Care",
    previewSubtitle: "Healthcare landing page",
    previewMeta: "Okemos, Michigan, since 2003",
    details: [
      {
        label: "Problem",
        text: "Healthcare visitors need reassurance before they book, especially if the site feels unfinished.",
      },
      {
        label: "Fix",
        text: "Use credentials, patient-centered copy, reviews, services, and appointment CTA above the fold.",
      },
      {
        label: "Conversion path",
        text: "Feel understood, trust the provider, request an appointment.",
      },
    ],
    tags: ["Appointment booking", "Google Maps", "Social proof"],
  },
] as const;

export function Portfolio() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="section-center">
          <div className="sec-label">Portfolio</div>
          <h2 className="sec-title">Conversion-focused redesign examples</h2>
          <p className="sec-sub section-sub-center">
            Examples of how unclear, outdated, or unfinished business websites can be turned into
            pages built for calls, bookings, and inquiries.
          </p>
        </div>
        <div className="case-grid">
          {cases.map((project) => (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="case-card tilt-card"
              key={project.href}
            >
              <div className="case-preview-wrap">
                <div className={`case-preview ${project.previewClass}`}>
                  <div className={`case-badge ${project.badgeTone}`}>{project.badge}</div>
                  <div className="case-preview-title">{project.previewTitle}</div>
                  <div className="case-preview-subtitle">{project.previewSubtitle}</div>
                  <div className="case-preview-meta">{project.previewMeta}</div>
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
