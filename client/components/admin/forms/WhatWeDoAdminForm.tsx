"use client";

import { useState, useTransition } from "react";
import { updateSection } from "@/actions/homepage";
import ImageUploader from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

interface WhatWeDoItem {
  title: string;
  description: string;
  caption: string;
  image: string;
  imageHover: string;
}

interface WhatWeDoData {
  badge?: string;
  headingPrefix?: string;
  highlight1?: string;
  highlight2?: string;
  headingSuffix?: string;
  items?: WhatWeDoItem[];
}

interface Props {
  data: WhatWeDoData;
}

export default function WhatWeDoAdminForm({ data }: Props) {
  const [pending, startTransition] = useTransition();
  const [badge, setBadge] = useState(data.badge ?? "");
  const [headingPrefix, setHeadingPrefix] = useState(data.headingPrefix ?? "");
  const [highlight1, setHighlight1] = useState(data.highlight1 ?? "");
  const [highlight2, setHighlight2] = useState(data.highlight2 ?? "");
  const [headingSuffix, setHeadingSuffix] = useState(data.headingSuffix ?? "");
  const [items, setItems] = useState<WhatWeDoItem[]>(
    data.items ?? [{ title: "", description: "", caption: "", image: "", imageHover: "" }]
  );

  function setItem(i: number, k: keyof WhatWeDoItem, v: string) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [k]: v } : item)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { title: "", description: "", caption: "", image: "", imageHover: "" },
    ]);
  }

  function removeItem(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSection("whatwedo", {
        badge,
        headingPrefix,
        highlight1,
        highlight2,
        headingSuffix,
        items,
      });
      if (res.success) toast.success("What We Do section saved!");
      else toast.error(res.error ?? "Failed to save");
    });
  }

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">Section Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Badge Text</label>
            <input
              className={input}
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Our Services"
            />
          </div>
          <div>
            <label className={label}>Heading Prefix</label>
            <input
              className={input}
              value={headingPrefix}
              onChange={(e) => setHeadingPrefix(e.target.value)}
              placeholder="Text before highlighted words"
            />
          </div>
          <div>
            <label className={label}>Highlight Word 1</label>
            <input
              className={input}
              value={highlight1}
              onChange={(e) => setHighlight1(e.target.value)}
              placeholder="First highlighted word"
            />
          </div>
          <div>
            <label className={label}>Highlight Word 2</label>
            <input
              className={input}
              value={highlight2}
              onChange={(e) => setHighlight2(e.target.value)}
              placeholder="Second highlighted word"
            />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Heading Suffix</label>
            <input
              className={input}
              value={headingSuffix}
              onChange={(e) => setHeadingSuffix(e.target.value)}
              placeholder="Text after highlighted words"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Service Items</h2>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Item {i + 1}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Title</label>
                  <input
                    className={input}
                    value={item.title}
                    onChange={(e) => setItem(i, "title", e.target.value)}
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <label className={label}>Caption</label>
                  <input
                    className={input}
                    value={item.caption}
                    onChange={(e) => setItem(i, "caption", e.target.value)}
                    placeholder="Short caption"
                  />
                </div>
              </div>
              <div>
                <label className={label}>Description</label>
                <textarea
                  rows={2}
                  className={input}
                  value={item.description}
                  onChange={(e) => setItem(i, "description", e.target.value)}
                  placeholder="Service description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploader
                  label="Image"
                  value={item.image}
                  onChange={(v) => setItem(i, "image", v)}
                  width={800}
                />
                <ImageUploader
                  label="Image (Hover)"
                  value={item.imageHover}
                  onChange={(v) => setItem(i, "imageHover", v)}
                  width={800}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save What We Do Section"}
        </button>
      </div>
    </form>
  );
}
