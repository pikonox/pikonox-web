export type SiteCmsPreset = {
  key: string;
  label: string;
  description: string;
  group: "global" | "home" | "pages" | "marketing";
};

export const SITE_CMS_PRESETS: SiteCmsPreset[] = [
  {
    key: "site-header",
    label: "Header & navigation",
    description: "Brand, desktop/mobile navigation, header CTA, and support links.",
    group: "global",
  },
  {
    key: "site-footer",
    label: "Footer & legal",
    description: "Footer CTA, quick links, locations, socials, and copyright copy.",
    group: "global",
  },
  {
    key: "page-home-layout",
    label: "Home page shell",
    description: "Home SEO fields plus section order for homepage composition.",
    group: "home",
  },
  {
    key: "home-about",
    label: "Home about strip",
    description: "Short homepage intro block and supporting metrics or proof.",
    group: "home",
  },
  {
    key: "home-techstack",
    label: "Home tech stack",
    description: "Scrolling technology badges and supporting copy for homepage.",
    group: "home",
  },
  {
    key: "home-devprocess",
    label: "Home development process",
    description: "Process copy, cards, and sequence shown on homepage.",
    group: "home",
  },
  {
    key: "page-about",
    label: "About page shell",
    description: "SEO, breadcrumb copy, and section layout for About page.",
    group: "pages",
  },
  {
    key: "about-history",
    label: "About history strip",
    description: "Timeline and supporting company-story content for About page.",
    group: "pages",
  },
  {
    key: "about-why",
    label: "About why-choose-us",
    description: "Reasons, proof points, and supporting text for About page.",
    group: "pages",
  },
  {
    key: "page-team",
    label: "Team page shell",
    description: "SEO and breadcrumb copy for Team page.",
    group: "pages",
  },
  {
    key: "page-faq",
    label: "FAQ page shell",
    description: "SEO and breadcrumb copy for FAQ page.",
    group: "pages",
  },
  {
    key: "page-contact",
    label: "Contact page shell",
    description: "SEO, breadcrumb, and form-intro copy for Contact page.",
    group: "pages",
  },
  {
    key: "page-blog",
    label: "Blog index shell",
    description: "Breadcrumb and supporting copy for the blog listing page.",
    group: "pages",
  },
  {
    key: "page-services",
    label: "Services index shell",
    description: "Breadcrumb and supporting copy for the services listing page.",
    group: "pages",
  },
  {
    key: "page-products",
    label: "Products index shell",
    description: "Breadcrumb and supporting copy for the products listing page.",
    group: "pages",
  },
  {
    key: "page-work",
    label: "Work index shell",
    description: "Breadcrumb and CTA copy for the work / portfolio listing page.",
    group: "pages",
  },
  {
    key: "page-guest-post",
    label: "Guest post page shell",
    description: "SEO, breadcrumb, and submission intro copy for guest post page.",
    group: "pages",
  },
  {
    key: "page-built-by",
    label: "Built-by page shell",
    description: "SEO and authored-by-XiomTech page copy for the built-by page.",
    group: "pages",
  },
  {
    key: "seo-blog",
    label: "Listing SEO — Blog",
    description: "Meta title, description, and keywords for blog index.",
    group: "marketing",
  },
  {
    key: "seo-services",
    label: "Listing SEO — Services",
    description: "Meta title, description, and keywords for services index.",
    group: "marketing",
  },
  {
    key: "seo-products",
    label: "Listing SEO — Products",
    description: "Meta title, description, and keywords for products index.",
    group: "marketing",
  },
  {
    key: "seo-work",
    label: "Listing SEO — Work",
    description: "Meta title, description, and keywords for work / portfolio index.",
    group: "marketing",
  },
];

export const SITE_CMS_GROUP_LABELS: Record<SiteCmsPreset["group"], string> = {
  global: "Global Chrome",
  home: "Homepage",
  pages: "Page Shells",
  marketing: "Marketing / SEO",
};

export function buildSiteCmsHref(key: string) {
  return `/admin/site-cms?key=${encodeURIComponent(key)}`;
}

export function getSiteCmsPreset(key?: string | null) {
  return SITE_CMS_PRESETS.find((preset) => preset.key === key) ?? SITE_CMS_PRESETS[0];
}
