"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { animate } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  duration?: number
  precision?: number
  className?: string
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 0.8, precision = 0, className }) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    const controls = animate(currentValue, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCurrentValue(Number.parseFloat(latest.toFixed(precision)))
      },
    })
    return () => controls.stop()
  }, [value, duration, precision]) // run only when the target value or timing changes

  return (
    <span className={className}>
      {currentValue.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })}
    </span>
  )
}

export default AnimatedNumber
