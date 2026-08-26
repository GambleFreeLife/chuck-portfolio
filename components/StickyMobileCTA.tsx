import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta" aria-hidden="false">
      <Link href="/#audit" className="sticky-mobile-cta-link">
        Get my free 3-point audit →
      </Link>
    </div>
  );
}
