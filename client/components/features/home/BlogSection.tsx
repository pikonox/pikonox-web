"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BlogPost {
  title: string;
  category?: string;
  date?: string;
  createdAt?: string | Date;
  image?: string | null;
  excerpt: string;
  slug?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "5 Financial Strategies Every Growing Business Needs",
    category: "Finance",
    date: "June 5, 2024",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    excerpt: "Discover the essential financial strategies that drive sustainable growth for businesses of all sizes.",
  },
  {
    title: "How Digital Transformation is Reshaping Industries",
    category: "Technology",
    date: "May 28, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    excerpt: "Explore the latest trends in digital transformation and how they impact modern enterprises.",
  },
  {
    title: "The Art of Strategic Planning in Uncertain Times",
    category: "Strategy",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    excerpt: "Learn how to build resilient strategies that thrive regardless of market conditions.",
  },
  {
    title: "Maximizing ROI Through Data-Driven Decisions",
    category: "Analytics",
    date: "May 8, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    excerpt: "Unlock the power of data analytics to make smarter business decisions and maximize returns.",
  },
];

export default function BlogSection({ initialBlogs }: { initialBlogs?: BlogPost[] }) {
  const headerRef = useReveal<HTMLDivElement>({ selector: ".blog-anim", stagger: 0.12, y: 35 });

  const blogs = initialBlogs?.length ? initialBlogs : BLOG_POSTS;

  return (
    <section className="xl:py-5 pb-12 mb-14 py-12 overflow-hidden">
      <div className="container">
        <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-5">
          <div className="blog-anim max-w-2xl">
            <span className="text-primary text-base font-semibold uppercase tracking-wider mb-2 block">
              Our Blog
            </span>
            <h2 className="2xl:text-5xl lg:text-[50px] sm:text-4xl text-3xl font-semibold  text-secondary leading-tight">
              Expert Tips for Business Growth
            </h2>
          </div>
          <Link
            href="/blog"
            className="blog-anim btn group pr-1 pl-7.5 bg-white text-secondary border border-white hover:border-primary relative overflow-hidden"
          >
            <span className="button-flair" />
            <span className="font-semibold z-1 relative group-hover:text-white transition-colors duration-500">All Articles</span>
            <span className="inline-flex justify-center items-center size-10 ml-2.5 rounded-full bg-primary text-white z-1 relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
          className="overflow-visible!"
        >
          {blogs.map((post) => (
            <SwiperSlide key={post.title}>
              <article className="group bg-white dark:bg-card rounded-2xl overflow-hidden border border-bordergray dark:border-white/5 hover:border-primary transition-all duration-500 h-full">
                {/* Image */}
                <div className="relative overflow-hidden h-55">
                  <Image
                    src={post.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-1">
                    <span className="bg-primary text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {post.category || "General"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-bodytext mb-3">
                    <i className="far fa-calendar text-primary" />
                    <time>{post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "")}</time>
                    <span className="mx-1">·</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary  mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug || ""}`}>{post.title}</Link>
                  </h3>
                  <p className="text-bodytext text-base line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug || ""}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                  >
                    Read More
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 4.16666L15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
