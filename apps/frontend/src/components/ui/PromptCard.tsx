import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { formatPrice, getPlatformEmoji, generateStars } from '@/lib/utils'

export interface PromptCardProps {
  id: string
  slug: string
  title: string
  thumbnail: string
  platform: string
  price: number
  discount?: number
  originalPrice?: number
  rating: number
  reviewCount?: number
  author: {
    name: string
    avatar?: string
  }
  rank?: number
}

export function PromptCard({
  id: _id,
  slug,
  title,
  thumbnail,
  platform,
  price,
  discount,
  originalPrice,
  rating,
  reviewCount,
  author,
  rank,
}: PromptCardProps) {
  const stars = generateStars(rating)
  const platformEmoji = getPlatformEmoji(platform)

  return (
    <Link
      href={`/prompt/${slug}`}
      className="prompt-card relative block"
    >
      {/* Rank Number OR Platform Badge */}
      {rank ? (
        <div className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm rounded-md text-sm font-bold">
          #{rank}
        </div>
      ) : (
        <div className="absolute top-2 left-2 z-10 text-xl">
          {platformEmoji}
        </div>
      )}

      {/* Discount Tag */}
      {discount && (
        <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-accent-red rounded text-xs font-bold">
          −{discount}%
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-full overflow-hidden rounded-md">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1000px) 180px, 280px"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(18, 19, 21, 0) 0%, rgba(18, 19, 21, 0.8) 100%)'
          }}
        />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Title */}
          <h3 className="text-xs font-medium text-white mb-1 line-clamp-1 leading-tight">
            {title}
          </h3>

          {/* Author */}
          <p className="text-[10px] text-white/70 mb-2">
            Posted by {author.name}
          </p>

          {/* Bottom Row: Rating + Price */}
          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {stars.map((filled, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    filled ? 'fill-accent-gold text-accent-gold' : 'text-gray-500'
                  }`}
                />
              ))}
              {reviewCount && (
                <span className="text-[10px] text-text-secondary ml-1">
                  ({reviewCount})
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-[10px] text-text-secondary line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="text-xs font-bold text-white">
                {price === 0 ? 'FREE' : formatPrice(price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
