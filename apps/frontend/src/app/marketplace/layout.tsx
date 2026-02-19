import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompt Marketplace | Browse 240k+ Prompts | PromptBase',
  description:
    'Discover and buy high-quality AI prompts for ChatGPT, Midjourney, DALL·E, Stable Diffusion, and more. Filter by category, platform, and price.',
  keywords: [
    'AI prompts marketplace',
    'buy AI prompts',
    'ChatGPT prompts',
    'Midjourney prompts',
    'DALL-E prompts',
    'prompt library',
  ],
  openGraph: {
    title: 'AI Prompt Marketplace | PromptBase',
    description: 'Browse and buy 240k+ high-quality AI prompts',
    type: 'website',
    url: 'https://promptbase.com/marketplace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Marketplace | PromptBase',
    description: 'Browse and buy 240k+ high-quality AI prompts',
  },
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
