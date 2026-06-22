"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export type SeoFormFields = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalPath: string;
  ogImage: string;
  imageAlt: string;
  bgImageAlt: string;
};

type Props = {
  form: SeoFormFields;
  set: (k: string, v: string) => void;
  showBgImageAlt?: boolean;
};

export default function SeoFields({ form, set, showBgImageAlt }: Props) {
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="border border-indigo-100 rounded-xl p-5 bg-indigo-50/40 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">SEO & accessibility</h3>
        <p className="text-xs text-gray-600 mt-1">
          Optional overrides for search and social. Leave blank to fall back to the main title and excerpt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={label}>Meta title</label>
          <input
            className={input}
            value={form.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            placeholder="Browser tab & Google title"
          />
        </div>
        <div>
          <label className={label}>Canonical path</label>
          <input
            className={input}
            value={form.canonicalPath}
            onChange={(e) => set("canonicalPath", e.target.value)}
            placeholder="/blog/your-post-slug"
          />
        </div>
      </div>

      <div>
        <label className={label}>Meta description</label>
        <textarea
          rows={3}
          className={input}
          value={form.metaDescription}
          onChange={(e) => set("metaDescription", e.target.value)}
          placeholder="≈150 characters for search results"
        />
      </div>

      <div>
        <label className={label}>Meta keywords (comma-separated)</label>
        <input
          className={input}
          value={form.metaKeywords}
          onChange={(e) => set("metaKeywords", e.target.value)}
          placeholder="e.g. cloud, AI, consulting"
        />
      </div>

      <div>
        <label className={label}>Featured image alt text</label>
        <input
          className={input}
          value={form.imageAlt}
          onChange={(e) => set("imageAlt", e.target.value)}
          placeholder="Describe the main image for screen readers & SEO"
        />
      </div>

      {showBgImageAlt && (
        <div>
          <label className={label}>Background image alt (decorative ok: empty or brief)</label>
          <input
            className={input}
            value={form.bgImageAlt ?? ""}
            onChange={(e) => set("bgImageAlt", e.target.value)}
            placeholder="Optional — use empty if purely decorative"
          />
        </div>
      )}

      <ImageUploader label="Open Graph image (optional)" value={form.ogImage} onChange={(v) => set("ogImage", v)} width={1200} />
    </div>
  );
}
