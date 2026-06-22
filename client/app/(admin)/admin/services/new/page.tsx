export const dynamic = "force-dynamic";

import ServiceForm from "@/components/admin/forms/ServiceForm";
export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ServiceForm />
      </div>
    </div>
  );
}
