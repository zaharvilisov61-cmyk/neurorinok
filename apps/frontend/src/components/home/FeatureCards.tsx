import Link from 'next/link'

const CARDS = [
  {
    title: 'Explore the Marketplace',
    subtitle: 'Browse 260k+ quality, tested prompts',
    href: '/marketplace',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
  },
  {
    title: 'Sell Your Prompts',
    subtitle: 'Create, share and earn',
    href: '/sell',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
  },
  {
    title: 'Get a Custom Prompt',
    subtitle: 'Work with expert prompt engineers',
    href: '/hire',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop',
  },
  {
    title: 'Generate AI Content',
    subtitle: 'Create images, videos, and more',
    href: '/create',
    img: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&auto=format&fit=crop',
  },
]

export function FeatureCards() {
  return (
    <section className="container-custom py-6 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CARDS.map(card => (
          <Link
            key={card.title}
            href={card.href}
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            style={{ height: '180px' }}
          >
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.img}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.5) 50%, rgba(26,26,46,0.2) 100%)',
              }}
            />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm leading-tight">{card.title}</p>
              <p className="text-white/55 text-xs mt-0.5">{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
