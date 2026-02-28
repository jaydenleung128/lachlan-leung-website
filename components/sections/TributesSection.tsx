import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { TributePost } from '@/types'

interface TributesSectionProps {
  tributes: TributePost[]
}

const relationshipColors: Record<string, string> = {
  Family: 'text-gold',
  Teammate: 'text-blue-400',
  Coach: 'text-green-400',
  Friend: 'text-purple-400',
}

export function TributesSection({ tributes }: TributesSectionProps) {
  return (
    <SectionWrapper id="tributes" className="bg-navy py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-cream mb-4 text-center">Tributes</h2>
        <p className="font-sans text-cream/50 text-center mb-16 text-sm">
          Words from those who knew and loved him.
        </p>

        {tributes.length === 0 ? (
          <p className="font-sans text-cream/40 text-center py-16">
            Tributes will appear here soon.
          </p>
        ) : (
          <div className="space-y-10">
            {tributes.map((tribute) => (
              <article
                key={tribute.slug}
                className="border-l-4 border-gold bg-cream/5 rounded-r-xl pl-8 pr-6 py-8"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-serif text-xl text-cream mb-1">
                      {tribute.frontmatter.title}
                    </h3>
                    <p className="font-sans text-sm text-cream/60">
                      <span className="text-cream/80">{tribute.frontmatter.author}</span>
                      {' · '}
                      <span
                        className={
                          relationshipColors[tribute.frontmatter.relationship] ?? 'text-cream/60'
                        }
                      >
                        {tribute.frontmatter.relationship}
                      </span>
                    </p>
                  </div>
                  <time className="font-sans text-xs text-cream/30 shrink-0 mt-1">
                    {new Date(tribute.frontmatter.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <div className="prose prose-invert prose-sm max-w-none text-cream/80 [&_p]:text-cream/80 [&_blockquote]:border-gold/50 [&_blockquote]:text-cream/60">
                  {tribute.content}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
