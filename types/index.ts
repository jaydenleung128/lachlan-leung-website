export interface Achievement {
  year: number
  title: string
  description: string
  rank: 'state' | 'national' | 'club' | 'other'
}

export interface Video {
  youtubeId: string
  title: string
  description: string
}

export interface AchievementsData {
  highlights: Achievement[]
  videos: Video[]
  club: string
  yearsActive: string
}

export interface TributeFrontmatter {
  title: string
  author: string
  relationship: 'Family' | 'Teammate' | 'Coach' | 'Friend'
  date: string
  avatar?: string
}

export interface TributePost {
  frontmatter: TributeFrontmatter
  content: React.ReactNode
  slug: string
}
