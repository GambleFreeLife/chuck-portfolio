type AboutFocus = "video" | "landing";

const aboutContent = {
  video: {
    paragraphs: [
      "I started building these videos because Codex made high-quality motion design 50 times cheaper than hiring an editor. That is why these prices are real and not bait.",
      "The production system uses Remotion, Next.js, Codex, and Vercel, so each video is rendered from code instead of dragged around by hand. That keeps the timing precise and the turnaround fast.",
      "I grew up around a family business, and I know how hard it is to make good work obvious in the first few seconds. The video does that job before a buyer ever reads the rest of the page.",
    ],
    skills: [
      "Remotion",
      "Kinetic type",
      "Brand videos",
      "Video scripting",
      "Codex",
      "Next.js",
      "Vercel",
      "LinkedIn content",
      "Social captions",
      "Service businesses",
      "Motion systems",
      "Fast delivery",
    ],
    stats: [
      { value: "$97", label: "Single video" },
      { value: "48hr", label: "Preview delivery" },
      { value: "2", label: "Revision rounds" },
      { value: "3", label: "Social formats" },
    ],
  },
  landing: {
    paragraphs: [
      "I grew up around a family business, so I know what it feels like when the work is good but the website does not make that obvious fast enough. Before I started building pages, I worked in insurance and learned how quickly people lose trust when the next step feels confusing.",
      "I am a self-taught builder, which means I learned by shipping real pages, breaking things, fixing them, and getting faster each time. That is also why this offer is built around a 48-hour preview instead of a long agency process.",
      "I do the copy, design, and Next.js build myself, so there is no handoff between the person thinking through the offer and the person building the page. You send the brief, I build the first version, and then we use the three revision rounds to make it match what you actually need.",
    ],
    skills: [
      "Landing pages",
      "React / Next.js",
      "Web design",
      "Conversion copywriting",
      "JavaScript",
      "SEO",
      "Service businesses",
      "Lead capture",
      "Vercel",
      "Mobile responsive",
      "Brand identity",
      "Figma",
    ],
    stats: [
      { value: "48hr", label: "Preview delivery" },
      { value: "$50", label: "Commitment to start" },
      { value: "3", label: "Revision rounds" },
      { value: "24hr", label: "Domain deployment" },
    ],
  },
} as const;

export function About({ focus = "video" }: { focus?: AboutFocus }) {
  const content = aboutContent[focus];

  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-text">
            <div className="sec-label">About</div>
            <h2 className="sec-title">Chuck Baryames</h2>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="skill-tags">
              {content.skills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="about-stats-grid">
              {content.stats.map((stat) => (
                <div className="about-stat tilt-card" key={stat.label}>
                  <div className="n">{stat.value}</div>
                  <div className="l">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
