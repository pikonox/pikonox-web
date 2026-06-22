"use client";

import { useState, useTransition } from "react";
import { updateSection } from "@/actions/homepage";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

interface Slide {
  badge: string;
  headline: string;
  description: string;
}

interface SocialLink {
  label: string;
  href: string;
}

interface HeroData {
  slides?: Slide[];
  stats?: { value: string; label: string }[];
  bgVideoId?: string;
  videoUrl?: string;
  socialLinks?: SocialLink[];
}

interface Props {
  data: HeroData;
}

export default function HeroAdminForm({ data }: Props) {
  const [pending, startTransition] = useTransition();
  const [slides, setSlides] = useState<Slide[]>(
    data.slides ?? [{ badge: "", headline: "", description: "" }]
  );
  const [stats, setStats] = useState(
    data.stats ?? [{ value: "", label: "" }, { value: "", label: "" }]
  );
  const [bgVideoId, setBgVideoId] = useState(data.bgVideoId ?? "");
  const [videoUrl, setVideoUrl] = useState(data.videoUrl ?? "");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    data.socialLinks ?? [{ label: "", href: "" }]
  );

  function setSlide(i: number, k: keyof Slide, v: string) {
    setSlides((prev) => prev.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)));
  }

  function addSlide() {
    setSlides((prev) => [...prev, { badge: "", headline: "", description: "" }]);
  }

  function removeSlide(i: number) {
    setSlides((prev) => prev.filter((_, idx) => idx !== i));
  }

  function setStat(i: number, k: "value" | "label", v: string) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)));
  }

  function setSocialLink(i: number, k: keyof SocialLink, v: string) {
    setSocialLinks((prev) => prev.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)));
  }

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, { label: "", href: "" }]);
  }

  function removeSocialLink(i: number) {
    setSocialLinks((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSection("hero", { slides, stats, bgVideoId, videoUrl, socialLinks });
      if (res.success) toast.success("Hero section saved!");
      else toast.error(res.error ?? "Failed to save");
    });
  }

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const sectionTitle = "text-base font-semibold text-gray-800 mb-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Slides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={sectionTitle}>Slides</h2>
          <button
            type="button"
            onClick={addSlide}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Slide
          </button>
        </div>
        <div className="space-y-4">
          {slides.map((slide, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Slide {i + 1}
                </span>
                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlide(i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <label className={label}>Badge Text</label>
                <input
                  className={input}
                  value={slide.badge}
                  onChange={(e) => setSlide(i, "badge", e.target.value)}
                  placeholder="e.g. Award Winning Agency"
                />
              </div>
              <div>
                <label className={label}>Headline</label>
                <input
                  className={input}
                  value={slide.headline}
                  onChange={(e) => setSlide(i, "headline", e.target.value)}
                  placeholder="Main heading text"
                />
              </div>
              <div>
                <label className={label}>Description</label>
                <textarea
                  rows={2}
                  className={input}
                  value={slide.description}
                  onChange={(e) => setSlide(i, "description", e.target.value)}
                  placeholder="Supporting description text"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className={sectionTitle}>Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Stat {i + 1}
              </span>
              <div>
                <label className={label}>Value</label>
                <input
                  className={input}
                  value={stat.value}
                  onChange={(e) => setStat(i, "value", e.target.value)}
                  placeholder="e.g. 200+"
                />
              </div>
              <div>
                <label className={label}>Label</label>
                <input
                  className={input}
                  value={stat.label}
                  onChange={(e) => setStat(i, "label", e.target.value)}
                  placeholder="e.g. Projects Delivered"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Background Video ID (YouTube)</label>
          <input
            className={input}
            value={bgVideoId}
            onChange={(e) => setBgVideoId(e.target.value)}
            placeholder="e.g. dQw4w9WgXcQ"
          />
        </div>
        <div>
          <label className={label}>Play Button Video URL (YouTube embed)</label>
          <input
            className={input}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={sectionTitle}>Social Links</h2>
          <button
            type="button"
            onClick={addSocialLink}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>
        <div className="space-y-3">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  className={input}
                  value={link.label}
                  onChange={(e) => setSocialLink(i, "label", e.target.value)}
                  placeholder="Label (e.g. LinkedIn)"
                />
              </div>
              <div className="flex-1">
                <input
                  className={input}
                  value={link.href}
                  onChange={(e) => setSocialLink(i, "href", e.target.value)}
                  placeholder="URL"
                />
              </div>
              {socialLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSocialLink(i)}
                  className="mt-1 p-2 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
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
          {pending ? "Saving..." : "Save Hero Section"}
        </button>
      </div>
    </form>
  );
}
