'use client'

import { motion } from 'framer-motion'
import { HeartIcon } from '@/components/ui/HeartIcon'

export function ScrollCue() {
  return (
    <motion.div
      className="flex justify-center mt-12"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      aria-hidden="true"
    >
      <HeartIcon style={{ filter: 'drop-shadow(0 2px 4px rgba(212,160,160,0.4))' }} />
    </motion.div>
  )
}
