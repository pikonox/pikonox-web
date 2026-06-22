"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Service {
  title: string;
  shortDesc?: string;
  description: string;
  bgImage?: string;
  image?: string | null;
  icon?: any;
  iconBg?: string | null;
}

const SERVICES: Service[] = [
  {
    title: "Best Mobile App Development Company",
    description:
      "We are a leading mobile app development company that provides Android & iPhone solutions built for performance and scale.",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="2" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 26h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 8h8M12 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "AI Transformation Service",
    description:
      "Empowering businesses to harness the full potential of AI for smarter, faster, and future-ready operations.",
    bgImage: "https://www.testim.io/wp-content/uploads/2024/02/power_of_ai_blog.jpg",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Ecommerce Website Design",
    description:
      "We offer premium e-commerce website design solutions. Our professional and dedicated e-commerce team converts visitors into buyers.",
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 6h4l3 14h13l2-9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="25" r="2" fill="currentColor"/>
        <circle cx="22" cy="25" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Website Design and Development",
    description:
      "We provide cost-competitive website design and development solutions to startups, SMEs and enterprise businesses.",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="5" width="26" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 11h26" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 16l-3 3 3 3M22 16l3 3-3 3M15 15l2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "CMS & Platform Development",
    description:
      "We are a registered partner for leading CMS platforms. With our expertise we deliver powerful and scalable content management solutions.",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 4v8M16 20v8M4 16h8M20 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Cloud Hosting & Maintenance",
    description:
      "Secure, scalable, and expertly managed cloud infrastructure to power your business — backed by 24/7 monitoring and support.",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 22a6 6 0 010-12 8 8 0 0116 0 5 5 0 010 10H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 16v6M13 19l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Generative Engine Optimization",
    description:
      "We are a specialized Generative Engine Optimization company in Dubai, helping businesses dominate AI-powered search results.",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M19 19l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 13h6M13 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "AI Model Deployment on Private Cloud",
    description:
      "pikonox offers specialized private AI model hosting and maintenance services — secure, fast, and fully managed.",
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 16h4M18 16h4M10 20h3M10 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="10" r="3" fill="currentColor" strokeWidth="0"/>
      </svg>
    ),
  },
];

export default function ServicesSection({ initialServices }: { initialServices?: Service[] }) {
  const headingRef = useReveal<HTMLHeadingElement>({ y: 30 });
  const gridRef    = useReveal<HTMLDivElement>({ selector: ".svc-card", stagger: 0.07, y: 30 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services = initialServices?.length ? initialServices : SERVICES;

  return (
    <section className="relative xl:py-24 py-16 bg-white overflow-hidden">
      
      <div className="container relative z-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="2xl:text-5xl lg:text-4xl sm:text-4xl text-3xl font-bold text-black mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our comprehensive suite of advanced digital & AI solutions tailored for your growth.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] bg-white">
          {services.map((service, i) => {
            const isHovered = hoveredIdx === i;

            // Define dynamic color classes
            const iconBg = isHovered ? "bg-white/20 text-white" : "bg-primary/10 text-primary";
            const titleColor = isHovered ? "text-white" : "text-black";
            const descColor = isHovered ? "text-white/90" : "text-gray-600";
            const cardBg = "bg-white";

            return (
              <div
                key={service.title}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`svc-card relative p-8 md:p-10 border-b border-r border-[#f1f5f9] last:border-r-0 transition-colors duration-500 cursor-pointer overflow-hidden ${cardBg} ${i >= 4 ? "border-b-0" : ""} ${(i + 1) % 4 === 0 ? "border-r-0" : ""}`}
              >
                {/* Dynamic Image Background Layer (only active on Hover) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-0 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={
                      service.bgImage ||
                      service.image ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
                    }
                    alt={service.title}
                    fill
                    unoptimized
                    className={`object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />
                  {/* Overlay to ensure text readability over the background image */}
                  <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
                  <div className="absolute inset-0 bg-black/50 z-10" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`size-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1 ${iconBg}`}
                    style={service.iconBg && !isHovered ? { backgroundColor: service.iconBg } : undefined}
                  >
                    {typeof service.icon === "string" && (service.icon.startsWith("http") || service.icon.startsWith("/")) ? (
                      <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                    ) : typeof service.icon === "string" && service.icon ? (
                      <span className="text-2xl leading-none">{service.icon}</span>
                    ) : typeof service.icon !== "string" && service.icon ? (
                      service.icon
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-3 leading-snug transition-colors duration-500 ${titleColor}`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-base leading-relaxed transition-colors duration-500 ${descColor}`}
                  >
                    {service.shortDesc || service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-primary text-white font-semibold px-8 py-4 rounded-lg hover:bg-black hover:-translate-y-1 transition-all duration-300 shadow-md shadow-primary/20"
          >
            See All Services
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
