export const dynamic = "force-dynamic";

import { getTestimonialById } from "@/actions/testimonials";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getTestimonialById(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Testimonial</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TestimonialForm item={item} />
      </div>
    </div>
  );
}