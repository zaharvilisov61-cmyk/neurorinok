# PromptBase Complete Analysis & Design Reference

## Executive Summary
PromptBase is an Angular-based marketplace. We will recreate it using React/Next.js with identical visual design and functionality.

---

## 🎨 DESIGN SYSTEM

### Colors
```css
/* Backgrounds */
--bg-primary: #1a1a2e;        /* Main background */
--bg-secondary: #232339;      /* Cards, nav */
--bg-tertiary: #3a3a5c;       /* Inputs, filters */
--border-color: #2a2a45;      /* Borders */

/* Text */
--text-primary: #f8f9fa;      /* Main text */
--text-secondary: rgba(255, 255, 255, 0.7);

/* Accents */
--gradient: linear-gradient(122deg, #ffd7a5 0%, #ff9a9a 50%, #ff7676 100%);
--gold: #e6cc80;
--blue: #96daff;
--green: #6ed654;
--red: #ff7676;

/* Shadows */
--shadow-card: 2px 3px 9px rgba(0, 0, 0, 0.25);
--shadow-hover: 0 5px 20px 10px rgba(0, 0, 0, 0.15);
--shadow-search: 0 2px 6px rgba(0, 0, 0, 0.4);
```

### Typography
```css
font-family: 'Finlandica', system-ui, sans-serif;

/* Sizes */
--h1: 32px / 600;
--h2: 24px / 600;
--h3: 18px / 600;
--body: 14px / 400;
--small: 12px / 400;

line-height: 1.5;
```

### Spacing Scale
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;

/* Layout */
--max-width: 1400px;
--section-padding: 48px 64px;  /* Desktop */
--section-padding-mobile: 32px 16px;
```

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 20px;
```

---

## 📐 COMPONENT SPECIFICATIONS

### Header (60px height)
```tsx
<header>
  - Background: #232339
  - Border-bottom: 1px solid #2a2a45
  - Logo: Left (24px icon)
  - Nav: Categories (dropdown), Hire, Create, Sell, Login
  - Right: Chat icon, Hamburger (mobile)
</header>
```

### Prompt Card (280×187px desktop, 180×120px mobile)
```tsx
{
  width: 280px;
  height: 187px;
  borderRadius: 16px;
  boxShadow: '2px 3px 9px rgba(0,0,0,0.25)';
  transition: 'transform 1s ease';
  hover: {
    transform: 'translateY(-4px)'
  }

  children: [
    - Image (center, transform translate(-50%, -50%))
    - Platform badge (top-left, 12px emoji)
    - Rating (top-right, 10px star icon)
    - Title (12px, white, ellipsis)
    - Author ("Posted by...")
    - Price (12px bold, bottom-right)
    - Discount tag (if applicable, -40% chip)
  ]
}
```

### Button Styles
```tsx
// Primary Button
{
  background: 'linear-gradient(122deg, #ffd7a5, #ff9a9a, #ff7676)';
  borderRadius: 8px;
  padding: '8px 16px';
  fontSize: 18px;
  fontWeight: 600;
  hover: {
    transform: 'translateY(-1px)';
    boxShadow: '0 5px 20px 10px rgba(0,0,0,0.15)'
  }
}

// Outline Button
{
  border: '1px solid rgba(255, 255, 255, 0.3)';
  background: 'transparent';
}

// Small Button
{
  fontSize: 12px;
  padding: 4px;
}
```

### Search Bar (45% width in hero)
```tsx
{
  height: 40px;  // large: 48px
  background: '#3a3a5c';
  borderRadius: '20px 0 0 20px';  // left side

  input: {
    padding: '0 16px';
    border: 'none'
  }

  button: {
    width: 48px;
    background: gradient;
    borderRadius: '0 20px 20px 0'
  }

  focus: {
    boxShadow: '0 2px 6px rgba(58, 151, 212, 0.36)'
  }
}
```

### Filter Sidebar (350px desktop)
```tsx
{
  position: 'fixed';
  width: 350px;
  maxWidth: '90vw';
  background: '#232339';

  sections: [
    'Product Type' (Prompts, Bundles, Apps),
    'Content Type' (Image, Text, Video),
    'Price' (Free toggle),
    'AI Models' (20+ checkboxes),
    'Categories' (80+ checkboxes)
  ]

  mobileMenu: {
    slideFrom: 'left';
    animation: '0.25s ease'
  }
}
```

### Category Badge
```tsx
{
  padding: '8px 16px';
  borderRadius: 16px;
  background: '#3a3a5c';
  fontSize: 12px;

  variants: [
    '⛵ Midjourney',
    '🖌️ ChatGPT Image',
    '✨ Veo',
    '🤖 Claude',
    '🎨 DALL·E'
  ]
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Desktop */
@media (min-width: 1350px) {
  /* Triple column layout */
  grid-template-columns: repeat(auto-fill, 280px);
}

/* Tablet */
@media (max-width: 1350px) {
  /* Block layout */
}

/* Mobile transition */
@media (max-width: 1000px) {
  /* Mobile nav active */
  /* Card width: 180px */
  /* Hide desktop nav */
}

@media (max-width: 800px) {
  /* Reposition logos */
}

@media (max-width: 640px) {
  /* Image sizing adjusted */
  /* Typography reduced */
}
```

---

## 🎬 ANIMATIONS

### Card Hover
```css
transition: transform 1s ease;
hover: translateY(-4px);
```

### Skeleton Loading
```css
background: linear-gradient(270deg, #2a2a45 0%, #3a3a5c 100%);
animation: skeleton-pulse 1.5s ease-in-out infinite;
```

### Carousel Slide
```css
animation: slideDown 0.2s ease-out;
keyframes: {
  from: translateY(-10px);
  to: translateY(0);
}
```

