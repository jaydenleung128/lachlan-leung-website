'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',       label: 'I',   name: 'Home' },
  { id: 'about',      label: 'II',  name: 'About' },
  { id: 'player',     label: 'III', name: 'Player' },
  { id: 'gallery',    label: 'IV',  name: 'Gallery' },
  { id: 'tributes',   label: 'V',   name: 'Tributes' },
  { id: 'quiet-zone', label: 'VI',  name: 'Quiet Zone' },
]

export function NavDots() {
  const [activeId, setActiveId] = useState('hero')
  const [visible, setVisible]   = useState(false)

  // Fade in after 2s so it doesn't crowd the hero entrance
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      // Trigger when section crosses the middle 30% of the viewport
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop: right-side roman numeral nav ── */}
      <motion.nav
        className="hidden md:flex fixed right-7 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-4"
        aria-label="Section navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {SECTIONS.map(({ id, label, name }) => {
          const isActive = activeId === id
          return (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to ${name}`}
              title={name}
              animate={{ x: isActive ? -6 : 0 }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              {/* Section name — on hover */}
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-right"
                style={{
                  fontFamily:    'var(--font-nunito), system-ui, sans-serif',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         isActive ? '#c47a7a' : 'rgba(74,55,40,0.45)',
                }}
              >
                {name}
              </span>
              {/* Active bar */}
              <motion.span
                animate={{ height: isActive ? 20 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="block w-px shrink-0"
                style={{ backgroundColor: '#d4a0a0' }}
              />
              {/* Roman numeral */}
              <span
                className="leading-none transition-all duration-500"
                style={{
                  fontFamily:    'var(--font-lora), Georgia, serif',
                  fontSize:      isActive ? '0.95rem' : '0.78rem',
                  fontWeight:    isActive ? 600 : 400,
                  color:         isActive ? '#c47a7a' : 'rgba(74,55,40,0.5)',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </span>
            </motion.button>
          )
        })}
      </motion.nav>

      {/* ── Mobile: bottom pill nav ── */}
      <motion.nav
        className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2.5 rounded-full backdrop-blur-md"
        style={{
          background: 'rgba(74,55,40,0.82)',
          boxShadow:  '0 4px 20px rgba(74,55,40,0.3), 0 1px 0 rgba(255,255,255,0.08) inset',
        }}
        aria-label="Section navigation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        {SECTIONS.map(({ id, label, name }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Scroll to ${name}`}
              className="px-2 py-1 rounded-full transition-all duration-300 cursor-pointer select-none"
              style={{
                background:    isActive ? 'rgba(212,160,160,0.25)' : 'transparent',
                fontFamily:    'var(--font-lora), Georgia, serif',
                fontSize:      '0.7rem',
                fontWeight:    isActive ? 600 : 400,
                color:         isActive ? '#f0d8d8' : 'rgba(250,246,240,0.45)',
                letterSpacing: '0.05em',
                minWidth:      '1.8rem',
                textAlign:     'center',
              }}
            >
              {label}
            </button>
          )
        })}
      </motion.nav>
    </>
  )
}
