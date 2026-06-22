export const dynamic = "force-dynamic";

import { getHeaderConfig, getFooterConfig, getCapabilities, getPageConfigByKey } from "@/actions/site-config";
import { CapabilityForm, PageConfigForm } from "@/components/admin/forms/SiteSettingsForms";
import { HeaderForm } from "@/components/admin/forms/HeaderForm";
import { FooterForm } from "@/components/admin/forms/SiteSettingsForms";
import Link from "next/link";

type Tab = "header" | "footer" | "capabilities" | "pages";

const PAGE_KEYS = [
  { key: "home",     label: "Homepage" },
  { key: "about",    label: "About" },
  { key: "services", label: "Services" },
  { key: "products", label: "Products" },
  { key: "work",     label: "Portfolio / Work" },
  { key: "blog",     label: "Blog" },
  { key: "team",     label: "Team" },
  { key: "faq",      label: "FAQ" },
  { key: "contact",  label: "Contact" },
];

export default async function SiteSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const { tab, page } = await searchParams;
  const activeTab = (tab || "header") as Tab;
  const activePage = page || "home";

  const [headerConfig, footerConfig, capabilities] = await Promise.all([
    getHeaderConfig(),
    getFooterConfig(),
    getCapabilities(false),
  ]);

  // Load current SEO config for the selected page (from SiteSection)
  const pageConfig = activeTab === "pages" ? await getPageConfigByKey(activePage) : null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "header",       label: "Header" },
    { id: "footer",       label: "Footer" },
    { id: "capabilities", label: "Capabilities (What We Do)" },
    { id: "pages",        label: "Page SEO & CTA" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Control every part of your website dynamically</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/admin/site-settings?tab=${t.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">

        {activeTab === "header" && <HeaderForm config={headerConfig || undefined} />}

        {activeTab === "footer" && (
          <FooterForm config={footerConfig ? { ...footerConfig, mapImage: footerConfig.mapImage || undefined } : undefined} />
        )}

        {activeTab === "capabilities" && (
          <div className="space-y-8">
            {capabilities.length === 0 ? (
              <CapabilityForm capability={{ badge: "Our Capabilities", headingPrefix: "pikonox is a premium", highlight1: "AI Transformation", highlight2: "Digital Solutions", headingSuffix: "agency.", items: "[]", order: 0, isActive: true }} />
            ) : (
              capabilities.map((cap) => (
                <div key={cap.id} className="border-b border-gray-200 pb-8 last:border-0">
                  <CapabilityForm
                    capability={{
                      id: cap.id,
                      badge: cap.badge,
                      headingPrefix: cap.headingPrefix,
                      highlight1: cap.highlight1,
                      highlight2: cap.highlight2,
                      headingSuffix: cap.headingSuffix,
                      items: typeof cap.items === "string" ? cap.items : JSON.stringify(cap.items, null, 2),
                      order: cap.order,
                      isActive: cap.isActive,
                    }}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "pages" && (
          <div>
            {/* Page picker */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-3">
                Select a page to edit its SEO meta tags, breadcrumb text, and CTA section.
                <span className="block mt-1 text-blue-600 font-medium">
                  ✓ Changes save directly to the live website.
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {PAGE_KEYS.map((p) => (
                  <Link
                    key={p.key}
                    href={`/admin/site-settings?tab=pages&page=${p.key}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activePage === p.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* How it works info box */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700">
              <strong>How it works:</strong> The meta title and description you set here appear in Google search results for this page.
              The breadcrumb title is the large heading shown at the top of the page.
              CTA fields control the call-to-action section if the page has one.
            </div>

            <PageConfigForm
              config={{
                pageKey: activePage,
                metaTitle: pageConfig?.metaTitle || "",
                metaDescription: pageConfig?.metaDescription || "",
                metaKeywords: pageConfig?.metaKeywords || "",
                ogImage: pageConfig?.ogImage || "",
                breadcrumbTitle: pageConfig?.breadcrumbTitle || "",
                breadcrumbSubtitle: pageConfig?.breadcrumbSubtitle || "",
                ctaTitle: pageConfig?.ctaTitle || "",
                ctaDescription: pageConfig?.ctaDescription || "",
                ctaButtonLabel: pageConfig?.ctaButtonLabel || "",
                ctaButtonHref: pageConfig?.ctaButtonHref || "",
                isActive: pageConfig?.isActive ?? true,
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
