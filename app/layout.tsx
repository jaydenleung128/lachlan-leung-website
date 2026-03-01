import type { Metadata, Viewport } from 'next'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
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
    <html lang="en" className={`${lora.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
