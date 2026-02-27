'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { PromptCard, PromptCardProps } from '@/components/ui/PromptCard'

const INITIAL_FAVORITES: PromptCardProps[] = [
  {
    id: '1',
    slug: 'vintage-matchbox-valentine',
    title: 'Vintage Matchbox Valentine Love Art',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
    platform: 'Midjourney',
    price: 3.99,
    discount: 20,
    originalPrice: 4.99,
    rating: 5,
    reviewCount: 142,
    author: { name: 'Sarah Johnson' },
  },
  {
    id: '3',
    slug: 'futuristic-city-concept',
    title: 'Futuristic City Concept Art',
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500',
    platform: 'Midjourney',
    price: 4.99,
    discount: 25,
    originalPrice: 6.65,
    rating: 5,
    reviewCount: 203,
    author: { name: 'David Kim' },
  },
  {
    id: '5',
    slug: 'fantasy-character-portraits',
    title: 'Fantasy Character Portraits',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    platform: 'Midjourney',
    price: 7.99,
    discount: 40,
    originalPrice: 13.32,
    rating: 5,
    reviewCount: 312,
    author: { name: 'David Kim' },
  },
  {
    id: '10',
    slug: 'cute-kawaii-characters',
    title: 'Cute Kawaii Character Design',
    thumbnail: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500',
    platform: 'Midjourney',
    price: 2.99,
    discount: 20,
    originalPrice: 3.74,
    rating: 5,
    reviewCount: 234,
    author: { name: 'Yuki Tanaka' },
  },
  {
    id: '7',
    slug: 'neon-cyberpunk-art',
    title: 'Neon Cyberpunk Art Generator',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500',
    platform: 'DALL·E',
    price: 5.49,
    rating: 4.7,
    reviewCount: 94,
    author: { name: 'Tom Wilson' },
  },
  {
    id: '8',
    slug: 'watercolor-landscape',
    title: 'Watercolor Landscape Paintings',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    platform: 'Midjourney',
    price: 4.49,
    rating: 4.8,
    reviewCount: 121,
    author: { name: 'Sarah Johnson' },
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<PromptCardProps[]>(INITIAL_FAVORITES)

  const remove = (id: string) => setFavorites(prev => prev.filter(f => f.id !== id))

  return (
    <DashboardShell>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Favorites</h1>
            <p className="text-white/40 text-sm mt-1">{favorites.length} saved prompts</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-16 flex flex-col items-center text-center">
            <Heart className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-white font-semibold mb-2">No favorites yet</h3>
            <p className="text-white/40 text-sm mb-5">Save prompts you love to find them easily later.</p>
            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="card-grid">
            {favorites.map(prompt => (
              <div key={prompt.id} className="relative group/fav">
                <PromptCard {...prompt} />
                {/* Remove button — appears on hover */}
                <button
                  onClick={() => remove(prompt.id)}
                  title="Remove from favorites"
                  className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center bg-black/60 text-red-400 opacity-0 group-hover/fav:opacity-100 transition-opacity hover:bg-black/80"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
