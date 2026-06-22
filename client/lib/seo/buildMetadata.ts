import type { Metadata } from "next";

export type SeoEntity = {
  title: string;
  /** Blog excerpt */
  excerpt?: string | null;
  excerptOrDescription?: string | null;
  /** Product / service short text */
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalPath?: string | null;
  ogImage?: string | null;
  image?: string | null;
};

function absoluteUrl(pathOrUrl: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  if (!base) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

/**
 * Builds Next.js Metadata for detail pages (blog, service, product, portfolio).
 */
export function buildEntityMetadata(
  entity: SeoEntity | null,
  opts: { path: string; fallbackTitle: string; siteName?: string }
): Metadata {
  const site = opts.siteName || "PikoNox";
  if (!entity) {
    return { title: opts.fallbackTitle };
  }

  const title = entity.metaTitle?.trim() || `${entity.title} | ${site}`;
  const rawDesc =
    entity.metaDescription?.trim() ||
    entity.excerptOrDescription?.trim() ||
    entity.excerpt?.trim() ||
    entity.description?.trim();
  const description = rawDesc ? rawDesc.slice(0, 320) : undefined;

  const keywords = entity.metaKeywords
    ?.split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const og = entity.ogImage?.trim() || entity.image?.trim() || undefined;
  const canonical = entity.canonicalPath?.trim()
    ? absoluteUrl(entity.canonicalPath.trim())
    : absoluteUrl(opts.path);

  const ogAbs = og ? absoluteUrl(og) : undefined;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical || undefined,
      siteName: site,
      type: "article",
      ...(ogAbs ? { images: [{ url: ogAbs, alt: entity.title }] } : {}),
    },
    twitter: {
      card: ogAbs ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogAbs ? { images: [ogAbs] } : {}),
    },
  };
}

export function buildListingMetadata(data: {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Metadata {
  const title = data.metaTitle?.trim() || data.fallbackTitle;
  const description = data.metaDescription?.trim() || data.fallbackDescription;
  const keywords = data.metaKeywords
    ?.split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const canonical = absoluteUrl(data.path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical || undefined,
      siteName: "PikoNox",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
