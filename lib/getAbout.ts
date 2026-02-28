import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/mdx/MDXComponents'

export async function getAbout() {
  const filePath = path.join(process.cwd(), 'content', 'about.mdx')
  const source = fs.readFileSync(filePath, 'utf-8')

  const { content } = await compileMDX({
    source,
    components: MDXComponents,
    options: { parseFrontmatter: false },
  })

  return content
}
