"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, Film } from "lucide-react"
import { getMovieDetailsForCompare } from "@/lib/api"
import type { ComparisonMovie } from "@/components/compare/types"
import { MovieSearchInput } from "@/components/compare/movie-search-input"
import { ComparisonColumn } from "@/components/compare/comparison-column"
import { EmptyComparisonState } from "@/components/compare/empty-comparison-state"
import { useToast } from "@/hooks/use-toast"

const MAX_COMPARE_ITEMS = 4

export default function ComparePage() {
  const [movies, setMovies] = useState<ComparisonMovie[]>([])
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const handleAddMovie = useCallback(
    async (movieId: string) => {
      if (movies.length >= MAX_COMPARE_ITEMS) {
        toast({
          title: "Comparison Limit Reached",
          description: `You can only compare up to ${MAX_COMPARE_ITEMS} movies at a time.`,
          variant: "destructive",
        })
        return
      }
      if (movies.some((m) => m.id === movieId)) {
        toast({
          title: "Movie Already Added",
          description: "This movie is already in your comparison list.",
        })
        return
      }

      setIsLoading((prev) => ({ ...prev, [movieId]: true }))
      const movieDetails = await getMovieDetailsForCompare(movieId)
      if (movieDetails) {
        setMovies((prev) => [...prev, movieDetails])
      } else {
        toast({
          title: "Error",
          description: "Could not fetch movie details. Please try again.",
          variant: "destructive",
        })
      }
      setIsLoading((prev) => ({ ...prev, [movieId]: false }))
    },
    [movies, toast],
  )

  const handleRemoveMovie = (movieId: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="flex items-center mb-6">
          <Film className="h-8 w-8 mr-3 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Compare Movies</h1>
        </div>

        {movies.length === 0 ? (
          <EmptyComparisonState onMovieSelect={handleAddMovie} />
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.max(2, movies.length)} xl:grid-cols-${Math.max(2, movies.length + (movies.length < MAX_COMPARE_ITEMS ? 1 : 0))} gap-6 items-start`}
          >
            <AnimatePresence>
              {movies.map((movie) => (
                <ComparisonColumn key={movie.id} movie={movie} onRemove={handleRemoveMovie} />
              ))}
            </AnimatePresence>

            {movies.length < MAX_COMPARE_ITEMS && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-4 bg-[#1F1F1F] rounded-xl border border-dashed border-gray-700 flex flex-col items-center justify-center min-h-[500px]"
              >
                <PlusCircle className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-4">Add another movie</h3>
                <div className="w-full max-w-xs">
                  <MovieSearchInput onMovieSelect={handleAddMovie} />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
