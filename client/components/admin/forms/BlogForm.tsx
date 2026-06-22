"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import RichEditor from "@/components/admin/RichEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import SeoFields from "@/components/admin/SeoFields";
import toast from "react-hot-toast";

interface Props {
  item?: any;
}

export default function BlogForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    title: item?.title ?? "",
    excerpt: item?.excerpt ?? "",
    category: item?.category ?? "General",
    author: item?.author ?? "Admin",
    image: item?.image ?? "",
    content: item?.content ?? "",
    isPublished: item?.isPublished ?? true,
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
    startTransition(async () => {
      const { bgImageAlt: _b, ...payload } = form;
      const res = item ? await updateBlogPost(item.id, payload) : await createBlogPost(payload);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/blog");
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
            placeholder="Post title"
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <input
            className={input}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="e.g. Technology"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Author</label>
          <input
            className={input}
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="isPublished"
            checked={form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Published (visible on site)
          </label>
        </div>
      </div>

      <div>
        <label className={label}>Excerpt</label>
        <textarea
          rows={3}
          className={input}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="Short summary shown in blog listings..."
        />
      </div>

      <ImageUploader
        label="Featured Image"
        value={form.image}
        onChange={(v) => set("image", v)}
        width={1200}
      />

      <div>
        <label className={label}>Content *</label>
        <RichEditor
          value={form.content}
          onChange={(v) => set("content", v)}
          placeholder="Write your blog post content..."
          minHeight={350}
        />
      </div>

      <SeoFields form={form} set={set} />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {pending ? "Saving..." : item ? "Update Post" : "Create Post"}
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
