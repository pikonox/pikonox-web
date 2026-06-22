"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    stars: 5,
    text: `The flexibility is unmatched. <strong class="font-bold">Every component feels thoughtfully crafted</strong>, and integrating it was seamless. Everything is structured and easy to follow.`,
    member: {
      name: "Michael Reed",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    },
  },
  {
    stars: 5,
    text: `Building with this template was a breeze. <strong class="font-bold">Well-documented and beautifully designed</strong> — exactly what I needed.`,
    member: {
      name: "Hugh Jackman",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    },
  },
  {
    stars: 5,
    text: `This template has <strong class="font-bold">great documentation</strong> and support. It's very flexible and has so many options to implement to your website. I am happy that i decided to buy it.`,
    member: {
      name: "Olivia Mitchell",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    },
  },
];

interface Testimonial {
  name: string;
  rating?: number;
  text: string;
  image?: string | null;
}

export default function TestimonialsSection({
  initialTestimonials,
}: {
  initialTestimonials?: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = initialTestimonials?.length
    ? initialTestimonials.map((t) => ({
        stars: t.rating || 5,
        text: t.text,
        member: {
          name: t.name,
          img:
            t.image ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
        },
      }))
    : SLIDES;

  // GSAP scroll-entry animations
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function animate() {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const d = { duration: 0.9, ease: "power3.out", clearProps: "all" };
        const t = (el: Element) => ({
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        });

        if (headingRef.current)
          gsap.from(headingRef.current, {
            ...d,
            y: 50,
            opacity: 0,
            scrollTrigger: t(headingRef.current),
          });
        if (containerRef.current) {
          gsap.from(containerRef.current.children, {
            ...d,
            y: 50,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: t(containerRef.current),
          });
        }
      });
    }
    animate();
    return () => {
      ctx?.revert();
    };
  }, []);

  function goTo(idx: number) {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  }

  function prev() {
    goTo((active - 1 + testimonials.length) % testimonials.length);
  }
  function next() {
    goTo((active + 1) % testimonials.length);
  }

  return (
    <section className="py-24 bg-[#F8F9FA] relative">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-[38px] md:text-[45px] lg:text-[50px] font-bold text-secondary leading-tight mb-6">
            Success Stories: How Feedback Fuels Our Growth
          </h2>
          <div className="inline-block bg-primary text-white text-sm md:text-base font-semibold py-3 px-6 rounded-full shadow-lg shadow-primary/30">
            Webxpert is rated{" "}
            <span className="font-extrabold text-white">4.5 / 5</span> average
            from 200 reviews on Google, Clutch!
          </div>
        </div>

        {/* 3-Column Layout Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 max-w-6xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[450px]"
        >
          {/* Column 1: Ratings (Dark) */}
          <div className="bg-[#0f172a] p-10 flex flex-col justify-center items-center text-center rounded-[2rem] lg:rounded-r-none relative z-10 m-2 lg:m-0 lg:rounded-[2rem]">
            <h3 className="text-7xl lg:text-[80px] font-medium text-white leading-none mb-3">
              4.5
            </h3>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-white/80 font-medium">Star Rating on</span>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_logo_%282022%29.svg"
                alt="Trustpilot"
                width={85}
                height={20}
                className="brightness-0 invert"
              />
            </div>

            <h4 className="text-xl lg:text-2xl font-semibold text-white mb-10 leading-snug">
              10 Years Experience in Digital marketing
            </h4>

            <Link
              href="https://www.trustpilot.com/"
              className="group flex flex-row items-center justify-between w-full max-w-[280px] bg-white rounded-full p-1.5 pl-6 hover:shadow-lg transition-all"
            >
              <span className="text-secondary font-bold text-[15px]">
                Rate Us on Trustpilot
              </span>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-45"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>

          {/* Column 2: Testimonial Text (White) */}
          <div className="bg-white p-10 lg:p-14 flex flex-col justify-center relative items-start h-full">
            <div
              className="flex-1 w-full"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateX(-20px)" : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {testimonials.length > 0 && <Star />}
              {testimonials.length > 0 && (
                <p
                  className="text-xl lg:text-[22px] leading-relaxed text-secondary/80 font-light prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: testimonials[active].text,
                  }}
                />
              )}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-6 mt-12 w-full">
              <button
                onClick={prev}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
                aria-label="Previous"
              >
                <ArrowLeft size={32} strokeWidth={1} />
              </button>
              <button
                onClick={next}
                className="text-gray-300 hover:text-primary transition-colors duration-300"
                aria-label="Next"
              >
                <ArrowRight size={32} strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Column 3: Photo */}
          <div className="relative w-full h-[350px] lg:h-full lg:min-h-[450px]">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateX(20px)" : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {testimonials.length > 0 && (
                <Image
                  src={testimonials[active].member.img}
                  alt={testimonials[active].member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              )}

              {/* Soft Gradient Overlay at bottom for nice fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
