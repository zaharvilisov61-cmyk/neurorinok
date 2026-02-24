import { Injectable } from '@nestjs/common'
import { PromptsService } from '../prompts/prompts.service'

export interface SellerProfile {
  id: string
  name: string
  username: string
  avatar: string
  banner?: string
  bio: string
  verified: boolean
  totalSales: number
  totalPrompts: number
  rating: number
  reviewCount: number
  followers: number
  following: number
  memberSince: string
}

@Injectable()
export class SellersService {
  // Mock seller extended profiles (keyed by username)
  private sellerProfiles: Record<string, Omit<SellerProfile, 'totalPrompts' | 'totalSales'>> = {
    artpromptmaster: {
      id: 'a1',
      name: 'Sarah Johnson',
      username: 'artpromptmaster',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Professional digital artist and prompt engineer with 5+ years of experience. Specializing in Midjourney v6 and vintage aesthetics. Every prompt is tested 100+ times for consistent results.',
      verified: true,
      rating: 5.0,
      reviewCount: 142,
      followers: 1240,
      following: 83,
      memberSince: '2024-01-15T00:00:00Z',
    },
    traveldesignpro: {
      id: 'a2',
      name: 'Mike Chen',
      username: 'traveldesignpro',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'Travel enthusiast and graphic designer. Creating playful and vibrant prompts for DALL·E and Midjourney. My prompts have been used in 50+ commercial projects worldwide.',
      verified: false,
      rating: 4.8,
      reviewCount: 89,
      followers: 578,
      following: 120,
      memberSince: '2024-01-20T00:00:00Z',
    },
    futurevisions: {
      id: 'a3',
      name: 'Alex Rivera',
      username: 'futurevisions',
      avatar: 'https://i.pravatar.cc/150?img=33',
      bio: 'Concept artist and AI enthusiast. Pushing the boundaries of generative art with Midjourney. Focused on futuristic cityscapes, sci-fi worlds, and cyberpunk aesthetics.',
      verified: true,
      rating: 5.0,
      reviewCount: 203,
      followers: 3100,
      following: 45,
      memberSince: '2024-01-10T00:00:00Z',
    },
    logomaker: {
      id: 'a4',
      name: 'Emma Watson',
      username: 'logomaker',
      avatar: 'https://i.pravatar.cc/150?img=5',
      bio: 'Brand strategist and logo designer. I create ChatGPT prompts that help entrepreneurs build memorable brand identities. Minimalist design is my philosophy.',
      verified: false,
      rating: 4.5,
      reviewCount: 67,
      followers: 312,
      following: 98,
      memberSince: '2024-01-25T00:00:00Z',
    },
    fantasyartist: {
      id: 'a5',
      name: 'David Kim',
      username: 'fantasyartist',
      avatar: 'https://i.pravatar.cc/150?img=14',
      bio: 'Game artist and fantasy illustrator. My Midjourney prompts are battle-tested for game asset production. Epic characters, detailed armor, and magical effects guaranteed.',
      verified: true,
      rating: 5.0,
      reviewCount: 312,
      followers: 5670,
      following: 32,
      memberSince: '2024-01-05T00:00:00Z',
    },
    productshots: {
      id: 'a6',
      name: 'Lisa Anderson',
      username: 'productshots',
      avatar: 'https://i.pravatar.cc/150?img=9',
      bio: 'Commercial photographer turned AI prompt specialist. My product photography prompts deliver studio-quality results every time. Perfect for e-commerce and marketing.',
      verified: true,
      rating: 4.9,
      reviewCount: 156,
      followers: 2100,
      following: 67,
      memberSince: '2024-01-18T00:00:00Z',
    },
    cyberartist: {
      id: 'a7',
      name: 'Tom Wilson',
      username: 'cyberartist',
      avatar: 'https://i.pravatar.cc/150?img=13',
      bio: 'Cyberpunk and neon aesthetics enthusiast. Creating vivid, atmospheric scenes for DALL·E. Rain-soaked streets, glowing signs, and high-tech dystopias are my specialty.',
      verified: false,
      rating: 4.7,
      reviewCount: 94,
      followers: 890,
      following: 210,
      memberSince: '2024-01-22T00:00:00Z',
    },
    watercolormaster: {
      id: 'a8',
      name: 'Sophie Martin',
      username: 'watercolormaster',
      avatar: 'https://i.pravatar.cc/150?img=10',
      bio: 'Fine artist and illustrator. Bridging traditional watercolor techniques with AI generation. My prompts capture the delicate transparency and soft blending of real watercolor.',
      verified: false,
      rating: 4.8,
      reviewCount: 121,
      followers: 1450,
      following: 178,
      memberSince: '2024-01-12T00:00:00Z',
    },
    abstractvision: {
      id: 'a9',
      name: 'James Lee',
      username: 'abstractvision',
      avatar: 'https://i.pravatar.cc/150?img=11',
      bio: 'Contemporary abstract artist exploring the intersection of emotion and form. DALL·E prompts crafted to produce gallery-worthy abstract compositions with bold color theory.',
      verified: false,
      rating: 4.6,
      reviewCount: 78,
      followers: 540,
      following: 155,
      memberSince: '2024-01-28T00:00:00Z',
    },
    kawaikreator: {
      id: 'a10',
      name: 'Yuki Tanaka',
      username: 'kawaikreator',
      avatar: 'https://i.pravatar.cc/150?img=16',
      bio: 'Japanese illustrator and kawaii culture ambassador. My Midjourney prompts produce ultra-cute characters perfect for sticker packs, merchandise, and social media content.',
      verified: true,
      rating: 5.0,
      reviewCount: 234,
      followers: 4200,
      following: 89,
      memberSince: '2024-01-08T00:00:00Z',
    },
    archviz: {
      id: 'a11',
      name: 'Robert Johnson',
      username: 'archviz',
      avatar: 'https://i.pravatar.cc/150?img=15',
      bio: 'Architect and 3D visualization specialist. Using Veo to create photorealistic architectural renders for presentations and client pitches. Professional-grade results guaranteed.',
      verified: true,
      rating: 4.9,
      reviewCount: 167,
      followers: 2800,
      following: 41,
      memberSince: '2024-01-14T00:00:00Z',
    },
    retrowave: {
      id: 'a12',
      name: 'Mike Stevens',
      username: 'retrowave',
      avatar: 'https://i.pravatar.cc/150?img=17',
      bio: 'Retro culture enthusiast and graphic designer. Bringing back 80s aesthetic with modern AI tools. Neon grids, synthwave vibes, and nostalgic design — that\'s my world.',
      verified: false,
      rating: 4.4,
      reviewCount: 89,
      followers: 1100,
      following: 320,
      memberSince: '2024-01-30T00:00:00Z',
    },
  }

  constructor(private readonly promptsService: PromptsService) {}

  getProfile(username: string): SellerProfile | undefined {
    const base = this.sellerProfiles[username]
    if (!base) return undefined

    const prompts = this.promptsService.getByAuthor(username)
    const totalSales = prompts.reduce((sum, p) => sum + p.salesCount, 0)

    return {
      ...base,
      totalPrompts: prompts.length,
      totalSales,
    }
  }

  getPrompts(username: string) {
    return this.promptsService.getByAuthor(username)
  }
}
