'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PLATFORM_LINKS = [
  { name: 'Midjourney', color: '#ffa94d', href: '/marketplace/midjourney' },
  { name: 'ChatGPT', color: '#6ed654', href: '/marketplace/chatgpt' },
  { name: 'Veo', color: '#96daff', href: '/marketplace/gemini' },
  { name: 'Gemini', color: '#6ed654', href: '/marketplace/gemini-image' },
]

const PUBLISHERS = [
  { name: 'THE VERGE', style: 'font-bold text-xs tracking-tight' },
  { name: 'WIRED', style: 'font-black text-xs tracking-widest' },
  { name: "FST'COMPANY", style: 'font-bold text-[10px] tracking-wide' },
  { name: 'TechCrunch', style: 'font-bold text-xs' },
  { name: 'The Atlantic', style: 'font-serif text-xs italic' },
  { name: 'WSJ', style: 'font-bold text-xs tracking-widest' },
]

// Mosaic images for right side background
const MOSAIC_IMAGES = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&auto=format',
  'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=300&auto=format',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=300&auto=format',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&auto=format',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&auto=format',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&auto=format',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&auto=format',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&auto=format',
]

export function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    router.push(query ? `/marketplace?q=${encodeURIComponent(query)}` : '/marketplace')
  }

  return (
    <section className="relative overflow-hidden bg-[#1a1a2e]" style={{ minHeight: '300px' }}>

      {/* ── Right-side mosaic background ── */}
      <div
        className="absolute right-0 top-0 h-full pointer-events-none"
        style={{ width: '58%' }}
      >
        {/* Image grid */}
        <div
          className="absolute inset-0 grid gap-1 opacity-55"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '80px' }}
        >
          {MOSAIC_IMAGES.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Fade: left edge */}
        <div
          className="absolute inset-y-0 left-0 w-40"
          style={{ background: 'linear-gradient(to right, #1a1a2e, transparent)' }}
        />
        {/* Fade: top */}
        <div
          className="absolute inset-x-0 top-0 h-16"
          style={{ background: 'linear-gradient(to bottom, #1a1a2e, transparent)' }}
        />
        {/* Fade: bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: 'linear-gradient(to top, #1a1a2e, transparent)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1a1a2e]/40" />
      </div>

      {/* ── Left content ── */}
      <div className="container-custom relative z-10 py-12 pb-14">
        <div style={{ maxWidth: '520px' }}>

          {/* Title */}
          <h1 className="font-bold text-white leading-tight mb-2" style={{ fontSize: '2.25rem' }}>
            Prompt Marketplace
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base mb-3">
            Access 260k high-quality AI prompts
          </p>

          {/* Platform links */}
          <p className="text-sm mb-6">
            {PLATFORM_LINKS.map((p, i) => (
              <span key={p.name}>
                <a
                  href={p.href}
                  className="hover:underline font-medium transition-opacity hover:opacity-80"
                  style={{ color: p.color }}
                >
                  {p.name}
                </a>
                {i < PLATFORM_LINKS.length - 1 && (
                  <span className="text-white/50">, </span>
                )}
              </span>
            ))}
            <span className="text-white/50">, </span>
            <span className="text-white/50">Gemini &amp; more</span>
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex items-center mb-5" style={{ maxWidth: '440px' }}>
            <div
              className="flex flex-1 items-center h-10 overflow-hidden"
              style={{
                background: '#2d2d4e',
                borderRadius: '20px 0 0 20px',
                border: '1px solid #3a3a5c',
                borderRight: 'none',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search prompts"
                className="flex-1 bg-transparent border-none outline-none px-4 text-sm placeholder:text-white/35 text-white"
              />
            </div>
            <button
              type="submit"
              className="h-10 w-12 flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)',
                borderRadius: '0 20px 20px 0',
              }}
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Social proof */}
          <div className="flex items-center flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-white font-semibold">4.9</span>
              <span className="text-white/45 text-xs">38,000+ reviews</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/45 text-xs">
              <span className="text-[#6ed654]">✓</span>
              <span>Trusted by 425,000+ users</span>
            </div>
          </div>

          {/* Publisher logos */}
          <div className="flex items-center flex-wrap gap-4">
            <span className="text-white/25 text-xs">Featured in</span>
            {PUBLISHERS.map(pub => (
              <span key={pub.name} className={`text-white/35 ${pub.style}`}>
                {pub.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
