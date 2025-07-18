"use client"

import { motion } from "framer-motion"
import { CollectionCard } from "./collection-card"
import type { Collection } from "./types"

interface CollectionGridProps {
  title: string
  collections: Collection[]
}

export function CollectionGrid({ title, collections }: CollectionGridProps) {
  if (collections.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-siddu-text-primary md:text-3xl">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CollectionCard collection={collection} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
