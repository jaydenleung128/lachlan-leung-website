'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { GalleryImage } from '@/lib/getGalleryData'

interface GallerySectionProps {
  images: GalleryImage[]
}

const rotations = ['-2deg', '1.2deg', '-1deg', '2.2deg', '-1.5deg', '0.8deg', '-2.5deg', '1.8deg']

const photoVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay:    i * 0.06,
      duration: 0.65,
      ease:     [0.43, 0.13, 0.23, 0.96],
    },
  }),
}

export function GallerySection({ images }: GallerySectionProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <SectionWrapper id="gallery" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#faf6f0' }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            moments captured
          </p>
          <h2
            className="font-serif italic leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            Gallery
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
          />
        </div>

        {images.length === 0 ? (
          <div
            className="text-center py-24 rounded-2xl"
            style={{
              border:     '2px dashed rgba(212,160,160,0.35)',
              background: 'rgba(212,160,160,0.04)',
            }}
          >
            <p className="font-serif italic text-2xl mb-2" style={{ color: '#d4a0a0' }}>
              Photos coming soon
            </p>
            <p className="font-sans text-sm" style={{ color: '#7a6558' }}>
              Add images to <code>public/images/gallery/</code> to display them here.
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-6 space-y-6">
            {images.map((image, i) => {
              const rotation = rotations[i % rotations.length]

              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={photoVariants}
                  whileHover={{
                    scale:    1.04,
                    rotate:   0,
                    zIndex:   10,
                    boxShadow: '0 12px 40px rgba(74,55,40,0.22)',
                    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
                  }}
                  onClick={() => setSelected(image)}
                  className="break-inside-avoid cursor-pointer"
                  style={{
                    rotate:     rotation,
                    background: '#fff',
                    padding:    '8px 8px 28px',
                    boxShadow:  '0 4px 20px rgba(74,55,40,0.12)',
                    borderRadius: 4,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.description ?? `Gallery photo ${i + 1}`}
                    className="w-full h-auto object-cover"
                    style={{ borderRadius: 2, display: 'block' }}
                    loading="lazy"
                  />
                  {image.description ? (
                    <p
                      className="mt-2 text-center font-serif italic truncate px-1"
                      style={{ fontSize: 11, color: '#9b7b6a', lineHeight: 1.3 }}
                    >
                      {image.description}
                    </p>
                  ) : (
                    <div className="mt-2" style={{ height: 14 }} />
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(30, 20, 14, 0.85)', backdropFilter: 'blur(6px)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 font-sans text-sm z-10"
              style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em' }}
            >
              ✕ close
            </button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              onClick={e => e.stopPropagation()}
              className="flex flex-col"
              style={{
                background:   '#fff',
                padding:      '10px 10px 20px',
                boxShadow:    '0 32px 80px rgba(30,20,14,0.45)',
                borderRadius: 4,
                width:        'min(90vw, 640px)',
                maxHeight:    '85dvh',
              }}
            >
              <img
                src={selected.src}
                alt={selected.description ?? 'Gallery photo'}
                style={{
                  display:   'block',
                  width:     '100%',
                  height:    'auto',
                  maxHeight: selected.description ? 'calc(85dvh - 64px)' : 'calc(85dvh - 30px)',
                  objectFit: 'contain',
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              {selected.description && (
                <p
                  className="mt-3 text-center font-serif italic px-2"
                  style={{ fontSize: 13, color: '#9b7b6a', lineHeight: 1.4, flexShrink: 0 }}
                >
                  {selected.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
