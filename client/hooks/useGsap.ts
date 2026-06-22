"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to register GSAP plugins and optionally init ScrollSmoother.
 * Dynamically imports GSAP to reduce initial bundle (bundle-dynamic-imports).
 */
export function useGsapInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Prevent sudden jumps caused by GSAP lag smoothing conflicting with Lenis
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after page content settles
      setTimeout(() => ScrollTrigger.refresh(), 500);
    }

    init();
  }, []);
}

/**
 * Hook for GSAP scroll-triggered animations on a single element.
 */
export function useScrollAnimation(
  animationConfig: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    trigger?: gsap.plugins.ScrollTriggerInstanceVars;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: { revert: () => void } | null = null;

    async function animate() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
            ...animationConfig.from,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            ...animationConfig.to,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              ...animationConfig.trigger,
            },
          }
        );
      });
    }

    animate();

    return () => {
      ctx?.revert();
    };
  }, [animationConfig]);

  return ref;
}
