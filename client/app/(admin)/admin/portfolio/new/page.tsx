export const dynamic = "force-dynamic";

import PortfolioForm from "@/components/admin/forms/PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Portfolio Item</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PortfolioForm />
      </div>
    </div>
  );
}
