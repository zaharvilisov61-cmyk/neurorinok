'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, ShoppingBag, LayoutDashboard } from 'lucide-react'

function SuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId') ?? '—'
  const total = params.get('total') ?? '0.00'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-8 text-center">

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#6ed654]/15 border border-[#6ed654]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#6ed654]" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-white/50 text-sm mb-6">
            Your purchase is complete. You now have instant access to your prompts.
          </p>

          {/* Order details */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/40">Order ID</span>
              <span className="text-white font-mono text-xs">#{orderId}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Amount paid</span>
              <span className="text-[#6ed654] font-bold">${total}</span>
            </div>
          </div>

          <p className="text-white/35 text-xs mb-6">
            A receipt has been sent to your email address. You can access your purchased prompts at any time from your dashboard.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/purchases"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-[#1a1a2e]"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              <Download className="w-4 h-4" />
              View My Purchases
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white/70 border border-[#2a2a45] hover:border-[#3a3a5c] hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2 py-2 text-xs text-white/35 hover:text-white/60 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  )
}
