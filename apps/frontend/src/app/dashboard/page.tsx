'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ShoppingBag,
  Heart,
  DollarSign,
  Star,
  Plus,
  ChevronRight,
  Package,
  TrendingUp,
  Settings,
  LogOut,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { authApi, tokenStorage, type AuthUser } from '@/lib/auth'
import { formatCompactNumber } from '@/lib/utils'

// Mock dashboard stats
const MOCK_STATS = [
  { label: 'Total Purchases', value: '3', icon: ShoppingBag, color: '#96daff' },
  { label: 'Favorites', value: '12', icon: Heart, color: '#ff9a9a' },
  { label: 'Total Spent', value: '$24.97', icon: DollarSign, color: '#a8ff78' },
  { label: 'Reviews Left', value: '1', icon: Star, color: '#ffd7a5' },
]

const MOCK_RECENT_PURCHASES = [
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
]

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', active: true },
  { href: '/dashboard/purchases', label: 'My Purchases' },
  { href: '/dashboard/favorites', label: 'Favorites' },
  { href: '/dashboard/prompts', label: 'My Prompts' },
  { href: '/dashboard/settings', label: 'Settings' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = tokenStorage.get()
    if (!token) {
      router.replace('/login')
      return
    }

    authApi.me(token)
      .then(setUser)
      .catch(() => {
        tokenStorage.remove()
        router.replace('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = () => {
    tokenStorage.remove()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-60 flex-shrink-0">
              {/* User card */}
              <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#3a3a5c] flex items-center justify-center text-white font-semibold text-lg overflow-hidden flex-shrink-0">
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={48} height={48} className="object-cover" />
                    ) : (
                      user.name[0].toUpperCase()
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-white/40 text-xs truncate">@{user.username}</p>
                  </div>
                </div>

                <Link
                  href="/sell/create"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
                >
                  <Plus className="w-4 h-4" />
                  Sell a Prompt
                </Link>
              </div>

              {/* Nav */}
              <nav className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden">
                {NAV_ITEMS.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                      item.active
                        ? 'text-white bg-[#2a2a45]'
                        : 'text-white/50 hover:text-white hover:bg-[#2a2a45]/50'
                    } ${i !== NAV_ITEMS.length - 1 ? 'border-b border-[#2a2a45]/50' : ''}`}
                  >
                    {item.label}
                    {item.active && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 transition-colors border-t border-[#2a2a45]/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </nav>
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* Greeting */}
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-white/45 text-sm mt-1">Here's what's happening with your account</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {MOCK_STATS.map(stat => (
                  <div key={stat.label} className="bg-[#232339] border border-[#2a2a45] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white/45 text-xs">{stat.label}</p>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${stat.color}18` }}
                      >
                        <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent purchases */}
              <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden mb-6">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a45]">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-white/40" />
                    <h2 className="text-white font-semibold text-sm">Recent Purchases</h2>
                  </div>
                  <Link href="/dashboard/purchases" className="text-[#96daff] text-xs hover:underline">
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-[#2a2a45]/50">
                  {MOCK_RECENT_PURCHASES.map(purchase => (
                    <div key={purchase.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#2a2a45]/30 transition-colors">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a45] flex-shrink-0 relative">
                        <Image
                          src={purchase.thumbnail}
                          alt={purchase.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/prompt/${purchase.slug}`}>
                          <p className="text-white text-sm font-medium truncate hover:text-[#96daff] transition-colors">
                            {purchase.title}
                          </p>
                        </Link>
                        <p className="text-white/40 text-xs mt-0.5">{purchase.platform} · {purchase.purchasedAt}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-white text-sm font-semibold">${purchase.price}</p>
                        <span className="text-green-400 text-xs">Downloaded</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Become a seller CTA */}
              <div className="rounded-2xl p-6 border border-[#2a2a45] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1f1a3a 0%, #2a1a4a 100%)' }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#ffd7a5]" />
                    <h3 className="text-white font-semibold">Start selling your prompts</h3>
                  </div>
                  <p className="text-white/50 text-sm mb-4 max-w-md">
                    Turn your AI expertise into income. Join thousands of prompt engineers earning on PromptBase.
                  </p>
                  <Link
                    href="/sell"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
                  >
                    Start Selling
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Decorative */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-10 select-none">💰</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
