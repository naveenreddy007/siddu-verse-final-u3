export interface Collection {
  id: string
  title: string
  description: string
  creator: string
  creatorAvatar: string
  movieCount: number
  followers: number
  posterImages: string[]
  isPublic: boolean
  createdAt: string
  updatedAt?: string
  tags?: string[]
  type: "featured" | "popular" | "user" | "recommended"
}

export interface CreateCollectionData {
  title: string
  description: string
  isPublic: boolean
  tags: string[]
}
