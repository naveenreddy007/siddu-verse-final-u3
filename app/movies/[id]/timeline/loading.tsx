"use client"

import { MovieDetailsNavigation } from "@/components/movie-details-navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"

export default function TimelineLoading() {
  const breadcrumbItems = [
    { label: "Movies", href: "/movies" },
    { label: "Loading...", href: "#" },
    { label: "Timeline", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-[#101010] font-dmsans">
      <MovieDetailsNavigation movieId="loading" movieTitle="Loading..." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
        <BreadcrumbNavigation items={breadcrumbItems} />

        <header className="my-8 text-center sm:text-left">
          <div className="h-12 w-3/4 bg-[#2A2A2A] rounded mb-3 mx-auto sm:mx-0"></div>
          <div className="h-6 w-full sm:w-5/6 bg-[#2A2A2A] rounded mx-auto sm:mx-0"></div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="bg-[#1C1C1C] rounded-xl p-4 sm:p-6 mb-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center">
                <div className="h-10 bg-[#2A2A2A] rounded"></div> {/* Search */}
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                  <div className="h-10 w-24 bg-[#2A2A2A] rounded"></div> {/* Zoom */}
                  <div className="h-10 w-32 bg-[#2A2A2A] rounded"></div> {/* View Toggle */}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-24 bg-[#2A2A2A] rounded"></div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                <div className="h-8 bg-[#2A2A2A] rounded w-1/2"></div> {/* Jump to Year */}
              </div>
            </div>

            <div className="relative space-y-10">
              <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-[#2A2A2A] rounded-full -translate-x-1/2"></div>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 z-10 hidden md:block`}
                  >
                    <div className={`w-full h-full rounded-full bg-[#2A2A2A] border-4 border-[#101010]`}></div>
                  </div>
                  <div className={`absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10 md:hidden`}>
                    <div className={`w-full h-full rounded-full bg-[#2A2A2A] border-2 border-[#101010]`}></div>
                  </div>
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <div
                      className={`w-64 sm:w-80 p-4 bg-[#1C1C1C] rounded-xl shadow-lg ml-10 md:ml-0 ${index % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}
                    >
                      <div className="h-32 bg-[#2A2A2A] rounded-lg mb-3"></div>
                      <div className="h-4 w-1/2 bg-[#2A2A2A] rounded mb-1"></div>
                      <div className="h-6 w-3/4 bg-[#2A2A2A] rounded mb-2"></div>
                      <div className="h-4 w-full bg-[#2A2A2A] rounded mb-1"></div>
                      <div className="h-4 w-5/6 bg-[#2A2A2A] rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start">
            <div className="bg-[#1C1C1C] rounded-xl p-6 shadow-xl">
              <div className="h-6 w-3/4 bg-[#2A2A2A] rounded mb-4"></div>
              <div className="space-y-3 mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-full bg-[#2A2A2A] rounded mb-1"></div>
                    <div className="h-3 w-1/2 bg-[#2A2A2A] rounded"></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                <div className="h-6 w-1/2 bg-[#2A2A2A] rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-4 w-2/5 bg-[#2A2A2A] rounded"></div>
                      <div className="h-4 w-1/5 bg-[#2A2A2A] rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
