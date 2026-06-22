export const dynamic = "force-dynamic";

import { getBlogById } from "@/actions/blog";
import BlogForm from "@/components/admin/forms/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogById(id);
  if (!post) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog Post</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BlogForm item={post} />
      </div>
    </div>
  );
}