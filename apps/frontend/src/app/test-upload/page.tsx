'use client'

import { useState } from 'react'
import { ImageUpload } from '@/components/upload/ImageUpload'
import type { UploadResponseDto } from '@promptbase/shared'

export default function TestUploadPage() {
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [previewImages, setPreviewImages] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Тестирование загрузки изображений
        </h1>
        <p className="text-text-secondary mb-8">
          Демонстрация интеграции с Cloudinary
        </p>

        <div className="max-w-4xl space-y-8">
          {/* Загрузка обложки */}
          <div className="bg-bg-secondary p-6 rounded-lg border border-border-primary">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Обложка промпта (1 файл)
            </h2>
            <ImageUpload
              maxFiles={1}
              folder="prompts/thumbnails"
              onUploadComplete={(results: UploadResponseDto[]) => {
                setThumbnailUrl(results[0].url)
                console.log('Thumbnail uploaded:', results[0])
              }}
            />
            {thumbnailUrl && (
              <div className="mt-4">
                <p className="text-sm text-accent-green mb-2">
                  ✓ Обложка успешно загружена
                </p>
                <img
                  src={thumbnailUrl}
                  alt="Uploaded thumbnail"
                  className="w-full max-w-md rounded-md border border-border-primary"
                />
                <p className="text-xs text-text-secondary mt-2 break-all">
                  URL: {thumbnailUrl}
                </p>
              </div>
            )}
          </div>

          {/* Загрузка превью */}
          <div className="bg-bg-secondary p-6 rounded-lg border border-border-primary">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Превью изображения (до 5 файлов)
            </h2>
            <ImageUpload
              maxFiles={5}
              folder="prompts/previews"
              onUploadComplete={(results: UploadResponseDto[]) => {
                setPreviewImages(results.map((r) => r.url))
                console.log('Previews uploaded:', results)
              }}
            />
            {previewImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-accent-green mb-2">
                  ✓ Загружено превью: {previewImages.length}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewImages.map((url, index) => (
                    <div key={index}>
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-border-primary"
                      />
                      <p className="text-xs text-text-secondary mt-1 truncate">
                        Превью {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Информация о загруженных файлах */}
          {(thumbnailUrl || previewImages.length > 0) && (
            <div className="bg-bg-secondary p-6 rounded-lg border border-border-primary">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Результаты загрузки
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">Обложка:</span>
                  <span className="text-text-primary">
                    {thumbnailUrl ? '✓ Загружена' : '✗ Не загружена'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-secondary">
                    Превью изображений:
                  </span>
                  <span className="text-text-primary">
                    {previewImages.length > 0
                      ? `✓ ${previewImages.length} шт.`
                      : '✗ Не загружены'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
