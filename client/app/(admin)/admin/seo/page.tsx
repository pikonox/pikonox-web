export const dynamic = "force-dynamic";

import { getListingSeo } from "@/actions/siteSeo";
import ListingSeoClient from "./ListingSeoClient";

export default async function AdminListingSeoPage() {
  const [blog, services, products, work] = await Promise.all([
    getListingSeo("seo-blog"),
    getListingSeo("seo-services"),
    getListingSeo("seo-products"),
    getListingSeo("seo-work"),
  ]);

  const norm = (x: { metaTitle?: string; metaDescription?: string; metaKeywords?: string }) => ({
    metaTitle: x.metaTitle ?? "",
    metaDescription: x.metaDescription ?? "",
    metaKeywords: x.metaKeywords ?? "",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing pages SEO</h1>
      <p className="text-gray-600 text-sm mb-8 max-w-2xl">
        Edit meta titles and descriptions for main index pages. Detail pages (each blog post, service, etc.) are edited
        on those items&apos; own admin forms under SEO & accessibility.
      </p>
      <ListingSeoClient
        initial={{
          "seo-blog": norm(blog),
          "seo-services": norm(services),
          "seo-products": norm(products),
          "seo-work": norm(work),
        }}
      />
    </div>
  );
}
