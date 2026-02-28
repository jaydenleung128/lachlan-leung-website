import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { AchievementsData } from '@/types'

interface PlayerSectionProps {
  data: AchievementsData
}

const rankLabels: Record<string, string> = {
  state: 'State',
  national: 'National',
  club: 'Club',
  other: '',
}

export function PlayerSection({ data }: PlayerSectionProps) {
  return (
    <SectionWrapper id="player" className="bg-navy text-cream py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-cream mb-3">The Player</h2>
          <p className="font-sans text-cream/60 text-sm tracking-widest uppercase">
            {data.club} &middot; {data.yearsActive}
          </p>
        </div>

        {/* Achievements */}
        {data.highlights.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-2xl text-gold mb-8 text-center">Achievements</h3>
            <ul className="space-y-6">
              {data.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-6 items-start bg-cream/5 rounded-lg p-6 border border-cream/10"
                >
                  <div className="text-center shrink-0">
                    <span className="font-serif text-3xl text-gold block">{item.year}</span>
                    {rankLabels[item.rank] && (
                      <span className="font-sans text-xs text-gold/60 uppercase tracking-wide">
                        {rankLabels[item.rank]}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-cream mb-2">{item.title}</h4>
                    <p className="font-sans text-cream/70 leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Videos */}
        {data.videos.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl text-gold mb-8 text-center">Watch</h3>
            <div className="grid gap-8 sm:grid-cols-2">
              {data.videos.map((video, i) => (
                <div key={i} className="space-y-3">
                  {video.youtubeId !== 'PLACEHOLDER' ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-dark-bg">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center">
                      <p className="font-sans text-cream/40 text-sm">Video coming soon</p>
                    </div>
                  )}
                  <p className="font-serif text-lg text-cream">{video.title}</p>
                  {video.description && (
                    <p className="font-sans text-sm text-cream/60">{video.description}</p>
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
