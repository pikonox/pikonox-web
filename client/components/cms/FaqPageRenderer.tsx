import { getSection } from "@/actions/homepage";
import { getFAQs } from "@/actions/faqs";
import FAQSection from "@/components/features/home/FAQSection";
import ConsultationSection from "@/components/features/home/ConsultationSection";

const DEFAULT_LAYOUT = ["faq", "consultation"];

export default async function FaqPageRenderer() {
  const page = await getSection("page-faq");
  const layout: string[] = Array.isArray(page?.layout) && page.layout.length > 0 ? page.layout : DEFAULT_LAYOUT;

  const [faqs, contactData] = await Promise.all([getFAQs(), getSection("contact")]);

  const nodes: React.ReactNode[] = [];
  let i = 0;
  for (const step of layout) {
    const k = `faq-${step}-${i++}`;
    switch (step) {
      case "faq":
        nodes.push(<FAQSection key={k} initialFaqs={faqs} />);
        break;
      case "consultation":
        nodes.push(
          <div key={k} className="bg-gray-50">
            <ConsultationSection data={contactData} />
          </div>,
        );
        break;
      default:
        break;
    }
  }
  return <>{nodes}</>;
}
