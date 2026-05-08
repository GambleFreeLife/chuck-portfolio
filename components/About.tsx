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
              I'm a <strong>web developer and conversion designer</strong> focused on one
              practical question: where is your current website losing people who were close to
              contacting you?
            </p>
            <p>
              Every page I build starts with the visitor's next step:{" "}
              <strong>
                call, book, request a quote, submit a form, or trust you enough to keep reading.
              </strong>{" "}
              Then I design the page around that action.
            </p>
            <p>
              I combine <strong>strategy, copywriting, design, and development</strong> into one
              workflow. That means fewer handoffs, faster fixes, and a page that reflects the
              quality of the work your business already does.
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
