import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  title: string
  thumbnail: string
  platform: string
  price: number
  authorName: string
}

// Discount tiers matching PromptBase
export const DISCOUNT_TIERS = [
  { items: 2,  pct: 3  },
  { items: 5,  pct: 5  },
  { items: 10, pct: 7  },
  { items: 15, pct: 10 },
]

export function getDiscount(count: number): number {
  let pct = 0
  for (const tier of DISCOUNT_TIERS) {
    if (count >= tier.items) pct = tier.pct
  }
  return pct
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  hasItem: (id: string) => boolean
  totalPrice: () => number
  discountedTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id)
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }))
        }
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      clearCart: () => set({ items: [] }),

      hasItem: (id) => get().items.some((i) => i.id === id),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price, 0),

      discountedTotal: () => {
        const total = get().items.reduce((sum, i) => sum + i.price, 0)
        const pct = getDiscount(get().items.length)
        return total * (1 - pct / 100)
      },
    }),
    {
      name: 'pb_cart',
      partialize: (state) => ({ items: state.items }), // don't persist isOpen
    }
  )
)
