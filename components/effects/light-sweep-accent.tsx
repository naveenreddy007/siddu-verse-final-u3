"use client"
import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LightSweepAccentProps {
  isActive: boolean
  className?: string
  sweepClassName?: string
  delay?: number
  duration?: number
}

// Ensure this is a named export
export const LightSweepAccent: React.FC<LightSweepAccentProps> = ({
  isActive,
  className,
  sweepClassName = "w-1/2 md:w-1/3", // Adjust width for different effects
  delay = 0,
  duration = 0.7,
}) => {
  return (
    <motion.div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.1 }} // Quick fade for the container itself
    >
      <motion.div
        className={cn(
          "absolute top-0 bottom-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent",
          sweepClassName,
        )}
        style={{
          // Start off-screen to the left. Using percentages of its own width.
          left: "-100%",
          skewX: "-20deg",
        }}
        initial={{ x: "0%" }} // Relative to its 'left' position
        animate={{ x: isActive ? ["0%", "300%"] : "0%" }} // Moves across (0% to 100% of parent) and then some more to exit
        transition={{
          duration: isActive ? duration : 0,
          delay: isActive ? delay : 0,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
