import type { PulseType } from "./types"
import { v4 as uuidv4 } from "uuid"

const randomRecentDate = () => new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() // Within last 24h

export const mockPulses: PulseType[] = [
  {
    id: uuidv4(),
    userId: "user1",
    userInfo: {
      username: "user_one",
      displayName: "User One",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      verificationLevel: "basic",
      isFollowing: true,
    },
    content: {
      text: "This is a placeholder pulse about a movie. #Movie",
      linkedContent: {
        type: "movie",
        id: "movie1",
        title: "Placeholder Movie",
        posterUrl: "/abstract-movie-poster.png",
      },
      hashtags: ["#Movie", "#Placeholder"],
    },
    engagement: {
      reactions: { love: 10, fire: 5, total: 15 },
      comments: 2,
      shares: 1,
      userReaction: "love",
      hasCommented: false,
      hasShared: false,
      hasBookmarked: true,
    },
    timestamp: randomRecentDate(),
  },
  {
    id: uuidv4(),
    userId: "user2",
    userInfo: {
      username: "user_two",
      displayName: "User Two",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isVerified: false,
      isFollowing: false,
    },
    content: {
      text: "Another placeholder pulse, this time about cricket. #Cricket",
      linkedContent: {
        type: "cricket",
        id: "match1",
        title: "Team A vs Team B",
        posterUrl: "/vibrant-cricket-match.png",
      },
      hashtags: ["#Cricket", "#Sports"],
    },
    engagement: {
      reactions: { love: 5, fire: 2, total: 7 },
      comments: 1,
      shares: 0,
      hasCommented: true,
      hasShared: false,
      hasBookmarked: false,
    },
    timestamp: randomRecentDate(),
  },
]
