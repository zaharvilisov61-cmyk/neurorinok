'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Package, TrendingUp, Eye, CheckCircle, X } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

type PromptStatus = 'published' | 'draft' | 'pending'

const MY_PROMPTS: {
  id: string
  slug: string
  title: string
  thumbnail: string
  platform: string
  price: number
  status: PromptStatus
  sales: number
  revenue: number
  views: number
  createdAt: string
}[] = []

const STATUS_STYLES: Record<PromptStatus, string> = {
  published: 'bg-green-500/15 text-green-400 border border-green-500/25',
  draft:     'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  pending:   'bg-blue-500/15 text-blue-400 border border-blue-500/25',
}

export default function MyPromptsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('created') === '1') {
      setShowSuccess(true)
      // Remove the param from URL without re-render
      router.replace('/dashboard/prompts', { scroll: false })
      const t = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(t)
    }
  }, [searchParams, router])

  return (
    <DashboardShell>
      <div>
        {/* Success banner */}
        {showSuccess && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-5 border border-green-500/30 bg-green-500/10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-400 text-sm font-medium">Prompt published successfully!</span>
              <span className="text-green-400/60 text-xs">It will appear in the marketplace shortly.</span>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-green-400/50 hover:text-green-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">My Prompts</h1>
            <p className="text-white/40 text-sm mt-1">
              {MY_PROMPTS.length > 0 ? `${MY_PROMPTS.length} prompts` : 'Start selling your AI prompts'}
            </p>
          </div>
          <Link
            href="/sell/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
          >
            <Plus className="w-4 h-4" />
            New Prompt
          </Link>
        </div>

        {MY_PROMPTS.length === 0 ? (
          /* Empty state — become a seller CTA */
          <div className="space-y-4">
            <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-12 flex flex-col items-center text-center">
              <Package className="w-14 h-14 text-white/15 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">You haven't published any prompts yet</h3>
              <p className="text-white/40 text-sm mb-6 max-w-sm">
                Share your AI expertise and start earning. Creating your first prompt takes just a few minutes.
              </p>
              <Link
                href="/sell/create"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
              >
                <Plus className="w-4 h-4" />
                Create Your First Prompt
              </Link>
            </div>

            {/* Selling tips */}
            <div className="rounded-2xl border border-[#2a2a45] p-6" style={{ background: 'linear-gradient(135deg,#1f1a3a,#2a1a4a)' }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#ffd7a5]" />
                <h4 className="text-white font-semibold text-sm">Tips for successful prompts</h4>
              </div>
              <ul className="space-y-2 text-white/50 text-sm">
                <li className="flex items-start gap-2"><span className="text-[#96daff] mt-0.5">→</span> Use clear, descriptive titles with the main use case</li>
                <li className="flex items-start gap-2"><span className="text-[#96daff] mt-0.5">→</span> Include example outputs to showcase quality</li>
                <li className="flex items-start gap-2"><span className="text-[#96daff] mt-0.5">→</span> Price between $2.99–$9.99 for best conversion</li>
                <li className="flex items-start gap-2"><span className="text-[#96daff] mt-0.5">→</span> Direct sales (no marketplace commission) earn 100%</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-[#232339] border border-[#2a2a45] rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-3 border-b border-[#2a2a45] text-xs text-white/35 uppercase tracking-wide">
              <span>Prompt</span>
              <span>Status</span>
              <span>Sales</span>
              <span>Revenue</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-[#2a2a45]/50">
              {MY_PROMPTS.map(p => (
                <div key={p.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 hover:bg-[#2a2a45]/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#2a2a45] flex-shrink-0 relative">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover" sizes="44px" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/prompt/${p.slug}`}>
                        <p className="text-white text-sm font-medium truncate hover:text-[#96daff]">{p.title}</p>
                      </Link>
                      <p className="text-white/35 text-xs mt-0.5">{p.platform} · ${p.price}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium capitalize ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>

                  <div className="text-center">
                    <p className="text-white text-sm font-semibold">{p.sales}</p>
                    <p className="text-white/35 text-[10px] flex items-center gap-1"><Eye className="w-3 h-3" />{p.views}</p>
                  </div>

                  <p className="text-green-400 text-sm font-semibold">${p.revenue.toFixed(2)}</p>

                  <div className="flex items-center gap-1.5">
                    <Link href={`/sell/edit/${p.id}`} className="p-1.5 rounded-lg bg-[#2a2a45] hover:bg-[#3a3a5c] transition-colors text-white/60 hover:text-white">
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button className="p-1.5 rounded-lg bg-[#2a2a45] hover:bg-red-500/20 transition-colors text-white/60 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
