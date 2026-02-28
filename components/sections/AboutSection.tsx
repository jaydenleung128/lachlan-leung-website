import { SectionWrapper } from '@/components/ui/SectionWrapper'

interface AboutSectionProps {
  content: React.ReactNode
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <SectionWrapper id="about" className="bg-cream py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-navy mb-12 text-center">
          About Lachlan
        </h2>
        <div className="prose prose-lg prose-memorial max-w-none">
          {content}
        </div>
      </div>
    </SectionWrapper>
  )
}
