'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const GiscusWidget = dynamic(
  () => import('@/components/ui/GiscusWidget').then(m => m.GiscusWidget),
  { ssr: false }
)

export function QuietZoneSection() {
  return (
    <section id="quiet-zone" className="py-14 md:py-24 px-4 md:px-6 pb-24 md:pb-24" style={{ background: '#faf6f0' }}>
      <div className="max-w-3xl mx-auto">

        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-14"
        >
          <p
            className="font-sans text-xs tracking-widest uppercase mb-4 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            a quiet place
          </p>

          <h2
            className="font-serif italic leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            Leave a Message
          </h2>

          <p
            className="font-sans text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: '#7a6558' }}
          >
            Share a memory, a thought, or simply let the family know you were here.
            Your words will remain.
          </p>

          {/* Decorative sage separator */}
          <div className="flex items-center gap-4 mt-10 mb-0">
            <div className="flex-1 h-px" style={{ background: 'rgba(138,170,138,0.3)' }} />
            <span style={{ color: '#8aaa8a', fontSize: 18 }}>❧</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(138,170,138,0.3)' }} />
          </div>
        </motion.div>

        {/* Sage leaf decorations — subtle organic shapes */}
        <div className="relative">
          {/* Decorative corner leaf hint */}
          <div
            className="absolute -top-6 -left-8 pointer-events-none select-none opacity-20"
            style={{ fontSize: 56, color: '#8aaa8a', transform: 'rotate(-20deg)' }}
            aria-hidden="true"
          >
            ❧
          </div>
          <div
            className="absolute -bottom-6 -right-8 pointer-events-none select-none opacity-15"
            style={{ fontSize: 48, color: '#8aaa8a', transform: 'rotate(140deg)' }}
            aria-hidden="true"
          >
            ❧
          </div>

          {/* Giscus widget container */}
          <div
            className="relative rounded-2xl overflow-hidden p-1"
            style={{
              background: 'rgba(138,170,138,0.06)',
              border:     '1px solid rgba(138,170,138,0.2)',
              boxShadow:  '0 4px 24px rgba(74,55,40,0.07)',
            }}
          >
            <GiscusWidget />
          </div>
        </div>

      </div>
    </section>
  )
}
