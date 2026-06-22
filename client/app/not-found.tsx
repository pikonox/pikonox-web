import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-black text-primary mb-4">404</p>
        <h1 className="text-3xl font-black text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
