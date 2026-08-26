"use client";

import { useEffect } from "react";

export function HomeInteractions() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroSection = document.querySelector<HTMLElement>("section.hero");
    const stickyCtaObserver = heroSection
      ? new IntersectionObserver(
          ([entry]) => {
            document.body.classList.toggle("show-sticky-cta", !entry?.isIntersecting);
          },
          { threshold: 0 },
        )
      : null;

    if (heroSection && stickyCtaObserver) {
      stickyCtaObserver.observe(heroSection);
    }

    let revealObserver: IntersectionObserver | null = null;

    if (!prefersReducedMotion) {
      const revealEls = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".featured-case-study, .secondary-proof-project, .proof-system-card, .service-card, .process-step, .growth-price-card, .campaign-showcase, .faq-item, .about-stat, .audit-form",
        ),
      );

      for (const element of revealEls) {
        element.style.opacity = "0";
        element.style.transform = "translateY(14px)";
        element.style.transition =
          "opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1)";
      }

      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              revealObserver?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
      );

      for (const element of revealEls) {
        revealObserver.observe(element);
      }
    }

    return () => {
      revealObserver?.disconnect();
      stickyCtaObserver?.disconnect();
      document.body.classList.remove("show-sticky-cta");
    };
  }, []);

  return null;
}
