'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { XCircle, RefreshCw, ShoppingCart, MessageCircle } from 'lucide-react'

function FailedContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId') ?? '—'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-8 text-center">

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#ff7676]/10 border border-[#ff7676]/25 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-[#ff7676]" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
          <p className="text-white/50 text-sm mb-6">
            We couldn't process your payment. No money has been charged. Please try again or use a different payment method.
          </p>

          {/* Order reference */}
          {orderId !== '—' && (
            <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4 mb-6 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Reference ID</span>
                <span className="text-white font-mono text-xs">#{orderId}</span>
              </div>
            </div>
          )}

          {/* Common reasons */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] rounded-xl p-4 mb-6 text-left">
            <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">Common reasons</p>
            <ul className="flex flex-col gap-1.5 text-white/40 text-xs">
              <li>· Insufficient funds</li>
              <li>· Card details entered incorrectly</li>
              <li>· Card blocked by your bank</li>
              <li>· 3D Secure verification failed</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-[#1a1a2e]"
              style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white/70 border border-[#2a2a45] hover:border-[#3a3a5c] hover:text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Back to Cart
            </Link>
            <Link
              href="/faq"
              className="flex items-center justify-center gap-2 py-2 text-xs text-white/35 hover:text-white/60 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={null}>
      <FailedContent />
    </Suspense>
  )
}
