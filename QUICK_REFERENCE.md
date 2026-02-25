# DriveNation 3D & 360° - Quick Reference Guide

## One-Minute Setup
```bash
npm install
npm run dev
# Navigate to http://localhost:3000 and view any car details
```

---

## Component Imports

### 360° Gallery
```tsx
import Car360View from '@/components/Car360View'

<Car360View images={images} carName="BMW X5" autoPlay={true} />
```

### 3D Viewer
```tsx
import CarViewer3D from '@/components/CarViewer3D'

<CarViewer3D carName="Mercedes-Benz S-Class" carColor="#000000" />
```

### Complete Gallery (Recommended)
```tsx
import ImageGallery from '@/components/ImageGallery'

<ImageGallery 
  images={car.gallery}
  carName={car.model}
  carMake={car.make}
  enable360={true}
  enable3D={true}
/>
```

---

## Utility Functions

### Image Utilities
```typescript
import { 
  generate360Images,
  enrichCarWithImages,
  getResponsiveImageUrl
} from '@/lib/imageUtils'

// Generate 360° images from single image
const images = generate360Images(mainImage, 'Q8')

// Enrich car data
const enrichedCar = enrichCarWithImages(car)

// Get responsive URL
const mobileUrl = getResponsiveImageUrl(url, 600)
```

### Car Colors
```typescript
import { 
  LUXURY_CAR_COLORS,
  getCarColorByBrand,
  getComplementaryColor
} from '@/lib/carColors'

// Use predefined color
<CarViewer3D carColor={LUXURY_CAR_COLORS['Pearl White']} />

// Get brand-specific color
const color = getCarColorByBrand('Mercedes-Benz')

// Get UI text color based on car color
const textColor = getComplementaryColor(carColor) // 'light' | 'dark'
```

---

## Common Tasks

### Add 360° to Existing Page
```tsx
import Car360View from '@/components/Car360View'

function MyPage() {
  return (
    <Car360View 
      images={[image1, image2, image3, image4]}
      carName="Car Model"
      autoPlay={false}
    />
  )
}
```

### Enable 3D Viewer
```tsx
import CarViewer3D from '@/components/CarViewer3D'

function MyPage() {
  return (
    <CarViewer3D 
      carName="Car Model"
      carColor="#1f2937"
    />
  )
}
```

### Replace Gallery
```tsx
// Before
<div className="gallery">
  <img src={image} />
  {gallery.map(img => <img src={img} />)}
</div>

// After
<ImageGallery 
  images={gallery}
  carName={model}
  carMake={make}
/>
```

### Customize Colors
```typescript
// Add new luxury color
const CUSTOM_COLORS = {
  ...LUXURY_CAR_COLORS,
  'Custom Gold': '#FFD700'
}

// Use in 3D viewer
<CarViewer3D carColor={CUSTOM_COLORS['Custom Gold']} />
```

---

## Data Structure

### Car Type
```typescript
interface Car {
  // Existing
  id: string
  make: string
  model: string
  image: string
  gallery: string[]
  
  // NEW
  images360?: string[]
  carColor?: string
  modelId?: string
}
```

### Providing Images
```typescript
const car: Car = {
  id: '1',
  make: 'Audi',
  model: 'Q8',
  image: 'main.jpg',
  gallery: ['angle1.jpg', 'angle2.jpg', 'angle3.jpg'],
  images360: ['angle1.jpg', 'angle2.jpg', ...], // Auto-populated
  carColor: '#1f2937'
}
```

---

## Props Reference

### Car360View
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | string[] | - | Array of images for rotation |
| carName | string | - | Car name to display |
| autoPlay | boolean | false | Enable auto-rotation |

### CarViewer3D
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| carName | string | - | Car name to display |
| carColor | string | '#1f2937' | Car color (hex) |

### ImageGallery
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | string[] | - | Gallery images |
| carName | string | - | Model name |
| carMake | string | - | Brand name |
| enable360 | boolean | true | Show 360° tab |
| enable3D | boolean | true | Show 3D tab |

---

## Styling Classes

### Gallery Styling
```tsx
<Car360View 
  images={images}
  carName="Car"
/>
{/* Uses Tailwind: bg-gradient, rounded-lg, border, etc. */}
```

### Custom Styling
```tsx
<div className="custom-wrapper">
  <Car360View images={images} carName="Car" />
</div>

<style>{`
  .custom-wrapper {
    /* Your custom styles */
  }
`}</style>
```

