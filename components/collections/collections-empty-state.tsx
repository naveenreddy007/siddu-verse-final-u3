"use client"

import { motion } from "framer-motion"
import { Film, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CollectionsEmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-6 rounded-full bg-siddu-dark-grey p-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <Film className="h-12 w-12 text-siddu-text-subtle" />
      </motion.div>

      <motion.h3
        className="mb-2 text-xl font-semibold text-siddu-text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        No collections found
      </motion.h3>

      <motion.p
        className="mb-8 max-w-md text-siddu-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Try adjusting your search terms or filters, or create your own collection to get started.
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button className="bg-siddu-electric-blue text-siddu-deep-night hover:bg-siddu-electric-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Collection
        </Button>
        <Button variant="outline" className="border-siddu-dark-grey text-siddu-text-primary bg-transparent">
          <Search className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </motion.div>
    </motion.div>
  )
}
