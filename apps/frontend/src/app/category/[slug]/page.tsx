import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PromptCard, type PromptCardProps } from '@/components/ui/PromptCard'
import { MODEL_GROUPS, CATEGORY_TABS } from '@/lib/constants/nav-categories'
import { api } from '@/lib/api'

// Static metadata per model slug
const MODEL_META: Record<string, {
  title: string
  description: string
  gradient: string
  count: string
}> = {
  'all-models': {
    title: 'AI Prompts',
    description: 'Discover 240,000+ expert prompts for all AI models. Create stunning images, write better content, and automate your workflow.',
    gradient: 'linear-gradient(135deg, #1a1a4e 0%, #3a1a6e 50%, #6e1a3e 100%)',
    count: '240,000+',
  },
  'chatgpt-image': {
    title: 'ChatGPT Image Prompts',
    description: "Discover 23,100+ expert prompts for ChatGPT's image model. Create infographics, text renders, and logos with precise control over your results.",
    gradient: 'linear-gradient(135deg, #1a2a5e 0%, #3a1a7e 50%, #7e2a5e 100%)',
    count: '23,100+',
  },
  'claude': {
    title: 'Claude Prompts',
    description: 'Discover 8,400+ expert prompts for Anthropic\'s Claude. Write better code, essays, and analysis with precision-crafted instructions.',
    gradient: 'linear-gradient(135deg, #1a3a5e 0%, #1a5e4a 50%, #2a4e1a 100%)',
    count: '8,400+',
  },
  'dalle': {
    title: 'DALL·E Prompts',
    description: 'Discover 14,200+ expert prompts for DALL·E. Generate photorealistic images, illustrations, and creative art with OpenAI\'s image model.',
    gradient: 'linear-gradient(135deg, #2a1a6e 0%, #1a3a8e 50%, #1a6e5e 100%)',
    count: '14,200+',
  },
  'deepseek': {
    title: 'DeepSeek Prompts',
    description: 'Discover 3,200+ expert prompts for DeepSeek. Leverage one of the most capable open-source models for reasoning and coding tasks.',
    gradient: 'linear-gradient(135deg, #1a4a6e 0%, #1a6e8e 50%, #1a4a4e 100%)',
    count: '3,200+',
  },
  'flux': {
    title: 'FLUX Prompts',
    description: 'Discover 9,800+ expert prompts for FLUX. Create photorealistic and artistic images with Black Forest Labs\' cutting-edge model.',
    gradient: 'linear-gradient(135deg, #3e1a1a 0%, #6e3a1a 50%, #4e5e1a 100%)',
    count: '9,800+',
  },
  'gemini': {
    title: 'Gemini Prompts',
    description: 'Discover 6,500+ expert prompts for Google Gemini. Multimodal reasoning, coding, and creative tasks at Google-scale intelligence.',
    gradient: 'linear-gradient(135deg, #1a3e6e 0%, #1a5e3e 50%, #3e6e1a 100%)',
    count: '6,500+',
  },
  'gemini-image': {
    title: 'Gemini Image Prompts',
    description: 'Discover 4,100+ expert prompts for Gemini\'s image generation. Create vivid, detailed visuals powered by Google\'s latest multimodal model.',
    gradient: 'linear-gradient(135deg, #1a3a6e 0%, #3a1a6e 50%, #6e3a1a 100%)',
    count: '4,100+',
  },
  'midjourney': {
    title: 'Midjourney Prompts',
    description: 'Discover 68,000+ expert prompts for Midjourney. The world\'s most popular AI art generator — get stunning results every time.',
    gradient: 'linear-gradient(135deg, #2a1a6e 0%, #5e1a6e 50%, #6e1a4e 100%)',
    count: '68,000+',
  },
  'stable-diffusion': {
    title: 'Stable Diffusion Prompts',
    description: 'Discover 31,000+ expert prompts for Stable Diffusion. Full control over your image generation with the leading open-source model.',
    gradient: 'linear-gradient(135deg, #1a4e2a 0%, #1a6e4e 50%, #1a4e6e 100%)',
    count: '31,000+',
  },
  'chatgpt': {
    title: 'ChatGPT Prompts',
    description: 'Discover 52,000+ expert prompts for ChatGPT. Write, code, analyse, and create — with prompts tested by thousands of professionals.',
    gradient: 'linear-gradient(135deg, #0a3e2e 0%, #1a5e3e 50%, #1a3e5e 100%)',
    count: '52,000+',
  },
  // Category tabs
  'art': {
    title: 'Art Prompts',
    description: 'Discover 42,000+ expert art prompts. From abstract expressionism to anime — unlock your creative vision with AI-powered artistry.',
    gradient: 'linear-gradient(135deg, #3e1a5e 0%, #6e1a4e 50%, #8e2a2a 100%)',
    count: '42,000+',
  },
  'logos': {
    title: 'Logo Design Prompts',
    description: 'Discover 18,000+ professional logo prompts. Create iconic brand identities, minimalist marks, and stunning visual identities.',
    gradient: 'linear-gradient(135deg, #1a2e5e 0%, #2e1a6e 50%, #5e1a5e 100%)',
    count: '18,000+',
  },
  'graphics': {
    title: 'Graphics Prompts',
    description: 'Discover 29,000+ graphic design prompts. Posters, banners, social media assets and more — crafted for designers.',
    gradient: 'linear-gradient(135deg, #1a4e3e 0%, #1a5e5e 50%, #1a3e6e 100%)',
    count: '29,000+',
  },
  'productivity': {
    title: 'Productivity Prompts',
    description: 'Discover 15,000+ productivity prompts. Automate workflows, manage projects, and get more done with AI-powered productivity.',
    gradient: 'linear-gradient(135deg, #2e3e1a 0%, #3e5e1a 50%, #1a5e3e 100%)',
    count: '15,000+',
  },
  'marketing': {
    title: 'Marketing Prompts',
    description: 'Discover 33,000+ marketing prompts. Write ad copy, social content, and campaigns that convert — powered by AI.',
    gradient: 'linear-gradient(135deg, #5e2e1a 0%, #7e3e1a 50%, #5e5e1a 100%)',
    count: '33,000+',
  },
  'photography': {
    title: 'Photography Prompts',
    description: 'Discover 21,000+ photography prompts. Generate stunning photorealistic images — portraits, landscapes, products, and more.',
    gradient: 'linear-gradient(135deg, #1a2e4e 0%, #1a3e5e 50%, #2e2e5e 100%)',
    count: '21,000+',
  },
  'games': {
    title: 'Game Design Prompts',
    description: 'Discover 12,000+ game design prompts. Characters, environments, lore, mechanics — everything your game needs.',
    gradient: 'linear-gradient(135deg, #1a4e1a 0%, #2e6e2e 50%, #1a4e4e 100%)',
    count: '12,000+',
  },
}

