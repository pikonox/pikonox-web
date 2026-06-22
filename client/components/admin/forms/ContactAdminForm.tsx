"use client";

import { useState, useTransition } from "react";
import { updateSection } from "@/actions/homepage";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

interface ContactData {
  heading?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  services?: string[];
}

interface Props {
  data: ContactData;
}

export default function ContactAdminForm({ data }: Props) {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    heading: data.heading ?? "",
    description: data.description ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    address: data.address ?? "",
  });
  const [services, setServices] = useState<string[]>(data.services ?? [""]);

  function set(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function setService(i: number, v: string) {
    setServices((prev) => prev.map((s, idx) => (idx === i ? v : s)));
  }

  function addService() {
    setServices((prev) => [...prev, ""]);
  }

  function removeService(i: number) {
    setServices((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSection("contact", {
        ...form,
        services: services.filter(Boolean),
      });
      if (res.success) toast.success("Contact section saved!");
      else toast.error(res.error ?? "Failed to save");
    });
  }

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={label}>Heading</label>
        <input
          className={input}
          value={form.heading}
          onChange={(e) => set("heading", e.target.value)}
          placeholder="Contact section heading"
        />
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea
          rows={3}
          className={input}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Contact section description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={label}>Phone</label>
          <input
            className={input}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label className={label}>Email</label>
          <input
            type="email"
            className={input}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="hello@company.com"
          />
        </div>
      </div>

      <div>
        <label className={label}>Address</label>
        <textarea
          rows={2}
          className={input}
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="Company address"
        />
      </div>

      {/* Services list for the contact form dropdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={label + " mb-0"}>Service Options (contact form dropdown)</label>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {services.map((service, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={input}
                value={service}
                onChange={(e) => setService(i, e.target.value)}
                placeholder="e.g. Web Development"
              />
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(i)}
                  className="p-2 text-red-400 hover:text-red-600 shrink-0"
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
          {pending ? "Saving..." : "Save Contact Section"}
        </button>
      </div>
    </form>
  );
}
