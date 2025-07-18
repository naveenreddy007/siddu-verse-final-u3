"use client"

import { motion } from "framer-motion"
import { CollectionCard } from "./collection-card"
import type { Collection } from "./types"

interface CollectionGridProps {
  title: string
  collections: Collection[]
}

export function CollectionGrid({ title, collections }: CollectionGridProps) {
  if (collections.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-siddu-text-primary"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </motion.div>
    </section>
  )
}
