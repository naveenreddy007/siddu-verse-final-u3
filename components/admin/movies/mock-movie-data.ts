import type { Movie } from "@/types" // Assuming types.ts is in @/

const generateId = () => Math.random().toString(36).substring(2, 10)

export interface MovieFiltersState {
  status: string
  genre: string
  year: string
}

export let mockMoviesData: Movie[] = [
  {
    id: "1",
    title: "Placeholder Movie Alpha",
    originalTitle: "Placeholder Movie Alpha Original",
    poster: "/placeholder.svg?height=300&width=200",
    backdrop: "/placeholder.svg?height=200&width=350",
    sidduScore: 8.0,
    releaseDate: "2023-01-01",
    status: "released",
    genres: ["Action", "Sci-Fi"],
    synopsis: "Synopsis for Placeholder Movie Alpha.",
    runtime: 120,
    languages: ["English"],
    certification: "PG-13",
    cast: [
      { id: "c1", name: "Actor One", character: "Character A", image: "/placeholder.svg?height=80&width=80", order: 1 },
    ],
    crew: [
      {
        id: "cr1",
        name: "Director One",
        role: "Director",
        department: "Directing",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    galleryImages: ["/placeholder.svg?height=100&width=150"],
    trailerUrl: "#",
    trailerEmbed: '<iframe src="#"></iframe>',
    streamingLinks: [
      { id: "s1", provider: "Netflix", region: "US", url: "#", type: "subscription", quality: "HD", verified: true },
    ],
    releaseDates: [{ id: "rd1", region: "US", date: "2023-01-01", type: "Theatrical" }],
    awards: [{ id: "aw1", name: "Placeholder Award", year: 2023, category: "Best Placeholder", status: "Winner" }],
    trivia: [{ id: "tr1", question: "Placeholder question?", category: "General", answer: "Placeholder answer." }],
    timelineEvents: [
      {
        id: "te1",
        title: "Event One",
        description: "Description of event one.",
        date: "2023-01-01",
        category: "Production",
        mediaUrl: "/placeholder.svg?height=100&width=150",
      },
    ],
    isPublished: true,
    isArchived: false,
    budget: 1000000,
    boxOffice: 5000000,
    productionCompanies: ["Placeholder Productions"],
    countriesOfOrigin: ["USA"],
    tagline: "Placeholder tagline.",
    keywords: ["placeholder", "movie"],
    aspectRatio: "16:9",
    soundMix: ["Dolby Digital"],
    camera: "Placeholder Camera",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    importedFrom: "Manual",
  },
  {
    id: "2",
    title: "Placeholder Movie Beta",
    originalTitle: "Placeholder Movie Beta Original",
    poster: "/placeholder.svg?height=300&width=200",
    backdrop: "/placeholder.svg?height=200&width=350",
    sidduScore: 7.5,
    releaseDate: "2024-02-01",
    status: "upcoming",
    genres: ["Drama"],
    synopsis: "Synopsis for Placeholder Movie Beta.",
    runtime: 110,
    languages: ["English"],
    certification: "R",
    cast: [],
    crew: [],
    galleryImages: [],
    trailerUrl: "#",
    trailerEmbed: "",
    streamingLinks: [],
    releaseDates: [{ id: "rd2", region: "US", date: "2024-02-01", type: "Theatrical" }],
    awards: [],
    trivia: [],
    timelineEvents: [],
    isPublished: false,
    isArchived: false,
    budget: 0,
    boxOffice: 0,
    productionCompanies: [],
    countriesOfOrigin: [],
    tagline: "",
    keywords: [],
    aspectRatio: "",
    soundMix: [],
    camera: "",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    importedFrom: "TMDB",
  },
]

export const getMockMovies = async (
  page = 1,
  limit = 10,
  filters?: Partial<MovieFiltersState>,
  sort?: { key: keyof Movie; direction: "asc" | "desc" },
): Promise<{ movies: Movie[]; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 100)) // Shorter delay
  let filtered = [...mockMoviesData]
  // Simplified filtering and sorting for lightness
  if (filters?.status && filters.status !== "all") {
    filtered = filtered.filter((m) => m.status === filters.status)
  }
  const total = filtered.length
  const paginatedMovies = filtered.slice((page - 1) * limit, page * limit)
  return { movies: paginatedMovies, total }
}

export const getMockMovieById = async (id: string): Promise<Movie | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockMoviesData.find((movie) => movie.id === id)
}

export const addMockMovie = async (movieData: Omit<Movie, "id" | "createdAt" | "updatedAt">): Promise<Movie> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const newMovie: Movie = {
    ...movieData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    originalTitle: movieData.originalTitle || movieData.title,
    poster: movieData.poster || "/placeholder.svg?height=300&width=200",
    backdrop: movieData.backdrop || "/placeholder.svg?height=200&width=350",
    sidduScore: movieData.sidduScore || 0,
    releaseDate: movieData.releaseDate || new Date().toISOString().split("T")[0],
    genres: movieData.genres || [],
    synopsis: movieData.synopsis || "",
    runtime: movieData.runtime || 0,
    languages: movieData.languages || [],
    certification: movieData.certification || "Unrated",
    cast: movieData.cast || [],
    crew: movieData.crew || [],
    galleryImages: movieData.galleryImages || [],
    trailerUrl: movieData.trailerUrl || "",
    trailerEmbed: movieData.trailerEmbed || "",
    streamingLinks: movieData.streamingLinks || [],
    releaseDates: movieData.releaseDates || [],
    awards: movieData.awards || [],
    trivia: movieData.trivia || [],
    timelineEvents: movieData.timelineEvents || [],
    isPublished: movieData.isPublished !== undefined ? movieData.isPublished : false,
    isArchived: movieData.isArchived !== undefined ? movieData.isArchived : false,
    importedFrom: movieData.importedFrom || "Manual",
  }
  mockMoviesData.push(newMovie)
  return newMovie
}

export const updateMockMovie = async (updatedMovieData: Movie): Promise<Movie> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const index = mockMoviesData.findIndex((movie) => movie.id === updatedMovieData.id)
  if (index !== -1) {
    mockMoviesData[index] = { ...updatedMovieData, updatedAt: new Date().toISOString() }
    return mockMoviesData[index]
  }
  throw new Error("Movie not found for update")
}

export const deleteMockMovie = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  mockMoviesData = mockMoviesData.filter((movie) => movie.id !== id)
}
