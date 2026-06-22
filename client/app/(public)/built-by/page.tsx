import type { Metadata } from "next";
import Link from "next/link";
import { getSection } from "@/actions/homepage";

type BuiltByPageData = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  noIndex?: boolean;
  badge?: string;
  brandPrefix?: string;
  brandHighlight?: string;
  tagline?: string;
  description?: string;
  stackDescription?: string;
  developer?: {
    name?: string;
    role?: string;
    initials?: string;
    github?: string;
    email?: string;
  };
  techStack?: string[];
  primaryCta?: {
    label?: string;
    href?: string;
  };
  secondaryCta?: {
    label?: string;
    href?: string;
  };
  footerNote?: string;
};

const FALLBACK_DATA: BuiltByPageData = {
  metaTitle: "Built by XiomTech",
  metaDescription: "This website was designed and developed by XiomTech — a digital agency by Mh Miyad.",
  metaKeywords: "xiomtech, built by, web development",
  noIndex: true,
  badge: "Powered by XiomTech",
  brandPrefix: "Xiom",
  brandHighlight: "Tech",
  tagline: "Digital Solutions Agency",
  description:
    "This website was designed, developed, and deployed by XiomTech — a full-stack digital agency specializing in modern web experiences, AI-driven products, and scalable software solutions.",
  stackDescription:
    "Built with Next.js 16, Tailwind CSS v4, Prisma ORM, and PostgreSQL. Deployed on a private VPS with zero-downtime CI/CD.",
  developer: {
    name: "Mh Miyad",
    role: "Founder & Lead Engineer · XiomTech",
    initials: "M",
    github: "https://github.com/mh-miyad",
    email: "mhmiyad6565@gmail.com",
  },
  techStack: ["Next.js 16", "TypeScript", "Prisma 7", "PostgreSQL", "Tailwind v4", "TipTap", "Sharp", "Bun"],
  primaryCta: {
    label: "View GitHub Profile",
    href: "https://github.com/mh-miyad",
  },
  secondaryCta: {
    label: "Back to Website",
    href: "/",
  },
  footerNote: "This page is intentionally set to no-index.",
};

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await getSection("page-built-by")) as BuiltByPageData | null;
  const page = { ...FALLBACK_DATA, ...raw };
  const keywords = page.metaKeywords
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    ...(keywords?.length ? { keywords } : {}),
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function BuiltByPage() {
  const raw = (await getSection("page-built-by")) as BuiltByPageData | null;
  const page = {
    ...FALLBACK_DATA,
    ...raw,
    developer: { ...FALLBACK_DATA.developer, ...raw?.developer },
    primaryCta: { ...FALLBACK_DATA.primaryCta, ...raw?.primaryCta },
    secondaryCta: { ...FALLBACK_DATA.secondaryCta, ...raw?.secondaryCta },
    techStack: raw?.techStack?.length ? raw.techStack : FALLBACK_DATA.techStack,
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-24 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          {page.badge}
        </div>

        <div className="mb-8">
          <h1 className="mb-3 text-5xl font-black tracking-tight md:text-6xl">
            <span className="text-white">{page.brandPrefix}</span>
            <span className="text-blue-500">{page.brandHighlight}</span>
          </h1>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
            {page.tagline}
          </p>
        </div>

        <div className="mx-auto mb-10 h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <p className="mb-6 text-lg font-light leading-relaxed text-white/70">
          {page.description}
        </p>
        <p className="mb-12 text-base leading-relaxed text-white/50">{page.stackDescription}</p>

        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Lead Developer
          </p>
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-black">
              {page.developer?.initials}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{page.developer?.name}</h3>
              <p className="mt-0.5 text-sm text-white/50">{page.developer?.role}</p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={page.developer?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  GitHub ↗
                </a>
                <span className="text-white/20">·</span>
                <a
                  href={`mailto:${page.developer?.email}`}
                  className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  {page.developer?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {page.techStack?.map((tech) => (
            <div
              key={tech}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-white/60"
            >
              {tech}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={page.primaryCta?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {page.primaryCta?.label}
          </a>
          <Link
            href={page.secondaryCta?.href || "/"}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white"
          >
            {page.secondaryCta?.label}
          </Link>
        </div>

        <p className="mt-16 text-xs text-white/20">
          © {new Date().getFullYear()} XiomTech · {page.footerNote}
        </p>
      </div>
    </main>
  );
}
