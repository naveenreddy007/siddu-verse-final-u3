"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Collection, VisualTreat } from "@/lib/visual-treats-types"

interface AddToCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  treat: VisualTreat | null
  collections: Collection[]
  onSave: (payload: { treatId: string; selectedCollectionIds: string[]; newCollectionName?: string }) => void
}

export function AddToCollectionModal({ isOpen, onClose, treat, collections, onSave }: AddToCollectionModalProps) {
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([])
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (treat && collections) {
      const initialSelectedIds = collections.filter((c) => c.treatIds.includes(treat.id)).map((c) => c.id)
      setSelectedCollectionIds(initialSelectedIds)
    }
    // Reset creation form when modal opens
    setIsCreatingNewCollection(false)
    setNewCollectionName("")
  }, [isOpen, treat, collections])

  const handleToggleCollection = (collectionId: string) => {
    setSelectedCollectionIds((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId],
    )
  }

  const handleSave = () => {
    if (!treat) return
    setIsSaving(true)
    // Simulate async operation
    setTimeout(() => {
      onSave({
        treatId: treat.id,
        selectedCollectionIds,
        newCollectionName: isCreatingNewCollection ? newCollectionName : undefined,
      })
      setIsSaving(false)
      onClose()
    }, 500)
  }

  const hasChanges = useMemo(() => {
    if (!treat) return false
    const initialSelectedIds = collections.filter((c) => c.treatIds.includes(treat.id)).map((c) => c.id)
    const sortedInitial = [...initialSelectedIds].sort()
    const sortedCurrent = [...selectedCollectionIds].sort()
    const collectionsChanged = JSON.stringify(sortedInitial) !== JSON.stringify(sortedCurrent)
    const newCollectionAdded = isCreatingNewCollection && newCollectionName.trim() !== ""
    return collectionsChanged || newCollectionAdded
  }, [selectedCollectionIds, newCollectionName, isCreatingNewCollection, collections, treat])

  return (
    <AnimatePresence>
      {isOpen && treat && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative w-full max-w-md bg-[#181818] border border-gray-800 rounded-lg shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
              <h2 className="text-lg font-semibold text-white">Add to Collection</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center space-x-3 p-3 rounded-md bg-[#222] border border-transparent hover:border-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleToggleCollection(collection.id)}
                  >
                    <Checkbox
                      id={`collection-${collection.id}`}
                      checked={selectedCollectionIds.includes(collection.id)}
                      className="border-gray-600 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF] rounded"
                    />
                    <Label htmlFor={`collection-${collection.id}`} className="text-gray-200 cursor-pointer">
                      {collection.name}
                    </Label>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {isCreatingNewCollection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="space-y-2 p-3 bg-[#222] rounded-md border border-gray-700">
                      <Label htmlFor="new-collection-name" className="text-white">
                        New Collection Name
                      </Label>
                      <Input
                        id="new-collection-name"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        placeholder="e.g., 'Epic Wide Shots'"
                        className="bg-[#111] border-gray-600 text-white"
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>

            <div className="p-4 border-t border-gray-800 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsCreatingNewCollection(!isCreatingNewCollection)}
                className="w-full mb-3 border-gray-700 bg-transparent text-gray-300 hover:bg-[#282828] hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isCreatingNewCollection ? "Cancel" : "Create New Collection"}
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="w-full bg-[#00BFFF] hover:bg-[#00BFFF]/90 text-black font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                {isSaving ? "Saving..." : "Done"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
