'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download, ShoppingBag } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

const PURCHASES = [
  {
    id: '1',
    title: 'Vintage Matchbox Valentine Love Art',
    platform: 'Midjourney',
    price: 3.99,
    purchasedAt: 'Feb 20, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=280',
    slug: 'vintage-matchbox-valentine',
  },
  {
    id: '2',
    title: 'Fantasy Character Portraits',
    platform: 'Midjourney',
    price: 7.99,
    purchasedAt: 'Feb 15, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=280',
    slug: 'fantasy-character-portraits',
  },
  {
    id: '3',
    title: 'Minimalist Logo Generator',
    platform: 'ChatGPT',
    price: 2.99,
    purchasedAt: 'Feb 10, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=280',
    slug: 'minimalist-logo-generator',
  },
  {
    id: '4',
    title: 'Watercolor Landscape Paintings',
    platform: 'Midjourney',
    price: 4.49,
    purchasedAt: 'Jan 28, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280',
    slug: 'watercolor-landscape',
  },
  {
    id: '5',
    title: 'Neon Cyberpunk Art Generator',
    platform: 'DALL·E',
    price: 5.49,
    purchasedAt: 'Jan 15, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=280',
    slug: 'neon-cyberpunk-art',
  },
]

export default function PurchasesPage() {
  return (
    <DashboardShell>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">My Purchases</h1>
            <p className="text-white/40 text-sm mt-1">{PURCHASES.length} prompts purchased</p>
          </div>
        </div>

        {PURCHASES.length === 0 ? (
          /* Empty state */
          <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-16 flex flex-col items-center text-center">
            <ShoppingBag className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-white font-semibold mb-2">No purchases yet</h3>
            <p className="text-white/40 text-sm mb-5">Browse the marketplace and find prompts that inspire you.</p>
            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-3 border-b border-[#2a2a45] text-xs text-white/35 uppercase tracking-wide">
              <span>Prompt</span>
              <span className="hidden sm:block">Platform</span>
              <span>Date</span>
              <span>Price</span>
            </div>

            <div className="divide-y divide-[#2a2a45]/50">
              {PURCHASES.map(p => (
                <div
                  key={p.id}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-4 hover:bg-[#2a2a45]/20 transition-colors"
                >
                  {/* Prompt info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#2a2a45] flex-shrink-0 relative">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" sizes="44px" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/prompt/${p.slug}`}>
                        <p className="text-white text-sm font-medium truncate hover:text-[#96daff] transition-colors">
                          {p.title}
                        </p>
                      </Link>
                      <p className="text-white/35 text-xs mt-0.5 sm:hidden">{p.platform}</p>
                    </div>
                  </div>

                  {/* Platform */}
                  <span className="hidden sm:block text-white/50 text-xs">{p.platform}</span>

                  {/* Date */}
                  <span className="text-white/40 text-xs whitespace-nowrap">{p.purchasedAt}</span>

                  {/* Price + download */}
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm font-semibold">${p.price}</span>
                    <button
                      title="Download prompt"
                      className="p-1.5 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a5c] transition-colors text-white/60 hover:text-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer totals */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#2a2a45] bg-[#1e1e32]/40">
              <span className="text-white/35 text-xs">{PURCHASES.length} items total</span>
              <span className="text-white text-sm font-semibold">
                Total: ${PURCHASES.reduce((s, p) => s + p.price, 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
