'use client'

import { X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { MarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { useState, useRef, useEffect } from 'react'

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
] as const

interface MarketplaceHeaderProps {
  filters: MarketplaceFilters
  activeFilterCount: number
  onSortChange: (sort: MarketplaceFilters['sort']) => void
  onClearFilter: (key: keyof MarketplaceFilters) => void
  onOpenMobileFilters: () => void
}

export function MarketplaceHeader({
  filters,
  activeFilterCount,
  onSortChange,
  onClearFilter,
  onOpenMobileFilters,
}: MarketplaceHeaderProps) {
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentSort = SORT_OPTIONS.find((opt) => opt.value === filters.sort)

  return (
    <div className="mb-6 space-y-4">
      {/* Top Row: Mobile Filter Button + Sort */}
      <div className="flex items-center justify-between">
        {/* Mobile Filter Button */}
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-accent-blue rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Desktop: Results Count */}
        <div className="hidden lg:block text-sm text-text-secondary">
          Showing results
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors min-w-[180px] justify-between"
          >
            <span className="text-sm">{currentSort?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-2 w-[200px] bg-bg-secondary rounded-lg shadow-card p-2 z-10">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value)
                    setSortOpen(false)
                  }}
                  className={`
                    w-full text-left px-4 py-2 rounded text-sm transition-colors
                    ${filters.sort === option.value ? 'bg-accent-blue/20 text-accent-blue' : 'hover:bg-bg-tertiary'}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-secondary">Active filters:</span>

          {/* Product Types */}
          {filters.productTypes.map((type) => (
            <FilterPill
              key={`product-${type}`}
              label={type}
              onRemove={() => {
                const newTypes = filters.productTypes.filter((t) => t !== type)
                onClearFilter('productTypes')
                // Re-apply remaining
              }}
            />
          ))}

          {/* Content Types */}
          {filters.contentTypes.map((type) => (
            <FilterPill
              key={`content-${type}`}
              label={type}
              onRemove={() => {
                const newTypes = filters.contentTypes.filter((t) => t !== type)
                onClearFilter('contentTypes')
              }}
            />
          ))}

          {/* Platforms */}
          {filters.platforms.map((platform) => (
            <FilterPill
              key={`platform-${platform}`}
              label={platform}
              onRemove={() => {
                const newPlatforms = filters.platforms.filter((p) => p !== platform)
                onClearFilter('platforms')
              }}
            />
          ))}

          {/* Categories */}
          {filters.categories.map((category) => (
            <FilterPill
              key={`category-${category}`}
              label={category}
              onRemove={() => {
                const newCategories = filters.categories.filter((c) => c !== category)
                onClearFilter('categories')
              }}
            />
          ))}

          {/* Free Only */}
          {filters.freeOnly && (
            <FilterPill
              label="Free only"
              onRemove={() => onClearFilter('freeOnly')}
            />
          )}

          {/* Price Range */}
          {(filters.priceMin > 0 || filters.priceMax < 1000) && (
            <FilterPill
              label={`$${filters.priceMin} - $${filters.priceMax}`}
              onRemove={() => {
                onClearFilter('priceMin')
                onClearFilter('priceMax')
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 bg-bg-secondary rounded-full text-xs">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:text-accent-red transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}
