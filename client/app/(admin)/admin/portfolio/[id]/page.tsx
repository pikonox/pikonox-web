export const dynamic = "force-dynamic";

import { getPortfolioById } from "@/actions/portfolio";
import PortfolioForm from "@/components/admin/forms/PortfolioForm";
import { notFound } from "next/navigation";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getPortfolioById(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Portfolio Item</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PortfolioForm item={item} />
      </div>
    </div>
  );
}