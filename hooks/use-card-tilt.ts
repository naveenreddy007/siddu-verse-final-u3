"use client"

import { useMotionValue, useSpring, transform } from "framer-motion"
import type { MouseEvent } from "react"

export function useCardTilt() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 300, damping: 30, mass: 1 }

  const rotateX = useSpring(transform(mouseY, [0, 300], [15, -15]), springConfig)
  const rotateY = useSpring(transform(mouseX, [0, 400], [-15, 15]), springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(200) // Center of a 400px card
    mouseY.set(150) // Center of a 300px card
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}
