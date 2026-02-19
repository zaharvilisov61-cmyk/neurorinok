// Commission Rates
export const COMMISSION_RATES = {
  MARKETPLACE: 0.2, // 20%
  DIRECT_LINK: 0, // 0%
  AFFILIATE: 0.1, // 10% (configurable)
} as const

// Performance Targets
export const PERFORMANCE_TARGETS = {
  TTFB: 200, // milliseconds
  LCP: 2000, // milliseconds
  LIGHTHOUSE_SCORE: 90,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// DRM
export const DRM = {
  DEFAULT_MAX_ACCESS: 100,
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
} as const

// File Uploads (Cloudinary)
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/mov'],
  THUMBNAIL_SIZES: {
    SMALL: 180,
    MEDIUM: 280,
    LARGE: 500,
  },
} as const

// Cloudinary
export const CLOUDINARY = {
  FOLDER_PROMPTS: 'prompts',
  FOLDER_AVATARS: 'avatars',
  FOLDER_ASSETS: 'assets',
  DEFAULT_QUALITY: 'auto:good',
  DEFAULT_FORMAT: 'auto',
} as const

// Rate Limiting
export const RATE_LIMITS = {
  DEFAULT_TTL: 60, // seconds
  DEFAULT_LIMIT: 100, // requests
  AUTH_TTL: 60,
  AUTH_LIMIT: 5,
} as const

// Platform Emojis
export const PLATFORM_EMOJIS = {
  CHATGPT: '🖌️',
  CLAUDE: '🤖',
  DALLE: '🎨',
  MIDJOURNEY: '⛵',
  SORA: '🎬',
  VEO: '✨',
  GEMINI: '💎',
  FLUX: '⚡',
  STABLE_DIFFUSION: '🎭',
  LEONARDO_AI: '🦁',
  RUNWAY: '🛫',
  GPT4: '🤖',
  GPT35: '🤖',
} as const

// Categories
export const CATEGORIES = [
  'Art',
  'Marketing',
  'Code',
  'Writing',
  'Business',
  'Education',
  'Design',
  'Photography',
  '3D',
  'Animation',
  'Gaming',
  'Music',
  'Video',
  'SEO',
  'Social Media',
  'Email',
  'Copywriting',
  'Blog',
  'Product',
  'Fashion',
  'Food',
  'Travel',
  'Health',
  'Finance',
  'Real Estate',
  'Legal',
  'HR',
  'Sales',
  'Customer Service',
  'Data Analysis',
] as const

// Price Ranges
export const PRICE_RANGES = [
  { label: 'Free', min: 0, max: 0 },
  { label: 'Under $5', min: 0, max: 5 },
  { label: '$5 - $10', min: 5, max: 10 },
  { label: '$10 - $20', min: 10, max: 20 },
  { label: '$20+', min: 20, max: Infinity },
] as const

// Social Proof
export const SOCIAL_PROOF = {
  AVERAGE_RATING: 4.9,
  REVIEW_COUNT: 33000,
  USER_COUNT: 400000,
  PROMPT_COUNT: 240000,
} as const

// Publisher Logos
export const PUBLISHERS = [
  'The Verge',
  'WIRED',
  'FastCompany',
  'TechCrunch',
  'Forbes',
  'Business Insider',
] as const
