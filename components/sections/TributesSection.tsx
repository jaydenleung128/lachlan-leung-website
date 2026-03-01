'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { TributePost } from '@/types'

interface TributesSectionProps {
  tributes: TributePost[]
}

const relationshipAccents: Record<string, string> = {
  Family:   '#d4a0a0',
  Teammate: '#8aaa8a',
  Coach:    '#c4a882',
  Friend:   '#a0b4d4',
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay:    i * 0.12,
      duration: 0.8,
      ease:     [0.43, 0.13, 0.23, 0.96],
    },
  }),
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function TributesSection({ tributes }: TributesSectionProps) {
  return (
    <SectionWrapper id="tributes" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#f5efe6' }}>
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            words from those who loved him
          </p>
          <h2
            className="font-serif italic leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            Tributes
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }}
          />
        </div>

        {tributes.length === 0 ? (
          <p
            className="font-sans text-center py-16 italic"
            style={{ color: '#b09080' }}
          >
            Tributes will appear here soon.
          </p>
        ) : (
          <div className="space-y-8">
            {tributes.map((tribute, i) => {
              const accent = relationshipAccents[tribute.frontmatter.relationship] ?? '#d4a0a0'

              return (
                <motion.article
                  key={tribute.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={cardVariants}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#faf6f0',
                    boxShadow:  '0 4px 24px rgba(74,55,40,0.09), 0 1px 0 rgba(255,255,255,0.8) inset',
                    border:     '1px solid rgba(212,160,160,0.18)',
                  }}
                >
                  {/* Rose top border accent */}
                  <div style={{ height: 4, background: accent }} />

                  <div className="px-8 py-7">
                    {/* Author row */}
                    <div className="flex items-start gap-4 mb-6">
                      {/* Avatar circle with initials */}
                      <div
                        className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{
                          background:  '#8aaa8a',
                          color:       '#faf6f0',
                          fontFamily:  'var(--font-nunito), system-ui, sans-serif',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tribute.frontmatter.avatar ? (
                          <img
                            src={tribute.frontmatter.avatar}
                            alt={tribute.frontmatter.author}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(tribute.frontmatter.author)
                        )}
                      </div>

                      <div className="flex-1">
                        <p
                          className="font-sans font-semibold text-sm"
                          style={{ color: '#4a3728' }}
                        >
                          {tribute.frontmatter.author}
                        </p>
                        <p className="font-sans text-xs mt-0.5" style={{ color: accent }}>
                          {tribute.frontmatter.relationship}
                        </p>
                      </div>

                      {/* Date */}
                      <time
                        className="font-sans text-xs shrink-0 mt-0.5"
                        style={{ color: '#b09080', letterSpacing: '0.04em' }}
                      >
                        {new Date(tribute.frontmatter.date).toLocaleDateString('en-AU', {
                          year:  'numeric',
                          month: 'short',
                          day:   'numeric',
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif italic text-xl mb-4 leading-snug"
                      style={{ color: '#4a3728' }}
                    >
                      {tribute.frontmatter.title}
                    </h3>

                    {/* Body */}
                    <div
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: '#7a6558' }}
                    >
                      {tribute.content}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
