import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FAQSection from "@/components/features/home/FAQSection";
import ContactPublicForm from "@/components/public/ContactPublicForm";
import { getFAQs } from "@/actions/faqs";
import { getSection } from "@/actions/homepage";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-contact");
  return metadataFromShell(page, "/contact", {
    title: "Contact Us | PikoNox - Get In Touch",
    description:
      "Contact PikoNox for any inquiries about our services, consultations, or support. Our team is here to help you scale your business with innovative technology.",
  });
}

export default async function ContactPage() {
  const [faqs, contactData, pageShell] = await Promise.all([
    getFAQs(),
    getSection("contact"),
    getSection("page-contact"),
  ]);

  const bc = pageShell?.breadcrumb ?? {
    title: "Get In Touch",
    subtitle:
      "Ready to transform your business? Let's discuss your next project and see how our expert tech teams can help you unlock digital value.",
  };

  return (
    <>
      <Breadcrumb title={bc.title} subtitle={bc.subtitle} />
      <ContactPublicForm
        shell={{
          sidebarHeadingHtml: pageShell?.sidebarHeadingHtml,
          sidebarBody: pageShell?.sidebarBody,
          formTitle: pageShell?.formTitle,
        }}
        contactData={contactData}
      />
      <FAQSection initialFaqs={faqs} />
    </>
  );
}
