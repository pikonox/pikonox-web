"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveHeaderConfig } from "@/actions/site-config";
import toast from "react-hot-toast";
import { Plus, X, Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const input = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const label = "block text-sm font-medium text-gray-700 mb-1";

const SOCIAL_ICONS: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  github: FaGithub,
  website: Globe,
};

interface HeaderFormProps {
  config?: any;
}

const DEFAULT_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_SOCIAL = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
];

export function HeaderForm({ config }: HeaderFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  
  const [form, setForm] = useState({
    brandPrefix: config?.brandPrefix || "Web",
    brandSuffix: config?.brandSuffix || "Xprt",
    brandHref: config?.brandHref || "/",
    phone: config?.phone || "",
    email: config?.email || "",
    ctaLabel: config?.ctaLabel || "Let's Connect",
    ctaHref: config?.ctaHref || "/contact",
  });
  
  const [navItems, setNavItems] = useState(config?.navItems?.length ? config.navItems : DEFAULT_NAV);
  const [socialLinks, setSocialLinks] = useState(config?.socialLinks?.length ? config.socialLinks : DEFAULT_SOCIAL);

  const [newNavLabel, setNewNavLabel] = useState("");
  const [newNavHref, setNewNavHref] = useState("");
  const [newSocialLabel, setNewSocialLabel] = useState("");
  const [newSocialHref, setNewSocialHref] = useState("");
  const [newSocialIcon, setNewSocialIcon] = useState("facebook");

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const addNav = () => {
    if (!newNavLabel.trim()) return;
    setNavItems([...navItems, { label: newNavLabel, href: newNavHref || "/" }]);
    setNewNavLabel(""); setNewNavHref("");
  };

  const addSocial = () => {
    if (!newSocialLabel.trim() || !newSocialHref.trim()) return;
    setSocialLinks([...socialLinks, { label: newSocialLabel, href: newSocialHref, icon: newSocialIcon }]);
    setNewSocialLabel(""); setNewSocialHref("");
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveHeaderConfig({
        ...form,
        navItems: JSON.stringify(navItems),
        socialLinks: JSON.stringify(socialLinks),
        isActive: true,
      });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else { toast.error(res.error || "Failed"); }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Brand */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">🏢 Brand & Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={label}>Brand Prefix</label><input className={input} value={form.brandPrefix} onChange={(e) => set("brandPrefix", e.target.value)} /></div>
          <div><label className={label}>Brand Suffix</label><input className={input} value={form.brandSuffix} onChange={(e) => set("brandSuffix", e.target.value)} /></div>
          <div><label className={label}>Phone</label><input className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 234 567 8900" /></div>
          <div><label className={label}>Email</label><input className={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="info@company.com" /></div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">🔘 Button</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={label}>Label</label><input className={input} value={form.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} /></div>
          <div><label className={label}>Link</label><input className={input} value={form.ctaHref} onChange={(e) => set("ctaHref", e.target.value)} /></div>
        </div>
      </div>

      {/* Nav */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">🔗 Menu Items</h3>
        <div className="space-y-2 mb-4">
          {navItems.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 font-medium text-gray-800">{item.label}</span>
              <span className="text-sm text-gray-500">{item.href}</span>
              <button type="button" onClick={() => setNavItems(navItems.filter((_: any, i: number) => i !== idx))} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={input} value={newNavLabel} onChange={(e) => setNewNavLabel(e.target.value)} placeholder="Label" />
          <input className={input} value={newNavHref} onChange={(e) => setNewNavHref(e.target.value)} placeholder="/page" />
          <button type="button" onClick={addNav} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
        </div>
      </div>

      {/* Social */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📱 Social Links</h3>
        <div className="space-y-2 mb-4">
          {socialLinks.map((item: any, idx: number) => {
            const IconComponent = SOCIAL_ICONS[item.icon] || Globe;
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <IconComponent className="w-5 h-5 text-gray-600" />
                <span className="flex-1 font-medium text-gray-800">{item.label}</span>
                <span className="text-sm text-gray-500 truncate max-w-37.5">{item.href}</span>
                <button type="button" onClick={() => setSocialLinks(socialLinks.filter((_: any, i: number) => i !== idx))} className="text-red-500 p-1"><X className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className={input} value={newSocialIcon} onChange={(e) => setNewSocialIcon(e.target.value)}>
            {Object.keys(SOCIAL_ICONS).map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
          <input className={input} value={newSocialLabel} onChange={(e) => setNewSocialLabel(e.target.value)} placeholder="Name" />
          <input className={input} value={newSocialHref} onChange={(e) => setNewSocialHref(e.target.value)} placeholder="https://..." />
          <button type="button" onClick={addSocial} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
        </div>
      </div>

      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
        {pending ? "Saving..." : "Save Header"}
      </button>
    </form>
  );
}