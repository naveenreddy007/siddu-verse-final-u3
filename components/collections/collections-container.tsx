"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CollectionsHeader } from "./collections-header"
import { CollectionsFilters, type SortOption, type TypeOption } from "./collections-filters"
import { CollectionGrid } from "./collection-grid"
import { CollectionsEmptyState } from "./collections-empty-state"
import { CollectionsSkeleton } from "./collections-skeleton"
import { mockCollections } from "./mock-data"
import type { Collection } from "./types"
import { useDebounce } from "@/hooks/use-debounce"

export function CollectionsContainer() {
  const [isLoading, setIsLoading] = useState(true)
  const [allCollections, setAllCollections] = useState<Collection[]>(mockCollections)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("popularity")
  const [typeOptions, setTypeOptions] = useState<TypeOption[]>(["all"])

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleCreateCollection = (collection: Omit<Collection, "id" | "createdAt" | "updatedAt" | "followers">) => {
    const newCollection: Collection = {
      ...collection,
      id: `user-${Date.now()}`,
      followers: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "user",
    }
    setAllCollections((prev) => [newCollection, ...prev])
  }

  const filteredCollections = useMemo(() => {
    let collections = [...allCollections]

    // Filter by type
    if (!typeOptions.includes("all")) {
      collections = collections.filter((c) => typeOptions.includes(c.type))
    }

    // Filter by search query
    if (debouncedSearchQuery) {
      const lowercasedQuery = debouncedSearchQuery.toLowerCase()
      collections = collections.filter(
        (c) =>
          c.title.toLowerCase().includes(lowercasedQuery) ||
          c.creator.toLowerCase().includes(lowercasedQuery) ||
          c.tags?.some((tag) => tag.toLowerCase().includes(lowercasedQuery)),
      )
    }

    // Sort
    collections.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "updated":
          return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
        case "popularity":
        default:
          return (b.followers || 0) - (a.followers || 0)
      }
    })

    return collections
  }, [allCollections, debouncedSearchQuery, sortOption, typeOptions])

  const handleTypeChange = (types: TypeOption[]) => {
    if (types.length > 1 && types.includes("all")) {
      setTypeOptions(types.filter((t) => t !== "all"))
    } else if (types.length === 0 || (types.length === 1 && types[0] === "all")) {
      setTypeOptions(["all"])
    } else if (types.length > 1 && !types.includes("all")) {
      setTypeOptions(types)
    } else {
      setTypeOptions(types)
    }
  }

  if (isLoading) {
    return <CollectionsSkeleton />
  }

  const groupedCollections = {
    featured: filteredCollections.filter((c) => c.type === "featured"),
    recommended: filteredCollections.filter((c) => c.type === "recommended"),
    popular: filteredCollections.filter((c) => c.type === "popular"),
    user: filteredCollections.filter((c) => c.type === "user"),
  }

  const isFiltering = debouncedSearchQuery || !typeOptions.includes("all")

  return (
    <motion.div
      className="min-h-screen bg-siddu-deep-night text-siddu-text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CollectionsHeader onCreateCollection={handleCreateCollection} />

      <main className="container mx-auto px-4 py-8">
        <CollectionsFilters
          searchQuery={searchQuery}
          sortOption={sortOption}
          typeOptions={typeOptions}
          onSearch={setSearchQuery}
          onSortChange={setSortOption}
          onTypeChange={handleTypeChange}
        />

        <AnimatePresence>
          {filteredCollections.length > 0 ? (
            <div className="space-y-12">
              {isFiltering ? (
                <CollectionGrid title="Search Results" collections={filteredCollections} />
              ) : (
                <>
                  <CollectionGrid title="Recommended For You" collections={groupedCollections.recommended} />
                  <CollectionGrid title="Featured Collections" collections={groupedCollections.featured} />
                  <CollectionGrid title="Popular Collections" collections={groupedCollections.popular} />
                  <CollectionGrid title="My Collections" collections={groupedCollections.user} />
                </>
              )}
            </div>
          ) : (
            <CollectionsEmptyState />
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  )
}
