"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveHeaderConfig, saveFooterConfig, saveCapability, saveHomepageSection, savePageConfig } from "@/actions/site-config";
import ImageUploader from "@/components/admin/ImageUploader";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Globe } from "lucide-react";

const lbl = "block text-sm font-medium text-gray-700 mb-1";
const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const addBtn = "flex items-center gap-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg px-4 py-2.5 hover:bg-blue-50 w-full justify-center transition-colors";

const SOCIAL_ICONS: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  github: FaGithub,
  website: Globe,
};

function parseArr<T>(raw: any, fallback: T[]): T[] {
  if (Array.isArray(raw)) return raw;
  try { const p = JSON.parse(raw ?? "null"); return Array.isArray(p) ? p : fallback; } catch { return fallback; }
}
function parseObj<T>(raw: any, fallback: T): T {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
  try { return JSON.parse(raw ?? "null") ?? fallback; } catch { return fallback; }
}

// ── Header Form ─────────────────────────────────────────────────────────────
export function HeaderForm({ config }: { config?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [navItems, setNavItems] = useState<{ label: string; href: string }[]>(() =>
    parseArr(config?.navItems, [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ])
  );
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string; icon: string }[]>(() =>
    parseArr(config?.socialLinks, [
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    ])
  );
  const [newNav, setNewNav] = useState({ label: "", href: "" });
  const [newSocial, setNewSocial] = useState({ label: "", href: "", icon: "facebook" });
  const [form, setForm] = useState({
    brandPrefix: config?.brandPrefix ?? "Web",
    brandSuffix: config?.brandSuffix ?? "Xprt",
    brandHref: config?.brandHref ?? "/",
    phone: config?.phone ?? "",
    email: config?.email ?? "",
    ctaLabel: config?.ctaLabel ?? "Let's Connect",
    ctaHref: config?.ctaHref ?? "/contact",
    isActive: config?.isActive ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveHeaderConfig({
        ...form,
        navItems: JSON.stringify(navItems),
        socialLinks: JSON.stringify(socialLinks),
      });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Brand & Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Brand Prefix</label><input className={inp} value={form.brandPrefix} onChange={(e) => setForm((p) => ({ ...p, brandPrefix: e.target.value }))} /></div>
          <div><label className={lbl}>Brand Suffix</label><input className={inp} value={form.brandSuffix} onChange={(e) => setForm((p) => ({ ...p, brandSuffix: e.target.value }))} /></div>
          <div><label className={lbl}>Phone</label><input className={inp} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></div>
          <div><label className={lbl}>Email</label><input className={inp} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">CTA Button</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Label</label><input className={inp} value={form.ctaLabel} onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))} /></div>
          <div><label className={lbl}>Link</label><input className={inp} value={form.ctaHref} onChange={(e) => setForm((p) => ({ ...p, ctaHref: e.target.value }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Menu Items</h3>
        {navItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input className={`${inp} flex-1`} value={item.label} onChange={(e) => setNavItems(navItems.map((n, idx) => idx === i ? { ...n, label: e.target.value } : n))} placeholder="Label" />
            <input className={`${inp} flex-1`} value={item.href} onChange={(e) => setNavItems(navItems.map((n, idx) => idx === i ? { ...n, href: e.target.value } : n))} placeholder="/page" />
            <button type="button" onClick={() => setNavItems(navItems.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input className={`${inp} flex-1`} value={newNav.label} onChange={(e) => setNewNav((p) => ({ ...p, label: e.target.value }))} placeholder="Label" />
          <input className={`${inp} flex-1`} value={newNav.href} onChange={(e) => setNewNav((p) => ({ ...p, href: e.target.value }))} placeholder="/page" />
          <button type="button" onClick={() => { if (!newNav.label.trim()) return; setNavItems([...navItems, newNav]); setNewNav({ label: "", href: "" }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shrink-0">Add</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Social Links</h3>
        {socialLinks.map((item, i) => {
          const Icon = SOCIAL_ICONS[item.icon] || Globe;
          return (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Icon className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="text-sm font-medium text-gray-700 w-24 shrink-0">{item.label}</span>
              <input className={`${inp} flex-1`} value={item.href} onChange={(e) => setSocialLinks(socialLinks.map((s, idx) => idx === i ? { ...s, href: e.target.value } : s))} placeholder="https://..." />
              <button type="button" onClick={() => setSocialLinks(socialLinks.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
            </div>
          );
        })}
        <div className="flex items-center gap-2 flex-wrap">
          <select className={`${inp} w-36 shrink-0`} value={newSocial.icon} onChange={(e) => setNewSocial((p) => ({ ...p, icon: e.target.value }))}>
            {Object.keys(SOCIAL_ICONS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <input className={`${inp} flex-1 min-w-30`} value={newSocial.label} onChange={(e) => setNewSocial((p) => ({ ...p, label: e.target.value }))} placeholder="Name" />
          <input className={`${inp} flex-1 min-w-40`} value={newSocial.href} onChange={(e) => setNewSocial((p) => ({ ...p, href: e.target.value }))} placeholder="https://..." />
          <button type="button" onClick={() => { if (!newSocial.label.trim() || !newSocial.href.trim()) return; setSocialLinks([...socialLinks, newSocial]); setNewSocial({ label: "", href: "", icon: "facebook" }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shrink-0">Add</button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm font-medium">Active (show on site)</span>
      </div>
      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">{pending ? "Saving..." : "Save Header"}</button>
    </form>
  );
}

// ── Footer Form ──────────────────────────────────────────────────────────────
export function FooterForm({ config }: { config?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [locations, setLocations] = useState<string[]>(() => parseArr(config?.locations, ["123 Business St, City, Country"]));
  const [footerLinks, setFooterLinks] = useState<{ sub: string; label: string; href: string }[]>(() =>
    parseArr(config?.footerLinks, [
      { sub: "See our work", label: "Portfolio", href: "/work" },
      { sub: "Who we are", label: "About", href: "/about" },
      { sub: "Get Started", label: "Contact", href: "/contact" },
    ])
  );
  const [socialLinks, setSocialLinks] = useState<{ label: string; href: string }[]>(() =>
    parseArr(config?.socialLinks, [
      { label: "Facebook", href: "https://facebook.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ])
  );
  const contactCtaRaw = parseObj(config?.contactCta, { eyebrow: "Let's work together", label: "Get In Touch", href: "/contact" });
  const [contactCta, setContactCta] = useState(contactCtaRaw);
  const [newLoc, setNewLoc] = useState("");
  const [newLink, setNewLink] = useState({ sub: "", label: "", href: "" });
  const [newSocial, setNewSocial] = useState({ label: "", href: "" });
  const [mapImage, setMapImage] = useState(config?.mapImage ?? "");
  const [form, setForm] = useState({
    ctaTitle: config?.ctaTitle ?? "Ready to Build a More Profitable, Sustainable Business?",
    ctaButtonLabel: config?.ctaButtonLabel ?? "Free Consultation",
    ctaButtonHref: config?.ctaButtonHref ?? "/contact",
    copyrightBrand: config?.copyrightBrand ?? "pikonox",
    copyrightText: config?.copyrightText ?? "All Rights Reserved",
    isActive: config?.isActive ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveFooterConfig({
        ...form,
        mapImage,
        locations: JSON.stringify(locations.filter(Boolean)),
        footerLinks: JSON.stringify(footerLinks),
        contactCta: JSON.stringify(contactCta),
        socialLinks: JSON.stringify(socialLinks),
      });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">CTA Section</h3>
        <div><label className={lbl}>CTA Title</label><textarea rows={2} className={inp} value={form.ctaTitle} onChange={(e) => setForm((p) => ({ ...p, ctaTitle: e.target.value }))} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Button Label</label><input className={inp} value={form.ctaButtonLabel} onChange={(e) => setForm((p) => ({ ...p, ctaButtonLabel: e.target.value }))} /></div>
          <div><label className={lbl}>Button Link</label><input className={inp} value={form.ctaButtonHref} onChange={(e) => setForm((p) => ({ ...p, ctaButtonHref: e.target.value }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Contact CTA Badge</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={lbl}>Eyebrow text</label><input className={inp} value={contactCta.eyebrow} onChange={(e) => setContactCta((p: any) => ({ ...p, eyebrow: e.target.value }))} placeholder="Let's work together" /></div>
          <div><label className={lbl}>Button Label</label><input className={inp} value={contactCta.label} onChange={(e) => setContactCta((p: any) => ({ ...p, label: e.target.value }))} /></div>
          <div><label className={lbl}>Button Link</label><input className={inp} value={contactCta.href} onChange={(e) => setContactCta((p: any) => ({ ...p, href: e.target.value }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Locations</h3>
        {locations.map((loc, i) => (
          <div key={i} className="flex items-center gap-3">
            <input className={`${inp} flex-1`} value={loc} onChange={(e) => setLocations(locations.map((l, idx) => idx === i ? e.target.value : l))} placeholder="Address" />
            <button type="button" onClick={() => setLocations(locations.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <div className="flex gap-3">
          <input className={`${inp} flex-1`} value={newLoc} onChange={(e) => setNewLoc(e.target.value)} placeholder="123 Business St, City" />
          <button type="button" onClick={() => { if (!newLoc.trim()) return; setLocations([...locations, newLoc]); setNewLoc(""); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shrink-0">Add</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Footer Links</h3>
        {footerLinks.map((link, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input className={`${inp} w-32 shrink-0`} value={link.sub} onChange={(e) => setFooterLinks(footerLinks.map((l, idx) => idx === i ? { ...l, sub: e.target.value } : l))} placeholder="Category" />
            <input className={`${inp} flex-1`} value={link.label} onChange={(e) => setFooterLinks(footerLinks.map((l, idx) => idx === i ? { ...l, label: e.target.value } : l))} placeholder="Link text" />
            <input className={`${inp} flex-1`} value={link.href} onChange={(e) => setFooterLinks(footerLinks.map((l, idx) => idx === i ? { ...l, href: e.target.value } : l))} placeholder="/page" />
            <button type="button" onClick={() => setFooterLinks(footerLinks.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input className={`${inp} w-32 shrink-0`} value={newLink.sub} onChange={(e) => setNewLink((p) => ({ ...p, sub: e.target.value }))} placeholder="Category" />
          <input className={`${inp} flex-1`} value={newLink.label} onChange={(e) => setNewLink((p) => ({ ...p, label: e.target.value }))} placeholder="Link text" />
          <input className={`${inp} flex-1`} value={newLink.href} onChange={(e) => setNewLink((p) => ({ ...p, href: e.target.value }))} placeholder="/page" />
          <button type="button" onClick={() => { if (!newLink.label.trim()) return; setFooterLinks([...footerLinks, newLink]); setNewLink({ sub: "", label: "", href: "" }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shrink-0">Add</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <h3 className="font-semibold text-gray-800">Social Links</h3>
        {socialLinks.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <input className={`${inp} w-32 shrink-0`} value={s.label} onChange={(e) => setSocialLinks(socialLinks.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder="Name" />
            <input className={`${inp} flex-1`} value={s.href} onChange={(e) => setSocialLinks(socialLinks.map((x, idx) => idx === i ? { ...x, href: e.target.value } : x))} placeholder="https://..." />
            <button type="button" onClick={() => setSocialLinks(socialLinks.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <div className="flex gap-3">
          <input className={`${inp} w-32 shrink-0`} value={newSocial.label} onChange={(e) => setNewSocial((p) => ({ ...p, label: e.target.value }))} placeholder="Name" />
          <input className={`${inp} flex-1`} value={newSocial.href} onChange={(e) => setNewSocial((p) => ({ ...p, href: e.target.value }))} placeholder="https://..." />
          <button type="button" onClick={() => { if (!newSocial.label.trim() || !newSocial.href.trim()) return; setSocialLinks([...socialLinks, newSocial]); setNewSocial({ label: "", href: "" }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shrink-0">Add</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Copyright</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Brand Name</label><input className={inp} value={form.copyrightBrand} onChange={(e) => setForm((p) => ({ ...p, copyrightBrand: e.target.value }))} /></div>
          <div><label className={lbl}>Copyright Text</label><input className={inp} value={form.copyrightText} onChange={(e) => setForm((p) => ({ ...p, copyrightText: e.target.value }))} /></div>
        </div>
        <ImageUploader label="Map Image (optional)" value={mapImage} onChange={setMapImage} />
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm font-medium">Active (show on site)</span>
      </div>
      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">{pending ? "Saving..." : "Save Footer"}</button>
    </form>
  );
}

// ── Capability Form ──────────────────────────────────────────────────────────
type CapItem = { title: string; description: string; caption: string; image: string; imageHover: string };

export function CapabilityForm({ capability }: { capability?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [items, setItems] = useState<CapItem[]>(() =>
    parseArr(capability?.items, [
      { title: "AI Transformation", description: "AI helps businesses stay ahead.", caption: "We help businesses become intelligent enterprises", image: "", imageHover: "" },
    ])
  );
  const [form, setForm] = useState({
    id: capability?.id ?? "",
    badge: capability?.badge ?? "Our Capabilities",
    headingPrefix: capability?.headingPrefix ?? "pikonox is a premium",
    highlight1: capability?.highlight1 ?? "AI Transformation",
    highlight2: capability?.highlight2 ?? "Digital Solutions",
    headingSuffix: capability?.headingSuffix ?? "agency.",
    order: capability?.order ?? 0,
    isActive: capability?.isActive ?? true,
  });

  function addItem() { setItems([...items, { title: "", description: "", caption: "", image: "", imageHover: "" }]); }
  function removeItem(i: number) { if (items.length > 1) setItems(items.filter((_, idx) => idx !== i)); }
  function updateItem(i: number, k: keyof CapItem, v: string) {
    setItems(items.map((item, idx) => idx === i ? { ...item, [k]: v } : item));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveCapability({ ...form, items: JSON.stringify(items) });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Heading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={lbl}>Badge</label><input className={inp} value={form.badge} onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))} /></div>
          <div><label className={lbl}>Order</label><input type="number" className={inp} value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} /></div>
          <div><label className={lbl}>Heading Prefix</label><input className={inp} value={form.headingPrefix} onChange={(e) => setForm((p) => ({ ...p, headingPrefix: e.target.value }))} /></div>
          <div><label className={lbl}>Highlight 1 (colored)</label><input className={inp} value={form.highlight1} onChange={(e) => setForm((p) => ({ ...p, highlight1: e.target.value }))} /></div>
          <div><label className={lbl}>Highlight 2 (colored)</label><input className={inp} value={form.highlight2} onChange={(e) => setForm((p) => ({ ...p, highlight2: e.target.value }))} /></div>
          <div><label className={lbl}>Heading Suffix</label><input className={inp} value={form.headingSuffix} onChange={(e) => setForm((p) => ({ ...p, headingSuffix: e.target.value }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Capability Items</h3>
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Item {i + 1}</span>
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={lbl}>Title</label><input className={inp} value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Service name" /></div>
              <div><label className={lbl}>Caption</label><input className={inp} value={item.caption} onChange={(e) => updateItem(i, "caption", e.target.value)} placeholder="Short tagline" /></div>
            </div>
            <div><label className={lbl}>Description</label><textarea rows={2} className={inp} value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Brief description" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploader label="Card Image" value={item.image} onChange={(v) => updateItem(i, "image", v)} width={800} />
              <ImageUploader label="Hover Image" value={item.imageHover} onChange={(v) => updateItem(i, "imageHover", v)} width={800} />
            </div>
          </div>
        ))}
        <button type="button" onClick={addItem} className={addBtn}>
          <Plus className="w-4 h-4" /> Add Capability Item
        </button>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm font-medium">Active (show on homepage)</span>
      </div>
      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">{pending ? "Saving..." : "Save Capability"}</button>
    </form>
  );
}

// ── Homepage Section Form ────────────────────────────────────────────────────
const SECTION_KEYS = [
  { value: "hero", label: "Hero Banner" },
  { value: "services", label: "Services Section" },
  { value: "techstack", label: "Tech Stack" },
  { value: "testimonials", label: "Testimonials" },
  { value: "blog", label: "Blog Section" },
  { value: "team", label: "Team Section" },
  { value: "about", label: "About Section" },
  { value: "faq", label: "FAQ Section" },
  { value: "process", label: "Development Process" },
  { value: "consultation", label: "Consultation CTA" },
];

export function HomepageSectionForm({ section }: { section?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [image, setImage] = useState(section?.image ?? "");
  const [bgImage, setBgImage] = useState(section?.bgImage ?? "");
  const [form, setForm] = useState({
    id: section?.id ?? "",
    sectionKey: section?.sectionKey ?? "hero",
    title: section?.title ?? "",
    subtitle: section?.subtitle ?? "",
    description: section?.description ?? "",
    ctaLabel: section?.ctaLabel ?? "",
    ctaHref: section?.ctaHref ?? "",
    order: section?.order ?? 0,
    isActive: section?.isActive ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveHomepageSection({ ...form, image, bgImage });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Section Config</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Section</label>
            <select className={inp} value={form.sectionKey} onChange={(e) => setForm((p) => ({ ...p, sectionKey: e.target.value }))}>
              {SECTION_KEYS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Order</label><input type="number" className={inp} value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))} /></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Content</h3>
        <div><label className={lbl}>Title</label><input className={inp} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} /></div>
        <div><label className={lbl}>Subtitle</label><input className={inp} value={form.subtitle} onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))} /></div>
        <div><label className={lbl}>Description</label><textarea rows={3} className={inp} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader label="Image" value={image} onChange={setImage} />
          <ImageUploader label="Background Image" value={bgImage} onChange={setBgImage} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">CTA Button</h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Button Label</label><input className={inp} value={form.ctaLabel} onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))} /></div>
          <div><label className={lbl}>Button Link</label><input className={inp} value={form.ctaHref} onChange={(e) => setForm((p) => ({ ...p, ctaHref: e.target.value }))} /></div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm font-medium">Active</span>
      </div>
      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">{pending ? "Saving..." : "Save Section"}</button>
    </form>
  );
}

// ── Page Config Form ─────────────────────────────────────────────────────────
const PAGE_KEYS = [
  { value: "home", label: "Homepage" }, { value: "about", label: "About" }, { value: "team", label: "Team" },
  { value: "faq", label: "FAQ" }, { value: "contact", label: "Contact" }, { value: "services", label: "Services" },
  { value: "products", label: "Products" }, { value: "work", label: "Portfolio/Work" }, { value: "blog", label: "Blog" },
];

export function PageConfigForm({ config }: { config?: any }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [ogImage, setOgImage] = useState(config?.ogImage ?? "");
  const [form, setForm] = useState({
    id: config?.id ?? "",
    pageKey: config?.pageKey ?? "home",
    metaTitle: config?.metaTitle ?? "",
    metaDescription: config?.metaDescription ?? "",
    metaKeywords: config?.metaKeywords ?? "",
    breadcrumbTitle: config?.breadcrumbTitle ?? "",
    breadcrumbSubtitle: config?.breadcrumbSubtitle ?? "",
    ctaTitle: config?.ctaTitle ?? "",
    ctaDescription: config?.ctaDescription ?? "",
    ctaButtonLabel: config?.ctaButtonLabel ?? "",
    ctaButtonHref: config?.ctaButtonHref ?? "",
    isActive: config?.isActive ?? true,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePageConfig({ ...form, ogImage });
      if (res.success) { toast.success("Saved!"); router.refresh(); }
      else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden page key — controlled by URL param via parent page */}
      <input type="hidden" value={form.pageKey} readOnly />

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">SEO</h3>
        <div><label className={lbl}>Meta Title</label><input className={inp} value={form.metaTitle} onChange={(e) => setForm((p) => ({ ...p, metaTitle: e.target.value }))} /></div>
        <div><label className={lbl}>Meta Description</label><textarea rows={2} className={inp} value={form.metaDescription} onChange={(e) => setForm((p) => ({ ...p, metaDescription: e.target.value }))} /></div>
        <div><label className={lbl}>Meta Keywords</label><input className={inp} value={form.metaKeywords} onChange={(e) => setForm((p) => ({ ...p, metaKeywords: e.target.value }))} placeholder="keyword1, keyword2, keyword3" /></div>
        <ImageUploader label="OG Image" value={ogImage} onChange={setOgImage} width={1200} />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Breadcrumb</h3>
        <div><label className={lbl}>Title</label><input className={inp} value={form.breadcrumbTitle} onChange={(e) => setForm((p) => ({ ...p, breadcrumbTitle: e.target.value }))} /></div>
        <div><label className={lbl}>Subtitle</label><textarea rows={2} className={inp} value={form.breadcrumbSubtitle} onChange={(e) => setForm((p) => ({ ...p, breadcrumbSubtitle: e.target.value }))} /></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h3 className="font-semibold text-gray-800">Page CTA</h3>
        <div><label className={lbl}>CTA Title</label><textarea rows={2} className={inp} value={form.ctaTitle} onChange={(e) => setForm((p) => ({ ...p, ctaTitle: e.target.value }))} /></div>
        <div><label className={lbl}>CTA Description</label><textarea rows={2} className={inp} value={form.ctaDescription} onChange={(e) => setForm((p) => ({ ...p, ctaDescription: e.target.value }))} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Button Label</label><input className={inp} value={form.ctaButtonLabel} onChange={(e) => setForm((p) => ({ ...p, ctaButtonLabel: e.target.value }))} /></div>
          <div><label className={lbl}>Button Link</label><input className={inp} value={form.ctaButtonHref} onChange={(e) => setForm((p) => ({ ...p, ctaButtonHref: e.target.value }))} /></div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm font-medium">Active</span>
      </div>
      <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60">{pending ? "Saving..." : "Save Page Config"}</button>
    </form>
  );
}
