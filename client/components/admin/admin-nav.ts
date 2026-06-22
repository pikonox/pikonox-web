import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseIcon,
  Building2,
  FileText,
  Globe,
  Home,
  ImageIcon,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Rocket,
  Search,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  description: string;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  items: AdminNavItem[];
};

// User-friendly admin navigation - organized by actual website pages
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "website",
    label: "🎨 Website Settings",
    icon: Globe,
    items: [
      {
        label: "🎯 Header & Logo",
        href: "/admin/site-settings?tab=header",
        description: "Edit your logo, website name, navigation menu, phone, email, and CTA button.",
      },
      {
        label: "📝 Footer",
        href: "/admin/site-settings?tab=footer",
        description: "Edit footer CTA, office locations, quick links, social media, and copyright.",
      },
    ],
  },
  {
    id: "homepage",
    label: "🏠 Homepage",
    icon: Home,
    items: [
      {
        label: "🌟 Hero Banner",
        href: "/admin/homepage/hero",
        description: "Edit the main banner at the top of your homepage - title, subtitle, images, CTA.",
      },
      {
        label: "💡 What We Do",
        href: "/admin/homepage/whatwedo",
        description: "Edit the capabilities section - heading and all capability cards.",
      },
      {
        label: "🛠️ Services Preview",
        href: "/admin/site-settings?tab=homepage",
        description: "Edit the services section shown on homepage.",
      },
      {
        label: "💻 Tech Stack",
        href: "/admin/homepage/techstack",
        description: "Edit technology logos and brands shown on homepage.",
      },
      {
        label: "⭐ Testimonials",
        href: "/admin/testimonials",
        description: "Manage client reviews and ratings shown on homepage.",
      },
      {
        label: "📰 Blog Preview",
        href: "/admin/blog",
        description: "Manage blog posts shown on homepage.",
      },
      {
        label: "👥 Team Preview",
        href: "/admin/team",
        description: "Manage team members shown on homepage.",
      },
      {
        label: "❓ FAQs Preview",
        href: "/admin/faqs",
        description: "Manage FAQs shown on homepage.",
      },
      {
        label: "📞 Contact CTA",
        href: "/admin/homepage/contact",
        description: "Edit the contact call-to-action section on homepage.",
      },
    ],
  },
  {
    id: "main-pages",
    label: "📄 Main Pages",
    icon: FileText,
    items: [
      {
        label: "🏢 About Us Page",
        href: "/admin/pages/about",
        description: "Edit About page - company story, history timeline, mission/vision, team, FAQs.",
      },
      {
        label: "📧 Contact Page",
        href: "/admin/pages/contact",
        description: "Edit Contact page - form settings, contact info, map, office details.",
      },
      {
        label: "❓ FAQ Page",
        href: "/admin/pages/faq",
        description: "Edit FAQ page - all frequently asked questions and answers.",
      },
      {
        label: "👨‍💼 Team Page",
        href: "/admin/pages/team",
        description: "Edit Team page - team members, bios, photos, social links.",
      },
      {
        label: "✍️ Guest Post Page",
        href: "/admin/guest-posts",
        description: "Review guest post submissions and manage write-for-us page.",
      },
    ],
  },
  {
    id: "listings",
    label: "📦 Listings",
    icon: Rocket,
    items: [
      {
        label: "🛠️ Services",
        href: "/admin/services",
        description: "Add, edit, or remove services - title, description, features, images, SEO.",
      },
      {
        label: "💼 Portfolio / Work",
        href: "/admin/portfolio",
        description: "Add, edit, or remove case studies - project details, images, results, client info.",
      },
      {
        label: "🛒 Products",
        href: "/admin/products",
        description: "Add, edit, or remove products - name, price, features, images, description.",
      },
      {
        label: "📝 Blog Posts",
        href: "/admin/blog",
        description: "Add, edit, or remove blog articles - title, content, author, category.",
      },
    ],
  },
  {
    id: "seo",
    label: "🔍 SEO Settings",
    icon: Search,
    items: [
      {
        label: "📊 Page SEO",
        href: "/admin/seo",
        description: "Edit meta titles and descriptions for all pages - improves Google ranking.",
      },
      {
        label: "✍️ Guest Posts",
        href: "/admin/guest-posts",
        description: "Review guest post submissions and convert to blog posts.",
      },
    ],
  },
  {
    id: "inbox",
    label: "📬 Inbox",
    icon: Mail,
    items: [
      {
        label: "📩 Contact Leads",
        href: "/admin/submissions",
        description: "View and manage all contact form submissions.",
      },
    ],
  },
];

// Quick access items for the sidebar
export const ADMIN_PRIMARY_ITEMS: { label: string; href: string; icon: LucideIcon; description: string }[] = [
  {
    label: "📊 Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview and quick access to all editing sections.",
  },
  {
    label: "🏠 Homepage",
    href: "/admin/homepage/hero",
    icon: Home,
    description: "Edit homepage sections - hero, features, testimonials.",
  },
  {
    label: "🛠️ Services",
    href: "/admin/services",
    icon: BriefcaseIcon,
    description: "Manage your service offerings.",
  },
  {
    label: "💼 Portfolio",
    href: "/admin/portfolio",
    icon: Building2,
    description: "Manage case studies and project showcase.",
  },
  {
    label: "📝 Blog",
    href: "/admin/blog",
    icon: BookOpen,
    description: "Manage blog posts and articles.",
  },
  {
    label: "🔍 SEO",
    href: "/admin/seo",
    icon: Search,
    description: "Optimize pages for search engines.",
  },
  {
    label: "📩 Leads",
    href: "/admin/submissions",
    icon: MessageSquare,
    description: "View contact form submissions.",
  },
];

function matchHref(pathname: string, searchKey: string | null, href: string) {
  if (href === "/admin") return pathname === "/admin";
  if (href.startsWith("/admin/site-cms?key=")) {
    const key = href.split("key=")[1] || "";
    return (
      pathname === "/admin/site-cms" && searchKey === decodeURIComponent(key)
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getAdminRouteMeta(pathname: string, searchKey: string | null) {
  const allItems = [
    ...ADMIN_PRIMARY_ITEMS.map((item) => ({
      label: item.label,
      href: item.href,
      description: item.description,
      icon: item.icon,
    })),
    ...ADMIN_NAV_GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        label: item.label,
        href: item.href,
        description: item.description,
        icon: group.icon,
      })),
    ),
  ];

  return (
    allItems.find((item) => matchHref(pathname, searchKey, item.href)) ?? {
      label: "Admin Panel",
      href: pathname,
      description:
        "Manage global content, page shells, and structured collections.",
      icon: LayoutDashboard,
    }
  );
}

export function isAdminHrefActive(
  pathname: string,
  searchKey: string | null,
  href: string,
) {
  return matchHref(pathname, searchKey, href);
}
