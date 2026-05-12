const skills = [
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
] as const;

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-text">
            <div className="sec-label">About</div>
            <h2 className="sec-title">Chuck Baryames</h2>
            <p>
              I grew up around a family business, so I know what it feels like when the work is
              good but the website does not make that obvious fast enough. Before I started
              building pages, I worked in insurance and learned how quickly people lose trust when
              the next step feels confusing.
            </p>
            <p>
              I am a self-taught builder, which means I learned by shipping real pages, breaking
              things, fixing them, and getting faster each time. That is also why this offer is
              built around a 48-hour preview instead of a long agency process.
            </p>
            <p>
              I do the copy, design, and Next.js build myself, so there is no handoff between the
              person thinking through the offer and the person building the page. You send the
              brief, I build the first version, and then we use the three revision rounds to make it
              match what you actually need.
            </p>
            <p>
              I started building these videos because Codex made high-quality motion design 50
              times cheaper than hiring an editor. That is why these prices are real and not bait.
              The same shift that lets me deliver a $97 video in 48 hours is the reason agencies
              can no longer justify $2,000 for the same output.
            </p>
            <div className="skill-tags">
              {skills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="about-stats-grid">
              <div className="about-stat tilt-card">
                <div className="n">48hr</div>
                <div className="l">Preview delivery</div>
              </div>
              <div className="about-stat tilt-card">
                <div className="n">$50</div>
                <div className="l">Commitment to start</div>
              </div>
              <div className="about-stat tilt-card">
                <div className="n">3</div>
                <div className="l">Revision rounds</div>
              </div>
              <div className="about-stat tilt-card">
                <div className="n">24hr</div>
                <div className="l">Domain deployment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
