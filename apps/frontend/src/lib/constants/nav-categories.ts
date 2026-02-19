// Category navigation tabs and mega-menu data

export interface ModelGroup {
  label: string
  slug: string
  categories: string[]
}

export interface CategoryTab {
  id: string
  label: string
  iconName: string
  modelGroups?: ModelGroup[]   // Only for "Models" tab
  categories?: string[]        // For other tabs
}

// Subcategories for each AI model group (based on PromptBase)
const CHATGPT_IMAGE_CATS = [
  '3D', 'Abstract', 'Accessory', 'Animal', 'Anime', 'Art', 'Architecture',
  'Avatar', 'Cartoon', 'Celebrity', 'Clothing', 'Clip Art', 'Cute',
  'Cyberpunk', 'Drawing', 'Drink', 'Fantasy', 'Fashion', 'Food', 'Future',
  'Gaming', 'Glass', 'Graphic Design', 'Holiday', 'Icon', 'Illustration',
  'Ink', 'Interior', 'Jewelry', 'Landscape', 'Logo', 'Mockup', 'Monogram',
  'Monster', 'Nature', 'Painting', 'Pattern', 'People', 'Photographic',
  'Pixel Art', 'Poster', 'Product', 'Psychedelic', 'Retro', 'Scary',
  'Space', 'Statue', 'Steampunk', 'Sticker', 'Synthwave', 'Texture',
  'Unique Style', 'Vehicle', 'Wallpaper',
]

const MIDJOURNEY_CATS = [
  '3D', 'Abstract', 'Accessory', 'Animal', 'Anime', 'Architecture', 'Art',
  'Avatar', 'Cartoon', 'Celebrity', 'Character', 'Clothing', 'Concept Art',
  'Cyberpunk', 'Dark Art', 'Drawing', 'Fantasy', 'Fashion', 'Food',
  'Gaming', 'Graphic Design', 'Holiday', 'Illustration', 'Interior',
  'Landscape', 'Logo', 'Nature', 'Painting', 'Pattern', 'People',
  'Photographic', 'Pixel Art', 'Portrait', 'Poster', 'Product',
  'Psychedelic', 'Retro', 'Sci-Fi', 'Space', 'Steampunk', 'Street Art',
  'Surrealism', 'Synthwave', 'Vehicle', 'Watercolor',
]

const CLAUDE_CATS = [
  'Academic Writing', 'Analysis', 'Blog Writing', 'Business', 'Code',
  'Content Marketing', 'Copywriting', 'Creative Writing', 'Data Science',
  'Education', 'Email', 'Legal', 'Marketing', 'Productivity', 'Research',
  'Sales', 'Scriptwriting', 'SEO', 'Social Media', 'Storytelling',
  'Technical Writing', 'Translation',
]

const DALLE_CATS = [
  '3D', 'Abstract', 'Animal', 'Architecture', 'Art', 'Avatar', 'Cartoon',
  'Character', 'Cyberpunk', 'Fantasy', 'Fashion', 'Food', 'Gaming',
  'Illustration', 'Interior', 'Landscape', 'Logo', 'Nature', 'People',
  'Photographic', 'Poster', 'Product', 'Retro', 'Space', 'Sticker',
]

const FLUX_CATS = [
  '3D', 'Abstract', 'Animal', 'Architecture', 'Art', 'Avatar', 'Cartoon',
  'Character', 'Concept Art', 'Cyberpunk', 'Fantasy', 'Fashion',
  'Illustration', 'Landscape', 'Nature', 'People', 'Photographic',
  'Portrait', 'Product', 'Sci-Fi', 'Space', 'Surrealism',
]

const GEMINI_CATS = [
  'Analysis', 'Blog Writing', 'Business', 'Code', 'Content Marketing',
  'Creative Writing', 'Data Analysis', 'Education', 'Marketing',
  'Productivity', 'Research', 'Social Media', 'Storytelling',
]

const STABLE_DIFFUSION_CATS = [
  '3D', 'Abstract', 'Anime', 'Architecture', 'Art', 'Avatar', 'Cartoon',
  'Character', 'Concept Art', 'Cyberpunk', 'Dark Art', 'Fantasy',
  'Illustration', 'Landscape', 'Nature', 'People', 'Photographic',
  'Portrait', 'Sci-Fi', 'Steampunk', 'Surrealism',
]

const CHATGPT_TEXT_CATS = [
  'Academic Writing', 'Blog Writing', 'Business', 'Code', 'Content Marketing',
  'Copywriting', 'Creative Writing', 'Email', 'Education', 'Marketing',
  'Productivity', 'Research', 'Sales', 'SEO', 'Social Media',
  'Technical Writing',
]

