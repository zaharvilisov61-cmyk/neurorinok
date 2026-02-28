'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft,
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { api } from '@/lib/api'

type PaymentMethod = 'yookassa' | 'sbp' | 'mir'

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'yookassa',
    label: 'Bank Card',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Visa, Mastercard, МИР',
  },
  {
    id: 'sbp',
    label: 'СБП',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Fast Payment System',
  },
  {
    id: 'mir',
    label: 'МИР Pay',
    icon: <Building2 className="w-5 h-5" />,
    description: 'National card system',
  },
]

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

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Form state
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yookassa')

  // Card fields (for yookassa / mir)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/cart')
    }
  }, [mounted, items, router])

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    )
  }

  const subtotal = totalPrice()

  // Format card number with spaces
  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  // Format expiry MM/YY
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if ((paymentMethod === 'yookassa' || paymentMethod === 'mir') && cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number.')
      return
    }

    setLoading(true)

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('pb_token') : null

      const orderItems = items.map((item) => ({
        promptId: item.id,
        slug: item.slug,
        title: item.title,
        thumbnail: item.thumbnail,
        platform: item.platform,
        price: item.price,
        authorName: item.authorName,
      }))

      const order = await api.orders.create(orderItems, paymentMethod, token ?? undefined)

      // Simulate payment processing delay
      await new Promise((res) => setTimeout(res, 1500))

      // 95% success rate simulation
      const success = Math.random() > 0.05

      if (success) {
        clearCart()
        router.push(`/payment/success?orderId=${order.id}&total=${subtotal.toFixed(2)}`)
      } else {
        router.push(`/payment/failed?orderId=${order.id}`)
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <div
        className="border-b border-[#2a2a45] sticky top-0 z-40 backdrop-blur-md"
        style={{ background: 'rgba(26,26,46,0.9)' }}
      >
        <div className="container-custom h-14 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" />
            Back to cart
          </Link>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Lock className="w-3.5 h-3.5 text-[#6ed654]" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── Left: form ── */}
            <div className="flex flex-col gap-6">

              {/* Contact */}
              <section className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">Contact Information</h2>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-[#2a2a45] focus:border-[#96daff]/50 transition-colors"
                    style={{ background: '#1a1a2e' }}
                  />
                  <p className="text-white/30 text-xs mt-1.5">
                    Your receipt and download links will be sent here.
                  </p>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">Payment Method</h2>

                {/* Method tabs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-center"
                      style={{
                        background: paymentMethod === m.id ? 'rgba(150,218,255,0.08)' : '#1a1a2e',
                        borderColor: paymentMethod === m.id ? 'rgba(150,218,255,0.4)' : '#2a2a45',
                        color: paymentMethod === m.id ? '#96daff' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {m.icon}
                      <span className="text-xs font-semibold">{m.label}</span>
                      <span className="text-[10px] opacity-60 leading-tight">{m.description}</span>
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {(paymentMethod === 'yookassa' || paymentMethod === 'mir') && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-white/50 text-xs mb-1.5">Card number</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-[#2a2a45] focus:border-[#96daff]/50 transition-colors font-mono tracking-wider"
                        style={{ background: '#1a1a2e' }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/50 text-xs mb-1.5">Expiry date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-[#2a2a45] focus:border-[#96daff]/50 transition-colors font-mono"
                          style={{ background: '#1a1a2e' }}
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 text-xs mb-1.5">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="•••"
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-[#2a2a45] focus:border-[#96daff]/50 transition-colors font-mono"
                          style={{ background: '#1a1a2e' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1.5">Cardholder name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="IVAN IVANOV"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-[#2a2a45] focus:border-[#96daff]/50 transition-colors uppercase"
                        style={{ background: '#1a1a2e' }}
                      />
                    </div>
                  </div>
                )}

                {/* СБП */}
                {paymentMethod === 'sbp' && (
                  <div className="flex flex-col items-center py-6 gap-4">
                    {/* Fake QR */}
                    <div className="w-44 h-44 rounded-2xl bg-white flex items-center justify-center p-3">
                      <div className="w-full h-full grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div
                            key={i}
                            className="rounded-sm"
                            style={{
                              background: Math.random() > 0.45 ? '#1a1a2e' : 'transparent',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 text-sm font-medium">Scan with your bank app</p>
                      <p className="text-white/35 text-xs mt-0.5">QR code is valid for 10 minutes</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6ed654]/10 border border-[#6ed654]/25">
                      <div className="w-2 h-2 rounded-full bg-[#6ed654] animate-pulse" />
                      <span className="text-[#6ed654] text-xs font-medium">Waiting for payment...</span>
                    </div>
                  </div>
                )}

                {/* Security note */}
                <div className="flex items-center gap-2 mt-5 pt-5 border-t border-[#2a2a45] text-xs text-white/30">
                  <ShieldCheck className="w-4 h-4 text-[#6ed654] flex-shrink-0" />
                  <span>Your payment data is encrypted with 256-bit SSL. We never store your card details.</span>
                </div>
              </section>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ff7676]/10 border border-[#ff7676]/25 text-[#ff7676] text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="sticky top-20 flex flex-col gap-4">
              <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">
                  Order Summary
                  <span className="ml-2 text-xs text-white/35 font-normal">
                    ({items.length} item{items.length > 1 ? 's' : ''})
                  </span>
                </h2>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden bg-[#2a2a45] flex-shrink-0 relative">
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-xs font-medium truncate">{item.title}</p>
                        <p className="text-white/35 text-[10px]">
                          {PLATFORM_EMOJI[item.platform] ?? '🤖'} {item.platform}
                        </p>
                      </div>
                      <span className="text-white text-sm font-semibold flex-shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#2a2a45] mb-4" />

                {/* Totals */}
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Platform fee</span>
                    <span className="text-[#6ed654]">Free</span>
                  </div>
                </div>

                <div className="border-t border-[#2a2a45] mb-5" />

                <div className="flex items-center justify-between mb-5">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-xl">${subtotal.toFixed(2)}</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                  style={{
                    background: loading
                      ? 'rgba(255,118,118,0.4)'
                      : 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)',
                    color: '#1a1a2e',
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-[#1a1a2e]/30 border-t-[#1a1a2e] animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay ${subtotal.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/25 mt-3">
                  By placing your order you agree to our{' '}
                  <Link href="/terms" className="text-white/40 hover:text-white/70 underline">
                    Terms of Service
                  </Link>
                </p>
              </div>

              {/* Trust badges */}
              <div className="bg-[#232339] border border-[#2a2a45] rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6ed654]" />
                  Instant access after payment
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6ed654]" />
                  Commercial use license included
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6ed654]" />
                  30-day money back guarantee
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
