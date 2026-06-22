"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTeamMember, updateTeamMember } from "@/actions/team";
import ImageUploader from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";

interface Props {
  item?: any;
}

export default function TeamMemberForm({ item }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: item?.name ?? "",
    title: item?.title ?? "",
    bio: item?.bio ?? "",
    avatar: item?.avatar ?? "",
    email: item?.email ?? "",
    linkedin: item?.linkedin ?? "",
    twitter: item?.twitter ?? "",
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
        ? await updateTeamMember(item.id, form)
        : await createTeamMember(form);
      if (res.success) {
        toast.success(item ? "Updated!" : "Created!");
        router.push("/admin/team");
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
          <label className={label}>Full Name *</label>
          <input
            required
            className={input}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Team member name"
          />
        </div>
        <div>
          <label className={label}>Job Title / Role</label>
          <input
            className={input}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Lead Developer"
          />
        </div>
      </div>

      <div>
        <label className={label}>Bio</label>
        <textarea
          rows={3}
          className={input}
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="Short biography..."
        />
      </div>

      <ImageUploader
        label="Profile Photo"
        value={form.avatar}
        onChange={(v) => set("avatar", v)}
        width={400}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Email</label>
          <input
            type="email"
            className={input}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="member@example.com"
          />
        </div>
        <div>
          <label className={label}>LinkedIn URL</label>
          <input
            className={input}
            value={form.linkedin}
            onChange={(e) => set("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>

      <div>
        <label className={label}>Twitter / X URL</label>
        <input
          className={input}
          value={form.twitter}
          onChange={(e) => set("twitter", e.target.value)}
          placeholder="https://twitter.com/..."
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
          {pending ? "Saving..." : item ? "Update Member" : "Add Member"}
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
