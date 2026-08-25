import Link from "next/link";

const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

export function Nav() {
  return (
    <nav aria-label="Primary navigation">
      <div className="wrap">
        <Link href="/" className="nav-name" aria-label="Chuck Baryames home">
          CB
        </Link>
        <div className="nav-links">
          <Link href="/#work" className="nav-primary">
            Work
          </Link>
          <Link href="/#services" className="nav-primary">
            Services
          </Link>
          <Link href="/landing-pages" className="nav-primary nav-secondary-service">
            Landing pages
          </Link>
          <Link href="/#about" className="nav-anchor">
            About
          </Link>
          <a href={auditHref} className="nav-cta">
            Free teardown
          </a>
        </div>
      </div>
    </nav>
  );
}
