import Link from "next/link";

type NavProps = {
  contactHref?: string;
};

export function Nav({ contactHref = "mailto:cbaryames24@gmail.com?subject=Project%20inquiry" }: NavProps) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="nav-name" aria-label="Chuck Baryames home">
          CB
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-primary">
            Videos
          </Link>
          <Link href="/landing-pages" className="nav-primary">
            Landing Pages
          </Link>
          <a href="#about" className="nav-anchor">
            About
          </a>
          <a href={contactHref} className="nav-cta">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
