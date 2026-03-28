export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-gray-100" />

      {/* Hero skeleton */}
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center space-y-4">
        <div className="h-5 w-32 bg-gray-200 rounded-full mx-auto" />
        <div className="h-10 w-96 bg-gray-200 rounded-lg mx-auto" />
        <div className="h-5 w-80 bg-gray-100 rounded-lg mx-auto" />
        <div className="h-12 w-44 bg-gray-200 rounded-lg mx-auto mt-6" />
      </div>

      {/* Content skeleton */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        <div className="h-6 w-64 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
