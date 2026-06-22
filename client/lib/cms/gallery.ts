/** Parse portfolio/product gallery JSON: legacy string[] or [{ url, alt }]. */
export function parseGalleryJson(raw: string | null | undefined): { url: string; alt: string }[] {
  if (!raw?.trim()) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item: unknown) => {
      if (typeof item === "string") return { url: item, alt: "" };
      if (item && typeof item === "object" && "url" in item) {
        const o = item as { url: string; alt?: string };
        return { url: String(o.url), alt: o.alt ? String(o.alt) : "" };
      }
      return null;
    })
    .filter((x): x is { url: string; alt: string } => Boolean(x?.url));
}
