'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PromptsGrid } from '@/components/marketplace/PromptsGrid'
import type { MarketplaceFilters } from '@/hooks/useMarketplaceFilters'

const PLATFORMS = [
  { label: 'All',               value: '' },
  { label: 'Midjourney',        value: 'Midjourney' },
  { label: 'ChatGPT',           value: 'ChatGPT' },
  { label: 'DALL·E',            value: 'DALL·E' },
  { label: 'Stable Diffusion',  value: 'Stable Diffusion' },
  { label: 'Gemini',            value: 'Gemini' },
  { label: 'Veo',               value: 'Veo' },
  { label: 'Claude',            value: 'Claude' },
  { label: 'FLUX',              value: 'FLUX' },
]

const SORT_OPTIONS: { value: MarketplaceFilters['sort']; label: string }[] = [
  { value: 'trending', label: 'Top' },
  { value: 'newest',   label: 'New' },
  { value: 'popular',  label: 'Popular' },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query    = searchParams.get('q')        || ''
  const platParam = searchParams.get('platform') || ''
  const sortParam = (searchParams.get('sort') as MarketplaceFilters['sort']) || 'trending'

  const [input,    setInput]    = useState(query)
  const [platform, setPlatform] = useState(platParam)
  const [sort,     setSort]     = useState<MarketplaceFilters['sort']>(sortParam)

  // Sync input when URL changes (e.g., back/forward)
  useEffect(() => { setInput(query) },    [query])
  useEffect(() => { setPlatform(platParam) }, [platParam])
  useEffect(() => { setSort(sortParam) },   [sortParam])

  const buildUrl = (q: string, plat: string, s: MarketplaceFilters['sort']) => {
    const p = new URLSearchParams()
    if (q.trim())         p.set('q',        q.trim())
    if (plat)             p.set('platform', plat)
    if (s !== 'trending') p.set('sort',     s)
    return `/search?${p.toString()}`
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(buildUrl(input, platform, sort))
  }

  const handlePlatform = (val: string) => {
    setPlatform(val)
    router.push(buildUrl(query, val, sort), { scroll: false })
  }

  const handleSort = (val: MarketplaceFilters['sort']) => {
    setSort(val)
    router.push(buildUrl(query, platform, val), { scroll: false })
  }

  const handleClear = () => {
    setInput('')
    router.push(buildUrl('', platform, sort))
  }

  const filters: MarketplaceFilters = {
    productTypes: [],
    contentTypes: [],
    platforms:    platform ? [platform] : [],
    categories:   [],
    priceMin:     0,
    priceMax:     1000,
    freeOnly:     false,
    sort,
    search:       query,
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1">

        {/* ── Search bar + platforms ── */}
        <div
          className="border-b border-[#2a2a45]"
          style={{ background: '#1e1e32' }}
        >
          <div className="container-custom py-5">

            {/* Search input */}
            <form onSubmit={handleSearch} className="flex items-center mb-4" style={{ maxWidth: '640px' }}>
              <div
                className="flex flex-1 items-center h-11 overflow-hidden"
                style={{
                  background: '#2a2a45',
                  borderRadius: '22px 0 0 22px',
                  border: '1px solid #3a3a5c',
                  borderRight: 'none',
                }}
              >
                <Search className="w-4 h-4 text-white/40 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Search prompts..."
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none px-3 text-sm placeholder:text-white/35 text-white"
                />
                {input && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="mr-3 text-white/30 hover:text-white/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="h-11 px-5 flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity text-white text-sm font-medium"
                style={{
                  background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)',
                  borderRadius: '0 22px 22px 0',
                }}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </form>

            {/* Platform pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {PLATFORMS.map(p => (
                <button
                  key={p.value}
                  onClick={() => handlePlatform(p.value)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-medium transition-all
                    ${platform === p.value
                      ? 'text-[#96daff] border border-[#96daff]/40'
                      : 'border border-[#2a2a45] text-white/55 hover:text-white hover:border-white/20'
                    }
                  `}
                  style={platform === p.value ? { background: 'rgba(150,218,255,0.12)' } : { background: '#232339' }}
                >
                  {p.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ── Results header ── */}
        <div className="container-custom py-4 flex items-center justify-between">
          <div>
            {query ? (
              <p className="text-sm text-white/60">
                Results for{' '}
                <span className="text-white font-semibold">"{query}"</span>
                {platform && (
                  <span className="text-white/40"> · {platform}</span>
                )}
              </p>
            ) : (
              <p className="text-sm text-white/50">
                Browse all prompts
                {platform && <span className="text-white/40"> · {platform}</span>}
              </p>
            )}
          </div>

          {/* Sort tabs */}
          <div className="flex items-center gap-0.5 bg-[#232339] border border-[#2a2a45] rounded-lg p-0.5">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSort(opt.value)}
                className={`
                  px-3 py-1 rounded-md text-sm transition-colors select-none
                  ${sort === opt.value
                    ? 'bg-[#2a2a45] text-white'
                    : 'text-white/50 hover:text-white'}
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results grid ── */}
        <div className="container-custom pb-12">
          <PromptsGrid filters={filters} />
        </div>

      </main>

      <Footer />
    </div>
  )
}

export const dynamic = 'force-dynamic'
