import { useState, useCallback, useRef, useEffect } from 'react'

export interface BurstParticle {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  size: number
  duration: number
}

export interface BurstConfig {
  count: number
  dxRange: number
  dyMin: number
  dyRange: number
  sizeMin: number
  sizeRange: number
  durationMin: number
  durationRange: number
  cleanupDelay: number
}

let _id = 0
const MAX_PARTICLES = 60

export function useParticleBurst(config: BurstConfig) {
  const { count, dxRange, dyMin, dyRange, sizeMin, sizeRange, durationMin, durationRange, cleanupDelay } = config
  const [particles, setParticles] = useState<BurstParticle[]>([])
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => { timers.forEach(clearTimeout) }
  }, [])

  const burst = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const newParticles: BurstParticle[] = Array.from({ length: count }, () => ({
      id: _id++,
      x: cx,
      y: cy,
      dx: (Math.random() - 0.5) * dxRange,
      dy: dyMin + Math.random() * dyRange,
      size: sizeMin + Math.random() * sizeRange,
      duration: durationMin + Math.random() * durationRange,
    }))

    setParticles(prev => {
      const next = [...prev, ...newParticles]
      return next.length > MAX_PARTICLES ? next.slice(-MAX_PARTICLES) : next
    })

    const ids = new Set(newParticles.map(p => p.id))
    const timer = window.setTimeout(() => {
      setParticles(prev => prev.filter(p => !ids.has(p.id)))
      timersRef.current = timersRef.current.filter(t => t !== timer)
    }, cleanupDelay)
    timersRef.current.push(timer)
  }, [count, dxRange, dyMin, dyRange, sizeMin, sizeRange, durationMin, durationRange, cleanupDelay])

  return { particles, burst }
}
