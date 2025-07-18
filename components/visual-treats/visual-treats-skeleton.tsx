export function VisualTreatsSkeleton() {
  return (
    <div className="min-h-screen bg-[#101010] p-4 md:p-8 text-white">
      <div className="container mx-auto">
        <div className="animate-pulse">
          <div className="mb-12 text-center">
            <div className="h-12 w-3/4 bg-gray-800 rounded-lg mb-4 mx-auto"></div>
            <div className="h-6 w-1/2 bg-gray-800 rounded-lg mx-auto"></div>
          </div>

          <div className="mb-8 p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="h-11 w-full md:max-w-md bg-gray-800 rounded-md"></div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="h-11 w-12 bg-gray-800 rounded-md"></div>
                <div className="h-11 w-32 bg-gray-800 rounded-md"></div>
              </div>
            </div>
          </div>

          <div className="h-4 w-48 bg-gray-800 rounded mb-6"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg p-4 flex flex-col justify-end">
                  <div className="h-5 w-3/4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
