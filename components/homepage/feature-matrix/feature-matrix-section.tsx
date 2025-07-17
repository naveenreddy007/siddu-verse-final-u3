"use client"
import { motion, useTransform, type MotionValue } from "framer-motion"
import { FeatureNodeCard } from "./feature-node-card" // Ensure this path is correct
import type { MainFeatureNode } from "./features-data" // Ensure this path is correct
import { Sparkles } from "lucide-react"

interface FeatureMatrixSectionProps {
  features: MainFeatureNode[]
  scrollYProgress?: MotionValue<number> // Make optional for graceful degradation
}

// Ensure this is a named export
export default function FeatureMatrixSection({ features, scrollYProgress }: FeatureMatrixSectionProps) {
  // Apply parallax only if scrollYProgress is provided
  const yProgress = scrollYProgress || null // Use null for default
  const y = useTransform(yProgress ?? 0, [0, 1], ["20px", "-80px"])
  const opacity = useTransform(yProgress ?? 0, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.section
      className="py-16 md:py-24 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 z-0">
        {/* Placeholder for a more complex particle/constellation background if desired */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-50"></div> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
              Discover the Siddu Universe
            </h2>
          </div>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Explore the core pillars of our platform, meticulously designed for an unparalleled entertainment journey.
            Each facet offers unique ways to engage, discover, and connect.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          initial="initial" // Will be used by children if they have variants
          animate="animate" // Will be used by children if they have variants
          // Staggering is handled by FeatureNodeCard's `delay: index * 0.1`
        >
          {features.map((feature, index) => (
            <FeatureNodeCard key={feature.id} feature={feature} index={index} totalNodes={features.length} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
