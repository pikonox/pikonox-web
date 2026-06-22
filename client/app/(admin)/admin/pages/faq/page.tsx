export const dynamic = "force-dynamic";

import { getFAQs } from "@/actions/faqs";
import Link from "next/link";
import { Pencil, Plus, MessageCircleQuestion } from "lucide-react";

export default async function FaqPageAdmin() {
  const faqs = await getFAQs(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FAQ Page</h1>
        <p className="text-gray-500 text-sm">Manage all FAQs shown on your FAQ page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pencil className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Page Settings</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">SEO, breadcrumb, and page title.</p>
          <Link 
            href="/admin/site-settings?tab=pages" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Settings
          </Link>
        </div>

        {/* FAQs List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircleQuestion className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">All FAQs</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Currently {faqs.length} FAQs.</p>
          <div className="flex gap-2">
            <Link 
              href="/admin/faqs" 
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
            >
              <Pencil className="w-4 h-4" /> Manage
            </Link>
            <Link 
              href="/admin/faqs/new" 
              className="inline-flex items-center gap-1 text-green-600 text-sm font-medium hover:underline"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* FAQ Page Specific */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pencil className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">FAQ Page Config</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Page-specific content and layout.</p>
          <Link 
            href="/admin/site-cms?key=page-faq" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Config
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent FAQs</h3>
        <div className="space-y-3">
          {faqs.slice(0, 5).map((faq) => (
            <div key={faq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800 truncate max-w-md">{faq.question}</span>
              <Link 
                href={`/admin/faqs/${faq.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="text-gray-400 text-sm">No FAQs yet. Add your first FAQ!</p>
          )}
        </div>
      </div>
    </div>
  );
}