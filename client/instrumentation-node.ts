import { mkdir } from "fs/promises";
import path from "path";

export async function register() {
  const uploadsDir =
    process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadsDir, { recursive: true });
    console.log(`[uploads] Directory ready: ${uploadsDir}`);
  } catch {
    // Already exists
  }
}
