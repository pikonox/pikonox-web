"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTestimonials(activeOnly = true) {
  try {
    return await prisma.testimonial.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({ where: { id } });
}

export async function createTestimonial(data: any) {
  try {
    await prisma.testimonial.create({ data });
    revalidatePath("/"); revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    await prisma.testimonial.update({ where: { id }, data });
    revalidatePath("/"); revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/"); revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
