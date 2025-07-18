"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Film, Lock, Star, Crown, TrendingUp, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Collection } from "./types"

interface CollectionCardProps {
  collection: Collection
}

const typeIcons = {
  featured: Crown,
  popular: TrendingUp,
  user: Users,
  recommended: Sparkles,
}

const typeColors = {
  featured: "text-yellow-400",
  popular: "text-orange-400",
  user: "text-blue-400",
  recommended: "text-purple-400",
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const TypeIcon = typeIcons[collection.type]

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden bg-siddu-dark-grey border-siddu-dark-grey hover:border-siddu-electric-blue/50 transition-all duration-300 cursor-pointer">
        {/* Poster Grid */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="grid h-full grid-cols-2 gap-1 p-2">
            {collection.posterImages.slice(0, 4).map((poster, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-md bg-siddu-deep-night"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <img
                  src={poster || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className={`bg-black/50 backdrop-blur-sm border-none ${typeColors[collection.type]}`}
            >
              <TypeIcon className="mr-1 h-3 w-3" />
              {collection.type}
            </Badge>
          </div>

          {/* Privacy Indicator */}
          {!collection.isPublic && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm border-none text-siddu-text-subtle">
                <Lock className="mr-1 h-3 w-3" />
                Private
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-siddu-text-primary line-clamp-1 group-hover:text-siddu-electric-blue transition-colors">
              {collection.title}
            </h3>
            <p className="text-sm text-siddu-text-secondary line-clamp-2">{collection.description}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-siddu-text-subtle">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Film className="h-4 w-4" />
                <span>{collection.movieCount}</span>
              </div>
              {collection.followers > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{collection.followers.toLocaleString()}</span>
                </div>
              )}
            </div>
            {collection.type === "featured" && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
              </div>
            )}
          </div>

          {/* Creator */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={collection.creatorAvatar || "/placeholder.svg"} alt={collection.creator} />
              <AvatarFallback className="text-xs bg-siddu-electric-blue text-siddu-deep-night">
                {collection.creator.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-siddu-text-subtle">by {collection.creator}</span>
          </div>

          {/* Tags */}
          {collection.tags && collection.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {collection.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-siddu-electric-blue/30 text-siddu-electric-blue bg-siddu-electric-blue/10"
                >
                  {tag}
                </Badge>
              ))}
              {collection.tags.length > 3 && (
                <Badge variant="outline" className="text-xs border-siddu-text-subtle/30 text-siddu-text-subtle">
                  +{collection.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-siddu-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </Card>
    </motion.div>
  )
}
