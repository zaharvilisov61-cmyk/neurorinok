'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, ShoppingCart, ShieldCheck } from 'lucide-react'
import { useCartStore, DISCOUNT_TIERS, getDiscount } from '@/store/cartStore'

const PLATFORM_EMOJI: Record<string, string> = {
  Midjourney: '🎨',
  ChatGPT: '💬',
  'DALL·E': '🖼️',
  'Stable Diffusion': '🌀',
  Claude: '🤖',
  Gemini: '✨',
  Sora: '🎬',
  Runway: '🎥',
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCartStore()
  const router = useRouter()

  const count = items.length
  const rawTotal = items.reduce((s, i) => s + i.price, 0)
  const discountPct = getDiscount(count)
  const discountedTotal = rawTotal * (1 - discountPct / 100)

  // Next discount tier
  const nextTier = DISCOUNT_TIERS.find((t) => t.items > count)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-[70] flex flex-col w-full max-w-[460px] transition-transform duration-300"
        style={{
          background: '#1e1e35',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: isOpen ? '-8px 0 40px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-white/70" />
            <span className="text-white font-semibold text-base">Cart</span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-white/20" />
              </div>
              <div className="text-center">
                <p className="text-white/60 font-medium">Your cart is empty</p>
                <p className="text-white/30 text-sm mt-1">Browse the marketplace to find prompts</p>
              </div>
              <Link
                href="/marketplace"
                onClick={closeCart}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e]"
                style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden group" style={{ height: '160px' }}>
                {/* Thumbnail */}
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="460px"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)' }} />

                {/* Platform badge top-left */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                  <span>{PLATFORM_EMOJI[item.platform] ?? '🤖'}</span>
                  <span>{item.platform}</span>
                </div>

                {/* Remove button top-right */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Title + price bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 flex items-end justify-between gap-2">
                  <Link
                    href={`/prompt/${item.slug}`}
                    onClick={closeCart}
                    className="text-white text-sm font-medium leading-tight hover:underline line-clamp-2 flex-1"
                  >
                    {item.title}
                  </Link>
                  <span className="text-white font-bold text-sm flex-shrink-0 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom section */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/10 px-5 pt-4 pb-5 flex flex-col gap-4">

            {/* Discount progress bar */}
            <div>
              {nextTier ? (
                <p className="text-white/60 text-xs mb-2">
                  Add <span className="text-white font-semibold">{nextTier.items - count} more item{nextTier.items - count > 1 ? 's' : ''}</span> to get a{' '}
                  <span className="text-[#6ed654] font-semibold">{nextTier.pct}% discount</span> on your purchase
                </p>
              ) : (
                <p className="text-[#6ed654] text-xs mb-2 font-semibold">
                  Maximum discount applied! 🎉
                </p>
              )}

              {/* Progress track */}
              <div className="relative">
                {/* Track */}
                <div className="h-1 rounded-full bg-white/10 mb-2" />

                {/* Milestones */}
                <div className="flex items-center justify-between">
                  {/* Start marker */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
                      style={{
                        borderColor: count >= 2 ? '#6ed654' : 'rgba(255,255,255,0.2)',
                        background: count >= 2 ? '#6ed654' : 'transparent',
                        color: count >= 2 ? '#1a1a2e' : 'rgba(255,255,255,0.3)',
                      }}>
                      {count >= 2 ? '✓' : count}
                    </div>
                    <span className="text-[10px] text-white/40">-{DISCOUNT_TIERS[0].pct}%</span>
                    <span className="text-[9px] text-white/25">{DISCOUNT_TIERS[0].items} items</span>
                  </div>

                  {DISCOUNT_TIERS.slice(1).map((tier) => (
                    <div key={tier.items} className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
                        style={{
                          borderColor: count >= tier.items ? '#6ed654' : 'rgba(255,255,255,0.2)',
                          background: count >= tier.items ? '#6ed654' : 'transparent',
                          color: count >= tier.items ? '#1a1a2e' : 'rgba(255,255,255,0.3)',
                        }}>
                        {count >= tier.items ? '✓' : '-'}
                      </div>
                      <span className="text-[10px] text-white/40">-{tier.pct}%</span>
                      <span className="text-[9px] text-white/25">{tier.items} items</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Total ({count} item{count > 1 ? 's' : ''})</span>
              <div className="flex items-center gap-2">
                {discountPct > 0 && (
                  <>
                    <span className="text-white/35 line-through text-sm">${rawTotal.toFixed(2)}</span>
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#6ed654]/20 text-[#6ed654]">
                      -{discountPct}%
                    </span>
                  </>
                )}
                <span className="text-white font-bold text-lg">${discountedTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-[#1a1a2e] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              Secure Checkout
            </button>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-2 text-xs text-white/35">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6ed654] flex-shrink-0" />
              <span>
                Get your money back if your prompts don't work.{' '}
                <Link href="/faq" onClick={closeCart} className="underline hover:text-white/60">
                  Learn more
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
