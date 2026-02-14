import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'CSS Berlin - Nachhaltige Second-Hand Mode',
  description: 'CSS Berlin - Nachhaltige Mode für eine bessere Zukunft. Jeder Kauf rettet das Klima.',
  keywords: 'Second-Hand, Nachhaltige Mode, CSS Berlin, CO2 sparen, Vintage',
  openGraph: {
    title: 'CSS Berlin - Nachhaltige Second-Hand Mode',
    description: 'Nachhaltige Mode für eine bessere Zukunft',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
