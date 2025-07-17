import type { VisualTreat, AvailableFilters } from "./types"

export const MOCK_VISUAL_TREATS: VisualTreat[] = [
  {
    id: "1",
    title: "Placeholder Visual Treat 1",
    description: "An example of a stunning visual treat.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Symbolism",
    tags: ["tag1", "tag2"],
    director: "Director Name",
    cinematographer: "Cinematographer Name",
    film: "Placeholder Film",
    year: 2023,
    colorPalette: ["#FF0000", "#00FF00", "#0000FF"],
    likes: 100,
    views: 1000,
    aspectRatio: "16:9",
    resolution: "HD",
  },
  {
    id: "2",
    title: "Placeholder Visual Treat 2",
    description: "Another example of a beautiful visual.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Lighting",
    tags: ["tag3", "tag4"],
    director: "Another Director",
    cinematographer: "Another Cinematographer",
    film: "Another Film",
    year: 2024,
    colorPalette: ["#FFFF00", "#FF00FF", "#00FFFF"],
    likes: 50,
    views: 500,
    aspectRatio: "2.35:1",
    resolution: "4K",
  },
]

export const MOCK_AVAILABLE_FILTERS: AvailableFilters = {
  categories: [
    { name: "Symbolism", count: 1 },
    { name: "Lighting", count: 1 },
  ],
  tags: [
    { name: "tag1", count: 1 },
    { name: "tag2", count: 1 },
    { name: "tag3", count: 1 },
    { name: "tag4", count: 1 },
  ],
  directors: [
    { name: "Director Name", count: 1 },
    { name: "Another Director", count: 1 },
  ],
  cinematographers: [
    { name: "Cinematographer Name", count: 1 },
    { name: "Another Cinematographer", count: 1 },
  ],
  decades: [{ name: "2020s", count: 2 }],
}

export const getDynamicAvailableFilters = (treats: VisualTreat[], currentFilters: any): AvailableFilters => {
  // Simplified: returning static for lightness
  return MOCK_AVAILABLE_FILTERS
}
