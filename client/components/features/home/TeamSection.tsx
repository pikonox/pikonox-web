"use client";

import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Muhammad Fahad",
    role: "Founder & CTO",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/1.png",
  },
  {
    name: "Muhammad Salman",
    role: "Full Stack Developer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/2.png",
  },
  {
    name: "Muhammad Saleem",
    role: "Mern Stack Developer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/3.png",
  },
  {
    name: "Sikandar Hayat",
    role: "Sr. Mobile App Developer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/4.png",
  },
  {
    name: "Muhammad Umair",
    role: "PHP,Laravel Developer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/1.png",
  },
  {
    name: "Bilal Shahid",
    role: "Product Designer",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/team/2.png",
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
        <div className="flex items-end justify-between mb-16 flex-wrap gap-5">
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

        <div className="flex flex-col" style={{ gap: '5rem' }}>
          {/* Top Tier: 1 Member */}
          {team.length > 0 && (
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <TeamCard member={team[0]} />
              </div>
            </div>
          )}

          {/* Middle Tier: 2 Members */}
          {team.length > 1 && (
            <div className="flex justify-center gap-6 lg:gap-12 flex-wrap">
              {team.slice(1, 3).map((member) => (
                <div key={member.name} className="w-full sm:w-[calc(50%-1.5rem)] max-w-sm">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Tier: 3 Members */}
          {team.length > 3 && (
            <div className="flex justify-center gap-6 lg:gap-10 flex-wrap">
              {team.slice(3, 6).map((member) => (
                <div key={member.name} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.66rem)] max-w-sm">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          )}
        </div>

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

function TeamCard({ member }: { member: { name: string; role: string; image: string } }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer w-full shadow-lg border border-white/5">
      <div className="relative w-full" style={{ minHeight: '400px' }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-wide">{member.name}</h3>
        <span className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase">{member.role}</span>
      </div>
    </div>
  );
}
