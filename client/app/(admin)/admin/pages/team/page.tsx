export const dynamic = "force-dynamic";

import { getTeamMembers } from "@/actions/team";
import Link from "next/link";
import { Pencil, Plus, Users } from "lucide-react";

export default async function TeamPageAdmin() {
  const team = await getTeamMembers(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Page</h1>
        <p className="text-gray-500 text-sm">Manage team members shown on your Team page.</p>
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
              <Pencil className="w-4 h-4" /> Manage
            </Link>
            <Link 
              href="/admin/team/new" 
              className="inline-flex items-center gap-1 text-green-600 text-sm font-medium hover:underline"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* Team Page Config */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pencil className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Team Page Config</h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">Page-specific content and layout.</p>
          <Link 
            href="/admin/site-cms?key=page-team" 
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
          >
            <Pencil className="w-4 h-4" /> Edit Config
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Active Team Members</h3>
        <div className="space-y-3">
          {team.filter(t => t.isActive).slice(0, 5).map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {member.avatar && (
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div>
                  <span className="font-medium text-gray-800">{member.name}</span>
                  {member.title && <span className="text-gray-500 text-sm ml-2">- {member.title}</span>}
                </div>
              </div>
              <Link 
                href={`/admin/team/${member.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
          {team.filter(t => t.isActive).length === 0 && (
            <p className="text-gray-400 text-sm">No active team members yet. Add your first team member!</p>
          )}
        </div>
      </div>
    </div>
  );
}