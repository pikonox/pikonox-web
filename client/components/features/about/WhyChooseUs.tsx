"use client";

import { ArrowUpRight, Users } from "lucide-react";
import NextLink from "next/link";

export type WhySection = {
  label: string;
  title: string;
  desc: string;
  img: string;
  alt?: string;
};

export type WhyChooseUsData = {
  sections?: WhySection[];
};

const DEFAULT_SECTIONS: WhySection[] = [
  {
    label: "Our Mission",
    title: "Our Mission, Your Success",
    desc: "At PikoNox, our mission is simple: to turn your ideas into impactful realities. We are dedicated to providing innovative, creative solutions that drive growth and elevate brands.",
    img: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/portfolio/pic1.png",
    alt: "Our mission",
  },
  {
    label: "Our Vision",
    title: "Visionaries Behind the Brands",
    desc: "Our team of experts combines strategy, creativity, and technology to build brands that matter. We focus on long-term impact and sustainable growth for every client we partner with.",
    img: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/portfolio/pic2.png",
    alt: "Our vision",
  },
];

export default function WhyChooseUs({ data }: { data?: WhyChooseUsData | null }) {
  const sections = data?.sections?.length ? data.sections : DEFAULT_SECTIONS;

  return (
    <section className="py-24 bg-gray-50/30 overflow-hidden">
      <div className="container">
        <div className="space-y-20 lg:space-y-32">
          {sections.map((section, idx) => (
            <div key={`${section.title}-${idx}`} className="grid grid-cols-12 gap-10 lg:gap-20 items-center">
              <div className={`col-span-12 lg:col-span-6 ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                  <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-xl">
                    <img
                      src={section.img}
                      alt={section.alt || section.title}
                      className="w-full h-[400px] lg:h-[550px] object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                    />
                  </div>
                </div>
              </div>

              <div className={`col-span-12 lg:col-span-6 ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-0.5 bg-primary"></span>
                    <span className="text-sm font-black text-primary uppercase tracking-widest">{section.label}</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-secondary mb-6 leading-tight">{section.title}</h3>

                  <p className="text-lg text-secondary/70 font-medium mb-10 leading-relaxed">{section.desc}</p>

                  <NextLink
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-primary transition-all duration-300 group shadow-lg shadow-secondary/20"
                  >
                    <Users className="w-5 h-5" />
                    Start a Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </NextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
