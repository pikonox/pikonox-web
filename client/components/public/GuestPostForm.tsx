"use client";

import { useState, useTransition } from "react";
import { submitGuestPost } from "@/actions/guestPosts";
import toast from "react-hot-toast";

export default function GuestPostForm() {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    authorName: "",
    authorEmail: "",
    authorBio: "",
    title: "",
    excerpt: "",
    content: "",
    category: "General",
    suggestedImage: "",
  });

  function set(k: keyof typeof form, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.authorName.trim() || !form.authorEmail.trim() || !form.title.trim() || !form.content.trim()) {
      toast.error("Name, email, title, and article body are required.");
      return;
    }
    startTransition(async () => {
      const res = await submitGuestPost(form);
      if (res.success) {
        toast.success("Thanks! Our editors will review your submission.");
        setForm({
          authorName: "",
          authorEmail: "",
          authorBio: "",
          title: "",
          excerpt: "",
          content: "",
          category: "General",
          suggestedImage: "",
        });
      } else toast.error(res.error ?? "Submission failed");
    });
  }

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Your name *</label>
          <input required className={input} value={form.authorName} onChange={(e) => set("authorName", e.target.value)} />
        </div>
        <div>
          <label className={label}>Email *</label>
          <input required type="email" className={input} value={form.authorEmail} onChange={(e) => set("authorEmail", e.target.value)} />
        </div>
      </div>
      <div>
        <label className={label}>Short bio (optional)</label>
        <textarea rows={2} className={input} value={form.authorBio} onChange={(e) => set("authorBio", e.target.value)} />
      </div>
      <div>
        <label className={label}>Article title *</label>
        <input required className={input} value={form.title} onChange={(e) => set("title", e.target.value)} />
      </div>
      <div>
        <label className={label}>Category</label>
        <input className={input} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Technology" />
      </div>
      <div>
        <label className={label}>Excerpt / summary</label>
        <textarea rows={3} className={input} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="2–3 sentences for listings" />
      </div>
      <div>
        <label className={label}>Featured image URL (optional)</label>
        <input className={input} value={form.suggestedImage} onChange={(e) => set("suggestedImage", e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <label className={label}>Article body * (HTML allowed)</label>
        <textarea
          rows={14}
          className={`${input} font-mono text-xs`}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="<p>Your article...</p>"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
