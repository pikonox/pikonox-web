export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-sm text-gray-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
