'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const EASE = [0.43, 0.13, 0.23, 0.96] as const
const VIEWPORT = { once: true, margin: '-80px' } as const

const PHOTOS: { src: string; alt: string }[] = [
  { src: '/images/resting-place-1.webp', alt: "Lachlan Leung's resting place at Rookwood Cemetery, Sydney" },
]

export function FinalRestingPlaceSection() {
  return (
    <SectionWrapper id="resting-place" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#f5efe6' }}>
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            a place of peace
          </p>
          <h2
            className="font-serif italic leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            Final Resting Place
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
          />
          <p
            className="font-sans mt-5 text-sm leading-relaxed"
            style={{ color: '#7a6558' }}
          >
            Lachlan rests at Rookwood Cemetery, Sydney,{' '}
            <br className="hidden sm:inline" />
            near the Saint John Paul II Garden Crypts.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 4px 28px rgba(74,55,40,0.1)',
            marginBottom: PHOTOS.length > 0 ? 32 : 0,
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=-33.881495,151.054036&output=embed&t=k&z=19"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lachlan Leung's resting place — Rookwood Cemetery, Sydney"
          />
        </motion.div>

        {/* Coordinates */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="font-sans text-center mt-3 mb-8"
          style={{ fontSize: '0.72rem', color: '#b09080', letterSpacing: '0.08em' }}
        >
          −33.881495, 151.054036
        </motion.p>

        {/* Photos */}
        {PHOTOS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className={`grid gap-3 ${
              PHOTOS.length === 1
                ? 'grid-cols-1'
                : PHOTOS.length === 3
                ? 'grid-cols-3'
                : 'grid-cols-2'
            }`}
          >
            {PHOTOS.map((photo, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </SectionWrapper>
  )
}
