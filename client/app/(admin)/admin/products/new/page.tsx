export const dynamic = "force-dynamic";

import ProductForm from "@/components/admin/forms/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Product</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm />
      </div>
    </div>
  );
}
