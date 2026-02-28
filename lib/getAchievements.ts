import achievementsData from '@/content/achievements.json'
import type { AchievementsData } from '@/types'

export function getAchievements(): AchievementsData {
  return achievementsData as AchievementsData
}
