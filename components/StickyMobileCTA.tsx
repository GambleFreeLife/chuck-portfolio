import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta" aria-hidden="false">
      <Link href="/#audit" className="sticky-mobile-cta-link" data-track="audit_cta" data-location="mobile_sticky">
        Get my free 3-point audit →
      </Link>
    </div>
  );
}
