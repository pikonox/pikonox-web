export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { ArrowRight, Briefcase, TrendingUp, Target, Plus } from "lucide-react";
import FAQSection from "@/components/features/home/FAQSection";
import BrandSwiper from "@/components/features/about/BrandSwiper";
import { getPortfolios } from "@/actions/portfolio";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-work"), getSection("page-work")]);
  return buildListingMetadata({
    metaTitle: seo.metaTitle || page?.metaTitle,
    metaDescription: seo.metaDescription || page?.metaDescription,
    metaKeywords: seo.metaKeywords || page?.metaKeywords,
    path: "/work",
    fallbackTitle: "Our Work | PikoNox Case Studies",
    fallbackDescription:
      "Explore our portfolio of successful projects and case studies. See how PikoNox has helped businesses across various industries achieve their digital goals.",
  });
}

export default async function WorkPage() {
  const [portfolio, faqs, page] = await Promise.all([
    getPortfolios(),
    getFAQs(),
    getSection("page-work"),
  ]);
  const brands: any[] = [];
  const bc = page?.breadcrumb ?? {
    title: "Case Studies & Projects",
    subtitle:
      "A showcase of our most impactful work. From complex cloud architectures to innovative AI solutions, explore how we drive real-world results.",
  };
  const cta = page?.cta ?? {
    title: "Have a Project in Mind? Let's Build it Together.",
    description:
      "Our expert team is ready to help you navigate your digital transformation journey with precision and innovation.",
    buttonLabel: "Start Your Journey",
    buttonHref: "/contact",
  };

  return (
    <>
      <Breadcrumb 
        title={bc.title}
        subtitle={bc.subtitle}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-12 gap-y-16 lg:gap-12">
            {portfolio.map((study: any, idx: number) => (
              <div key={study.id} className="col-span-12 lg:col-span-6 group">
                <div className="relative h-full bg-white rounded-[48px] p-4 border border-gray-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative rounded-[40px] overflow-hidden aspect-[16/10] mb-8 group-hover:shadow-2xl transition-all duration-700">
                    <img 
                      src={study.image || FALLBACK_IMG} 
                      alt={study.imageAlt?.trim() || study.title} 
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-secondary text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">
                        {study.category || "General"}
                      </span>
                    </div>

                    {/* Plus Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-20">
                        <Link href={`/work/${study.slug}`} className="size-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                           <Plus className="w-10 h-10" />
                        </Link>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="px-6 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        Client: <span className="text-secondary">{study.client}</span>
                      </span>
                    </div>

                    <Link href={`/work/${study.slug}`}>
                      <h3 className="text-3xl lg:text-4xl font-black text-secondary mb-5 hover:text-primary transition-colors leading-[1.2]">
                        {study.title}
                      </h3>
                    </Link>

                    <p className="text-lg text-secondary/60 font-medium mb-10 line-clamp-2 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Results Footer */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Impact Generated</p>
                        <div className="flex items-center gap-2 text-primary font-black text-xl">
                          <TrendingUp className="w-5 h-5" />
                          <span>Success</span>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/work/${study.slug}`}
                        className="group/btn flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        Explore Case
                        <div className="size-12 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                           <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-32 bg-secondary rounded-[60px] p-12 lg:p-20 relative overflow-hidden text-center">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                 {cta.title}
               </h2>
               <p className="text-xl text-white/60 font-medium mb-12 leading-relaxed">
                 {cta.description}
               </p>
               <Link href={cta.buttonHref || "/contact"} className="inline-flex items-center bg-primary hover:bg-blue-600 text-white font-black px-12 py-5 rounded-full shadow-2xl shadow-primary/25 transition-all text-lg tracking-wide uppercase group">
                  {cta.buttonLabel}
                  <Plus className="w-6 h-6 ml-3 group-hover:rotate-90 transition-transform duration-300" />
               </Link>
             </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
        <BrandSwiper initialBrands={brands} />
      </div>
      <FAQSection initialFaqs={faqs} />
    </>
  );
}


