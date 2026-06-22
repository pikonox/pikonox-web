"use client";

import { logout } from "@/app/lib/actions";
import { 
  ChevronDown, LayoutDashboard, LogOut, Globe, Home, FileText, 
  Rocket, Search, Mail, Briefcase, Building2, BookOpen, Users, 
  Star, MessageCircle, Settings, PenTool, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Updated navigation with icons - matching admin-nav.ts structure
const NAV = [
  {
    id: "website",
    label: "Website Settings",
    icon: Globe,
    items: [
      { label: "Header & Logo", href: "/admin/site-settings?tab=header", icon: null },
      { label: "Footer", href: "/admin/site-settings?tab=footer", icon: null },
    ],
  },
  {
    id: "homepage",
    label: "Homepage",
    icon: Home,
    items: [
      { label: "Hero Banner", href: "/admin/homepage/hero", icon: null },
      { label: "What We Do", href: "/admin/homepage/whatwedo", icon: null },
      { label: "Tech Stack", href: "/admin/homepage/techstack", icon: null },
      { label: "Testimonials", href: "/admin/testimonials", icon: Star },
      { label: "Contact CTA", href: "/admin/homepage/contact", icon: null },
    ],
  },
  {
    id: "main-pages",
    label: "Main Pages",
    icon: FileText,
    items: [
      { label: "About Us", href: "/admin/pages/about", icon: null },
      { label: "Contact", href: "/admin/pages/contact", icon: null },
      { label: "FAQ", href: "/admin/pages/faq", icon: MessageCircle },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Guest Posts", href: "/admin/guest-posts", icon: PenTool },
    ],
  },
  {
    id: "listings",
    label: "Listings",
    icon: Rocket,
    items: [
      { label: "Services", href: "/admin/services", icon: Briefcase },
      { label: "Portfolio", href: "/admin/portfolio", icon: Building2 },
      { label: "Products", href: "/admin/products", icon: null },
      { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
    ],
  },
  {
    id: "seo",
    label: "SEO Settings",
    icon: Search,
    items: [
      { label: "Page SEO", href: "/admin/seo", icon: null },
      { label: "Guest Posts", href: "/admin/guest-posts", icon: null },
    ],
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: Mail,
    items: [
      { label: "Contact Leads", href: "/admin/submissions", icon: null },
    ],
  },
];

function NavGroup({
  group,
  onNavClick,
}: {
  group: typeof NAV[0];
  onNavClick?: () => void;
}) {
  const pathname = usePathname();
  const isAnyActive = group.items.some((i) => pathname.startsWith(i.href));
  const [open, setOpen] = useState(true);
  const IconComponent = group.icon;

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <span className="flex items-center gap-3">
          {IconComponent && <IconComponent className="w-4 h-4 text-gray-500" />}
          {group.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="mt-1 ml-3 pl-3 border-l border-white/10 space-y-0.5">
          {group.items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavClick}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function AppAdminSidebar({
  userName,
  onClose,
}: {
  userName?: string;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin";

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">Admin</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md hover:bg-white/5 text-slate-400"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
        )}
      </div>

      {/* Quick Links */}
      <div className="p-3 border-b border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          <li>
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                isDashboard
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </li>

          <li className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </li>

          {NAV.map((group) => (
            <NavGroup key={group.id} group={group} onNavClick={onClose} />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {userName && (
          <p className="text-xs text-gray-500 px-3 mb-2 truncate">
            Logged in as <span className="text-gray-700">{userName}</span>
          </p>
        )}
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}