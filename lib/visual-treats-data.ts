import type { VisualTreat, AvailableFilters, Collection } from "./visual-treats-types"

/* -------------------------------------------------------------------------- */
/*                               MOCK  DATA                                   */
/* -------------------------------------------------------------------------- */

export const mockVisualTreats: VisualTreat[] = [
  {
    id: "vt-001",
    title: "Rotating Hallway",
    description: "The iconic zero-gravity hallway fight that bends reality and physics.",
    film: "Inception",
    director: "Christopher Nolan",
    cinematographer: "Wally Pfister",
    category: "Action / Sci-Fi",
    tags: ["hallway", "zero-gravity", "fight-scene"],
    year: 2010,
    releaseDate: "2010-07-16",
    likes: 850,
    userLiked: false,
    views: 9_300,
    imageUrl: "/inception-scene-2.png",
    thumbnail: "/inception-scene-thumbnail.png",
    colorPalette: ["#1A1A1A", "#4F4F4F", "#8FA0B7"],
  },
  {
    id: "vt-002",
    title: "Sunlit Desert Ride",
    description: "A sprawling wide shot of the desert convoy racing across crimson dunes.",
    film: "Dune Part Two",
    director: "Denis Villeneuve",
    cinematographer: "Greig Fraser",
    category: "Epic Landscape",
    tags: ["desert", "wide-shot", "landscape"],
    year: 2024,
    releaseDate: "2024-03-01",
    likes: 540,
    userLiked: false,
    views: 4_500,
    imageUrl: "/dune-part-two-desert.png",
    thumbnail: "/dune-part-two-desert.png",
    colorPalette: ["#C78E46", "#7D5832", "#27251F"],
  },
  {
    id: "vt-003",
    title: "Rain-Soaked Neo-Noir",
    description: "Deckard’s spinner lands on the wet streets of futuristic Los Angeles.",
    film: "Blade Runner 2049",
    director: "Denis Villeneuve",
    cinematographer: "Roger Deakins",
    category: "Sci-Fi Noir Lighting",
    tags: ["neo-noir", "rain", "city"],
    year: 2017,
    releaseDate: "2017-10-06",
    likes: 1_020,
    userLiked: false,
    views: 12_100,
    imageUrl: "/blade-runner-2049-inspired-poster.png",
    thumbnail: "/blade-runner-2049-inspired-poster.png",
    colorPalette: ["#0F141B", "#30415D", "#6B7DA2"],
  },
]

/* -------------------------------------------------------------------------- */
/*                            DATA  HELPER  UTILS                             */
/* -------------------------------------------------------------------------- */

/**
 * Simulates fetching visual treats (mimicking an API latency).
 * @param delay Delay in milliseconds before returning data
 */
export async function getVisualTreats(delay = 400): Promise<VisualTreat[]> {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return mockVisualTreats
}

/**
 * Builds a structure containing every possible filter value
 * (plus result counts) based on a list of treats.
 */
export function getAvailableFilters(treats: VisualTreat[]): AvailableFilters {
  /* Use Maps so we can increment counters quickly. */
  const counters = {
    categories: new Map<string, number>(),
    tags: new Map<string, number>(),
    directors: new Map<string, number>(),
    cinematographers: new Map<string, number>(),
    decades: new Map<string, number>(),
  }

  treats.forEach((t) => {
    // Category
    counters.categories.set(t.category, (counters.categories.get(t.category) ?? 0) + 1)

    // Tags
    t.tags.forEach((tag) => counters.tags.set(tag, (counters.tags.get(tag) ?? 0) + 1))

    // Director
    counters.directors.set(t.director, (counters.directors.get(t.director) ?? 0) + 1)

    // Cinematographer
    counters.cinematographers.set(t.cinematographer, (counters.cinematographers.get(t.cinematographer) ?? 0) + 1)

    // Decade (e.g., “2010s”)
    const decade = `${Math.floor(t.year / 10) * 10}s`
    counters.decades.set(decade, (counters.decades.get(decade) ?? 0) + 1)
  })

  // Helper: Map → sorted array of { name, count }
  const toArray = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

  return {
    categories: toArray(counters.categories),
    tags: toArray(counters.tags),
    directors: toArray(counters.directors),
    cinematographers: toArray(counters.cinematographers),
    decades: toArray(counters.decades),
  }
}

/* -------------------------------------------------------------------------- */
/*                          USER  COLLECTIONS (MOCK)                          */
/* -------------------------------------------------------------------------- */

export const mockUserCollections: Collection[] = [
  {
    id: "coll-1",
    name: "Sci-Fi Noir Lighting",
    treatIds: ["vt-001", "vt-003"],
  },
  {
    id: "coll-2",
    name: "Symmetrical Compositions",
    treatIds: [],
  },
  {
    id: "coll-3",
    name: "Epic Landscapes",
    treatIds: ["vt-002"],
  },
]
