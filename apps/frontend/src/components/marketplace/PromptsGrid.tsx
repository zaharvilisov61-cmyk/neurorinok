'use client'

import { useEffect, useState, useRef } from 'react'
import { PromptCard, PromptCardProps } from '../ui/PromptCard'
import { MarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { api } from '@/lib/api'

interface PromptsGridProps {
  filters: MarketplaceFilters
}

export function PromptsGrid({ filters }: PromptsGridProps) {
  const [prompts, setPrompts] = useState<PromptCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Fetch prompts when filters change
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true)
      try {
        const data = await api.prompts.getAll({
          search: filters.search,
          platform: filters.platforms[0], // Simplified for now
          category: filters.categories[0],
          sort: filters.sort,
        })

        // Map API data to PromptCardProps
        const mappedPrompts: PromptCardProps[] = data.map((prompt) => ({
          id: prompt.id,
          slug: prompt.slug,
          title: prompt.title,
          thumbnail: prompt.thumbnail,
          platform: prompt.platform,
          price: prompt.price,
          discount: prompt.discount,
          originalPrice: prompt.originalPrice,
          rating: prompt.rating,
          reviewCount: prompt.reviewCount,
          author: {
            name: prompt.author.name,
            avatar: prompt.author.avatar,
          },
        }))

        setPrompts(mappedPrompts)
        setHasMore(mappedPrompts.length === 20) // Assume 20 per page
      } catch (error) {
        console.error('Failed to fetch prompts:', error)
        setPrompts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
    setPage(1)
  }, [filters])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          // Load more prompts
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, loading])

  if (loading && prompts.length === 0) {
    return (
      <div className="card-grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (prompts.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary mb-4">No prompts found</p>
        <p className="text-sm text-text-secondary">
          Try adjusting your filters or search terms
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="card-grid">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerTarget} className="py-8">
          <div className="card-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function SkeletonCard() {
  return (
    <div className="prompt-card">
      <div className="w-full h-full bg-gradient-skeleton animate-skeleton-pulse" />
    </div>
  )
}
