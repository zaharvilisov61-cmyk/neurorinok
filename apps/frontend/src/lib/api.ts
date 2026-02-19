import type { UploadResponseDto } from '@promptbase/shared'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  meta?: any
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  const json: ApiResponse<T> = await response.json()

  if (!json.success || !json.data) {
    throw new Error(json.error?.message || 'API request failed')
  }

  return json.data
}

export interface PromptAuthor {
  id: string
  name: string
  username: string
  avatar?: string
}

export interface Prompt {
  id: string
  slug: string
  title: string
  description: string
  thumbnail: string
  platform: string
  category: string
  contentType: string
  price: number
  discount?: number
  originalPrice?: number
  rating: number
  reviewCount: number
  salesCount: number
  favoriteCount: number
  author: PromptAuthor
  createdAt: string
}

export interface SocialProof {
  averageRating: number
  reviewCount: number
  userCount: number
  promptCount: number
}

export const api = {
  prompts: {
    getFeatured: () => fetchAPI<Prompt[]>('/prompts/featured'),
    getTrending: () => fetchAPI<Prompt[]>('/prompts/trending'),
    getAll: (filters?: {
      search?: string
      platform?: string
      category?: string
      sort?: string
    }) => {
      const params = new URLSearchParams()
      if (filters?.search) params.set('search', filters.search)
      if (filters?.platform) params.set('platform', filters.platform)
      if (filters?.category) params.set('category', filters.category)
      if (filters?.sort) params.set('sort', filters.sort)

      const query = params.toString()
      return fetchAPI<Prompt[]>(`/prompts${query ? `?${query}` : ''}`)
    },
    getBySlug: (slug: string) => fetchAPI<Prompt>(`/prompts/${slug}`),
  },
  stats: {
    getSocialProof: () => fetchAPI<SocialProof>('/stats/social-proof'),
  },
  upload: {
    uploadImage: async (
      file: File,
      folder?: string,
    ): Promise<UploadResponseDto> => {
      const formData = new FormData()
      formData.append('file', file)
      if (folder) formData.append('folder', folder)

      const response = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const json = await response.json()
      if (!json.success || !json.data) {
        throw new Error(json.error?.message || 'Upload failed')
      }

      return json.data
    },

    uploadImages: async (
      files: File[],
      folder?: string,
    ): Promise<UploadResponseDto[]> => {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))
      if (folder) formData.append('folder', folder)

      const response = await fetch(`${API_URL}/upload/images`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const json = await response.json()
      if (!json.success || !json.data) {
        throw new Error(json.error?.message || 'Upload failed')
      }

      return json.data
    },
  },
}
