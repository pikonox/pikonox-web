"use server";

import { prisma } from "@/lib/db";
import { parseGalleryJson } from "@/lib/cms/gallery";
import { revalidatePath } from "next/cache";

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parsePortfolio(item: any) {
  if (!item) return item;
  return {
    ...item,
    gallery: parseGalleryJson(item.gallery),
    outcomeStats: safeJson(item.outcomeStats),
  };
}

function safeJson(value?: string | null) {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function getPortfolios(activeOnly = true) {
  try {
    const items = await prisma.portfolio.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
    });
    return items.map(parsePortfolio);
  } catch {
    return [];
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    return parsePortfolio(await prisma.portfolio.findUnique({ where: { slug } }));
  } catch {
    return null;
  }
}

export async function getPortfolioById(id: string) {
  return prisma.portfolio.findUnique({ where: { id } });
}

export async function createPortfolio(data: any) {
  try {
    const slug = slugify(data.title);
    await prisma.portfolio.create({ data: { ...data, slug } });
    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updatePortfolio(id: string, data: any) {
  try {
    const before = await prisma.portfolio.findUnique({ where: { id }, select: { slug: true } });
    const row = await prisma.portfolio.update({ where: { id }, data });
    revalidatePath("/work");
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    if (before?.slug) revalidatePath(`/work/${before.slug}`);
    if (row.slug && row.slug !== before?.slug) revalidatePath(`/work/${row.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deletePortfolio(id: string) {
  try {
    const before = await prisma.portfolio.findUnique({ where: { id }, select: { slug: true } });
    await prisma.portfolio.delete({ where: { id } });
    revalidatePath("/work");
    revalidatePath("/admin/portfolio");
    if (before?.slug) revalidatePath(`/work/${before.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
