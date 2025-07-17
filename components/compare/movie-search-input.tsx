"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { searchMoviesForCompare } from "@/lib/api"
import Image from "next/image"

interface SearchResult {
  id: string
  title: string
  year: string
  posterUrl: string
}

interface MovieSearchInputProps {
  onMovieSelect: (movieId: string) => void
  placeholder?: string
}

export function MovieSearchInput({ onMovieSelect, placeholder = "Search for a movie..." }: MovieSearchInputProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.length > 2) {
        setIsLoading(true)
        const movies = await searchMoviesForCompare(debouncedQuery)
        setResults(movies)
        setIsLoading(false)
      } else {
        setResults([])
      }
    }
    search()
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (movieId: string) => {
    onMovieSelect(movieId)
    setQuery("")
    setResults([])
    setIsFocused(false)
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 bg-[#282828] border-gray-700 text-white rounded-lg text-base focus:border-primary focus:ring-primary"
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )
        )}
      </div>

      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-[#282828] border border-gray-700 rounded-lg shadow-2xl z-10 overflow-hidden"
          >
            {results.map((movie) => (
              <li key={movie.id}>
                <button
                  onClick={() => handleSelect(movie.id)}
                  className="w-full text-left flex items-center p-3 hover:bg-primary/10 transition-colors duration-150"
                >
                  <Image
                    src={movie.posterUrl || "/placeholder.svg?height=75&width=50"}
                    alt={movie.title}
                    width={40}
                    height={60}
                    className="rounded-sm mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{movie.title}</p>
                    <p className="text-sm text-gray-400">{movie.year}</p>
                  </div>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
