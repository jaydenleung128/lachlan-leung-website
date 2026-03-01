'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface TimelineEvent {
  id: string
  year: number
  category: 'tournament' | 'holiday' | 'milestone'
  title: string
  location?: string
  body: string
  photos?: string[]
  youtubeId?: string
}

// ─── Data (chronological — oldest first) ──────────────────────────────────────

const EVENTS: TimelineEvent[] = [
  {
    id: 'aus-u11-2018',
    year: 2018,
    category: 'tournament',
    title: 'First National Gold',
    location: 'Australia',
    body: 'Gold medallist in the Under 11 Boys Teams event at the Australian Championships — his very first national gold medal, aged just 9 years old.',
    photos: ['/images/gallery/seoul_library.jpg', '/images/gallery/seoul_deer_park.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
  {
    id: 'nsw-junior-open-2019',
    year: 2019,
    category: 'tournament',
    title: 'NSW Junior Open Gold',
    location: 'New South Wales',
    body: 'Gold medallist in the Under 11 Boys Singles, with a bronze in Mixed Doubles at the NSW Junior Open Championships.',
    photos: ['/images/gallery/seoul_deer_park.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
  {
    id: 'david-coleman-2023',
    year: 2023,
    category: 'milestone',
    title: 'MP Sporting Award',
    location: 'Sydney',
    body: 'Awarded the 2018–2023 David Coleman MP (Banks) Outstanding Sporting Achievement Award — recognising six years of extraordinary table tennis achievements.',
    photos: ['/images/gallery/seoul_library.jpg', '/images/gallery/seoul_deer_park.jpg'],
  },
  {
    id: 'tta-canberra-2024',
    year: 2024,
    category: 'tournament',
    title: 'TTA Canberra Gold',
    location: 'Canberra, ACT',
    body: 'Gold medallist in the Under 17 Boys Singles at the TTA Tour event in Canberra.',
    photos: ['/images/gallery/seoul_library.jpg'],
  },
  {
    id: 'tta-mandurah-2024',
    year: 2024,
    category: 'tournament',
    title: 'TTA Mandurah Gold',
    location: 'Mandurah, WA',
    body: 'Gold medallist in the Under 17 Boys Singles at the TTA Tour event in Mandurah, Western Australia.',
    photos: ['/images/gallery/seoul_deer_park.jpg'],
  },
  {
    id: 'nsw-junior-closed-2024',
    year: 2024,
    category: 'tournament',
    title: 'NSW Junior Closed Gold',
    location: 'New South Wales',
    body: "Gold medallist in the Under 21 Men's Singles at the NSW Junior Closed Championships, plus silver at the NSW Open.",
    photos: ['/images/gallery/seoul_deer_park.jpg', '/images/gallery/seoul_library.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
  {
    id: 'aus-nationals-2024',
    year: 2024,
    category: 'tournament',
    title: 'Australian Nationals Gold',
    location: 'Australia',
    body: 'Gold medallist in the Australian Under 17 Boys Teams event at the national championships.',
    photos: ['/images/gallery/seoul_library.jpg', '/images/gallery/seoul_deer_park.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
  {
    id: 'coaching-2024',
    year: 2024,
    category: 'milestone',
    title: 'Level 1 Coaching',
    location: 'Australia',
    body: 'Achieved Table Tennis Australia Level 1 coaching accreditation — beginning to give back to the sport and younger players who looked up to him.',
    photos: ['/images/gallery/seoul_deer_park.jpg'],
  },
  {
    id: 'diamond-award-2024',
    year: 2024,
    category: 'milestone',
    title: 'Diamond Award',
    location: 'Menai, NSW',
    body: "Recipient of the Diamond Award — Menai High School's highest honour for student achievement. Recognised for excellence in both academics and sport.",
    photos: ['/images/gallery/seoul_library.jpg'],
  },
  {
    id: 'school-shield-2025',
    year: 2025,
    category: 'tournament',
    title: 'NSW Schools Shield Gold',
    location: 'New South Wales',
    body: 'Gold medallist representing Menai High School in the NSW Secondary School Boys Shield Teams event.',
    photos: ['/images/gallery/seoul_deer_park.jpg', '/images/gallery/seoul_library.jpg'],
  },
  {
    id: 'ranked-2025',
    year: 2025,
    category: 'tournament',
    title: 'Career-High Rankings',
    location: 'Australia',
    body: 'Reached his career-high rankings — 5th in Australia in the TTA Under 17 Boys category, and 32nd nationally in Open Men, competing against players of all ages.',
    photos: ['/images/gallery/seoul_library.jpg', '/images/gallery/seoul_deer_park.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
  {
    id: 'korea-2025',
    year: 2025,
    category: 'holiday',
    title: 'Family Trip to Korea',
    location: 'Seoul, South Korea',
    body: 'A cherished trip to South Korea with his family — visiting the Seoul National Library, the Deer Park, and exploring the city he loved. One of his final adventures.',
    photos: ['/images/gallery/seoul_library.jpg', '/images/gallery/seoul_deer_park.jpg'],
    youtubeId: 'DZrig1XNVxA',
  },
]

// ─── Constants ─────────────────────────────────────────────────────────────────

const DOT_ITEM_W = 84   // px width per event column
const TITLE_H    = 52   // px reserved above each dot for its label
const DOT_AREA_H = 28   // px height of dot area (line runs through center)
const RAIL_PAD   = 300  // px padding on each end so edge dots can centre

// ─── Shared Rail ───────────────────────────────────────────────────────────────

interface RailProps {
  selectedId: string
  onSelect: (id: string) => void
  railRef: React.RefObject<HTMLDivElement | null>
  dotRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>
}

function Rail({ selectedId, onSelect, railRef, dotRefs }: RailProps) {
  return (
    <div
      ref={railRef}
      className="overflow-x-auto"
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      <div
        className="relative flex"
        style={{ width: 'max-content', paddingLeft: RAIL_PAD, paddingRight: RAIL_PAD }}
      >
        {/* Connecting line — sits at centre of dot area */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: TITLE_H + DOT_AREA_H / 2,
            left: RAIL_PAD,
            right: RAIL_PAD,
            height: 1,
            background: 'rgba(74,55,40,0.12)',
          }}
        />

        {EVENTS.map(event => {
          const isSelected = event.id === selectedId
          return (
            <button
              key={event.id}
              ref={el => { dotRefs.current[event.id] = el }}
              onClick={() => onSelect(event.id)}
              className="relative flex flex-col items-center shrink-0"
              style={{ width: DOT_ITEM_W, paddingBottom: 12 }}
            >
              {/* Title area */}
              <div
                style={{
                  height: TITLE_H,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: 6,
                }}
              >
                <motion.span
                  animate={{
                    color: isSelected ? '#4a3728' : 'rgba(74,55,40,0.32)',
                    fontWeight: isSelected ? 700 : 400,
                  }}
                  transition={{ duration: 0.18 }}
                  className="font-sans text-center leading-tight"
                  style={{
                    fontSize: '0.57rem',
                    letterSpacing: '0.01em',
                    maxWidth: DOT_ITEM_W - 6,
                    display: 'block',
                  }}
                >
                  {event.title}
                </motion.span>
              </div>

              {/* Dot */}
              <div
                style={{
                  height: DOT_AREA_H,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Outer pulse ring — selected only */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        position: 'absolute',
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        border: '2px solid rgba(74,55,40,0.25)',
                        boxShadow: '0 0 0 4px rgba(74,55,40,0.06)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{
                    width: isSelected ? 22 : 8,
                    height: isSelected ? 22 : 8,
                    backgroundColor: isSelected ? '#4a3728' : 'rgba(74,55,40,0.18)',
                    boxShadow: isSelected ? '0 2px 10px rgba(74,55,40,0.35)' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  style={{ borderRadius: '50%' }}
                />
              </div>

              {/* Year */}
              <motion.span
                animate={{
                  color: isSelected ? '#4a3728' : 'rgba(74,55,40,0.28)',
                  fontWeight: isSelected ? 600 : 400,
                }}
                transition={{ duration: 0.15 }}
                className="font-sans mt-1"
                style={{ fontSize: '0.6rem', letterSpacing: '0.06em' }}
              >
                {event.year}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Shared event content ──────────────────────────────────────────────────────

function EventContent({ event }: { event: TimelineEvent }) {
  return (
    <div className="p-5 md:p-6">
      <p
        className="font-sans uppercase mb-1"
        style={{ fontSize: '0.58rem', color: 'rgba(74,55,40,0.4)', letterSpacing: '0.18em', fontWeight: 600 }}
      >
        {event.year}{event.location ? ` · ${event.location}` : ''}
      </p>
      <h3
        className="font-serif italic leading-tight mb-3"
        style={{ fontSize: 'clamp(1.05rem, 3vw, 1.3rem)', color: '#4a3728' }}
      >
        {event.title}
      </h3>
      <p
        className="font-sans leading-relaxed"
        style={{ color: '#7a6558', fontSize: '0.875rem' }}
      >
        {event.body}
      </p>

      {event.photos && event.photos.length > 0 && (
        <div
          className="flex gap-3 mt-4 overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6 pb-1"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {event.photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="shrink-0 rounded-lg object-cover"
              style={{ height: 140, width: 'auto', maxWidth: 210, boxShadow: '0 4px 14px rgba(74,55,40,0.12)' }}
              loading="lazy"
            />
          ))}
        </div>
      )}

      {event.youtubeId && (
        <div
          className="mt-4 rounded-xl overflow-hidden aspect-video"
          style={{ background: '#e8ddd4' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${event.youtubeId}`}
            title={event.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  )
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function VariantB() {
  const [selectedId, setSelectedId] = useState(EVENTS[EVENTS.length - 1].id)
  const railRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [pointerLeft, setPointerLeft] = useState<number | null>(null)
  const selected = EVENTS.find(e => e.id === selectedId)!
  const selectedIdx = EVENTS.findIndex(e => e.id === selectedId)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    const rail  = railRef.current
    const dot   = dotRefs.current[id]
    if (!rail || !dot) return
    const scrollTarget = Math.max(0, dot.offsetLeft + dot.offsetWidth / 2 - rail.offsetWidth / 2)
    rail.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    setPointerLeft(dot.offsetLeft + dot.offsetWidth / 2 - scrollTarget)
  }

  const wrapperRef      = useRef<HTMLDivElement>(null)
  const isDragging      = useRef(false)
  const hasCapture      = useRef(false)
  const dragStartX      = useRef(0)
  const dragStartScroll = useRef(0)
  const dragDistance    = useRef(0)

  const snapToNearest = () => {
    const rail = railRef.current
    if (!rail) return
    const railCenter = rail.scrollLeft + rail.offsetWidth / 2
    let nearestId   = EVENTS[0].id
    let nearestDist = Infinity
    EVENTS.forEach(ev => {
      const dot = dotRefs.current[ev.id]
      if (!dot) return
      const dist = Math.abs(dot.offsetLeft + dot.offsetWidth / 2 - railCenter)
      if (dist < nearestDist) { nearestDist = dist; nearestId = ev.id }
    })
    handleSelect(nearestId)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current      = true
    hasCapture.current      = false
    dragDistance.current    = 0
    dragStartX.current      = e.clientX
    dragStartScroll.current = railRef.current?.scrollLeft ?? 0
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !railRef.current) return
    const dx = e.clientX - dragStartX.current
    dragDistance.current = Math.abs(dx)
    // Capture only once a real drag begins — keeps click events working on buttons
    if (!hasCapture.current && dragDistance.current > 4) {
      e.currentTarget.setPointerCapture(e.pointerId)
      hasCapture.current = true
      if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing'
    }
    railRef.current.scrollLeft = dragStartScroll.current - dx
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    hasCapture.current = false
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab'
    if (dragDistance.current > 6) snapToNearest()
  }

  const handlePrev = () => { if (selectedIdx > 0) handleSelect(EVENTS[selectedIdx - 1].id) }
  const handleNext = () => { if (selectedIdx < EVENTS.length - 1) handleSelect(EVENTS[selectedIdx + 1].id) }

  useEffect(() => {
    const t = setTimeout(() => handleSelect(selectedId), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); handlePrev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx])

  return (
    <div>
      {/* Rail — gradient fade edges + drag-to-scroll */}
      <div
        ref={wrapperRef}
        style={{
          cursor: 'grab',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:        'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          userSelect: 'none',
        } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Rail selectedId={selectedId} onSelect={handleSelect} railRef={railRef} dotRefs={dotRefs} />
      </div>

      <div className="relative mx-4">
        {/* Triangle caret pointing up to the active dot */}
        {pointerLeft !== null && (
          <motion.div
            animate={{ left: pointerLeft }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            style={{
              position: 'absolute',
              top: 0,
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '9px solid rgba(255,255,255,0.9)',
              zIndex: 2,
              filter: 'drop-shadow(0 -2px 2px rgba(74,55,40,0.07))',
            }}
          />
        )}

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            marginTop: 9,
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(212,160,160,0.2)',
            boxShadow: '0 4px 28px rgba(74,55,40,0.07)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <EventContent event={selected} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function LifeTimeline() {
  return (
    <SectionWrapper id="player" className="py-14 md:py-24" style={{ background: '#f5efe6' }}>
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 px-4">
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            his journey
          </p>
          <h2
            className="font-serif italic leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            A Life in Moments
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
          />
        </div>

        <div className="pb-4">
          <VariantB />
        </div>

      </div>
    </SectionWrapper>
  )
}
