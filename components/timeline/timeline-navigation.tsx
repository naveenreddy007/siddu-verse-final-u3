"use client"

import { Button } from "@/components/ui/button"
import type { TimelineEventData } from "./types"
import { useMemo } from "react"

interface TimelineNavigationProps {
  events: TimelineEventData[]
}

export function TimelineNavigation({ events }: TimelineNavigationProps) {
  const uniqueYears = useMemo(() => {
    if (!events || events.length === 0) return []
    const years = events.map((event) => new Date(event.date).getFullYear())
    return Array.from(new Set(years)).sort((a, b) => a - b)
  }, [events])

  const handleJumpToYear = (year: number) => {
    const firstEventOfYear = events.find((event) => new Date(event.date).getFullYear() === year)
    if (firstEventOfYear) {
      const element = document.getElementById(`event-${firstEventOfYear.id}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  if (uniqueYears.length < 2) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-[#A0A0A0] mr-2 font-medium">Jump to Year:</span>
      {uniqueYears.map((year) => (
        <Button
          key={year}
          variant="ghost"
          size="sm"
          onClick={() => handleJumpToYear(year)}
          className="text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:text-[#00DFFF] px-2 py-1"
        >
          {year}
        </Button>
      ))}
    </div>
  )
}
