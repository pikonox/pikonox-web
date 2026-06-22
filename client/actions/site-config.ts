"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

function safeJson(value?: string | null, fallback: any = null) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

// ── Header Config ───────────────────────────────────────────────────
export async function getHeaderConfig() {
  try {
    const config = await prisma.headerConfig.findFirst({ where: { isActive: true } });
    if (!config) return null;
    return {
      ...config,
      navItems: safeJson(config.navItems, []),
      socialLinks: safeJson(config.socialLinks, []),
    };
  } catch {
    return null;
  }
}

export async function saveHeaderConfig(data: {
  brandPrefix?: string;
  brandSuffix?: string;
  brandHref?: string;
  phone?: string;
  email?: string;
  ctaLabel?: string;
  ctaHref?: string;
  navItems?: string;
  socialLinks?: string;
  isActive?: boolean;
}) {
  try {
    const existing = await prisma.headerConfig.findFirst();
    const createData = {
      brandPrefix: data.brandPrefix || "Web",
      brandSuffix: data.brandSuffix || "Xprt",
      brandHref: data.brandHref || "/",
      phone: data.phone || "",
      email: data.email || "",
      ctaLabel: data.ctaLabel || "Let's Connect",
      ctaHref: data.ctaHref || "/contact",
      navItems: data.navItems || "[]",
      socialLinks: data.socialLinks || "[]",
      isActive: data.isActive ?? true,
    };
    if (existing) {
      await prisma.headerConfig.update({ where: { id: existing.id }, data: createData });
    } else {
      await prisma.headerConfig.create({ data: createData });
    }
    revalidatePath("/");
    revalidatePath("/admin/site-settings");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ── Footer Config ───────────────────────────────────────────────────
export async function getFooterConfig() {
  try {
    const config = await prisma.footerConfig.findFirst({ where: { isActive: true } });
    if (!config) return null;
    return {
      ...config,
      locations: safeJson(config.locations, []),
      footerLinks: safeJson(config.footerLinks, []),
      contactCta: safeJson(config.contactCta, { eyebrow: "", label: "", href: "" }),
      socialLinks: safeJson(config.socialLinks, []),
    };
  } catch {
    return null;
  }
}

export async function saveFooterConfig(data: {
  ctaTitle?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  mapImage?: string;
  locations?: string;
  footerLinks?: string;
  contactCta?: string;
  socialLinks?: string;
  copyrightBrand?: string;
  copyrightText?: string;
  isActive?: boolean;
}) {
  try {
    const existing = await prisma.footerConfig.findFirst();
    const createData = {
      ctaTitle: data.ctaTitle || "",
      ctaButtonLabel: data.ctaButtonLabel || "Free Consultation",
      ctaButtonHref: data.ctaButtonHref || "/contact",
      mapImage: data.mapImage || null,
      locations: data.locations || "[]",
      footerLinks: data.footerLinks || "[]",
      contactCta: data.contactCta || "{}",
      socialLinks: data.socialLinks || "[]",
      copyrightBrand: data.copyrightBrand || "pikonox",
      copyrightText: data.copyrightText || "All Rights Reserved",
      isActive: data.isActive ?? true,
    };
    if (existing) {
      await prisma.footerConfig.update({ where: { id: existing.id }, data: createData });
    } else {
      await prisma.footerConfig.create({ data: createData });
    }
    revalidatePath("/");
    revalidatePath("/admin/site-settings");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ── Capabilities ───────────────────────────────────────────────────
export async function getCapabilities(activeOnly = true) {
  try {
    const items = await prisma.capability.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
    return items.map((item) => ({
      ...item,
      items: safeJson(item.items, []),
    }));
  } catch {
    return [];
  }
}

export async function getCapabilityById(id: string) {
  try {
    const item = await prisma.capability.findUnique({ where: { id } });
    if (!item) return null;
    return {
      ...item,
      items: safeJson(item.items, []),
    };
  } catch {
    return null;
  }
}

export async function saveCapability(data: {
  id?: string;
  badge?: string;
  headingPrefix?: string;
  highlight1?: string;
  highlight2?: string;
  headingSuffix?: string;
  items?: string;
  order?: number;
  isActive?: boolean;
}) {
  try {
    if (data.id) {
      await prisma.capability.update({ where: { id: data.id }, data: { ...data, id: undefined } as any });
    } else {
      await prisma.capability.create({ data: { id: undefined, ...data } as any });
    }
    revalidatePath("/");
    revalidatePath("/admin/site-settings");
    revalidatePath("/admin/capabilities");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteCapability(id: string) {
  try {
    await prisma.capability.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/site-settings");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ── Homepage Sections ───────────────────────────────────────────────
export async function getHomepageSections(activeOnly = true) {
  try {
    const sections = await prisma.homepageSection.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { order: "asc" },
    });
    return sections.map((s) => ({
      ...s,
      content: safeJson(s.content, null),
    }));
  } catch {
    return [];
  }
}

export async function getHomepageSectionByKey(key: string) {
  try {
    const section = await prisma.homepageSection.findUnique({ where: { sectionKey: key } });
    if (!section) return null;
    return {
      ...section,
      content: safeJson(section.content, null),
    };
  } catch {
    return null;
  }
}

export async function saveHomepageSection(data: {
  id?: string;
  sectionKey?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  bgImage?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
  isActive?: boolean;
}) {
  try {
    if (data.id) {
      await prisma.homepageSection.update({ where: { id: data.id }, data: { ...data, id: undefined } as any });
    } else {
      await prisma.homepageSection.create({ data: { id: undefined, ...data } as any });
    }
    revalidatePath("/");
    revalidatePath("/admin/site-settings");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

// ── Page SEO / CTA ────────────────────────────────────────────────
// Each page's SEO config is stored in SiteSection (same table public pages read).
// Mapping: admin pageKey → SiteSection keys that public pages consume.
const PAGE_SECTION_KEYS: Record<string, string[]> = {
  home:     ["page-home-layout"],
  about:    ["page-about"],
  team:     ["page-team"],
  faq:      ["page-faq"],
  contact:  ["page-contact"],
  services: ["page-services", "seo-services"],
  products: ["page-products", "seo-products"],
  work:     ["page-work", "seo-work"],
  blog:     ["page-blog", "seo-blog"],
};

const PAGE_REVALIDATE: Record<string, string[]> = {
  home:     ["/"],
  about:    ["/about"],
  team:     ["/team"],
  faq:      ["/faq"],
  contact:  ["/contact"],
  services: ["/services"],
  products: ["/products"],
  work:     ["/work"],
  blog:     ["/blog"],
};

async function upsertSiteSection(key: string, data: Record<string, unknown>) {
  const existing = await prisma.siteSection.findUnique({ where: { key } });
  const merged = existing ? { ...JSON.parse(existing.data), ...data } : data;
  await prisma.siteSection.upsert({
    where: { key },
    update: { data: JSON.stringify(merged) },
    create: { key, data: JSON.stringify(merged) },
  });
}

export async function getPageConfigs() {
  // Returns all pages with their current SEO data from SiteSection
  const pageKeys = Object.keys(PAGE_SECTION_KEYS);
  const results = await Promise.all(
    pageKeys.map(async (pk) => {
      const sectionKey = PAGE_SECTION_KEYS[pk][0];
      const row = await prisma.siteSection.findUnique({ where: { key: sectionKey } });
      const d = row ? safeJson(row.data, {}) : {};
      return {
        id: pk, // use pageKey as id for display
        pageKey: pk,
        metaTitle: d.metaTitle || "",
        metaDescription: d.metaDescription || "",
        metaKeywords: d.metaKeywords || "",
        ogImage: d.ogImage || "",
        breadcrumbTitle: d.breadcrumb?.title || "",
        breadcrumbSubtitle: d.breadcrumb?.subtitle || "",
        ctaTitle: d.cta?.title || "",
        ctaDescription: d.cta?.description || "",
        ctaButtonLabel: d.cta?.buttonLabel || "",
        ctaButtonHref: d.cta?.buttonHref || "",
        isActive: d.isActive ?? true,
      };
    })
  );
  return results;
}

export async function getPageConfigByKey(key: string) {
  const sectionKey = (PAGE_SECTION_KEYS[key] || [`page-${key}`])[0];
  const row = await prisma.siteSection.findUnique({ where: { key: sectionKey } });
  const d = row ? safeJson(row.data, {}) : {};
  return {
    id: key,
    pageKey: key,
    metaTitle: d.metaTitle || "",
    metaDescription: d.metaDescription || "",
    metaKeywords: d.metaKeywords || "",
    ogImage: d.ogImage || "",
    breadcrumbTitle: d.breadcrumb?.title || "",
    breadcrumbSubtitle: d.breadcrumb?.subtitle || "",
    ctaTitle: d.cta?.title || "",
    ctaDescription: d.cta?.description || "",
    ctaButtonLabel: d.cta?.buttonLabel || "",
    ctaButtonHref: d.cta?.buttonHref || "",
    isActive: d.isActive ?? true,
  };
}

export async function savePageConfig(data: {
  id?: string;
  pageKey?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  breadcrumbTitle?: string;
  breadcrumbSubtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  isActive?: boolean;
}) {
  try {
    const pageKey = data.pageKey || "home";
    const sectionKeys = PAGE_SECTION_KEYS[pageKey] || [`page-${pageKey}`];

    const seoData = {
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
      ogImage: data.ogImage || null,
      breadcrumb: {
        title: data.breadcrumbTitle || "",
        subtitle: data.breadcrumbSubtitle || "",
      },
      cta: {
        title: data.ctaTitle || "",
        description: data.ctaDescription || "",
        buttonLabel: data.ctaButtonLabel || "",
        buttonHref: data.ctaButtonHref || "",
      },
      isActive: data.isActive ?? true,
    };

    await Promise.all(sectionKeys.map((k) => upsertSiteSection(k, seoData)));

    revalidatePath("/admin/site-settings");
    const paths = PAGE_REVALIDATE[pageKey] || [];
    paths.forEach((p) => revalidatePath(p));
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}