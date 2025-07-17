"use client"

import type React from "react"

import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MovieDetailsNavigation } from "@/components/movie-details-navigation"
import { movieData as inceptionMovieData } from "./page-data" // Assuming page-data.ts holds the mock

export default function MovieSubGroupLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  // In a real app, you'd fetch minimal movie data (title) here based on params.id
  // For this mock, we'll use the imported Inception data if the ID matches.
  const currentMovie = params.id === inceptionMovieData.id ? inceptionMovieData : { id: params.id, title: "Movie" }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-[#1A1A1A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center">
          <Link href="/movies" className="text-[#E0E0E0] hover:text-[#00BFFF] transition-colors flex items-center">
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Back to Movies</span>
          </Link>
          <h1 className="ml-4 text-lg sm:text-xl font-semibold truncate">{currentMovie.title}</h1>
        </div>
      </div>

      {/* Movie Details Navigation - Sticky under Top Bar */}
      {/* The navigation itself has top-14/top-16 for its sticky position */}
      <div className="pt-[52px] sm:pt-[60px]">
        {" "}
        {/* Adjust padding to match top bar height */}
        <MovieDetailsNavigation movieId={currentMovie.id} movieTitle={currentMovie.title} />
      </div>

      {/* Page Content */}
      <main>
        <Suspense fallback={<MovieSubPageLoading />}>{children}</Suspense>
      </main>
    </div>
  )
}

function MovieSubPageLoading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <div className="w-12 h-12 border-4 border-[#282828] border-t-[#00BFFF] rounded-full animate-spin"></div>
    </div>
  )
}
