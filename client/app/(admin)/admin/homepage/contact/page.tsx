export const dynamic = "force-dynamic";

import { getSection } from "@/actions/homepage";
import ContactAdminForm from "@/components/admin/forms/ContactAdminForm";

export default async function ContactAdminPage() {
  const data = await getSection("contact");
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Section</h1>
      <p className="text-gray-500 text-sm mb-6">Edit the homepage contact section details.</p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ContactAdminForm data={data} />
      </div>
    </div>
  );
}
