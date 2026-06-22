"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveFooterConfig } from "@/actions/site-config";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";

const input = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const label = "block text-sm font-medium text-gray-700 mb-1";

interface FooterFormProps {
  config?: any;
}

const DEFAULT_locations = ["123 Business St, City, Country"];
const DEFAULT_links = [
  { sub: "Company", label: "About", href: "/about" },
  { sub: "Services", label: "Services", href: "/services" },
  { sub: "Support", label: "Contact", href: "/contact" },
];
const DEFAULT_social = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function FooterForm({ config }: FooterFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  
  const [form, setForm] = useState({
    ctaTitle: config?.ctaTitle || "Ready to Build a More Profitable Business?",
    ctaButtonLabel: config?.ctaButtonLabel || "Free Consultation",
    ctaButtonHref: config?.ctaButtonHref || "/contact",
    copyrightBrand: config?.copyrightBrand || "pikonox",
    copyrightText: config?.copyrightText || "All Rights Reserved",
  });
  
  const [locations, setLocations] = useState(config?.locations?.length ? config.locations : DEFAULT_locations);
  const [footerLinks, setFooterLinks] = useState(config?.footerLinks?.length ? config.footerLinks : DEFAULT_links);
  const [socialLinks, setSocialLinks] = useState(config?.socialLinks?.length ? config.socialLinks : DEFAULT_social);

  const [newLoc, setNewLoc] = useState("");
  const [newSub, setNewSub] = useState("");
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkHref, setNewLinkHref] = useState("");
  const [newSocLabel, setNewSocLabel] = useState("");
  const [newSocHref, setNewSocHref] = useState("");

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveFooterConfig({
        ...form,
        locations: JSON.stringify(locations),
        footerLinks: JSON.stringify(footerLinks),
        contactCta: JSON.stringify({ eyebrow: "Let's work together", label: "Get In Touch", href: "/contact" }),
        socialLinks: JSON.stringify(socialLinks),
        isActive: true,
      });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else { toast.error(res.error || "Failed"); }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* CTA */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📢 CTA Banner</h3>
        <div><label className={label}>Title</label><textarea className={input} value={form.ctaTitle} onChange={(e) => set("ctaTitle", e.target.value)} rows={2} /></div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div><label className={label}>Button Label</label><input className={input} value={form.ctaButtonLabel} onChange={(e) => set("ctaButtonLabel", e.target.value)} /></div>
          <div><label className={label}>Button Link</label><input className={input} value={form.ctaButtonHref} onChange={(e) => set("ctaButtonHref", e.target.value)} /></div>
        </div>
      </div>

      {/* Locations */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📍 Office Locations</h3>
        <div className="space-y-2 mb-4">
          {locations.map((loc: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-gray-800">{loc}</span>
              <button type="button" onClick={() => setLocations(locations.filter((_: any, i: number) => i !== idx))} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={`${input} flex-1`} value={newLoc} onChange={(e) => setNewLoc(e.target.value)} placeholder="Add location..." />
          <button type="button" onClick={() => { if (newLoc) { setLocations([...locations, newLoc]); setNewLoc(""); } }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">🔗 Quick Links</h3>
        <div className="space-y-2 mb-4">
          {footerLinks.map((link: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-20 text-xs text-gray-500">{link.sub}</span>
              <span className="flex-1 font-medium text-gray-800">{link.label}</span>
              <span className="text-sm text-gray-500">{link.href}</span>
              <button type="button" onClick={() => setFooterLinks(footerLinks.filter((_: any, i: number) => i !== idx))} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <input className={input} value={newSub} onChange={(e) => setNewSub(e.target.value)} placeholder="Category" />
          <input className={input} value={newLinkLabel} onChange={(e) => setNewLinkLabel(e.target.value)} placeholder="Label" />
          <input className={input} value={newLinkHref} onChange={(e) => setNewLinkHref(e.target.value)} placeholder="/page" />
          <button type="button" onClick={() => { if (newLinkLabel) { setFooterLinks([...footerLinks, { sub: newSub, label: newLinkLabel, href: newLinkHref || "/" }]); setNewSub(""); setNewLinkLabel(""); setNewLinkHref(""); } }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
        </div>
      </div>

      {/* Social */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📱 Social Media</h3>
        <div className="space-y-2 mb-4">
          {socialLinks.map((link: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 font-medium text-gray-800">{link.label}</span>
              <span className="text-sm text-gray-500 truncate max-w-[200px]">{link.href}</span>
              <button type="button" onClick={() => setSocialLinks(socialLinks.filter((_: any, i: number) => i !== idx))} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={input} value={newSocLabel} onChange={(e) => setNewSocLabel(e.target.value)} placeholder="Platform name" />
          <input className={input} value={newSocHref} onChange={(e) => setNewSocHref(e.target.value)} placeholder="https://..." />
          <button type="button" onClick={() => { if (newSocLabel && newSocHref) { setSocialLinks([...socialLinks, { label: newSocLabel, href: newSocHref }]); setNewSocLabel(""); setNewSocHref(""); } }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">© Copyright</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={label}>Brand Name</label><input className={input} value={form.copyrightBrand} onChange={(e) => set("copyrightBrand", e.target.value)} /></div>
          <div><label className={label}>Text</label><input className={input} value={form.copyrightText} onChange={(e) => set("copyrightText", e.target.value)} /></div>
        </div>
      </div>

      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
        {pending ? "Saving..." : "Save Footer"}
      </button>
    </form>
  );
}