"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SubFeatureItem } from "./sub-feature-item"
import type { MainFeatureNode } from "./features-data"
import { LightSweepAccent } from "@/components/effects/light-sweep-accent"
import { cn } from "@/lib/utils"

interface FeatureNodeCardProps {
  feature: MainFeatureNode
  index: number
  totalNodes: number
}

export const FeatureNodeCard: React.FC<FeatureNodeCardProps> = ({ feature, index, totalNodes }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
    },
  }

  const colorVariants: Record<string, { text: string; border: string; bg: string; hoverBg: string; shadow: string }> = {
    sky: {
      text: "text-sky-400",
      border: "border-sky-500/30",
      bg: "bg-sky-950/40",
      hoverBg: "hover:bg-sky-900/60",
      shadow: "shadow-sky-500/20",
    },
    emerald: {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/40",
      hoverBg: "hover:bg-emerald-900/60",
      shadow: "shadow-emerald-500/20",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-950/40",
      hoverBg: "hover:bg-purple-900/60",
      shadow: "shadow-purple-500/20",
    },
    rose: {
      text: "text-rose-400",
      border: "border-rose-500/30",
      bg: "bg-rose-950/40",
      hoverBg: "hover:bg-rose-900/60",
      shadow: "shadow-rose-500/20",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-950/40",
      hoverBg: "hover:bg-amber-900/60",
      shadow: "shadow-amber-500/20",
    },
  }
  // Fallback to sky if feature.colorName is not in colorVariants
  const colors = colorVariants[feature.colorName as keyof typeof colorVariants] || colorVariants.sky

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "rounded-xl border p-6 transition-all duration-300 ease-out relative overflow-hidden",
        colors.border,
        colors.bg,
        colors.hoverBg,
        isExpanded ? `shadow-2xl ${colors.shadow}` : `hover:shadow-xl ${colors.shadow}`,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout // Animate layout changes smoothly
    >
      <LightSweepAccent isActive={isHovered && !isExpanded} duration={0.8} delay={0.1} />
      <div
        className="flex flex-col items-center text-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`subfeatures-${feature.id}`}
      >
        <motion.div
          className={cn("p-3 rounded-full mb-4 inline-block", colors.bg)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <feature.icon className={cn("w-10 h-10", colors.text)} />
        </motion.div>
        <h3 className={cn("text-xl font-semibold mb-1", colors.text)}>{feature.title}</h3>
        <p className="text-sm text-neutral-400 mb-3 h-10">{feature.tagline}</p>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-neutral-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`subfeatures-${feature.id}`}
            className="mt-4 pt-4 border-t border-neutral-700/50 space-y-1 text-left"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {feature.subFeatures.map((subFeat, idx) => (
              <motion.div
                key={subFeat.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: (i: number) => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: i * 0.07,
                      duration: 0.3,
                    },
                  }),
                }}
              >
                <SubFeatureItem feature={subFeat} parentColorName={feature.colorName} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
