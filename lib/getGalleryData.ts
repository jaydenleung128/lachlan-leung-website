import fs from 'fs'
import path from 'path'

const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

export interface GalleryImage {
  src: string
  description?: string
}

interface GalleryEntry {
  filename: string
  description?: string
}

export function getGalleryData(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
  if (!fs.existsSync(galleryDir)) return []

  const allFiles = new Set(
    fs
      .readdirSync(galleryDir)
      .filter(f => VALID_EXTENSIONS.has(path.extname(f).toLowerCase()))
  )

  const dataPath = path.join(process.cwd(), 'data', 'gallery.json')
  const entries: GalleryEntry[] = fs.existsSync(dataPath)
    ? JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    : []

  // Build ordered list from JSON first
  const ordered: GalleryImage[] = []
  const seen = new Set<string>()

  for (const entry of entries) {
    if (allFiles.has(entry.filename)) {
      ordered.push({ src: `/images/gallery/${entry.filename}`, description: entry.description })
      seen.add(entry.filename)
    }
  }

  // Append any files not mentioned in JSON
  for (const filename of allFiles) {
    if (!seen.has(filename)) {
      ordered.push({ src: `/images/gallery/${filename}` })
    }
  }

  return ordered
}
