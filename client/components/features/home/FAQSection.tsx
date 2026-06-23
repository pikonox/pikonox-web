"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, ArrowRight, Shield, Zap, Star, Clock } from "lucide-react";

const FAQ_DEFAULTS = [
  { 
    question: "What services does PikoNox offer as a full stack agency?", 
    answer: "PikoNox provides end-to-end digital product services: custom web and mobile applications, dedicated tech teams, cloud hosting & infrastructure management, enterprise AI/ML transformation, and modern UI/UX design. We take you from discovery and design to deployment and post-launch scale." 
  },
  { 
    question: "How does PikoNox ensure scalable software architecture?", 
    answer: "We design and build with modern, battle-tested technologies like React, Next.js, Node.js, Python, and TypeScript. By employing containerization (Docker), serverless architectures, and modular API design, we ensure that your software scales efficiently alongside your business growth." 
  },
  { 
    question: "What does your agile development process look like?", 
    answer: "We work in 2-week sprints with regular milestones and demos. A typical MVP takes 4–8 weeks, while complex enterprise platforms span 3–6 months. Throughout the build, you have a dedicated product manager and direct communication with our engineering team." 
  },
  { 
    question: "Who owns the intellectual property (IP) and source code?", 
    answer: "You do. 100% of the IP, design assets, and source code belong to you from day one. We sign standard NDA agreements before any engagement and provide clean repository handovers upon project completion." 
  },
  { 
    question: "Do you offer post-launch support and server maintenance?", 
    answer: "Yes, we offer ongoing SLA-backed support and maintenance. Our packages cover proactive 24/7 server monitoring, performance optimization, dependency and security updates, and active rolling updates for new features." 
  },
];

const STATS = [
  { value: "200+", label: "Projects shipped", Icon: Zap },
  { value: "98%", label: "Client satisfaction", Icon: Star },
  { value: "8 weeks", label: "Avg. time to MVP", Icon: Clock },
  { value: "24/7", label: "Support coverage", Icon: Shield },
];

interface FAQItem { question: string; answer: string; }

export default function FAQSection({ initialFaqs }: { initialFaqs?: FAQItem[] }) {
  const faqs = initialFaqs?.length ? initialFaqs : FAQ_DEFAULTS;
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".faq-left", { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".faq-left", start: "top 82%" },
        });
        gsap.fromTo(".faq-stat-card", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".faq-stat-card", start: "top 85%" },
        });
        gsap.fromTo(".faq-item", { opacity: 0, x: 30 }, {
          opacity: 1, x: 0, duration: 0.55, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: ".faq-item", start: "top 82%" },
        });
      }, sectionRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container">

        {/* ── Header ── */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            <span className="w-6 h-px bg-primary inline-block" />
            Got Questions?
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tight max-w-lg">
              Frequently Asked<br />Questions
            </h2>
            <p className="text-base text-secondary/50 max-w-sm leading-relaxed">
              Everything you need to know about partnering with PikoNox for your next digital project.
            </p>
          </div>
        </div>

        {/* ── Body: 2-col ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="faq-left lg:sticky lg:top-28 flex flex-col gap-5">

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-secondary/10 ring-1 ring-black/5">
              <div className="relative w-full" style={{ paddingBottom: "72%" }}>
                <Image
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=900"
                  alt="PikoNox team collaboration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Bottom veil */}
                <div className="absolute inset-0 bg-linear-to-t from-secondary/55 via-secondary/10 to-transparent" />

                {/* Avatars + pill */}
                <div className="absolute bottom-5 inset-x-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2.5">
                      {[
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
                      ].map((src, i) => (
                        <img key={i} src={src} alt="" className="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
                      ))}
                    </div>
                    <span className="text-white text-xs font-semibold ml-1">50+ experts</span>
                  </div>
                  <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full ring-1 ring-white/20">
                    Global team
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, label, Icon }) => (
                <div
                  key={label}
                  className="faq-stat-card group flex items-start gap-3.5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-primary/20 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-md cursor-default"
                >
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xl font-bold text-secondary leading-none group-hover:text-primary transition-colors duration-300">{value}</div>
                    <div className="text-xs text-secondary/45 font-medium mt-1 leading-tight">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="relative bg-secondary rounded-2xl px-6 py-5 flex items-center justify-between gap-4 overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="relative text-sm text-white/65 leading-snug">
                Still unsure? Talk to a<br />
                <span className="text-white font-semibold">real human, right now.</span>
              </p>
              <a
                href="mailto:contact@pikonox.com"
                className="relative shrink-0 inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-primary/30"
              >
                Let's talk <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ── RIGHT: Accordion ── */}
          <div className="flex flex-col gap-2.5">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`faq-item rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-primary/20 bg-blue-50/50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className={`shrink-0 text-xs font-bold tabular-nums w-6 transition-colors duration-300 ${isOpen ? "text-primary" : "text-secondary/20"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-300 ${isOpen ? "text-primary" : "text-secondary"}`}>
                      {faq.question}
                    </span>
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-white shadow-md shadow-primary/25" : "bg-gray-100 text-gray-400"}`}>
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div
                      className="px-6 pb-5 text-sm text-secondary/55 leading-relaxed pl-16 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-3 pt-2 pl-2">
              <span className="text-sm text-secondary/35">Still have questions?</span>
              <a href="mailto:contact@pikonox.com" className="text-sm font-semibold text-primary hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
                Contact our team (contact@pikonox.com) <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
