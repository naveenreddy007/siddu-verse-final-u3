"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type SortOption = "popularity" | "updated" | "newest"
export type TypeOption = "all" | "featured" | "popular" | "user" | "recommended"

interface CollectionsFiltersProps {
  onSearch: (query: string) => void
  onSortChange: (sort: SortOption) => void
  onTypeChange: (type: TypeOption[]) => void
  searchQuery: string
  sortOption: SortOption
  typeOptions: TypeOption[]
}

export function CollectionsFilters({
  onSearch,
  onSortChange,
  onTypeChange,
  searchQuery,
  sortOption,
  typeOptions,
}: CollectionsFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-siddu-dark-grey/50 backdrop-blur-sm border border-siddu-light-grey rounded-xl p-4 mb-8 sticky top-4 z-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-siddu-text-secondary" />
          <Input
            placeholder="Search by title, tag, or creator..."
            className="pl-10 h-12 text-base bg-siddu-light-grey border-siddu-light-grey/50 focus:border-siddu-electric-blue focus:ring-siddu-electric-blue"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => onSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div>
          <Select value={sortOption} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger className="h-12 bg-siddu-light-grey border-siddu-light-grey/50">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={typeOptions}
            onValueChange={(value: TypeOption[]) => onTypeChange(value.length > 0 ? value : ["all"])}
            className="w-full h-12 bg-siddu-light-grey rounded-md border border-siddu-light-grey/50 p-1"
          >
            <ToggleGroupItem
              value="all"
              className="flex-1 data-[state=on]:bg-siddu-dark-grey data-[state=on]:text-siddu-text-primary"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="featured"
              className="flex-1 data-[state=on]:bg-siddu-dark-grey data-[state=on]:text-siddu-text-primary"
            >
              Featured
            </ToggleGroupItem>
            <ToggleGroupItem
              value="popular"
              className="flex-1 data-[state=on]:bg-siddu-dark-grey data-[state=on]:text-siddu-text-primary"
            >
              Popular
            </ToggleGroupItem>
            <ToggleGroupItem
              value="user"
              className="flex-1 data-[state=on]:bg-siddu-dark-grey data-[state=on]:text-siddu-text-primary"
            >
              My Lists
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </motion.div>
  )
}
