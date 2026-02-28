'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const GiscusWidget = dynamic(
  () => import('@/components/ui/GiscusWidget').then(m => m.GiscusWidget),
  { ssr: false }
)

export function QuietZoneSection() {
  return (
    <section id="quiet-zone" className="bg-dark-bg py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <p className="font-sans text-gold/60 text-xs tracking-widest uppercase mb-6">
              A quiet place
            </p>
            <h2 className="font-serif text-4xl text-cream mb-4">Leave a Message</h2>
            <p className="font-sans text-cream/40 text-sm max-w-md mx-auto leading-relaxed">
              Share a memory, a thought, or simply let the family know you were here.
              Your words will remain.
            </p>
          </motion.div>

          {/* Decorative separator */}
          <div className="flex items-center gap-4 mt-12 mb-12">
            <div className="flex-1 h-px bg-gold/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <div className="flex-1 h-px bg-gold/20" />
          </div>
        </div>

        <GiscusWidget />
      </div>
    </section>
  )
}
