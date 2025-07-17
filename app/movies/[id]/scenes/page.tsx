"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import SceneGrid from "@/components/scene-explorer/scene-grid"
import SceneModal from "@/components/scene-explorer/scene-modal"
import EmptyState from "@/components/scene-explorer/empty-state" // Re-use or create a movie-specific one
import type { Scene } from "@/components/scene-explorer/types"
import { mockScenes } from "@/components/scene-explorer/mock-data"
import { movieData as inceptionMovieData } from "../page-data" // For movie title

export default function MovieScenesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const movieId = params.id

  const [movieSpecificScenes, setMovieSpecificScenes] = useState<Scene[]>([])
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const movieTitle = movieId === inceptionMovieData.id ? inceptionMovieData.title : "Movie"

  useEffect(() => {
    setIsLoading(true)
    // Filter scenes for the current movie
    const filtered = mockScenes.filter((scene) => scene.movieId === movieId)
    setMovieSpecificScenes(filtered)

    // Check for scene ID in URL to auto-open modal
    const sceneIdFromUrl = searchParams.get("scene")
    if (sceneIdFromUrl) {
      const sceneToOpen = filtered.find((s) => s.id === sceneIdFromUrl)
      if (sceneToOpen) {
        setSelectedScene(sceneToOpen)
        setIsModalOpen(true)
      }
    }
    setIsLoading(false)
  }, [movieId, searchParams])

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene)
    setIsModalOpen(true)
    // Update URL with scene ID
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set("scene", scene.id)
    router.push(`/movies/${movieId}/scenes?${currentParams.toString()}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedScene(null)
    // Remove scene ID from URL
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.delete("scene")
    router.push(`/movies/${movieId}/scenes?${currentParams.toString()}`, { scroll: false })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#282828] border-t-[#00BFFF] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white">All Scenes from {movieTitle}</h2>
        <p className="text-gray-400">
          {movieSpecificScenes.length > 0
            ? `Explore ${movieSpecificScenes.length} iconic moment${movieSpecificScenes.length === 1 ? "" : "s"}.`
            : `No scenes available for this movie yet.`}
        </p>
      </header>

      {movieSpecificScenes.length === 0 && !isLoading ? (
        <EmptyState onClearFilters={() => {}} /> // onClearFilters might not be relevant here
      ) : (
        <SceneGrid scenes={movieSpecificScenes} onSceneSelect={handleSceneSelect} isLoading={isLoading} />
      )}

      {selectedScene && <SceneModal scene={selectedScene} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </motion.div>
  )
}
