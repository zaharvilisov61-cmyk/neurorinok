ULTRA HARD TECHNICAL SPEC FOR CLAUDE CODE
Full PromptBase Clone (Enterprise / Google-Level)
0) РОЛЬ И ОТВЕТСТВЕННОСТЬ CLAUDE CODE

Ты — автономная команда разработки уровня FAANG.

Твоя задача — создать полный функциональный клон PromptBase:

визуально идентичный

архитектурно масштабируемый

функционально полный

готовый к production

автономный

Ты НЕ имеешь права:

упрощать функционал

делать мок-данные вместо реальных систем

пропускать страницы

менять UX без причины

двигаться дальше без проверки

1) ТЕХНОЛОГИЧЕСКИЙ СТЕК (ЗАПРЕЩЕНО МЕНЯТЬ)
Frontend

TypeScript

React

Next.js (App Router)

TailwindCSS

Radix UI

Zustand / Redux Toolkit

React Query

Framer Motion

Backend

Node.js

NestJS

REST + GraphQL

WebSockets

Database

PostgreSQL (Prisma ORM)

Redis (sessions, cache, queues)

Payments (обязательно)

YooKassa

СБП

MIR

Infrastructure

AWS (S3, RDS, CloudFront)

Vercel

Docker

Nginx

CI/CD (GitHub Actions)

2) АРХИТЕКТУРА СИСТЕМЫ (MANDATORY)
2.1 Общая схема
Browser / Mobile
       ↓
Next.js Frontend
       ↓
API Gateway (NestJS)
       ↓
Microservices Layer
       ↓
PostgreSQL / Redis / S3
       ↓
Payment Providers (YooKassa, SBP, MIR)

2.2 Microservices (обязательные)

Auth Service

User Service

Prompt Service

Marketplace Service

Order Service

Payment Service

Review Service

Search Service

Notification Service

Admin Service

Analytics Service

DRM / Anti-Piracy Service

Affiliate Service

Payout Service

3) MCP-АГЕНТЫ ВНУТРИ CLAUDE CODE (ОБЯЗАТЕЛЬНО)

Claude Code должен создать виртуальных агентов:

Architect Agent — проектирование архитектуры

UI Agent — копирование дизайна PromptBase

Backend Agent — бизнес-логика

DB Agent — БД и оптимизация

QA Agent — сравнение с оригиналом

Security Agent — безопасность

SEO Agent — SEO

DevOps Agent — деплой

Product Agent — UX

Anti-Piracy Agent — защита промтов

Каждый агент обязан:

анализировать результат

писать отчёт

находить расхождения

предлагать улучшения

4) ЖЁСТКИЙ АЛГОРИТМ РАЗРАБОТКИ (ЗАКОН)
🔥 ЗАПРЕЩЕНО создавать сайт целиком сразу.
Для КАЖДОЙ страницы:

Проанализировать оригинал PromptBase

Разложить страницу на компоненты

Реализовать UI (pixel-perfect)

Реализовать backend API

Подключить БД

Заполнить реалистичными данными

Запустить страницу

Сравнить с оригиналом:

UI

UX

функционал

скорость

Рассчитать процент сходства (0–100%)

Сгенерировать QA-отчёт

Дать ссылку на страницу

ОСТАНОВИТЬСЯ И ЖДАТЬ ПОДТВЕРЖДЕНИЯ ПОЛЬЗОВАТЕЛЯ

❗ Если сходство < 95% — страница считается НЕГОТОВОЙ.

5) СПИСОК СТРАНИЦ (ОБЯЗАТЕЛЬНЫЙ)
Public Pages

Home /

Marketplace /marketplace

Prompt Page /prompt/[slug]

Seller Profile /profile/[username]

Categories /category/[model]/[category]

Search /search

Login /login

Register /register

About /about

FAQ /faq

User Pages

Dashboard /dashboard

My Prompts /dashboard/prompts

Favorites /dashboard/favorites

Purchases /dashboard/purchases

Settings /dashboard/settings

Seller Pages

Sell Prompt /sell

Create Prompt /sell/create

Edit Prompt /sell/edit/[id]

Sales Analytics /seller/analytics

Payouts /seller/payouts

E-commerce

Cart /cart

Checkout /checkout

Payment Success /payment/success

Payment Failed /payment/failed

Admin Panel

Admin Dashboard /admin

Users /admin/users

Prompts /admin/prompts

Orders /admin/orders

Payments /admin/payments

Moderation /admin/moderation

6) БИЗНЕС-ЛОГИКА MARKETPLACE
6.1 Покупка промта

Flow:

User selects prompt

Add to cart

Checkout

Payment via YooKassa / SBP / MIR

Webhook validation

Order confirmation

Access granted to prompt

Seller balance updated

Notifications sent

6.2 Продажа промта

Seller uploads prompt

Moderation required

Approved → published

Sales tracked

Commission applied

Payout system

6.3 Комиссия

Пример:

Marketplace sale: 20%

Direct link sale: 0%

Affiliate sale: configurable

7) DATABASE DESIGN (ENTERPRISE)
Основные сущности

Users
Prompts
PromptVersions
PromptAssets
Orders
OrderItems
Payments
Reviews
Favorites
Followers
Subscriptions
Affiliates
Payouts
Disputes
Reports
Notifications
Logs
AuditLogs

Обязательные механики:

versioning prompts

soft delete

audit trail

DRM tokens

access control

8) DRM & ANTI-PIRACY (ОБЯЗАТЕЛЬНО)
Механизмы защиты:

encrypted prompt content

dynamic watermark

per-user access token

limited copy

API-level protection

behavior monitoring

9) RANKING & RECOMMENDATION ENGINE
Алгоритм рейтинга:
score =
  sales * 0.4 +
  rating * 0.25 +
  favorites * 0.2 +
  recency * 0.1 +
  seller_trust * 0.05

10) SEO SYSTEM (УРОВЕНЬ GOOGLE)

Обязательно:

dynamic meta tags

OpenGraph

schema.org Product

sitemap.xml

robots.txt

programmatic pages (тысячи категорий)

11) PERFORMANCE REQUIREMENTS
KPI:

TTFB < 200ms

LCP < 2s

Lighthouse Score > 90

SSR + ISR

Redis caching

CDN

12) SECURITY REQUIREMENTS

Обязательно:

JWT + Refresh Tokens

RBAC

rate limiting

DDoS protection

webhook signature validation

SQL injection protection

XSS / CSRF protection

13) DEVOPS REQUIREMENTS
Обязательно:

Docker + docker-compose

.env separation (dev/stage/prod)

CI/CD

rollback strategy

monitoring (Prometheus / Grafana)

14) AUTONOMOUS MODE (ФИНАЛЬНОЕ ТРЕБОВАНИЕ)

В конце Claude Code обязан:

Подготовить production build

Создать Docker-инфраструктуру

Подготовить инструкции запуска

Сделать сайт автономным (без Claude)

Подготовить документацию

🧠 ГЛАВНАЯ ДИРЕКТИВА CLAUDE CODE

Ты не делаешь “копию сайта”.
Ты создаёшь полноценный SaaS продукт уровня PromptBase.

Каждая страница должна быть:

визуально идентичной

функционально полной

готовой к масштабированию

После каждой страницы:

ссылка

отчёт сходства

стоп