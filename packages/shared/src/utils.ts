import { RANKING_WEIGHTS } from './types'

/**
 * Calculate ranking score for a prompt
 */
export function calculateRankingScore(factors: {
  sales: number
  rating: number
  favorites: number
  recency: number
  sellerTrust: number
}): number {
  return (
    factors.sales * RANKING_WEIGHTS.sales +
    factors.rating * RANKING_WEIGHTS.rating +
    factors.favorites * RANKING_WEIGHTS.favorites +
    factors.recency * RANKING_WEIGHTS.recency +
    factors.sellerTrust * RANKING_WEIGHTS.sellerTrust
  )
}

/**
 * Calculate recency score (0-1) based on creation date
 */
export function calculateRecencyScore(createdAt: Date): number {
  const now = new Date()
  const daysSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)

  // Exponential decay: score = e^(-days/30)
  // After 30 days, score is ~0.37
  // After 90 days, score is ~0.05
  return Math.exp(-daysSinceCreation / 30)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Generate random string
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Sleep utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry utility with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number
    initialDelay?: number
    maxDelay?: number
    factor?: number
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    factor = 2,
  } = options

  let attempt = 0
  let delay = initialDelay

  while (true) {
    try {
      return await fn()
    } catch (error) {
      attempt++

      if (attempt >= maxAttempts) {
        throw error
      }

      await sleep(Math.min(delay, maxDelay))
      delay *= factor
    }
  }
}