### Gradient Flow
```css
animation: gradient-flow 60s infinite;
background-position: 0% 50% → 100% 50%;
```

---

## 🏗️ PAGE STRUCTURE

### Home Page (/)

```tsx
Layout:
├── Header (fixed, 60px)
├── Hero Section
│   ├── Banner Image (500×500px thumbnails)
│   ├── Headline: "Prompt Marketplace"
│   ├── Subheadline: "Access 240k high-quality AI prompts"
│   ├── Platform Tags (Midjourney, ChatGPT, Veo, Gemini)
│   ├── Social Proof (4.9★ 33,000+ reviews, 400k users)
│   ├── Publisher Logos (The Verge, WIRED, FastCompany, etc.)
│   └── Search Bar (45% width, category dropdown)
├── Featured Prompts Section
│   ├── Title: "Featured Prompts" + "Explore all" link
│   ├── Carousel (12 items, left/right arrows 48px)
│   └── Cards (280×187px)
├── Trending Prompts Section
│   ├── Title: "Trending Prompts"
│   ├── Ranked List (#1-26+)
│   └── Cards with numbers
└── Footer
    ├── Links (organized by category)
    ├── Social Icons (16px)
    └── Copyright
```

### Marketplace Page (/marketplace)

```tsx
Layout:
├── Header
├── Filter Sidebar (350px, fixed left)
│   ├── Product Type
│   ├── Content Type
│   ├── Price Toggle
│   ├── AI Models (20+)
│   └── Categories (80+)
├── Main Content Area
│   ├── Active Filters (removable pills)
│   ├── Sort Dropdown (Trending, Popular, Newest)
│   ├── Results Count
│   ├── Prompt Grid
│   │   ├── 280×187px cards
│   │   ├── 24px horizontal spacing
│   │   └── Infinite scroll
│   └── Loading Skeletons (20 items)
└── Footer
```

---

## 🗄️ DATA STRUCTURE

### Prompt Object
```typescript
interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  discount?: number;  // Percentage
  originalPrice?: number;

  // Media
  thumbnail: string;
  previewImages: string[];

  // Classification
  platform: 'ChatGPT' | 'Midjourney' | 'DALL·E' | 'Claude' | 'Veo' | 'Sora' | 'Gemini' | 'FLUX';
  category: string;
  contentType: 'image' | 'text' | 'video';
  productType: 'prompt' | 'bundle' | 'app';

  // Social
  rating: number;  // 0-5
  reviewCount: number;
  favorites: number;
  sales: number;

  // Author
  authorId: string;
  authorName: string;
  authorAvatar?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'pending' | 'approved' | 'rejected';

  // SEO
  metaTitle?: string;
  metaDescription?: string;
}
```

### Filter State
```typescript
interface FilterState {
  productTypes: ('prompt' | 'bundle' | 'app')[];
  contentTypes: ('image' | 'text' | 'video')[];
  platforms: string[];
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  freeOnly: boolean;
  sort: 'trending' | 'popular' | 'newest' | 'price_low' | 'price_high';
}
```

---

## 🔧 TECHNICAL REQUIREMENTS

### Performance Targets
- TTFB < 200ms
- LCP < 2s
- Lighthouse Score > 90

### Image Strategy
- CDN: AWS CloudFront
- Format: WebP with fallbacks
- Lazy loading: Intersection Observer
- Responsive: Multiple sizes (180px, 280px, 500px)
- Placeholder: Skeleton backgrounds

### SEO
```tsx
Meta Tags per page:
- title: "AI Prompts | PromptBase: The #1 Marketplace for AI Prompts"
- description
- og:image
- og:title
- og:description
- twitter:card
- schema.org Product markup
```

### State Management
- Zustand for global state
- React Query for server state
- URL params for filters (sharable links)

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1: Home Page
1. Header + Navigation
2. Hero Section
3. Featured Prompts Carousel
4. Trending Prompts Grid
5. Footer

### Phase 2: Marketplace
1. Filter Sidebar
2. Grid Layout
3. Infinite Scroll
4. Sort System

### Phase 3: Individual Prompt Page
1. Image Gallery
2. Prompt Details
3. Purchase Flow
4. Reviews Section

---

## 📊 KNOWN DATA POINTS

### AI Models (20+)
ChatGPT, Claude, DALL·E, Midjourney, Sora, Veo, Gemini, FLUX, Stable Diffusion, Leonardo AI, Runway, GPT-4, GPT-3.5, etc.

### Categories (80+)
Art, Marketing, Code, Writing, Business, Education, Design, Photography, 3D, Animation, Gaming, Music, etc.

### Price Range
- Free prompts available
- Paid: $2.99 - $9.99 (typical range)
- Discounts: 20%, 25%, 40% common

### Social Proof
- 4.9★ average rating
- 33,000+ reviews
- 400,000+ users

### Publishers Featured
The Verge, WIRED, FastCompany, TechCrunch, Forbes, Business Insider

---

## ✅ SIMILARITY CHECKLIST

For 95%+ similarity, verify:
- [ ] Exact color values match
- [ ] Font family and sizes match
- [ ] Card dimensions precise (280×187px)
- [ ] Border radius values (8px, 16px, 20px)
- [ ] Shadow effects identical
- [ ] Hover animations (translateY -4px, 1s ease)
- [ ] Spacing follows 8px grid
- [ ] Responsive breakpoints (1350px, 1000px, 800px, 640px)
- [ ] Loading skeleton styles
- [ ] Button gradients match
- [ ] Search bar width (45% in hero)
- [ ] Header height (60px)
- [ ] Filter sidebar (350px)
- [ ] All platform badges present
- [ ] Rating display format
- [ ] Price formatting
- [ ] Discount chip styling
