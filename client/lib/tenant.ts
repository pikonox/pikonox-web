import { getSession } from "@/lib/auth";

export async function getTenantId(): Promise<string> {
  const session = await getSession();
  if (!session?.companyId) throw new Error("Unauthorized: no tenant context");
  return session.companyId;
}

export async function getTenantSession() {
  const session = await getSession();
  if (!session?.companyId) return null;
  return session;
}
