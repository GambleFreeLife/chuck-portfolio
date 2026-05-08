import Link from "next/link";

export function Nav() {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="nav-name" aria-label="Chuck Baryames home">
          CB
        </Link>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#faq">FAQ</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
          <Link href="/get-started" className="nav-cta">
            Start the build
          </Link>
        </div>
      </div>
    </nav>
  );
}
