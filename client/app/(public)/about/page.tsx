export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import AboutPageRenderer from "@/components/cms/AboutPageRenderer";
import { getSection } from "@/actions/homepage";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-about");
  return metadataFromShell(page, "/about", {
    title: "About Us | PikoNox - Modern Business Consulting",
    description: "Learn more about PikoNox, our mission, visualizers, and team.",
  });
}

export default async function AboutPage() {
  const page = await getSection("page-about");
  const bc = page?.breadcrumb ?? {
    title: "About Our Agency",
    subtitle:
      "We are a hub of innovation, collaboration, and artistry, dedicated to crafting unforgettable digital experiences that resonate and inspire.",
  };

  return (
    <>
      <Breadcrumb title={bc.title} subtitle={bc.subtitle} />
      <AboutPageRenderer />
    </>
  );
}
