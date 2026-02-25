# DriveNation 3D & 360° Features Guide

## Overview
This document details the new immersive 3D and 360° rotation features added to DriveNation, providing users with premium car viewing experiences across all pages.

---

## Features Implemented

### 1. 360° Rotation Gallery (`components/Car360View.tsx`)
An interactive carousel that allows users to view luxury cars from multiple angles with smooth rotation and drag-to-rotate functionality.

**Key Features:**
- **Drag-to-Rotate**: Horizontal mouse/touch drag rotates through images smoothly
- **Auto-Play**: Automatic rotation with configurable speed
- **Navigation Controls**: Previous/Next buttons and keyboard support
- **Thumbnail Indicators**: Quick jump to specific angles
- **Mobile Optimized**: Full touch support with gesture recognition
- **Responsive Design**: Works on all screen sizes

**Usage:**
```tsx
import Car360View from '@/components/Car360View'

<Car360View 
  images={carImages}
  carName="BMW X5"
  autoPlay={true}
/>
```

**Props:**
- `images: string[]` - Array of car images from different angles
- `carName: string` - Display name of the car
- `autoPlay?: boolean` - Auto-rotation enabled (default: false)

---

### 2. 3D Car Viewer (`components/CarViewer3D.tsx`)
An interactive 3D rendering of luxury cars using React Three Fiber, featuring professional studio lighting and smooth controls.

**Key Features:**
- **3D Model Rendering**: Stylized 3D car model with realistic materials
- **Interactive Controls**: Mouse drag to rotate, scroll to zoom
- **Professional Lighting**: Multi-light studio setup for premium appearance
- **Auto-Rotation**: Continuous gentle rotation with user interaction override
- **Fullscreen Mode**: Click to expand for immersive viewing
- **Performance Optimized**: Lazy loading and Suspense boundaries

**Usage:**
```tsx
import CarViewer3D from '@/components/CarViewer3D'

<CarViewer3D 
  carName="Mercedes-Benz S-Class"
  carColor="#1f2937"
/>
```

