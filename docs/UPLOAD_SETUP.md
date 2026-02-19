# Настройка системы загрузки изображений

## Обзор

Полнофункциональная система загрузки изображений в Cloudinary с поддержкой:
- Одиночной и множественной загрузки
- Drag-and-drop интерфейса
- Превью перед загрузкой
- Валидации на клиенте и сервере
- Автоматической оптимизации изображений

## Предварительные требования

1. Аккаунт в Cloudinary (бесплатный план достаточен для разработки)
2. Node.js 18+ и npm
3. Запущенная база данных PostgreSQL

## Установка

### 1. Получение учетных данных Cloudinary

1. Зарегистрируйтесь на https://cloudinary.com/
2. После входа перейдите в Dashboard
3. Скопируйте следующие данные:
   - Cloud Name
   - API Key
   - API Secret

### 2. Настройка переменных окружения

```bash
cd apps/backend
cp .env.example .env
```

Откройте `.env` и заполните данные Cloudinary:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Установка зависимостей

Зависимости уже установлены, но если потребуется переустановка:

```bash
cd apps/backend
npm install streamifier cloudinary
npm install -D @types/streamifier @types/multer
```

## Структура проекта

### Backend (NestJS)

```
apps/backend/src/upload/
├── upload.module.ts          # NestJS модуль
├── upload.controller.ts      # HTTP endpoints
├── upload.service.ts         # Бизнес-логика
├── cloudinary.service.ts     # Интеграция с Cloudinary SDK
└── dto/
    └── upload-response.dto.ts # Типы ответов
```

### Frontend (Next.js)

```
apps/frontend/src/
├── components/upload/
│   └── ImageUpload.tsx       # UI компонент
├── hooks/
│   └── useUpload.ts          # React Query hooks
└── lib/
    └── api.ts                # API client (расширен методами upload)
```

### Shared

```
packages/shared/src/
└── types.ts                  # UploadResponseDto (общий тип)
```

## API Endpoints

### POST /upload/image
Загрузка одного изображения.

**Request:**
```
Content-Type: multipart/form-data

file: [image file]
folder: string (optional, default: "prompts")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prompts/abc123",
    "url": "https://res.cloudinary.com/.../image/upload/v1234/prompts/abc123.jpg",
    "publicId": "prompts/abc123",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "size": 245678,
    "thumbnailUrl": "https://res.cloudinary.com/.../w_280,h_187,c_fill,q_auto,f_webp/prompts/abc123"
  }
}
```

### POST /upload/images
Загрузка нескольких изображений (до 10).

**Request:**
```
Content-Type: multipart/form-data

files: [image file 1]
files: [image file 2]
...
folder: string (optional)
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": "...", "url": "...", ... },
    { "id": "...", "url": "...", ... }
  ]
}
```

## Валидация

### Типы файлов
- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

### Ограничения
- Максимальный размер файла: **10 MB**
- Максимальное количество файлов за раз: **10**

Валидация работает на двух уровнях:
1. **Frontend** - немедленная обратная связь пользователю
2. **Backend** - защита API от невалидных данных

## Использование

### Пример 1: Загрузка обложки промпта

```tsx
import { ImageUpload } from '@/components/upload/ImageUpload'

function CreatePrompt() {
  const [thumbnail, setThumbnail] = useState('')

  return (
    <ImageUpload
      maxFiles={1}
      folder="prompts/thumbnails"
      onUploadComplete={(results) => {
        setThumbnail(results[0].url)
        console.log('Uploaded:', results[0])
      }}
    />
  )
}
```

### Пример 2: Загрузка нескольких превью

```tsx
import { ImageUpload } from '@/components/upload/ImageUpload'

function CreatePrompt() {
  const [previews, setPreviews] = useState<string[]>([])

  return (
    <ImageUpload
      maxFiles={5}
      maxSize={10}
      folder="prompts/previews"
      onUploadComplete={(results) => {
        setPreviews(results.map(r => r.url))
      }}
    />
  )
}
```

### Пример 3: Использование хуков напрямую

```tsx
import { useUploadImage } from '@/hooks/useUpload'

function CustomUpload() {
  const uploadMutation = useUploadImage()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadMutation.mutateAsync({
        file,
        folder: 'custom',
      })
      console.log('Uploaded:', result.url)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      disabled={uploadMutation.isPending}
    />
  )
}
```

## Тестирование

### 1. Запуск серверов

**Backend:**
```bash
cd apps/backend
npm run dev
```
Сервер запустится на http://localhost:4000

