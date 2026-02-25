/**
 * Luxury Car Color Palette
 * Realistic metallic and standard colors for premium vehicles
 */

export const LUXURY_CAR_COLORS = {
  // Neutral/Metallic
  'Jet Black': '#0a0e27',
  'Obsidian Black': '#0f1419',
  'Midnight Black': '#1a1a2e',
  'Pearl White': '#f5f5f0',
  'Polar White': '#fafafa',
  'Titanium Silver': '#c0c0c0',
  'Chrome Silver': '#dcdcdc',
  'Gunmetal Gray': '#4a4a4a',
  
  // Blues
  'Atlantic Blue': '#1e3a5f',
  'Deep Sea Blue': '#0a3d62',
  'Midnight Blue': '#16213e',
  'Azure Blue': '#4a90e2',
  
  // Grays
  'Graphite Gray': '#404040',
  'Stone Gray': '#8b8b8b',
  'Mineral Gray': '#757575',
  
  // Reds & Maroon
  'Racing Red': '#c41e3a',
  'Cardinal Red': '#a42c2a',
  'Burgundy': '#540d0d',
  'Deep Red': '#8b0000',
  
  // Browns & Champagne
  'Champagne': '#d4af37',
  'Mahogany': '#4a2511',
  'Espresso Brown': '#2c1810',
  'Bronze': '#8b4513',
  
  // Greens
  'Racing Green': '#004225',
  'British Racing Green': '#004b49',
  'Pine Green': '#01796f',
  
  // Grays (Default)
  'Dark Gray': '#1f2937',
  'Light Gray': '#6b7280',
}

export type CarColorName = keyof typeof LUXURY_CAR_COLORS

/**
 * Get color for a car brand (contextual defaults)
 */
export function getCarColorByBrand(brand: string): string {
  const brandColorMap: Record<string, string> = {
    'Mercedes-Benz': LUXURY_CAR_COLORS['Polar White'],
    'BMW': LUXURY_CAR_COLORS['Chrome Silver'],
    'Audi': LUXURY_CAR_COLORS['Glacier White'],
    'Porsche': LUXURY_CAR_COLORS['Pearl White'],
    'Jaguar': LUXURY_CAR_COLORS['Jet Black'],
    'Range Rover': LUXURY_CAR_COLORS['Pearl White'],
    'Volvo': LUXURY_CAR_COLORS['Pearl White'],
    'Lexus': LUXURY_CAR_COLORS['Pearl White'],
  }
  
  return brandColorMap[brand] || LUXURY_CAR_COLORS['Dark Gray']
}

/**
 * Get a random luxury car color
 */
export function getRandomLuxuryColor(): string {
  const colors = Object.values(LUXURY_CAR_COLORS)
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Get color name from hex value
 */
export function getColorName(hex: string): CarColorName | null {
  const entries = Object.entries(LUXURY_CAR_COLORS)
  const match = entries.find(([_, value]) => value.toLowerCase() === hex.toLowerCase())
  return match ? (match[0] as CarColorName) : null
}

/**
 * Validate if color is a valid luxury car color
 */
export function isLuxuryColor(hex: string): boolean {
  return Object.values(LUXURY_CAR_COLORS).some(
    color => color.toLowerCase() === hex.toLowerCase()
  )
}

/**
 * Get complementary color for UI elements (based on car color brightness)
 */
export function getComplementaryColor(hexColor: string): 'light' | 'dark' {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? 'dark' : 'light'
}

/**
 * Get metallic intensity based on color
 */
export function getMetallicIntensity(colorName?: CarColorName): number {
  if (!colorName) return 0.7
  
  const metallicColors = [
    'Titanium Silver',
    'Chrome Silver',
    'Gunmetal Gray',
    'Mineral Gray',
    'Bronze',
    'Champagne'
  ]
  
  return metallicColors.includes(colorName) ? 0.9 : 0.6
}

/**
 * Get roughness intensity based on color finish
 */
export function getRoughnessIntensity(colorName?: CarColorName): number {
  if (!colorName) return 0.2
  
  const smoothColors = [
    'Jet Black',
    'Polar White',
    'Pearl White',
    'Deep Sea Blue'
  ]
  
  return smoothColors.includes(colorName) ? 0.1 : 0.25
}
