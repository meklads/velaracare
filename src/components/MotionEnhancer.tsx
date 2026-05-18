"use client";

import { useEffect } from "react";

/**
 * Motion Enhancer
 * Adds cinematic scroll effects, parallax, and refined transitions
 * to premium sections across the site.
 * Fully additive — does not modify existing functionality.
 */
export default function MotionEnhancer() {
  useEffect(() => {
    // ── Parallax effect on elements with [data-vp-parallax] ──
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          document.querySelectorAll<HTMLElement>("[data-vp-parallax]").forEach((el) => {
            const speed = parseFloat(el.getAttribute("data-vp-parallax") || "0.3");
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewCenter = window.innerHeight / 2;
            const offset = (center - viewCenter) * speed * 0.01;
            el.style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    // ── Reveal sections with staggered children ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-vp-reveal]").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      const delay = parseInt(el.getAttribute("data-vp-delay") || "0");
      el.style.transitionDelay = `${delay}ms`;
      revealObserver.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
