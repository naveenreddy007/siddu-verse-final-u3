import type { Movie, MasterpieceFilm, SiddusPickMovie, CinematicVignette, TrendingPulse, BestScene } from "./types"

export const mockNewReleases: Movie[] = [
  {
    id: "nr1",
    title: "New Release 1",
    posterUrl: "/placeholder.svg?height=300&width=200",
    slug: "new-release-1",
    releaseDate: "2024-03-01",
    year: "2024",
    genres: ["Sci-Fi"],
    rating: "PG-13",
    director: "Director X",
    duration: "2h 0m",
    description: "Description for New Release 1.",
    averageRating: 4.5,
    sidduScore: 9.0,
    backdropUrl: "/placeholder.svg?height=200&width=350",
  },
  {
    id: "nr2",
    title: "New Release 2",
    posterUrl: "/placeholder.svg?height=300&width=200",
    slug: "new-release-2",
    releaseDate: "2023-07-21",
    year: "2023",
    genres: ["Drama"],
    rating: "R",
    director: "Director Y",
    duration: "1h 50m",
    description: "Description for New Release 2.",
    averageRating: 4.2,
    sidduScore: 8.5,
    backdropUrl: "/placeholder.svg?height=200&width=350",
  },
]

export const mockMasterpieces: MasterpieceFilm[] = [
  {
    id: "mp1",
    title: "Masterpiece 1",
    posterUrl: "/placeholder.svg?height=300&width=200",
    slug: "masterpiece-1",
    releaseDate: "2019-05-30",
    year: "2019",
    genres: ["Drama"],
    rating: "R",
    director: "Director Z",
    duration: "2h 10m",
    description: "Description for Masterpiece 1.",
    averageRating: 4.9,
    sidduScore: 9.5,
    country: "Country A",
    countryCode: "CA",
    visualStyle: "Style A",
    backdropUrl: "/placeholder.svg?height=200&width=350",
  },
]

export const mockSiddusPicks: SiddusPickMovie[] = [
  {
    id: "sp1",
    title: "Siddu's Pick 1",
    posterUrl: "/placeholder.svg?height=300&width=200",
    backdropUrl: "/placeholder.svg?height=200&width=350",
    releaseDate: "2017-10-06",
    year: "2017",
    genres: ["Sci-Fi"],
    rating: "R",
    director: "Director V",
    duration: "2h 30m",
    slug: "siddus-pick-1",
    description: "Description for Siddu's Pick 1.",
    averageRating: 4.7,
    sidduScore: 9.1,
    pickReason: "Reason for picking this movie.",
  },
]

export const mockVignetteData: CinematicVignette = {
  id: "vignette-1",
  title: "Vignette Title",
  director: "Director W",
  year: "2020",
  quote: "A memorable quote.",
  quoteAuthor: "Character Name",
  description: "Description for the vignette.",
  videoUrl: "#", // Placeholder
  fallbackImageUrl: "/placeholder.svg?height=300&width=500",
  ctaText: "Explore More",
  ctaLink: "/explore/vignette-1",
  theme: "dark",
  category: "Category Name",
  elements: [
    {
      type: "image",
      src: "/placeholder.svg?height=100&width=150",
      alt: "Element 1",
      position: { top: "10%", left: "10%" },
      animation: { type: "fadeIn", delay: 0.1, duration: 0.5 },
      className: "w-1/4 rounded-lg",
    },
  ],
}

export const mockTrendingPulses: TrendingPulse[] = [
  {
    id: "pulse1",
    user: { name: "User A", username: "usera", avatarUrl: "/placeholder.svg?height=40&width=40", isVerified: true },
    content: "Trending pulse content about a movie. #Trending",
    media: [{ type: "image", url: "/placeholder.svg?height=150&width=250", alt: "Pulse Media" }],
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    stats: { likes: 10, comments: 2, reposts: 1, views: 100 },
    tags: ["Trending", "Movie"],
    sourceMovieId: "nr1",
  },
]

export const mockBestScenes: BestScene[] = [
  {
    id: "scene1",
    movieId: "movie-abc",
    movieTitle: "Movie ABC",
    movieYear: "2022",
    title: "Best Scene Title",
    thumbnailUrl: "/placeholder.svg?height=150&width=250",
    description: "Description of the best scene.",
    vfxBreakdown: false,
    directorInsight: true,
    duration: "2:00",
    sidduScore: 9.5,
    tags: ["Iconic", "Drama"],
    slug: "movie-abc-best-scene",
    timestampInMovie: "01:00:00",
  },
]
