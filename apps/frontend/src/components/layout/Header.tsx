'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle, ShoppingCart } from 'lucide-react'
import { CategoriesMenu } from './CategoriesMenu'
import { useCartStore } from '@/store/cartStore'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const items = useCartStore((s) => s.items)
  const openCart = useCartStore((s) => s.openCart)

  // Avoid SSR hydration mismatch
  useEffect(() => {
    setCartCount(items.length)
  }, [items])

  return (
    <header
      className="sticky top-0 z-50 bg-bg-secondary border-b border-border"
      style={{ height: '60px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <div className="container-custom h-full flex items-center justify-between">
        {/* Left: Logo + Categories */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-6 h-6 bg-gradient-primary rounded" />
            <span className="text-lg font-semibold">PromptBase</span>
          </Link>
          <div className="hidden md:block">
            <CategoriesMenu />
          </div>
        </div>

        {/* Right: nav links + icons */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/hire" className="text-sm hover:text-accent-blue transition-colors">
            Hire
          </Link>
          <Link href="/create" className="text-sm hover:text-accent-blue transition-colors">
            Create
          </Link>
          <Link href="/sell" className="text-sm hover:text-accent-blue transition-colors">
            Sell
          </Link>
          <Link href="/login" className="text-sm hover:text-accent-blue transition-colors">
            Login
          </Link>
          {/* Cart icon */}
          <button onClick={openCart} className="relative p-2 hover:bg-bg-tertiary rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-[#1a1a2e]"
                style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <button className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-bg-secondary z-40 p-6 overflow-y-auto"
          style={{ top: '60px' }}
        >
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/marketplace" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
            <Link href="/hire" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Hire</Link>
            <Link href="/create" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Create</Link>
            <Link href="/sell" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Sell</Link>
            <Link href="/login" className="text-lg hover:text-accent-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
