"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import ImageUploader from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";

interface Props {
  item?: any;
}

export default function TestimonialForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: item?.name ?? "",
    text: item?.text ?? "",
    rating: item?.rating ?? 5,
    image: item?.image ?? "",
    order: item?.order ?? 0,
    isActive: item?.isActive ?? true,
  });

  function set(k: string, v: any) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = item
        ? await updateTestimonial(item.id, form)
        : await createTestimonial(form);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/testimonials");
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
          <label className={label}>Name *</label>
          <input
            required
            className={input}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Customer name"
          />
        </div>
        <div>
          <label className={label}>Rating</label>
          <select
            className={input}
            value={form.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
          >
            <option value={5}>5 — Excellent</option>
            <option value={4}>4 — Very Good</option>
            <option value={3}>3 — Good</option>
            <option value={2}>2 — Fair</option>
            <option value={1}>1 — Poor</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Testimonial Text *</label>
        <textarea
          required
          rows={4}
          className={input}
          value={form.text}
          onChange={(e) => set("text", e.target.value)}
          placeholder="What did the customer say..."
        />
      </div>

      <ImageUploader
        label="Customer Photo"
        value={form.image}
        onChange={(v) => set("image", v)}
        width={400}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {pending ? "Saving..." : item ? "Update Testimonial" : "Create Testimonial"}
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
