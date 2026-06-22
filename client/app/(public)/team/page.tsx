export const revalidate = 60;

import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import TeamPageRenderer from "@/components/cms/TeamPageRenderer";
import { getSection } from "@/actions/homepage";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-team");
  return metadataFromShell(page, "/team", {
    title: "Our Team | PikoNox - Meet the Experts",
    description: "Meet the brilliant minds behind PikoNox. Our diverse team of designers, developers, and strategists are dedicated to your success.",
  });
}

export default async function TeamPage() {
  const page = await getSection("page-team");
  const bc = page?.breadcrumb ?? {
    title: "Meet Our Experts",
    subtitle:
      "Our team is our greatest asset. We combine expertise from various fields to deliver exceptional digital experiences and strategic growth.",
  };

  return (
    <>
      <Breadcrumb title={bc.title} subtitle={bc.subtitle} />
      <TeamPageRenderer />
    </>
  );
}
