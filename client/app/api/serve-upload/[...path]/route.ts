import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;
  const fileName = parts.join("/");

  // Prevent path traversal
  const resolved = path.resolve(path.join(UPLOAD_DIR, fileName));
  if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const file = await readFile(resolved);
    const ext = path.extname(fileName).toLowerCase();
    const contentType = MIME[ext] ?? "application/octet-stream";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
