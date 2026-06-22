import { getHeaderConfig } from "@/actions/site-config";
import { getServices } from "@/actions/services";
import HeaderClient from "@/components/shared/HeaderClient";

const DEFAULT_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default async function Header() {
  const [config, services] = await Promise.all([
    getHeaderConfig(),
    getServices(),
  ]);

  // Build service dropdown children from DB
  const serviceChildren = services
    .filter((s: any) => s.isActive)
    .sort((a: any, b: any) => a.order - b.order)
    .map((s: any) => ({ label: s.title, href: `/services/${s.slug}` }));

  // Get base nav from DB config or fall back to default
  const baseNav: any[] = config?.navItems?.length ? config.navItems : DEFAULT_NAV;

  // Inject service children into the Services nav item
  const nav = baseNav.map((item: any) => {
    if (
      item.label?.toLowerCase() === "services" ||
      item.href === "/services"
    ) {
      return { ...item, children: serviceChildren };
    }
    return item;
  });

  const data = {
    brand: {
      prefix: config?.brandPrefix || "Web",
      suffix: config?.brandSuffix || "Xprt",
      href: config?.brandHref || "/",
    },
    contact: {
      phone: config?.phone || "+1 (123) 456-78-90",
      email: config?.email || "info@pikonox.com",
    },
    cta: {
      label: config?.ctaLabel || "Let's Connect",
      href: config?.ctaHref || "/contact",
    },
    nav,
    socialLinks: config?.socialLinks || [],
  };

  return <HeaderClient data={data} />;
}
