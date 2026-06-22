export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getProducts } from "@/actions/products";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-products"), getSection("page-products")]);
  return buildListingMetadata({
    metaTitle: seo.metaTitle || page?.metaTitle,
    metaDescription: seo.metaDescription || page?.metaDescription,
    metaKeywords: seo.metaKeywords || page?.metaKeywords,
    path: "/products",
    fallbackTitle: "Products | PikoNox Solutions",
    fallbackDescription:
      "Browse our premium SaaS products and tools designed to streamline your business operations.",
  });
}

export default async function ProductsPage() {
  const [products, page] = await Promise.all([getProducts(), getSection("page-products")]);
  const bc = page?.breadcrumb ?? {
    title: "Our Products",
    subtitle:
      "Discover our suite of high-performance tools and platforms built to solve complex business challenges with AI-driven precision.",
  };

  return (
    <>
      <Breadcrumb 
        title={bc.title}
        subtitle={bc.subtitle}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {products.map((product: any) => (
              <div key={product.id} className="col-span-12 md:col-span-6 group">
                <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    <Link href={`/products/${product.slug}`} className="w-full lg:w-1/2 block overflow-hidden rounded-3xl shadow-xl">
                      <img 
                        src={product.image || FALLBACK_IMG} 
                        alt={product.imageAlt?.trim() || product.name} 
                        className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </Link>

                    <div className="w-full lg:w-1/2">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest">
                          {product.category || "General"}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-secondary font-black text-sm">4.9</span>
                        </div>
                      </div>

                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-3xl font-black text-secondary mb-4 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-secondary/70 font-medium mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-secondary">
                          {product.price}
                        </span>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="size-14 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-primary transition-all shadow-lg group-hover:rotate-12"
                        >
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


