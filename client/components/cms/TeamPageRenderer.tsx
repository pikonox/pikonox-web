import { getSection } from "@/actions/homepage";
import { getTeamMembers } from "@/actions/team";
import { getFAQs } from "@/actions/faqs";
import TeamSection from "@/components/features/home/TeamSection";
import BrandSwiper from "@/components/features/about/BrandSwiper";
import FAQSection from "@/components/features/home/FAQSection";

const DEFAULT_LAYOUT = ["team", "brandStrip", "faq"];

export default async function TeamPageRenderer() {
  const page = await getSection("page-team");
  const layout: string[] = Array.isArray(page?.layout) && page.layout.length > 0 ? page.layout : DEFAULT_LAYOUT;
  const brands = Array.isArray(page?.brands) ? page.brands : [];

  const [team, faqs] = await Promise.all([getTeamMembers(), getFAQs()]);

  const nodes: React.ReactNode[] = [];
  let i = 0;
  for (const step of layout) {
    const k = `team-${step}-${i++}`;
    switch (step) {
      case "team":
        nodes.push(<TeamSection key={k} initialTeam={team} />);
        break;
      case "brandStrip":
        nodes.push(
          <div key={k} className="bg-gray-50 py-12">
            <BrandSwiper initialBrands={brands} />
          </div>,
        );
        break;
      case "faq":
        nodes.push(<FAQSection key={k} initialFaqs={faqs} />);
        break;
      default:
        break;
    }
  }
  return <>{nodes}</>;
}
