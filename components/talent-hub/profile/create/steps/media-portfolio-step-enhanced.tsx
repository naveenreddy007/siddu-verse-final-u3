"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Film, Link, Plus, Crop, UploadCloud } from "lucide-react"
import { DragDropUpload } from "../drag-drop-upload"
import { MediaUploadPreview } from "../media-upload-preview"
import { ImageCropTool } from "../image-crop-tool"
import type { ProfileFormData } from "../../types"
import { toast } from "@/hooks/use-toast"
import type { PutBlobResult } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

interface MediaPortfolioStepEnhancedProps {
  data: ProfileFormData
  updateData: (updates: Partial<ProfileFormData>) => void
}

interface UploadFile {
  id: string
  file: File
  preview: string
  status: "uploading" | "success" | "error"
  error?: string
  url?: string // URL from Vercel Blob
}

export function MediaPortfolioStepEnhanced({ data, updateData }: MediaPortfolioStepEnhancedProps) {
  const [profilePhotoFiles, setProfilePhotoFiles] = useState<UploadFile[]>([])
  const [coverPhotoFiles, setCoverPhotoFiles] = useState<UploadFile[]>([])
  const [galleryFiles, setGalleryFiles] = useState<UploadFile[]>([])
  const [showreelFiles, setShowreelFiles] = useState<UploadFile[]>([])
  const [newPortfolioLink, setNewPortfolioLink] = useState({ platform: "", url: "" })
  const [cropImageInfo, setCropImageInfo] = useState<{ image: string; type: "profile" | "cover" } | null>(null)

  const performUpload = useCallback(
    async (uploadFile: UploadFile, type: "profile" | "cover" | "gallery" | "showreel") => {
      try {
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(uploadFile.file.name)}`, {
          method: "POST",
          body: uploadFile.file,
        })

        if (!response.ok) {
          const { error } = await response.json()
          throw new Error(error || "Upload failed")
        }

        const blob = (await response.json()) as PutBlobResult

        const successfulFile = { ...uploadFile, status: "success" as const, url: blob.url }

        switch (type) {
          case "profile":
            setProfilePhotoFiles([successfulFile])
            updateData({ profilePhoto: blob.url })
            break
          case "cover":
            setCoverPhotoFiles([successfulFile])
            updateData({ coverPhoto: blob.url })
            break
          case "gallery":
            setGalleryFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? successfulFile : f)))
            updateData({
              additionalPhotos: [
                ...(data.additionalPhotos || []),
                { id: blob.pathname, url: blob.url, type: "production" },
              ],
            })
            break
          case "showreel":
            setShowreelFiles([successfulFile])
            updateData({ showreel: { url: blob.url, platform: "upload" } })
            break
        }

        toast({
          title: "Upload successful",
          description: `${uploadFile.file.name} has been uploaded.`,
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        const failedFile = { ...uploadFile, status: "error" as const, error: errorMessage }

        switch (type) {
          case "profile":
            setProfilePhotoFiles([failedFile])
            break
          case "cover":
            setCoverPhotoFiles([failedFile])
            break
          case "gallery":
            setGalleryFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? failedFile : f)))
            break
          case "showreel":
            setShowreelFiles([failedFile])
            break
        }

        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    },
    [data.additionalPhotos, updateData],
  )

  const handleFilesSelected = useCallback(
    async (files: File[], type: "profile" | "cover" | "gallery" | "showreel") => {
      const newUploadFiles: UploadFile[] = files.map((file) => ({
        id: nanoid(),
        file,
        preview: URL.createObjectURL(file),
        status: "uploading" as const,
      }))

      switch (type) {
        case "profile":
          setProfilePhotoFiles(newUploadFiles)
          break
        case "cover":
          setCoverPhotoFiles(newUploadFiles)
          break
        case "gallery":
          setGalleryFiles((prev) => [...prev, ...newUploadFiles])
          break
        case "showreel":
          setShowreelFiles(newUploadFiles)
          break
      }

      for (const uploadFile of newUploadFiles) {
        await performUpload(uploadFile, type)
      }
    },
    [performUpload],
  )

  const handleRemoveFile = (id: string, type: string) => {
    // This function can also be enhanced to send a request to delete the blob from storage
    switch (type) {
      case "profile":
        setProfilePhotoFiles([])
        updateData({ profilePhoto: undefined })
        break
      case "cover":
        setCoverPhotoFiles([])
        updateData({ coverPhoto: undefined })
        break
      case "gallery":
        const fileToRemove = galleryFiles.find((f) => f.id === id)
        setGalleryFiles((prev) => prev.filter((f) => f.id !== id))
        if (fileToRemove?.url) {
          updateData({
            additionalPhotos: data.additionalPhotos?.filter((p) => p.url !== fileToRemove.url),
          })
        }
        break
      case "showreel":
        setShowreelFiles([])
        updateData({ showreel: undefined })
        break
    }
  }

  const handleRetryUpload = (id: string, type: "profile" | "cover" | "gallery" | "showreel") => {
    let fileToRetry: UploadFile | undefined
    switch (type) {
      case "profile":
        fileToRetry = profilePhotoFiles.find((f) => f.id === id)
        break
      case "cover":
        fileToRetry = coverPhotoFiles.find((f) => f.id === id)
        break
      case "gallery":
        fileToRetry = galleryFiles.find((f) => f.id === id)
        break
      case "showreel":
        fileToRetry = showreelFiles.find((f) => f.id === id)
        break
    }

    if (fileToRetry) {
      const uploadingFile = { ...fileToRetry, status: "uploading" as const, error: undefined }
      switch (type) {
        case "profile":
          setProfilePhotoFiles([uploadingFile])
          break
        case "cover":
          setCoverPhotoFiles([uploadingFile])
          break
        case "gallery":
          setGalleryFiles((prev) => prev.map((f) => (f.id === id ? uploadingFile : f)))
          break
        case "showreel":
          setShowreelFiles([uploadingFile])
          break
      }
      performUpload(uploadingFile, type)
    }
  }

  const handleAddPortfolioLink = () => {
    if (newPortfolioLink.platform && newPortfolioLink.url) {
      const links = data.portfolioLinks || []
      updateData({ portfolioLinks: [...links, newPortfolioLink] })
      setNewPortfolioLink({ platform: "", url: "" })
      toast({
        title: "Portfolio link added",
      })
    }
  }

  const handleRemovePortfolioLink = (index: number) => {
    const links = data.portfolioLinks || []
    updateData({ portfolioLinks: links.filter((_, i) => i !== index) })
    toast({
      title: "Portfolio link removed",
    })
  }

  const handleCropImage = async (croppedImage: string) => {
    if (!cropImageInfo) return

    setCropImageInfo(null) // Close modal immediately

    toast({ title: "Cropping...", description: "Uploading your new image." })

    try {
      const response = await fetch(croppedImage)
      const blob = await response.blob()
      const file = new File([blob], `cropped-${cropImageInfo.type}-${nanoid()}.png`, { type: "image/png" })

      const uploadResponse = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload cropped image")
      }

      const newBlob = (await uploadResponse.json()) as PutBlobResult
      const successfulFile: UploadFile = {
        id: newBlob.pathname,
        file,
        preview: newBlob.url,
        status: "success",
        url: newBlob.url,
      }

      if (cropImageInfo.type === "profile") {
        updateData({ profilePhoto: newBlob.url })
        setProfilePhotoFiles([successfulFile])
      } else if (cropImageInfo.type === "cover") {
        updateData({ coverPhoto: newBlob.url })
        setCoverPhotoFiles([successfulFile])
      }

      toast({
        title: "Image Cropped & Uploaded",
        description: "Your profile has been updated.",
      })
    } catch (error) {
      toast({
        title: "Crop Failed",
        description: "Could not upload the cropped image.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile & Cover Photos */}
      <Card className="bg-[#282828] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle>Profile Photos</CardTitle>
          <CardDescription>Upload your headshot and cover photo. Good photos get more attention.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Profile Photo (Headshot) *</Label>
                {profilePhotoFiles.length > 0 && profilePhotoFiles[0].status === "success" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCropImageInfo({ image: profilePhotoFiles[0].preview, type: "profile" })}
                    className="h-7 text-xs"
                  >
                    <Crop className="w-3 h-3 mr-1" />
                    Crop
                  </Button>
                )}
              </div>

              {profilePhotoFiles.length === 0 ? (
                <DragDropUpload
                  onFilesSelected={(files) => handleFilesSelected(files, "profile")}
                  acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                  maxFiles={1}
                  maxSize={5} // 5MB
                  className="aspect-square"
                >
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-300 font-semibold">Click or drag to upload</p>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px, up to 5MB</p>
                  </div>
                </DragDropUpload>
              ) : (
                <MediaUploadPreview
                  files={profilePhotoFiles}
                  onRemove={(id) => handleRemoveFile(id, "profile")}
                  onRetry={(id) => handleRetryUpload(id, "profile")}
                />
              )}
            </div>

            {/* Cover Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Cover Photo</Label>
                {coverPhotoFiles.length > 0 && coverPhotoFiles[0].status === "success" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCropImageInfo({ image: coverPhotoFiles[0].preview, type: "cover" })}
                    className="h-7 text-xs"
                  >
                    <Crop className="w-3 h-3 mr-1" />
                    Crop
                  </Button>
                )}
              </div>

              {coverPhotoFiles.length === 0 ? (
                <DragDropUpload
                  onFilesSelected={(files) => handleFilesSelected(files, "cover")}
                  acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                  maxFiles={1}
                  maxSize={10} // 10MB
                  className="aspect-[3/1]"
                >
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-300 font-semibold">Click or drag to upload</p>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 1200x400px, up to 10MB</p>
                  </div>
                </DragDropUpload>
              ) : (
                <MediaUploadPreview
                  files={coverPhotoFiles}
                  onRemove={(id) => handleRemoveFile(id, "cover")}
                  onRetry={(id) => handleRetryUpload(id, "cover")}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Photos Gallery */}
      <Card className="bg-[#282828] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
          <CardDescription>Add up to 20 photos showcasing your work and range.</CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropUpload
            onFilesSelected={(files) => handleFilesSelected(files, "gallery")}
            acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
            maxFiles={20 - galleryFiles.length}
            maxSize={10}
            className="min-h-[150px]"
            disabled={galleryFiles.length >= 20}
          />

          {galleryFiles.length > 0 && (
            <div className="mt-6">
              <MediaUploadPreview
                files={galleryFiles}
                onRemove={(id) => handleRemoveFile(id, "gallery")}
                onRetry={(id) => handleRetryUpload(id, "gallery")}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Showreel/Demo Reel */}
      <Card className="bg-[#282828] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle>Showreel / Demo Reel</CardTitle>
          <CardDescription>Upload or link to your professional reel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Upload Video</Label>
              {showreelFiles.length === 0 ? (
                <DragDropUpload
                  onFilesSelected={(files) => handleFilesSelected(files, "showreel")}
                  acceptedTypes={["video/mp4", "video/quicktime"]}
                  maxFiles={1}
                  maxSize={500} // 500MB
                  className="h-32"
                >
                  <div className="flex items-center gap-3 p-4">
                    <Film className="w-8 h-8 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-300 font-semibold">Click or drag video</p>
                      <p className="text-xs text-gray-500">MP4, MOV up to 500MB</p>
                    </div>
                  </div>
                </DragDropUpload>
              ) : (
                <MediaUploadPreview
                  files={showreelFiles}
                  onRemove={(id) => handleRemoveFile(id, "showreel")}
                  onRetry={(id) => handleRetryUpload(id, "showreel")}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Or paste video link</Label>
              <Input
                placeholder="YouTube or Vimeo URL"
                value={data.showreel?.url || ""}
                onChange={(e) =>
                  updateData({
                    showreel: { ...data.showreel!, url: e.target.value, platform: "youtube" },
                  })
                }
                className="bg-[#1A1A1A] border-[#3A3A3A]"
                disabled={showreelFiles.length > 0}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Links */}
      <Card className="bg-[#282828] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle>Portfolio Links</CardTitle>
          <CardDescription>Add links to your professional profiles (e.g., IMDb, personal website).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Platform (e.g., IMDb)"
              value={newPortfolioLink.platform}
              onChange={(e) => setNewPortfolioLink({ ...newPortfolioLink, platform: e.target.value })}
              className="bg-[#1A1A1A] border-[#3A3A3A]"
            />
            <Input
              placeholder="URL"
              value={newPortfolioLink.url}
              onChange={(e) => setNewPortfolioLink({ ...newPortfolioLink, url: e.target.value })}
              className="bg-[#1A1A1A] border-[#3A3A3A]"
            />
            <Button
              type="button"
              onClick={handleAddPortfolioLink}
              size="sm"
              className="bg-[#00BFFF] hover:bg-[#0099CC] text-black flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {data.portfolioLinks && data.portfolioLinks.length > 0 && (
            <div className="space-y-2 pt-4">
              {data.portfolioLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-lg">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Link className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{link.platform}</p>
                      <p className="text-xs text-gray-400 truncate">{link.url}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePortfolioLink(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Crop Tool */}
      {cropImageInfo && (
        <ImageCropTool
          image={cropImageInfo.image}
          aspectRatio={cropImageInfo.type === "profile" ? 1 : 16 / 6}
          onCrop={handleCropImage}
          onCancel={() => setCropImageInfo(null)}
          open={!!cropImageInfo}
        />
      )}
    </div>
  )
}
