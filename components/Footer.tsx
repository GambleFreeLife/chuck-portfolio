import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <div>
          <strong>Chuck Baryames</strong>
          <span>Local business growth, websites, SEO, Google Ads, analytics, and brand video.</span>
        </div>
        <div className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/landing-pages">Landing pages</Link>
          <a href="mailto:chuck@chuckbaryames.com">Email</a>
        </div>
      </div>
      <div className="wrap footer-legal">© 2026 Chuck Baryames. All rights reserved.</div>
    </footer>
  );
}
