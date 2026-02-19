/**
 * Cloudinary utility functions
 */

export interface CloudinaryConfig {
  cloudName: string
  apiKey: string
  apiSecret: string
  uploadPreset?: string
}

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  resource_type: string
}

/**
 * Generate Cloudinary URL with transformations
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: {
    cloudName: string
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb'
    quality?: 'auto' | number
    format?: 'webp' | 'jpg' | 'png' | 'auto'
    gravity?: 'auto' | 'face' | 'center'
  }
): string {
  const {
    cloudName,
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
  } = options

  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (gravity) transformations.push(`g_${gravity}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  const transformation = transformations.join(',')

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`
}

/**
 * Generate responsive image srcset
 */
export function buildResponsiveSrcSet(
  publicId: string,
  cloudName: string,
  sizes: number[] = [180, 280, 360, 500, 640, 750, 1080]
): {
  srcSet: string
  sizes: string
} {
  const srcSet = sizes
    .map(size => {
      const url = buildCloudinaryUrl(publicId, {
        cloudName,
        width: size,
        quality: 'auto',
        format: 'auto',
      })
      return `${url} ${size}w`
    })
    .join(', ')

  const sizesStr = '(max-width: 640px) 180px, (max-width: 1000px) 280px, 360px'

  return {
    srcSet,
    sizes: sizesStr,
  }
}

/**
 * Generate thumbnail URL
 */
export function getThumbnailUrl(
  publicId: string,
  cloudName: string,
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizeMap = {
    small: 180,
    medium: 280,
    large: 500,
  }

  return buildCloudinaryUrl(publicId, {
    cloudName,
    width: sizeMap[size],
    height: Math.floor(sizeMap[size] * 0.67), // 280x187 ratio
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'webp',
  })
}

/**
 * Generate video thumbnail
 */
export function getVideoThumbnail(
  publicId: string,
  cloudName: string,
  width: number = 280
): string {
  return `https://res.cloudinary.com/${cloudName}/video/upload/w_${width},c_fill,f_jpg/${publicId}.jpg`
}

/**
 * Extract public_id from Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/)
  return match ? match[1] : null
}

/**
 * Validate Cloudinary public_id format
 */
export function isValidPublicId(publicId: string): boolean {
  // Cloudinary public_ids can contain letters, numbers, -, _, /
  const regex = /^[a-zA-Z0-9_\-/]+$/
  return regex.test(publicId)
}

/**
 * Generate optimized image URL for Next.js Image component
 */
export function getOptimizedImageUrl(
  publicId: string,
  cloudName: string,
  width: number,
  height?: number
): string {
  return buildCloudinaryUrl(publicId, {
    cloudName,
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  })
}
