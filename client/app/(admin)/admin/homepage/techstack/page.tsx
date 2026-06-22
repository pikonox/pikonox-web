export const dynamic = "force-dynamic";

import { getSection } from "@/actions/homepage";
import TechStackAdminForm from "@/components/admin/forms/TechStackAdminForm";

export default async function TechStackAdminPage() {
  const data = await getSection("home-techstack");
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Tech Stack Section</h1>
      <p className="text-gray-500 text-sm mb-6">Edit the technology logos and brands shown on homepage.</p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TechStackAdminForm data={data} />
      </div>
    </div>
  );
}