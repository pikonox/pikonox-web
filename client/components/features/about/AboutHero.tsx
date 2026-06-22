
export default function AboutHero() {
  return (
    <section className=" ">
      <div className="">
        <div className=" px-8 py-20 lg:px-16 lg:py-30 grid grid-cols-12 gap-10 items-center relative overflow-hidden shadow-2xl">
          <div className="lg:col-span-7 col-span-12 lg:order-[0] order-1 lg:pr-10 z-10">
            <div className="w-full">
              <h2 className="2xl:text-6xl xl:text-5xl lg:text-4xxl sm:text-4xl text-3xl font-bold headline text-white sm:mb-8 mb-4 leading-tight">
                Where Imagination Meets Strategy
              </h2>
              <div
                className="flex gap-3 2xl:mb-33.75 sm:mb-12.5 mb-5 md:flex-row flex-col wow fadeInLeft"
                data-wow-delay="0.8s"
              >
                <div className="min-w-22.5">
                  <h6 className="text-lg font-medium text-white">
                    About Us
                  </h6>
                </div>
                <div className="min-w-20 h-px md:mt-3.75 bg-white/30"></div>
                <div className="2xl:ps-10 sm:ps-5 border-l-2 border-white/20">
                  <p
                    className="sm:text-xl text-lg font-normal text-white/90 wow fadeInLeft"
                    data-wow-delay="1s"
                  >
                    Welcome to the space where creativity knows no bounds. Our
                    agency is a hub of innovation, collaboration, and artistry,
                    dedicated to crafting unforgettable campaigns that resonate
                    and inspire.
                  </p>
                </div>
              </div>
              <div
                className="flex sm:gap-10 gap-5 wow fadeInLeft"
                data-wow-delay="1s"
              >
                <button type="button" className="cursor-pointer">
                  <img
                    src="https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/about-us/pic8.png"
                    alt="img"
                    className="rounded-2xl w-40 h-auto object-cover border-2 border-white/20"
                  />
                </button>
                <div className="flex flex-col">
                  <button
                    data-type="youtube"
                    data-src="https://www.youtube.com/embed/tVphpcFHGaI"
                    className="flex flex-col flex-1 text-start cursor-pointer group"
                  >
                    <span className="sm:size-16 size-12 flex shrink-0 items-center justify-center rounded-full bg-white text-primary duration-500 group-hover:bg-secondary group-hover:text-white sm:mb-4 mb-2 shadow-xl transition-all hover:scale-110">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                    <span className="text-lg block text-white font-medium">
                      Watch Now
                    </span>
                  </button>
                  <span className="sm:text-sm text-xs block text-white/70 max-w-42.5 mt-2">
                    The Visionaries Behind the Brands
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 col-span-12 relative z-10 w-full">
            <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src="https://plexify.dexignzone.com/tailwind/business-consulting/assets/images/about-us/pic7.png"
                alt="img"
                className="w-full lg:h-[500px] h-[350px] object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
