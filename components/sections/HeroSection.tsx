'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ScrollCue } from '@/components/ui/ScrollCue'

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
      <div className="relative z-10 mt-4">
        <ScrollCue />
      </div>

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
