"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  width?: number;
  quality?: number;
}

export default function ImageUploader({ value, onChange, label = "Image", width = 1920, quality = 82 }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("width", String(width));
      form.append("quality", String(quality));
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (json.url) onChange(json.url);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload below"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap ${loading ? "opacity-60 pointer-events-none" : ""}`}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {loading ? "Uploading..." : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={loading} />
        </label>
      </div>
      {value && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow hover:bg-red-50"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
