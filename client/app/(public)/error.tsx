"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          This page encountered an error. This is usually a temporary issue.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-blue-700 transition-colors text-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
