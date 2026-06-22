"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getBlogPosts(publishedOnly = true) {
  try {
    return await prisma.blogPost.findMany({
      where: publishedOnly ? { isPublished: true } : undefined,
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string, opts?: { publishedOnly?: boolean }) {
  const publishedOnly = opts?.publishedOnly !== false;
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, ...(publishedOnly ? { isPublished: true } : {}) },
    });
  } catch {
    return null;
  }
}

export async function getBlogById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function createBlogPost(data: any) {
  try {
    const slug = slugify(data.title);
    await prisma.blogPost.create({ data: { ...data, slug } });
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updateBlogPost(id: string, data: any) {
  try {
    const before = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
    const row = await prisma.blogPost.update({ where: { id }, data });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath("/");
    if (before?.slug) revalidatePath(`/blog/${before.slug}`);
    if (row.slug && row.slug !== before?.slug) revalidatePath(`/blog/${row.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteBlogPost(id: string) {
  try {
    const before = await prisma.blogPost.findUnique({ where: { id }, select: { slug: true } });
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    if (before?.slug) revalidatePath(`/blog/${before.slug}`);
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
