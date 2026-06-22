export const dynamic = "force-dynamic";

import Link from "next/link";
import { 
  ArrowRight, Briefcase, FileText, Globe, LayoutDashboard, 
  Mail, Search, ShieldCheck, Users, Star, MessageCircle,
  Package, PenTool, BookOpen, Settings, Eye, Inbox
} from "lucide-react";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [
    services, portfolios, blogs, products,
    team, testimonials, faqs, submissions, guestPosts,
    headerConfig, footerConfig, pageConfigs
  ] = await Promise.all([
    prisma.service.count({ where: { isActive: true } }),
    prisma.portfolio.count({ where: { isActive: true } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.testimonial.count({ where: { isActive: true } }),
    prisma.fAQ.count({ where: { isActive: true } }),
    prisma.contactSubmission.count(),
    prisma.guestPostSubmission.count(),
    prisma.headerConfig.count(),
    prisma.footerConfig.count(),
    prisma.pageConfig.count(),
  ]);

  const totalLeads = submissions + guestPosts;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 py-7 text-white shadow-lg md:px-8 md:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
              🚀 Welcome to PikoNox Admin
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Manage Your Website Easily! 👋
            </h2>
            <p className="mt-4 text-sm leading-7 text-blue-100 md:text-base">
              All your content is here. Edit pages, add services, manage blog posts, and track leads - no coding needed!
            </p>
          </div>
          <Link 
            href="/admin/site-settings?tab=header"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            ⚙️ Quick Settings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Real-time Stats */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Services */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">🛠️</span>
            <span className="text-3xl font-bold text-blue-600">{services}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Active Services</p>
          <Link href="/admin/services" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Portfolio */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">💼</span>
            <span className="text-3xl font-bold text-purple-600">{portfolios}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Portfolio Projects</p>
          <Link href="/admin/portfolio" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Blog */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">📝</span>
            <span className="text-3xl font-bold text-green-600">{blogs}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Published Blogs</p>
          <Link href="/admin/blog" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Products */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">🛒</span>
            <span className="text-3xl font-bold text-orange-600">{products}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Active Products</p>
          <Link href="/admin/products" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Team */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">👥</span>
            <span className="text-3xl font-bold text-indigo-600">{team}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Team Members</p>
          <Link href="/admin/team" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Testimonials */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">⭐</span>
            <span className="text-3xl font-bold text-yellow-500">{testimonials}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Testimonials</p>
          <Link href="/admin/testimonials" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* FAQs */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">❓</span>
            <span className="text-3xl font-bold text-cyan-600">{faqs}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">FAQs</p>
          <Link href="/admin/faqs" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>

        {/* Leads */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-3xl">📬</span>
            <span className="text-3xl font-bold text-red-500">{totalLeads}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">Total Leads</p>
          <Link href="/admin/submissions" className="text-xs text-blue-600 hover:underline">View all →</Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/site-settings?tab=header" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🎨</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">Header & Logo</p>
              <p className="text-xs text-slate-500">Edit brand, menu, phone, CTA</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/homepage/hero" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🏠</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">Homepage Hero</p>
              <p className="text-xs text-slate-500">Edit main banner section</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/services" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🛠️</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">Add New Service</p>
              <p className="text-xs text-slate-500">Create service with SEO</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/blog/new" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">✍️</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">Write Blog Post</p>
              <p className="text-xs text-slate-500">Add new article</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/seo" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🔍</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">SEO Settings</p>
              <p className="text-xs text-slate-500">Meta titles & descriptions</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/submissions" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition group">
          <div className="flex items-center gap-4">
            <span className="text-3xl">📩</span>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-600">Check Leads</p>
              <p className="text-xs text-slate-500">{submissions} contact, {guestPosts} guest posts</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Site Config Status */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">⚡ Site Configuration Status</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className={`p-4 rounded-xl ${headerConfig > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className="font-medium">{headerConfig > 0 ? '✅' : '⚠️'} Header Config</p>
            <p className="text-xs text-slate-500">{headerConfig > 0 ? 'Configured' : 'Using defaults'}</p>
          </div>
          <div className={`p-4 rounded-xl ${footerConfig > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className="font-medium">{footerConfig > 0 ? '✅' : '⚠️'} Footer Config</p>
            <p className="text-xs text-slate-500">{footerConfig > 0 ? 'Configured' : 'Using defaults'}</p>
          </div>
          <div className={`p-4 rounded-xl ${pageConfigs > 0 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className="font-medium">{pageConfigs > 0 ? '✅' : '⚠️'} Page SEO</p>
            <p className="text-xs text-slate-500">{pageConfigs} pages configured</p>
          </div>
        </div>
      </section>
    </div>
  );
}