# Настройка Cloudinary для PromptBase Clone

## Что такое Cloudinary?

Cloudinary - это облачный сервис для управления медиа-файлами (изображения, видео), который предоставляет:
- ☁️ Облачное хранилище
- 🚀 CDN для быстрой доставки
- 🖼️ Автоматическая оптимизация изображений
- 🎨 Трансформация изображений на лету (resize, crop, format conversion)
- 🎬 Поддержка видео
- 💰 Бесплатный tier: 25GB хранилища + 25GB bandwidth/месяц

## Пошаговая настройка

### 1. Создайте аккаунт Cloudinary

1. Перейдите на https://cloudinary.com
2. Нажмите "Sign Up" (Регистрация)
3. Можно зарегистрироваться через:
   - Email
   - Google
   - GitHub

### 2. Получите API ключи

После регистрации вы окажетесь в Dashboard:

1. На главной странице Dashboard найдите блок **Account Details**
2. Там будут ваши credentials:
   ```
   Cloud Name: your-cloud-name
   API Key: 123456789012345
   API Secret: AbCdEfGhIjKlMnOpQrStUvWx
   ```

### 3. Создайте Upload Preset

Upload Preset позволяет загружать файлы без подписи (безопасно для frontend):

1. В левом меню выберите **Settings** (⚙️)
2. Перейдите на вкладку **Upload**
3. Прокрутите вниз до **Upload presets**
4. Нажмите **Add upload preset**
5. Настройте preset:
   - **Preset name**: `promptbase-uploads`
   - **Signing Mode**: `Unsigned` ✓
   - **Folder**: `prompts/` (опционально)
   - **Access Mode**: `Public`
   - **Allowed formats**: `jpg`, `png`, `webp`, `gif`, `mp4`, `webm`
   - **Transformations** (опционально):
     - Quality: `auto:good`
     - Format: `auto`
6. Нажмите **Save**

### 4. Добавьте credentials в .env

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Откройте `.env` и заполните:

```bash
# Cloudinary (Image & Video Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"          # Из Dashboard
CLOUDINARY_API_KEY="123456789012345"             # Из Dashboard
CLOUDINARY_API_SECRET="AbCdEfGhIjKlMnOpQrStUvWx" # Из Dashboard
CLOUDINARY_UPLOAD_PRESET="promptbase-uploads"    # Созданный preset
```

### 5. Тестовая загрузка (опционально)

Проверьте, что все работает:

```bash
# Установите cloudinary CLI (опционально)
npm install -g cloudinary-cli

# Настройте CLI
cld config

# Загрузите тестовое изображение
cld uploader upload test-image.jpg
```

## Использование в проекте

### Frontend (Next.js Image)

```tsx
import Image from 'next/image'
import { getThumbnailUrl } from '@promptbase/shared'

export function PromptCard({ publicId }) {
  const imageUrl = getThumbnailUrl(
    publicId,
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    'medium' // 280px
  )

  return (
    <Image
      src={imageUrl}
      alt="Prompt thumbnail"
      width={280}
      height={187}
      loading="lazy"
    />
  )
}
```

### Backend (Upload)

```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Upload file
const result = await cloudinary.uploader.upload(file.path, {
  folder: 'prompts',
  resource_type: 'auto',
})

// result.secure_url - URL изображения
// result.public_id - ID для дальнейшего использования
```

## Структура папок в Cloudinary

Рекомендуемая структура:

```
cloudinary://
├── prompts/              # Основные изображения промптов
│   ├── thumbnails/       # Превью
│   └── assets/           # Дополнительные изображения
├── avatars/              # Аватары пользователей
├── banners/              # Баннеры и промо
└── temp/                 # Временные файлы
```

## Оптимизация изображений

Cloudinary автоматически:
- Конвертирует в WebP для браузеров с поддержкой
- Применяет сжатие без потери качества
- Адаптирует размер под устройство
- Кеширует через CDN

### Примеры трансформаций:

```typescript
// Responsive thumbnail
const url = buildCloudinaryUrl(publicId, {
  cloudName: 'your-cloud-name',
  width: 280,
  height: 187,
  crop: 'fill',
  gravity: 'auto',
  quality: 'auto',
  format: 'webp',
})

// Avatar круглый
const avatar = buildCloudinaryUrl(publicId, {
  cloudName: 'your-cloud-name',
  width: 48,
  height: 48,
  crop: 'thumb',
  gravity: 'face',
  radius: 'max',
})
```

## Лимиты бесплатного плана

**Free Plan:**
- ✅ 25 GB хранилища
- ✅ 25 GB bandwidth/месяц
- ✅ 25,000 трансформаций/месяц
- ✅ Unlimited uploads
- ✅ CDN delivery

**Если нужно больше:**
- Plus Plan ($89/месяц): 75GB storage, 150GB bandwidth
- Advanced ($224/месяц): 150GB storage, 300GB bandwidth

Для проекта PromptBase Clone бесплатного плана хватит на начальном этапе.

## Полезные ссылки

- Dashboard: https://console.cloudinary.com
- Documentation: https://cloudinary.com/documentation
- Image Transformations: https://cloudinary.com/documentation/image_transformations
- Upload Presets: https://cloudinary.com/documentation/upload_presets
- React SDK: https://cloudinary.com/documentation/react_integration

## Troubleshooting

### Проблема: Изображения не загружаются

**Решение:**
1. Проверьте, что в `.env` правильные credentials
2. Убедитесь, что Upload Preset создан и `Unsigned`
3. Проверьте Next.js config: `res.cloudinary.com` в `remotePatterns`

### Проблема: 403 Forbidden

**Решение:**
- Upload Preset должен быть `Unsigned`
- Access Mode: `Public`

### Проблема: Медленная загрузка

**Решение:**
- Используйте WebP формат (`f_auto`)
- Добавьте `q_auto` для автоматической оптимизации
- Используйте CDN URL (`res.cloudinary.com`)

---

✅ После настройки Cloudinary вы готовы к загрузке изображений промптов!
