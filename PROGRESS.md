# PromptBase Clone — Общий план и прогресс разработки

---

## 🎯 Цель проекта
Полноценный клон PromptBase — enterprise SaaS маркетплейс для покупки и продажи AI-промтов.
Визуально идентичный, функционально полный, готовый к production.

---

## 🛠 Технологический стек

### Frontend
- TypeScript + React + Next.js 15 (App Router)
- TailwindCSS + Radix UI + Framer Motion
- Zustand + React Query

### Backend
- Node.js + NestJS
- REST + GraphQL + WebSockets

### База данных
- PostgreSQL (Prisma ORM)
- Redis (сессии, кэш, очереди)

### Платежи
- YooKassa + СБП + MIR

### Инфраструктура
- AWS (S3, RDS, CloudFront) + Vercel
- Docker + Nginx + CI/CD (GitHub Actions)

---

## 📐 Архитектура

```
Browser → Next.js Frontend → API Gateway (NestJS) → Microservices → PostgreSQL/Redis/S3 → Платёжные провайдеры
```

### Микросервисы (обязательные)
Auth, User, Prompt, Marketplace, Order, Payment, Review, Search, Notification, Admin, Analytics, DRM/Anti-Piracy, Affiliate, Payout

---

## 📋 Статус страниц

### Public Pages
| Страница | Статус | Примечания |
|----------|--------|------------|
| `/` — Home | 🟡 В работе | Hero переделан, FeatureCards добавлены, нужен QA |
| `/marketplace` | ✅ Готово | Объединено с category, сортировка, без фильтров |
| `/marketplace/[slug]` | ✅ Готово | Hero + промты + подкатегории, без фильтров |
| `/prompt/[slug]` | ✅ Готово | Preview блок, purchase card, reviews, related prompts, SEO |
| `/profile/[username]` | ✅ Готово | Баннер, аватар, verified badge, статистика, табы, грид промтов, SEO |
| `/search` | ⬜ Не начата | |
| `/login` | ✅ Готово | JWT auth, demo аккаунт, Google OAuth (UI), eye-toggle |
| `/register` | ✅ Готово | Валидация, password rules, Terms/Privacy |
| `/about` | ⬜ Не начата | |
| `/faq` | ⬜ Не начата | |

### User Pages
| Страница | Статус |
|----------|--------|
| `/dashboard` | ✅ Готово | Stats, Recent Purchases, Sell CTA, Sidebar nav, Sign Out |
| `/dashboard/prompts` | ⬜ Не начата |
| `/dashboard/favorites` | ⬜ Не начата |
| `/dashboard/purchases` | ⬜ Не начата |
| `/dashboard/settings` | ⬜ Не начата |

### Seller Pages
| Страница | Статус |
|----------|--------|
| `/sell` | ⬜ Не начата |
| `/sell/create` | ⬜ Не начата |
| `/sell/edit/[id]` | ⬜ Не начата |
| `/seller/analytics` | ⬜ Не начата |
| `/seller/payouts` | ⬜ Не начата |

### E-commerce
| Страница | Статус |
|----------|--------|
| `/cart` | ⬜ Не начата |
| `/checkout` | ⬜ Не начата |
| `/payment/success` | ⬜ Не начата |
| `/payment/failed` | ⬜ Не начата |

### Admin Panel
| Страница | Статус |
|----------|--------|
| `/admin` | ⬜ Не начата |
| `/admin/users` | ⬜ Не начата |
| `/admin/prompts` | ⬜ Не начата |
| `/admin/orders` | ⬜ Не начата |
| `/admin/payments` | ⬜ Не начата |
| `/admin/moderation` | ⬜ Не начата |

---

## ✅ Что уже реализовано

### Инфраструктура
- `apps/backend/.env` и `apps/frontend/.env.local` — созданы
- Backend: `http://localhost:4000` (NestJS, mock-данные в памяти)
- Frontend: `http://localhost:3000` (Next.js 15)
- Docker-конфиги готовы (не запущены)
- Prisma schema — все сущности описаны

### Header + Categories мега-меню
- `apps/frontend/src/components/layout/Header.tsx`
- `apps/frontend/src/components/layout/CategoriesMenu.tsx`
- `apps/frontend/src/lib/constants/nav-categories.ts`

