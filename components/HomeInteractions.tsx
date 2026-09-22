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
    if (link?.dataset.track === "offer_click" && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set("offer", link.dataset.location || "");
      url.hash = "audit";
      window.history.pushState({}, "", url);
      getLeadContext();
      window.dispatchEvent(new Event("portfolio-offer"));
      audit?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }
  document.addEventListener("click", trackClick);
  return () => { observer.disconnect(); document.removeEventListener("click", trackClick); document.body.classList.remove("show-sticky-cta", "audit-in-view"); };
 }, []);
 return null;
}
