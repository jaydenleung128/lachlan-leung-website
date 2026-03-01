'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { GalleryImage } from '@/lib/getGalleryData'

interface CoverflowGalleryProps {
  images: GalleryImage[]
}

export function CoverflowGallery({ images }: CoverflowGalleryProps) {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const touchStart = useRef<number | null>(null)

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive(i => Math.min(images.length - 1, i + 1)), [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  if (images.length === 0) {
    return (
      <SectionWrapper id="gallery" className="py-14 md:py-24 px-4" style={{ background: '#f5efe6' }}>
        <div className="text-center py-24">
          <p className="font-serif italic text-2xl" style={{ color: '#d4a0a0' }}>Photos coming soon</p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="gallery" className="py-14 md:py-24" style={{ background: '#f5efe6', overflow: 'hidden' }}>
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <p className="font-sans text-xs tracking-widest uppercase mb-3 italic" style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}>moments captured</p>
        <h2 className="font-serif italic leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}>Gallery</h2>
        <div className="mx-auto mt-4 rounded-full" style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }} />
      </div>

      {/* Coverflow */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: '1200px', height: 340 }}
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return
          const delta = touchStart.current - e.changedTouches[0].clientX
          if (delta > 40) next()
          else if (delta < -40) prev()
          touchStart.current = null
        }}
      >
        {images.map((image, i) => {
          const offset = i - active
          const absOffset = Math.abs(offset)
          if (absOffset > 3) return null

          const rotateY = offset * 45
          const translateZ = absOffset === 0 ? 0 : -120
          const scale = absOffset === 0 ? 1 : 0.85
          const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.15
          const zIndex = 10 - absOffset

          return (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                width: 200,
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY,
                z: translateZ,
                scale,
                opacity,
                x: offset * 160,
                zIndex,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={() => {
                if (absOffset === 0) setSelected(image)
                else setActive(i)
              }}
            >
              <div
                style={{
                  background: '#fff',
                  padding: '8px 8px 28px',
                  boxShadow: absOffset === 0
                    ? '0 20px 60px rgba(74,55,40,0.25)'
                    : '0 8px 24px rgba(74,55,40,0.12)',
                  borderRadius: 4,
                }}
              >
                <img
                  src={image.src}
                  alt={image.description ?? `Photo ${i + 1}`}
                  style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 2, display: 'block' }}
                  loading="lazy"
                />
                {image.description && (
                  <p className="mt-2 text-center font-serif italic truncate px-1" style={{ fontSize: 11, color: '#9b7b6a' }}>
                    {image.description}
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mt-8 px-4">
        <button
          onClick={prev}
          disabled={active === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center font-sans transition-all"
          style={{
            background: active === 0 ? 'rgba(212,160,160,0.1)' : 'rgba(212,160,160,0.2)',
            color: active === 0 ? 'rgba(74,55,40,0.2)' : '#4a3728',
            border: '1px solid rgba(212,160,160,0.3)',
          }}
          aria-label="Previous"
        >
          ←
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === active ? 16 : 6,
                height: 6,
                background: i === active ? '#d4a0a0' : 'rgba(212,160,160,0.3)',
              }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={active === images.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center font-sans transition-all"
          style={{
            background: active === images.length - 1 ? 'rgba(212,160,160,0.1)' : 'rgba(212,160,160,0.2)',
            color: active === images.length - 1 ? 'rgba(74,55,40,0.2)' : '#4a3728',
            border: '1px solid rgba(212,160,160,0.3)',
          }}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(30,20,14,0.85)', backdropFilter: 'blur(6px)' }}
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 font-sans text-sm z-10" style={{ color: 'rgba(255,255,255,0.65)' }}>
              ✕ close
            </button>
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', padding: '10px 10px 20px', borderRadius: 4, width: 'min(90vw, 640px)', maxHeight: '85dvh' }}
            >
              <img src={selected.src} alt={selected.description ?? 'Gallery photo'}
                style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 'calc(85dvh - 64px)', objectFit: 'contain', borderRadius: 2 }} />
              {selected.description && (
                <p className="mt-3 text-center font-serif italic px-2" style={{ fontSize: 13, color: '#9b7b6a' }}>{selected.description}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
