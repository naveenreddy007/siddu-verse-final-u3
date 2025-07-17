"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { TimelineEventCard } from "@/components/timeline/timeline-event"
import { TimelineFilter } from "@/components/timeline/timeline-filter"
import { TimelineZoom } from "@/components/timeline/timeline-zoom"
import { TimelineEventModal } from "@/components/timeline/timeline-event-modal"
import { TimelineSearch } from "@/components/timeline/timeline-search"
import type { TimelineEvent, EventCategory, TimelineViewMode } from "@/components/timeline/types"
import { movieData as inceptionMovieData } from "../page-data" // Import movie data

// MOCK TIMELINE DATA (Specific to Inception for this example)
const inceptionTimelineEvents: TimelineEvent[] = [
  // ... (Keep existing mock data for timeline events) ...
  {
    id: "event-1",
    date: "2001-01-01",
    title: "Initial Concept: The Dream Thief",
    category: "Development",
    description:
      "Christopher Nolan first conceived the idea of 'dream thieves' after filming 'Insomnia'. He envisioned a heist film set within the landscape of the mind. The initial pitch was for a horror film, but it evolved over several years.",
    imageUrl: "/abstract-script-writing.png",
    significance: "Conceptual Origin",
    tags: ["concept", "writing", "Nolan"],
    source: "Various interviews with Christopher Nolan",
    relatedLinks: [{ label: "Nolan Interview on Inception Origins", url: "#" }],
  },
  {
    id: "event-2",
    date: "2008-02-11",
    title: "Script Development Post-Dark Knight",
    category: "Development",
    description:
      "After the success of 'The Dark Knight', Nolan revisited and extensively rewrote his 80-page treatment for Inception. Warner Bros. purchased the script in February 2009.",
    imageUrl: "/placeholder-wn3bc.png",
    significance: "Script Finalization",
    tags: ["script", "Warner Bros.", "development"],
    source: "Variety, Hollywood Reporter articles",
  },
  {
    id: "event-3",
    date: "2009-06-19",
    title: "Principal Photography Begins",
    category: "Production",
    description:
      "Filming started in Tokyo, Japan, and spanned multiple countries including the United Kingdom, France, Canada, Morocco, and the United States over several months.",
    imageUrl: "/inception-filming-start.png",
    significance: "Start of Production",
    tags: ["filming", "production", "global shoot"],
    source: "Production notes, behind-the-scenes documentaries",
    videoEmbedUrl: "https://www.youtube.com/embed/ примеру",
  },
  {
    id: "event-4",
    date: "2009-08-24",
    title: "Iconic Rotating Hallway Scene Filmed",
    category: "Production",
    description:
      "The groundbreaking rotating hallway fight sequence was filmed at Cardington Studios in Bedfordshire, England. A massive centrifuge-like structure was built to achieve the effect practically.",
    imageUrl: "/inception-scene-thumbnail.png",
    significance: "Key Scene Production",
    tags: ["practical effects", "stunts", "innovation"],
    source: "Behind-the-scenes featurettes",
  },
  {
    id: "event-5",
    date: "2010-02-01", // Approximate
    title: "Hans Zimmer Composes the Score",
    category: "Post-production",
    description:
      "Hans Zimmer began composing the iconic score for Inception, working closely with Nolan to create music that reflected the film's themes of time manipulation and layered realities.",
    imageUrl: "/hans-zimmer-portrait.png",
    significance: "Musical Score Creation",
    tags: ["music", "score", "Hans Zimmer"],
    source: "Interviews with Hans Zimmer",
  },
  {
    id: "event-6",
    date: "2010-07-08",
    title: "World Premiere in London",
    category: "Release",
    description: "Inception held its world premiere at Leicester Square in London, UK, attended by the cast and crew.",
    imageUrl: "/inception-premiere.png",
    significance: "First Public Screening",
    tags: ["premiere", "release", "London"],
    source: "News reports, event coverage",
  },
  {
    id: "event-7",
    date: "2010-07-16",
    title: "Theatrical Release in USA",
    category: "Release",
    description:
      "The film was released in conventional and IMAX theaters in the United States, quickly gaining critical acclaim and box office success.",
    imageUrl: "/inception-movie-poster.png",
    significance: "Wide Release",
    tags: ["box office", "critical acclaim", "USA release"],
    source: "Box Office Mojo, Rotten Tomatoes",
  },
  {
    id: "event-8",
    date: "2011-02-27",
    title: "Wins 4 Academy Awards",
    category: "Awards",
    description:
      "Inception won four Academy Awards: Best Cinematography, Best Sound Editing, Best Sound Mixing, and Best Visual Effects. It was nominated for eight awards in total, including Best Picture.",
    imageUrl: "/oscar-trophy.png",
    significance: "Major Award Recognition",
    tags: ["Oscars", "awards", "cinematography", "visual effects"],
    source: "Academy of Motion Picture Arts and Sciences",
  },
]

