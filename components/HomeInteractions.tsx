"use client";
import { useEffect } from "react";
import { getLeadContext } from "@/lib/lead-context";
import { trackEvent } from "@/lib/analytics";

export function HomeInteractions() {
 useEffect(() => {
  getLeadContext();
  const hero = document.querySelector("section.hero");
  const audit = document.getElementById("audit");
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === hero) document.body.classList.toggle("show-sticky-cta", !entry.isIntersecting);
      if (entry.target === audit) document.body.classList.toggle("audit-in-view", entry.isIntersecting);
    }
  });
  if (hero) observer.observe(hero);
  if (audit) observer.observe(audit);
  function trackClick(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[data-track]");
    if (link?.dataset.track) trackEvent(link.dataset.track, { location: link.dataset.location || "page" });
  }
  document.addEventListener("click", trackClick);
  return () => { observer.disconnect(); document.removeEventListener("click", trackClick); document.body.classList.remove("show-sticky-cta", "audit-in-view"); };
 }, []);
 return null;
}
