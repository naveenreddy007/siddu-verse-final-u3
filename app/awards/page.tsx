"use client"

import { useState, useEffect } from "react"
import { AwardsPageHeader } from "@/components/awards/award-page-header"
import { AwardsCeremonySection } from "@/components/awards/awards-ceremony-section"
import { AwardsPageSkeleton } from "@/components/awards/awards-page-skeleton"
import type { AwardCeremony } from "@/components/awards/types"

export default function AwardsPage() {
  const [awards, setAwards] = useState<AwardCeremony[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAwards() {
      try {
        // The Go backend runs on port 8080
        const response = await fetch("http://localhost:8080/api/awards")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // The API returns { awards: [...] }, so we extract the array
        setAwards(data.awards || [])
      } catch (e: any) {
        setError(e.message)
        console.error("Failed to fetch awards:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchAwards()
  }, [])

  if (loading) {
    return <AwardsPageSkeleton />
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">Failed to load awards: {error}</div>
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <AwardsPageHeader />
      <main className="container mx-auto px-4 py-8">
        <AwardsCeremonySection ceremonies={awards} />
      </main>
    </div>
  )
}
