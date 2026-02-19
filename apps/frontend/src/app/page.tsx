import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { FeatureCards } from '@/components/home/FeatureCards'
import { FeaturedPrompts } from '@/components/home/FeaturedPrompts'
import { TrendingPrompts } from '@/components/home/TrendingPrompts'
import { PromptCardProps } from '@/components/ui/PromptCard'
import { api } from '@/lib/api'

// Mock data for development
// Commented out as it's not currently used
/* const MOCK_FEATURED_PROMPTS: PromptCardProps[] = [
  {
    id: '1',
    slug: 'vintage-matchbox-valentine',
    title: 'Vintage Matchbox Valentine Love Art',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 3.99,
    discount: 20,
    originalPrice: 4.99,
    rating: 5,
    reviewCount: 142,
    author: {
      name: 'ArtPromptMaster',
    },
  },
  {
    id: '2',
    slug: 'happy-hoppers-travel-posters',
    title: 'Happy Hoppers Travel Posters',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'ChatGPT',
    price: 5.99,
    rating: 4.8,
    reviewCount: 89,
    author: {
      name: 'TravelDesignPro',
    },
  },
  {
    id: '3',
    slug: 'futuristic-city-concept',
    title: 'Futuristic City Concept Art',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'DALL·E',
    price: 4.99,
    discount: 25,
    originalPrice: 6.65,
    rating: 5,
    reviewCount: 203,
    author: {
      name: 'FutureVisions',
    },
  },
  {
    id: '4',
    slug: 'minimalist-logo-generator',
    title: 'Minimalist Logo Generator',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'ChatGPT',
    price: 2.99,
    rating: 4.5,
    reviewCount: 67,
    author: {
      name: 'LogoMaker',
    },
  },
  {
    id: '5',
    slug: 'fantasy-character-portraits',
    title: 'Fantasy Character Portraits',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 7.99,
    discount: 40,
    originalPrice: 13.32,
    rating: 5,
    reviewCount: 312,
    author: {
      name: 'FantasyArtist',
    },
  },
  {
    id: '6',
    slug: 'product-photography-pro',
    title: 'Product Photography Professional',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 6.99,
    rating: 4.9,
    reviewCount: 156,
    author: {
      name: 'ProductShots',
    },
  },
  {
    id: '7',
    slug: 'neon-cyberpunk-art',
    title: 'Neon Cyberpunk Art Generator',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'DALL·E',
    price: 5.49,
    rating: 4.7,
    reviewCount: 94,
    author: {
      name: 'CyberArtist',
    },
  },
  {
    id: '8',
    slug: 'watercolor-landscape',
    title: 'Watercolor Landscape Paintings',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 4.49,
    rating: 4.8,
    reviewCount: 121,
    author: {
      name: 'WatercolorMaster',
    },
  },
  {
    id: '9',
    slug: 'abstract-modern-art',
    title: 'Abstract Modern Art Creator',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'DALL·E',
    price: 3.49,
    rating: 4.6,
    reviewCount: 78,
    author: {
      name: 'AbstractVision',
    },
  },
  {
    id: '10',
    slug: 'cute-kawaii-characters',
    title: 'Cute Kawaii Character Design',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 2.99,
    discount: 20,
    originalPrice: 3.74,
    rating: 5,
    reviewCount: 234,
    author: {
      name: 'KawaiiKreator',
    },
  },
  {
    id: '11',
    slug: 'architectural-renders',
    title: 'Architectural Rendering Pro',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Veo',
    price: 8.99,
    rating: 4.9,
    reviewCount: 167,
    author: {
      name: 'ArchViz',
    },
  },
  {
    id: '12',
    slug: 'retro-80s-style',
    title: 'Retro 80s Style Graphics',
    thumbnail: 'https://res.cloudinary.com/dlkr6pkmg/image/upload/v1738263000/sample.jpg',
    platform: 'Midjourney',
    price: 0,
    rating: 4.4,
    reviewCount: 89,
    author: {
      name: 'RetroWave',
    },
  },
] */

// const MOCK_TRENDING_PROMPTS: PromptCardProps[] = MOCK_FEATURED_PROMPTS.slice(0, 26).map(
//   (prompt, index) => ({
//     ...prompt,
//     id: `trending-${index + 1}`,
//   })
// )

export default async function HomePage() {
  // Fetch data from API
  const [featuredPrompts, trendingPrompts] = await Promise.all([
    api.prompts.getFeatured().catch(() => []),
    api.prompts.getTrending().catch(() => []),
  ])

  // Map API data to component props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapToCardProps = (prompts: any[]): PromptCardProps[] =>
    prompts.map(prompt => ({
      id: prompt.id,
      slug: prompt.slug,
      title: prompt.title,
      thumbnail: prompt.thumbnail,
      platform: prompt.platform,
      price: prompt.price,
      discount: prompt.discount,
      originalPrice: prompt.originalPrice,
      rating: prompt.rating,
      reviewCount: prompt.reviewCount,
      author: {
        name: prompt.author.name,
        avatar: prompt.author.avatar,
      },
    }))

  const featured = mapToCardProps(featuredPrompts)
  const trending = mapToCardProps(trendingPrompts)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <FeaturedPrompts prompts={featured} />
        <TrendingPrompts prompts={trending} />
      </main>

      <Footer />
    </div>
  )
}
