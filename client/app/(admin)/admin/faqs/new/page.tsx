export const dynamic = "force-dynamic";

import FAQForm from "@/components/admin/forms/FAQForm";

export default function NewFAQPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add FAQ</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <FAQForm />
      </div>
    </div>
  );
}
