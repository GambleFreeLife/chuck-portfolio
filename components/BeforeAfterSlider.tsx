"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import s from "./BeforeAfterSlider.module.css";

type Props = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  label: string;
  className?: string;
  /** Sweep the divider once when the slider first scrolls into view, so visitors see it moves. */
  intro?: boolean;
};

export function BeforeAfterSlider({ before, after, beforeLabel, afterLabel, label, className, intro = true }: Props) {
  const [pos, setPos] = useState(50);
  const root = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null);
  const userMoved = useRef(false);

  function moveTo(clientX: number) {
    const box = root.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    set(((clientX - box.left) / box.width) * 100);
  }

  // Writes the CSS variable too, so a move during the intro sweep always lands even if React's value has not changed.
  function set(value: number) {
    const next = Math.min(100, Math.max(0, value));
    root.current?.style.setProperty("--pos", `${next}%`);
    setPos(next);
  }

  useEffect(() => {
    const el = root.current;
    if (!intro || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0, timer = 0;
    // Runs after the page has loaded and writes the CSS variable directly, so it never competes with loading or re-renders React each frame.
    const sweep = () => {
      const start = performance.now(), duration = 2400;
      const step = (now: number) => {
        if (userMoved.current) return;
        const t = Math.min(1, (now - start) / duration), eased = t * t * (3 - 2 * t);
        el.style.setProperty("--pos", `${50 - 30 * Math.sin(eased * Math.PI * 2)}%`);
        if (t < 1) frame = requestAnimationFrame(step); else el.style.setProperty("--pos", "50%");
      };
      frame = requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      timer = window.setTimeout(sweep, 900);
    }, { threshold: 0.45 });
    const begin = () => observer.observe(el);
    if (document.readyState === "complete") begin(); else window.addEventListener("load", begin, { once: true });
    return () => { window.removeEventListener("load", begin); observer.disconnect(); window.clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [intro]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    userMoved.current = true;
    // A mouse or pen moves the divider right away. A finger waits to see if it is a sideways drag, so scrolling still works.
    const active = event.pointerType !== "touch";
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, active };
    if (active) { event.currentTarget.setPointerCapture(event.pointerId); moveTo(event.clientX); }
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.active) {
      const dx = Math.abs(event.clientX - current.x), dy = Math.abs(event.clientY - current.y);
      if (dx < 6 || dx < dy) return;
      current.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    moveTo(event.clientX);
  }
  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id === event.pointerId) drag.current = null;
  }

  const rounded = Math.round(pos);
  return (
    <div
      ref={root}
      className={`${s.root} ${className ?? ""}`}
      style={{ "--pos": `${pos}%` } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <div className={s.layer}>{after}</div>
      <div className={`${s.layer} ${s.before}`}><div className={s.beforeInner}>{before}</div></div>
      <span className={`${s.tag} ${s.tagBefore} ${pos < 14 ? s.hidden : ""}`} aria-hidden="true">{beforeLabel}</span>
      <span className={`${s.tag} ${s.tagAfter} ${pos > 86 ? s.hidden : ""}`} aria-hidden="true">{afterLabel}</span>
      <div className={s.handle} aria-hidden="true">
        <span className={s.knob}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6-6 6 6 6M15 6l6 6-6 6" /></svg>
        </span>
      </div>
      <input
        className={s.range}
        type="range"
        min={0}
        max={100}
        step={1}
        value={rounded}
        aria-label={label}
        aria-valuetext={`${rounded} percent ${beforeLabel.toLowerCase()}, ${100 - rounded} percent ${afterLabel.toLowerCase()}`}
        onChange={event => { userMoved.current = true; set(Number(event.target.value)); }}
      />
    </div>
  );
}
