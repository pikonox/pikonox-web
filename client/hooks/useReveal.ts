"use client";

import { useEffect, useRef } from "react";

interface RevealOptions {
  /** CSS selector for children to stagger-animate. Omit to animate the container itself. */
  selector?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  /** ScrollTrigger start value, default "top 88%" */
  start?: string;
}

export function useReveal<T extends HTMLElement = HTMLElement>(opts: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const targets = opts.selector ? el.querySelectorAll(opts.selector) : el;
        gsap.from(targets, {
          y: opts.y ?? 40,
          x: opts.x ?? 0,
          scale: opts.scale ?? 1,
          opacity: opts.opacity ?? 0,
          duration: opts.duration ?? 0.75,
          ease: opts.ease ?? "power2.out",
          stagger: opts.stagger ?? 0,
          delay: opts.delay ?? 0,
          clearProps: "all",
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    })();

    return () => { ctx?.revert(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
