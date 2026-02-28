'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ScrollCue } from '@/components/ui/ScrollCue'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy"
    >
      {/* Background image */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-cream px-6 max-w-3xl">
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-sans text-gold text-sm tracking-widest uppercase mb-6"
        >
          In Loving Memory
        </motion.p>

        <motion.h1
          custom={0.5}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-serif text-6xl sm:text-8xl text-cream mb-4 leading-none"
        >
          Lachlan Leung
        </motion.h1>

        <motion.p
          custom={0.8}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-sans text-cream/60 text-lg tracking-wide mb-8"
        >
          2004 – 2024
        </motion.p>

        <motion.p
          custom={1.0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-serif text-xl sm:text-2xl text-cream/80 italic max-w-lg mx-auto"
        >
          &ldquo;He played every point like it mattered, because to him, it did.&rdquo;
        </motion.p>
      </div>

      <div className="relative z-10 text-cream">
        <ScrollCue />
      </div>
    </section>
  )
}
