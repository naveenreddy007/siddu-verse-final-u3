"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Heart,
  Share2,
  Download,
  Eye,
  Film,
  Palette,
  Tag,
  ChevronLeft,
  ChevronRight,
  Check,
  PlusCircle,
  User,
  Camera,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { VisualTreat } from "@/lib/visual-treats-types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface TreatModalProps {
  treat: VisualTreat | null
  isOpen: boolean
  onClose: () => void
  onLikeToggle: (id: string) => void
  onCollectionAction: (treat: VisualTreat) => void
  isInCollection: boolean
  onNavigate?: (direction: "prev" | "next") => VisualTreat | null
  relatedTreats?: VisualTreat[]
}

export function TreatModal({
  treat,
  isOpen,
  onClose,
  onLikeToggle,
  onCollectionAction,
  isInCollection,
  onNavigate,
  relatedTreats = [],
}: TreatModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (treat) {
      setIsImageLoaded(false)
    }
  }, [treat])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (treat) onLikeToggle(treat.id)
  }
  const handleCollectionAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (treat) onCollectionAction(treat)
  }

  const handleShare = () => {
    if (!treat) return
    const shareUrl = `${window.location.origin}/visual-treats/${treat.id}`
    if (navigator.share) {
      navigator
        .share({
          title: `${treat.title} - from ${treat.film}`,
          text: treat.description,
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed:", err))
    } else {
      navigator.clipboard.writeText(shareUrl)
      toast({ title: "Link Copied!", description: "Treat URL copied to clipboard." })
    }
  }

  const handleDownload = () => {
    if (!treat) return
    const link = document.createElement("a")
    link.href = treat.imageUrl
    link.download = `${treat.film.replace(/ /g, "_")}-${treat.title.replace(/ /g, "_")}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: "Download Started", description: `Downloading ${treat.title}.` })
  }

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    toast({ title: "Color Copied!", description: `${color} copied to clipboard.` })
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const handlePrev = () => onNavigate && onNavigate("prev")
  const handleNext = () => onNavigate && onNavigate("next")

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return
      if (event.key === "Escape") onClose()
      if (onNavigate) {
        if (event.key === "ArrowLeft") handlePrev()
        if (event.key === "ArrowRight") handleNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && treat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {onNavigate && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[101] h-12 w-12 bg-black/30 text-white hover:bg-black/50 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[101] h-12 w-12 bg-black/30 text-white hover:bg-black/50 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-full h-full sm:max-w-6xl sm:max-h-[95vh] sm:rounded-lg overflow-hidden bg-[#181818] border border-gray-800 flex flex-col md:flex-row"
          >
            <div className="relative flex-1 md:max-w-[calc(100%-24rem)] min-h-[300px] md:min-h-0 bg-black">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-gray-700 border-t-[#00BFFF] rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={treat.imageUrl || "/placeholder.svg"}
                alt={treat.title}
                fill
                className={`object-contain transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setIsImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 h-10 w-10 p-0 bg-black/50 text-white hover:bg-black/70 rounded-full z-10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="w-full md:w-96 bg-[#1C1C1C] border-l border-gray-800">
              <div className="p-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="bg-[#282828] text-gray-200 border-gray-700 text-xs">
                      {treat.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{treat.year}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{treat.title}</h2>
                  <p className="text-sm text-gray-300">{treat.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`p-1 h-auto transition-colors ${
                        treat.userLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`h-5 w-5 mr-1.5 ${treat.userLiked ? "fill-current" : ""}`} />
                      <span className="text-sm">{treat.likes.toLocaleString()}</span>
                    </Button>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Eye className="h-5 w-5 mr-1.5" />
                      <span>{treat.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-[#00BFFF] hover:bg-[#00BFFF]/10 rounded-full"
                      onClick={handleCollectionAction}
                    >
                      <PlusCircle
                        className={`h-5 w-5 transition-all ${isInCollection ? "text-[#00BFFF] fill-[#00BFFF]" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDownload}
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="bg-gray-700" />

                <div className="grid grid-cols-1 gap-4">
                  <InfoCard icon={Film} title="Source">
                    <InfoItem label="Film" value={treat.film} />
                    <InfoItem icon={User} label="Director" value={treat.director} />
                    <InfoItem icon={Camera} label="Cinematographer" value={treat.cinematographer} />
                    <InfoItem
                      icon={Calendar}
                      label="Released"
                      value={new Date(treat.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    />
                  </InfoCard>

                  {treat.colorPalette && treat.colorPalette.length > 0 && (
                    <InfoCard icon={Palette} title="Color Palette">
                      <div className="grid grid-cols-5 gap-2 pt-2">
                        {treat.colorPalette.map((color, index) => (
                          <div key={index} className="space-y-1 group relative">
                            <div
                              className="w-full h-12 rounded-md border border-gray-600 cursor-pointer transition-transform group-hover:scale-105"
                              style={{ backgroundColor: color }}
                              onClick={() => handleCopyColor(color)}
                            />
                            {copiedColor === color && (
                              <Check className="absolute top-1 right-1 h-4 w-4 text-white bg-green-500 rounded-full p-0.5" />
                            )}
                          </div>
                        ))}
                      </div>
                    </InfoCard>
                  )}

                  {treat.tags && treat.tags.length > 0 && (
                    <InfoCard icon={Tag} title="Tags">
                      <div className="flex flex-wrap gap-2 pt-2">
                        {treat.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#282828] text-gray-300 border-gray-700 hover:bg-[#333] text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </InfoCard>
                  )}
                </div>

                {relatedTreats && relatedTreats.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-white mb-2">Similar Visual DNA</h3>
                    <div className="space-y-2">
                      {relatedTreats.slice(0, 3).map((rt) => (
                        <div
                          key={rt.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer transition-colors"
                        >
                          <Image
                            src={rt.imageUrl || "/placeholder.svg"}
                            alt={rt.title}
                            width={48}
                            height={48}
                            className="rounded-md object-cover aspect-square"
                          />
                          <div>
                            <p className="text-sm text-white font-medium line-clamp-1">{rt.title}</p>
                            <p className="text-xs text-gray-400 line-clamp-1">{rt.film}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const InfoCard = ({
  icon: Icon,
  title,
  children,
}: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <Card className="bg-[#222] border-gray-800 shadow-md">
    <CardHeader className="p-4">
      <CardTitle className="text-md text-white flex items-center gap-2">
        <Icon className="h-5 w-5 text-[#00BFFF]" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0 text-sm space-y-2">{children}</CardContent>
  </Card>
)

const InfoItem = ({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {label}:
    </span>
    <span className="text-gray-100 text-right font-medium">{value}</span>
  </div>
)
