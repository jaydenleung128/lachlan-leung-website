import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { AchievementsData } from '@/types'

interface PlayerSectionProps {
  data: AchievementsData
}

const rankBadge: Record<string, string> = {
  national: 'National',
  state:    'State',
  club:     'Club',
  other:    '',
}

export function PlayerSection({ data }: PlayerSectionProps) {
  return (
    <SectionWrapper id="player" className="py-16 md:py-32 px-4 md:px-6" style={{ background: '#f5efe6' }}>
      <div className="max-w-5xl mx-auto">

        {/* Achievements — footnote table */}
        {data.highlights.length > 0 && (
          <div className="mb-24">
            <div className="w-full h-px mb-12" style={{ background: 'rgba(212,160,160,0.3)' }} />

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-7">
              {data.highlights.map((item, i) => (
                <div key={i}>
                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    {/* Rose dot marker */}
                    <span style={{ color: '#d4a0a0', fontSize: '0.55rem', opacity: 0.7, lineHeight: 1 }}>●</span>
                    {/* Year */}
                    <span
                      className="font-sans tracking-wider shrink-0"
                      style={{ color: 'rgba(74,55,40,0.4)', fontSize: '0.65rem' }}
                    >
                      {item.year}
                    </span>
                    {/* Em-dash */}
                    <span style={{ color: 'rgba(74,55,40,0.2)', fontSize: '0.65rem' }}>&mdash;</span>
                    {/* Title */}
                    <span
                      className="font-sans tracking-wide"
                      style={{ color: 'rgba(74,55,40,0.82)', fontSize: '0.75rem' }}
                    >
                      {item.title}
                    </span>
                    {/* Rank badge */}
                    {rankBadge[item.rank] && (
                      <span
                        className="font-sans uppercase ml-auto shrink-0"
                        style={{ color: '#8aaa8a', fontSize: '0.55rem', letterSpacing: '0.2em', opacity: 0.8 }}
                      >
                        {rankBadge[item.rank]}
                      </span>
                    )}
                  </div>
                  {/* Description */}
                  <div className="pl-4">
                    <p
                      className="font-serif italic leading-relaxed"
                      style={{ color: 'rgba(74,55,40,0.45)', fontSize: '0.88rem' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-px mt-12" style={{ background: 'rgba(212,160,160,0.3)' }} />
          </div>
        )}

        {/* Videos */}
        {data.videos.length > 0 && (
          <div>
            <p
              className="font-sans text-center uppercase mb-12 italic"
              style={{ color: '#8aaa8a', letterSpacing: '0.3em', fontSize: '0.62rem' }}
            >
              Watch
            </p>
            <div className="grid gap-10 sm:grid-cols-2">
              {data.videos.map((video, i) => (
                <div key={i}>
                  {video.youtubeId !== 'PLACEHOLDER' ? (
                    <div
                      className="aspect-video rounded-xl overflow-hidden mb-4"
                      style={{ background: '#e8ddd4' }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-video rounded-xl flex items-center justify-center mb-4"
                      style={{ background: 'rgba(212,160,160,0.07)', border: '1px dashed rgba(212,160,160,0.35)' }}
                    >
                      <p className="font-sans text-sm" style={{ color: '#d4a0a0', opacity: 0.7 }}>
                        Video coming soon
                      </p>
                    </div>
                  )}
                  <p className="font-serif italic text-lg mb-1" style={{ color: '#4a3728' }}>
                    {video.title}
                  </p>
                  {video.description && (
                    <p className="font-sans text-sm" style={{ color: '#7a6558' }}>
                      {video.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </SectionWrapper>
  )
}
