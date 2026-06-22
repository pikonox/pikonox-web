export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { TrendingUp, Target, ArrowRight, ArrowLeft, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/features/home/FAQSection";
import { getPortfolioBySlug, getPortfolios } from "@/actions/portfolio";
import { getFAQs } from "@/actions/faqs";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";

const DEFAULT_STATS = [
  { value: "99%", label: "Efficiency Boost" },
  { value: "100%", label: "Security Uptime" },
  { value: "2.5X", label: "Faster Delivery" },
];
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPortfolioBySlug(slug);
  return buildEntityMetadata(
    study
      ? {
          title: study.title,
          description: study.description,
          metaTitle: study.metaTitle,
          metaDescription: study.metaDescription,
          metaKeywords: study.metaKeywords,
          canonicalPath: study.canonicalPath,
          ogImage: study.ogImage,
          image: study.image,
        }
      : null,
    { path: `/work/${slug}`, fallbackTitle: "Case Study | PikoNox" },
  );
}

export default async function CaseStudyDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const [study, allPortfolio, faqs] = await Promise.all([
    getPortfolioBySlug(slug),
    getPortfolios(),
    getFAQs(),
  ]);

  if (!study) notFound();

  const otherStudies = allPortfolio.filter((s: any) => s.slug !== slug).slice(0, 2);

  const stats =
    Array.isArray(study.outcomeStats) && study.outcomeStats.length > 0
      ? study.outcomeStats
      : DEFAULT_STATS;

  const gallery = Array.isArray(study.gallery) ? study.gallery : [];

  return (
    <>
      <Breadcrumb 
        title={study.title} 
        subtitle={`Success Story: ${study.client}`}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -z-10 rounded-l-[100px]"></div>

        <div className="container">
          
          <Link 
            href="/work" 
            className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-12 hover:-translate-x-2 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <div className="relative rounded-[60px] overflow-hidden shadow-2xl mb-24 group">
            <img 
              src={study.image || FALLBACK_IMG} 
              alt={study.imageAlt?.trim() || study.title} 
              className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent flex items-end p-8 lg:p-20">
              <div className="grid grid-cols-12 w-full gap-8 items-end">
                <div className="col-span-12 lg:col-span-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em]">
                      {study.category || "General"}
                    </span>
                    <span className="text-white/60 font-bold text-sm">Project Completion: {study.date || "2026"}</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-0">
                    Transforming Digital <br className="hidden sm:block"/> Presence for <span className="text-primary">{study.client}</span>
                  </h2>
                </div>
                <div className="col-span-12 lg:col-span-4 lg:text-right">
                   <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-left">
                      <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">Key Achievement</p>
                      <p className="text-3xl font-black text-primary">Success</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-10 lg:gap-20">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 hover:border-primary/20 transition-all group">
                    <div className="size-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                       <Target className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4">The Challenge</h3>
                    <p className="text-secondary/70 font-medium leading-relaxed">
                       {study.description}
                    </p>
                 </div>
                 
                 <div className="bg-blue-50 rounded-[40px] p-10 border border-blue-100 hover:border-primary/20 transition-all group">
                    <div className="size-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                       <TrendingUp className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-4">Our Strategy</h3>
                    <p className="text-secondary/70 font-medium leading-relaxed">
                       By implementing a multi-layered AI approach, we optimized their data processing engines and introduced automated security frameworks for 24/7 reliability.
                    </p>
                 </div>
              </div>

              <div className="prose prose-lg max-w-none mb-16">
                <h3 className="text-3xl font-black text-secondary mb-8">Implementation Process</h3>
                <div 
                  className="text-lg text-secondary/80 font-medium leading-loose space-y-8 prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: study.content || "" }}
                />
              </div>

              {gallery.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-black text-secondary mb-6">Project gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((g: { url: string; alt?: string }, i: number) => (
                      <div key={`${g.url}-${i}`} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                        <img
                          src={g.url || FALLBACK_IMG}
                          alt={g.alt?.trim() || study.imageAlt?.trim() || study.title}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-secondary rounded-[48px] p-10 lg:p-16 text-white relative overflow-hidden mb-16">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <h3 className="text-3xl font-black mb-10 relative z-10">The Final Outcome</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10 text-center sm:text-left">
                    {stats.map((row: { value: string; label: string }, idx: number) => (
                      <div
                        key={`${row.label}-${idx}`}
                        className={idx > 0 ? "sm:border-l sm:border-white/10 sm:pl-8" : ""}
                      >
                        <p className="text-primary text-4xl font-black mb-2">{row.value}</p>
                        <p className="text-white/60 font-bold uppercase tracking-widest text-xs">{row.label}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="col-span-12 lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-32">
                 <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">The Client</h4>
                      <p className="text-2xl font-black text-secondary leading-tight">{study.client}</p>
                    </div>
                    <div className="pt-8 border-t border-gray-200">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Industry</h4>
                      <p className="text-xl font-bold text-secondary/80">{study.category || "General"}</p>
                    </div>
                    <div className="pt-8 border-t border-gray-200">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Services Used</h4>
                      <div className="flex flex-wrap gap-2">
                         {["AI Consulting", "Cloud Architecture", "DevOps"].map(tag => (
                           <span key={tag} className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-bold text-secondary">
                              {tag}
                           </span>
                         ))}
                      </div>
                    </div>
                    
                    <Link 
                      href="/contact" 
                      className="w-full bg-primary hover:bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25"
                    >
                      Start Your Project
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                 </div>

                 {/* Social Share */}
                 <div className="flex items-center justify-center gap-4 py-4">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">Share Case:</span>
                    {[BarChart3, ShieldCheck, Zap].map((Icon, idx) => (
                      <button key={idx} className="size-10 rounded-full border border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all">
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Related Studies */}
          <div className="mt-32 pt-24 border-t border-gray-100">
             <div className="flex items-center justify-between mb-16">
                <div>
                   <h2 className="text-4xl font-black text-secondary mb-4">View More Success Stories</h2>
                   <p className="text-secondary/60 font-medium">Explore how we helped other industry leaders achieve their goals.</p>
                </div>
                <Link href="/work" className="hidden sm:flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-1 transition-transform">
                   All Projects <ArrowRight className="w-4 h-4" />
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {otherStudies.map((s: any) => (
                  <Link key={s.id} href={`/work/${s.slug}`} className="group block">
                     <div className="relative rounded-[40px] overflow-hidden aspect-video mb-8">
                        <img src={s.image || FALLBACK_IMG} alt={s.imageAlt?.trim() || s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors" />
                     </div>
                     <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3">{s.category || "General"}</h4>
                     <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">{s.title}</h3>
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </section>

      <FAQSection initialFaqs={faqs} />
    </>
  );
}
