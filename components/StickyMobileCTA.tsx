const auditHref =
  "mailto:chuck@chuckbaryames.com?subject=AUDIT&body=My%20website%3A%20";

export function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta" aria-hidden="false">
      <a href={auditHref} className="sticky-mobile-cta-link">
        Get the free teardown →
      </a>
    </div>
  );
}
