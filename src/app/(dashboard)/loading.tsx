export default function DashboardLoading() {
  return (
    <div className="flex h-screen animate-pulse">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex w-64 bg-gray-50 border-r border-gray-100 flex-col p-4 space-y-3">
        <div className="h-8 w-32 bg-gray-200 rounded-lg mb-6" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 bg-gray-100 rounded-lg" />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-50 rounded-xl border border-gray-100" />
      </div>
    </div>
  );
}
