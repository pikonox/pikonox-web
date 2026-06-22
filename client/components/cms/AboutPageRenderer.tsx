import { getSection } from "@/actions/homepage";
import { getTeamMembers } from "@/actions/team";
import { getFAQs } from "@/actions/faqs";
import { getBlogPosts } from "@/actions/blog";
import BrandSwiper from "@/components/features/about/BrandSwiper";
import HistoryCarousel from "@/components/features/about/HistoryCarousel";
import WhyChooseUs from "@/components/features/about/WhyChooseUs";
import TeamSection from "@/components/features/home/TeamSection";
import FAQSection from "@/components/features/home/FAQSection";
import BlogSection from "@/components/features/home/BlogSection";

const DEFAULT_LAYOUT = ["brandStrip", "history", "storyImage", "whyChooseUs", "team", "faq", "blog"];

export default async function AboutPageRenderer() {
  const [page, history, why, team, faqs, blogs] = await Promise.all([
    getSection("page-about"),
    getSection("about-history"),
    getSection("about-why"),
    getTeamMembers(),
    getFAQs(),
    getBlogPosts(),
  ]);

  const layout: string[] = Array.isArray(page?.layout) && page.layout.length > 0 ? page.layout : DEFAULT_LAYOUT;
  const brands = Array.isArray(page?.brands) ? page.brands : [];
  const story = page?.storyImage ?? { src: "", alt: "" };

  const nodes: React.ReactNode[] = [];
  let i = 0;
  for (const step of layout) {
    const k = `about-${step}-${i++}`;
    switch (step) {
      case "brandStrip":
        nodes.push(
          <div key={k} className="bg-white">
            <BrandSwiper initialBrands={brands} />
          </div>,
        );
        break;
      case "history":
        nodes.push(<HistoryCarousel key={k} data={history} />);
        break;
      case "storyImage":
        if (story?.src) {
          nodes.push(
            <section key={k} className="py-20 bg-white">
              <div className="container px-4">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={story.src} alt={story.alt || "Our story"} className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                </div>
              </div>
            </section>,
          );
        }
        break;
      case "whyChooseUs":
        nodes.push(<WhyChooseUs key={k} data={why} />);
        break;
      case "team":
        nodes.push(
          <div key={k} className="bg-gray-50/50">
            <TeamSection initialTeam={team} />
          </div>,
        );
        break;
      case "faq":
        nodes.push(<FAQSection key={k} initialFaqs={faqs} />);
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
