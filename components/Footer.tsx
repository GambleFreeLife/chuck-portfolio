import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <strong>Chuck Baryames</strong>
          <span>Website improvements for Greater Lansing businesses.</span>
        </div>
        <div className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/landing-pages">Landing pages</Link>
          <Link href="/#audit">Discuss a project</Link>
          <a href="mailto:chuck@chuckbaryames.com">Email</a>
        </div>
      </div>
      <div className="wrap footer-legal">© 2026 Chuck Baryames. All rights reserved.</div>
    </footer>
  );
}
