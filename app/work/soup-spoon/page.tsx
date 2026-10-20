import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArtPicture } from "@/components/ArtPicture";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SoupSpoonProof } from "@/components/SoupSpoonProof";
import { primaryCta } from "@/lib/services";
import { soupSpoon, soupSpoonHeadlineStats, soupSpoonShots as shot } from "@/lib/soup-spoon";
import styles from "./page.module.css";

/* ------------------------------------------------------------------
   Results stay hidden until the client approves them. A value left as null is not shown.
   Website scores and the checks list live in lib/soup-spoon.ts and are public, re-checkable facts.
   ------------------------------------------------------------------ */
const RESULTS = {
  catering: {
    period: "Sep 9 to Oct 13, 2026",
    quoteRequests: null as number | null, // needs Patricia's OK
    adSourced: null as number | null, // minimum count that came straight from an ad click
    costPerAdQuote: null as number | null, // dollars of ad spend per ad-sourced quote
    bookings: null as number | null, // from Patricia
  },
  website: {
    period: "first 30 days, Oct 19 to Nov 18, 2026",
    orderClicks: null as number | null,
    reserveClicks: null as number | null,
    callTaps: null as number | null,
    directionsClicks: null as number | null,
  },
};
const TESTIMONIAL: { quote: string; name: string; role: string } | null = null; // Patricia's own words, approved by her
const OWNER_TIME: string | null = null; // confirm first, e.g. "Two meetings and a few texts"
const PHONE: { display: string; tel: string } | null = null; // e.g. { display: "(517) 555-0100", tel: "+15175550100" }
const CTA = { label: primaryCta, short: "3 free fixes", href: "/?offer=free-review#audit" };

/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Soup Spoon Cafe case study | Chuck Baryames",
  description:
    "How a Lansing restaurant's website went from one button to Order, Reserve, Call and Directions on the first screen, with Google scores of 100 for SEO and accessibility.",
  alternates: { canonical: "/work/soup-spoon" },
};

type Shot = { src: string; width: number; height: number; alt: string };
type Pair = { title: string; kind: "phone" | "desktop"; before: Shot & { note: string }; after: Shot & { note: string } };

const PAIRS: Pair[] = [
  {
    title: "Homepage on a phone",
    kind: "phone",
    before: { ...shot.phoneBefore, note: "One button, “See Menu & Reservation Now!”, which opened the Reservations page with no menu." },
    after: { ...shot.phoneAfter, note: "Order online, Reserve a table, Call and Get directions on the first screen, plus a bar that keeps Order, Reserve and Call in reach." },
  },
  {
    title: "The menu",
    kind: "desktop",
    before: { ...shot.menuBefore, note: "On a separate website, with no Order buttons and no link back to the restaurant’s site." },
    after: { ...shot.menuAfter, note: "On the restaurant’s own site, with Order and Reserve buttons. The staff change dishes and prices and print menus themselves." },
  },
  {
    title: "Catering",
    kind: "phone",
    before: { ...shot.cateringBefore, note: "There was no quote form on the page." },
    after: { ...shot.cateringAfter, note: "Prices up front and a short quote form. Only a name and email are required." },
  },
];

const ALSO_FIXED = [
  "One set of hours everywhere, with a live open sign, where the old site showed three different opening times.",
  "Phone links that dial and a Directions link on every page, where the old site had neither.",
  "A Gift Cards page that sells eGift cards through Toast, where the old one said “This form is currently private.”",
  "New pages for The Bar and Private Events.",
  "Click tracking on Order, Reserve, Call and Directions in Google Analytics, so results can be counted.",
];

const GALLERY: (Shot & { note: string })[] = [
  { ...shot.bar, note: "The Bar: cocktails, Michigan drafts, wine and whiskey on one page." },
  { ...shot.events, note: "Private Events: the West Wing and Sunday buyouts, with an inquiry button." },
  { ...shot.quoteForm, note: "The catering quote form on a phone." },
];

const fmt = (n: number) => n.toLocaleString("en-US");

function Tiles({ items }: { items: { value: string; label: string }[] }) {
  if (!items.length) return null;
  return <div className={styles.tiles}>{items.map(t => <div className={styles.tile} key={t.label}><span className={styles.tileValue}>{t.value}</span><span className={styles.tileLabel}>{t.label}</span></div>)}</div>;
}

