import type { Achievement } from '@/types'
import { AchievementMedals } from '@/components/sections/AchievementMedals'

interface AchievementsSectionProps {
  highlights: Achievement[]
}

export function AchievementsSection({ highlights }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="py-14 md:py-24 px-4" style={{ background: '#faf6f0' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-widest uppercase mb-3 italic" style={{ color: '#8aaa8a', letterSpacing: '0.2em' }}>milestones</p>
          <h2 className="font-serif italic leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#4a3728' }}>His Achievements</h2>
          <div className="mx-auto mt-4 rounded-full" style={{ width: 48, height: 3, background: '#d4a0a0', opacity: 0.65 }} />
        </div>
        <AchievementMedals highlights={highlights} />
      </div>
    </section>
  )
}
