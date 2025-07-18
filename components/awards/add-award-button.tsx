"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { AddAwardModal } from "@/components/awards/add-award-modal"

export function AddAwardButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Award
      </Button>
      <AddAwardModal open={open} setOpen={setOpen} />
    </>
  )
}
