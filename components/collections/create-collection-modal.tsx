"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { CreateCollectionData } from "./types"

interface CreateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateCollectionData) => void
}

export function CreateCollectionModal({ isOpen, onClose, onSubmit }: CreateCollectionModalProps) {
  const [formData, setFormData] = useState<CreateCollectionData>({
    title: "",
    description: "",
    isPublic: true,
    tags: [],
  })
  const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({ title: "", description: "", isPublic: true, tags: [] })
      setNewTag("")
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-siddu-dark-grey border-siddu-dark-grey text-siddu-text-primary max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Collection</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-siddu-text-primary">
              Collection Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter collection title..."
              className="bg-siddu-deep-night border-siddu-deep-night text-siddu-text-primary"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-siddu-text-primary">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your collection..."
              className="bg-siddu-deep-night border-siddu-deep-night text-siddu-text-primary resize-none"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-siddu-text-primary">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="bg-siddu-deep-night border-siddu-deep-night text-siddu-text-primary"
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                className="bg-siddu-electric-blue text-siddu-deep-night hover:bg-siddu-electric-blue/90"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <AnimatePresence>
                  {formData.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-siddu-electric-blue/20 text-siddu-electric-blue border-siddu-electric-blue/30"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-siddu-text-primary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="public" className="text-siddu-text-primary">
                Public Collection
              </Label>
              <p className="text-sm text-siddu-text-subtle">Allow others to discover and follow your collection</p>
            </div>
            <Switch
              id="public"
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked }))}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-siddu-dark-grey text-siddu-text-primary bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-siddu-electric-blue text-siddu-deep-night hover:bg-siddu-electric-blue/90"
              disabled={!formData.title.trim()}
            >
              Create Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
