"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseService(service: any) {
  if (!service) return service;
  return {
    ...service,
    features: safeJson(service.features),
    approachSteps: safeJson(service.approachSteps),
  };
}

function safeJson(value?: string | null) {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function getServices(activeOnly = true) {
  try {
    const services = await prisma.service.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
    return services.map(parseService);
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return parseService(await prisma.service.findUnique({ where: { slug } }));
  } catch {
    return null;
  }
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

export async function createService(data: Record<string, unknown> & {
  title: string;
  shortDesc: string;
  description: string;
  order: number;
  isActive: boolean;
}) {
  try {
    const slug = slugify(data.title);
    await prisma.service.create({ data: { ...data, slug } as any });
    revalidatePath("/services");
    revalidatePath(`/services/${slug}`);
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function updateService(id: string, data: Record<string, unknown> & {
  title: string;
  shortDesc: string;
  description: string;
  order: number;
  isActive: boolean;
}) {
  try {
    const existing = await prisma.service.findUnique({ where: { id } });
    const slug = slugify(data.title as string);
    const nextSlug = existing?.slug === slug ? existing.slug : slug;
    await prisma.service.update({
      where: { id },
      data: { ...data, slug: nextSlug } as any,
    });
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/");
    if (existing?.slug) revalidatePath(`/services/${existing.slug}`);
    if (nextSlug && nextSlug !== existing?.slug) revalidatePath(`/services/${nextSlug}`);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteService(id: string) {
  try {
    const existing = await prisma.service.findUnique({ where: { id }, select: { slug: true } });
    await prisma.service.delete({ where: { id } });
    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/");
    if (existing?.slug) revalidatePath(`/services/${existing.slug}`);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
