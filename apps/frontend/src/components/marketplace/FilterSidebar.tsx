'use client'

import { MarketplaceFilters } from '@/hooks/useMarketplaceFilters'
import { PRODUCT_TYPES, CONTENT_TYPES, PLATFORMS, CATEGORIES, ADDITIONAL_FILTERS } from '@/lib/constants/marketplace'

interface FilterSidebarProps {
  filters: MarketplaceFilters
  onFilterChange: (key: keyof MarketplaceFilters, value: any) => void
  onClearFilter: (key: keyof MarketplaceFilters) => void
  onClearAll: () => void
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilter,
  onClearAll,
}: FilterSidebarProps) {
  const toggleFilter = (key: 'productTypes' | 'contentTypes' | 'platforms' | 'categories', value: string) => {
    const current = filters[key]
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFilterChange(key, newValue)
  }

  return (
    <div className="bg-bg-secondary rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClearAll}
          className="text-xs text-accent-blue hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Product Type */}
      <FilterSection title="Product Type">
        {PRODUCT_TYPES.map((type) => (
          <Checkbox
            key={type.value}
            label={type.label}
            checked={filters.productTypes.includes(type.value)}
            onChange={() => toggleFilter('productTypes', type.value)}
          />
        ))}
      </FilterSection>

      {/* Content Type */}
      <FilterSection title="Content Type">
        {CONTENT_TYPES.map((type) => (
          <Checkbox
            key={type.value}
            label={type.label}
            checked={filters.contentTypes.includes(type.value)}
            onChange={() => toggleFilter('contentTypes', type.value)}
          />
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <Checkbox
          label="Free only"
          checked={filters.freeOnly}
          onChange={() => onFilterChange('freeOnly', !filters.freeOnly)}
        />
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) => onFilterChange('priceMin', Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-tertiary rounded text-sm outline-none focus:ring-1 focus:ring-accent-blue"
            />
            <span className="text-text-secondary">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax || ''}
              onChange={(e) => onFilterChange('priceMax', Number(e.target.value))}
              className="w-full px-3 py-2 bg-bg-tertiary rounded text-sm outline-none focus:ring-1 focus:ring-accent-blue"
            />
          </div>
        </div>
      </FilterSection>

      {/* AI Models */}
      <FilterSection title="AI Models" collapsible defaultOpen>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {PLATFORMS.map((platform) => (
            <Checkbox
              key={platform}
              label={platform}
              checked={filters.platforms.includes(platform)}
              onChange={() => toggleFilter('platforms', platform)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories" collapsible defaultOpen>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {CATEGORIES.map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={filters.categories.includes(category)}
              onChange={() => toggleFilter('categories', category)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Additional Filters */}
      <FilterSection title="Additional">
        <Checkbox
          label={ADDITIONAL_FILTERS.hasArtistNames}
          checked={filters.hasArtistNames || false}
          onChange={() => onFilterChange('hasArtistNames', !filters.hasArtistNames)}
        />
        <Checkbox
          label={ADDITIONAL_FILTERS.verified}
          checked={filters.verified || false}
          onChange={() => onFilterChange('verified', !filters.verified)}
        />
        <Checkbox
          label={ADDITIONAL_FILTERS.trending}
          checked={filters.trendingOnly || false}
          onChange={() => onFilterChange('trendingOnly', !filters.trendingOnly)}
        />
        <Checkbox
          label={ADDITIONAL_FILTERS.bestseller}
          checked={filters.bestseller || false}
          onChange={() => onFilterChange('bestseller', !filters.bestseller)}
        />
      </FilterSection>
    </div>
  )
}

function FilterSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  collapsible?: boolean
  defaultOpen?: boolean
}) {
  return (
    <div className="border-t border-border pt-4">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer hover:text-text-primary transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border bg-bg-tertiary checked:bg-accent-blue focus:ring-1 focus:ring-accent-blue cursor-pointer"
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}
