"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TEAM_MEMBERS = [
  {
    name: "Robert Wilson",
    role: "Chief Financial Officer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/1.png",
  },
  {
    name: "Diana Ross",
    role: "Strategy Director",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/2.png",
  },
  {
    name: "Michael Chen",
    role: "Senior Consultant",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/3.png",
  },
  {
    name: "Sarah Johnson",
    role: "Tax Advisory Head",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/4.png",
  },
];

interface TeamMember {
  name: string;
  title?: string | null;
  role?: string | null;
  avatar?: string | null;
  image?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  email?: string | null;
}

export default function TeamSection({ initialTeam }: { initialTeam?: TeamMember[] }) {
  const team = initialTeam?.length 
    ? initialTeam.map(m => ({
        name: m.name,
        role: m.title || m.role || "Consultant",
        image: m.avatar || m.image || "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/1.png"
      }))
    : TEAM_MEMBERS;

  return (
    <section className="relative xl:py-25 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-[#1a2744] -z-1" />
      <Image
        src="https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/background/bg1.png"
        alt=""
        fill
        className="object-cover opacity-10 -z-1"
        sizes="100vw"
      />

      <div className="container relative z-1">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
          <div className="max-w-2xl">
            <span className="text-primary text-base font-semibold uppercase tracking-wider mb-2 block">
              Our Team
            </span>
            <h2 className="2xl:text-5xl lg:text-[50px] sm:text-4xl text-3xl font-semibold text-white leading-tight">
              The Team Behind Your Success
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg">
            Our experts bring decades of experience across finance, strategy, and
            technology to help your business thrive.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
          className="!overflow-visible"
        >
          {team.map((member) => (
            <SwiperSlide key={member.name}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="relative h-[400px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <span className="text-primary text-base font-medium">{member.role}</span>
                  {/* Social Links */}
                  <div className="flex gap-3 mt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {["linkedin-in", "x-twitter", "envelope"].map((icon) => (
                      <a
                        key={icon}
                        href="#"
                        className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-all"
                      >
                        <i className={`fa-${icon === "envelope" ? "solid" : "brands"} fa-${icon} text-sm`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Career CTA */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex items-center justify-between flex-wrap gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">Want to join our team?</h3>
            <p className="text-white/60 text-lg">We&apos;re always looking for talented individuals.</p>
          </div>
          <a
            href="/contact"
            className="btn group pr-1 pl-7.5 bg-white text-secondary border border-white hover:border-primary relative overflow-hidden"
          >
            <span className="button-flair" />
            <span className="font-semibold z-1 relative group-hover:text-white transition-colors duration-500">View Careers</span>
            <span className="inline-flex justify-center items-center size-10 ml-2.5 rounded-full bg-primary text-white z-1 relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
