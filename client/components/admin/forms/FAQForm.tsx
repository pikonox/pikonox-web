"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createFAQ, updateFAQ } from "@/actions/faqs";
import RichEditor from "@/components/admin/RichEditor";
import toast from "react-hot-toast";

interface Props {
  item?: any;
}

export default function FAQForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    question: item?.question ?? "",
    answer: item?.answer ?? "",
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
        ? await updateFAQ(item.id, form)
        : await createFAQ(form);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/faqs");
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
      <div>
        <label className={label}>Question *</label>
        <input
          required
          className={input}
          value={form.question}
          onChange={(e) => set("question", e.target.value)}
          placeholder="Frequently asked question..."
        />
      </div>

      <div>
        <label className={label}>Answer *</label>
        <RichEditor
          value={form.answer}
          onChange={(v) => set("answer", v)}
          placeholder="Detailed answer to the question..."
          minHeight={200}
        />
      </div>

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
          {pending ? "Saving..." : item ? "Update FAQ" : "Create FAQ"}
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
