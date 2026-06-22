export const dynamic = "force-dynamic";

import BlogForm from "@/components/admin/forms/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Blog Post</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BlogForm />
      </div>
    </div>
  );
}
