"use client";

import { updateSection } from "@/actions/homepage";
import ImageUploader from "@/components/admin/ImageUploader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Brand = { name: string; logo: string };

const DEFAULT_BRANDS: Brand[] = [
  { name: "React", logo: "" },
  { name: "Next.js", logo: "" },
  { name: "TypeScript", logo: "" },
  { name: "Node.js", logo: "" },
  { name: "PostgreSQL", logo: "" },
  { name: "AWS", logo: "" },
];

export default function TechStackAdminForm({ data }: { data?: { title?: string; subtitle?: string; brands?: Brand[] } }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [brands, setBrands] = useState<Brand[]>(() =>
    data?.brands?.length ? data.brands : DEFAULT_BRANDS
  );
  const [form, setForm] = useState({
    title: data?.title ?? "Technologies We Use",
    subtitle: data?.subtitle ?? "We work with the latest and most reliable technologies to build powerful solutions.",
  });

  function addBrand() { setBrands([...brands, { name: "", logo: "" }]); }
  function removeBrand(i: number) { setBrands(brands.filter((_, idx) => idx !== i)); }
  function updateBrand(i: number, k: keyof Brand, v: string) {
    setBrands(brands.map((b, idx) => idx === i ? { ...b, [k]: v } : b));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSection("home-techstack", {
        title: form.title,
        subtitle: form.subtitle,
        brands: brands.filter((b) => b.name.trim()),
      });
      if (res.success) {
        toast.success("Tech stack updated!");
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed");
      }
    });
  }

  const lbl = "block text-sm font-medium text-gray-700 mb-1";
  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Heading */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Section Heading</h3>
        <div>
          <label className={lbl}>Title</label>
          <input className={inp} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Technologies We Use" />
        </div>
        <div>
          <label className={lbl}>Subtitle</label>
          <textarea rows={2} className={inp} value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} />
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Technology Brands</h3>
        <p className="text-xs text-gray-500">Add a logo image URL or upload one for each technology.</p>
        {brands.map((b, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Brand {i + 1}</span>
              <button type="button" onClick={() => removeBrand(i)} className="text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className={lbl}>Name</label>
              <input className={inp} value={b.name} onChange={(e) => updateBrand(i, "name", e.target.value)} placeholder="e.g. React" />
            </div>
            <ImageUploader label="Logo" value={b.logo} onChange={(v) => updateBrand(i, "logo", v)} width={200} />
          </div>
        ))}
        <button type="button" onClick={addBrand} className="flex items-center gap-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg px-4 py-2.5 hover:bg-blue-50 w-full justify-center transition-colors">
          <Plus className="w-4 h-4" /> Add Technology
        </button>
      </div>

      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors">
        {pending ? "Saving..." : "Save Tech Stack"}
      </button>
    </form>
  );
}
