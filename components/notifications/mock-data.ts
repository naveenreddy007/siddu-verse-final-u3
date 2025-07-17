import type { Notification } from "./types"

const daysAgo = (days: number): Date => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "social",
    title: "New Connection",
    message: "User Name sent you a connection request.",
    timestamp: daysAgo(1),
    isRead: false,
    actionUrl: "/connections/requests",
    metadata: {
      userId: "user-123",
      userName: "User Name",
      userAvatar: "/diverse-avatars.png",
    },
  },
  {
    id: "notif-002",
    type: "release",
    title: "New Film Release",
    message: '"Placeholder Film" is now available.',
    timestamp: daysAgo(2),
    isRead: true,
    actionUrl: "/movies/placeholder-film",
    metadata: {
      movieId: "movie-456",
      movieTitle: "Placeholder Film",
      moviePoster: "/abstract-movie-poster.png",
    },
  },
]
