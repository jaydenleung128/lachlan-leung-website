import { getAbout } from '@/lib/getAbout'
import { getTributes } from '@/lib/getTributes'
import { getAchievements } from '@/lib/getAchievements'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { PlayerSection } from '@/components/sections/PlayerSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { TributesSection } from '@/components/sections/TributesSection'
import { DonateSection } from '@/components/sections/DonateSection'
import { Footer } from '@/components/sections/Footer'

export default async function HomePage() {
  const [about, tributes, achievements] = await Promise.all([
    getAbout(),
    getTributes(),
    getAchievements(),
  ])

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection content={about} />
        <PlayerSection />
        <AchievementsSection highlights={achievements.highlights} />
        <TributesSection tributes={tributes} />
        <DonateSection />
      </main>
      <Footer />
    </>
  )
}
