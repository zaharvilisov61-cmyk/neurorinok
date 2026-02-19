'use client'

import Link from 'next/link'
import { getCategorySlug } from '@/lib/constants/marketplace'

const POPULAR_CATEGORIES = [
  'ChatGPT',
  'Midjourney',
  'DALL·E',
  'GPT-4',
  'Stable Diffusion',
  'Art & Illustration',
  'Marketing',
  'Design',
  'Writing',
  'Photography',
  'Code',
  'Business',
]

export function CategoryLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {POPULAR_CATEGORIES.map((category) => {
        const slug = getCategorySlug(category)
        const isAI = ['ChatGPT', 'Midjourney', 'DALL·E', 'GPT-4', 'Stable Diffusion'].includes(category)

        return (
          <Link
            key={category}
            href={isAI ? `/marketplace?platforms=${category}` : `/marketplace?categories=${category}`}
            className="px-4 py-2 bg-bg-tertiary hover:bg-bg-tertiary/80 rounded-md text-xs md:text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            {category}
          </Link>
        )
      })}
    </div>
  )
}
