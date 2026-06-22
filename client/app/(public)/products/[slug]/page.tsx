export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { CheckCircle2, Star, ShieldCheck, Zap, Globe } from "lucide-react";
import { getProductBySlug } from "@/actions/products";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return buildEntityMetadata(
    product
      ? {
          title: product.name,
          description: product.description,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
          metaKeywords: product.metaKeywords,
          canonicalPath: product.canonicalPath,
          ogImage: product.ogImage,
          image: product.image,
        }
      : null,
    { path: `/products/${slug}`, fallbackTitle: "Product | PikoNox Products" },
  );
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const thumbs =
    Array.isArray(product.gallery) && product.gallery.length > 0
      ? product.gallery.slice(0, 6)
      : [
          { url: product.image || FALLBACK_IMG, alt: product.imageAlt?.trim() || product.name },
          { url: product.image || FALLBACK_IMG, alt: product.imageAlt?.trim() || product.name },
          { url: product.image || FALLBACK_IMG, alt: product.imageAlt?.trim() || product.name },
        ];

  return (
    <>
      <Breadcrumb 
        title={product.name} 
        subtitle={`${product.category || "General"} - ${product.price || "Contact for Pricing"}`}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          
          <div className="grid grid-cols-12 gap-10 lg:gap-24 mb-24">
            {/* Gallery Column */}
            <div className="col-span-12 lg:col-span-6">
              <div className="sticky top-32 space-y-6">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50 group">
                  <img 
                    src={product.image || FALLBACK_IMG} 
                    alt={product.imageAlt?.trim() || product.name} 
                    className="w-full h-[600px] object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {thumbs.map((g: { url: string; alt?: string }, i: number) => (
                    <div key={`${g.url}-${i}`} className="rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary transition-colors cursor-pointer">
                      <img src={g.url || FALLBACK_IMG} alt={g.alt?.trim() || product.name} className="w-full h-24 object-cover opacity-60 hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info Column */}
            <div className="col-span-12 lg:col-span-6">
              <div className="mb-8 flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest">
                  {product.category || "General"}
                </span>
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-secondary font-black text-lg">4.9 (120 reviews)</span>
                </div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-secondary mb-6 leading-tight">
                Empower Your Business <br/> with <span className="text-primary">{product.name}</span>
              </h2>

              <p className="text-xl text-secondary/70 font-medium leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="bg-gray-50 rounded-[32px] p-8 mb-10 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Starting from</p>
                    <p className="text-4xl font-black text-secondary">{product.price || "TBA"}</p>
                  </div>
                  <button className="bg-primary hover:bg-blue-600 text-white font-black px-10 py-4.5 rounded-2xl shadow-xl shadow-primary/25 transition-all">
                    Purchase Now
                  </button>
                </div>

                {product.features?.length > 0 && (
                  <div className="space-y-4">
                    {product.features.map((feature: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="font-bold text-secondary">{feature.title || feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: ShieldCheck, title: "Enterprise Grade", desc: "Military level security standards" },
                  { icon: Zap, title: "Ultra Fast", desc: "Optimized for performance" },
                  { icon: Globe, title: "Global Access", desc: "Available worldwide 24/7" },
                  { icon: Star, title: "Award Winning", desc: "Best SaaS tool of 2025" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group">
                    <div className="size-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-secondary mb-1">{item.title}</h4>
                      <p className="text-xs font-medium text-secondary/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-secondary rounded-[60px] p-10 lg:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-0"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-12 gap-10 items-center">
                <div className="col-span-12 lg:col-span-7">
                  <h3 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
                    Why Industry Leaders <br/> Choose {product.name}
                  </h3>
                  <div className="space-y-8">
                    <div 
                      className="text-xl text-white/70 font-medium leading-relaxed prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.content || product.description }}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-2xl font-black mb-2 text-primary">High Efficiency</h4>
                        <p className="text-white/60 font-medium">Reduce manual workloads by up to 60% with automated AI insights.</p>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black mb-2 text-primary">Rapid Integration</h4>
                        <p className="text-white/60 font-medium">Deploy and integrate with your existing tech stack in minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-5">
                   <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 border border-white/20">
                      <p className="text-2xl font-bold italic mb-10 leading-relaxed text-white/90">
                        &quot;PikoNox&apos;s product transformed our data orchestration overnight. It&apos;s intuitive, powerful, and remarkably fast.&quot;
                      </p>
                      <div className="flex items-center gap-4">
                        <img src="https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/avatar/pic1.png" className="size-14 rounded-full border-2 border-primary" alt="Client" />
                        <div>
                          <p className="font-black">Michael Chen</p>
                          <p className="text-xs font-bold text-primary">CTO, Global Tech Inc.</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