export default function MovieTimelinePage({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([])
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [viewMode, setViewMode] = useState<TimelineViewMode>("visual") // 'visual' or 'list'
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const movieTitle = params.id === inceptionMovieData.id ? inceptionMovieData.title : "Movie"

  useEffect(() => {
    // Simulate fetching timeline data for the specific movie
    setIsLoading(true)
    // In a real app, fetch data based on params.id
    if (params.id === inceptionMovieData.id) {
      setEvents(inceptionTimelineEvents)
    } else {
      setEvents([]) // No events for other movies in this mock
    }
    setTimeout(() => setIsLoading(false), 500)
  }, [params.id])

  useEffect(() => {
    let currentEvents = [...events]

    if (selectedCategories.length > 0) {
      currentEvents = currentEvents.filter((event) => selectedCategories.includes(event.category))
    }

    if (searchTerm) {
      currentEvents = currentEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    currentEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setFilteredEvents(currentEvents)
  }, [events, selectedCategories, searchTerm])

  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const uniqueCategories = useMemo(() => {
    const cats = new Set(events.map((event) => event.category))
    return Array.from(cats) as EventCategory[]
  }, [events])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#282828] border-t-[#00BFFF] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Timeline: {movieTitle}</h2>
        <p className="text-gray-400">Explore the journey of {movieTitle} from concept to legacy.</p>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <TimelineSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TimelineFilter
          categories={uniqueCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <TimelineZoom zoomLevel={zoomLevel} onZoomChange={setZoomLevel} />
        {/* View mode toggle could be added here if needed */}
      </div>

      {/* Timeline Navigation (Years/Eras) - could be enhanced */}
      {/* <TimelineNavigation events={filteredEvents} onViewModeChange={setViewMode} currentViewMode={viewMode} /> */}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <FilmIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-400">No timeline events match your criteria.</p>
          {(selectedCategories.length > 0 || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategories([])
                setSearchTerm("")
              }}
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className={`timeline-container overflow-x-auto pb-4 ${viewMode === "visual" ? "relative" : ""}`}>
          {/* Visual Timeline Line (Simplified) */}
          {viewMode === "visual" && filteredEvents.length > 1 && (
            <div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0"
              style={{ width: `${Math.max(100, filteredEvents.length * (150 * zoomLevel))}px` }}
            ></div>
          )}
          <div
            className={`flex ${viewMode === "visual" ? "space-x-4 items-start" : "flex-col space-y-6"}`}
            style={{ minWidth: viewMode === "visual" ? `${filteredEvents.length * (150 * zoomLevel)}px` : "auto" }}
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: viewMode === "visual" ? (index % 2 === 0 ? -20 : 20) : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${viewMode === "visual" ? "relative z-10" : ""}`}
              >
                <TimelineEventCard
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                  zoomLevel={zoomLevel}
                  isOdd={index % 2 !== 0}
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedEvent && (
        <TimelineEventModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </motion.div>
  )
}

// Placeholder Icon
function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm0 2h2v2H4V6zm0 4h2v2H4v-2zm0 4h2v2H4v-2zm14 4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2zM8 6h8v12H8V6z" />
    </svg>
  )
}
