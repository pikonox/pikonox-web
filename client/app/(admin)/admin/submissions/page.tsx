export const dynamic = "force-dynamic";

import { getSubmissions, markSubmissionRead, deleteSubmission } from "@/actions/contact";
import { CheckCheck, Trash2, Mail, MailOpen } from "lucide-react";
import { format } from "date-fns";

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();
  const unread = submissions.filter((s) => !s.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {submissions.length} total &mdash; {unread} unread
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {submissions.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-12 text-center text-gray-400">
            No submissions yet.
          </div>
        )}
        {submissions.map((s) => (
          <div
            key={s.id}
            className={`bg-white rounded-xl border p-5 ${!s.isRead ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {s.isRead ? (
                    <MailOpen className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  )}
                  <span className="font-semibold text-gray-900">
                    {s.firstName} {s.lastName}
                  </span>
                  <span className="text-sm text-gray-500">&lt;{s.email}&gt;</span>
                  {s.service && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                      {s.service}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{s.message}</p>
                {s.phone && (
                  <p className="text-xs text-gray-400 mt-1">Phone: {s.phone}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">
                  {format(new Date(s.createdAt), "MMM d, yyyy HH:mm")}
                </span>
                {!s.isRead && (
                  <form action={async () => { "use server"; await markSubmissionRead(s.id); }}>
                    <button
                      type="submit"
                      title="Mark as read"
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  </form>
                )}
                <form action={async () => { "use server"; await deleteSubmission(s.id); }}>
                  <button
                    type="submit"
                    title="Delete"
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
