"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

import { sendContactEmail } from "@/lib/mail";

export async function submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  // Trigger email notification
  await sendContactEmail(data);

  try {
    await prisma.contactSubmission.create({ data });
    revalidatePath("/contact");
    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (e: any) {
    console.error("Database submission failed, saving to fallback local JSON storage:", e.message);
    try {
      const fallbackDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(fallbackDir)) {
        fs.mkdirSync(fallbackDir, { recursive: true });
      }
      const fallbackPath = path.join(fallbackDir, "fallback-submissions.json");
      
      let submissions = [];
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf-8");
        submissions = JSON.parse(fileContent || "[]");
      }
      
      submissions.push({
        ...data,
        id: `fallback-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      
      fs.writeFileSync(fallbackPath, JSON.stringify(submissions, null, 2), "utf-8");
      return { success: true };
    } catch (fsErr: any) {
      console.error("Local storage fallback failed:", fsErr.message);
      return { success: false, error: e.message };
    }
  }
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
