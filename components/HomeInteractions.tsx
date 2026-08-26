"use client";

import { useEffect } from "react";

export function HomeInteractions() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".process-step, .showcase-card, .stack-column, .deliverable-card, .fit-card, .faq-item, .case-card, .price-card, .about-stat, .proof-system-card, .service-card, .growth-price-card, .featured-case-study, .secondary-proof-project",
      ),
    );

    if (prefersReducedMotion) {
      document.body.classList.remove("show-sticky-cta");
      return undefined;
    }

    const tiltCleanups = tiltCards.map((card) => {
      const handleCardMove = (event: MouseEvent) => {
        if (hasCoarsePointer) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-2px)`;
        card.style.boxShadow = `${-(x * 8)}px ${y * 8}px 32px rgba(0,0,0,.18)`;
      };

      const handleCardLeave = () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      };

      card.addEventListener("mousemove", handleCardMove);
      card.addEventListener("mouseleave", handleCardLeave);

      return () => {
        card.removeEventListener("mousemove", handleCardMove);
        card.removeEventListener("mouseleave", handleCardLeave);
      };
    });

    for (const element of revealEls) {
      element.style.opacity = "0";
      element.style.transform = "translateY(18px)";
      element.style.transition = "opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1)";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    for (const element of revealEls) {
      observer.observe(element);
    }

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

    return () => {
      observer.disconnect();
      stickyCtaObserver?.disconnect();
      document.body.classList.remove("show-sticky-cta");
      for (const cleanup of tiltCleanups) {
        cleanup();
      }
    };
  }, []);

  return null;
}
