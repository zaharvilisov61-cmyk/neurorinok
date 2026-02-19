# PromptBase Clone - Full-Scale AI Prompt Marketplace

A complete, enterprise-level clone of PromptBase built with Next.js, NestJS, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** - Styling
- **Radix UI** - Component primitives
- **Framer Motion** - Animations
- **React Query** - Server state management
- **Zustand** - Client state management

### Backend
- **NestJS** - Node.js framework
- **PostgreSQL** - Primary database
- **Prisma** - ORM
- **Redis** - Caching & queues
- **JWT** - Authentication
- **GraphQL** - API layer

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **AWS S3** - File storage
- **GitHub Actions** - CI/CD

### Payments
- **YooKassa** - Russian payment gateway
- **SBP** - Faster Payment System
- **MIR** - Russian payment system

## 📁 Project Structure

```
neurorinok/
├── apps/
│   ├── frontend/          # Next.js application
│   └── backend/           # NestJS API
├── packages/
│   ├── shared/            # Shared types & utilities
│   ├── database/          # Prisma schema & client
│   └── ui/                # Shared UI components
├── docker/                # Docker configurations
├── .github/workflows/     # CI/CD pipelines
└── CLAUDE.md              # Development guidelines
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd neurorinok
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development infrastructure**
```bash
npm run docker:dev
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- pgAdmin (port 5050)
- Redis Commander (port 8081)

5. **Setup database**
```bash
npm run db:migrate
npm run db:seed
```

6. **Start development servers**
```bash
# Terminal 1 - Frontend
cd apps/frontend
npm run dev

# Terminal 2 - Backend
cd apps/backend
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000
pgAdmin: http://localhost:5050
Redis Commander: http://localhost:8081

## 📝 Available Commands

### Root Level
```bash
npm run dev           # Start all services in dev mode
npm run build         # Build all packages
npm run lint          # Lint all packages
npm run test          # Run all tests
npm run clean         # Clean all node_modules
npm run docker:dev    # Start dev infrastructure
npm run docker:prod   # Start production stack
```

### Database
```bash
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client
npm run db:studio     # Open Prisma Studio
npm run db:seed       # Seed database
```

## 🏗️ Development Workflow

This project follows a **strict page-by-page development methodology**:

### For Each Page:
1. Analyze original PromptBase page
2. Break down into components
3. Implement pixel-perfect UI
4. Implement backend API
5. Connect database
6. Populate realistic data
7. Launch page
8. Compare with original (must be ≥95% similar)
9. Generate QA report
10. **STOP and wait for approval**

### Page Development Order

**Phase 1: Public Pages**
- [x] Analysis complete
- [ ] Home `/`
- [ ] Marketplace `/marketplace`
- [ ] Prompt Page `/prompt/[slug]`
- [ ] Seller Profile `/profile/[username]`
- [ ] Categories `/category/[model]/[category]`

**Phase 2: User Pages**
- [ ] Dashboard `/dashboard`
- [ ] My Prompts `/dashboard/prompts`
- [ ] Purchases `/dashboard/purchases`

**Phase 3: E-commerce**
- [ ] Cart `/cart`
- [ ] Checkout `/checkout`
- [ ] Payment Flow

**Phase 4: Admin**
- [ ] Admin Dashboard `/admin`
- [ ] Moderation `/admin/moderation`

## 🎨 Design System

All design tokens are defined in:
- `apps/frontend/tailwind.config.ts`
- `apps/frontend/src/app/globals.css`
- `PROMPTBASE_ANALYSIS.md` - Full design reference

### Key Design Values
- Primary BG: `#1a1a2e`
- Secondary BG: `#232339`
- Card size: `280x187px` (desktop), `180x120px` (mobile)
- Font: Finlandica
- Border radius: 8px, 16px, 20px

## 🔒 Security Features

- JWT authentication with refresh tokens
- RBAC (Role-Based Access Control)
- Rate limiting (API & Auth)
- DDoS protection via Nginx
- SQL injection protection (Prisma)
- XSS/CSRF protection
- Webhook signature validation
- DRM for prompt content

## 📊 Performance Targets

- TTFB < 200ms
- LCP < 2s
- Lighthouse Score > 90
- SSR + ISR for all pages
- Redis caching
- CDN delivery

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 🚢 Deployment

### Production Build
```bash
npm run build
npm run docker:prod
```

### Environment Variables
See `.env.example` for all required variables.

Critical variables:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `AWS_*` credentials
- Payment provider keys

## 📚 Documentation

- `CLAUDE.md` - Development guidelines for AI assistants
- `PROMPTBASE_ANALYSIS.md` - Complete design reference
- `neuro.md` - Original project specification

## 🤝 Contributing

1. Follow the page-by-page development workflow
2. Each page must be ≥95% similar to original
3. No shortcuts or simplified functionality
4. All features must be production-ready
5. Get approval before moving to next page

## 📄 License

Private project - All rights reserved

## 🆘 Support

For questions or issues, refer to:
- Technical spec: `neuro.md`
- Design guide: `PROMPTBASE_ANALYSIS.md`
- Dev guidelines: `CLAUDE.md`
