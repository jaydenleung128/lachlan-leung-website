'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { TributePost } from '@/types'

const relationshipAccents: Record<string, string> = {
  Family:   '#d4a0a0',
  Mum:      '#d4a0a0',
  Dad:      '#d4a0a0',
  Brother:  '#a0b4d4',
  Teammate: '#8aaa8a',
  Coach:    '#c4a882',
  Friend:   '#a0b4d4',
}

const closings: Record<string, string> = {
  Mum:      'With all my love,',
  Dad:      'With all my love,',
  Brother:  'With love,',
  Family:   'With love,',
  Friend:   'Fondly,',
  Teammate: 'In memory,',
  Coach:    'In memory,',
}

const DRAG_THRESHOLD = 50

interface TributesSectionProps {
  tributes: TributePost[]
}

export function TributesSection({ tributes }: TributesSectionProps) {
  const [[current, direction], setCurrent] = useState([0, 0])

  if (tributes.length === 0) {
    return (
      <SectionWrapper id="tributes" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#faf6f0' }}>
        <p className="font-sans text-center py-16 italic" style={{ color: '#b09080' }}>
          Tributes will appear here soon.
        </p>
      </SectionWrapper>
    )
  }

  const paginate = (newDir: number) => {
    const next = current + newDir
    if (next < 0 || next >= tributes.length) return
    setCurrent([next, newDir])
  }

  const tribute = tributes[current]
  const accent  = relationshipAccents[tribute.frontmatter.relationship] ?? '#d4a0a0'
  const closing = closings[tribute.frontmatter.relationship] ?? 'With love,'

  const variants = {
    enter:  (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <SectionWrapper id="tributes" className="py-14 md:py-24" style={{ background: '#faf6f0' }}>
      <div className="max-w-2xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            words from those who loved him
          </p>
          <h2
            className="font-serif italic leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            Tributes
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
          />
        </div>

        {/* Letter */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={tribute.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -DRAG_THRESHOLD) paginate(1)
                else if (info.offset.x > DRAG_THRESHOLD) paginate(-1)
              }}
              style={{
                cursor: 'grab',
                borderRadius: 16,
                background: '#faf6f0',
                boxShadow: '0 2px 8px rgba(74,55,40,0.07), 0 12px 36px rgba(74,55,40,0.11), 0 1px 0 rgba(255,255,255,0.9) inset',
                border: '1px solid rgba(212,160,160,0.18)',
              }}
            >
              {/* Relationship colour accent */}
              <div style={{ height: 3, background: accent, borderRadius: '16px 16px 0 0' }} />

              <div className="px-6 py-7 md:px-10 md:py-9">

                {/* Date — top right */}
                <div style={{ textAlign: 'right', marginBottom: 20 }}>
                  <time
                    className="font-sans"
                    style={{ fontSize: '0.7rem', color: '#b09080', letterSpacing: '0.07em' }}
                  >
                    {new Date(tribute.frontmatter.date).toLocaleDateString('en-AU', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                </div>

                {/* Salutation */}
                <h3
                  className="font-serif italic leading-snug"
                  style={{ fontSize: 'clamp(1.25rem, 4vw, 1.65rem)', color: '#4a3728', marginBottom: 18 }}
                >
                  {tribute.frontmatter.title}
                </h3>

                <div
                  style={{ height: 1, background: 'rgba(212,160,160,0.22)', marginBottom: 20 }}
                />

                {/* Body */}
                <div
                  className="font-sans"
                  style={{ fontSize: '0.9rem', lineHeight: 1.85, color: '#7a6558' }}
                >
                  {tribute.content}
                </div>

                {/* Signature */}
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 20,
                    borderTop: '1px solid rgba(212,160,160,0.22)',
                  }}
                >
                  <p
                    className="font-serif italic"
                    style={{ fontSize: '0.82rem', color: '#b09080', marginBottom: 5 }}
                  >
                    {closing}
                  </p>
                  <p
                    className="font-serif italic"
                    style={{ fontSize: '1.1rem', color: '#4a3728', marginBottom: 3 }}
                  >
                    {tribute.frontmatter.author}
                  </p>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.68rem',
                      color: accent,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tribute.frontmatter.relationship}
                  </p>
                </div>

              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginTop: 24,
          }}
        >
          {/* Prev */}
          <button
            onClick={() => paginate(-1)}
            disabled={current === 0}
            aria-label="Previous tribute"
            style={{
              width: 34, height: 34,
              borderRadius: '50%',
              border: '1px solid rgba(212,160,160,0.35)',
              background: 'transparent',
              color: current === 0 ? 'rgba(176,144,128,0.25)' : '#7a6558',
              cursor: current === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
              transition: 'color 0.2s',
              flexShrink: 0,
            }}
          >
            ←
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {tributes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                aria-label={`Tribute ${i + 1}`}
                style={{
                  width: i === current ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: i === current ? '#d4a0a0' : 'rgba(212,160,160,0.28)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => paginate(1)}
            disabled={current === tributes.length - 1}
            aria-label="Next tribute"
            style={{
              width: 34, height: 34,
              borderRadius: '50%',
              border: '1px solid rgba(212,160,160,0.35)',
              background: 'transparent',
              color: current === tributes.length - 1 ? 'rgba(176,144,128,0.25)' : '#7a6558',
              cursor: current === tributes.length - 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
              transition: 'color 0.2s',
              flexShrink: 0,
            }}
          >
            →
          </button>
        </div>

        {/* Counter */}
        <p
          className="font-sans text-center"
          style={{ marginTop: 10, fontSize: '0.68rem', color: '#b09080', letterSpacing: '0.1em' }}
        >
          {current + 1} of {tributes.length}
        </p>

      </div>
    </SectionWrapper>
  )
}
