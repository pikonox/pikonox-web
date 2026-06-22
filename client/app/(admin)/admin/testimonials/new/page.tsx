export const dynamic = "force-dynamic";

import TestimonialForm from "@/components/admin/forms/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Testimonial</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TestimonialForm />
      </div>
    </div>
  );
}
