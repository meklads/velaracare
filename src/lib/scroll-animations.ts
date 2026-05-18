/**
 * Scroll-triggered animations utility
 * Zero dependencies — uses IntersectionObserver
 * Add data-vp-animate="fade-up|scale-in|slide-up" to elements
 * Add data-vp-delay="1|2|3|4|5" for staggered delays
 */

type AnimationClass = "vp-fade-in" | "vp-scale-in" | "vp-slide-up";
const animationMap: Record<string, AnimationClass> = {
  "fade-up": "vp-fade-in",
  "scale-in": "vp-scale-in",
  "slide-up": "vp-slide-up",
};

export function initScrollAnimations(): () => void {
  const elements = document.querySelectorAll("[data-vp-animate]");
  if (elements.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const type = el.getAttribute("data-vp-animate") || "fade-up";
          const delay = el.getAttribute("data-vp-delay") || "";

          const animClass = animationMap[type] || "vp-fade-in";
          el.classList.add(animClass);

          if (delay) {
            el.classList.add(`vp-delay-${delay}`);
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

/**
 * Count-up animation for stat numbers
 * Add data-vp-count-to="<number>" and data-vp-count-suffix="%" to elements
 */
export function initCountUpAnimations(): () => void {
  const elements = document.querySelectorAll("[data-vp-count-to]");
  if (elements.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.getAttribute("data-vp-count-to") || "0");
          const suffix = el.getAttribute("data-vp-count-suffix") || "";
          const duration = 1500;
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = `${current}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = `${target}${suffix}`;
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