### Tailwind Customization
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#d4af37',
          silver: '#c0c0c0'
        }
      }
    }
  }
}
```

---

## API Integration

### Generate AI Images
```bash
export FAL_KEY=your_key_here
node scripts/generate-car-images.js
```

Outputs to `public/car-images.json`

### Load Generated Images
```typescript
import carImageMap from '@/public/car-images.json'

const images = carImageMap['Q8']?.images || []
```

---

## Troubleshooting Checklist

### 360° Not Working
- [ ] Check image array is not empty
- [ ] Verify images load in browser
- [ ] Check console for JavaScript errors

### 3D Not Rendering
- [ ] Confirm WebGL is enabled
- [ ] Check Three.js is loaded
- [ ] Try different browser
- [ ] Look for error in console

### Images Not Loading
- [ ] Verify URLs are correct
- [ ] Check CORS headers
- [ ] Test in different browser
- [ ] Check network tab

### Performance Issues
- [ ] Reduce 3D model complexity
- [ ] Compress images < 500KB
- [ ] Enable lazy loading
- [ ] Check device capabilities

---

## Performance Tips

### Optimize Bundle
```typescript
// Dynamic import for better splitting
const Car360View = dynamic(() => import('@/components/Car360View'))
const CarViewer3D = dynamic(() => import('@/components/CarViewer3D'))
```

### Lazy Load Components
```tsx
import { Suspense } from 'react'

<Suspense fallback={<LoadingSpinner />}>
  <CarViewer3D carName="Car" />
</Suspense>
```

### Image Optimization
```typescript
// Use responsive URLs
const url = getResponsiveImageUrl(imageUrl, 800)

// WebP with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Car" />
</picture>
```

---

## Mobile Considerations

### Touch Events
All components support touch natively:
- Drag-to-rotate on 360° view
- Touch zoom on 3D viewer
- Touch gallery navigation

### Responsive Breakpoints
```typescript
// Components adapt to screen size
// Mobile: stacked layout
// Tablet: 2-column
// Desktop: full featured
```

### Testing on Mobile
```bash
# Test on local network
npm run dev

# Navigate to http://[your-ip]:3000 on mobile device
# Or use Chrome DevTools mobile emulation
```

---

## Code Snippets

### Full Page Example
```tsx
import ImageGallery from '@/components/ImageGallery'
import { Car, Page } from '@/types'

interface DetailsProps {
  car: Car
  onNavigate: (page: Page) => void
}

export default function Details({ car }: DetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1>{car.make} {car.model}</h1>
      
      <ImageGallery 
        images={car.gallery}
        carName={car.model}
        carMake={car.make}
      />
      
      <div className="mt-8">
        <p className="price">{car.price}</p>
        <p className="details">{car.year} • {car.km}</p>
      </div>
    </div>
  )
}
```

### Custom Gallery Component
```tsx
import Car360View from '@/components/Car360View'
import CarViewer3D from '@/components/CarViewer3D'

export function CustomGallery({ car }) {
  const [view, setView] = useState<'360' | '3d'>('360')
  
  return (
    <div>
      <div className="tabs">
        <button onClick={() => setView('360')}>360°</button>
        <button onClick={() => setView('3d')}>3D</button>
      </div>
      
      {view === '360' && <Car360View images={car.gallery} carName={car.model} />}
      {view === '3d' && <CarViewer3D carName={car.model} />}
    </div>
  )
}
```

---

## Documentation Links

- Full Features: [FEATURES_3D.md](./FEATURES_3D.md)
- Implementation: [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
- All Changes: [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md)

---

## Support

### Common Questions

**Q: Can I use my own images?**
A: Yes! Any image URLs work. Use the `images` prop.

**Q: How do I customize colors?**
A: Use `carColor` prop or `LUXURY_CAR_COLORS` from `lib/carColors.ts`.

**Q: Does it work on mobile?**
A: Yes, all components are fully responsive with touch support.

**Q: Can I disable 360° or 3D?**
A: Yes, use `enable360={false}` or `enable3D={false}` props.

**Q: How do I generate AI images?**
A: Run `scripts/generate-car-images.js` with FAL_KEY env var set.

**Q: What if WebGL isn't available?**
A: Components gracefully fall back to 2D images.

---

## Version Info
- **Version:** 1.0.0
- **Updated:** February 2026
- **Status:** Production Ready
- **Dependencies:** React 19, Three.js r157, Next.js 15

---

**Happy coding! 🚗✨**