export const MODEL_GROUPS: ModelGroup[] = [
  { label: 'All Models prompts', slug: 'all-models', categories: CHATGPT_IMAGE_CATS },
  { label: 'ChatGPT Image prompts', slug: 'chatgpt-image', categories: CHATGPT_IMAGE_CATS },
  { label: 'Claude prompts', slug: 'claude', categories: CLAUDE_CATS },
  { label: 'DALL·E prompts', slug: 'dalle', categories: DALLE_CATS },
  { label: 'DeepSeek prompts', slug: 'deepseek', categories: CHATGPT_TEXT_CATS },
  { label: 'FLUX prompts', slug: 'flux', categories: FLUX_CATS },
  { label: 'Gemini prompts', slug: 'gemini', categories: GEMINI_CATS },
  { label: 'Gemini Image prompts', slug: 'gemini-image', categories: DALLE_CATS },
  { label: 'Midjourney prompts', slug: 'midjourney', categories: MIDJOURNEY_CATS },
  { label: 'Stable Diffusion prompts', slug: 'stable-diffusion', categories: STABLE_DIFFUSION_CATS },
  { label: 'ChatGPT prompts', slug: 'chatgpt', categories: CHATGPT_TEXT_CATS },
]

export const CATEGORY_TABS: CategoryTab[] = [
  {
    id: 'models',
    label: 'Models',
    iconName: 'Bot',
    modelGroups: MODEL_GROUPS,
  },
  {
    id: 'art',
    label: 'Art',
    iconName: 'Palette',
    categories: [
      'Abstract', 'Anime & Manga', 'Character Design', 'Comic Art', 'Concept Art',
      'Dark Art', 'Digital Art', 'Fantasy Art', 'Illustration', 'Minimalist',
      'Oil Painting', 'Pixel Art', 'Pop Art', 'Portrait Art', 'Sci-Fi Art',
      'Sketch & Drawing', 'Street Art', 'Surrealism', 'Vector Art', 'Watercolor',
    ],
  },
  {
    id: 'logos',
    label: 'Logos',
    iconName: 'Diamond',
    categories: [
      '3D Logo', 'Abstract Logo', 'Animated Logo', 'Badge Logo', 'Brand Identity',
      'Business Logo', 'Flat Logo', 'Gaming Logo', 'Icon Design', 'Letter Mark',
      'Mascot Logo', 'Minimalist Logo', 'Modern Logo', 'Monogram', 'Retro Logo',
      'Sports Logo', 'Tech Logo', 'Typography Logo', 'Vintage Logo', 'Word Mark',
    ],
  },
  {
    id: 'graphics',
    label: 'Graphics',
    iconName: 'LayoutGrid',
    categories: [
      'Background', 'Banner', 'Business Card', 'Flyer', 'Gift Card',
      'Greeting Card', 'Infographic', 'Invitation', 'Label Design', 'Menu Design',
      'Pattern', 'Poster', 'Presentation', 'Social Media', 'Sticker',
      'T-Shirt Design', 'Template', 'Thumbnail', 'UI Kit', 'Wallpaper',
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    iconName: 'Zap',
    categories: [
      'Automation', 'Data Analysis', 'Email Templates', 'Goal Setting',
      'Meeting Notes', 'Note Taking', 'Personal Finance', 'Planning',
      'Project Management', 'Research', 'Spreadsheets', 'Task Management',
      'Time Management', 'Workflow', 'Writing Assistant',
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    iconName: 'TrendingUp',
    categories: [
      'Ad Copy', 'Brand Strategy', 'Content Marketing', 'Copywriting',
      'Email Marketing', 'Growth Hacking', 'Influencer Marketing',
      'Market Research', 'PR & Media', 'Sales Funnel', 'SEO', 'Social Media',
      'Video Marketing', 'Viral Marketing', 'Website Copy',
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    iconName: 'Camera',
    categories: [
      'Architecture', 'Drone Photography', 'Event Photography', 'Fashion',
      'Food Photography', 'Landscape', 'Macro Photography', 'Nature',
      'Portrait', 'Product Photography', 'Real Estate', 'Sports',
      'Street Photography', 'Travel Photography', 'Wildlife',
    ],
  },
  {
    id: 'games',
    label: 'Games',
    iconName: 'Gamepad2',
    categories: [
      'Board Game', 'Card Game', 'Character Design', 'Environment Art',
      'Fantasy RPG', 'Game Design', 'Game Lore', 'Game Mechanics',
      'Indie Game', 'Item Design', 'Level Design', 'Mobile Game',
      'NPC Dialogue', 'Puzzle Game', 'Quest Design', 'Sci-Fi', 'Strategy',
      'UI/UX for Games', 'VR Game', 'Weapon Design',
    ],
  },
]
