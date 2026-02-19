import type { Metadata } from 'next'
import { Finlandica } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const finlandica = Finlandica({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-finlandica',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Prompts | PromptBase: The #1 Marketplace for AI Prompts',
  description: 'Access 240k high-quality AI prompts for ChatGPT, Midjourney, DALL·E, Stable Diffusion, and more. Buy and sell prompts on the world\'s largest prompt marketplace.',
  keywords: ['AI prompts', 'ChatGPT prompts', 'Midjourney prompts', 'DALL-E prompts', 'prompt marketplace', 'AI marketplace'],
  authors: [{ name: 'PromptBase' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://promptbase.com',
    siteName: 'PromptBase',
    title: 'AI Prompts | PromptBase: The #1 Marketplace for AI Prompts',
    description: 'Access 240k high-quality AI prompts for ChatGPT, Midjourney, DALL·E, Stable Diffusion, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PromptBase - AI Prompt Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompts | PromptBase: The #1 Marketplace for AI Prompts',
    description: 'Access 240k high-quality AI prompts for ChatGPT, Midjourney, DALL·E, and more.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={finlandica.variable}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
