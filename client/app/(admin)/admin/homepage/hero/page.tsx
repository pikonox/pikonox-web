export const dynamic = "force-dynamic";

import { getSection } from "@/actions/homepage";
import HeroAdminForm from "@/components/admin/forms/HeroAdminForm";

export default async function HeroAdminPage() {
  const data = await getSection("hero");
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Hero Section</h1>
      <p className="text-gray-500 text-sm mb-6">Edit the homepage hero / banner section.</p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <HeroAdminForm data={data} />
      </div>
    </div>
  );
}
