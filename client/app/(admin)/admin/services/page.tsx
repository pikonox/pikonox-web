export const dynamic = "force-dynamic";

import { getServices } from "@/actions/services";
import { deleteService } from "@/actions/services";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

export default async function ServicesListPage() {
  const services = await getServices(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 text-sm mt-0.5">{services.length} total</p>
        </div>
        <Link href="/admin/services/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <PlusCircle className="w-4 h-4" /> Add Service
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Short Desc</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No services yet.</td></tr>
            )}
            {services.map((s: any) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-gray-100"
                      style={{ backgroundColor: (s as any).iconBg || "#EFF6FF" }}
                    >
                      {s.icon && (s.icon.startsWith("http") || s.icon.startsWith("/")) ? (
                        <img src={s.icon} alt="" className="w-5 h-5 object-contain" />
                      ) : s.icon ? (
                        <span className="text-base leading-none">{s.icon}</span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{s.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate hidden md:table-cell">{s.shortDesc}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {s.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/services/${s.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={async () => { "use server"; await deleteService(s.id); }}>
                      <button type="submit" className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
