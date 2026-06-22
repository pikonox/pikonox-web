export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import FAQSection from "@/components/features/home/FAQSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";
import { getServices } from "@/actions/services";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-services"), getSection("page-services")]);
  return buildListingMetadata({
    metaTitle: seo.metaTitle || page?.metaTitle,
    metaDescription: seo.metaDescription || page?.metaDescription,
    metaKeywords: seo.metaKeywords || page?.metaKeywords,
    path: "/services",
    fallbackTitle: "Services | PikoNox - Innovative Tech Solutions",
    fallbackDescription:
      "Explore our wide range of software development, cloud infrastructure, and AI/ML services designed for modern enterprises.",
  });
}

export default async function ServicesPage() {
  const [services, faqs, contactData, page] = await Promise.all([
    getServices(),
    getFAQs(),
    getSection("contact"),
    getSection("page-services"),
  ]);
  const bc = page?.breadcrumb ?? {
    title: "Our Services",
    subtitle:
      "Empowering your business with cutting-edge technology and strategic innovation. We deliver scalable solutions tailored to your unique challenges.",
  };

  return (
    <>
      <Breadcrumb 
        title={bc.title}
        subtitle={bc.subtitle}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-12 gap-10 lg:gap-16">
            {services.map((service: any, idx: number) => (
              <div key={service.id} className="col-span-12 group">
                <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                      <Link href={`/services/${service.slug}`} className="relative block rounded-[32px] overflow-hidden border-8 border-white shadow-xl">
                        <img 
                          src={service.image || FALLBACK_IMG} 
                          alt={service.imageAlt?.trim() || service.title} 
                          className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-0.5 bg-primary"></span>
                        <span className="text-sm font-black text-primary uppercase tracking-widest">Service 0{idx + 1}</span>
                      </div>
                      
                      <Link href={`/services/${service.slug}`}>
                        <h2 className="text-3xl lg:text-4xl font-black text-secondary mb-6 hover:text-primary transition-colors leading-tight">
                          {service.title}
                        </h2>
                      </Link>
                      
                      <div className="text-lg text-secondary/70 font-medium leading-relaxed mb-8 prose prose-sm" dangerouslySetInnerHTML={{ __html: service.shortDesc || service.description }} />

                      {service.features?.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                          {service.features.map((feature: any, i: number) => (
                            <li key={i} className="flex items-center gap-2 font-bold text-secondary/80 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              {feature.title}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group/link"
                      >
                        Explore Service Details
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection initialFaqs={faqs} />
      <ConsultationSection data={contactData} />
    </>
  );
}


