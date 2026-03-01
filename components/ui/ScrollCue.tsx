'use client'

import { motion } from 'framer-motion'

export function ScrollCue() {
  return (
    <motion.div
      className="flex justify-center mt-12"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      aria-hidden="true"
    >
      <span
        className="text-2xl select-none"
        style={{ color: '#d4a0a0', filter: 'drop-shadow(0 2px 4px rgba(212,160,160,0.4))' }}
      >
        ❤
      </span>
    </motion.div>
  )
}
