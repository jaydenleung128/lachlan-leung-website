import type { MDXComponents as MDXComponentsType } from 'mdx/types'

export const MDXComponents: MDXComponentsType = {
  h1: ({ children }) => (
    <h1
      className="font-serif text-4xl mb-6 leading-tight italic"
      style={{ color: '#4a3728' }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="font-serif text-2xl mb-4 mt-8 leading-snug italic"
      style={{ color: '#4a3728' }}
    >
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p
      className="font-sans leading-relaxed mb-4 text-base"
      style={{ color: '#7a6558' }}
    >
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline underline-offset-4 transition-opacity hover:opacity-70"
      style={{ color: '#d4a0a0' }}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="pl-6 py-2 my-6 italic rounded-r-xl"
      style={{
        borderLeft:      '4px solid #d4a0a0',
        background:      'rgba(212,160,160,0.07)',
        color:           '#7a6558',
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-8" style={{ borderColor: 'rgba(212,160,160,0.4)' }} />
  ),
}
