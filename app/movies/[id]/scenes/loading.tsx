import SceneCardSkeleton from "@/components/scene-explorer/scene-card-skeleton"

export default function MovieScenesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="h-9 w-3/4 bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-1/2 bg-gray-700 rounded animate-pulse"></div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <SceneCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
