"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374l7.048-12.748c.866-1.5 3.032-1.5 3.898 0l7.048 12.748z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Page Error</h2>
        <p className="text-gray-500 text-sm mb-6">
          {error.message || "An unexpected error occurred on this page."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Retry
          </button>
          <Link
            href="/admin"
            className="px-5 py-2 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
