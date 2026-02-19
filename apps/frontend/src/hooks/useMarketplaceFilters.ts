import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ReadonlyURLSearchParams } from 'next/navigation'

export interface MarketplaceFilters {
  productTypes: string[]
  contentTypes: string[]
  platforms: string[]
  categories: string[]
  priceMin: number
  priceMax: number
  freeOnly: boolean
  hasArtistNames?: boolean
  verified?: boolean
  trendingOnly?: boolean
  bestseller?: boolean
  sort: 'trending' | 'popular' | 'newest' | 'price_low' | 'price_high'
  search: string
}

const DEFAULT_FILTERS: MarketplaceFilters = {
  productTypes: [],
  contentTypes: [],
  platforms: [],
  categories: [],
  priceMin: 0,
  priceMax: 1000,
  freeOnly: false,
  hasArtistNames: false,
  verified: false,
  trendingOnly: false,
  bestseller: false,
  sort: 'trending',
  search: '',
}

export function useMarketplaceFilters(searchParams: ReadonlyURLSearchParams | null) {
  const router = useRouter()
  const [filters, setFilters] = useState<MarketplaceFilters>(DEFAULT_FILTERS)

  // Parse URL params on mount
  useEffect(() => {
    if (!searchParams) return

    const newFilters: MarketplaceFilters = {
      productTypes: searchParams.get('productTypes')?.split(',').filter(Boolean) || [],
      contentTypes: searchParams.get('contentTypes')?.split(',').filter(Boolean) || [],
      platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
      categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
      priceMin: Number(searchParams.get('priceMin')) || 0,
      priceMax: Number(searchParams.get('priceMax')) || 1000,
      freeOnly: searchParams.get('freeOnly') === 'true',
      hasArtistNames: searchParams.get('hasArtistNames') === 'true',
      verified: searchParams.get('verified') === 'true',
      trendingOnly: searchParams.get('trendingOnly') === 'true',
      bestseller: searchParams.get('bestseller') === 'true',
      sort: (searchParams.get('sort') as MarketplaceFilters['sort']) || 'trending',
      search: searchParams.get('search') || '',
    }

    setFilters(newFilters)
  }, [searchParams])

  // Update URL when filters change
  const syncFiltersToURL = useCallback((newFilters: MarketplaceFilters) => {
    const params = new URLSearchParams()

    if (newFilters.productTypes.length) params.set('productTypes', newFilters.productTypes.join(','))
    if (newFilters.contentTypes.length) params.set('contentTypes', newFilters.contentTypes.join(','))
    if (newFilters.platforms.length) params.set('platforms', newFilters.platforms.join(','))
    if (newFilters.categories.length) params.set('categories', newFilters.categories.join(','))
    if (newFilters.priceMin > 0) params.set('priceMin', newFilters.priceMin.toString())
    if (newFilters.priceMax < 1000) params.set('priceMax', newFilters.priceMax.toString())
    if (newFilters.freeOnly) params.set('freeOnly', 'true')
    if (newFilters.hasArtistNames) params.set('hasArtistNames', 'true')
    if (newFilters.verified) params.set('verified', 'true')
    if (newFilters.trendingOnly) params.set('trendingOnly', 'true')
    if (newFilters.bestseller) params.set('bestseller', 'true')
    if (newFilters.sort !== 'trending') params.set('sort', newFilters.sort)
    if (newFilters.search) params.set('search', newFilters.search)

    router.push(`/marketplace?${params.toString()}`, { scroll: false })
  }, [router])

  const updateFilter = useCallback((key: keyof MarketplaceFilters, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      syncFiltersToURL(newFilters)
      return newFilters
    })
  }, [syncFiltersToURL])

  const toggleArrayFilter = useCallback((key: 'productTypes' | 'contentTypes' | 'platforms' | 'categories', value: string) => {
    setFilters((prev) => {
      const array = prev[key]
      const newArray = array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value]

      const newFilters = { ...prev, [key]: newArray }
      syncFiltersToURL(newFilters)
      return newFilters
    })
  }, [syncFiltersToURL])

  const clearFilter = useCallback((key: keyof MarketplaceFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: DEFAULT_FILTERS[key] }
      syncFiltersToURL(newFilters)
      return newFilters
    })
  }, [syncFiltersToURL])

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    router.push('/marketplace', { scroll: false })
  }, [router])

  const activeFilterCount =
    filters.productTypes.length +
    filters.contentTypes.length +
    filters.platforms.length +
    filters.categories.length +
    (filters.freeOnly ? 1 : 0) +
    (filters.hasArtistNames ? 1 : 0) +
    (filters.verified ? 1 : 0) +
    (filters.trendingOnly ? 1 : 0) +
    (filters.bestseller ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 1000 ? 1 : 0)

  return {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilter,
    clearAllFilters,
    activeFilterCount,
  }
}
