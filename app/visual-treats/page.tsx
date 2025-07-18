"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GridIcon, ListIcon, Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TreatCard } from "@/components/visual-treats/treat-card"
import { FilterSidebar } from "@/components/visual-treats/filter-sidebar"
import { TreatModal } from "@/components/visual-treats/treat-modal"
import { AddToCollectionModal } from "@/components/visual-treats/add-to-collection-modal"
import { VisualTreatsSkeleton } from "@/components/visual-treats/visual-treats-skeleton"
import { ActiveFiltersDisplay } from "@/components/visual-treats/active-filters-display"
import type { VisualTreat, FilterState, Collection } from "@/lib/visual-treats-types"
import { useToast } from "@/hooks/use-toast"
import { getVisualTreats, getAvailableFilters, mockUserCollections } from "@/lib/visual-treats-data"
import { FuturisticBackground } from "@/components/visual-treats/futuristic-background"

export default function VisualTreatsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [allTreats, setAllTreats] = useState<VisualTreat[]>([])
  const [filteredTreats, setFilteredTreats] = useState<VisualTreat[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedTreat, setSelectedTreat] = useState<VisualTreat | null>(null)
  const [selectedTreatIndex, setSelectedTreatIndex] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const [collections, setCollections] = useState<Collection[]>([])
  const [collectionModalState, setCollectionModalState] = useState<{
    isOpen: boolean
    treat: VisualTreat | null
  }>({ isOpen: false, treat: null })

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    tags: [],
    directors: [],
    cinematographers: [],
    decades: [],
    sortBy: "popular",
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const treats = await getVisualTreats()
      setAllTreats(treats)
      setCollections(mockUserCollections) // Load mock collections
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const treatCollectionStatus = useMemo(() => {
    const statusMap = new Map<string, boolean>()
    const allTreatIdsInCollections = new Set(collections.flatMap((c) => c.treatIds))
    allTreats.forEach((treat) => {
      statusMap.set(treat.id, allTreatIdsInCollections.has(treat.id))
    })
    return statusMap
  }, [allTreats, collections])

  useEffect(() => {
    let currentTreats = [...allTreats]

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase()
      currentTreats = currentTreats.filter(
        (treat) =>
          treat.title.toLowerCase().includes(lowercasedQuery) ||
          treat.description.toLowerCase().includes(lowercasedQuery) ||
          treat.film.toLowerCase().includes(lowercasedQuery) ||
          treat.director.toLowerCase().includes(lowercasedQuery) ||
          treat.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery)),
      )
    }

    if (filters.categories.length > 0) {
      currentTreats = currentTreats.filter((treat) => filters.categories.includes(treat.category))
    }
    if (filters.tags.length > 0) {
      currentTreats = currentTreats.filter((treat) => filters.tags.some((tag) => treat.tags.includes(tag)))
    }
    if (filters.directors.length > 0) {
      currentTreats = currentTreats.filter((treat) => filters.directors.includes(treat.director))
    }
    if (filters.cinematographers.length > 0) {
      currentTreats = currentTreats.filter((treat) => filters.cinematographers.includes(treat.cinematographer))
    }
    if (filters.decades.length > 0) {
      currentTreats = currentTreats.filter((treat) => {
        const decade = `${Math.floor(treat.year / 10) * 10}s`
        return filters.decades.includes(decade)
      })
    }

    switch (filters.sortBy) {
      case "popular":
        currentTreats.sort((a, b) => b.likes - a.likes)
        break
      case "recent":
        currentTreats.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
      case "oldest":
        currentTreats.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
        break
      case "title_asc":
        currentTreats.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title_desc":
        currentTreats.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "director_asc":
        currentTreats.sort((a, b) => a.director.localeCompare(b.director))
        break
      case "director_desc":
        currentTreats.sort((a, b) => b.director.localeCompare(a.director))
        break
      case "film_asc":
        currentTreats.sort((a, b) => a.film.localeCompare(b.film))
        break
      case "film_desc":
        currentTreats.sort((a, b) => b.film.localeCompare(a.film))
        break
      case "views_desc":
        currentTreats.sort((a, b) => b.views - a.views)
        break
      case "views_asc":
        currentTreats.sort((a, b) => a.views - b.views)
        break
    }
    setFilteredTreats(currentTreats)
  }, [allTreats, searchQuery, filters])

  const handleOpenModal = useCallback(
    (treat: VisualTreat) => {
      const index = filteredTreats.findIndex((t) => t.id === treat.id)
      setSelectedTreat(treat)
      setSelectedTreatIndex(index)
      setIsModalOpen(true)
      document.body.style.overflow = "hidden"
    },
    [filteredTreats],
  )

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedTreat(null)
    setSelectedTreatIndex(-1)
    document.body.style.overflow = "auto"
  }, [])

  const handleNavigateModal = useCallback(
    (direction: "prev" | "next"): VisualTreat | null => {
      if (selectedTreatIndex === -1 || filteredTreats.length === 0) return null
      let newIndex = selectedTreatIndex
      if (direction === "prev") {
        newIndex = (selectedTreatIndex - 1 + filteredTreats.length) % filteredTreats.length
      } else {
        newIndex = (selectedTreatIndex + 1) % filteredTreats.length
      }
      const newTreat = filteredTreats[newIndex]
      setSelectedTreat(newTreat)
      setSelectedTreatIndex(newIndex)
      return newTreat
    },
    [selectedTreatIndex, filteredTreats],
  )

  const handleLikeToggle = useCallback(
    (id: string) => {
      const treatToUpdate = allTreats.find((t) => t.id === id)
      if (!treatToUpdate) return

      setAllTreats((prevAllTreats) =>
        prevAllTreats.map((t) =>
          t.id === id ? { ...t, userLiked: !t.userLiked, likes: t.userLiked ? t.likes - 1 : t.likes + 1 } : t,
        ),
      )
      toast({
        title: treatToUpdate.userLiked ? "Unliked!" : "Liked!",
        description: `You ${treatToUpdate.userLiked ? "un" : ""}liked "${treatToUpdate.title}".`,
      })
    },
    [allTreats, toast],
  )

  const handleOpenCollectionModal = useCallback((treat: VisualTreat) => {
    setCollectionModalState({ isOpen: true, treat })
  }, [])

  const handleCloseCollectionModal = useCallback(() => {
    setCollectionModalState({ isOpen: false, treat: null })
  }, [])

  const handleSaveToCollections = useCallback(
    ({
      treatId,
      selectedCollectionIds,
      newCollectionName,
    }: {
      treatId: string
      selectedCollectionIds: string[]
      newCollectionName?: string
    }) => {
      let newCollections = [...collections]
      let createdCollection = false

      if (newCollectionName && newCollectionName.trim() !== "") {
        const newCollection: Collection = {
          id: `coll-${Date.now()}`,
          name: newCollectionName.trim(),
          treatIds: [treatId],
        }
        newCollections.push(newCollection)
        // Ensure the new collection is also marked as selected
        if (!selectedCollectionIds.includes(newCollection.id)) {
          selectedCollectionIds.push(newCollection.id)
        }
        createdCollection = true
      }

      newCollections = newCollections.map((collection) => {
        const isSelected = selectedCollectionIds.includes(collection.id)
        const hasTreat = collection.treatIds.includes(treatId)

        if (isSelected && !hasTreat) {
          return { ...collection, treatIds: [...collection.treatIds, treatId] }
        }
        if (!isSelected && hasTreat) {
          return { ...collection, treatIds: collection.treatIds.filter((id) => id !== treatId) }
        }
        return collection
      })

      setCollections(newCollections)
      toast({
        title: "Collections Updated",
        description: `Saved to ${selectedCollectionIds.length} collection${
          selectedCollectionIds.length === 1 ? "" : "s"
        }${createdCollection ? " and created a new one." : "."}`,
      })
    },
    [collections, toast],
  )

  const handleRemoveFilter = useCallback((filterType: keyof Omit<FilterState, "sortBy">, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: (prev[filterType] as string[]).filter((v) => v !== value),
    }))
  }, [])

  const handleClearAllFilters = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      categories: [],
      tags: [],
      directors: [],
      cinematographers: [],
      decades: [],
    }))
    setSearchQuery("")
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  if (isLoading) {
    return <VisualTreatsSkeleton />
  }

  return (
    <div className="text-white">
      <FuturisticBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-[#00BFFF] via-purple-400 to-[#FFD700] text-transparent bg-clip-text tracking-tighter">
            Cinematic Archive
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            An evolving gallery of iconic cinematography. Explore breathtaking compositions and masterful visual
            storytelling from the world of cinema.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by title, film, director, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-[#181818] border-gray-700 focus:border-[#00BFFF] focus:ring-[#00BFFF] text-white rounded-md"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="h-11 flex-1 md:flex-none border-gray-700 bg-[#181818] text-gray-300 hover:bg-[#282828] hover:text-white rounded-md"
                aria-label={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
              >
                {viewMode === "grid" ? <ListIcon className="h-5 w-5" /> : <GridIcon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="h-11 flex-1 md:flex-none border-gray-700 bg-[#181818] text-gray-300 hover:bg-[#282828] hover:text-white rounded-md"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters & Sort
              </Button>
            </div>
          </div>
          <ActiveFiltersDisplay
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-sm text-gray-400"
        >
          Showing {filteredTreats.length} of {allTreats.length} visual treats.
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                : "space-y-4 max-w-4xl mx-auto"
            }
          >
            {filteredTreats.map((treat) => (
              <motion.div key={treat.id} variants={itemVariants}>
                <TreatCard
                  treat={treat}
                  onOpenModal={handleOpenModal}
                  onLikeToggle={handleLikeToggle}
                  onCollectionAction={handleOpenCollectionModal}
                  isInCollection={treatCollectionStatus.get(treat.id) || false}
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredTreats.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <Search className="h-16 w-16 mx-auto mb-6 text-gray-700" />
            <h3 className="text-2xl font-semibold text-white mb-3">No Results Found</h3>
            <p className="text-gray-400 mb-6">
              Your query returned no visual treats. Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              onClick={handleClearAllFilters}
              className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:text-[#00BFFF] bg-transparent"
            >
              Clear All Filters & Search
            </Button>
          </motion.div>
        )}
      </div>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        availableFilters={getAvailableFilters(allTreats)}
      />

      <TreatModal
        treat={selectedTreat}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLikeToggle={handleLikeToggle}
        onCollectionAction={handleOpenCollectionModal}
        isInCollection={selectedTreat ? treatCollectionStatus.get(selectedTreat.id) || false : false}
        onNavigate={handleNavigateModal}
        relatedTreats={
          selectedTreat
            ? allTreats
                .filter(
                  (t) =>
                    t.id !== selectedTreat.id &&
                    (t.director === selectedTreat.director || t.category === selectedTreat.category),
                )
                .slice(0, 5)
            : []
        }
      />

      <AddToCollectionModal
        isOpen={collectionModalState.isOpen}
        onClose={handleCloseCollectionModal}
        treat={collectionModalState.treat}
        collections={collections}
        onSave={handleSaveToCollections}
      />
    </div>
  )
}
