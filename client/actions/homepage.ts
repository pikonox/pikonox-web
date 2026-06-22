"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { readFileSync } from "fs";
import path from "path";

// Default data for each section (used if DB has no entry yet)
function getDefaultData(key: string): any {
  try {
    const filePath = path.join(process.cwd(), "data", `${key}.json`);
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}

export async function getSection(key: string) {
  try {
    const row = await prisma.siteSection.findUnique({ where: { key } });
    if (row) return JSON.parse(row.data);
    // First time: return defaults from JSON file (but don't save yet)
    return getDefaultData(key);
  } catch {
    return getDefaultData(key);
  }
}

export async function updateSection(key: string, data: any) {
  try {
    await prisma.siteSection.upsert({
      where: { key },
      update: { data: JSON.stringify(data) },
      create: { key, data: JSON.stringify(data) },
    });
    revalidatePath("/");
    revalidatePath("/admin/site-cms");
    revalidatePath("/admin/homepage/" + key);
    if (key === "page-home-layout" || key.startsWith("home-")) revalidatePath("/");
    if (key === "page-about" || key.startsWith("about-")) revalidatePath("/about");
    if (key === "page-team") revalidatePath("/team");
    if (key === "page-faq") revalidatePath("/faq");
    if (key === "page-contact") revalidatePath("/contact");
    if (key === "page-blog") revalidatePath("/blog");
    if (key === "page-services") revalidatePath("/services");
    if (key === "page-products") revalidatePath("/products");
    if (key === "page-work") revalidatePath("/work");
    if (key === "page-guest-post") revalidatePath("/guest-post");
    if (key === "page-built-by") revalidatePath("/built-by");
    if (key === "site-header" || key === "site-footer") {
      [
        "/",
        "/about",
        "/blog",
        "/contact",
        "/faq",
        "/guest-post",
        "/products",
        "/services",
        "/team",
        "/work",
        "/built-by",
      ].forEach((path) => revalidatePath(path));
    }
    if (key.startsWith("seo-")) {
      revalidatePath("/blog");
      revalidatePath("/services");
      revalidatePath("/products");
      revalidatePath("/work");
    }
    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("updateSection error:", msg);
    return { success: false, error: msg };
  }
}
