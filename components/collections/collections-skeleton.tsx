"use client"

export function CollectionsSkeleton() {
  return (
    <div className="min-h-screen bg-siddu-deep-night">
      {/* Header Skeleton */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="h-16 w-16 bg-siddu-light-grey rounded-full animate-pulse mx-auto" />
            <div className="h-12 bg-siddu-light-grey rounded-lg animate-pulse w-3/4 mx-auto" />
            <div className="h-6 bg-siddu-light-grey rounded-lg animate-pulse max-w-2xl mx-auto" />
            <div className="h-12 bg-siddu-light-grey rounded-lg animate-pulse w-52 mx-auto" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Skeleton */}
        <div className="bg-siddu-dark-grey/50 rounded-xl p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-12 bg-siddu-light-grey rounded-lg animate-pulse lg:col-span-2" />
            <div className="h-12 bg-siddu-light-grey rounded-lg animate-pulse" />
            <div className="h-12 bg-siddu-light-grey rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="space-y-12">
          {/* Section Skeleton */}
          <section>
            <div className="h-8 bg-siddu-light-grey rounded-lg animate-pulse w-64 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <CollectionCardSkeleton key={i} />
              ))}
            </div>
          </section>
          {/* Section Skeleton */}
          <section>
            <div className="h-8 bg-siddu-light-grey rounded-lg animate-pulse w-64 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <CollectionCardSkeleton key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function CollectionCardSkeleton() {
  return (
    <div className="bg-siddu-dark-grey rounded-xl overflow-hidden border border-siddu-light-grey">
      <div className="aspect-[16/9] bg-siddu-light-grey animate-pulse" />
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-siddu-light-grey animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-siddu-light-grey rounded animate-pulse" />
            <div className="h-4 bg-siddu-light-grey rounded animate-pulse w-1/3" />
          </div>
        </div>
        <div className="h-4 bg-siddu-light-grey rounded animate-pulse" />
        <div className="h-4 bg-siddu-light-grey rounded animate-pulse w-3/4" />
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-siddu-light-grey rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-siddu-light-grey rounded-full animate-pulse" />
        </div>
        <div className="pt-4 border-t border-siddu-light-grey flex justify-between">
          <div className="h-4 bg-siddu-light-grey rounded animate-pulse w-20" />
          <div className="h-4 bg-siddu-light-grey rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  )
}
