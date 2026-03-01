'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { CSSProperties } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  id: string
  className?: string
  style?: CSSProperties
}

export function SectionWrapper({ children, id, className = '', style }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  )
}
