import type { Metadata } from "next";
import { buildListingMetadata } from "@/lib/seo/buildMetadata";

type Shell = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

export function metadataFromShell(
  shell: Shell | null | undefined,
  path: string,
  fallbacks: { title: string; description: string },
): Metadata {
  return buildListingMetadata({
    metaTitle: shell?.metaTitle,
    metaDescription: shell?.metaDescription,
    metaKeywords: shell?.metaKeywords,
    path,
    fallbackTitle: fallbacks.title,
    fallbackDescription: fallbacks.description,
  });
}
