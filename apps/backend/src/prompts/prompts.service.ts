import { Injectable } from '@nestjs/common'

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
  author: {
    id: string
    name: string
    username: string
    avatar?: string
  }
  createdAt: string
}

@Injectable()
export class PromptsService {
  private prompts: Prompt[] = [
    {
      id: '1',
      slug: 'vintage-matchbox-valentine',
      title: 'Vintage Matchbox Valentine Love Art',
      description: 'Create stunning vintage-style matchbox art with romantic Valentine themes',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
      platform: 'Midjourney',
      category: 'Art',
      contentType: 'image',
      price: 3.99,
      discount: 20,
      originalPrice: 4.99,
      rating: 5,
      reviewCount: 142,
      salesCount: 856,
      favoriteCount: 234,
      author: {
        id: 'a1',
        name: 'Sarah Johnson',
        username: 'artpromptmaster',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      slug: 'happy-hoppers-travel-posters',
      title: 'Happy Hoppers Travel Posters',
      description: 'Generate retro travel posters with cute bunny characters exploring world destinations',
      thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500',
      platform: 'DALL·E',
      category: 'Design',
      contentType: 'image',
      price: 5.99,
      rating: 4.8,
      reviewCount: 89,
      salesCount: 523,
      favoriteCount: 178,
      author: {
        id: 'a10',
        name: 'Yuki Tanaka',
        username: 'kawaikreator',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
      createdAt: '2024-01-20T14:20:00Z',
    },
    {
      id: '3',
      slug: 'futuristic-city-concept',
      title: 'Futuristic City Concept Art',
      description: 'Create breathtaking futuristic cityscapes with neon lights and flying vehicles',
      thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500',
      platform: 'Midjourney',
      category: '3D',
      contentType: 'image',
      price: 4.99,
      discount: 25,
      originalPrice: 6.65,
      rating: 5,
      reviewCount: 203,
      salesCount: 1203,
      favoriteCount: 445,
      author: {
        id: 'a5',
        name: 'David Kim',
        username: 'fantasyartist',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      createdAt: '2024-01-10T08:45:00Z',
    },
    {
      id: '4',
      slug: 'minimalist-logo-generator',
      title: 'Minimalist Logo Generator',
      description: 'Professional minimalist logo designs for startups and modern brands',
      thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500',
      platform: 'ChatGPT',
      category: 'Marketing',
      contentType: 'text',
      price: 2.99,
      rating: 4.5,
      reviewCount: 67,
      salesCount: 334,
      favoriteCount: 92,
      author: {
        id: 'a4',
        name: 'Emma Watson',
        username: 'logomaker',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      createdAt: '2024-01-25T16:10:00Z',
    },
    {
      id: '5',
      slug: 'fantasy-character-portraits',
      title: 'Fantasy Character Portraits',
      description: 'Epic fantasy character portraits with detailed armor and magical effects',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      platform: 'Midjourney',
      category: 'Gaming',
      contentType: 'image',
      price: 7.99,
      discount: 40,
      originalPrice: 13.32,
      rating: 5,
      reviewCount: 312,
      salesCount: 2156,
      favoriteCount: 789,
      author: {
        id: 'a5',
        name: 'David Kim',
        username: 'fantasyartist',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      createdAt: '2024-01-05T12:00:00Z',
    },
    {
      id: '6',
      slug: 'product-photography-pro',
      title: 'Product Photography Professional',
      description: 'Studio-quality product photos with perfect lighting and composition',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      platform: 'Midjourney',
      category: 'Photography',
      contentType: 'image',
      price: 6.99,
      rating: 4.9,
      reviewCount: 156,
      salesCount: 867,
      favoriteCount: 298,
      author: {
        id: 'a6',
        name: 'Lisa Anderson',
        username: 'productshots',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      createdAt: '2024-01-18T09:30:00Z',
    },
    {
      id: '7',
      slug: 'neon-cyberpunk-art',
      title: 'Neon Cyberpunk Art Generator',
      description: 'Vibrant cyberpunk scenes with neon signs and rain-soaked streets',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500',
      platform: 'DALL·E',
      category: 'Art',
      contentType: 'image',
      price: 5.49,
      rating: 4.7,
      reviewCount: 94,
      salesCount: 445,
      favoriteCount: 167,
      author: {
        id: 'a7',
        name: 'Tom Wilson',
        username: 'cyberartist',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      createdAt: '2024-01-22T11:15:00Z',
    },
    {
      id: '8',
      slug: 'watercolor-landscape',
      title: 'Watercolor Landscape Paintings',
      description: 'Beautiful watercolor landscapes with soft colors and dreamy atmospheres',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      platform: 'Midjourney',
      category: 'Art',
      contentType: 'image',
      price: 4.49,
      rating: 4.8,
      reviewCount: 121,
      salesCount: 678,
      favoriteCount: 234,
      author: {
        id: 'a1',
        name: 'Sarah Johnson',
        username: 'artpromptmaster',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      createdAt: '2024-01-12T15:40:00Z',
    },
    {
      id: '9',
      slug: 'abstract-modern-art',
      title: 'Abstract Modern Art Creator',
      description: 'Contemporary abstract art with bold colors and dynamic compositions',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
      platform: 'DALL·E',
      category: 'Art',
      contentType: 'image',
      price: 3.49,
      rating: 4.6,
      reviewCount: 78,
      salesCount: 389,
      favoriteCount: 145,
      author: {
        id: 'a9',
        name: 'James Lee',
        username: 'abstractvision',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      createdAt: '2024-01-28T13:25:00Z',
    },
    {
      id: '10',
      slug: 'cute-kawaii-characters',
      title: 'Cute Kawaii Character Design',
      description: 'Adorable kawaii-style characters perfect for stickers and merchandise',
      thumbnail: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500',
      platform: 'Midjourney',
      category: 'Design',
      contentType: 'image',
      price: 2.99,
      discount: 20,
      originalPrice: 3.74,
      rating: 5,
      reviewCount: 234,
      salesCount: 1445,
      favoriteCount: 567,
      author: {
        id: 'a10',
        name: 'Yuki Tanaka',
        username: 'kawaikreator',
        avatar: 'https://i.pravatar.cc/150?img=16',
      },
      createdAt: '2024-01-08T10:00:00Z',
    },
    {
      id: '11',
      slug: 'architectural-renders',
      title: 'Architectural Rendering Pro',
      description: 'Photorealistic architectural visualizations for modern buildings',
      thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500',
      platform: 'Veo',
      category: '3D',
      contentType: 'video',
      price: 8.99,
      rating: 4.9,
      reviewCount: 167,
      salesCount: 734,
      favoriteCount: 289,
      author: {
        id: 'a11',
        name: 'Robert Johnson',
        username: 'archviz',
        avatar: 'https://i.pravatar.cc/150?img=15',
      },
      createdAt: '2024-01-14T14:50:00Z',
    },
    {
      id: '12',
      slug: 'retro-80s-style',
      title: 'Retro 80s Style Graphics',
      description: 'Nostalgic 80s aesthetic with neon grids and retro wave vibes',
      thumbnail: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500',
      platform: 'Midjourney',
      category: 'Design',
      contentType: 'image',
      price: 0,
      rating: 4.4,
      reviewCount: 89,
      salesCount: 2234,
      favoriteCount: 445,
      author: {
        id: 'a12',
        name: 'Mike Stevens',
        username: 'retrowave',
        avatar: 'https://i.pravatar.cc/150?img=17',
      },
      createdAt: '2024-01-30T09:00:00Z',
    },
    {
      id: '13',
      slug: 'summer-vacation-wall-art',
      title: 'Summer Vacation Wall Art',
      description: 'Beautiful summer vacation scenes perfect for wall art prints',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500',
      platform: 'Midjourney',
      category: 'Art',
      contentType: 'image',
      price: 4.99,
      rating: 4.8,
      reviewCount: 198,
      salesCount: 1876,
      favoriteCount: 512,
      author: {
        id: 'a6',
        name: 'Lisa Anderson',
        username: 'productshots',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      createdAt: '2024-02-01T10:00:00Z',
    },
    {
      id: '14',
      slug: 'cinematic-lifestyle-portraits',
      title: 'Cinematic Lifestyle Portraits',
      description: 'Hollywood-style cinematic portraits with dramatic lighting',
      thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500',
      platform: 'Midjourney',
      category: 'Photography',
      contentType: 'image',
      price: 0,
      rating: 4.9,
      reviewCount: 276,
      salesCount: 1543,
      favoriteCount: 398,
      author: {
        id: 'a7',
        name: 'Tom Wilson',
        username: 'cyberartist',
        avatar: 'https://i.pravatar.cc/150?img=13',
      },
      createdAt: '2024-02-05T14:00:00Z',
    },
    {
      id: '15',
      slug: 'travel-poster-wall-art',
      title: 'Travel Poster Wall Art Pack',
      description: 'Vintage-style travel posters for iconic world destinations',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
      platform: 'Midjourney',
      category: 'Design',
      contentType: 'image',
      price: 4.99,
      discount: 30,
      originalPrice: 7.13,
      rating: 5,
      reviewCount: 341,
      salesCount: 2890,
      favoriteCount: 723,
      author: {
        id: 'a9',
        name: 'James Lee',
        username: 'abstractvision',
        avatar: 'https://i.pravatar.cc/150?img=11',
      },
      createdAt: '2024-02-08T09:30:00Z',
    },
  ]

  getFeatured(): Prompt[] {
    return this.prompts.slice(0, 12)
  }

  getTrending(): Prompt[] {
    return [...this.prompts]
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 26)
  }

  getAll(filters?: {
    search?: string
    platform?: string
    category?: string
    sort?: string
  }): Prompt[] {
    let filtered = [...this.prompts]

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      )
    }

    if (filters?.platform) {
      filtered = filtered.filter(
        p => p.platform.toLowerCase() === filters.platform.toLowerCase()
      )
    }

    if (filters?.category) {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Sort
    if (filters?.sort === 'trending') {
      filtered.sort((a, b) => b.salesCount - a.salesCount)
    } else if (filters?.sort === 'newest') {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if (filters?.sort === 'price_low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (filters?.sort === 'price_high') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }

  getById(id: string): Prompt | undefined {
    return this.prompts.find(p => p.id === id)
  }

  getBySlug(slug: string): Prompt | undefined {
    return this.prompts.find(p => p.slug === slug)
  }

  getByAuthor(username: string): Prompt[] {
    return this.prompts.filter(p => p.author.username === username)
  }
}
