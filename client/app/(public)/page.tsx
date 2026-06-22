// Cache homepage for 60s, revalidate in background after admin changes
export const revalidate = 60;

import type { Metadata } from "next";
import { getSection } from "@/actions/homepage";
import HomePageRenderer from "@/components/cms/HomePageRenderer";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-home-layout");
  return metadataFromShell(page, "/", {
    title: "PikoNox - Business Consulting & Digital Solutions",
    description:
      "PikoNox helps ambitious businesses scale with modern software, cloud infrastructure, AI transformation, and strategic digital execution.",
  });
}

export default function Home() {
  return <HomePageRenderer />;
}
