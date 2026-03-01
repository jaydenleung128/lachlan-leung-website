'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ScrollCue } from '@/components/ui/ScrollCue'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  radius: number; alpha: number; color: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, delay, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
}

const breathe: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    },
  },
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0, vx: 0, vy: 0, prevX: 0, prevY: 0 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 30 : 50
    const colors = [
      'rgba(212,160,160,0.7)', 'rgba(212,160,160,0.5)',
      'rgba(138,170,138,0.6)', 'rgba(138,170,138,0.4)',
      'rgba(212,160,160,0.3)',
    ]

    const setup = () => {
      const dpr  = window.devicePixelRatio || 1
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }
    setup()

    const init = () => {
      const rect = canvas.getBoundingClientRect()
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 1,
        alpha:  Math.random() * 0.5 + 0.2,
        color:  colors[Math.floor(Math.random() * colors.length)],
      }))
    }
    init()

    const ro = new ResizeObserver(() => { setup(); init() })
    ro.observe(canvas.parentElement!)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const m = mouseRef.current
      m.prevX = m.x; m.prevY = m.y
      m.x = e.clientX - rect.left
      m.y = e.clientY - rect.top
      m.vx = m.x - m.prevX; m.vy = m.y - m.prevY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      const rect  = canvas.getBoundingClientRect()
      const mouse = mouseRef.current
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2)
      ctx.clearRect(0, 0, rect.width, rect.height)

      particlesRef.current.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && speed > 1) {
          const force = (80 - dist) / 80 * speed * 0.05
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }
        p.vx *= 0.97; p.vy *= 0.97
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
        p.x  += p.vx;  p.y  += p.vy
        if (p.x < 0) p.x = rect.width
        if (p.x > rect.width)  p.x = 0
        if (p.y < 0) p.y = rect.height
        if (p.y > rect.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle   = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      mouse.vx *= 0.85; mouse.vy *= 0.85
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#f5efe6' }}
    >
      {/* Hero image — warm sepia, low opacity */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity:  0.18,
          filter:   'sepia(0.35) brightness(0.82)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Warm radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(74,55,40,0.22) 70%, rgba(74,55,40,0.55) 100%)',
        }}
      />

      {/* Soft edge darkening for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,239,230,0.1) 0%, rgba(245,239,230,0.0) 40%, rgba(245,239,230,0.25) 100%)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">

        {/* Label */}
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-sans text-sm tracking-widest mb-8 italic"
          style={{ color: '#8aaa8a', letterSpacing: '0.18em' }}
        >
          in loving memory
        </motion.p>

        {/* First name — large handwritten-feel display */}
        <motion.div
          variants={breathe}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            custom={0.5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-serif italic leading-none mb-1 select-none"
            style={{
              fontSize:   'clamp(5rem, 16vw, 11rem)',
              color:      '#4a3728',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Lachlan
          </motion.h1>
        </motion.div>

        {/* Last name — smaller, spaced */}
        <motion.p
          custom={0.65}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-serif tracking-widest uppercase mb-6"
          style={{
            fontSize:      'clamp(1.2rem, 3.5vw, 2rem)',
            color:         '#7a6558',
            letterSpacing: '0.3em',
          }}
        >
          Leung
        </motion.p>

        {/* Dates */}
        <motion.p
          custom={0.82}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-sans text-sm mb-10"
          style={{ color: '#d4a0a0', letterSpacing: '0.08em' }}
        >
          19 October 2008 &ndash; 7 January 2026
        </motion.p>

        {/* Quote */}
        <motion.div
          custom={1.05}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col items-center gap-2"
        >
          <p
            className="font-serif italic"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#4a3728' }}
          >
            &ldquo;Relax.&rdquo;
          </p>
          <span
            className="font-sans text-xs tracking-widest uppercase"
            style={{ color: '#8aaa8a', letterSpacing: '0.18em' }}
          >
            — Lachlan
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        custom={1.25}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative z-10 mt-4"
      >
        <ScrollCue />
      </motion.div>

      {/* Subtle grain texture overlay for analog feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize:   '256px 256px',
        }}
      />
    </section>
  )
}
