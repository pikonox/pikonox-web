"use client";

import { useState, useTransition } from "react";
import { approveGuestAsBlogPost, setGuestPostStatus } from "@/actions/guestPosts";
import toast from "react-hot-toast";
import Link from "next/link";

type Row = {
  id: string;
  authorName: string;
  authorEmail: string;
  title: string;
  status: string;
  createdAt: Date;
  blogPostId: string | null;
};

export default function GuestPostsTable({ rows }: { rows: Row[] }) {
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  function run(id: string, fn: () => Promise<{ success: boolean; error?: string; blogPostId?: string }>) {
    setBusyId(id);
    startTransition(async () => {
      const res = await fn();
      setBusyId(null);
      if (res.success) {
        toast.success("Updated");
        window.location.reload();
      } else toast.error(res.error ?? "Failed");
    });
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Author</th>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                No submissions yet.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{r.authorName}</div>
                  <div className="text-xs text-gray-500">{r.authorEmail}</div>
                </td>
                <td className="px-4 py-3 max-w-xs truncate" title={r.title}>
                  {r.title}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100">{r.status}</span>
                </td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  {r.blogPostId && (
                    <Link href={`/admin/blog/${r.blogPostId}`} className="text-blue-600 hover:underline text-xs">
                      Open draft
                    </Link>
                  )}
                  {r.status === "pending" && (
                    <>
                      <button
                        type="button"
                        disabled={pending && busyId === r.id}
                        className="text-xs font-medium text-emerald-700 hover:underline disabled:opacity-50"
                        onClick={() => run(r.id, () => approveGuestAsBlogPost(r.id))}
                      >
                        Approve → blog draft
                      </button>
                      <button
                        type="button"
                        disabled={pending && busyId === r.id}
                        className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                        onClick={() => run(r.id, () => setGuestPostStatus(r.id, "rejected"))}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
