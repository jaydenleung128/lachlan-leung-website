import { SectionWrapper } from '@/components/ui/SectionWrapper'

interface AboutSectionProps {
  content: React.ReactNode
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" className="py-14 md:py-24 px-4 md:px-6" style={{ background: '#faf6f0' }}>
      <div className="max-w-3xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="font-sans text-xs tracking-widest uppercase mb-3 italic"
            style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}
          >
            a life worth knowing
          </p>
          <h2
            className="font-serif italic leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}
          >
            About Lachlan
          </h2>
          {/* Rose underline accent */}
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.7 }}
          />
        </div>

        {/* Content card */}
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{
            background:  '#fff9f4',
            boxShadow:   '0 4px 32px rgba(74,55,40,0.09), 0 1px 0 rgba(255,255,255,0.8) inset',
            border:      '1px solid rgba(212,160,160,0.2)',
          }}
        >
          {/* Pull-quote decorative block */}
          <div
            className="mb-8 pl-6 py-4 rounded-r-xl"
            style={{
              borderLeft: '4px solid #d4a0a0',
              background: 'rgba(212,160,160,0.06)',
            }}
          >
            <p
              className="font-serif italic text-xl leading-relaxed"
              style={{ color: '#7a6558' }}
            >
              Beloved son, fierce competitor, and the warmest presence in any room.
            </p>
          </div>

          <div className="prose prose-lg prose-memorial max-w-none">
            {content}
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
