"use server";

import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const userName = formData.get("userName") as string;
  const password = formData.get("password") as string;

  if (userName === "admin" && password === "123456") {
    await createSession("admin", "admin", "default");
    redirect("/admin");
  }

  return "Invalid credentials.";
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
