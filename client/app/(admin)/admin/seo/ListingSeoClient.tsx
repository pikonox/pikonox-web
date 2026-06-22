"use client";

import { useState, useTransition } from "react";
import { updateListingSeo, type ListingSeoKey } from "@/actions/siteSeo";
import toast from "react-hot-toast";

const SECTIONS: { key: ListingSeoKey; title: string; path: string }[] = [
  { key: "seo-blog", title: "Blog listing (/blog)", path: "/blog" },
  { key: "seo-services", title: "Services listing (/services)", path: "/services" },
  { key: "seo-products", title: "Products listing (/products)", path: "/products" },
  { key: "seo-work", title: "Work / portfolio (/work)", path: "/work" },
];

type SeoBlock = { metaTitle: string; metaDescription: string; metaKeywords: string };

export default function ListingSeoClient({
  initial,
}: {
  initial: Record<ListingSeoKey, SeoBlock>;
}) {
  const [data, setData] = useState(initial);
  const [pending, startTransition] = useTransition();
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  function setBlock(key: ListingSeoKey, field: keyof SeoBlock, value: string) {
    setData((p) => ({ ...p, [key]: { ...p[key], [field]: value } }));
  }

  function save(key: ListingSeoKey) {
    startTransition(async () => {
      const res = await updateListingSeo(key, data[key]);
      if (res.success) toast.success("Saved");
      else toast.error((res as { error?: string }).error ?? "Failed");
    });
  }

  return (
    <div className="space-y-8">
      {SECTIONS.map(({ key, title, path }) => (
        <div key={key} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">{title}</h2>
          <p className="text-xs text-gray-500 mb-4">Public URL: {path}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className={label}>Meta title</label>
              <input
                className={input}
                value={data[key].metaTitle}
                onChange={(e) => setBlock(key, "metaTitle", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={label}>Meta description</label>
              <textarea
                rows={3}
                className={input}
                value={data[key].metaDescription}
                onChange={(e) => setBlock(key, "metaDescription", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className={label}>Keywords (comma-separated)</label>
              <input
                className={input}
                value={data[key].metaKeywords}
                onChange={(e) => setBlock(key, "metaKeywords", e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={() => save(key)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            Save {title.split(" ")[0]}
          </button>
        </div>
      ))}
    </div>
  );
}
