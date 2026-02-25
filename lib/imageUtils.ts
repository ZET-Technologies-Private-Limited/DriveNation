/**
 * Image Utilities for DriveNation
 * Handles AI-generated car images, 360° gallery generation, and fallbacks
 */

import { Car } from '@/types'

/**
 * Generate mock 360° images by duplicating and rotating main image
 * In production, these would be actual AI-generated angle views
 */
export function generate360Images(mainImage: string, carModel: string): string[] {
  // In production, fetch from a mapping of model-specific AI-generated images
  // For now, return array of the main image repeated (frontend will handle rotation)
  const angles = [
    mainImage,
    mainImage, // angle 2
    mainImage, // angle 3
    mainImage, // angle 4
    mainImage, // angle 5
    mainImage, // angle 6
    mainImage, // angle 7
    mainImage, // angle 8
  ]
  return angles
}

/**
 * Get enhanced car data with 360° images
 */
export function enrichCarWithImages(car: Car): Car {
  return {
    ...car,
    images360: car.images360 || generate360Images(car.image, car.model),
    carColor: car.carColor || '#1f2937', // Default dark gray luxury car color
  }
}

/**
 * Batch enrich multiple cars with image data
 */
export function enrichCarsWithImages(cars: Car[]): Car[] {
  return cars.map(enrichCarWithImages)
}

/**
 * Fallback image URL if primary fails to load
 */
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800'

/**
 * Map car models to appropriate AI-generated image sets
 * This will be populated by the generate-car-images script
 */
export const MODEL_IMAGE_MAP: Record<string, string[]> = {
  // Populated at runtime from public/car-images.json or API
}

/**
 * Get images for a specific car model
 */
export async function getModelImages(brand: string, model: string): Promise<string[]> {
  try {
    // Try to load from local mapping first
    if (MODEL_IMAGE_MAP[model]?.length > 0) {
      return MODEL_IMAGE_MAP[model]
    }

    // In production, fetch from API or CDN
    // const response = await fetch('/api/car-images', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ brand, model }) 
    // })
    // return response.json()

    // Fallback
    return [FALLBACK_IMAGE]
  } catch (error) {
    console.error(`[v0] Error loading images for ${brand} ${model}:`, error)
    return [FALLBACK_IMAGE]
  }
}

/**
 * Validate image URL and return fallback if invalid
 */
export async function validateImageUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok ? url : FALLBACK_IMAGE
  } catch {
    return FALLBACK_IMAGE
  }
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function getResponsiveImageUrl(url: string, width: number): string {
  if (!url || url.includes('unsplash.com')) {
    // Unsplash URLs support width parameter
    return url.includes('?') ? `${url}&w=${width}` : `${url}?w=${width}`
  }
  return url
}
