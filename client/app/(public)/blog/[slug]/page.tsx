export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { getBlogBySlug, getBlogPosts } from "@/actions/blog";
import { buildEntityMetadata } from "@/lib/seo/buildMetadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  return buildEntityMetadata(post, {
    path: `/blog/${slug}`,
    fallbackTitle: "Blog Post | PikoNox Blog",
  });
}

export default async function BlogPostDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getBlogPosts(),
  ]);
  if (!post) notFound();
  const relatedPosts = allPosts.filter((p: any) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Breadcrumb 
        title={post.title} 
        subtitle={`Written by ${post.author || "Admin"} on ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}`}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container max-w-4xl">
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary font-bold mb-12 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          <div className="relative rounded-[40px] overflow-hidden shadow-2xl mb-16">
            <img 
              src={post.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"} 
              alt={post.imageAlt?.trim() || post.title} 
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            
            {/* Sidebar Meta */}
            <div className="col-span-12 lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-10">
                <div>
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Published</h4>
                  <p className="text-secondary font-black flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Author</h4>
                  <p className="text-secondary font-black flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    {post.author || "Admin"}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Share</h4>
                  <div className="flex items-center gap-3">
                    {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                      <button key={idx} className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="col-span-12 lg:col-span-9">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl lg:text-2xl font-bold text-secondary mb-10 leading-relaxed italic border-l-4 border-primary pl-8 py-4 bg-blue-50/30 rounded-r-2xl">
                  {post.excerpt}
                </p>
                
                <div 
                  className="text-lg text-secondary/80 font-medium leading-loose space-y-8 prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags/Categories */}
              <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center gap-4">
                <span className="text-sm font-black text-secondary/40 uppercase tracking-widest mr-2">Tags:</span>
                {["Technology", "Future", "AI", post.category || "General"].map((tag) => (
                  <span key={tag} className="px-5 py-2.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container max-w-5xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-secondary">More Articles</h2>
              <Link href="/blog" className="text-primary font-bold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                All Posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((p: any) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"}
                      alt={p.imageAlt?.trim() || p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-widest mb-2 block">{p.category}</span>
                  <h3 className="font-black text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

