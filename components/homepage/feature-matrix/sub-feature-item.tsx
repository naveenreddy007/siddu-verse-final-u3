"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { SubFeature } from "./features-data" // Ensure this path is correct
import { cn } from "@/lib/utils" // Assuming cn is available

interface SubFeatureItemProps {
  feature: SubFeature
  parentColorName: string
}

// Ensure this is a named export
export const SubFeatureItem: React.FC<SubFeatureItemProps> = ({ feature, parentColorName }) => {
  const colorVariants: Record<string, string> = {
    sky: "text-sky-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    rose: "text-rose-400",
    amber: "text-amber-400",
  }

  return (
    <motion.div
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors duration-200"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      // initial="hidden" // Animation will be controlled by parent stagger
      // animate="visible"
      // exit="hidden"
      transition={{ duration: 0.3 }}
    >
      <feature.icon className={cn("w-5 h-5 mt-1 shrink-0", colorVariants[parentColorName] || "text-neutral-400")} />
      <div>
        <h4 className="font-semibold text-sm text-neutral-100">{feature.title}</h4>
        <p className="text-xs text-neutral-400">{feature.description}</p>
      </div>
    </motion.div>
  )
}
