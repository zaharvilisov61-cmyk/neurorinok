import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useUploadImage() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      api.upload.uploadImage(file, folder),
  })
}

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, folder }: { files: File[]; folder?: string }) =>
      api.upload.uploadImages(files, folder),
  })
}
