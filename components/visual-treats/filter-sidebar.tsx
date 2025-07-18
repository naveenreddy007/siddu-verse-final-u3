"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X, TrendingUp, Clock, Film, User, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FilterState, AvailableFilters, SortByType } from "@/lib/visual-treats-types"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  availableFilters: AvailableFilters
}

const sortOptions: { label: string; value: SortByType; icon: React.ElementType }[] = [
  { label: "Popularity", value: "popular", icon: TrendingUp },
  { label: "Most Viewed", value: "views_desc", icon: Eye },
  { label: "Most Recent", value: "recent", icon: Clock },
  { label: "Oldest First", value: "oldest", icon: Clock },
  { label: "Title (A-Z)", value: "title_asc", icon: Film },
  { label: "Title (Z-A)", value: "title_desc", icon: Film },
  { label: "Director (A-Z)", value: "director_asc", icon: User },
  { label: "Director (Z-A)", value: "director_desc", icon: User },
  { label: "Film (A-Z)", value: "film_asc", icon: Film },
  { label: "Film (Z-A)", value: "film_desc", icon: Film },
]

export function FilterSidebar({ isOpen, onClose, filters, onFilterChange, availableFilters }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({
    categories: "",
    tags: "",
    directors: "",
    cinematographers: "",
    decades: "",
  })

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters, isOpen])

  const handleSortChange = (value: SortByType) => {
    setLocalFilters((prev) => ({ ...prev, sortBy: value }))
  }

  const handleToggleFilter = (filterType: keyof Omit<FilterState, "sortBy">, value: string) => {
    setLocalFilters((prev) => {
      const currentValues = prev[filterType] as string[]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      return { ...prev, [filterType]: newValues }
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleResetFilters = () => {
    const resetFiltersState: FilterState = {
      categories: [],
      tags: [],
      directors: [],
      cinematographers: [],
      decades: [],
      sortBy: "popular",
    }
    setLocalFilters(resetFiltersState)
  }

  const handleSearchQueryChange = (filterType: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [filterType]: query }))
  }

  const filterItems = (items: { name: string; count: number }[], query: string) => {
    if (!query) return items
    return items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
  }

  const renderFilterSection = (
    title: string,
    filterKey: keyof Omit<FilterState, "sortBy">,
    availableItems: { name: string; count: number }[],
  ) => (
    <AccordionItem value={filterKey} className="border-gray-800">
      <AccordionTrigger className="text-white hover:text-[#00BFFF] hover:no-underline text-base">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <Input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchQueries[filterKey]}
          onChange={(e) => handleSearchQueryChange(filterKey, e.target.value)}
          className="bg-[#111] border-gray-700 text-white mb-3 text-sm"
        />
        <ScrollArea className="h-48">
          <div className="space-y-3 mt-2 pr-3">
            {filterItems(availableItems, searchQueries[filterKey]).map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <Checkbox
                  id={`${filterKey}-${item.name}`}
                  checked={(localFilters[filterKey] as string[]).includes(item.name)}
                  onCheckedChange={() => handleToggleFilter(filterKey, item.name)}
                  className="border-gray-600 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF] rounded"
                />
                <Label
                  htmlFor={`${filterKey}-${item.name}`}
                  className="text-gray-300 cursor-pointer flex justify-between w-full text-sm hover:text-white transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="text-gray-500">({item.count})</span>
                </Label>
              </div>
            ))}
            {filterItems(availableItems, searchQueries[filterKey]).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No {title.toLowerCase()} found.</p>
            )}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#181818] shadow-2xl z-50 flex flex-col border-l border-gray-800"
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#00BFFF]" />
            Filter & Sort
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-grow p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-base">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                {sortOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <Button
                      key={option.value}
                      variant={localFilters.sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full justify-start text-sm transition-all ${
                        localFilters.sortBy === option.value
                          ? "bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-black border-[#00BFFF] font-semibold"
                          : "border-gray-700 bg-[#222] text-gray-300 hover:bg-[#3A3A3A] hover:text-white hover:border-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <Accordion type="multiple" className="w-full" defaultValue={["categories", "tags"]}>
              {renderFilterSection("Categories", "categories", availableFilters.categories)}
              {renderFilterSection("Tags", "tags", availableFilters.tags)}
              {renderFilterSection("Directors", "directors", availableFilters.directors)}
              {renderFilterSection("Cinematographers", "cinematographers", availableFilters.cinematographers)}
              {renderFilterSection("Decades", "decades", availableFilters.decades)}
            </Accordion>
          </div>
        </ScrollArea>

        <div className="flex gap-3 p-4 border-t border-gray-800 bg-[#111]">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex-1 border-gray-700 bg-[#222] text-gray-300 hover:bg-[#3A3A3A] hover:text-white"
          >
            Reset
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-black font-semibold"
          >
            Apply Filters
          </Button>
        </div>
      </motion.div>
    </>
  )
}
