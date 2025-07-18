import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { customAlphabet } from "nanoid"

// Generate a random string for file names to ensure uniqueness
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10)

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")

  if (!filename || !request.body) {
    return NextResponse.json({ error: "No filename or file body provided." }, { status: 400 })
  }

  // Sanitize filename to remove special characters
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "")

  // Add a random suffix to the filename to prevent overwrites and improve security
  const fileExtension = sanitizedFilename.split(".").pop()
  const baseName = sanitizedFilename.replace(`.${fileExtension}`, "")
  const uniqueFilename = `${baseName}-${nanoid()}.${fileExtension}`

  try {
    const blob = await put(uniqueFilename, request.body, {
      access: "public",
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: `Failed to upload file: ${errorMessage}` }, { status: 500 })
  }
}
