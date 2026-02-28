'use client'

import { motion } from 'framer-motion'

export function ScrollCue() {
  return (
    <motion.div
      className="flex justify-center mt-12"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold opacity-70"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.div>
  )
}
