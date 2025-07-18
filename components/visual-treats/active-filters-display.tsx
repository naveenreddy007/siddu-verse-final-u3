"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { FilterState } from "@/lib/visual-treats-types"

interface ActiveFiltersDisplayProps {
  filters: FilterState
  onRemoveFilter: (filterType: keyof Omit<FilterState, "sortBy">, value: string) => void
  onClearAll: () => void
}

export function ActiveFiltersDisplay({ filters, onRemoveFilter, onClearAll }: ActiveFiltersDisplayProps) {
  const activeFilterItems: { type: keyof Omit<FilterState, "sortBy">; value: string }[] = []
  ;(Object.keys(filters) as Array<keyof FilterState>).forEach((key) => {
    if (key !== "sortBy") {
      const filterValues = filters[key as keyof Omit<FilterState, "sortBy">]
      if (Array.isArray(filterValues) && filterValues.length > 0) {
        filterValues.forEach((value) => {
          activeFilterItems.push({ type: key as keyof Omit<FilterState, "sortBy">, value })
        })
      }
    }
  })

  if (activeFilterItems.length === 0) {
    return null
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-800">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-400 mr-2">Active Filters:</span>
        {activeFilterItems.map((item, index) => (
          <Badge
            key={`${item.type}-${item.value}-${index}`}
            variant="outline"
            className="bg-[#00BFFF]/10 text-[#00BFFF] border-[#00BFFF]/20 flex items-center gap-1 transition-all hover:bg-[#00BFFF]/20"
          >
            {item.value}
            <button
              onClick={() => onRemoveFilter(item.type, item.value)}
              className="ml-1 p-0.5 rounded-full hover:bg-white/20"
              aria-label={`Remove filter ${item.value}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {activeFilterItems.length > 1 && (
          <button
            onClick={onClearAll}
            className="ml-auto text-sm text-gray-500 hover:text-[#00BFFF] underline transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}
