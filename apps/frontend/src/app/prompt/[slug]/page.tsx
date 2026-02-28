import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Share2, Check, ChevronRight, Lock } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PromptCard } from '@/components/ui/PromptCard'
import { BuyNowButton, BuyNowButtonInline } from '@/components/prompt/BuyNowButton'
import { api } from '@/lib/api'
import {
  formatPrice,
  generateStars,
  getPlatformEmoji,
  formatCompactNumber,
  getInitials,
} from '@/lib/utils'

// ── Platform badge colors ──────────────────────────────────────────────────
const PLATFORM_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Midjourney:         { bg: 'rgba(156,122,255,0.12)', text: '#9c7aff', border: 'rgba(156,122,255,0.25)' },
  ChatGPT:            { bg: 'rgba(16,163,127,0.12)',  text: '#10a37f', border: 'rgba(16,163,127,0.25)'  },
  'DALL·E':           { bg: 'rgba(255,107,107,0.12)', text: '#ff6b6b', border: 'rgba(255,107,107,0.25)' },
  Claude:             { bg: 'rgba(150,218,255,0.12)', text: '#96daff', border: 'rgba(150,218,255,0.25)' },
  'Stable Diffusion': { bg: 'rgba(230,204,128,0.12)', text: '#e6cc80', border: 'rgba(230,204,128,0.25)' },
  FLUX:               { bg: 'rgba(255,215,165,0.12)', text: '#ffd7a5', border: 'rgba(255,215,165,0.25)' },
  Gemini:             { bg: 'rgba(66,133,244,0.12)',  text: '#4285f4', border: 'rgba(66,133,244,0.25)'  },
  Sora:               { bg: 'rgba(255,154,154,0.12)', text: '#ff9a9a', border: 'rgba(255,154,154,0.25)' },
  Veo:                { bg: 'rgba(168,255,120,0.12)', text: '#a8ff78', border: 'rgba(168,255,120,0.25)' },
}
const DEFAULT_PLATFORM_COLOR = { bg: 'rgba(150,218,255,0.12)', text: '#96daff', border: 'rgba(150,218,255,0.25)' }

// ── Mock reviews (static, no DB) ───────────────────────────────────────────
const MOCK_REVIEWS = [
  {
    id: '1',
    author: 'Sarah M.',
    initials: 'SM',
    date: 'January 2025',
    rating: 5,
    text: "Absolutely stunning results! I've been using this prompt for weeks and every output is unique and beautiful. The instructions are clear and the outputs are consistent.",
  },
  {
    id: '2',
    author: 'Alex K.',
    initials: 'AK',
    date: 'December 2024',
    rating: 5,
    text: "Best prompt I've ever purchased. The level of detail in the output is remarkable. Worth every penny — already used it for a client project.",
  },
  {
    id: '3',
    author: 'Jordan P.',
    initials: 'JP',
    date: 'November 2024',
    rating: 4,
    text: 'Great prompt, really happy with the results. Took me a bit to get the hang of it but once I did, the outputs were consistently excellent.',
  },
  {
    id: '4',
    author: 'Maria L.',
    initials: 'ML',
    date: 'October 2024',
    rating: 5,
    text: 'Incredibly well-crafted. I was skeptical at first but this prompt delivers exactly what is advertised. The seller is also very responsive.',
  },
]

const WHAT_YOU_GET = [
  'Prompt text (instant download)',
  'Commercial use license',
  'Instant access after purchase',
  'Free updates',
]

// ── Mock prompt preview text (blurred for non-buyers) ──────────────────────
const PROMPT_PREVIEW_LINES = [
  'Create a vintage matchbox label design with romantic Valentine themes. The style',
  'should evoke the aesthetic of early 20th century European matchbox art, featuring',
  'intricate ornamental borders and delicate hand-lettered typography. Use warm sepia',
  'tones mixed with deep crimson reds and antique golds as the primary color palette.',
  'Include a central romantic illustration featuring intertwined hearts, dried flowers,',
  'and silhouettes of a couple in period dress. The overall label should have a gently',
  'distressed, aged appearance with subtle paper texture overlays and ink variations.',
  'Add decorative corner flourishes and a small flame motif. Output in portrait format.',
  '--ar 2:3 --style raw --stylize 750 --v 6.1',
]

// ── Helper: map platform name → marketplace slug ───────────────────────────
function getPlatformSlug(platform: string): string {
  const slugMap: Record<string, string> = {
    Midjourney: 'midjourney',
    ChatGPT: 'chatgpt',
    'DALL·E': 'dalle',
    Claude: 'claude',
    'Stable Diffusion': 'stable-diffusion',
    FLUX: 'flux',
    Gemini: 'gemini',
    Sora: 'sora',
    Veo: 'veo',
  }
  return slugMap[platform] ?? platform.toLowerCase().replace(/\s+/g, '-')
}

