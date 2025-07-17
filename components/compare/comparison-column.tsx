"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { X, Star, Film, Clock, Calendar, DollarSign, Award, Globe, Languages } from "lucide-react"
import type { ComparisonMovie } from "./types"
import { StreamingServiceLogo } from "@/components/streaming-service-logo"
import { Button } from "@/components/ui/button"

interface ComparisonColumnProps {
  movie: ComparisonMovie
  onRemove: (movieId: string) => void
  isHighlighted?: boolean
}

const StatItem = ({
  icon: Icon,
  label,
  value,
  isBetter = false,
  isWorse = false,
}: { icon: React.ElementType; label: string; value: string | number; isBetter?: boolean; isWorse?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-800">
    <div className="flex items-center text-sm text-gray-400">
      <Icon className="h-4 w-4 mr-3" />
      <span>{label}</span>
    </div>
    <span
      className={`font-semibold text-right ${isBetter ? "text-green-400" : isWorse ? "text-red-400" : "text-white"}`}
    >
      {value}
    </span>
  </div>
)

export function ComparisonColumn({ movie, onRemove, isHighlighted = false }: ComparisonColumnProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative bg-[#1F1F1F] rounded-xl border ${isHighlighted ? "border-primary" : "border-gray-800"} shadow-2xl flex flex-col`}
    >
      <div className="p-4">
        <div className="relative">
          <Image
            src={movie.posterUrl || "/placeholder.svg?height=450&width=300"}
            alt={`Poster for ${movie.title}`}
            width={300}
            height={450}
            className="w-full h-auto rounded-lg object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(movie.id)}
            className="absolute top-2 right-2 bg-black/50 text-gray-300 hover:bg-black/80 hover:text-white rounded-full h-8 w-8"
            aria-label={`Remove ${movie.title}`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
          <p className="text-gray-400">{movie.year}</p>
        </div>
      </div>

      <div className="px-4 pb-4 flex-grow">
        <div className="bg-[#1A1A1A] p-4 rounded-lg">
          <StatItem icon={Star} label="Siddu Score" value={movie.sidduScore || "N/A"} />
          <StatItem icon={Clock} label="Runtime" value={movie.runtime ? `${movie.runtime} min` : "N/A"} />
          <StatItem icon={Film} label="Genres" value={movie.genres?.join(", ") || "N/A"} />
          <StatItem icon={Calendar} label="Director" value={movie.director || "N/A"} />
          <StatItem icon={DollarSign} label="Budget" value={movie.boxOffice?.budget || "N/A"} />
          <StatItem icon={Globe} label="Worldwide Gross" value={movie.boxOffice?.worldwideGross || "N/A"} />
          <StatItem icon={Award} label="Oscars Won" value={movie.awards?.oscarsWon ?? "N/A"} />
          <StatItem icon={Languages} label="Language" value={movie.language || "N/A"} />
        </div>
      </div>

      <div className="p-4 mt-auto">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Where to Watch</h4>
        <div className="flex flex-wrap gap-3 items-center justify-center bg-[#1A1A1A] p-3 rounded-lg min-h-[60px]">
          {movie.streamingOptions && Object.keys(movie.streamingOptions).length > 0 ? (
            Object.entries(movie.streamingOptions).map(([service, details]) => (
              <StreamingServiceLogo key={service} service={service as any} className="h-8 w-auto" />
            ))
          ) : (
            <p className="text-xs text-gray-500">Not available for streaming</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
