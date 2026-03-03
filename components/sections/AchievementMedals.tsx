'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { Achievement } from '@/types'

const INITIAL_COUNT = 5

interface AchievementMedalsProps {
  highlights: Achievement[]
}

const MEDAL_COLOR: Record<Achievement['rank'], string> = {
  national: '#D4AF37',
  state:    '#A8A9AD',
  club:     '#8aaa8a',
  other:    '#8aaa8a',
}

const RANK_LABEL: Record<Achievement['rank'], string> = {
  national: 'National',
  state:    'State',
  club:     'Club',
  other:    '',
}

const PILL_BUTTON_STYLE: React.CSSProperties = {
  background:    'none',
  border:        '1px solid rgba(212,160,160,0.45)',
  borderRadius:  '100px',
  padding:       '6px 20px',
  cursor:        'pointer',
  fontFamily:    'sans-serif',
  fontSize:      '0.75rem',
  color:         '#d4a0a0',
  letterSpacing: '0.1em',
}

function AchievementItem({ item, isLast }: { item: Achievement; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const medalColor = MEDAL_COLOR[item.rank]
  const rankLabel  = RANK_LABEL[item.rank]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ paddingTop: 12, paddingBottom: 12 }}
    >
      {/* Top row: medal dot · year pill · rank badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {/* Medal dot */}
        <span
          style={{
            display:       'inline-block',
            width:         8,
            height:        8,
            borderRadius:  '50%',
            background:    medalColor,
            flexShrink:    0,
          }}
        />

        {/* Year pill */}
        <span
          className="font-sans"
          style={{
            fontSize:      '0.6rem',
            color:         'rgba(74,55,40,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            lineHeight:    1,
          }}
        >
          {item.year}
        </span>

        {/* Rank badge — only rendered when there is a label */}
        {rankLabel && (
          <span
            className="font-sans"
            style={{
              fontSize:        '0.6rem',
              color:           medalColor,
              textTransform:   'uppercase',
              letterSpacing:   '0.18em',
              lineHeight:      1,
              padding:         '2px 6px',
              border:          `1px solid ${medalColor}`,
              borderRadius:    '100px',
              opacity:         0.85,
            }}
          >
            {rankLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <p
        className="font-serif text-sm"
        style={{
          fontStyle:  'italic',
          color:      '#4a3728',
          marginTop:  4,
          lineHeight: 1.4,
        }}
      >
        {item.title}
      </p>

      {/* Description */}
      <p
        className="font-serif text-sm"
        style={{
          fontStyle:   'italic',
          color:       'rgba(74,55,40,0.45)',
          marginTop:   2,
          lineHeight:  1.6,
        }}
      >
        {item.description}
      </p>

      {/* Separator — omitted after the last item */}
      {!isLast && (
        <div
          style={{
            marginTop:    12,
            marginBottom: 12,
            height:       1,
            background:   'rgba(212,160,160,0.2)',
          }}
        />
      )}
    </motion.div>
  )
}

export function AchievementMedals({ highlights }: AchievementMedalsProps) {
  const [expanded, setExpanded] = useState(false)
  const scrollAnchorRef = useRef<HTMLDivElement>(null)

  if (highlights.length === 0) return null

  const above = highlights.slice(0, INITIAL_COUNT)
  const below = highlights.slice(INITIAL_COUNT)
  const hiddenCount = below.length

  function handleCollapse() {
    // Scroll the anchor (always rendered, sits right after the initial items) to center first
    const anchor = scrollAnchorRef.current
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Poll until scroll finishes, then collapse
      let lastY = anchor.getBoundingClientRect().top
      let frames = 0
      const check = () => {
        const currentY = anchor.getBoundingClientRect().top
        if (Math.abs(currentY - lastY) < 1 || frames >= 60) {
          setExpanded(false)
        } else {
          lastY = currentY
          frames++
          requestAnimationFrame(check)
        }
      }
      // Give the scroll a frame to start before polling
      requestAnimationFrame(() => requestAnimationFrame(check))
    } else {
      setExpanded(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Left ribbon strip */}
      <div
        style={{
          position:     'absolute',
          left:         0,
          top:          0,
          bottom:       0,
          width:        4,
          background:   'linear-gradient(to bottom, #d4a0a0, rgba(212,160,160,0.2))',
          boxShadow:    'inset -1px 0 0 rgba(255,255,255,0.4)',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Folded-paper ear at top of ribbon */}
      <div
        style={{
          position:   'absolute',
          left:       0,
          top:        0,
          width:      16,
          height:     16,
          background: 'rgba(212,160,160,0.3)',
          clipPath:   'polygon(0 0, 100% 0, 0 100%)',
        }}
      />

      {/* Ribbon end knot (small circle at bottom) */}
      <div
        style={{
          position:     'absolute',
          left:         -2,
          bottom:       0,
          width:        8,
          height:       8,
          borderRadius: '50%',
          background:   '#d4a0a0',
          opacity:      0.6,
        }}
      />

      {/* List content */}
      <div style={{ paddingLeft: 20, paddingTop: 8, paddingBottom: 8 }}>
        {/* Always-visible first 6 items */}
        {above.map((item, i) => (
          <AchievementItem
            key={`${item.year}-${i}`}
            item={item}
            // Show separator on the 6th item only when expanded (connects to item 7)
            isLast={i === INITIAL_COUNT - 1 ? !expanded : false}
          />
        ))}

        {/* Scroll anchor — always rendered so we can scroll here before collapsing */}
        <div ref={scrollAnchorRef} />

        {/* Expandable remainder */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="extra"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {below.map((item, i) => (
                <AchievementItem
                  key={`extra-${item.year}-${i}`}
                  item={item}
                  isLast={i === below.length - 1}
                />
              ))}

              {/* Show less */}
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleCollapse} style={PILL_BUTTON_STYLE}>
                Show less
              </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show more button */}
        {!expanded && hiddenCount > 0 && (
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setExpanded(true)} style={PILL_BUTTON_STYLE}>
              View all {highlights.length} achievements
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
