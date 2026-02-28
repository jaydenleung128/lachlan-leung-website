'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'player', label: 'Player' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'tributes', label: 'Tributes' },
  { id: 'quiet-zone', label: 'Quiet Zone' },
]

export function NavDots() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { threshold: 0.5 }
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
    <nav
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          aria-label={`Scroll to ${label}`}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeId === id
              ? 'bg-gold scale-125'
              : 'bg-cream/40 hover:bg-cream/70'
          }`}
        />
      ))}
    </nav>
  )
}
