import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta" aria-hidden="false">
      <Link href="/order-video?plan=single" className="sticky-mobile-cta-link">
        Order video, $97 →
      </Link>
    </div>
  );
}
