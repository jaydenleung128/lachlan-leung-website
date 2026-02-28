import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import type { TributeFrontmatter, TributePost } from '@/types'

export async function getTributes(): Promise<TributePost[]> {
  const tributesDir = path.join(process.cwd(), 'content', 'tributes')

  if (!fs.existsSync(tributesDir)) return []

  const files = fs.readdirSync(tributesDir).filter(f => f.endsWith('.mdx'))

  const tributes = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(tributesDir, filename)
      const source = fs.readFileSync(filePath, 'utf-8')

      const { content, frontmatter } = await compileMDX<TributeFrontmatter>({
        source,
        components: MDXComponents,
        options: { parseFrontmatter: true },
      })

      return { slug, content, frontmatter }
    })
  )

  return tributes.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}
