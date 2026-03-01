'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

interface GallerySectionProps {
  images: string[]
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
            {images.map((src, i) => {
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
                    src={src}
                    alt={`Gallery photo ${i + 1}`}
                    className="w-full h-auto object-cover"
                    style={{ borderRadius: 2, display: 'block' }}
                    loading="lazy"
                  />
                  {/* Photo caption tape strip effect at bottom */}
                  <div
                    className="mt-2 text-center"
                    style={{ height: 14 }}
                  />
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
