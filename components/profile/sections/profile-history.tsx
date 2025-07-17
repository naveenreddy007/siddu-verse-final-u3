"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2, Search, Filter, Clock, Calendar, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/profile/empty-state"
import Image from "next/image"
import Link from "next/link"

interface HistoryItem {
  id: string
  movieId: string
  movieTitle: string
  moviePosterUrl: string
  movieYear: string
  watchedDate: string
  formattedDate: string
  userRating?: number
  genres: string[]
}

interface ProfileHistoryProps {
  userId: string
}

export function ProfileHistory({ userId }: ProfileHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterRated, setFilterRated] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch watch history
    const fetchHistory = async () => {
      setIsLoading(true)

      // Mock data - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const mockHistory: HistoryItem[] = [
        {
          id: "h1",
          movieId: "m1",
          movieTitle: "Dune: Part Two",
          moviePosterUrl: "/dune-part-two-poster.png",
          movieYear: "2024",
          watchedDate: "2024-03-15",
          formattedDate: "Mar 15, 2024",
          userRating: 9,
          genres: ["Action", "Adventure", "Sci-Fi"],
        },
        {
          id: "h2",
          movieId: "m3",
          movieTitle: "Oppenheimer",
          moviePosterUrl: "/oppenheimer-inspired-poster.png",
          movieYear: "2023",
          watchedDate: "2024-03-10",
          formattedDate: "Mar 10, 2024",
          userRating: 10,
          genres: ["Biography", "Drama", "History"],
        },
        {
          id: "h3",
          movieId: "m4",
          movieTitle: "Poor Things",
          moviePosterUrl: "/poor-things-poster.png",
          movieYear: "2023",
          watchedDate: "2024-02-28",
          formattedDate: "Feb 28, 2024",
          userRating: 8,
          genres: ["Comedy", "Drama", "Romance", "Sci-Fi"],
        },
        {
          id: "h4",
          movieId: "m5",
          movieTitle: "Killers of the Flower Moon",
          moviePosterUrl: "/killers-of-the-flower-moon-poster.png",
          movieYear: "2023",
          watchedDate: "2024-02-15",
          formattedDate: "Feb 15, 2024",
          userRating: 9,
          genres: ["Crime", "Drama", "Western"],
        },
        {
          id: "h5",
          movieId: "m6",
          movieTitle: "Barbie",
          moviePosterUrl: "/barbie-movie-poster.png",
          movieYear: "2023",
          watchedDate: "2024-01-20",
          formattedDate: "Jan 20, 2024",
          genres: ["Adventure", "Comedy", "Fantasy"],
        },
        {
          id: "h6",
          movieId: "m7",
          movieTitle: "The Creator",
          moviePosterUrl: "/the-creator-poster.png",
          movieYear: "2023",
          watchedDate: "2024-01-05",
          formattedDate: "Jan 5, 2024",
          userRating: 7,
          genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
        },
        {
          id: "h7",
          movieId: "m8",
          movieTitle: "Asteroid City",
          moviePosterUrl: "/asteroid-city-poster.png",
          movieYear: "2023",
          watchedDate: "2023-12-25",
          formattedDate: "Dec 25, 2023",
          genres: ["Comedy", "Drama", "Romance"],
        },
        {
          id: "h8",
          movieId: "m9",
          movieTitle: "Inception",
          moviePosterUrl: "/inception-movie-poster.png",
          movieYear: "2010",
          watchedDate: "2023-12-10",
          formattedDate: "Dec 10, 2023",
          userRating: 10,
          genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
        },
      ]

      setHistory(mockHistory)
      setIsLoading(false)
    }

    fetchHistory()
  }, [userId])

  // Filter and sort history
  const filteredHistory = history
    .filter((item) => {
      // Apply search filter
      if (searchQuery) {
        return (
          item.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }
      return true
    })
    .filter((item) => {
      // Apply rating filter
      if (filterRated === "all") return true
      if (filterRated === "rated") return item.userRating !== undefined
      if (filterRated === "unrated") return item.userRating === undefined
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "recent") {
        return new Date(b.watchedDate).getTime() - new Date(a.watchedDate).getTime()
      }
      if (sortBy === "oldest") {
        return new Date(a.watchedDate).getTime() - new Date(b.watchedDate).getTime()
      }
      if (sortBy === "title-asc") {
        return a.movieTitle.localeCompare(b.movieTitle)
      }
      if (sortBy === "title-desc") {
        return b.movieTitle.localeCompare(a.movieTitle)
      }
      if (sortBy === "rating-desc") {
        return (b.userRating || 0) - (a.userRating || 0)
      }
      return 0
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div>
      {/* Filters and Search */}
      <motion.div
        className="bg-[#282828] rounded-lg p-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0] h-4 w-4" />
            <Input
              type="text"
              placeholder="Search watch history..."
              className="pl-10 bg-[#1A1A1A] border-[#3A3A3A] text-[#E0E0E0] placeholder:text-[#A0A0A0]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="text-[#A0A0A0] h-4 w-4" />
            <span className="text-[#A0A0A0] text-sm font-dmsans">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-[#1A1A1A] border-[#3A3A3A] text-[#E0E0E0]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#282828] border-[#3A3A3A] text-[#E0E0E0]">
                <SelectItem value="recent">Recently Watched</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Star className="text-[#A0A0A0] h-4 w-4" />
            <span className="text-[#A0A0A0] text-sm font-dmsans">Rating:</span>
            <Select value={filterRated} onValueChange={setFilterRated}>
              <SelectTrigger className="w-[140px] bg-[#1A1A1A] border-[#3A3A3A] text-[#E0E0E0]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent className="bg-[#282828] border-[#3A3A3A] text-[#E0E0E0]">
                <SelectItem value="all">All Movies</SelectItem>
                <SelectItem value="rated">Rated</SelectItem>
                <SelectItem value="unrated">Not Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* History List */}
      {isLoading ? (
        <div className="bg-[#282828] rounded-lg p-6 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#00BFFF] animate-spin mr-2" />
          <span className="text-[#E0E0E0] font-dmsans">Loading watch history...</span>
        </div>
      ) : filteredHistory.length === 0 ? (
        <EmptyState
          icon={<Clock className="w-8 h-8" />}
          title="No watch history found"
          description={
            searchQuery
              ? "Try adjusting your search or filters"
              : "Your watch history will appear here once you start watching movies"
          }
          actionLabel={!searchQuery ? "Explore Movies" : undefined}
          onAction={!searchQuery ? () => console.log("Navigate to movies") : undefined}
        />
      ) : (
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          {filteredHistory.map((item) => (
            <motion.div
              key={item.id}
              className="bg-[#282828] rounded-lg p-4 flex flex-col sm:flex-row"
              variants={itemVariants}
            >
              <Link href={`/movies/${item.movieId}`} className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <div className="w-full sm:w-20 h-28 sm:h-28 rounded-md overflow-hidden">
                  <Image
                    src={item.moviePosterUrl || "/placeholder.svg"}
                    alt={item.movieTitle}
                    width={80}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link href={`/movies/${item.movieId}`}>
                      <h3 className="font-inter font-medium text-[#E0E0E0] hover:text-[#00BFFF] transition-colors">
                        {item.movieTitle}
                      </h3>
                    </Link>
                    <p className="text-[#A0A0A0] text-sm">{item.movieYear}</p>
                  </div>

                  <div className="flex items-center mt-2 sm:mt-0">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 text-[#A0A0A0] mr-1" />
                      <span className="text-[#A0A0A0] text-sm">{item.formattedDate}</span>
                    </div>

                    {item.userRating && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] mr-1" />
                        <span className="text-[#E0E0E0] font-inter font-medium">{item.userRating}/10</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {item.genres.map((genre) => (
                    <span key={genre} className="text-xs bg-[#3A3A3A] text-[#E0E0E0] px-1.5 py-0.5 rounded">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <Link href={`/movies/${item.movieId}`} className="text-[#00BFFF] text-sm hover:underline">
                    View Movie
                  </Link>

                  {!item.userRating && (
                    <button className="text-[#A0A0A0] text-sm hover:text-[#E0E0E0] transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Rate this movie
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