// ── generateMetadata ───────────────────────────────────────────────────────
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const prompt = await api.prompts.getBySlug(slug).catch(() => null)
  if (!prompt) return { title: 'Prompt Not Found | PromptBase' }

  return {
    title: `${prompt.title} | PromptBase`,
    description: prompt.description.slice(0, 160),
    openGraph: {
      title: `${prompt.title} | PromptBase`,
      description: prompt.description.slice(0, 160),
      images: prompt.thumbnail ? [{ url: prompt.thumbnail }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.description.slice(0, 160),
      images: prompt.thumbnail ? [prompt.thumbnail] : [],
    },
  }
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function PromptPage({ params }: Props) {
  const { slug } = await params

  const [prompt, featuredRaw] = await Promise.all([
    api.prompts.getBySlug(slug).catch(() => null),
    api.prompts.getFeatured().catch(() => []),
  ])

  if (!prompt) notFound()

  const stars = generateStars(prompt.rating)
  const platformColor = PLATFORM_COLORS[prompt.platform] ?? DEFAULT_PLATFORM_COLOR
  const platformEmoji = getPlatformEmoji(prompt.platform)
  const platformSlug = getPlatformSlug(prompt.platform)
  const authorInitials = getInitials(prompt.author.name)
  const relatedPrompts = featuredRaw.filter((p) => p.id !== prompt.id).slice(0, 6)

  const isFree = prompt.price === 0
  const displayPrice =
    prompt.discount && prompt.originalPrice
      ? prompt.originalPrice * (1 - prompt.discount / 100)
      : prompt.price

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-6">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-7">
            <Link href="/marketplace" className="hover:text-white/70 transition-colors">
              Marketplace
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href={`/marketplace/${platformSlug}`}
              className="hover:text-white/70 transition-colors"
            >
              {prompt.platform}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-white/70 truncate max-w-[240px]">{prompt.title}</span>
          </nav>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left: image + content (65%) ── */}
            <div className="w-full lg:flex-1 min-w-0">

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#232339]" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={prompt.thumbnail}
                  alt={prompt.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
                {/* Platform badge overlay */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium"
                  style={{
                    background: platformColor.bg,
                    color: platformColor.text,
                    border: `1px solid ${platformColor.border}`,
                  }}
                >
                  <span>{platformEmoji}</span>
                  <span>{prompt.platform}</span>
                </div>
              </div>

              {/* ── Prompt Preview ── */}
              <section className="mt-6">
                <h2 className="text-xl font-semibold text-white mb-3">Prompt Preview</h2>
                <div className="relative rounded-xl overflow-hidden border border-[#2a2a45]">
                  {/* Text content */}
                  <div className="bg-[#181828] p-5 font-mono text-sm leading-relaxed select-none">
                    {/* First line — visible */}
                    <p className="text-white/80 mb-1">{PROMPT_PREVIEW_LINES[0]}</p>
                    {/* Rest — blurred */}
                    {PROMPT_PREVIEW_LINES.slice(1).map((line, i) => (
                      <p key={i} className="text-white/80 mb-1 blur-sm">{line}</p>
                    ))}
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(180deg, rgba(24,24,40,0) 0%, rgba(24,24,40,0.75) 30%, rgba(24,24,40,0.95) 100%)' }}
                  >
                    <div className="w-11 h-11 rounded-full bg-[#2a2a45] border border-[#3a3a5c] flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5 text-white/60" />
                    </div>
                    <p className="text-white font-semibold text-base mb-1">Purchase to unlock full prompt</p>
                    <p className="text-white/50 text-sm mb-5">Instant access after payment</p>
                    <BuyNowButtonInline
                      promptId={prompt.id}
                      slug={prompt.slug}
                      title={prompt.title}
                      thumbnail={prompt.thumbnail}
                      platform={prompt.platform}
                      price={prompt.price}
                      authorName={prompt.author.name}
                      isFree={isFree}
                      displayPrice={displayPrice}
                      formattedPrice={formatPrice(displayPrice)}
                    />
                  </div>
                </div>
              </section>

              {/* ── About this prompt ── */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-3">About this prompt</h2>
                <p className="text-white/70 leading-relaxed text-base">{prompt.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-[#2a2a45] text-white/60 text-xs px-3 py-1 rounded-full">
                    {prompt.platform}
                  </span>
                  <span className="bg-[#2a2a45] text-white/60 text-xs px-3 py-1 rounded-full">
                    {prompt.category}
                  </span>
                  {prompt.contentType && (
                    <span className="bg-[#2a2a45] text-white/60 text-xs px-3 py-1 rounded-full">
                      {prompt.contentType}
                    </span>
                  )}
                </div>
              </section>

              {/* ── What you get ── */}
              <section className="mt-8 bg-[#232339] border border-[#2a2a45] rounded-xl p-5">
                <h2 className="text-lg font-semibold text-white mb-4">What you get</h2>
                <ul className="space-y-3">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ── Reviews ── */}
              <section className="mt-10">
                {/* Overall rating header */}
                <div className="flex items-center gap-5 mb-6">
                  <span className="text-5xl font-bold text-white leading-none">
                    {prompt.rating.toFixed(1)}
                  </span>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {stars.map((filled, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm">
                      ({formatCompactNumber(prompt.reviewCount)} reviews)
                    </p>
                  </div>
                </div>

                {/* Review cards */}
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((review) => {
                    const rStars = generateStars(review.rating)
                    return (
                      <div
                        key={review.id}
                        className="bg-[#232339] border border-[#2a2a45] rounded-xl p-5"
                      >
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="w-9 h-9 rounded-full bg-[#2a2a45] flex items-center justify-center text-xs font-semibold text-white/80 flex-shrink-0">
                            {review.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-white text-sm font-medium">{review.author}</span>
                              <span className="text-white/40 text-xs flex-shrink-0">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5 mb-2">
                              {rStars.map((filled, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* ── Right: purchase card (35%) ── */}
            <div className="w-full lg:w-[380px] lg:flex-shrink-0">
              <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-6 lg:sticky lg:top-20">

                {/* Title */}
                <h1 className="text-2xl font-bold text-white mb-3 leading-tight">{prompt.title}</h1>

                {/* Platform badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{
                    background: platformColor.bg,
                    color: platformColor.text,
                    border: `1px solid ${platformColor.border}`,
                  }}
                >
                  <span>{platformEmoji}</span>
                  <span>{prompt.platform}</span>
                </div>

                {/* Rating + stats */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5">
                  <div className="flex items-center gap-1">
                    {stars.map((filled, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-yellow-400 text-sm font-semibold ml-1">
                      {prompt.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-white/40 text-xs">
                    ({formatCompactNumber(prompt.reviewCount)} reviews)
                  </span>
                  <span className="text-white/25 text-xs">·</span>
                  <span className="text-white/40 text-xs">
                    {formatCompactNumber(prompt.salesCount)} sales
                  </span>
                  <span className="text-white/25 text-xs">·</span>
                  <span className="text-white/40 text-xs">
                    ♡ {formatCompactNumber(prompt.favoriteCount)}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-5">
                  {isFree ? (
                    <span className="text-3xl font-bold text-green-400">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white">
                        {formatPrice(displayPrice)}
                      </span>
                      {prompt.discount && prompt.originalPrice && (
                        <>
                          <span className="text-lg text-white/40 line-through">
                            {formatPrice(prompt.originalPrice)}
                          </span>
                          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-medium">
                            -{prompt.discount}%
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* CTA button */}
                <BuyNowButton
                  promptId={prompt.id}
                  slug={prompt.slug}
                  title={prompt.title}
                  thumbnail={prompt.thumbnail}
                  platform={prompt.platform}
                  price={prompt.price}
                  authorName={prompt.author.name}
                  isFree={isFree}
                  displayPrice={displayPrice}
                  formattedPrice={formatPrice(displayPrice)}
                />

                <div className="border-t border-[#2a2a45] my-5" />

                {/* Author */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#3a3a5c] flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                      {authorInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{prompt.author.name}</p>
                      <p className="text-white/40 text-xs truncate">@{prompt.author.username}</p>
                    </div>
                  </div>
                  <Link
                    href={`/profile/${prompt.author.username}`}
                    className="flex-shrink-0 text-xs text-[#96daff] border border-[#96daff]/30 px-3 py-1.5 rounded-lg hover:bg-[#96daff]/10 transition-colors whitespace-nowrap"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Seller mini stats */}
                <div className="flex items-center gap-3 mt-4 text-xs text-white/35">
                  <span>{formatCompactNumber(prompt.salesCount)} sales</span>
                  <span>·</span>
                  <span>Since {new Date(prompt.createdAt).getFullYear()}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {prompt.rating.toFixed(1)}
                  </span>
                </div>

                <div className="border-t border-[#2a2a45] my-5" />

                {/* Save & Share */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2a2a45] text-white/60 hover:text-white hover:border-[#3a3a5c] transition-colors text-sm">
                    <Heart className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#2a2a45] text-white/60 hover:text-white hover:border-[#3a3a5c] transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Related Prompts ── */}
          {relatedPrompts.length > 0 && (
            <section className="mt-16 pb-6">
              <h2 className="text-xl font-semibold text-white mb-5">Related Prompts</h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {relatedPrompts.map((related) => (
                  <div key={related.id} className="flex-shrink-0">
                    <PromptCard
                      id={related.id}
                      slug={related.slug}
                      title={related.title}
                      thumbnail={related.thumbnail}
                      platform={related.platform}
                      price={related.price}
                      discount={related.discount}
                      originalPrice={related.originalPrice}
                      rating={related.rating}
                      reviewCount={related.reviewCount}
                      author={related.author}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

export const dynamic = 'force-dynamic'
