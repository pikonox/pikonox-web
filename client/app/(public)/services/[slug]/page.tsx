export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { CheckCircle2, ArrowRight, MessageSquare, Phone, Mail } from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/features/home/FAQSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";
import { getServiceBySlug, getServices } from "@/actions/services";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80";

const DEFAULT_APPROACH = [
  { title: "Deep Discovery", desc: "We start by understanding your business goals and technical requirements to ensure a solid foundation." },
  { title: "Agile Implementation", desc: "Our teams work in iterative sprints, delivering value at every stage and allowing for rapid feedback." },
  { title: "Rigorous Testing", desc: "We employ automated and manual testing to ensure your solution is secure, scalable, and bug-free." },
  { title: "Continuous Support", desc: "Our relationship doesn't end at launch. We provide ongoing maintenance and strategic advice." },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return buildEntityMetadata(
    service ? {
      title: service.title,
      description: service.shortDesc,
      excerptOrDescription: service.shortDesc,
      metaTitle: service.metaTitle,
      metaDescription: service.metaDescription,
      metaKeywords: service.metaKeywords,
      canonicalPath: service.canonicalPath,
      ogImage: service.ogImage,
      image: service.image,
    } : null,
    { path: `/services/${slug}`, fallbackTitle: "Service | PikoNox" },
  );
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const [service, allServices, faqs, contactData] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getFAQs(),
    getSection("contact"),
  ]);

  if (!service) notFound();

  const approachSteps =
    Array.isArray(service.approachSteps) && service.approachSteps.length > 0
      ? service.approachSteps
      : DEFAULT_APPROACH;

  const relatedServices = allServices.filter((s: any) => s.slug !== slug).slice(0, 5);

  return (
    <>
      <Breadcrumb title={service.title} subtitle={service.shortDesc || service.title} />

      {/* ── Hero ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/8 rounded-3xl blur-3xl scale-95" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-100 aspect-4/3">
                <img
                  src={service.image || service.bgImage || FALLBACK_IMG}
                  alt={service.imageAlt?.trim() || service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-primary shadow-sm">
                  {service.icon && (service.icon.startsWith("http") || service.icon.startsWith("/")) ? (
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: service.iconBg || "#EFF6FF" }}
                    >
                      <img src={service.icon} alt="" className="w-4 h-4 object-contain" />
                    </span>
                  ) : service.icon ? (
                    <span className="text-base">{service.icon}</span>
                  ) : null}
                  PikoNox Service
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-0.5 bg-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Our Service</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-secondary leading-tight">
                {service.title}
              </h1>

              <div
                className="text-base text-secondary/65 leading-relaxed prose prose-sm prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />

              {service.features?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-blue-50/40 transition-all">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium text-secondary text-sm">{feature.title}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-white px-7 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20"
                >
                  Discuss Your Project
                  <MessageSquare className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary/70 hover:text-primary transition-colors"
                >
                  All Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach + Sidebar ── */}
      <section className="py-16 lg:py-24 bg-gray-50/60">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Approach Steps — 2/3 */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-0.5 bg-primary" />
                <h2 className="text-2xl font-bold text-secondary">Our Strategic Approach</h2>
              </div>
              <div className="space-y-8">
                {approachSteps.map((step: { title: string; desc?: string }, i: number) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-secondary mb-1.5">{step.title}</h4>
                      <p className="text-sm text-secondary/60 leading-relaxed">{step.desc ?? ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="flex flex-col gap-6">

              {/* CTA Card */}
              <div className="bg-secondary rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-primary/20" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5" />
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3">Need a Custom Solution?</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Our experts are ready to build the perfect solution for your business challenges.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Contact Quick Info */}
              {(contactData?.phone || contactData?.email) && (
                <div className="bg-white rounded-3xl p-8 ring-1 ring-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-secondary">Talk to an Expert</h3>
                  {contactData.phone && (
                    <a href={`tel:${contactData.phone}`} className="flex items-center gap-3 text-sm text-secondary/70 hover:text-primary transition-colors">
                      <span className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-primary" />
                      </span>
                      {contactData.phone}
                    </a>
                  )}
                  {contactData.email && (
                    <a href={`mailto:${contactData.email}`} className="flex items-center gap-3 text-sm text-secondary/70 hover:text-primary transition-colors">
                      <span className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-primary" />
                      </span>
                      {contactData.email}
                    </a>
                  )}
                </div>
              )}

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white rounded-3xl p-8 ring-1 ring-gray-100 shadow-sm">
                  <h3 className="font-bold text-secondary mb-5">Related Services</h3>
                  <ul className="space-y-3">
                    {relatedServices.map((s: any) => (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between text-sm text-secondary/70 font-medium hover:text-primary transition-colors group py-1 border-b border-gray-50 last:border-0"
                        >
                          {s.title}
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FAQSection initialFaqs={faqs} />
      <ConsultationSection data={contactData} />
    </>
  );
}
