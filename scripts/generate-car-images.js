import * as fal from '@fal-ai/serverless-client'
import fs from 'fs'
import path from 'path'

// Configure fal client
fal.config({
  credentials: process.env.FAL_KEY,
})

// Car models that need images
const CAR_MODELS = {
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLS', 'G-Wagon', 'A-Class Limousine'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4', 'M340i'],
  'Audi': ['A4', 'A6', 'A8 L', 'Q3', 'Q5', 'Q7', 'Q8', 'RS5', 'e-tron'],
  'Land Rover': ['Range Rover', 'Range Rover Sport', 'Velar', 'Evoque', 'Defender', 'Discovery'],
  'Porsche': ['Macan', 'Cayenne', 'Panamera', '911 Carrera', 'Taycan'],
  'Jaguar': ['XE', 'XF', 'F-PACE', 'F-TYPE'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S90'],
  'Lexus': ['ES 300h', 'NX 350h', 'RX 350h', 'LS 500h']
}

async function generateImage(brand, model, angle = 'three-quarter') {
  const prompts = {
    'three-quarter': `Luxury ${brand} ${model} car, 3/4 front view, professional automotive photography, studio lighting, white background, pristine condition, high-end luxury vehicle, 4K quality`,
    'side': `Luxury ${brand} ${model} car, side profile view, professional automotive photography, studio lighting, white background, pristine condition, 4K quality`,
    'front': `Luxury ${brand} ${model} car, front view, professional automotive photography, studio lighting, white background, pristine condition, 4K quality`,
    'rear': `Luxury ${brand} ${model} car, rear view, professional automotive photography, studio lighting, white background, pristine condition, 4K quality`
  }

  const prompt = prompts[angle] || prompts['three-quarter']

  try {
    console.log(`[v0] Generating ${brand} ${model} - ${angle} view...`)
    const result = await fal.subscribe('fal-ai/flux-pro/v1.1', {
      input: {
        prompt,
        image_size: 'landscape_4_3',
        num_inference_steps: 25,
        num_images: 1,
        enable_safety_checker: true,
      },
    })

    const imageUrl = result.images?.[0]?.url
    if (!imageUrl) {
      console.error(`[v0] Failed to generate image for ${brand} ${model}`)
      return null
    }

    console.log(`[v0] ✓ Generated: ${brand} ${model} - ${angle}`)
    return imageUrl
  } catch (error) {
    console.error(`[v0] Error generating ${brand} ${model}:`, error.message)
    return null
  }
}

async function generateAllImages() {
  const imageMap = {}

  for (const [brand, models] of Object.entries(CAR_MODELS)) {
    for (const model of models) {
      const key = `${model}`
      imageMap[key] = {
        brand,
        images: []
      }

      // Generate 2 angles per car (to balance API usage and demo quality)
      const angles = ['three-quarter', 'side']
      
      for (const angle of angles) {
        const imageUrl = await generateImage(brand, model, angle)
        if (imageUrl) {
          imageMap[key].images.push(imageUrl)
        }
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  // Save the mapping
  const outputPath = path.join(process.cwd(), 'public', 'car-images.json')
  const outputDir = path.dirname(outputPath)
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(imageMap, null, 2))
  console.log(`[v0] ✓ Image mapping saved to ${outputPath}`)
  
  return imageMap
}

// Run generation
generateAllImages()
  .then(() => {
    console.log('[v0] ✓ Image generation complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('[v0] Image generation failed:', error)
    process.exit(1)
  })
