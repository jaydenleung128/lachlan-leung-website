import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lachlanleung.com'),
  title: 'Lachlan Leung — In Loving Memory',
  description: 'A celebration of the life of Lachlan Leung — Year 12 student, table tennis champion, and beloved son. 19 October 2008 – 7 January 2026.',
  openGraph: {
    title: 'Lachlan Leung — In Loving Memory',
    description: 'A celebration of the life of Lachlan Leung — Year 12 student, table tennis champion, and beloved son. 19 October 2008 – 7 January 2026.',
    images: ['/images/hero.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
