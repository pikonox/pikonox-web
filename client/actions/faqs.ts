"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getFAQs(activeOnly = true) {
  try {
    return await prisma.fAQ.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getFAQById(id: string) {
  return prisma.fAQ.findUnique({ where: { id } });
}

export async function createFAQ(data: any) {
  try {
    await prisma.fAQ.create({ data });
    revalidatePath("/"); revalidatePath("/admin/faqs");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updateFAQ(id: string, data: any) {
  try {
    await prisma.fAQ.update({ where: { id }, data });
    revalidatePath("/"); revalidatePath("/admin/faqs");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/"); revalidatePath("/admin/faqs");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
