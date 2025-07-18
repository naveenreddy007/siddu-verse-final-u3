"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CollectionsSkeleton() {
  return (
    <div className="min-h-screen bg-siddu-deep-night">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-siddu-deep-night via-siddu-dark-grey to-siddu-deep-night">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-12 w-64 bg-siddu-dark-grey" />
            <Skeleton className="h-6 w-96 bg-siddu-dark-grey" />
            <Skeleton className="h-10 w-40 bg-siddu-dark-grey" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filters Skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-full bg-siddu-dark-grey" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 bg-siddu-dark-grey" />
            <Skeleton className="h-10 w-32 bg-siddu-dark-grey" />
          </div>
        </div>

        {/* Collections Grid Skeleton */}
        <div className="space-y-12">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-6">
              <Skeleton className="h-8 w-48 bg-siddu-dark-grey" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item} className="bg-siddu-dark-grey border-siddu-dark-grey">
                    <div className="aspect-[4/3]">
                      <Skeleton className="h-full w-full bg-siddu-deep-night" />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4 bg-siddu-deep-night" />
                      <Skeleton className="h-4 w-full bg-siddu-deep-night" />
                      <Skeleton className="h-4 w-2/3 bg-siddu-deep-night" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full bg-siddu-deep-night" />
                        <Skeleton className="h-4 w-20 bg-siddu-deep-night" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
