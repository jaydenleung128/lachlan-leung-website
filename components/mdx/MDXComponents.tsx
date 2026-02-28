import type { MDXComponents as MDXComponentsType } from 'mdx/types'

export const MDXComponents: MDXComponentsType = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl text-navy mb-6 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl text-navy mb-4 mt-8 leading-snug">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="font-sans text-navy leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-gold underline underline-offset-4 hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gold pl-6 py-2 my-6 italic text-navy/80">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="border-gold/30 my-8" />
  ),
}
