"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, Film, Tag, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Collection } from "./types"
import { cn } from "@/lib/utils"

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const badgeBgColor = {
    featured: "bg-siddu-electric-blue/20 text-siddu-electric-blue border-siddu-electric-blue/30",
    popular: "bg-amber-400/20 text-amber-400 border-amber-400/30",
    recommended: "bg-green-400/20 text-green-400 border-green-400/30",
    user: "bg-purple-400/20 text-purple-400 border-purple-400/30",
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-siddu-dark-grey rounded-xl overflow-hidden border border-siddu-light-grey hover:border-siddu-electric-blue/50 transition-all duration-300 shadow-lg hover:shadow-siddu-electric-blue/10"
    >
      <Link href={`/collections/${collection.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="grid grid-cols-2 grid-rows-2 h-full">
            {collection.posterImages.slice(0, 4).map((poster, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={poster || "/placeholder.svg?width=200&height=300"}
                  alt={`Poster for ${collection.title}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className={cn("capitalize border", badgeBgColor[collection.type])}>
              {collection.type}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start gap-4">
          <Image
            src={collection.creatorAvatar || "/placeholder-user.jpg"}
            alt={`${collection.creator}'s avatar`}
            width={40}
            height={40}
            className="rounded-full border-2 border-siddu-light-grey"
          />
          <div className="flex-1 min-w-0">
            <Link href={`/collections/${collection.id}`}>
              <h3 className="font-bold text-lg text-siddu-text-primary truncate group-hover:text-siddu-electric-blue transition-colors">
                {collection.title}
              </h3>
            </Link>
            <p className="text-sm text-siddu-text-secondary">
              By <span className="font-medium text-siddu-text-primary/80">{collection.creator}</span>
            </p>
          </div>
        </div>

        <p className="text-sm text-siddu-text-secondary mt-3 h-10 line-clamp-2">{collection.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(collection.tags || []).slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-siddu-light-grey text-siddu-text-secondary hover:bg-siddu-light-grey/70"
            >
              <Tag className="h-3 w-3 mr-1.5" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-siddu-light-grey flex items-center justify-between text-sm text-siddu-text-secondary">
          <div className="flex items-center gap-1">
            <Film className="h-4 w-4" />
            <span>{collection.movieCount} Movies</span>
          </div>
          <div className="flex items-center gap-1">
            {collection.type === "user" ? <Eye className="h-4 w-4" /> : <Users className="h-4 w-4" />}
            <span>
              {collection.type === "user"
                ? collection.isPublic
                  ? "Public"
                  : "Private"
                : `${(collection.followers / 1000).toFixed(1)}k`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
