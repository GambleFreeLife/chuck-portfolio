import Image from "next/image";

type AboutFocus = "growth" | "video" | "landing";

const aboutContent = {
  growth: {
    paragraphs: [
      "I run digital marketing work for Baryames Cleaners, my family's business. It has been open in Greater Lansing since 1922 and operates 11 locations. That is where I learned to care less about marketing jargon and more about whether people call, book, visit, and come back.",
      "My work crosses WordPress, local SEO, Google Ads, Search Console, GA4, Tag Manager, email, landing pages, and brand content. That range matters because the problem is rarely isolated to one tool. A strong ad can still fail on a weak page, and a strong page is hard to improve if the tracking is broken.",
      "I use AI heavily behind the scenes to research, build, test, and move faster, but I do not sell AI as the outcome. You are hiring me to find the business problem, implement the fix, and make the result easier to measure.",
    ],
    skills: [
      "WordPress",
      "Local SEO",
      "Google Ads",
      "GA4 / Tag Manager",
      "Google Search Console",
      "Landing pages",
      "Conversion copywriting",
      "Google Business Profile",
      "Email marketing",
      "Brand video",
      "React / Next.js",
      "Service businesses",
    ],
    stats: [
      { value: "1922", label: "Family business since" },
      { value: "11", label: "Locations" },
      { value: "7.2%", label: "Search CTR example" },
      { value: "$299", label: "Quick Win" },
    ],
  },
  video: {
    paragraphs: [
      "I run marketing for Baryames Cleaners, my family's business. It has been open in Greater Lansing since 1922 and operates 11 locations. That is where I learned this work, on a real business with real payroll, where being wrong costs money.",
      "Video is one part of that job. A local business gets only a few seconds to make its work clear, and a tight 30-second video can do that before someone reads the rest of the page.",
      "I write the script, build the video, and deliver it. There is no handoff between the person thinking about your offer and the person making the thing, which keeps the process narrow and the turnaround fast.",
    ],
    skills: [
      "Brand video",
      "Kinetic type",
      "Video scripting",
      "Social captions",
      "Landing pages",
      "Local SEO",
      "Google Ads",
      "Conversion tracking",
      "Next.js",
      "WordPress",
      "Service businesses",
      "Fast delivery",
    ],
    stats: [
      { value: "1922", label: "Family business since" },
      { value: "11", label: "Locations" },
      { value: "48hr", label: "Preview delivery" },
      { value: "$97", label: "Single video" },
    ],
  },
  landing: {
    paragraphs: [
      "I run marketing for Baryames Cleaners, my family's business. It has been open in Greater Lansing since 1922 and operates 11 locations. Websites, local SEO, Google Ads, conversion tracking, and email are all part of the work I handle there.",
      "That changes how I build pages. I do not stop at whether the design looks polished. I care about whether the offer is clear, whether the next step is obvious, and whether the page can be measured after it launches.",
      "I do the copy, design, and Next.js build myself. You send the brief, I build the first version and put it on a preview URL, and the revision rounds are there to make it match what you actually meant.",
    ],
    skills: [
      "Landing pages",
      "Conversion copywriting",
      "React / Next.js",
      "WordPress",
      "Local SEO",
      "Google Ads",
      "GA4 / Tag Manager",
      "Google Business Profile",
      "Lead capture",
      "Mobile responsive",
      "Brand video",
      "Service businesses",
    ],
    stats: [
      { value: "1922", label: "Family business since" },
      { value: "11", label: "Locations" },
      { value: "48hr", label: "Preview delivery" },
      { value: "$50", label: "Commitment to start" },
    ],
  },
} as const;

export function About({ focus = "growth" }: { focus?: AboutFocus }) {
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
          <div className="about-proof-column">
            <div className="about-photo-card">
              <Image
                src="/mypic.jpg"
                alt="Chuck Baryames"
                width={256}
                height={256}
                className="about-photo"
                sizes="160px"
              />
              <div>
                <strong>Operator first</strong>
                <span>I build, implement, and measure the work myself.</span>
              </div>
            </div>
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
