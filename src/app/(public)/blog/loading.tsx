export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-pulse">
      <div className="h-16 bg-white border-b border-gray-100" />
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded-lg" />
        <div className="h-5 w-96 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 space-y-3">
              <div className="h-40 bg-gray-100 rounded-lg" />
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
