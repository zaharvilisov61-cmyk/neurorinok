'use client'

import { useCartStore } from '@/store/cartStore'

interface Props {
  promptId: string
  slug: string
  title: string
  thumbnail: string
  platform: string
  price: number
  authorName: string
  isFree: boolean
  displayPrice: number
  formattedPrice: string
}

export function BuyNowButton({
  promptId,
  slug,
  title,
  thumbnail,
  platform,
  price: _price,
  authorName,
  isFree,
  displayPrice,
  formattedPrice,
}: Props) {
  const { addItem, hasItem, openCart } = useCartStore()
  const alreadyInCart = hasItem(promptId)

  const handleBuy = () => {
    if (!alreadyInCart) {
      addItem({ id: promptId, slug, title, thumbnail, platform, price: displayPrice, authorName })
    }
    openCart()
  }

  if (isFree) {
    return (
      <button className="w-full py-3.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors text-base">
        Get for Free
      </button>
    )
  }

  return (
    <button
      onClick={handleBuy}
      className="w-full py-3.5 rounded-xl font-semibold text-[#1a1a2e] text-base transition-opacity hover:opacity-90 active:scale-[0.99]"
      style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
    >
      {alreadyInCart ? 'View in Cart' : `Buy Now · ${formattedPrice}`}
    </button>
  )
}

export function BuyNowButtonInline({
  promptId,
  slug,
  title,
  thumbnail,
  platform,
  price: _price,
  authorName,
  isFree,
  displayPrice,
  formattedPrice,
}: Props) {
  const { addItem, hasItem, openCart } = useCartStore()
  const alreadyInCart = hasItem(promptId)

  const handleBuy = () => {
    if (!alreadyInCart) {
      addItem({ id: promptId, slug, title, thumbnail, platform, price: displayPrice, authorName })
    }
    openCart()
  }

  if (isFree) {
    return (
      <button className="px-6 py-2.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-500 transition-colors text-sm">
        Get for Free
      </button>
    )
  }

  return (
    <button
      onClick={handleBuy}
      className="px-6 py-2.5 rounded-xl font-semibold text-[#1a1a2e] text-sm transition-opacity hover:opacity-90"
      style={{ background: 'linear-gradient(122deg,#ffd7a5,#ff9a9a,#ff7676)' }}
    >
      {alreadyInCart ? 'View in Cart' : `Buy for ${formattedPrice}`}
    </button>
  )
}
