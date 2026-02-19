'use client'

import { X } from 'lucide-react'
import { FilterSidebar } from './FilterSidebar'
import { MarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { useEffect } from 'react'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  filters: MarketplaceFilters
  onFilterChange: (key: keyof MarketplaceFilters, value: any) => void
  onClearFilter: (key: keyof MarketplaceFilters) => void
  onClearAll: () => void
}

export function MobileFilters({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilter,
  onClearAll,
}: MobileFiltersProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-bg-primary z-50 overflow-y-auto lg:hidden">
        {/* Header */}
        <div className="sticky top-0 bg-bg-primary border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilter={onClearFilter}
            onClearAll={onClearAll}
          />
        </div>

        {/* Footer with Apply Button */}
        <div className="sticky bottom-0 bg-bg-primary border-t border-border p-4">
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}
