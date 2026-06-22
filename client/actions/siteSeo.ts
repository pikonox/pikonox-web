"use server";

import { updateSection, getSection } from "@/actions/homepage";
import { revalidatePath } from "next/cache";

export type ListingSeoKey = "seo-blog" | "seo-services" | "seo-products" | "seo-work";

export async function getListingSeo(key: ListingSeoKey) {
  return getSection(key) as Promise<{
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  }>;
}

export async function updateListingSeo(
  key: ListingSeoKey,
  data: { metaTitle: string; metaDescription: string; metaKeywords: string }
) {
  const res = await updateSection(key, data);
  if (res.success) {
    const path =
      key === "seo-blog"
        ? "/blog"
        : key === "seo-services"
          ? "/services"
          : key === "seo-products"
            ? "/products"
            : "/work";
    revalidatePath(path);
  }
  return res;
}
