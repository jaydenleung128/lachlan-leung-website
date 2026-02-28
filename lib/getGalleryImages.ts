import fs from 'fs'
import path from 'path'

const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

export function getGalleryImages(): string[] {
  const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')

  if (!fs.existsSync(galleryDir)) return []

  return fs
    .readdirSync(galleryDir)
    .filter(filename => VALID_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .map(filename => `/images/gallery/${filename}`)
}
