import Link from "next/link";

type CrossServiceCTAProps = {
  eyebrow: string;
  headline: string;
  body: string;
  href: string;
  cta: string;
};

export function CrossServiceCTA({ eyebrow, headline, body, href, cta }: CrossServiceCTAProps) {
  return (
    <section className="cross-service-section">
      <div className="wrap">
        <div className="cross-service-box tilt-card">
          <div>
            <div className="sec-label">{eyebrow}</div>
            <h2>{headline}</h2>
            <p>{body}</p>
          </div>
          <Link href={href} className="cross-service-link">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
