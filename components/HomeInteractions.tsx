"use client";

import { useEffect } from "react";

export function HomeInteractions() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".process-step, .showcase-card, .stack-column, .deliverable-card, .fit-card, .faq-item, .case-card, .price-card, .about-stat",
      ),
    );

    if (prefersReducedMotion) {
      document.body.classList.remove("show-sticky-cta");
      return undefined;
    }

    const tiltCleanups = tiltCards.map((card) => {
      const handleCardMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
        card.style.boxShadow = `${-(x * 20)}px ${y * 20}px 40px rgba(0,0,0,.2)`;
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
      element.style.transform = "translateY(24px)";
      element.style.transition = "all .6s cubic-bezier(.16,1,.3,1)";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        }
      },
      { threshold: 0.1 },
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
