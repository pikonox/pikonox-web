export const dynamic = "force-dynamic";

import { getBlogPosts } from "@/actions/blog";
import { deleteBlogPost } from "@/actions/blog";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

export default async function BlogListPage() {
  const posts = await getBlogPosts(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-0.5">{posts.length} total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Add Post
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No blog posts yet.
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.isPublished
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={async () => { "use server"; await deleteBlogPost(p.id); }}>
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
