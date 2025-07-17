"use client"

import { motion } from "framer-motion"
import { Film } from "lucide-react"
import { MovieSearchInput } from "./movie-search-input"

interface EmptyComparisonStateProps {
  onMovieSelect: (movieId: string) => void
}

export function EmptyComparisonState({ onMovieSelect }: EmptyComparisonStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center p-8 bg-[#1F1F1F] rounded-xl border border-dashed border-gray-700 h-full min-h-[500px]"
    >
      <Film className="h-16 w-16 text-gray-600 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Movie Comparison</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Add two or more movies to compare their ratings, box office performance, awards, and more side-by-side.
      </p>
      <div className="w-full max-w-sm">
        <MovieSearchInput onMovieSelect={onMovieSelect} placeholder="Add first movie..." />
      </div>
    </motion.div>
  )
}
