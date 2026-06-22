export const dynamic = "force-dynamic";

import { getServiceById } from "@/actions/services";
import ServiceForm from "@/components/admin/forms/ServiceForm";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Service</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}