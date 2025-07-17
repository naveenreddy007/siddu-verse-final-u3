import type { MovieType } from "./types"
import { v4 as uuidv4 } from "uuid"

export const mockMovies: MovieType[] = [
  {
    id: uuidv4(),
    title: "Placeholder Movie 1",
    year: "2023",
    releaseDate: "2023-07-21",
    posterUrl: "/movie-poster-1.png",
    backdropUrl: "/movie-backdrop-1.png",
    rating: 8.0,
    runtime: 120,
    overview: "This is a placeholder overview for Movie 1. Lorem ipsum dolor sit amet.",
    genres: ["Action", "Sci-Fi"],
    language: "English",
    country: "United States",
    director: "Director Name",
    cast: ["Actor One", "Actor Two"],
    trending: true,
    tags: ["visual_treat"],
  },
  {
    id: uuidv4(),
    title: "Placeholder Movie 2",
    year: "2024",
    releaseDate: "2024-03-01",
    posterUrl: "/movie-poster-2.png",
    rating: 7.5,
    runtime: 110,
    overview: "This is a placeholder overview for Movie 2. Consectetur adipiscing elit.",
    genres: ["Drama", "Thriller"],
    language: "English",
    country: "United Kingdom",
    director: "Another Director",
    cast: ["Actor Three", "Actor Four"],
    trending: false,
  },
]
