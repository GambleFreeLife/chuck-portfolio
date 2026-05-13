import Link from "next/link";

type NavProps = {
  activePage?: "videos" | "landing-pages";
  contactHref?: string;
};

export function Nav({ activePage = "videos", contactHref = "#contact" }: NavProps) {
  return (
    <nav>
      <div className="wrap">
        <Link href="/" className="nav-name" aria-label="Chuck Baryames home">
          CB
        </Link>
        <div className="nav-links">
          <Link
            href="/"
            className={`nav-primary${activePage === "videos" ? " is-active" : ""}`}
            aria-current={activePage === "videos" ? "page" : undefined}
          >
            Videos
          </Link>
          <Link
            href="/landing-pages"
            className={`nav-primary${activePage === "landing-pages" ? " is-active" : ""}`}
            aria-current={activePage === "landing-pages" ? "page" : undefined}
          >
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
