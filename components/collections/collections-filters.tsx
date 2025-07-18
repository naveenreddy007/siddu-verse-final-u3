"use client"

import { Search, Filter, SortAsc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

export type SortOption = "popularity" | "newest" | "updated"
export type TypeOption = "all" | "featured" | "popular" | "user" | "recommended"

interface CollectionsFiltersProps {
  searchQuery: string
  sortOption: SortOption
  typeOptions: TypeOption[]
  onSearch: (query: string) => void
  onSortChange: (sort: SortOption) => void
  onTypeChange: (types: TypeOption[]) => void
}

const sortLabels: Record<SortOption, string> = {
  popularity: "Most Popular",
  newest: "Newest First",
  updated: "Recently Updated",
}

const typeLabels: Record<TypeOption, string> = {
  all: "All Collections",
  featured: "Featured",
  popular: "Popular",
  user: "My Collections",
  recommended: "Recommended",
}

export function CollectionsFilters({
  searchQuery,
  sortOption,
  typeOptions,
  onSearch,
  onSortChange,
  onTypeChange,
}: CollectionsFiltersProps) {
  const handleTypeToggle = (type: TypeOption, checked: boolean) => {
    if (type === "all") {
      onTypeChange(checked ? ["all"] : [])
    } else {
      const newTypes = checked
        ? [...typeOptions.filter((t) => t !== "all"), type]
        : typeOptions.filter((t) => t !== type)
      onTypeChange(newTypes.length === 0 ? ["all"] : newTypes)
    }
  }

  const activeFiltersCount = typeOptions.includes("all") ? 0 : typeOptions.length

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-siddu-text-subtle" />
        <Input
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 bg-siddu-dark-grey border-siddu-dark-grey text-siddu-text-primary placeholder:text-siddu-text-subtle focus:border-siddu-electric-blue"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-siddu-dark-grey text-siddu-text-primary bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-siddu-electric-blue text-siddu-deep-night">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-siddu-dark-grey border-siddu-dark-grey">
            <DropdownMenuLabel className="text-siddu-text-primary">Collection Type</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-siddu-dark-grey" />
            {(Object.keys(typeLabels) as TypeOption[]).map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={typeOptions.includes(type)}
                onCheckedChange={(checked) => handleTypeToggle(type, checked)}
                className="text-siddu-text-primary focus:bg-siddu-electric-blue/20"
              >
                {typeLabels[type]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-siddu-dark-grey text-siddu-text-primary bg-transparent">
              <SortAsc className="mr-2 h-4 w-4" />
              {sortLabels[sortOption]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-siddu-dark-grey border-siddu-dark-grey">
            <DropdownMenuLabel className="text-siddu-text-primary">Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-siddu-dark-grey" />
            <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
              {(Object.keys(sortLabels) as SortOption[]).map((sort) => (
                <DropdownMenuRadioItem
                  key={sort}
                  value={sort}
                  className="text-siddu-text-primary focus:bg-siddu-electric-blue/20"
                >
                  {sortLabels[sort]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {typeOptions
              .filter((type) => type !== "all")
              .map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="bg-siddu-electric-blue/20 text-siddu-electric-blue border-siddu-electric-blue/30"
                >
                  {typeLabels[type]}
                  <button onClick={() => handleTypeToggle(type, false)} className="ml-1 hover:text-siddu-text-primary">
                    ×
                  </button>
                </Badge>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
