# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-scale marketplace platform clone of PromptBase - an enterprise-level SaaS product for buying and selling AI prompts. The project follows a strict page-by-page development methodology where each page must be pixel-perfect and functionally complete before moving to the next.

## Technology Stack (MANDATORY - Do Not Change)

**Frontend:**
- TypeScript
- React
- Next.js (App Router)
- TailwindCSS
- Radix UI
- Zustand / Redux Toolkit
- React Query
- Framer Motion

**Backend:**
- Node.js
- NestJS
- REST + GraphQL
- WebSockets

**Database:**
- PostgreSQL (Prisma ORM)
- Redis (sessions, cache, queues)

**Payments (Required):**
- YooKassa
- СБП (Faster Payment System)
- MIR

**Infrastructure:**
- AWS (S3, RDS, CloudFront)
- Vercel
- Docker
- Nginx
- CI/CD (GitHub Actions)

## System Architecture

The system follows a microservices architecture:

```
Browser/Mobile → Next.js Frontend → API Gateway (NestJS) → Microservices Layer → PostgreSQL/Redis/S3 → Payment Providers
```

**Required Microservices:**
- Auth Service
- User Service
- Prompt Service
- Marketplace Service
- Order Service
- Payment Service
- Review Service
- Search Service
- Notification Service
- Admin Service
- Analytics Service
- DRM / Anti-Piracy Service
- Affiliate Service
- Payout Service

## Development Workflow (STRICT REQUIREMENTS)

**🔥 CRITICAL: Never create the entire site at once.**

For EACH page, follow this exact sequence:

1. Analyze the original PromptBase page
2. Break down the page into components
3. Implement pixel-perfect UI
4. Implement backend API
5. Connect database
6. Populate with realistic data
7. Launch the page
8. Compare with original on:
   - UI accuracy
   - UX behavior
   - Functionality
   - Performance
9. Calculate similarity percentage (0-100%)
10. Generate QA report
11. Provide link to the page
12. **STOP AND WAIT FOR USER CONFIRMATION**

❗ If similarity < 95%, the page is considered INCOMPLETE.

## Page Development Order

**Public Pages:**
- `/` - Home
- `/marketplace` - Marketplace
- `/prompt/[slug]` - Prompt Page
- `/profile/[username]` - Seller Profile
- `/category/[model]/[category]` - Categories
- `/search` - Search
- `/login` - Login
- `/register` - Register
- `/about` - About
- `/faq` - FAQ

**User Pages:**
- `/dashboard` - Dashboard
- `/dashboard/prompts` - My Prompts
- `/dashboard/favorites` - Favorites
- `/dashboard/purchases` - Purchases
- `/dashboard/settings` - Settings

**Seller Pages:**
- `/sell` - Sell Prompt
- `/sell/create` - Create Prompt
- `/sell/edit/[id]` - Edit Prompt
- `/seller/analytics` - Sales Analytics
- `/seller/payouts` - Payouts

**E-commerce:**
- `/cart` - Cart
- `/checkout` - Checkout
- `/payment/success` - Payment Success
- `/payment/failed` - Payment Failed

**Admin Panel:**
- `/admin` - Admin Dashboard
- `/admin/users` - Users
- `/admin/prompts` - Prompts
- `/admin/orders` - Orders
- `/admin/payments` - Payments
- `/admin/moderation` - Moderation

## Business Logic

### Purchase Flow
1. User selects prompt
2. Add to cart
3. Checkout
4. Payment via YooKassa/СБП/MIR
5. Webhook validation
6. Order confirmation
7. Access granted to prompt
8. Seller balance updated
9. Notifications sent

### Commission Structure
- Marketplace sale: 20%
- Direct link sale: 0%
- Affiliate sale: configurable

## Database Design

**Core Entities:**
Users, Prompts, PromptVersions, PromptAssets, Orders, OrderItems, Payments, Reviews, Favorites, Followers, Subscriptions, Affiliates, Payouts, Disputes, Reports, Notifications, Logs, AuditLogs

**Required Features:**
- Prompt versioning
- Soft delete
- Audit trail
- DRM tokens
- Access control

## DRM & Anti-Piracy (MANDATORY)

**Protection Mechanisms:**
- Encrypted prompt content
- Dynamic watermark
- Per-user access token
- Limited copy
- API-level protection
- Behavior monitoring

## Ranking Algorithm

```javascript
score =
  sales * 0.4 +
  rating * 0.25 +
  favorites * 0.2 +
  recency * 0.1 +
  seller_trust * 0.05
```

## SEO Requirements

**Mandatory:**
- Dynamic meta tags
- OpenGraph tags
- schema.org Product markup
- sitemap.xml
- robots.txt
- Programmatic pages (thousands of categories)

## Performance Requirements

**KPIs:**
- TTFB < 200ms
- LCP < 2s
- Lighthouse Score > 90
- SSR + ISR
- Redis caching
- CDN integration

## Security Requirements

**Mandatory:**
- JWT + Refresh Tokens
- RBAC (Role-Based Access Control)
- Rate limiting
- DDoS protection
- Webhook signature validation
- SQL injection protection
- XSS / CSRF protection

## DevOps Requirements

**Mandatory:**
- Docker + docker-compose
- .env separation (dev/stage/prod)
- CI/CD pipeline
- Rollback strategy
- Monitoring (Prometheus / Grafana)

## Development Constraints

**PROHIBITED:**
- Simplifying functionality
- Using mock data instead of real systems
- Skipping pages
- Changing UX without justification
- Moving forward without verification
- Creating entire site at once

## Final Deliverables

When complete, the system must be:
1. Production-ready build
2. Docker infrastructure configured
3. Launch instructions documented
4. Autonomous (no Claude dependency)
5. Fully documented

## Virtual Agent Roles

When working on this project, consider these specialized perspectives:

- **Architect Agent** - Architecture design
- **UI Agent** - PromptBase design replication
- **Backend Agent** - Business logic
- **DB Agent** - Database optimization
- **QA Agent** - Comparison with original
- **Security Agent** - Security implementation
- **SEO Agent** - SEO optimization
- **DevOps Agent** - Deployment
- **Product Agent** - UX analysis
- **Anti-Piracy Agent** - Prompt protection

Each perspective should analyze, report, find discrepancies, and suggest improvements.

## Core Directive

This is not a "copy" of a website. This is a full-scale SaaS product at PromptBase level.

Every page must be:
- Visually identical
- Functionally complete
- Ready to scale

After each page: provide link, similarity report, and STOP.
