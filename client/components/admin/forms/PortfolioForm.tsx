"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortfolio, updatePortfolio } from "@/actions/portfolio";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import SeoFields from "@/components/admin/SeoFields";
import GalleryRowsEditor, { type GalleryRow } from "@/components/admin/GalleryRowsEditor";
import { parseGalleryJson } from "@/lib/cms/gallery";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Stat = { value: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { value: "99%", label: "Efficiency Boost" },
  { value: "100%", label: "Security Uptime" },
  { value: "2.5X", label: "Faster Delivery" },
];

interface Props {
  item?: any;
}

export default function PortfolioForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [gallery, setGallery] = useState<GalleryRow[]>(() => parseGalleryJson(item?.gallery ?? null));
  const [stats, setStats] = useState<Stat[]>(() => {
    const raw = item?.outcomeStats;
    if (Array.isArray(raw)) return raw;
    try { return JSON.parse(raw) ?? DEFAULT_STATS; } catch { return DEFAULT_STATS; }
  });
  const [form, setForm] = useState({
    title: item?.title ?? "",
    description: item?.description ?? "",
    category: item?.category ?? "",
    client: item?.client ?? "",
    date: item?.date ?? "",
    image: item?.image ?? "",
    liveUrl: item?.liveUrl ?? "",
    content: item?.content ?? "",
    isFeatured: item?.isFeatured ?? false,
    order: item?.order ?? 0,
    isActive: item?.isActive ?? true,
    metaTitle: item?.metaTitle ?? "",
    metaDescription: item?.metaDescription ?? "",
    metaKeywords: item?.metaKeywords ?? "",
    canonicalPath: item?.canonicalPath ?? "",
    ogImage: item?.ogImage ?? "",
    imageAlt: item?.imageAlt ?? "",
    bgImageAlt: "",
  });

  function set(k: string, v: any) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const galleryJson = JSON.stringify(gallery.filter((g) => g.url.trim()));
    startTransition(async () => {
      const { bgImageAlt: _b, ...rest } = form;
      const payload = { ...rest, gallery: galleryJson, outcomeStats: JSON.stringify(stats) };
      const res = item ? await updatePortfolio(item.id, payload) : await createPortfolio(payload);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed");
      }
    });
  }

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Title *</label>
          <input
            required
            className={input}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Project title"
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <input
            className={input}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="e.g. Web Development"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Client</label>
          <input
            className={input}
            value={form.client}
            onChange={(e) => set("client", e.target.value)}
            placeholder="Client name"
          />
        </div>
        <div>
          <label className={label}>Date</label>
          <input
            className={input}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            placeholder="e.g. January 2025"
          />
        </div>
      </div>

      <div>
        <label className={label}>Short Description</label>
        <textarea
          rows={2}
          className={input}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Brief project summary shown in listings..."
        />
      </div>

      <div>
        <label className={label}>Live URL</label>
        <input
          className={input}
          value={form.liveUrl}
          onChange={(e) => set("liveUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <ImageUploader label="Project Image" value={form.image} onChange={(v) => set("image", v)} width={1200} />

      <GalleryRowsEditor items={gallery} onChange={setGallery} max={12} />

      {/* Outcome Stats */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Outcome Stats</h3>
        <p className="text-xs text-gray-500">Shown in the dark stats strip on the project page.</p>
        {stats.map((s, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Stat {i + 1}</span>
              {stats.length > 1 && (
                <button type="button" onClick={() => setStats(stats.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Value</label>
                <input className={input} value={s.value} onChange={(e) => setStats(stats.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x))} placeholder="e.g. 99%" />
              </div>
              <div>
                <label className={label}>Label</label>
                <input className={input} value={s.label} onChange={(e) => setStats(stats.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder="e.g. Efficiency Boost" />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setStats([...stats, { value: "", label: "" }])} className="flex items-center gap-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg px-4 py-2.5 hover:bg-blue-50 w-full justify-center">
          <Plus className="w-4 h-4" /> Add Stat
        </button>
      </div>

      <div>
        <label className={label}>Full Content / Case Study</label>
        <RichEditor
          value={form.content}
          onChange={(v) => set("content", v)}
          placeholder="Detailed project description, process, results..."
          minHeight={300}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={label}>Order</label>
          <input
            type="number"
            className={input}
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="isFeatured"
            checked={form.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
            Featured Project
          </label>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={(e) => set("isActive", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Active (visible on site)
          </label>
        </div>
      </div>

      <SeoFields form={form} set={set} />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {pending ? "Saving..." : item ? "Update Portfolio" : "Create Portfolio"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
