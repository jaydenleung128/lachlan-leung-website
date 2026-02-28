'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  className?: string
}

export function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
