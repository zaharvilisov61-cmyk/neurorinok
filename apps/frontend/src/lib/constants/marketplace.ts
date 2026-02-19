// Marketplace Filter Constants

export const PRODUCT_TYPES = [
  { value: 'prompt', label: 'Prompts' },
  { value: 'bundle', label: 'Bundles' },
  { value: 'app', label: 'Apps' },
] as const

export const CONTENT_TYPES = [
  { value: 'image', label: 'Image' },
  { value: 'text', label: 'Text' },
  { value: 'video', label: 'Video' },
] as const

export const PLATFORMS = [
  'ChatGPT',
  'GPT-4',
  'GPT-4 Turbo',
  'GPT-3.5',
  'Claude',
  'Claude 3 Opus',
  'Claude 3 Sonnet',
  'Midjourney',
  'Midjourney 6.1',
  'Midjourney 6',
  'Midjourney 5.2',
  'DALL·E',
  'DALL·E 3',
  'DALL·E 2',
  'Stable Diffusion',
  'Stable Diffusion XL',
  'Gemini',
  'Gemini Pro',
  'Veo',
  'Veo 2',
  'Sora',
  'FLUX',
  'FLUX Pro',
  'Leonardo AI',
  'Runway',
  'Anthropic',
  'OpenAI',
  'Google',
  'Adobe Firefly',
  'Ideogram',
  'Pika Labs',
  'Llama',
  'Llama 3',
] as const

export const CATEGORIES = [
  // Art & Design (20)
  'Art & Illustration',
  'Digital Art',
  'Abstract Art',
  'Portrait Art',
  'Landscape Art',
  'Character Design',
  'Concept Art',
  'Fantasy Art',
  'Sci-Fi Art',
  'Anime & Manga',
  'Pixel Art',
  'Vector Art',
  'Watercolor',
  'Oil Painting',
  'Sketch & Drawing',
  'Comic Art',
  'Street Art',
  'Pop Art',
  'Minimalist Art',
  'Surrealism',

  // Photography (10)
  'Photography',
  'Product Photography',
  'Portrait Photography',
  'Landscape Photography',
  'Food Photography',
  'Architecture Photography',
  'Fashion Photography',
  'Wildlife Photography',
  'Macro Photography',
  'Street Photography',

  // Design (15)
  'Design',
  'Graphic Design',
  'Logo Design',
  'UI/UX Design',
  'Web Design',
  'App Design',
  'Print Design',
  'Packaging Design',
  'Poster Design',
  'Branding',
  'Typography',
  'Icon Design',
  'Infographic Design',
  'Social Media Design',
  'Presentation Design',

  // Marketing & Business (15)
  'Marketing',
  'Social Media',
  'Content Marketing',
  'Email Marketing',
  'SEO',
  'Copywriting',
  'Ad Copy',
  'Sales',
  'Business',
  'Pitch Decks',
  'Business Plans',
  'Market Research',
  'Analytics',
  'Growth Hacking',
  'Influencer Marketing',

  // Writing & Content (10)
  'Writing',
  'Blog Writing',
  'Creative Writing',
  'Technical Writing',
  'Scriptwriting',
  'Poetry',
  'Storytelling',
  'Journalism',
  'Academic Writing',
  'Proofreading & Editing',

  // Code & Development (10)
  'Code',
  'Web Development',
  'App Development',
  'Game Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Database',
  'API Development',
  'Testing & QA',

  // Education & Learning (5)
  'Education',
  'Online Courses',
  'Tutoring',
  'Study Guides',
  'Research',

  // Entertainment (8)
  'Entertainment',
  'Gaming',
  'Music',
  'Video',
  'Animation',
  'Memes',
  'Humor',
  'Podcasts',

  // Productivity (7)
  'Productivity',
  'Task Management',
  'Note Taking',
  'Time Management',
  'Automation',
  'Workflow',
  'Spreadsheets',

  // 3D & Architecture (5)
  '3D',
  '3D Modeling',
  '3D Animation',
  'Architecture',
  'Interior Design',

  // Lifestyle (10)
  'Fashion',
  'Food & Recipes',
  'Travel',
  'Health & Fitness',
  'Beauty',
  'Home & Garden',
  'Pets',
  'Relationships',
  'Parenting',
  'Personal Finance',
] as const

export const ADDITIONAL_FILTERS = {
  hasArtistNames: 'With Artist Names',
  verified: 'Verified Sellers',
  trending: 'Trending Now',
  featured: 'Featured',
  bestseller: 'Best Seller',
  new: 'New Arrivals',
} as const

// Category slugs mapping
export const CATEGORY_SLUGS: Record<string, string> = {
  'Art & Illustration': 'art-illustration',
  'Digital Art': 'digital-art',
  'Photography': 'photography',
  'Design': 'design',
  'Graphic Design': 'graphic-design',
  'Marketing': 'marketing',
  'Social Media': 'social-media',
  'Writing': 'writing',
  'Code': 'code',
  'Business': 'business',
  '3D': '3d',
  'Architecture': 'architecture',
  'Fashion': 'fashion',
  'Food & Recipes': 'food-recipes',
  'Travel': 'travel',
  'Gaming': 'gaming',
  'Music': 'music',
  'Video': 'video',
  'Education': 'education',
  'Productivity': 'productivity',
}

// Get slug from category name
export function getCategorySlug(category: string): string {
  return CATEGORY_SLUGS[category] || category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
}

// Get category name from slug
export function getCategoryFromSlug(slug: string): string {
  const entry = Object.entries(CATEGORY_SLUGS).find(([_, s]) => s === slug)
  return entry ? entry[0] : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
