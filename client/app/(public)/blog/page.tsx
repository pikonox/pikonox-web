export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getBlogPosts } from "@/actions/blog";
import { getSection } from "@/actions/homepage";
import { getListingSeo } from "@/actions/siteSeo";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, page] = await Promise.all([getListingSeo("seo-blog"), getSection("page-blog")]);
  return buildListingMetadata({
    metaTitle: seo.metaTitle || page?.metaTitle,
    metaDescription: seo.metaDescription || page?.metaDescription,
    metaKeywords: seo.metaKeywords || page?.metaKeywords,
    path: "/blog",
    fallbackTitle: "Blog | PikoNox Insights",
    fallbackDescription:
      "Stay updated with the latest trends in AI, cloud computing, and digital transformation.",
  });
}

export default async function BlogPage() {
  const [blogs, page] = await Promise.all([getBlogPosts(), getSection("page-blog")]);
  const bc = page?.breadcrumb ?? {
    title: "PikoNox Insights",
    subtitle:
      "Explore our latest thoughts, guides, and industry news about the future of technology and business growth.",
  };

  return (
    <>
      <Breadcrumb 
        title={bc.title}
        subtitle={bc.subtitle}
      />

      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {blogs.map((post: any) => (
              <div key={post.id} className="col-span-12 md:col-span-6 lg:col-span-6 group">
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden rounded-[32px] mb-8 shadow-xl">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                    alt={post.imageAlt?.trim() || post.title}
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-primary text-xs font-black uppercase tracking-widest shadow-lg">
                      {post.category || "General"}
                    </span>
                  </div>
                </Link>

                <div className="px-2">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                      <Calendar className="w-4 h-4 text-primary" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                      <User className="w-4 h-4 text-primary" />
                      {post.author}
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-2xl lg:text-3xl font-black text-secondary mb-4 hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-secondary/70 font-medium mb-8 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group/btn"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


