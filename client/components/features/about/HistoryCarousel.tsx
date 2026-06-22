"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type HistorySlide = {
  thumbYear: string;
  badge: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HistoryCarouselData = {
  ribbon?: string;
  title?: string;
  thumbYears?: string[];
  slides?: HistorySlide[];
};

const FALLBACK_SLIDES: HistorySlide[] = [
  {
    thumbYear: "2020",
    badge: "Established 2020",
    title: "The Beginning of Innovation",
    body: "Our story began in a small co-working space with a big dream: to revolutionize the creative landscape. Armed with passion and fresh ideas, we launched our first campaign, earning our first major client within months.",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/about-us/pic9.png",
    imageAlt: "History",
    ctaLabel: "Join Our Journey",
    ctaHref: "/team",
  },
  {
    thumbYear: "2022",
    badge: "Growth Phase 2022",
    title: "The Strategic Spark",
    body: "We spearheaded a digital revolution, embracing cutting-edge analytical tools. This year marked our transition into a full-fledged modern consulting powerhouse, scaling fast.",
    image: "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/about-us/pic10.png",
    imageAlt: "History",
    ctaLabel: "Explore More",
    ctaHref: "/team",
  },
];

export default function HistoryCarousel({ data }: { data?: HistoryCarouselData | null }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const ribbon = data?.ribbon ?? "Our Legacy";
  const heading = data?.title ?? "Our Journey Through Time";
  const slides = data?.slides?.length ? data.slides : FALLBACK_SLIDES;
  const thumbYears =
    data?.thumbYears?.length ? data.thumbYears : Array.from(new Set(slides.map((s) => s.thumbYear)));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -z-10 rounded-l-[100px]"></div>

      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-primary"></span>
            <span className="text-sm font-black text-primary uppercase tracking-widest">{ribbon}</span>
            <span className="w-12 h-0.5 bg-primary"></span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-secondary leading-tight">{heading}</h2>
        </div>

        <div className="relative select-none">
          <Swiper
            modules={[Thumbs]}
            allowTouchMove={true}
            spaceBetween={30}
            onSwiper={setMainSwiper}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="items-center"
          >
            {slides.map((slide, slideIdx) => (
              <SwiperSlide key={`${slide.title}-${slideIdx}`}>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <div className="order-2 lg:order-1">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                      {slide.badge}
                    </span>
                    <h4 className="text-3xl lg:text-4xl font-black mb-6 text-secondary tracking-tight">{slide.title}</h4>
                    <p className="text-lg text-secondary/70 font-medium mb-10 leading-relaxed">{slide.body}</p>
                    <Link
                      href={slide.ctaHref}
                      className="group flex items-center bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white pl-7 pr-1.5 py-1.5 rounded-full transition-all duration-300 w-fit"
                    >
                      <span className="font-bold text-[15px] tracking-wide mr-4">{slide.ctaLabel}</span>
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white group-hover:bg-white group-hover:text-secondary transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </Link>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-xl"></div>
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="relative w-full h-[400px] object-cover rounded-[32px] shadow-2xl border-4 border-white"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mt-16 border-t border-gray-100 pt-10">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => mainSwiper?.slidePrev()}
                className="size-14 rounded-full border-2 border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => mainSwiper?.slideNext()}
                className="size-14 rounded-full border-2 border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full sm:max-w-md">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView="auto"
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className="pxl-swiper-thumbs"
              >
                {thumbYears.map((year, idx) => (
                  <SwiperSlide key={`${year}-${idx}`} className="!w-auto cursor-pointer pxl-swiper-slide thumb-item opacity-40 [&.swiper-slide-thumb-active]:opacity-100">
                    <div className="px-6 py-3 rounded-2xl border-2 border-transparent [&.swiper-slide-thumb-active]:border-primary/20 [&.swiper-slide-thumb-active]:bg-primary/5 transition-all">
                      <span className="text-xl font-black text-secondary">{year}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
