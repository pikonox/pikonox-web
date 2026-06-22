"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  try {
    await prisma.contactSubmission.create({ data });
    revalidatePath("/contact");
    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function getSubmissions() {
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markSubmissionRead(id: string) {
  await prisma.contactSubmission.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/submissions");
}

export async function deleteSubmission(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/submissions");
}
