"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AddAwardModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddAwardModal({ open, setOpen }: AddAwardModalProps) {
  const [awardName, setAwardName] = useState("")
  const [awardCategory, setAwardCategory] = useState("")
  const [event, setEvent] = useState("")
  const [nominee, setNominee] = useState("")
  const [movie, setMovie] = useState("")
  const [winner, setWinner] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here, e.g., send data to an API
    console.log({
      awardName,
      awardCategory,
      event,
      nominee,
      movie,
      winner,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Award</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="awardName">Award Name</Label>
            <Input
              id="awardName"
              value={awardName}
              onChange={(e) => setAwardName(e.target.value)}
              placeholder="Best Picture"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="awardCategory">Category</Label>
            <Input
              id="awardCategory"
              value={awardCategory}
              onChange={(e) => setAwardCategory(e.target.value)}
              placeholder="Feature Film"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="event">Event</Label>
            <Input
              id="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Global Cinema Awards"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nominee">Nominee</Label>
            <Input
              id="nominee"
              value={nominee}
              onChange={(e) => setNominee(e.target.value)}
              placeholder="Oppenheimer"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="movie">Movie</Label>
            <Input id="movie" value={movie} onChange={(e) => setMovie(e.target.value)} placeholder="Oppenheimer" />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id="winner"
              checked={winner}
              onChange={(e) => setWinner(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="winner">Winner</Label>
          </div>
          <Button type="submit">Add Award</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
