export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FaqPageRenderer from "@/components/cms/FaqPageRenderer";
import { getSection } from "@/actions/homepage";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-faq");
  return metadataFromShell(page, "/faq", {
    title: "FAQs | PikoNox - Common Questions",
    description:
      "Find answers to frequently asked questions about PikoNox's services, processes, and technology solutions.",
  });
}

export default async function FAQPage() {
  const page = await getSection("page-faq");
  const bc = page?.breadcrumb ?? {
    title: "Frequently Asked Questions",
    subtitle:
      "Have questions? We have answers. Explore our FAQ section to learn more about how we work and what we can do for your business.",
  };

  return (
    <>
      <Breadcrumb title={bc.title} subtitle={bc.subtitle} />
      <FaqPageRenderer />
    </>
  );
}
