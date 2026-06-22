"use client";

import Image from "next/image";

export type TechItem = { name: string; url: string };

const ROW_1_DEFAULT: TechItem[] = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
];

const ROW_2_DEFAULT: TechItem[] = [
  { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
  { name: ".NET", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
  { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Vue.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
  { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

export type TechStackData = {
  titlePrimary?: string;
  titleRest?: string;
  subheading?: string;
  row1?: TechItem[];
  row2?: TechItem[];
};

export default function TechStackSection({ data }: { data?: TechStackData | null }) {
  const titlePrimary = data?.titlePrimary ?? "Yes!";
  const titleRest = data?.titleRest ?? " We cover your tech stack.";
  const subheading =
    data?.subheading ??
    "Our teams have robust expertise in almost every modern programming language, framework, and cloud infrastructure.";
  const row1 = data?.row1?.length ? data.row1 : ROW_1_DEFAULT;
  const row2 = data?.row2?.length ? data.row2 : ROW_2_DEFAULT;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
        .tech-card {
          width: 200px;
          height: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
        }
        .tech-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-color: #e2e8f0;
        }
        .marquee-gradient-left {
          background: linear-gradient(to right, white 0%, transparent 100%);
        }
        .marquee-gradient-right {
          background: linear-gradient(to left, white 0%, transparent 100%);
        }
      `}} />

      <div className="container mx-auto mb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5">
            <span className="text-primary">{titlePrimary}</span>
            {titleRest}
          </h2>
          <p className="text-lg text-gray-500 font-medium">{subheading}</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 overflow-hidden max-w-[100vw]">
        <div className="absolute top-0 left-0 w-32 h-full marquee-gradient-left z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full marquee-gradient-right z-20 pointer-events-none"></div>

        <div className="flex w-max animate-marquee-left gap-6 pr-6">
          {[...row1, ...row1].map((tech, idx) => (
            <div key={`row1-${tech.name}-${idx}`} className="tech-card">
              <Image src={tech.url} alt={tech.name} width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="font-semibold text-secondary text-[17px]">{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="flex w-max animate-marquee-right gap-6 pr-6">
          {[...row2, ...row2].map((tech, idx) => (
            <div key={`row2-${tech.name}-${idx}`} className="tech-card">
              <Image src={tech.url} alt={tech.name} width={40} height={40} className="w-10 h-10 object-contain" />
              <span className="font-semibold text-secondary text-[17px]">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
