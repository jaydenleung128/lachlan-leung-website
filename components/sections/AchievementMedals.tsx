import type { Achievement } from '@/types'

interface AchievementMedalsProps {
  highlights: Achievement[]
}

const rankBadge: Record<string, string> = {
  national: 'National',
  state:    'State',
  club:     'Club',
  other:    '',
}

export function AchievementMedals({ highlights }: AchievementMedalsProps) {
  if (highlights.length === 0) return null

  return (
    <div>
      <div className="w-full h-px mb-12" style={{ background: 'rgba(212,160,160,0.3)' }} />

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-7">
        {highlights.map((item, i) => (
          <div key={i}>
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <span style={{ color: '#d4a0a0', fontSize: '0.55rem', opacity: 0.7, lineHeight: 1 }}>●</span>
              <span
                className="font-sans tracking-wider shrink-0"
                style={{ color: 'rgba(74,55,40,0.4)', fontSize: '0.65rem' }}
              >
                {item.year}
              </span>
              <span style={{ color: 'rgba(74,55,40,0.2)', fontSize: '0.65rem' }}>&mdash;</span>
              <span
                className="font-sans tracking-wide"
                style={{ color: 'rgba(74,55,40,0.82)', fontSize: '0.75rem' }}
              >
                {item.title}
              </span>
              {rankBadge[item.rank] && (
                <span
                  className="font-sans uppercase ml-auto shrink-0"
                  style={{ color: '#8aaa8a', fontSize: '0.55rem', letterSpacing: '0.2em', opacity: 0.8 }}
                >
                  {rankBadge[item.rank]}
                </span>
              )}
            </div>
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
  )
}
