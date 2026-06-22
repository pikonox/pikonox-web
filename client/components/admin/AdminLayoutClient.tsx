"use client";

import AppAdminSidebar from "@/components/admin/AppAdminSidebar";
import { getAdminRouteMeta } from "@/components/admin/admin-nav";
import { ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function AdminLayoutClient({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("key");
  const routeMeta = useMemo(
    () => getAdminRouteMeta(pathname, searchKey),
    [pathname, searchKey],
  );
  const HeaderIcon = routeMeta.icon;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppAdminSidebar userName={userName} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main — shifts right on desktop when sidebar open (w-64 = 256px) */}
      <div
        className={`flex min-h-screen flex-1 flex-col bg-gray-100 transition-[margin] duration-200 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                aria-label={sidebarOpen ? "Hide navigation" : "Show navigation"}
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>

              <div className="flex min-w-0 items-start gap-3">
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sky-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:flex">
                  <HeaderIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Admin Workspace
                  </p>
                  <h1 className="truncate text-xl font-semibold text-slate-950 md:text-2xl">
                    {routeMeta.label}
                  </h1>
                  <p className="hidden max-w-3xl text-sm leading-6 text-slate-500 md:block">
                    {routeMeta.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex"
              >
                View site
                <ExternalLink className="h-4 w-4" />
              </Link>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Current user
                </p>
                <p className="mt-0.5 max-w-[180px] truncate text-sm font-medium text-slate-800">
                  {userName}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-[1680px] px-4 py-6 md:px-8 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
