// Re-export Prisma enums
// TODO: Uncomment when database package is properly built and linked
// export {
//   UserRole,
//   UserStatus,
//   Platform,
//   ContentType,
//   ProductType,
//   PromptStatus,
//   OrderStatus,
//   PaymentProvider,
//   PaymentMethod,
//   PaymentStatus,
//   ReviewStatus,
//   AffiliateStatus,
//   PayoutMethod,
//   PayoutStatus,
//   ReportReason,
//   ReportStatus,
//   NotificationType,
// } from '@promptbase/database'

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

// Auth Types
export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// Prompt Types
export interface CreatePromptDto {
  title: string
  description: string
  longDescription?: string
  price: number
  platform: string
  category: string
  contentType: string
  productType?: string
  tags: string[]
  content: string
  thumbnail: string
  previewImages: string[]
}

export interface UpdatePromptDto extends Partial<CreatePromptDto> {
  status?: string
}

export interface PromptFilters {
  platforms?: string[]
  categories?: string[]
  contentTypes?: string[]
  productTypes?: string[]
  priceMin?: number
  priceMax?: number
  freeOnly?: boolean
  search?: string
  sort?: 'trending' | 'popular' | 'newest' | 'price_low' | 'price_high'
  page?: number
  limit?: number
}

// Order Types
export interface CreateOrderDto {
  promptIds: string[]
}

export interface OrderSummary {
  subtotal: number
  commission: number
  total: number
  itemCount: number
}

// Review Types
export interface CreateReviewDto {
  promptId: string
  rating: number
  comment?: string
}

// Analytics Types
export interface SellerAnalytics {
  totalSales: number
  totalRevenue: number
  totalPrompts: number
  averageRating: number
  topSellingPrompts: {
    id: string
    title: string
    sales: number
    revenue: number
  }[]
  salesByMonth: {
    month: string
    sales: number
    revenue: number
  }[]
}

// DRM Types
export interface DRMConfig {
  encrypted: boolean
  watermark: string
  accessToken: string
  maxAccess: number
  currentAccess: number
}

// Search Types
export interface SearchFilters extends PromptFilters {}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Ranking Algorithm Types
export interface RankingFactors {
  sales: number
  rating: number
  favorites: number
  recency: number
  sellerTrust: number
}

export const RANKING_WEIGHTS = {
  sales: 0.4,
  rating: 0.25,
  favorites: 0.2,
  recency: 0.1,
  sellerTrust: 0.05,
} as const

// Upload Types
export interface UploadResponseDto {
  id: string
  url: string
  publicId: string
  width: number
  height: number
  format: string
  size: number
  thumbnailUrl: string
}
