'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingCart, X, ShieldCheck, Lock, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const PLATFORM_EMOJI: Record<string, string> = {
  Midjourney: '🎨',
  'ChatGPT': '💬',
  'DALL·E': '🖼️',
  'Stable Diffusion': '🌀',
  'Claude': '🤖',
  'Gemini': '✨',
  'Sora': '🎬',
  'Runway': '🎥',
}

export default function CartPage() {
  const { items, removeItem, totalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-custom py-10">
          <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  const subtotal = totalPrice()
  const total = subtotal

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-custom py-10">

        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-6 h-6 text-white/60" />
          <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
          {items.length > 0 && (
            <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2a2a45] text-white/60">
              {items.length}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="w-20 h-20 rounded-full bg-[#232339] border border-[#2a2a45] flex items-center justify-center">
              <ShoppingCart className="w-9 h-9 text-white/20" />
            </div>
            <div className="text-center">
              <h2 className="text-white text-lg font-semibold mb-1">Your cart is empty</h2>
              <p className="text-white/40 text-sm">Browse the marketplace and add prompts you like.</p>
            </div>
            <Link
              href="/marketplace"
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold"
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          /* ── Cart layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── Left: Items list ── */}
            <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a45]">
                <span className="text-white/40 text-xs uppercase tracking-widest font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-white/30 hover:text-[#ff7676] transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#2a2a45]/50">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 px-5 py-4 group hover:bg-[#2a2a45]/10 transition-colors">

                    {/* Thumbnail */}
                    <Link href={`/prompt/${item.slug}`} className="flex-shrink-0">
                      <div className="w-[80px] h-[54px] rounded-xl overflow-hidden bg-[#2a2a45] relative">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/prompt/${item.slug}`}>
                        <p className="text-white text-sm font-medium hover:text-[#96daff] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </p>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm">{PLATFORM_EMOJI[item.platform] ?? '🤖'}</span>
                        <span className="text-white/40 text-xs">{item.platform}</span>
                      </div>
                      <p className="text-white/30 text-xs mt-0.5">by {item.authorName}</p>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-white font-bold text-base">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="p-1 rounded-lg text-white/20 hover:text-[#ff7676] hover:bg-[#ff7676]/10 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="sticky top-6 bg-[#232339] border border-[#2a2a45] rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="text-white font-semibold text-lg">Order Summary</h2>

              {/* Line items */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Platform fee</span>
                  <span className="text-[#6ed654] font-medium">Free</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#2a2a45]" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold text-xl">${total.toFixed(2)}</span>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => router.push('/checkout')}
                className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Continue shopping */}
              <Link
                href="/marketplace"
                className="text-center text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Security badges */}
              <div className="border-t border-[#2a2a45] pt-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs text-white/35">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6ed654] flex-shrink-0" />
                  <span>Secure checkout — SSL encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/35">
                  <Lock className="w-3.5 h-3.5 text-[#96daff] flex-shrink-0" />
                  <span>Instant access after payment</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="flex items-center gap-2 flex-wrap">
                {['YooKassa', 'СБП', 'MIR'].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 rounded-lg text-[10px] font-semibold text-white/50 bg-[#2a2a45] border border-[#3a3a5c]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
