import { getSection } from "@/actions/homepage";
import { getServices } from "@/actions/services";
import { getBlogPosts } from "@/actions/blog";
import { getFAQs } from "@/actions/faqs";
import { getTestimonials } from "@/actions/testimonials";
import HeroBanner from "@/components/features/home/HeroBanner";
import WhatWeDoSection from "@/components/features/home/WhatWeDoSection";
import AboutSection from "@/components/features/home/AboutSection";
import ServicesSection from "@/components/features/home/ServicesSection";
import TechStackSection from "@/components/features/home/TechStackSection";
import DevelopmentProcessSection from "@/components/features/home/DevelopmentProcessSection";
import FAQSection from "@/components/features/home/FAQSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";
import BlogSection from "@/components/features/home/BlogSection";

type Block = { type: string; enabled?: boolean; key?: string };

const FALLBACK_BLOCKS: Block[] = [
  { type: "hero", enabled: true, key: "hero" },
  { type: "whatWeDo", enabled: true, key: "whatwedo" },
  { type: "about", enabled: true, key: "home-about" },
  { type: "services", enabled: true },
  { type: "techStack", enabled: true, key: "home-techstack" },
  { type: "devProcess", enabled: true, key: "home-devprocess" },
  { type: "faq", enabled: true },
  { type: "testimonials", enabled: true },
  { type: "consultation", enabled: true, key: "contact" },
  { type: "blog", enabled: true },
];

export default async function HomePageRenderer() {
  const layout = await getSection("page-home-layout");
  const blocks: Block[] = Array.isArray(layout?.sections) && layout.sections.length > 0 ? layout.sections : FALLBACK_BLOCKS;

  const [heroData, whatweDoData, homeAbout, homeTech, homeDev, contactData, services, blogs, faqs, testimonials] =
    await Promise.all([
      getSection("hero"),
      getSection("whatwedo"),
      getSection("home-about"),
      getSection("home-techstack"),
      getSection("home-devprocess"),
      getSection("contact"),
      getServices(),
      getBlogPosts(),
      getFAQs(),
      getTestimonials(),
    ]);

  const nodes: React.ReactNode[] = [];
  let i = 0;
  for (const block of blocks) {
    if (block.enabled === false) continue;
    const k = `${block.type}-${i++}`;
    switch (block.type) {
      case "hero":
        nodes.push(<HeroBanner key={k} data={heroData} />);
        break;
      case "whatWeDo":
        nodes.push(<WhatWeDoSection key={k} data={whatweDoData} />);
        break;
      case "about":
        nodes.push(<AboutSection key={k} data={homeAbout} />);
        break;
      case "services":
        nodes.push(<ServicesSection key={k} initialServices={services} />);
        break;
      case "techStack":
        nodes.push(<TechStackSection key={k} data={homeTech} />);
        break;
      case "devProcess":
        nodes.push(<DevelopmentProcessSection key={k} data={homeDev} />);
        break;
      case "faq":
        nodes.push(<FAQSection key={k} initialFaqs={faqs} />);
        break;
      case "testimonials":
        nodes.push(<TestimonialsSection key={k} initialTestimonials={testimonials} />);
        break;
      case "consultation":
        nodes.push(<ConsultationSection key={k} data={contactData} />);
        break;
      case "blog":
        nodes.push(<BlogSection key={k} initialBlogs={blogs} />);
        break;
      default:
        break;
    }
  }

  return <>{nodes}</>;
}
