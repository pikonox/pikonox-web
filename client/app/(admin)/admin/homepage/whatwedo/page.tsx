export const dynamic = "force-dynamic";

import { getSection } from "@/actions/homepage";
import WhatWeDoAdminForm from "@/components/admin/forms/WhatWeDoAdminForm";

export default async function WhatWeDoAdminPage() {
  const data = await getSection("whatwedo");
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">What We Do Section</h1>
      <p className="text-gray-500 text-sm mb-6">Edit the homepage services / what we do section.</p>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <WhatWeDoAdminForm data={data} />
      </div>
    </div>
  );
}
