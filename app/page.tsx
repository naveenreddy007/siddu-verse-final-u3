"use client"

import type React from "react" // Added React import for JSX
import { Suspense, useRef } from "react"
import dynamic from "next/dynamic"
import { useScroll, motion, type MotionValue } from "framer-motion"
import { useTransform } from "framer-motion"

// Skeletons
import SectionSkeleton from "@/components/skeletons/section-skeleton"
import BestSceneSectionSkeleton from "@/components/skeletons/best-scene-section-skeleton"

// Mock data imports
import {
  mockProgressData,
  mockWhatsNextData,
  mockInfluenceData,
  mockRecommendationData,
  mockWeeklyGemData,
} from "@/components/homepage/activity-snapshot/mock-data"
import {
  mockNewReleases,
  mockMasterpieces,
  mockSiddusPicks,
  mockVignetteData,
  mockTrendingPulses,
  mockBestScenes,
} from "@/components/homepage/mock-data"
import { sidduFeatures } from "@/components/homepage/feature-matrix/features-data"

// Helper component for parallax sections
const ParallaxMotionSection = ({
  children,
  scrollYProgress,
  className,
  inputRange = [0, 1],
  outputYRange = ["0px", "0px"],
  outputOpacityRange = [1, 1],
}: {
  children: React.ReactNode
  scrollYProgress: MotionValue<number>
  className?: string
  inputRange?: [number, number, number, number] | [number, number] // Allow more points for opacity
  outputYRange?: [string, string] | [string, string, string, string]
  outputOpacityRange?: [number, number] | [number, number, number, number]
}) => {
  const y = useTransform(scrollYProgress, inputRange as any, outputYRange as any) // Cast as any to simplify overload
  const opacity = useTransform(scrollYProgress, inputRange as any, outputOpacityRange as any)
  return (
    <motion.section className={className} style={{ y, opacity }}>
      {children}
    </motion.section>
  )
}

// Dynamically import sections - ensuring the .then(mod => mod.ComponentName) matches a named export
const PersonalizedActivitySlider = dynamic(
  () => import("@/components/homepage/activity-snapshot/personalized-activity-slider"),
  {
    loading: () => <SectionSkeleton message="Loading Personalized Insights..." heightClass="h-auto md:h-[480px]" />,
    ssr: false,
  },
)

const CinematicVignetteSection = dynamic(() => import("@/components/homepage/cinematic-vignette-section"), {
  loading: () => <SectionSkeleton message="Loading Cinematic Vignette..." heightClass="h-auto md:h-[550px]" />,
  ssr: false,
})

const FeatureMatrixSection = dynamic(() => import("@/components/homepage/feature-matrix/feature-matrix-section"), {
  loading: () => <SectionSkeleton message="Loading Platform Features..." heightClass="h-auto min-h-[400px]" />,
  ssr: false,
})

const NewReleasesSection = dynamic(() => import("@/components/homepage/new-releases-section"), {
  loading: () => <SectionSkeleton message="Loading New Releases..." />,
  ssr: false, // Often good for carousels to avoid hydration issues
})

const GlobalMasterpiecesSection = dynamic(() => import("@/components/homepage/global-masterpieces-section"), {
  loading: () => <SectionSkeleton message="Loading Global Masterpieces..." />,
  ssr: false,
})

const SiddusPicksSection = dynamic(() => import("@/components/homepage/siddus-picks-section"), {
  loading: () => <SectionSkeleton message="Loading Siddu's Picks..." />,
  ssr: false,
})

const BestScenesSection = dynamic(() => import("@/components/homepage/best-scenes-section"), {
  loading: () => <BestSceneSectionSkeleton />,
  ssr: false,
})

const TrendingPulseSection = dynamic(() => import("@/components/homepage/trending-pulse-section"), {
  loading: () => <SectionSkeleton message="Loading Trending Pulses..." />,
  ssr: false,
})

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null) // Added type for ref
  const { scrollYProgress } = useScroll({
    target: pageRef, // Target the page container for more accurate progress within it
    offset: ["start start", "end end"], // Track from when top of target hits top of viewport, to when bottom of target hits bottom.
  })

  return (
    <div ref={pageRef} className="bg-black text-white flex flex-col min-h-screen overflow-x-hidden">
      <Suspense
        fallback={<SectionSkeleton message="Loading Personalized Insights..." heightClass="h-auto md:h-[480px]" />}
      >
        <PersonalizedActivitySlider
          mockProgressData={mockProgressData}
          mockWhatsNextData={mockWhatsNextData}
          mockInfluenceData={mockInfluenceData}
          mockRecommendationData={mockRecommendationData}
          mockWeeklyGemData={mockWeeklyGemData}
        />
      </Suspense>

      {/* Example of passing scrollYProgress for internal parallax */}
      <CinematicVignetteSection vignettes={[mockVignetteData]} scrollYProgress={scrollYProgress} />

      {/* FeatureMatrixSection can also use scrollYProgress for its root parallax */}
      <FeatureMatrixSection features={sidduFeatures} scrollYProgress={scrollYProgress} />

      {/* Using ParallaxMotionSection for simpler parallax on other sections */}
      {/* Input ranges for ParallaxMotionSection might need adjustment based on actual page layout and section heights */}
      {/* These are conceptual ranges for demonstration */}
      <ParallaxMotionSection
        scrollYProgress={scrollYProgress}
        inputRange={[0, 0.3, 0.7, 1]}
        outputYRange={["0px", "20px", "-20px", "-40px"]}
        outputOpacityRange={[0.5, 1, 1, 0.5]}
      >
        <NewReleasesSection movies={mockNewReleases} />
      </ParallaxMotionSection>

      <ParallaxMotionSection
        scrollYProgress={scrollYProgress}
        inputRange={[0, 0.4, 0.8, 1]}
        outputYRange={["0px", "30px", "-30px", "-50px"]}
        outputOpacityRange={[0.5, 1, 1, 0.5]}
      >
        <GlobalMasterpiecesSection films={mockMasterpieces} />
      </ParallaxMotionSection>

      <ParallaxMotionSection
        scrollYProgress={scrollYProgress}
        inputRange={[0, 0.5, 0.9, 1]}
        outputYRange={["0px", "40px", "-40px", "-60px"]}
        outputOpacityRange={[0.5, 1, 1, 0.5]}
      >
        <SiddusPicksSection picks={mockSiddusPicks} />
      </ParallaxMotionSection>

      <ParallaxMotionSection
        scrollYProgress={scrollYProgress}
        inputRange={[0, 0.6, 1, 1]}
        outputYRange={["0px", "50px", "-50px", "-70px"]}
        outputOpacityRange={[0.5, 1, 1, 0.5]}
      >
        <BestScenesSection scenes={mockBestScenes} />
      </ParallaxMotionSection>

      <ParallaxMotionSection
        scrollYProgress={scrollYProgress}
        inputRange={[0, 0.7, 1, 1]}
        outputYRange={["0px", "60px", "-60px", "-80px"]}
        outputOpacityRange={[0.5, 1, 1, 0.5]}
      >
        <TrendingPulseSection pulses={mockTrendingPulses} />
      </ParallaxMotionSection>
    </div>
  )
}
