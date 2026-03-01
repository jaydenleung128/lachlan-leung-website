import { getAbout } from '@/lib/getAbout'
import { getTributes } from '@/lib/getTributes'
import { getAchievements } from '@/lib/getAchievements'
import { getGalleryImages } from '@/lib/getGalleryImages'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { PlayerSection } from '@/components/sections/PlayerSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TributesSection } from '@/components/sections/TributesSection'
import { QuietZoneSection } from '@/components/sections/QuietZoneSection'
export default async function HomePage() {
  const [about, tributes, achievements, galleryImages] = await Promise.all([
    getAbout(),
    getTributes(),
    Promise.resolve(getAchievements()),
    Promise.resolve(getGalleryImages()),
  ])

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection content={about} />
        <PlayerSection data={achievements} />
        <GallerySection images={galleryImages} />
        <TributesSection tributes={tributes} />
        <QuietZoneSection />
      </main>
    </>
  )
}
