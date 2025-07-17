import type { Collection } from "./types"

export const mockFeaturedCollections: Collection[] = [
  {
    id: "featured-1",
    title: "Featured Collection 1",
    description: "A curated collection of placeholder items.",
    creator: "Siddu Editorial",
    movieCount: 2,
    followers: 100,
    posterImages: ["/placeholder.svg?height=150&width=100", "/placeholder.svg?height=150&width=100"],
    createdAt: "2024-01-15T00:00:00Z",
  },
]

export const mockPopularCollections: Collection[] = [
  {
    id: "popular-1",
    title: "Popular Collection 1",
    description: "Most popular placeholder items.",
    creator: "UserX",
    movieCount: 3,
    followers: 200,
    posterImages: [
      "/placeholder.svg?height=150&width=100",
      "/placeholder.svg?height=150&width=100",
      "/placeholder.svg?height=150&width=100",
    ],
    createdAt: "2023-12-01T00:00:00Z",
  },
]

export const mockUserCollections: Collection[] = [
  {
    id: "user-1",
    title: "My Placeholder Watchlist",
    description: "Items I plan to watch.",
    creator: "You",
    movieCount: 1,
    followers: 0,
    posterImages: ["/placeholder.svg?height=150&width=100"],
    isPublic: false,
    createdAt: "2024-01-20T00:00:00Z",
  },
]
