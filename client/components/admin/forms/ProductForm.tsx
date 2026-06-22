"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/actions/products";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import SeoFields from "@/components/admin/SeoFields";
import GalleryRowsEditor, { type GalleryRow } from "@/components/admin/GalleryRowsEditor";
import { parseGalleryJson } from "@/lib/cms/gallery";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Feature = { title: string; content: string };

const DEFAULT_FEATURES: Feature[] = [
  { title: "Enterprise security", content: "" },
  { title: "Fast onboarding", content: "" },
];

function parseArr<T>(raw: any, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw) ?? fallback; } catch { return fallback; }
}

export default function ProductForm({ item }: { item?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [gallery, setGallery] = useState<GalleryRow[]>(() =>
    item?.gallery ? parseGalleryJson(typeof item.gallery === "string" ? item.gallery : JSON.stringify(item.gallery)) : []
  );
  const [features, setFeatures] = useState<Feature[]>(() =>
    parseArr(item?.features, DEFAULT_FEATURES)
  );
  const [form, setForm] = useState({
    name: item?.name ?? "",
    description: item?.description ?? "",
    price: item?.price ?? "Contact for Pricing",
    category: item?.category ?? "",
    image: item?.image ?? "",
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

  function set(k: string, v: any) { setForm((p) => ({ ...p, [k]: v })); }

  function addFeature() { setFeatures([...features, { title: "", content: "" }]); }
  function removeFeature(i: number) { setFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, k: keyof Feature, v: string) {
    setFeatures(features.map((f, idx) => idx === i ? { ...f, [k]: v } : f));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const galleryJson = JSON.stringify(gallery.filter((g) => g.url.trim()));
    startTransition(async () => {
      const { bgImageAlt: _b, ...rest } = form;
      const payload = { ...rest, features: JSON.stringify(features), gallery: galleryJson };
      const res = item ? await updateProduct(item.id, payload) : await createProduct(payload);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/products");
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed");
      }
    });
  }

  const lbl = "block text-sm font-medium text-gray-700 mb-1";
  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const addBtn = "flex items-center gap-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg px-4 py-2.5 hover:bg-blue-50 w-full justify-center transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Product Name *</label>
            <input required className={inp} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Product name" />
          </div>
          <div>
            <label className={lbl}>Category</label>
            <input className={inp} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. SaaS, Plugin, Template" />
          </div>
          <div>
            <label className={lbl}>Price</label>
            <input className={inp} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. $49/mo or Contact for Pricing" />
          </div>
        </div>
        <div>
          <label className={lbl}>Short Description</label>
          <textarea rows={2} className={inp} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief product summary shown in listings..." />
        </div>
      </div>

      {/* Image */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Image</h3>
        <ImageUploader label="Product Image" value={form.image} onChange={(v) => set("image", v)} width={1200} />
      </div>

      <GalleryRowsEditor items={gallery} onChange={setGallery} max={8} />

      {/* Features */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Features</h3>
        {features.map((f, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Feature {i + 1}</span>
              {features.length > 1 && (
                <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Title</label>
                <input className={inp} value={f.title} onChange={(e) => updateFeature(i, "title", e.target.value)} placeholder="Feature title" />
              </div>
              <div>
                <label className={lbl}>Detail (optional)</label>
                <input className={inp} value={f.content} onChange={(e) => updateFeature(i, "content", e.target.value)} placeholder="Short description" />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addFeature} className={addBtn}>
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Full Content / Details</h3>
        <RichEditor value={form.content} onChange={(v) => set("content", v)} placeholder="Detailed product information..." minHeight={300} />
      </div>

      {/* Settings */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={lbl}>Order</label>
            <input type="number" className={inp} value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="isFeatured" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
          </div>
        </div>
      </div>

      <SeoFields form={form} set={set} />

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors">
          {pending ? "Saving..." : item ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
