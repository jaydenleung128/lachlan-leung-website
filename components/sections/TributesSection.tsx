'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
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

interface TributesSectionProps {
  tributes: TributePost[]
}

const SWIPE_THRESHOLD = 50
const GAP = 16

export function TributesSection({ tributes }: TributesSectionProps) {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const dragging = useRef(false)
  const directionLocked = useRef<'horizontal' | 'vertical' | null>(null)
  const baseOffset = useRef(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const getCardOffset = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (!card) return 0
    return -(card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2)
  }, [])

  const setTrackTransform = useCallback((x: number, animate: boolean) => {
    const track = trackRef.current
    if (!track) return
    track.style.transition = animate ? 'transform 0.4s ease-out' : 'none'
    track.style.transform = `translateX(${x}px)`
  }, [])

  const selectCard = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(tributes.length - 1, index))
    // Lock wrapper height to prevent page jump when switching to a shorter card
    const wrapper = wrapperRef.current
    if (wrapper) {
      wrapper.style.minHeight = `${wrapper.offsetHeight}px`
      // Release after transition completes
      setTimeout(() => { wrapper.style.minHeight = '' }, 450)
    }
    setCurrent(clamped)
    setTrackTransform(getCardOffset(clamped), true)
    // Scroll page so the top of the carousel is visible
    wrapper?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [tributes.length, getCardOffset, setTrackTransform])

  // Centre on mount and resize
  useEffect(() => {
    setTrackTransform(getCardOffset(current), false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onResize = () => setTrackTransform(getCardOffset(current), false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [current, getCardOffset, setTrackTransform])

  if (tributes.length === 0) {
    return (
      <SectionWrapper id="tributes" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#faf6f0' }}>
        <p className="font-sans text-center py-16 italic" style={{ color: '#b09080' }}>
          Tributes will appear here soon.
        </p>
      </SectionWrapper>
    )
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
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        {tributes.map((_, i) => (
          <button
            key={i}
            onClick={() => selectCard(i)}
            aria-label={`Tribute ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? '#d4a0a0' : 'rgba(212,160,160,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Horizontal carousel — transform-based, no scroll-snap */}
      <div
        ref={wrapperRef}
        style={{ overflow: 'hidden', paddingTop: 8, paddingBottom: 32 }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
          touchStartY.current = e.touches[0].clientY
          baseOffset.current = getCardOffset(current)
          dragging.current = false
          directionLocked.current = null
        }}
        onTouchMove={(e) => {
          const dx = e.touches[0].clientX - touchStartX.current
          const dy = e.touches[0].clientY - touchStartY.current

          // Lock direction on first significant movement
          if (!directionLocked.current) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
            directionLocked.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
            if (directionLocked.current === 'horizontal') dragging.current = true
          }

          if (directionLocked.current !== 'horizontal') return
          e.preventDefault()
          setTrackTransform(baseOffset.current + dx, false)
        }}
        onTouchEnd={(e) => {
          if (!dragging.current) return
          dragging.current = false
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(delta) > SWIPE_THRESHOLD) {
            selectCard(delta > 0 ? current - 1 : current + 1)
          } else {
            setTrackTransform(getCardOffset(current), true)
          }
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: GAP,
          }}
        >
          {tributes.map((tribute, i) => {
            const accent  = relationshipAccents[tribute.frontmatter.relationship] ?? '#d4a0a0'
            const closing = closings[tribute.frontmatter.relationship] ?? 'With love,'
            const isActive = i === current

            return (
              <div
                key={tribute.slug}
                ref={el => { cardRefs.current[i] = el }}
                onClick={() => selectCard(i)}
                style={{
                  flex: '0 0 auto',
                  width: 'min(92vw, 780px)',
                  ...(isActive ? {} : { maxHeight: 780 }),
                  position: 'relative',
                  cursor: isActive ? 'default' : 'pointer',
                  opacity: isActive ? 1 : 0.55,
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#faf6f0',
                  boxShadow: isActive
                    ? '0 2px 8px rgba(74,55,40,0.07), 0 12px 36px rgba(74,55,40,0.13), 0 1px 0 rgba(255,255,255,0.9) inset'
                    : '0 1px 4px rgba(74,55,40,0.05), 0 4px 14px rgba(74,55,40,0.07)',
                  border: '1px solid rgba(212,160,160,0.18)',
                }}
              >
              {/* Relationship colour accent */}
              <div style={{ height: 4, background: accent }} />

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

                <div style={{ height: 1, background: 'rgba(212,160,160,0.22)', marginBottom: 20 }} />

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
                    paddingBottom: 28,
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

              {/* Fade gradient — only on inactive cards that overflow the maxHeight */}
              {!isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    background: 'linear-gradient(to bottom, transparent, #faf6f0)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          )
          })}
        </div>
      </div>

    </SectionWrapper>
  )
}
