export const dynamic = "force-dynamic";

import { getProductById } from "@/actions/products";
import ProductForm from "@/components/admin/forms/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getProductById(id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm item={item} />
      </div>
    </div>
  );
}