import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, BadgeCheck, Users, ShoppingBag, Grid3X3 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PromptCard } from '@/components/ui/PromptCard'
import { api } from '@/lib/api'
import { formatCompactNumber } from '@/lib/utils'

// ── Banner gradients per seller (fallback to default) ──────────────────────
const BANNER_GRADIENTS: Record<string, string> = {
  artpromptmaster:  'linear-gradient(135deg, #1a1a2e 0%, #3d1a5e 50%, #6b2fa0 100%)',
  traveldesignpro:  'linear-gradient(135deg, #1a2a3a 0%, #1a4a6e 50%, #0e7490 100%)',
  futurevisions:    'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)',
  logomaker:        'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
  fantasyartist:    'linear-gradient(135deg, #1a0a0a 0%, #5c1a1a 50%, #991b1b 100%)',
  productshots:     'linear-gradient(135deg, #0a1a1a 0%, #1a4a3a 50%, #065f46 100%)',
  cyberartist:      'linear-gradient(135deg, #0f0a1f 0%, #2d1b69 50%, #6d28d9 100%)',
  watercolormaster: 'linear-gradient(135deg, #1a0f2e 0%, #3b1f6e 50%, #7c3aed 100%)',
  abstractvision:   'linear-gradient(135deg, #1f1a0a 0%, #5c4a1a 50%, #d97706 100%)',
  kawaikreator:     'linear-gradient(135deg, #1f0a1a 0%, #6b1a4a 50%, #db2777 100%)',
  archviz:          'linear-gradient(135deg, #0a0f1a 0%, #1a2a4a 50%, #334155 100%)',
  retrowave:        'linear-gradient(135deg, #0f0a1f 0%, #4c1d95 30%, #be185d 70%, #f97316 100%)',
}
const DEFAULT_BANNER = 'linear-gradient(135deg, #1a1a2e 0%, #232339 50%, #2a2a45 100%)'

// ── generateMetadata ────────────────────────────────────────────────────────
type Props = { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const seller = await api.sellers.getProfile(username).catch(() => null)
  if (!seller) return { title: 'Seller Not Found | PromptBase' }

  return {
    title: `${seller.name} (@${seller.username}) | PromptBase`,
    description: seller.bio.slice(0, 160),
    openGraph: {
      title: `${seller.name} on PromptBase`,
      description: seller.bio.slice(0, 160),
      images: [{ url: seller.avatar }],
    },
  }
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function ProfilePage({ params }: Props) {
  const { username } = await params

  const [seller, prompts] = await Promise.all([
    api.sellers.getProfile(username).catch(() => null),
    api.sellers.getPrompts(username).catch(() => []),
  ])

  if (!seller) notFound()

  const banner = BANNER_GRADIENTS[seller.username] ?? DEFAULT_BANNER
  const memberYear = new Date(seller.memberSince).getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1">

        {/* ── Banner ── */}
        <div
          className="w-full h-48 md:h-56 relative"
          style={{ background: banner }}
        >
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }}
          />
        </div>

        {/* ── Profile header ── */}
        <div className="container-custom">
          <div className="relative -mt-16 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">

              {/* Avatar */}
              <div className="relative w-28 h-28 rounded-full border-4 border-[#1a1a2e] overflow-hidden bg-[#2a2a45] flex-shrink-0">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              </div>

              {/* Name + actions */}
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl font-bold text-white truncate">{seller.name}</h1>
                      {seller.verified && (
                        <BadgeCheck className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-white/50 text-sm">@{seller.username} · Member since {memberYear}</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="px-5 py-2 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
                    >
                      Follow
                    </button>
                    <button className="px-5 py-2 rounded-xl text-sm font-semibold text-white border border-[#2a2a45] hover:border-[#3a3a5c] transition-colors bg-[#232339]">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {seller.bio && (
              <p className="mt-4 text-white/65 text-sm leading-relaxed max-w-2xl">
                {seller.bio}
              </p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-6 mt-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-white/40" />
                <span className="text-white font-semibold">{formatCompactNumber(seller.totalSales)}</span>
                <span className="text-white/45 text-sm">sales</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">{seller.rating.toFixed(1)}</span>
                <span className="text-white/45 text-sm">({formatCompactNumber(seller.reviewCount)} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/40" />
                <span className="text-white font-semibold">{formatCompactNumber(seller.followers)}</span>
                <span className="text-white/45 text-sm">followers</span>
              </div>
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-white/40" />
                <span className="text-white font-semibold">{seller.totalPrompts}</span>
                <span className="text-white/45 text-sm">prompts</span>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-[#2a2a45] mb-8" />

          {/* ── Tabs ── */}
          <div className="flex items-center gap-1 mb-7">
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#232339] border border-[#2a2a45]">
              Prompts
              <span className="ml-2 text-white/40 font-normal">{seller.totalPrompts}</span>
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white/80 transition-colors">
              Reviews
              <span className="ml-2 text-white/30 font-normal">{formatCompactNumber(seller.reviewCount)}</span>
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white/80 transition-colors">
              About
            </button>
          </div>

          {/* ── Prompts grid ── */}
          {prompts.length > 0 ? (
            <div className="card-grid pb-12">
              {prompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  id={prompt.id}
                  slug={prompt.slug}
                  title={prompt.title}
                  thumbnail={prompt.thumbnail}
                  platform={prompt.platform}
                  price={prompt.price}
                  discount={prompt.discount}
                  originalPrice={prompt.originalPrice}
                  rating={prompt.rating}
                  reviewCount={prompt.reviewCount}
                  author={prompt.author}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Grid3X3 className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white/40 text-lg font-medium">No prompts yet</p>
              <p className="text-white/25 text-sm mt-1">This seller hasn't published any prompts</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const dynamic = 'force-dynamic'
