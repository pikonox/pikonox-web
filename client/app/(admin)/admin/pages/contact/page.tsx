export const dynamic = "force-dynamic";

import Link from "next/link";
import { Pencil, Mail, MapPin, Phone } from "lucide-react";
import { getSection } from "@/actions/homepage";

export default async function ContactPageAdmin() {
  const pageData = await getSection("page-contact");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Page</h1>
        <p className="text-gray-500 text-sm">Manage all sections of your Contact page.</p>
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

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Address, phone, email displayed.</p>
          <Link 
            href="/admin/site-cms?key=page-contact" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Contact Info
          </Link>
        </div>

        {/* Contact Form Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Form Settings</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Form fields, labels, success message.</p>
          <Link 
            href="/admin/site-cms?key=contact-form" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Form
          </Link>
        </div>

        {/* Contact Submissions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Submissions</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">View all contact form submissions.</p>
          <Link 
            href="/admin/submissions" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> View Inbox
          </Link>
        </div>
      </div>
    </div>
  );
}