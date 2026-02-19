'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useUploadImages } from '@/hooks/useUpload'
import type { UploadResponseDto } from '@promptbase/shared'

interface ImageUploadProps {
  maxFiles?: number
  maxSize?: number // MB
  onUploadComplete?: (results: UploadResponseDto[]) => void
  folder?: string
}

export function ImageUpload({
  maxFiles = 5,
  maxSize = 10,
  onUploadComplete,
  folder = 'prompts',
}: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const uploadMutation = useUploadImages()

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const filesArray = Array.from(files)
    const validFiles: File[] = []
    const newPreviews: string[] = []

    filesArray.forEach((file) => {
      // Валидация типа
      if (
        ![
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
        ].includes(file.type)
      ) {
        alert(`${file.name}: Неподдерживаемый формат`)
        return
      }

      // Валидация размера
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name}: Файл слишком большой (макс ${maxSize}MB)`)
        return
      }

      validFiles.push(file)
      newPreviews.push(URL.createObjectURL(file))
    })

    if (selectedFiles.length + validFiles.length > maxFiles) {
      alert(`Можно загрузить максимум ${maxFiles} файлов`)
      return
    }

    setSelectedFiles((prev) => [...prev, ...validFiles])
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    try {
      const results = await uploadMutation.mutateAsync({
        files: selectedFiles,
        folder,
      })

      onUploadComplete?.(results)

      // Очистить состояние
      setSelectedFiles([])
      previews.forEach((url) => URL.revokeObjectURL(url))
      setPreviews([])
    } catch {
      alert('Ошибка загрузки. Попробуйте снова.')
    }
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging ? 'border-accent-blue bg-accent-blue/10' : 'border-border-primary hover:border-accent-blue/50'}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
        <p className="text-sm text-text-primary mb-2">
          Перетащите изображения сюда или нажмите для выбора
        </p>
        <p className="text-xs text-text-secondary">
          Максимум {maxFiles} файлов, до {maxSize}MB каждый
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={selectedFiles[index].name}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <p className="text-xs text-text-secondary mt-1 truncate">
                {selectedFiles[index].name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploadMutation.isPending}
          className="btn-primary w-full"
        >
          {uploadMutation.isPending
            ? `Загрузка... (${selectedFiles.length} файлов)`
            : `Загрузить ${selectedFiles.length} файл(ов)`}
        </button>
      )}
    </div>
  )
}
