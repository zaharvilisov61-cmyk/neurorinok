'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Card {
  title: string
  subtitle: string
  href: string
  img?: string
  isNew?: boolean
}

const CARDS: Card[] = [
  {
    title: 'PromptBase Select',
    subtitle: '200,000+ prompts, one monthly price',
    href: '/select',
    isNew: true,
  },
  {
    title: 'Explore the Marketplace',
    subtitle: 'Browse 260k+ quality, tested prompts',
    href: '/marketplace',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
  },
  {
    title: 'Sell Your Prompts',
    subtitle: 'Create, share and earn',
    href: '/sell',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
  },
  {
    title: 'Get a Custom Prompt',
    subtitle: 'Work with expert prompt engineers',
    href: '/hire',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop',
  },
  {
    title: 'Generate AI Content',
    subtitle: 'Create images, videos, and more',
    href: '/create',
    img: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&auto=format&fit=crop',
  },
]

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  return (
    <section className="container-custom py-3">
      {/* Carousel wrapper — arrows span full card height */}
      <div className="relative flex items-stretch">

        {/* Left arrow — full height */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="flex-shrink-0 flex items-center justify-center w-9 rounded-l-xl hover:bg-bg-secondary transition-colors z-10"
          style={{ background: 'rgba(26,26,46,0.7)' }}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto no-scrollbar flex-1"
        >
          {CARDS.map(card => (
            <Link
              key={card.title}
              href={card.href}
              className="relative flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer"
              style={{ width: '280px', height: '210px' }}
            >
              {card.isNew ? (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1a0515 0%, #2d0505 50%, #1a0a1a 100%)',
                  }}
                >
                  <span
                    className="select-none font-black text-white/10"
                    style={{ fontSize: '130px', lineHeight: 1 }}
                  >
                    ∞
                  </span>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.45) 55%, rgba(26,26,46,0.1) 100%)',
                    }}
                  />
                </>
              )}

              {/* "New Feature" badge */}
              {card.isNew && (
                <div
                  className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-white text-[10px] font-semibold tracking-wide"
                  style={{ background: '#e53935' }}
                >
                  New Feature
                </div>
              )}

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-tight">{card.title}</p>
                <p className="text-white/55 text-xs mt-0.5">{card.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right arrow — full height */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="flex-shrink-0 flex items-center justify-center w-9 rounded-r-xl hover:bg-bg-secondary transition-colors z-10"
          style={{ background: 'rgba(26,26,46,0.7)' }}
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>

      </div>
    </section>
  )
}
