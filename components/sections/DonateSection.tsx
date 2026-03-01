'use client'

import { motion } from 'framer-motion'

const EASE = [0.43, 0.13, 0.23, 0.96] as const
const VIEWPORT = { once: true, margin: '-80px' } as const
const HIDDEN = { opacity: 0, y: 22 }
const VISIBLE = { opacity: 1, y: 0 }

export function DonateSection() {
  return (
    <section
      id="donate"
      className="relative overflow-hidden py-28 md:py-40 px-6"
      style={{ background: '#f5efe6' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        <motion.p
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
          className="font-sans text-xs uppercase tracking-widest italic mb-8"
          style={{ color: '#8aaa8a', letterSpacing: '0.22em' }}
        >
          carry his legacy forward
        </motion.p>

        <motion.h2
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.25, ease: EASE }}
          className="font-serif italic leading-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#4a3728', letterSpacing: '-0.01em' }}
        >
          Give in his memory
        </motion.h2>

        <motion.div
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
          className="mx-auto mb-8 rounded-full"
          style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
        />

        <motion.p
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
          className="font-sans leading-relaxed mb-4"
          style={{ color: '#7a6558', fontSize: 'clamp(0.92rem, 2vw, 1.05rem)' }}
        >
          Lachlan&rsquo;s family asks that donations in his memory go to the{' '}
          <span style={{ color: '#4a3728' }}>Children&rsquo;s Cancer Institute</span>{' '}
          in support of the{' '}
          <span className="font-serif italic" style={{ color: '#d4a0a0' }}>ECLIPSE</span>{' '}
          research project.
        </motion.p>

        <motion.p
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.6, ease: EASE }}
          className="font-sans leading-relaxed mb-14"
          style={{ color: 'rgba(122,101,88,0.6)', fontSize: '0.84rem' }}
        >
          A national initiative developing liquid biopsy technology — so that one day,
          no family has to say goodbye too soon.
        </motion.p>

        <motion.div
          initial={HIDDEN} whileInView={VISIBLE} viewport={VIEWPORT}
          transition={{ duration: 1.0, delay: 0.75, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://www.gofundme.com/f/in-loving-memory-of-lachlan-leung"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1, boxShadow: '0 8px 28px rgba(212,160,160,0.35)', background: '#c48e8e' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-sans text-sm tracking-wide"
            style={{ background: '#d4a0a0', color: '#fff', fontWeight: 600, letterSpacing: '0.04em' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.85 }}>
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
            Donate via GoFundMe
          </motion.a>

          <motion.a
            href="https://tinyurl.com/EclipseLiquidBiopsy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1, borderColor: 'rgba(138,170,138,0.75)', background: 'rgba(138,170,138,0.06)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-sans text-sm tracking-wide"
            style={{ background: 'transparent', color: '#8aaa8a', border: '1px solid rgba(138,170,138,0.4)', letterSpacing: '0.04em' }}
          >
            About ECLIPSE
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 11L11 1M11 1H4M11 1v7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
