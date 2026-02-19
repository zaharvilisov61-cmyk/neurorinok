'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FilterSidebar } from '@/components/marketplace/FilterSidebar'
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader'
import { PromptsGrid } from '@/components/marketplace/PromptsGrid'
import { MobileFilters } from '@/components/marketplace/MobileFilters'
import { useMarketplaceFilters } from '@/hooks/useMarketplaceFilters'

export default function MarketplacePage() {
  const searchParams = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    activeFilterCount,
  } = useMarketplaceFilters(searchParams)

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-6">
          <div className="flex gap-6">
            {/* Desktop Sidebar - Fixed 350px */}
            <aside className="hidden lg:block w-[350px] flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateFilter}
                  onClearFilter={clearFilter}
                  onClearAll={clearAllFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <MarketplaceHeader
                filters={filters}
                activeFilterCount={activeFilterCount}
                onSortChange={(sort) => updateFilter('sort', sort)}
                onClearFilter={clearFilter}
                onOpenMobileFilters={() => setMobileFiltersOpen(true)}
              />

              <PromptsGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filters Drawer */}
      <MobileFilters
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilter={clearFilter}
        onClearAll={clearAllFilters}
      />
    </div>
  )
}
