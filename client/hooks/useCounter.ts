"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to animate a number counter when element scrolls into view.
 * Uses IntersectionObserver for performance (client-passive-event-listeners).
 */
export function useCounter(targetValue: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasCounted = useRef(false);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el || hasCounted.current) return;
    hasCounted.current = true;

    const startTime = performance.now();
    const isDecimal = targetValue % 1 !== 0;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * targetValue;

      if (el) {
        el.textContent = isDecimal ? current.toFixed(1) : Math.ceil(current).toString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [targetValue, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return ref;
}
