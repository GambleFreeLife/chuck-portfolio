import Image from "next/image";
import s from "./PortfolioHome.module.css";

/** A condensed, responsive presentation of the project, not a live website embed. */
export function BaryamesPreview() {
  return <div className={s.baryamesPreview}>
    <div className={s.baryamesNav}><span>BARYAMES <small>CLEANERS</small></span><span>Free pickup & delivery ↗</span></div>
    <div className={s.baryamesBody}>
      <p className={s.baryamesEyebrow}>Family owned in Greater Lansing since 1922</p>
      <div className={s.baryamesOffer}>
        <div><p className={s.baryamesTitle}>Dry cleaning & laundry,<br /><em>picked up <b>FREE.</b></em></p><p className={s.baryamesDescription}>Skip the trip to the cleaners. Get your clothes picked up and returned, ready to wear.</p></div>
        <Image src="/portfolio/baryames-delivery-van.webp" alt="Baryames Cleaners delivery van" width={600} height={400} sizes="(max-width: 760px) 130px, 210px" />
      </div>
      <p className={s.baryamesBenefits}>Free pickup & delivery · Same in-store prices · No subscription</p>
      <span className={s.baryamesPickup}>Start Free Pickup & Delivery <span aria-hidden="true">→</span></span>
      <p className={s.baryamesPhone}>Call our main line: <strong>517-484-8900</strong></p>
      <div className={s.baryamesReviews}>
        <blockquote><span aria-label="5 out of 5 stars">★★★★★</span><p>“Couldn’t be more convenient.”</p><cite>Howard W. · Pickup & delivery customer</cite></blockquote>
        <blockquote><span aria-label="5 out of 5 stars">★★★★★</span><p>“Always on time.”</p><cite>Gary & Karen Q. · Pickup & delivery customers</cite></blockquote>
      </div>
    </div>
    <p className={s.baryamesPreviewNote}>Condensed project preview · Excerpts from Baryames customer reviews</p>
  </div>;
}
