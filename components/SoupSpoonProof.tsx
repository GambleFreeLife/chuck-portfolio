import { soupSpoon, soupSpoonChecks, soupSpoonScoreNote, soupSpoonScores } from "@/lib/soup-spoon";
import s from "./SoupSpoonProof.module.css";

function Gauge({ label, before, after }: { label: string; before: number; after: number }) {
  const r = 42, circumference = 2 * Math.PI * r;
  // Google's own colour bands: 90 and up is good, 50 to 89 needs work, below 50 is poor.
  const tone = (n: number) => n >= 90 ? s.good : n >= 50 ? s.fair : s.poor;
  return <figure className={s.gauge}>
    <div className={s.ring}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} className={s.track} />
        <circle cx="50" cy="50" r={r} className={`${s.arc} ${tone(after)}`} strokeDasharray={`${(after / 100) * circumference} ${circumference}`} />
      </svg>
      <span className={`${s.ringValue} ${tone(after)}`}>{after}</span>
    </div>
    <figcaption><strong>{label}</strong><span>Was <b className={tone(before)}>{before}</b></span></figcaption>
  </figure>;
}

/** Google scores and the checked list for Soup Spoon, styled for a dark section. */
export function SoupSpoonProof({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return <>
    <div className={s.gauges}>{soupSpoonScores.map(score => <Gauge key={score.label} {...score} />)}</div>
    <p className={s.note}>{soupSpoonScoreNote} <a href={soupSpoon.pageSpeedUrl} target="_blank" rel="noopener noreferrer">Run the test yourself <span aria-hidden="true">↗</span></a></p>
    <div className={s.checks}>
      <Heading>Eight things a customer, or Google, would notice</Heading>
      <table>
        <thead><tr><th scope="col">What I checked</th><th scope="col">Old site</th><th scope="col">New site</th></tr></thead>
        <tbody>{soupSpoonChecks.map(row => <tr key={row.item}><th scope="row">{row.item}</th><td className={s.oldCell}>{row.before}</td><td className={s.newCell}>{row.after}</td></tr>)}</tbody>
      </table>
      <p className={s.note}>Old site checked Oct 16, 2026, and every page of the new site checked Oct 20, 2026. <a href={soupSpoon.archiveUrl} target="_blank" rel="noopener noreferrer">See the old site on the Internet Archive <span aria-hidden="true">↗</span></a></p>
    </div>
  </>;
}
