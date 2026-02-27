import Link from 'next/link'
import { PromptCard, PromptCardProps } from '../ui/PromptCard'

interface TrendingPromptsProps {
  prompts: PromptCardProps[]
}

export function TrendingPrompts({ prompts }: TrendingPromptsProps) {
  // Add rank to each prompt
  const rankedPrompts = prompts.map((prompt, index) => ({
    ...prompt,
    rank: index + 1,
  }))

  return (
    <section className="py-12 bg-bg-primary">
      <div className="container-custom">
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

        {/* Grid */}
        {rankedPrompts.length === 0 ? (
          <div className="card-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-[280px] h-[187px] rounded-[16px] bg-bg-secondary animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="card-grid">
            {rankedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Link
            href="/marketplace?sort=trending"
            className="btn-outline px-8 py-3"
          >
            View More Trending Prompts
          </Link>
        </div>
      </div>
    </section>
  )
}