**Поведение:** ховер на `≡ Categories` → таббар (Models/Art/Logos/...) → ховер на таб → мега-меню с моделями и подкатегориями. По умолчанию скрыто.

### Главная страница `/`
- `apps/frontend/src/components/home/Hero.tsx` — левосторонний макет, мозаика изображений справа
- `apps/frontend/src/components/home/FeatureCards.tsx` — 4 карточки (Explore/Sell/Custom/Generate)
- `apps/frontend/src/components/home/FeaturedPrompts.tsx` — карусель
- `apps/frontend/src/components/home/TrendingPrompts.tsx` — топ промтов

### Маркетплейс `/marketplace/[[...slug]]` (объединённая страница)
- `apps/frontend/src/app/marketplace/[[...slug]]/page.tsx`
- **Без slug** → заголовок + сортировка + сетка промтов
- **Со slug** → Hero с градиентом + сортировка + сетка промтов + подкатегории
- Все модели + все табы поддерживаются
- **Без фильтров**: только сортировка (Top / New / Popular)

### Backend mock-данные
- `apps/backend/src/prompts/prompts.service.ts` — 12 промтов в памяти
- `apps/backend/src/stats/stats.service.ts` — статичные цифры (4.9★, 33k отзывов)
- `apps/backend/src/upload/` — Cloudinary интеграция

---

## ❌ Важные решения (не менять)

| Решение | Подробности |
|---------|------------|
| **Фильтров нет** | Ни на `/marketplace`, ни на страницах категорий. `FilterSidebar.tsx` не используется |
| **Стек не менять** | TypeScript, Next.js, NestJS, PostgreSQL, Redis — обязательны |
| **Страницы по очереди** | Каждую страницу делать полностью, QA ≥95% сходства, потом следующая |

---

## 🔜 Следующие шаги (в порядке приоритета)

1. **`/login` + `/register`** — авторизация (JWT)
2. **`/profile/[username]`** — профиль продавца
3. **QA главной страницы** `/` — сравнить с оригиналом PromptBase
4. **Подключить PostgreSQL** — Docker + миграции + seed данные

---

## 🗂 Ключевые файлы

| Файл | Описание |
|------|----------|
| `apps/frontend/src/app/page.tsx` | Главная страница |
| `apps/frontend/src/app/marketplace/[[...slug]]/page.tsx` | Маркетплейс + категории (объединено) |
| `apps/frontend/src/components/layout/Header.tsx` | Хедер (60px) |
| `apps/frontend/src/components/layout/CategoriesMenu.tsx` | Мега-меню |
| `apps/frontend/src/components/home/Hero.tsx` | Hero главной |
| `apps/frontend/src/components/home/FeatureCards.tsx` | 4 feature карточки |
| `apps/frontend/src/components/ui/PromptCard.tsx` | Карточка промта 280×187px |
| `apps/frontend/src/lib/constants/nav-categories.ts` | Данные мега-меню |
| `apps/frontend/tailwind.config.ts` | Дизайн-токены |
| `apps/backend/src/prompts/prompts.service.ts` | Mock данные |
| `packages/database/prisma/schema.prisma` | Схема БД |
| `docker/docker-compose.dev.yml` | Dev инфраструктура |

---

## 💰 Бизнес-логика (справочно)

### Поток покупки
Выбор промта → Корзина → Checkout → Оплата (YooKassa/СБП/MIR) → Webhook → Доступ к промту → Баланс продавца → Уведомления

### Комиссия
- Продажа через маркетплейс: **20%**
- Прямая ссылка: **0%**
- Affiliate: настраиваемо

### Алгоритм рейтинга
```
score = sales×0.4 + rating×0.25 + favorites×0.2 + recency×0.1 + seller_trust×0.05
```

---

## 🔒 Требования безопасности
JWT + Refresh Tokens, RBAC, Rate limiting, DDoS защита, SQL injection защита, XSS/CSRF защита, DRM токены для промтов

## ⚡ Требования производительности
TTFB < 200ms, LCP < 2s, Lighthouse > 90, SSR + ISR, Redis кэш, CDN
