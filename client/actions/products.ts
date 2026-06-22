"use server";

import { prisma } from "@/lib/db";
import { parseGalleryJson } from "@/lib/cms/gallery";
import { revalidatePath } from "next/cache";

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseProduct(product: any) {
  if (!product) return product;
  return {
    ...product,
    features: safeJson(product.features),
    gallery: parseGalleryJson(product.gallery),
  };
}

function safeJson(value?: string | null) {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function getProducts(activeOnly = true) {
  try {
    const products = await prisma.product.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
    });
    return products.map(parseProduct);
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return parseProduct(await prisma.product.findUnique({ where: { slug } }));
  } catch {
    return null;
  }
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function createProduct(data: any) {
  try {
    const slug = slugify(data.name);
    await prisma.product.create({ data: { ...data, slug } });
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updateProduct(id: string, data: any) {
  try {
    const before = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
    const row = await prisma.product.update({ where: { id }, data });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    if (before?.slug) revalidatePath(`/products/${before.slug}`);
    if (row.slug && row.slug !== before?.slug) revalidatePath(`/products/${row.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteProduct(id: string) {
  try {
    const before = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
    await prisma.product.delete({ where: { id } });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    if (before?.slug) revalidatePath(`/products/${before.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
