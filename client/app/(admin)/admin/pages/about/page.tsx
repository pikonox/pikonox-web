export const dynamic = "force-dynamic";

import { getTeamMembers } from "@/actions/team";
import { getFAQs } from "@/actions/faqs";
import Link from "next/link";
import { Pencil, Users, MessageCircleQuestion, FileText } from "lucide-react";

export default async function AboutPageAdmin() {
  const [team, faqs] = await Promise.all([
    getTeamMembers(false),
    getFAQs(false),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Us Page</h1>
        <p className="text-gray-500 text-sm">Manage all sections of your About page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Page Settings</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">SEO, breadcrumb, and page title.</p>
          <Link 
            href="/admin/site-settings?tab=pages" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Page Settings
          </Link>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Team Members</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Currently {team.length} team members.</p>
          <div className="flex gap-2">
            <Link 
              href="/admin/team" 
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              <Pencil className="w-4 h-4" /> Manage Team
            </Link>
            <Link 
              href="/admin/team/new" 
              className="inline-flex items-center gap-1 text-green-600 text-sm font-medium hover:underline"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">FAQs</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Currently {faqs.length} FAQ entries.</p>
          <div className="flex gap-2">
            <Link 
              href="/admin/faqs" 
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              <Pencil className="w-4 h-4" /> Manage FAQs
            </Link>
            <Link 
              href="/admin/faqs/new" 
              className="inline-flex items-center gap-1 text-green-600 text-sm font-medium hover:underline"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* About History Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Company History</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Edit timeline and company journey.</p>
          <Link 
            href="/admin/site-cms?key=about-history" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit History
          </Link>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Mission & Vision</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Edit mission, vision sections.</p>
          <Link 
            href="/admin/site-cms?key=about-why" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Sections
          </Link>
        </div>

        {/* Brand Strip */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Brand Logos</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Edit client/partner logos shown.</p>
          <Link 
            href="/admin/site-cms?key=page-about" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Brands
          </Link>
        </div>
      </div>
    </div>
  );
}