export default function SoupSpoonCaseStudy() {
  const c = RESULTS.catering;
  const w = RESULTS.website;

  const cateringTiles = [
    c.quoteRequests !== null && { value: fmt(c.quoteRequests), label: "catering quote requests" },
    c.adSourced !== null && { value: `${fmt(c.adSourced)}+`, label: "came straight from an ad click" },
    c.costPerAdQuote !== null && { value: `$${fmt(c.costPerAdQuote)}`, label: "ad spend per ad-sourced quote" },
    c.bookings !== null && { value: fmt(c.bookings), label: "bookings so far" },
  ].filter(Boolean) as { value: string; label: string }[];

  const websiteTiles = [
    w.orderClicks !== null && { value: fmt(w.orderClicks), label: "Order online clicks" },
    w.reserveClicks !== null && { value: fmt(w.reserveClicks), label: "Reserve clicks" },
    w.callTaps !== null && { value: fmt(w.callTaps), label: "Call taps" },
    w.directionsClicks !== null && { value: fmt(w.directionsClicks), label: "Directions clicks" },
  ].filter(Boolean) as { value: string; label: string }[];

  const headline = c.quoteRequests !== null
    ? <>Catering went from voicemail <em>to {fmt(c.quoteRequests)} quote requests</em> in 5 weeks.</>
    : <>A restaurant website <em>that asks for the order.</em></>;

  const glance = [
    { k: "Client", v: "Soup Spoon Cafe, 1419 E. Michigan Ave, Lansing" },
    { k: "Work", v: "Catering page and Google Ads (Sep 2026), then a full website redesign (Oct 2026)" },
    { k: "Live", v: `Catering page Sep 2026 · Full site ${soupSpoon.launch}` },
    { k: "Size", v: "12 pages, plus a menu the staff edit themselves" },
    OWNER_TIME ? { k: "Owner’s time", v: OWNER_TIME } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.logo}>chuck baryames<span>.</span></Link>
          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/#work" className={styles.navLink}>Work</Link>
            <Link href="/#pricing" className={styles.navLink}>Pricing</Link>
            <Link href={CTA.href} className={styles.btnSmall} data-track="cta_click" data-label="free fixes" data-location="case_header">
              <span className={styles.ctaLong}>{CTA.label}</span>
              <span className={styles.ctaShort}>{CTA.short}</span>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Case study · Lansing restaurant and bar</p>
            <h1 className={styles.h1}>
              <span className={styles.client}>{soupSpoon.name}</span>
              {headline}
            </h1>
            <p className={styles.lede}>A catering page that asks for the order, a Google Ads campaign that finds the customers, and a new 12-page website the staff update themselves.</p>
            <dl className={styles.glance}>{glance.map(g => <div key={g.k}><dt>{g.k}</dt><dd>{g.v}</dd></div>)}</dl>
            <figure className={styles.show}>
              <div className={styles.browser}>
                <div className={styles.browserBar}><span className={styles.lights} aria-hidden="true"><i /><i /><i /></span><span className={styles.address}>soupspooncafe.com</span></div>
                <BeforeAfterSlider
                  className={styles.slider}
                  label="Compare the old and new Soup Spoon Cafe homepage"
                  beforeLabel="Before"
                  afterLabel="After"
                  before={<ArtPicture wide={shot.desktopBefore} narrow={shot.phoneBefore} alt="The old Soup Spoon Cafe homepage: a logo over a food photo and one button" eager wideSizes="(max-width: 1180px) 94vw, 1100px" narrowSizes="(max-width: 700px) 86vw, 360px" />}
                  after={<ArtPicture wide={shot.desktopAfter} narrow={shot.phoneAfter} alt="The new Soup Spoon Cafe homepage with Order online, Reserve a table, Call and Get directions up front" eager priority wideSizes="(max-width: 1180px) 94vw, 1100px" narrowSizes="(max-width: 700px) 86vw, 360px" />}
                />
              </div>
              <figcaption>Drag the line to compare. Before: Oct 16, 2026. After: live since {soupSpoon.launch}. <a href={soupSpoon.url} target="_blank" rel="noopener noreferrer" data-track="case_study_click" data-project="soup-spoon" data-location="case_hero">Visit the live site <span aria-hidden="true">↗</span></a></figcaption>
            </figure>
            <dl className={styles.stats}>{soupSpoonHeadlineStats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2 className={styles.h2}>Before <em>and after</em></h2>
            <p className={styles.sub}>Screenshots of the old site were taken Oct 16, 2026, three days before launch.</p>
            {PAIRS.map(p => (
              <article className={styles.pair} key={p.title}>
                <h3 className={styles.h3}>{p.title}</h3>
                <div className={p.kind === "phone" ? styles.pairPhone : styles.pairDesktop}>
                  {(["before", "after"] as const).map(side => {
                    const item = p[side];
                    return (
                      <figure className={styles.shot} key={side}>
                        <span className={side === "before" ? styles.tagBefore : styles.tagAfter}>{side === "before" ? "Before" : "After"}</span>
                        <div className={p.kind === "phone" ? styles.framePhone : styles.frameDesktop}>
                          <Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes={p.kind === "phone" ? "(max-width: 700px) 45vw, 340px" : "(max-width: 900px) 100vw, 560px"} />
                        </div>
                        <figcaption>{item.note}</figcaption>
                      </figure>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.dark}`} id="scores">
          <div className={styles.wrap}>
            <h2 className={styles.h2}>What Google <em>measured</em></h2>
            <p className={styles.sub}>Google’s own website checks on the homepage, before and after. Anyone can rerun them.</p>
            <SoupSpoonProof />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sage}`}>
          <div className={styles.wrap}>
            <h2 className={styles.h2}>Also <em>fixed</em></h2>
            <p className={styles.sub}>Past the first screen, the details a customer checks before visiting got fixed too.</p>
            <ul className={styles.checks}>{ALSO_FIXED.map(t => <li key={t}>{t}</li>)}</ul>
            <div className={styles.gallery}>
              {GALLERY.map(g => (
                <figure className={styles.galleryItem} key={g.src}>
                  <div className={g.height > g.width ? styles.framePhone : styles.frameDesktop}><Image src={g.src} width={g.width} height={g.height} alt={g.alt} sizes="(max-width: 900px) 100vw, 380px" /></div>
                  <figcaption>{g.note}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {(cateringTiles.length > 0 || websiteTiles.length > 0 || TESTIMONIAL) && (
          <section className={styles.section}>
            <div className={styles.wrap}>
              <h2 className={styles.h2}>The <em>results</em></h2>
              {cateringTiles.length > 0 && <><h3 className={styles.h3}>Catering, {c.period}</h3><Tiles items={cateringTiles} /></>}
              {websiteTiles.length > 0 && <><h3 className={styles.h3}>Website, {w.period}</h3><Tiles items={websiteTiles} /><p className={styles.fine}>A click on Order isn’t a finished order. Toast counts the orders.</p></>}
              {TESTIMONIAL && <blockquote className={styles.quote}><p>“{TESTIMONIAL.quote}”</p><cite>{TESTIMONIAL.name}, {TESTIMONIAL.role}</cite></blockquote>}
            </div>
          </section>
        )}

        <section className={`${styles.section} ${styles.white}`}>
          <div className={`${styles.wrap} ${styles.twoCol}`}>
            <div>
              <h2 className={styles.h2}>After <em>launch</em></h2>
              <p className={styles.body}>Launch comes with 30 days of fixes, a results report at day 30, and how-to videos for changing the menu and hours. After that, an optional monthly plan covers Google Ads, updates and a one-page monthly report.</p>
            </div>
            <div>
              <h2 className={styles.h2}>Who <em>built it</em></h2>
              <p className={styles.body}>I’m Chuck Baryames. I run marketing for Baryames Cleaners, my family’s 11-store dry cleaner in Greater Lansing, open since 1922. I build with modern tools, including AI, so projects move fast, and you work with me directly.</p>
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <div className={styles.wrap}>
            <h2 className={styles.h2Light}>Want this for <em>your business?</em></h2>
            <p className={styles.contactSub}>Send me your website and I’ll email three things I’d fix within 2 business days. No call required.</p>
            <div className={styles.ctaRow}>
              <Link href={CTA.href} className={styles.btnLight} data-track="cta_click" data-label="free fixes" data-location="case_contact">{CTA.label} <span aria-hidden="true">↗</span></Link>
              {PHONE && <a href={`tel:${PHONE.tel}`} className={styles.btnOutline} data-track="cta_click" data-label="call" data-location="case_contact">Call or text {PHONE.display}</a>}
              <a href="mailto:chuck@chuckbaryames.com" className={styles.linkLight} data-track="email_click" data-location="case_contact">chuck@chuckbaryames.com</a>
            </div>
          </div>
        </section>
      </main>

      <HomeInteractions />
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <span>© 2026 Chuck Baryames · Websites and marketing · Lansing, Michigan</span>
          <span className={styles.footerLinks}><Link href="/#work">Work</Link><Link href="/#pricing">Pricing</Link><Link href="/privacy">Privacy Policy</Link></span>
        </div>
      </footer>
    </div>
  );
}
