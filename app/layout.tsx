import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: 'Kovendhan C | Developer Portfolio',
  description: 'Full-Stack Developer & ML Enthusiast - Building intelligent solutions with Python, Machine Learning, and Data Analytics',
  keywords: ['Kovendhan', 'Developer', 'Machine Learning', 'Python', 'Portfolio', 'Data Science'],
  authors: [{ name: 'Kovendhan C' }],
  openGraph: {
    title: 'Kovendhan C | Developer Portfolio',
    description: 'Full-Stack Developer & ML Enthusiast',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