const PUBLISHER_LOGOS = [
  { name: 'The Verge', style: 'font-bold text-sm tracking-tight' },
  { name: 'WIRED', style: 'font-black text-base tracking-widest' },
  { name: "FST'COMPANY", style: 'font-bold text-xs tracking-wider' },
  { name: 'TechCrunch', style: 'font-bold text-sm' },
  { name: 'The Atlantic', style: 'font-serif text-sm italic' },
  { name: 'WSJ', style: 'font-bold text-base tracking-widest' },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params

  const meta = MODEL_META[slug]
  if (!meta) notFound()

  const modelGroup = MODEL_GROUPS.find(m => m.slug === slug)

  // Fetch prompts, filter by platform if possible
  const allPrompts = await api.prompts.getFeatured().catch(() => [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toCard = (p: any): PromptCardProps => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    platform: p.platform,
    price: p.price,
    discount: p.discount,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    author: { name: p.author.name, avatar: p.author.avatar },
  })

  const featured = allPrompts.slice(0, 6).map(toCard)
  const free = allPrompts.filter((p: any) => p.price === 0).slice(0, 6).map(toCard)
  const showFree = free.length > 0 ? free : allPrompts.slice(6, 12).map(toCard)

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: meta.gradient }}
      >
        {/* subtle noise overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-custom relative z-10 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-3">{meta.title}</h1>
            <p className="text-white/75 text-base leading-relaxed mb-6 max-w-xl">
              {meta.description}
            </p>

            <Link
              href={`/marketplace?platform=${slug}`}
              className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-[#1a1a2e] transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              Explore all prompts
            </Link>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-6 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-white font-semibold text-sm">4.9</span>
                <span className="text-white/50 text-xs">38,000+ reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/50 text-xs">✓</span>
                <span className="text-white/70 text-xs">Trusted by 425,000+ users</span>
              </div>
            </div>

            {/* Publisher logos */}
            <div className="flex items-center gap-5 mt-4 flex-wrap">
              <span className="text-white/30 text-xs">Featured in</span>
              {PUBLISHER_LOGOS.map(logo => (
                <span key={logo.name} className={`text-white/40 ${logo.style}`}>
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured prompts ── */}
      <main className="flex-1">
        <section className="container-custom py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">
              Featured {meta.title}
            </h2>
            <Link
              href={`/marketplace?platform=${slug}`}
              className="text-sm text-[#96daff] hover:underline"
            >
              Explore all →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
              {featured.map(prompt => (
                <div key={prompt.id} className="flex-shrink-0">
                  <PromptCard {...prompt} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm py-8">No prompts found.</p>
          )}
        </section>

        {/* ── Free prompts ── */}
        <section className="container-custom pb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">
              Free {meta.title}
            </h2>
            <Link
              href={`/marketplace?platform=${slug}&price=free`}
              className="text-sm text-[#96daff] hover:underline"
            >
              Explore all →
            </Link>
          </div>

          {showFree.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
              {showFree.map(prompt => (
                <div key={prompt.id} className="flex-shrink-0">
                  <PromptCard {...prompt} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm py-8">No free prompts found.</p>
          )}
        </section>

        {/* ── Subcategories ── */}
        {modelGroup && modelGroup.categories.length > 0 && (
          <section className="container-custom pb-12">
            <h2 className="text-xl font-semibold text-white mb-5">
              Browse by category
            </h2>
            <div className="flex flex-wrap gap-2">
              {modelGroup.categories.map(cat => (
                <Link
                  key={cat}
                  href={`/category/${slug}?category=${encodeURIComponent(cat)}`}
                  className="px-4 py-2 bg-[#232339] border border-[#2a2a45] rounded-full text-sm text-white/70 hover:text-white hover:bg-[#2a2a45] transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(MODEL_META).map(slug => ({ slug }))
}

// Also handle "browse by category" within non-model tabs
export const dynamic = 'force-dynamic'
