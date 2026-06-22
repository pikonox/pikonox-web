"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BRANDS = [
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/awwards.png",
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/colorlib.png",
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/envato.png",
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/fwa.png",
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/awwards.png",
  "https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/logo/colorlib.png",
];

interface Brand {
  name: string;
  logo: string;
}

export default function BrandSwiper({ initialBrands }: { initialBrands?: Brand[] }) {
  const brands = initialBrands?.length 
    ? initialBrands.map(b => b.logo)
    : BRANDS;

  return (
    <section>
      <div className="container mx-auto">
        <div className="py-7.5">
          <div className="grid grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-3 col-span-12 lg:mb-0 sm:mb-7.5 mb-2.5">
              <div className="xl:pe-18.5">
                <h3 className="text-2xxl font-semibold text-secondary">
                  Trusted by industry leaders for 20 years
                </h3>
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="brand-swiper2 items-center"
              >
                {brands.map((src, idx) => (
                  <SwiperSlide key={idx} className="lg:text-end">
                    <img src={src} alt="Brand Logo" className="block mx-auto lg:ml-auto select-none" />
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
