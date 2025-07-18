"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateCollectionModal } from "./create-collection-modal"

interface CollectionsHeaderProps {
  onCreateCollection: (collection: any) => void
}

export function CollectionsHeader({ onCreateCollection }: CollectionsHeaderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <div className="relative py-20 px-4 overflow-hidden bg-siddu-deep-night">
        <div className="absolute inset-0 animate-aurora [background-image:radial-gradient(ellipse_at_100%_0%,theme(colors.blue.500)_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,theme(colors.purple.500)_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-block p-4 mb-4 bg-siddu-dark-grey/50 rounded-full border border-siddu-light-grey"
            >
              <Film className="h-8 w-8 text-siddu-electric-blue" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-siddu-text-secondary tracking-tighter">
              Movie Collections
            </h1>
            <p className="text-lg text-siddu-text-secondary mb-8 max-w-2xl mx-auto">
              Discover, create, and share curated lists of films. From official Siddu selections to community-driven
              compilations, find your next movie marathon here.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => setShowCreateModal(true)}
                size="lg"
                className="bg-siddu-electric-blue hover:bg-siddu-electric-blue/90 text-siddu-deep-night font-bold shadow-lg shadow-siddu-electric-blue/20"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showCreateModal && (
        <CreateCollectionModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateCollection={onCreateCollection}
        />
      )}
    </>
  )
}
