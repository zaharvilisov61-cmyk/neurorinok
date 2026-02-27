import Link from 'next/link'
import { PromptCard, PromptCardProps } from '../ui/PromptCard'

interface TrendingPromptsProps {
  prompts: PromptCardProps[]
}

export function TrendingPrompts({ prompts }: TrendingPromptsProps) {
  // Take first 15, numbered column-wise (1,2,3 in col1; 4,5,6 in col2; ...)
  const rankedPrompts = prompts.slice(0, 15).map((prompt, index) => ({
    ...prompt,
    rank: index + 1,
  }))

  return (
    <section className="py-12 bg-bg-primary">
      <div className="container-custom">
        {/* Bordered container */}
        <div
          className="rounded-2xl p-6"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(35,35,57,0.35)' }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Trending Prompts</h2>
            <Link
              href="/marketplace?sort=trending"
              className="text-sm text-accent-blue hover:underline"
            >
              Explore all →
            </Link>
          </div>

          {/* Grid — 5 columns × 3 rows, items flow column-by-column */}
          {rankedPrompts.length === 0 ? (
            <div
              className="overflow-x-auto"
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3, 187px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '280px',
                gap: '1rem',
              }}
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[16px] bg-bg-secondary animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div
              className="overflow-x-auto"
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3, 187px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '280px',
                gap: '1rem',
              }}
            >
              {rankedPrompts.map(prompt => (
                <PromptCard key={prompt.id} {...prompt} />
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Link href="/marketplace?sort=trending" className="btn-outline px-8 py-3">
            View More Trending Prompts
          </Link>
        </div>
      </div>
    </section>
  )
}
