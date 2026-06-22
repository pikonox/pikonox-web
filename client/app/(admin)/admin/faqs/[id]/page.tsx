export const dynamic = "force-dynamic";

import { getFAQById } from "@/actions/faqs";
import FAQForm from "@/components/admin/forms/FAQForm";
import { notFound } from "next/navigation";

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getFAQById(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit FAQ</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <FAQForm item={item} />
      </div>
    </div>
  );
}