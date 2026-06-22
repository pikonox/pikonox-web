"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function submitGuestPost(data: {
  authorName: string;
  authorEmail: string;
  authorBio?: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  suggestedImage?: string;
}) {
  try {
    await prisma.guestPostSubmission.create({
      data: {
        authorName: data.authorName.trim(),
        authorEmail: data.authorEmail.trim(),
        authorBio: data.authorBio?.trim() || null,
        title: data.title.trim(),
        excerpt: data.excerpt.trim(),
        content: data.content.trim(),
        category: data.category?.trim() || "General",
        suggestedImage: data.suggestedImage?.trim() || null,
      },
    });
    revalidatePath("/admin/guest-posts");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed";
    return { success: false, error: msg };
  }
}

export async function listGuestPosts(status?: string) {
  return prisma.guestPostSubmission.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getGuestPost(id: string) {
  return prisma.guestPostSubmission.findUnique({ where: { id } });
}

export async function setGuestPostStatus(id: string, status: "pending" | "approved" | "rejected" | "published", adminNotes?: string) {
  await prisma.guestPostSubmission.update({
    where: { id },
    data: { status, adminNotes: adminNotes ?? undefined },
  });
  revalidatePath("/admin/guest-posts");
  return { success: true };
}

/** Creates a draft blog post from an approved guest pitch and links the submission. */
export async function approveGuestAsBlogPost(id: string) {
  try {
    const g = await prisma.guestPostSubmission.findUnique({ where: { id } });
    if (!g) return { success: false, error: "Not found" };
    if (g.status === "rejected") return { success: false, error: "Submission was rejected" };
    if (g.blogPostId) return { success: false, error: "Already converted to a blog draft" };

    let slug = slugify(g.title);
    const exists = await prisma.blogPost.findUnique({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now().toString(36)}`;

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: g.title,
        excerpt: g.excerpt,
        content: g.content,
        author: g.authorName,
        category: g.category || "Guest Post",
        image: g.suggestedImage,
        isPublished: false,
      },
    });

    await prisma.guestPostSubmission.update({
      where: { id },
      data: { status: "approved", blogPostId: post.id },
    });

    revalidatePath("/admin/guest-posts");
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, blogPostId: post.id };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed";
    return { success: false, error: msg };
  }
}
