import { SectionWrapper } from '@/components/ui/SectionWrapper'

interface GallerySectionProps {
  images: string[]
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <SectionWrapper id="gallery" className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl text-navy mb-12 text-center">Gallery</h2>

        {images.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-navy/20 rounded-xl">
            <p className="font-serif text-2xl text-navy/40 mb-2">Photos coming soon</p>
            <p className="font-sans text-sm text-navy/30">
              Add images to <code>public/images/gallery/</code> to display them here.
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-lg overflow-hidden bg-navy/5"
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
