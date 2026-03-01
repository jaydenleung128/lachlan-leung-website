'use client'

import { motion } from 'framer-motion'
import { HeartIcon } from '@/components/ui/HeartIcon'
import { useParticleBurst } from '@/hooks/useParticleBurst'

export function ScrollCue() {
  const { particles, burst } = useParticleBurst({
    count: 10,
    dxRange: 220,
    dyMin: 110,
    dyRange: 90,
    sizeMin: 14,
    sizeRange: 18,
    durationMin: 900,
    durationRange: 500,
    cleanupDelay: 1500,
  })

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: p.x,
            top: p.y,
            pointerEvents: 'none',
            zIndex: 9999,
            animation: `heartFloatHero ${p.duration}ms ease-out forwards`,
            ['--dx' as string]: `${p.dx}px`,
            ['--dy' as string]: `${p.dy}px`,
          }}
        >
          <HeartIcon width={p.size} height={Math.round(p.size * 26 / 28)} />
        </div>
      ))}

      <button
        onClick={burst}
        aria-label="Send hearts"
        className="cursor-pointer border-0 bg-transparent p-0 flex justify-center mt-12"
        style={{ lineHeight: 0 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: [0.43, 0.13, 0.23, 0.96] }}
          aria-hidden="true"
        >
          <HeartIcon style={{ filter: 'drop-shadow(0 2px 4px rgba(212,160,160,0.4))' }} />
        </motion.div>
      </button>
    </>
  )
}
