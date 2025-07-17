"use client"

import { useEffect, useState } from "react"
import { MovieHeroSection } from "@/components/movie-hero-section"
import { MovieInfoSection } from "@/components/movie-info-section"
import { MovieScenesSection } from "@/components/scene-explorer/movie-scenes-section"
import { ReviewSystemSection } from "@/components/review-system-section"
import { RelatedMoviesSection } from "@/components/related-movies-section"
import { SidduPulseSection } from "@/components/siddu-pulse-section"
import { WhereToWatchSection } from "@/components/where-to-watch-section"
import { movieData } from "./page-data" // Updated import

// The rest of the movieData object definition is now in page-data.ts

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  // isLoading state can be simplified or removed if content is not fetched async here
  const [isContentLoading, setIsContentLoading] = useState(true)
  const movieId = params.id // movieId is still relevant for fetching specific content if needed

  useEffect(() => {
    // Simulate loading for content specific to this page (if any)
    const timer = setTimeout(() => {
      setIsContentLoading(false)
    }, 500) // Shorter delay as layout handles initial load

    return () => clearTimeout(timer)
  }, [])

  // If the main content of this overview page is static (like from movieData),
  // isContentLoading might not be strictly necessary unless sections fetch their own data.
  if (isContentLoading && movieId === movieData.id) {
    // Check against mock data ID
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#282828] border-t-[#00BFFF] rounded-full animate-spin"></div>
      </div>
    )
  }

  // Assuming params.id matches our mock movieData.id for this example
  if (params.id !== movieData.id) {
    return <div className="py-8 px-4 text-center">Movie not found.</div>
  }

  return (
    <>
      {/* Hero Section - This is part of the overview, so it stays */}
      <MovieHeroSection movie={movieData} />

      {/* Sections specific to the Overview page */}
      <MovieInfoSection movie={movieData} />
      <WhereToWatchSection
        movieId={movieData.id}
        movieTitle={movieData.title}
        streamingOptions={movieData.streamingOptions}
        userRegion="US"
      />
      <MovieScenesSection movieId={movieData.id} movieTitle={movieData.title} limit={4} showViewAll={true} />
      <ReviewSystemSection movie={movieData} />
      <RelatedMoviesSection movies={movieData.relatedMovies} />
      <SidduPulseSection movieTitle={movieData.title} movieId={movieData.id} pulses={movieData.pulses} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-[20vh] flex items-center justify-center text-[#A0A0A0] text-lg font-dmsans">
          Additional overview details.
        </div>
      </div>
    </>
  )
}
