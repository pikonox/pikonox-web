"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/actions/services";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import SeoFields from "@/components/admin/SeoFields";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type Feature = { title: string; content: string };
type Step = { title: string; desc: string };

const DEFAULT_FEATURES: Feature[] = [
  { title: "Benefit one", content: "Short detail" },
  { title: "Benefit two", content: "" },
];
const DEFAULT_STEPS: Step[] = [
  { title: "Deep Discovery", desc: "We align on goals and technical requirements." },
  { title: "Agile Implementation", desc: "Iterative delivery with rapid feedback." },
  { title: "Rigorous Testing", desc: "Automated and manual QA for reliability." },
  { title: "Continuous Support", desc: "Maintenance and strategic advice after launch." },
];

function parseArr<T>(raw: any, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw;
  try { return JSON.parse(raw) ?? fallback; } catch { return fallback; }
}

export default function ServiceForm({ service }: { service?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [features, setFeatures] = useState<Feature[]>(() =>
    parseArr(service?.features, DEFAULT_FEATURES)
  );
  const [steps, setSteps] = useState<Step[]>(() =>
    parseArr(service?.approachSteps, DEFAULT_STEPS)
  );
  const [form, setForm] = useState({
    title: service?.title ?? "",
    shortDesc: service?.shortDesc ?? "",
    description: service?.description ?? "",
    icon: service?.icon ?? "",
    iconBg: service?.iconBg ?? "#EFF6FF",
    image: service?.image ?? "",
    bgImage: service?.bgImage ?? "",
    order: service?.order ?? 0,
    isActive: service?.isActive ?? true,
    metaTitle: service?.metaTitle ?? "",
    metaDescription: service?.metaDescription ?? "",
    metaKeywords: service?.metaKeywords ?? "",
    canonicalPath: service?.canonicalPath ?? "",
    ogImage: service?.ogImage ?? "",
    imageAlt: service?.imageAlt ?? "",
    bgImageAlt: service?.bgImageAlt ?? "",
  });

  function set(k: string, v: any) { setForm((p) => ({ ...p, [k]: v })); }

  // Features helpers
  function addFeature() { setFeatures([...features, { title: "", content: "" }]); }
  function removeFeature(i: number) { setFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, k: keyof Feature, v: string) {
    setFeatures(features.map((f, idx) => idx === i ? { ...f, [k]: v } : f));
  }

  // Steps helpers
  function addStep() { setSteps([...steps, { title: "", desc: "" }]); }
  function removeStep(i: number) { setSteps(steps.filter((_, idx) => idx !== i)); }
  function updateStep(i: number, k: keyof Step, v: string) {
    setSteps(steps.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        ...form,
        features: JSON.stringify(features),
        approachSteps: JSON.stringify(steps),
      };
      const res = service ? await updateService(service.id, payload) : await createService(payload);
      if (res.success) {
        toast.success(service ? "Updated!" : "Created!");
        router.push("/admin/services");
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
        <div>
          <label className={lbl}>Title *</label>
          <input required className={inp} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Service title" />
        </div>

        {/* Icon Editor */}
        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50 space-y-4">
          <div className="flex items-center gap-4">
            {/* Live preview */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-200 overflow-hidden"
              style={{ backgroundColor: form.iconBg }}
            >
              {form.icon && (form.icon.startsWith("http") || form.icon.startsWith("/")) ? (
                <img src={form.icon} alt="icon" className="w-10 h-10 object-contain" />
              ) : form.icon ? (
                <span className="text-3xl leading-none">{form.icon}</span>
              ) : (
                <span className="text-gray-300 text-2xl">?</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700 mb-1">Service Icon</p>
              <p className="text-xs text-gray-400">Upload an image, paste a URL, or type an emoji. Set background color below.</p>
            </div>
          </div>
          <ImageUploader label="Icon Image (upload or paste URL)" value={form.icon.startsWith("http") || form.icon.startsWith("/") ? form.icon : ""} onChange={(v) => set("icon", v)} width={200} quality={90} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Or type emoji</label>
              <input className={inp} value={form.icon.startsWith("http") || form.icon.startsWith("/") ? "" : form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. 🤖 or 💡" />
            </div>
            <div>
              <label className={lbl}>Icon Background Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={form.iconBg} onChange={(e) => set("iconBg", e.target.value)} className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer p-1" />
                <input className={`${inp} flex-1`} value={form.iconBg} onChange={(e) => set("iconBg", e.target.value)} placeholder="#EFF6FF" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className={lbl}>Short Description (card)</label>
          <textarea rows={2} className={inp} value={form.shortDesc} onChange={(e) => set("shortDesc", e.target.value)} placeholder="Brief summary shown on cards" />
        </div>
        <div>
          <label className={lbl}>Full Description (detail page)</label>
          <RichEditor value={form.description} onChange={(v) => set("description", v)} minHeight={250} />
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader label="Card Image (homepage)" value={form.image} onChange={(v) => set("image", v)} width={800} />
          <ImageUploader label="Background Image (hover)" value={form.bgImage} onChange={(v) => set("bgImage", v)} width={1920} />
        </div>
      </div>

      {/* Feature Bullets */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Feature Bullets</h3>
        <p className="text-xs text-gray-500">Shown as bullet points on the service listing page.</p>
        {features.map((f, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Feature {i + 1}</span>
              {features.length > 1 && (
                <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 transition-colors">
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

      {/* Approach Steps */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Strategic Approach Steps</h3>
        <p className="text-xs text-gray-500">Shown on the service detail page.</p>
        {steps.map((s, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step {i + 1}</span>
              {steps.length > 1 && (
                <button type="button" onClick={() => removeStep(i)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <label className={lbl}>Step Title</label>
              <input className={inp} value={s.title} onChange={(e) => updateStep(i, "title", e.target.value)} placeholder="e.g. Deep Discovery" />
            </div>
            <div>
              <label className={lbl}>Description</label>
              <input className={inp} value={s.desc} onChange={(e) => updateStep(i, "desc", e.target.value)} placeholder="What happens in this step" />
            </div>
          </div>
        ))}
        <button type="button" onClick={addStep} className={addBtn}>
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={lbl}>Order</label>
            <input type="number" className={inp} value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
          </div>
        </div>
      </div>

      <SeoFields form={form} set={set} showBgImageAlt />

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors">
          {pending ? "Saving..." : service ? "Update Service" : "Create Service"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
