"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Eye, PlusCircle, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { VisualTreat } from "@/lib/visual-treats-types"
import { useCardTilt } from "@/hooks/use-card-tilt"

interface TreatCardProps {
  treat: VisualTreat
  onOpenModal: (treat: VisualTreat) => void
  onLikeToggle: (id: string) => void
  onCollectionAction: (treat: VisualTreat) => void
  isInCollection: boolean
  viewMode?: "grid" | "list"
}

export function TreatCard({
  treat,
  onOpenModal,
  onLikeToggle,
  onCollectionAction,
  isInCollection,
  viewMode = "grid",
}: TreatCardProps) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt()

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    onOpenModal(treat)
  }

  if (viewMode === "list") {
    return (
      <motion.div
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1C1C1C] border border-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer flex transition-all duration-300 ease-in-out hover:border-[#00BFFF]/30 hover:bg-[#222]"
      >
        <div className="relative w-32 h-full sm:w-40 flex-shrink-0">
          <Image
            src={treat.imageUrl || "/placeholder.svg"}
            alt={treat.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 33vw, 160px"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-semibold text-white leading-tight">{treat.title}</h3>
            <Badge variant="outline" className="text-xs bg-[#282828] text-gray-300 border-gray-700 whitespace-nowrap">
              {treat.category}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            {treat.film} ({treat.year})
          </p>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2 flex-grow">{treat.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
            <div className="flex items-center gap-3">
              <span className="flex items-center">
                <Heart
                  className={`h-3.5 w-3.5 mr-1 ${treat.userLiked ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                />
                {treat.likes.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Eye className="h-3.5 w-3.5 mr-1 text-gray-500" />
                {treat.views.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onLikeToggle(treat.id)
                }}
              >
                <Heart className={`h-4 w-4 ${treat.userLiked ? "text-red-500 fill-red-500" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-[#00BFFF] hover:bg-[#00BFFF]/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onCollectionAction(treat)
                }}
              >
                <PlusCircle className={`h-4 w-4 ${isInCollection ? "text-[#00BFFF] fill-[#00BFFF]" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative bg-[#1C1C1C] border border-gray-800 rounded-lg overflow-hidden shadow-lg aspect-[3/4] cursor-pointer group transition-all duration-300 ease-in-out"
    >
      <div
        style={{ transform: "translateZ(20px)" }}
        className="absolute inset-0 group-hover:shadow-[0_0_20px_5px_rgba(0,191,255,0.2)] transition-shadow duration-300 rounded-lg"
      />
      <Image
        src={treat.imageUrl || "/placeholder.svg"}
        alt={treat.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ transform: "translateZ(0px)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
        <motion.h3
          style={{ transform: "translateZ(50px)" }}
          className="text-lg font-semibold text-white mb-1 leading-tight line-clamp-2"
        >
          {treat.title}
        </motion.h3>
        <motion.p style={{ transform: "translateZ(40px)" }} className="text-xs text-gray-300 mb-2 line-clamp-1">
          {treat.film} ({treat.year})
        </motion.p>
        <motion.div
          style={{ transform: "translateZ(30px)" }}
          className="flex items-center justify-between text-xs text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <Heart
                className={`h-3.5 w-3.5 mr-1 ${treat.userLiked ? "text-red-500 fill-red-500" : "text-gray-200"}`}
              />
              {treat.likes.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Eye className="h-3.5 w-3.5 mr-1 text-gray-200" />
              {treat.views.toLocaleString()}
            </span>
          </div>
          <Badge variant="outline" className="text-xs bg-black/30 text-gray-200 border-gray-600 backdrop-blur-sm">
            {treat.category}
          </Badge>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-2 right-2 flex flex-col gap-2"
        style={{ transform: "translateZ(60px)" }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-black/50 text-white hover:bg-black/70 hover:text-red-500 rounded-full backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation()
            onLikeToggle(treat.id)
          }}
        >
          <Heart className={`h-4 w-4 ${treat.userLiked ? "text-red-500 fill-red-500" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-black/50 text-white hover:bg-black/70 hover:text-[#00BFFF] rounded-full backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation()
            onCollectionAction(treat)
          }}
        >
          <PlusCircle className={`h-4 w-4 ${isInCollection ? "text-[#00BFFF] fill-[#00BFFF]" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-black/50 text-white hover:bg-black/70 rounded-full backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation()
            console.log("Share treat:", treat.id)
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
