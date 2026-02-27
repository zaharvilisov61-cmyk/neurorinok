'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PromptCard, PromptCardProps } from '../ui/PromptCard'
import Link from 'next/link'

interface FeaturedPromptsProps {
  prompts: PromptCardProps[]
}

export function FeaturedPrompts({ prompts }: FeaturedPromptsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 300
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-12 bg-bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Prompts</h2>
          <Link
            href="/marketplace?featured=true"
            className="text-sm text-accent-blue hover:underline"
          >
            Explore all →
          </Link>
        </div>

        {prompts.length === 0 ? (
          <div className="flex gap-4 overflow-hidden pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[280px] h-[187px] rounded-[16px] bg-bg-secondary animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Carousel */
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-secondary/90 hover:bg-bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-card hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-secondary/90 hover:bg-bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-card hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
            >
              {prompts.map((prompt) => (
                <div key={prompt.id} className="flex-shrink-0">
                  <PromptCard {...prompt} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
