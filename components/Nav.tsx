import Link from "next/link";

export function Nav() {
  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav aria-label="Primary navigation" className="site-nav">
      <div className="wrap">
        <Link href="/" className="nav-name" aria-label="Chuck Baryames home">
          <span className="nav-monogram">CB</span>
          <span className="nav-wordmark">Chuck Baryames</span>
        </Link>
        <div className="nav-links">
          <Link href="/#work" className="nav-primary">Work</Link>
          <Link href="/#pricing" className="nav-primary">Pricing</Link>
          <Link href="/landing-pages" className="nav-primary nav-secondary-service">Landing pages</Link>
          <Link href="/#about" className="nav-anchor">About</Link>
          <Link href="/#audit" className="nav-cta" data-track="inquiry_cta" data-location="navigation">Discuss a project</Link>
        </div>
      </div>
    </nav>
    </>
  );
}
