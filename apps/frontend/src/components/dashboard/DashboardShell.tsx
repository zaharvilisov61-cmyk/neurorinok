'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ChevronRight, LogOut } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { authApi, tokenStorage, type AuthUser } from '@/lib/auth'

const NAV_ITEMS = [
  { href: '/dashboard',           label: 'Overview' },
  { href: '/dashboard/purchases', label: 'My Purchases' },
  { href: '/dashboard/favorites', label: 'Favorites' },
  { href: '/dashboard/prompts',   label: 'My Prompts' },
  { href: '/dashboard/settings',  label: 'Settings' },
]

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router   = useRouter()
  const pathname = usePathname()
  const [user, setUser]       = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = tokenStorage.get()
    if (!token) { router.replace('/login'); return }

    authApi.me(token)
      .then(setUser)
      .catch(() => { tokenStorage.remove(); router.replace('/login') })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = () => { tokenStorage.remove(); router.push('/') }

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
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                        isActive
                          ? 'text-white bg-[#2a2a45]'
                          : 'text-white/50 hover:text-white hover:bg-[#2a2a45]/50'
                      } ${i !== NAV_ITEMS.length - 1 ? 'border-b border-[#2a2a45]/50' : ''}`}
                    >
                      {item.label}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
                    </Link>
                  )
                })}
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
              {children}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
