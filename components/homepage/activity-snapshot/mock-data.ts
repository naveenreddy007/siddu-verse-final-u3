import { Award, Eye } from "lucide-react"
import type { ProgressData, WhatsNextData, InfluenceData, RecommendationData, WeeklyGemData } from "./types"

export const mockProgressData: ProgressData[] = [
  {
    id: "1",
    title: "Progress Title 1",
    description: "Description for progress 1.",
    percentage: 75,
    icon: Award,
    color: "text-amber-400 bg-amber-400",
    ctaText: "View Details",
    ctaLink: "/progress/1",
  },
]

export const mockWhatsNextData: WhatsNextData[] = [
  {
    id: "1",
    title: "What's Next Title 1",
    description: "Description for what's next 1.",
    imageUrl: "/placeholder.svg?height=150&width=250",
    category: "Category A",
    ctaText: "Explore",
    ctaLink: "/next/1",
  },
]

export const mockInfluenceData: InfluenceData[] = [
  {
    id: "1",
    title: "Influence Title 1",
    description: "Description for influence 1.",
    metricValue: 100,
    metricUnit: "Units",
    change: 10,
    icon: Eye,
    color: "text-teal-400",
  },
]

export const mockRecommendationData: RecommendationData[] = [
  {
    id: "1",
    title: "Recommendation 1",
    posterUrl: "/placeholder.svg?height=225&width=150",
    genres: ["Action"],
    rating: 4.5,
    reason: "Based on your activity.",
    ctaLink: "/movies/rec1",
  },
]

export const mockWeeklyGemData: WeeklyGemData[] = [
  {
    id: "1",
    title: "Weekly Gem Title 1",
    description: "Description for weekly gem 1.",
    imageUrl: "/placeholder.svg?height=150&width=250",
    category: "Gem Category",
    tags: ["Gem", "Weekly"],
    ctaText: "Discover",
    ctaLink: "/gems/1",
  },
]
