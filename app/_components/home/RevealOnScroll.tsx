"use client";

import { useEffect } from "react";

/**
 * Wires the `.reveal` / `.is-visible` CSS pair that lives in globals.css.
 *
 * A single instance is mounted once per page. It observes every `.reveal`
 * element with an IntersectionObserver (never a `scroll` listener), adds the
 * `is-visible` class once, then stops observing. Reduced-motion users get the
 * final state immediately and no observation happens at all.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    if (targets.length === 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