**Props:**
- `carName: string` - Display name of the car
- `carColor?: string` - Car color in hex format (default: dark gray #1f2937)

**3D Model Details:**
- Polygon-based car model (box geometry for body, cylinders for wheels)
- Real-time lighting with environment mapping
- Metallic and glass materials for authenticity
- Headlights with emissive effects

---

### 3. Enhanced Image Gallery (`components/ImageGallery.tsx`)
A tabbed gallery component that unifies traditional images, 360° views, and 3D models in one interface.

**Key Features:**
- **Tab Navigation**: Switch between Images | 360° View | 3D Model
- **Fullscreen Gallery**: Click to expand any image
- **Navigation Controls**: Previous/Next with keyboard support
- **Responsive Thumbnails**: Grid-based thumbnail selection
- **Smooth Transitions**: Fade-in animations between tabs
- **Fallback Handling**: Graceful degradation if views unavailable

**Usage:**
```tsx
import ImageGallery from '@/components/ImageGallery'

<ImageGallery 
  images={carImages}
  carName="Q8"
  carMake="Audi"
  enable360={true}
  enable3D={true}
/>
```

**Props:**
- `images: string[]` - Gallery images array
- `carName: string` - Car model name
- `carMake: string` - Car brand name
- `enable3D?: boolean` - Show 3D viewer tab (default: true)
- `enable360?: boolean` - Show 360° view tab (default: true)

---

## Integration Points

### Details Page
The Details page now features the enhanced ImageGallery with full 360° and 3D support:
- Primary gallery with tabbed views
- Multi-angle images in Images tab
- Smooth 360° rotation in dedicated tab
- Interactive 3D model viewer in 3D tab

```tsx
<ImageGallery 
  images={car.gallery.length > 0 ? car.gallery : [car.image]}
  carName={car.model}
  carMake={car.make}
  enable360={true}
  enable3D={true}
/>
```

### Home Page
Featured Arrivals section now displays 360° view indicators on car cards, highlighting immersive features to users.

### Inventory Page
All car listings include:
- 360° view badge indicating available views
- Enhanced hover effects on images
- Quick access to 3D viewer from details page

---

## Data Structure

### Car Interface Extensions
```typescript
interface Car {
  // ... existing fields
  images360?: string[];  // Array of 360° view images
  modelId?: string;      // Reference to 3D model
  carColor?: string;     // Car color for 3D rendering
}
```

### Car Data Enrichment
All cars are automatically enriched with 360° images during data generation:

```typescript
const enrichedCars = cars.map(car => ({
  ...car,
  images360: car.gallery && car.gallery.length > 0 
    ? car.gallery 
    : [car.image, ...rotatedImages],
  carColor: '#1f2937'
}))
```

---

## Image Generation

### AI Image Script
Location: `scripts/generate-car-images.js`

This script generates high-quality AI images for all luxury car models using Fal AI's Flux Pro API:

**Supported Models:**
- Mercedes-Benz: C-Class, E-Class, S-Class, GLE, GLS, G-Wagon, A-Class Limousine
- BMW: 3 Series, 5 Series, 7 Series, X1, X3, X5, X7, Z4, M340i
- Audi: A4, A6, A8 L, Q3, Q5, Q7, Q8, RS5, e-tron
- Land Rover: Range Rover, Range Rover Sport, Velar, Evoque, Defender, Discovery
- Porsche: Macan, Cayenne, Panamera, 911 Carrera, Taycan
- Jaguar: XE, XF, F-PACE, F-TYPE
- Volvo: XC40, XC60, XC90, S90
- Lexus: ES 300h, NX 350h, RX 350h, LS 500h

**Image Angles Generated:**
- Three-quarter front view
- Side profile view
- Front view
- Rear view

**Usage:**
```bash
export FAL_KEY=your_fal_api_key
node scripts/generate-car-images.js
```

The script saves results to `public/car-images.json` with structure:
```json
{
  "Q8": {
    "brand": "Audi",
    "images": [
      "https://fal.ai/image1.jpg",
      "https://fal.ai/image2.jpg"
    ]
  }
}
```

---

## Image Utilities

Location: `lib/imageUtils.ts`

Helper functions for image handling:

```typescript
// Generate 360° images from single main image
generate360Images(mainImage, carModel): string[]

// Enrich car data with 360° images
enrichCarWithImages(car): Car

// Get responsive image URLs
getResponsiveImageUrl(url, width): string

// Validate image URLs
validateImageUrl(url): Promise<string>

// Batch enrich multiple cars
enrichCarsWithImages(cars): Car[]
```

---

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: 3D components use Suspense boundaries
2. **Image Optimization**: Responsive image sizing with Unsplash parameters
3. **Canvas Offloading**: 3D rendering occurs on separate thread
4. **Code Splitting**: Components imported dynamically where beneficial

### Load Time Targets
- Gallery load: < 1s
- 3D renderer: < 2s
- 360° rotation: < 500ms per transition
- Page TTL: < 3s (with images)

---

## Browser Support

### Desktop
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support

### Mobile
- iOS Safari: Touch controls, 360° drag, 3D with WebGL 2.0+
- Android Chrome: Full support
- Android Firefox: Full support

### Requirements
- WebGL enabled
- ES6+ JavaScript support
- Touch API support (for mobile)

---

## Future Enhancements

### Planned Features
1. **AI-Generated 360° Images**: Real AI-generated angle views instead of rotations
2. **Configurable 3D Models**: Upload custom GLB/GLTF models per car
3. **AR Viewer**: Augmented Reality car preview (mobile)
4. **Video Gallery**: 4K vehicle walkthrough videos
5. **Comparison View**: Side-by-side 3D comparison of multiple cars
6. **Custom Paint Colors**: Real-time 3D color customization
7. **Interior Views**: 360° cabin photography and 3D interior models
8. **Virtual Showroom**: Multi-car 3D environment

### API Integration
- Integrate with actual 3D model library (Sketchfab, Poly Haven)
- Connect to CDN for AI-generated images
- Real-time model updates from admin panel

---

## Troubleshooting

### 3D Viewer Not Displaying
1. Check WebGL support: `gl.getParameter(gl.VERSION)`
2. Verify Three.js is loaded
3. Check browser console for errors
4. Try different browser (Chrome recommended)

### 360° Images Not Loading
1. Verify image URLs are accessible
2. Check CORS headers
3. Ensure images array is not empty
4. Check browser network tab

### Performance Issues
1. Reduce 3D model complexity
2. Compress images to < 500KB
3. Implement lazy loading for galleries
4. Use WebP format where supported

### Mobile Responsiveness
1. Test on actual devices (not just device emulation)
2. Verify touch event handlers
3. Check viewport meta tags
4. Test landscape orientation

---

## Dependencies

**Core 3D:**
- `three@^r157` - 3D rendering engine
- `@react-three/fiber@^8.15.0` - React integration
- `@react-three/drei@^9.88.0` - Utilities and helpers

**UI Components:**
- `lucide-react@^0.344.0` - Icon library

**Image Generation:**
- `@fal-ai/serverless-client@^1.1.0` - AI image generation API

---

## Contributing

When adding new features:
1. Maintain responsive design patterns
2. Test on mobile devices
3. Optimize image sizes before commit
4. Document all new components
5. Follow existing code style

---

## Support

For issues or questions:
- Check troubleshooting section above
- Review component props documentation
- Check browser console for errors
- Test with fallback images

---

**Last Updated:** February 2026
**Version:** 1.0.0
