"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTeamMembers(activeOnly = true) {
  try {
    return await prisma.teamMember.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getTeamMemberById(id: string) {
  return prisma.teamMember.findUnique({ where: { id } });
}

export async function createTeamMember(data: any) {
  try {
    await prisma.teamMember.create({ data });
    revalidatePath("/team"); revalidatePath("/admin/team");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function updateTeamMember(id: string, data: any) {
  try {
    await prisma.teamMember.update({ where: { id }, data });
    revalidatePath("/team"); revalidatePath("/admin/team");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/team"); revalidatePath("/admin/team");
    return { success: true };
  } catch (e: any) { return { success: false, error: e.message }; }
}
