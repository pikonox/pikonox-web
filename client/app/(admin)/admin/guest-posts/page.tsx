export const dynamic = "force-dynamic";

import GuestPostsTable from "@/components/admin/GuestPostsTable";
import { listGuestPosts } from "@/actions/guestPosts";

export default async function AdminGuestPostsPage() {
  const rows = await listGuestPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Guest post submissions</h1>
      <p className="text-gray-600 text-sm mb-6">
        Approve creates a <strong>draft</strong> blog post (unpublished). Open it from Blog admin to edit SEO and publish.
      </p>
      <GuestPostsTable rows={rows as any} />
    </div>
  );
}
