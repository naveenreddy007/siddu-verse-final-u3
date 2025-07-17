import type { RecentItem } from "./types"

export const mockRecentItems: RecentItem[] = [
  {
    id: "1",
    type: "movie",
    title: "Placeholder Movie",
    subtitle: "2023 • Director Name",
    description: "Placeholder movie description.",
    image: "/abstract-movie-poster.png",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: "2h 0m",
    link: "/movies/placeholder-movie",
    metadata: {
      rating: 8.0,
      genre: ["Action"],
    },
  },
  {
    id: "2",
    type: "profile",
    title: "User Name",
    subtitle: "Role • Location",
    description: "Placeholder profile description.",
    image: "/diverse-avatars.png",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    role: "Lead Actor",
    link: "/talent-hub/profile/user-name",
    metadata: {
      location: "City, Country",
    },
  },
  {
    id: "3",
    type: "cricket",
    title: "Team A vs Team B",
    subtitle: "Live • Venue Name",
    description: "Team A needs 50 runs to win.",
    image: "/vibrant-cricket-match.png",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    score: "Team A 150/2",
    link: "/cricket/matches/team-a-vs-team-b",
    metadata: {
      matchType: "ODI",
    },
  },
]
