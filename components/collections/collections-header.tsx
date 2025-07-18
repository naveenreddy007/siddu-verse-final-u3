"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateCollectionModal } from "./create-collection-modal"
import type { Collection, CreateCollectionData } from "./types"

interface CollectionsHeaderProps {
  onCreateCollection: (collection: Omit<Collection, "id" | "createdAt" | "updatedAt" | "followers">) => void
}

export function CollectionsHeader({ onCreateCollection }: CollectionsHeaderProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateCollection = (data: CreateCollectionData) => {
    const newCollection = {
      ...data,
      creator: "You",
      creatorAvatar: "/user-avatar-3.png",
      movieCount: 0,
      posterImages: [],
      type: "user" as const,
    }
    onCreateCollection(newCollection)
    setIsCreateModalOpen(false)
  }

  return (
    <>
      <motion.header
        className="relative overflow-hidden bg-gradient-to-br from-siddu-deep-night via-siddu-dark-grey to-siddu-deep-night"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-siddu-deep-night/80 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="mb-4 flex items-center gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-8 w-8 text-siddu-electric-blue" />
              <h1 className="text-4xl font-bold text-siddu-text-primary md:text-6xl">Collections</h1>
            </motion.div>

            <motion.p
              className="mb-8 max-w-2xl text-lg text-siddu-text-secondary md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Curate your cinematic journey. Discover handpicked collections from fellow film enthusiasts and create
              your own personalized movie lists.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-siddu-electric-blue text-siddu-deep-night hover:bg-siddu-electric-blue/90"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Collection
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCollection}
      />
    </>
  )
}
