"use client";

import ImageUploader from "@/components/admin/ImageUploader";

export type GalleryRow = { url: string; alt: string };

type Props = {
  items: GalleryRow[];
  onChange: (items: GalleryRow[]) => void;
  max?: number;
};

export default function GalleryRowsEditor({ items, onChange, max = 12 }: Props) {
  function update(i: number, patch: Partial<GalleryRow>) {
    const next = items.map((row, idx) => (idx === i ? { ...row, ...patch } : row));
    onChange(next);
  }

  function add() {
    if (items.length >= max) return;
    onChange([...items, { url: "", alt: "" }]);
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Gallery images</label>
        <button
          type="button"
          onClick={add}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          + Add image
        </button>
      </div>
      <p className="text-xs text-gray-500">Each image can have its own alt text for SEO and accessibility.</p>
      {items.length === 0 && (
        <p className="text-sm text-gray-400 italic">No gallery images yet. Click &quot;Add image&quot;.</p>
      )}
      <ul className="space-y-6">
        {items.map((row, i) => (
          <li key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50/80 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase">Image {i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <ImageUploader label="Image" value={row.url} onChange={(v) => update(i, { url: v })} width={1000} />
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alt text</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={row.alt}
                onChange={(e) => update(i, { alt: e.target.value })}
                placeholder="Describe this image"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
