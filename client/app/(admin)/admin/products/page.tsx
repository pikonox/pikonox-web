export const dynamic = "force-dynamic";

import { getProducts } from "@/actions/products";
import { deleteProduct } from "@/actions/products";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

export default async function ProductsListPage() {
  const items = await getProducts(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{items.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Add Product
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Price</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">No products yet.</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.category}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{item.price}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/products/${item.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={async () => { "use server"; await deleteProduct(item.id); }}>
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
