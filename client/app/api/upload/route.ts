import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const width = parseInt((form.get("width") as string) || "1920");
    const quality = parseInt((form.get("quality") as string) || "82");

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compress with sharp
    const sharp = (await import("sharp")).default;
    const compressed = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    const name = `${Date.now()}-${file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()}.webp`;

    // Respect UPLOAD_DIR env — same as instrumentation.ts
    const uploadDir = process.env.UPLOAD_DIR ||
      path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, name), compressed);

    // Build the public URL
    const baseUrl = process.env.UPLOAD_DIR
      ? `${process.env.NEXT_PUBLIC_SITE_URL || ""}/uploads/${name}`
      : `/uploads/${name}`;

    return NextResponse.json({ url: `/uploads/${name}` });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