**Frontend:**
```bash
cd apps/frontend
npm run dev
```
Сервер запустится на http://localhost:3000

### 2. Открытие тестовой страницы

Откройте в браузере:
```
http://localhost:3000/test-upload
```

### 3. Тестовые сценарии

**Позитивные тесты:**
- ✅ Загрузка одного изображения через клик
- ✅ Загрузка нескольких изображений через drag-and-drop
- ✅ Превью файлов перед загрузкой
- ✅ Удаление файла из превью
- ✅ Проверка возвращаемого URL
- ✅ Проверка доступности изображения в Cloudinary

**Негативные тесты:**
- ❌ Попытка загрузить неподдерживаемый формат (PDF, DOCX и т.д.)
- ❌ Попытка загрузить файл > 10MB
- ❌ Попытка загрузить > 10 файлов одновременно

### 4. Тестирование API через cURL

**Загрузка одного файла:**
```bash
curl -X POST http://localhost:4000/upload/image \
  -F "file=@/path/to/image.jpg" \
  -F "folder=test"
```

**Загрузка нескольких файлов:**
```bash
curl -X POST http://localhost:4000/upload/images \
  -F "files=@/path/to/image1.jpg" \
  -F "files=@/path/to/image2.jpg" \
  -F "folder=test"
```

### 5. Тестирование через Postman

1. **Создать новый запрос:**
   - Method: `POST`
   - URL: `http://localhost:4000/upload/image`

2. **Настроить Body:**
   - Тип: `form-data`
   - Добавить поле `file` с типом `File`
   - Выбрать изображение
   - (Опционально) Добавить поле `folder` с типом `Text`

3. **Отправить запрос** и проверить ответ

## Структура папок в Cloudinary

Рекомендуемая организация:

```
prompts/
├── thumbnails/      # Обложки промптов
├── previews/        # Превью изображений промптов
├── content/         # Основное содержимое
└── temp/            # Временные файлы

users/
├── avatars/         # Аватары пользователей
└── covers/          # Обложки профилей

categories/
└── banners/         # Баннеры категорий
```

## Оптимизация изображений

Cloudinary автоматически применяет оптимизацию:

**Thumbnail URL (генерируется автоматически):**
```
w_280,h_187,c_fill,q_auto,f_webp
```

- `w_280,h_187` - размеры
- `c_fill` - обрезка с заполнением
- `q_auto` - автоматическое качество
- `f_webp` - формат WebP (с fallback)

**Пользовательские трансформации:**
```typescript
const getThumbnail = (publicId: string) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_400,h_300,c_fit,q_auto/${publicId}`
}
```

## Производительность

1. **Memory Storage** - файлы не сохраняются на диск
2. **Streaming** - прямая передача в Cloudinary через stream
3. **CDN** - глобальная доставка через Cloudinary CDN
4. **Auto-optimization** - q_auto, f_auto

## Безопасность

1. **Валидация типов** - только изображения
2. **Ограничение размера** - 10MB макс
3. **Rate limiting** (будущее) - защита от злоупотреблений
4. **Authentication** (будущее) - привязка к пользователю

## Troubleshooting

### Ошибка: "Invalid file type"
- **Причина:** Попытка загрузить неподдерживаемый формат
- **Решение:** Используйте только JPEG, PNG, WebP или GIF

### Ошибка: "File too large"
- **Причина:** Файл > 10MB
- **Решение:** Уменьшите размер файла перед загрузкой

### Ошибка: "Upload failed: 401 Unauthorized"
- **Причина:** Неверные учетные данные Cloudinary
- **Решение:** Проверьте CLOUDINARY_* переменные в .env

### Ошибка: "CORS policy"
- **Причина:** Фронтенд на другом порту без CORS настроек
- **Решение:** Добавить CORS middleware в NestJS (уже настроено в main.ts)

### Превью не отображается после загрузки
- **Причина:** URL изображения недоступен
- **Решение:** Проверьте консоль браузера, проверьте настройки Cloudinary

## Следующие шаги

1. **Интеграция с формой создания промпта** - использовать ImageUpload в `/sell/create`
2. **Добавление аутентификации** - привязка загрузок к пользователю
3. **Rate limiting** - защита API от злоупотреблений
4. **Прогресс загрузки** - показывать % для больших файлов
5. **Batch delete** - удаление изображений при отмене/ошибке
6. **Image cropping** - кроппинг перед загрузкой

## Дополнительные ресурсы

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [NestJS File Upload](https://docs.nestjs.com/techniques/file-upload)
- [React Query Mutations](https://tanstack.com/query/latest/docs/react/guides/mutations)
