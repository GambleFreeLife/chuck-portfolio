import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <strong>Chuck Baryames</strong>
          <span>I find what is costing local businesses customers, then I fix it.</span>
        </div>
        <div className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/#services">Services</Link>
          <Link href="/landing-pages">Landing pages</Link>
          <Link href="/#audit">Free audit</Link>
          <a href="mailto:chuck@chuckbaryames.com">Email</a>
        </div>
      </div>
      <div className="wrap footer-legal">© 2026 Chuck Baryames. All rights reserved.</div>
    </footer>
  );
}
