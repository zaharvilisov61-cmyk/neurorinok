import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DollarSign, Shield, TrendingUp, Zap } from 'lucide-react'

const PERKS = [
  { icon: DollarSign, title: 'Keep 80% of every sale',    desc: 'We charge only 20% commission. Direct-link sales earn 100%.' },
  { icon: TrendingUp, title: '425,000+ buyers waiting',   desc: 'Sell to a global audience of AI enthusiasts and professionals.' },
  { icon: Shield,     title: 'DRM protection built-in',   desc: 'Your prompts are encrypted and watermarked automatically.' },
  { icon: Zap,        title: 'Instant payouts',           desc: 'Get paid quickly via bank transfer, PayPal, or crypto.' },
]

export default function SellPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e]">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-custom py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Turn your AI expertise<br className="hidden md:block" /> into income
          </h1>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of prompt engineers earning on PromptBase. List your first prompt in minutes.
          </p>
          <Link
            href="/sell/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-[#1a1a2e] transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
          >
            Start Selling — It's Free
          </Link>
          <p className="text-white/25 text-sm mt-3">No subscription required · Instant approval</p>
        </section>

        {/* Perks grid */}
        <section className="container-custom pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map(p => (
              <div key={p.title} className="bg-[#232339] border border-[#2a2a45] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(150,218,255,0.12)' }}>
                  <p.icon className="w-5 h-5 text-[#96daff]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{p.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
