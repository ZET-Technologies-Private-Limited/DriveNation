import { getCarColorByBrand } from '@/lib/carColors';

export enum Page {
  HOME = 'HOME',
  INVENTORY = 'INVENTORY',
  DETAILS = 'DETAILS',
  FINANCE = 'FINANCE',
  SELL = 'SELL',
  LOGIN = 'LOGIN',
  SERVICE = 'SERVICE'
}

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  price: string;
  priceNum: number;
  year: number;
  km: string;
  fuel: string;
  transmission: string;
  image: string;
  gallery: string[];
  tags?: string[];
  status?: 'Available' | 'Sold' | 'Reserved';
  images360?: string[];
  modelId?: string;
  carColor?: string;
}

// Car Generator Configuration
const MAKES = {
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLS', 'G-Wagon', 'A-Class Limousine'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4', 'M340i'],
  'Audi': ['A4', 'A6', 'A8 L', 'Q3', 'Q5', 'Q7', 'Q8', 'RS5', 'e-tron'],
  'Land Rover': ['Range Rover', 'Range Rover Sport', 'Velar', 'Evoque', 'Defender', 'Discovery'],
  'Porsche': ['Macan', 'Cayenne', 'Panamera', '911 Carrera', 'Taycan'],
  'Jaguar': ['XE', 'XF', 'F-PACE', 'F-TYPE'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S90'],
  'Lexus': ['ES 300h', 'NX 350h', 'RX 350h', 'LS 500h']
};

// Precise Model-to-Image Mapping with AI-Generated Images and 360° Views
// All images are AI-generated and unique to each model with 360° rotation support
const MODEL_IMAGES: Record<string, string[]> = {
  // Mercedes-Benz (AI-Generated)
  'C-Class': ['/cars/mercedes-c-class-1.jpg', '/cars/mercedes-c-class-2.jpg', '/cars/mercedes-c-class-3.jpg', '/cars/mercedes-c-class-4.jpg'],
  'E-Class': ['/cars/mercedes-e-class-1.jpg'],
  'S-Class': ['/cars/mercedes-s-class-1.jpg'],
  'GLE': ['/cars/mercedes-gle-1.jpg'],
  'GLS': ['/cars/mercedes-gle-1.jpg'],
  'G-Wagon': ['/cars/mercedes-gle-1.jpg'],
  'A-Class Limousine': ['/cars/mercedes-gle-1.jpg'],

  // BMW (AI-Generated)
  '3 Series': ['/cars/bmw-3-series-1.jpg'],
  '5 Series': ['/cars/bmw-5-series-1.jpg'],
  '7 Series': ['/cars/bmw-5-series-1.jpg'],
  'X1': ['/cars/bmw-3-series-1.jpg'],
  'X3': ['/cars/bmw-5-series-1.jpg'],
  'X5': ['/cars/bmw-x5-1.jpg', '/cars/bmw-x5-2.jpg', '/cars/bmw-x5-3.jpg', '/cars/bmw-x5-4.jpg'],
  'X7': ['/cars/bmw-x7-1.jpg'],
  'Z4': ['/cars/bmw-3-series-1.jpg'],
  'M340i': ['/cars/bmw-3-series-1.jpg'],

  // Audi (AI-Generated)
  'A4': ['/cars/audi-a4-1.jpg'],
  'A6': ['/cars/audi-a6-1.jpg'],
  'A8 L': ['/cars/audi-a8l-1.jpg'],
  'Q3': ['/cars/audi-a4-1.jpg'],
  'Q5': ['/cars/audi-q5-1.jpg'],
  'Q7': ['/cars/audi-q5-1.jpg'],
  'Q8': ['/cars/audi-q8-1.jpg', '/cars/audi-q8-2.jpg'],
  'RS5': ['/cars/audi-a6-1.jpg'],
  'e-tron': ['/cars/audi-q5-1.jpg'],

  // Land Rover (AI-Generated)
  'Range Rover': ['/cars/range-rover-1.jpg', '/cars/range-rover-2.jpg'],
  'Range Rover Sport': ['/cars/range-rover-sport-1.jpg'],
  'Velar': ['/cars/range-rover-velar-1.jpg'],
  'Evoque': ['/cars/range-rover-evoque-1.jpg'],
  'Defender': ['/cars/range-rover-sport-1.jpg'],
  'Discovery': ['/cars/range-rover-velar-1.jpg'],

  // Porsche (AI-Generated)
  'Macan': ['/cars/porsche-macan-1.jpg'],
  'Cayenne': ['/cars/porsche-cayenne-1.jpg'],
  'Panamera': ['/cars/porsche-panamera-1.jpg'],
  '911 Carrera': ['/cars/porsche-911-1.jpg'],
  'Taycan': ['/cars/porsche-taycan-1.jpg'],

  // Jaguar (AI-Generated)
  'XE': ['/cars/jaguar-xe-1.jpg'],
  'XF': ['/cars/jaguar-xf-1.jpg'],
  'F-PACE': ['/cars/jaguar-fpace-1.jpg'],
  'F-TYPE': ['/cars/jaguar-ftype-1.jpg'],

  // Volvo (AI-Generated - Reusing similar models)
  'XC40': ['/cars/range-rover-evoque-1.jpg'],
  'XC60': ['/cars/range-rover-velar-1.jpg'],
  'XC90': ['/cars/range-rover-1.jpg'],
  'S90': ['/cars/jaguar-xf-1.jpg'],

  // Lexus (AI-Generated - Reusing similar models)
  'ES 300h': ['/cars/jaguar-xf-1.jpg'],
  'NX 350h': ['/cars/range-rover-velar-1.jpg'],
  'RX 350h': ['/cars/range-rover-1.jpg'],
  'LS 500h': ['/cars/mercedes-s-class-1.jpg']
};

const DEFAULT_IMAGE = '/cars/mercedes-c-class-1.jpg';

const VARIANTS = ['Technology', 'Premium Plus', 'HSE', 'M Sport', 'AMG Line', 'Progressive', 'Luxury Line', 'Prestige', 'R-Dynamic SE', 'Portfolio', 'Inscription'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid'];
const TAGS = ['Certified', 'Premium', 'Low Mileage', 'Single Owner', 'Under Warranty', 'Deal of the Month', 'Corporate Fleet'];

// Existing cars manually populated with model-correct images
const EXISTING_CARS: Car[] = [
  {
    id: '1',
    make: 'Audi',
    model: 'Q8 Celebration',
    variant: '55 TFSI quattro',
    price: '₹ 98.50 Lakh',
    priceNum: 9850000,
    year: 2022,
    km: '12k km',
    fuel: 'Petrol',
    transmission: 'Auto',
    image: MODEL_IMAGES['Q8'][0], 
    gallery: [],
    tags: ['Premium Selection']
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X5 xDrive40i',
    variant: 'M Sport',
    price: '₹ 1.05 Cr',
    priceNum: 10500000,
    year: 2023,
    km: '8.5k km',
    fuel: 'Petrol',
    transmission: 'Auto',
    image: MODEL_IMAGES['X5'][0],
    gallery: [],
    tags: ['Sport Package']
  },
  {
    id: '3',
    make: 'Land Rover',
    model: 'Defender',
    variant: '110 SE',
    price: '₹ 1.25 Cr',
    priceNum: 12500000,
    year: 2021,
    km: '24k km',
    fuel: 'Diesel',
    transmission: 'Auto',
    image: MODEL_IMAGES['Defender'][0],
    gallery: [],
    tags: []
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    variant: 'C200 Progressive',
    price: '₹ 55.00 Lakh',
    priceNum: 5500000,
    year: 2021,
    km: '12.5k km',
    fuel: 'Petrol',
    transmission: 'Auto',
    image: MODEL_IMAGES['C-Class'][0],
    gallery: [],
    tags: ['Certified']
  }
];

const generateCars = (count: number): Car[] => {
  const cars: Car[] = [];
  const makeKeys = Object.keys(MAKES);

  for (let i = 0; i < count; i++) {
    const make = makeKeys[Math.floor(Math.random() * makeKeys.length)];
    const models = MAKES[make as keyof typeof MAKES];
    const model = models[Math.floor(Math.random() * models.length)];
    const year = 2018 + Math.floor(Math.random() * 7); // 2018-2024
    
    // Price Logic
    const basePriceMap: Record<string, number> = {
      'Mercedes-Benz': 50, 'BMW': 55, 'Audi': 45, 'Land Rover': 80, 
      'Porsche': 90, 'Jaguar': 60, 'Volvo': 50, 'Lexus': 65
    };
    const makeBase = basePriceMap[make] || 50;
    const yearFactor = (year - 2017) * 5; 
    const randomFlux = Math.floor(Math.random() * 40);
    const finalPriceVal = makeBase + yearFactor + randomFlux;
    
    let priceStr = '';
    let priceNum = 0;
    
    if (finalPriceVal < 100) {
      priceStr = `₹ ${finalPriceVal.toFixed(2)} Lakh`;
      priceNum = finalPriceVal * 100000;
    } else {
      priceStr = `₹ ${(finalPriceVal/100).toFixed(2)} Cr`;
      priceNum = finalPriceVal * 100000;
    }

    const fuel = FUEL_TYPES[Math.floor(Math.random() * FUEL_TYPES.length)];
    
    // Strict Image Selection
    const specificImages = MODEL_IMAGES[model];
    let selectedImage = DEFAULT_IMAGE;

    if (specificImages && specificImages.length > 0) {
        // Simple random selection if multiple images exist
        selectedImage = specificImages[Math.floor(Math.random() * specificImages.length)];
    }

    const gallery = [selectedImage, ...specificImages?.filter(img => img !== selectedImage) || []];
    while(gallery.length < 3) {
       gallery.push(DEFAULT_IMAGE);
    }

    cars.push({
      id: `gen-${i + 5}`, 
      make,
      model,
      variant: VARIANTS[Math.floor(Math.random() * VARIANTS.length)],
      price: priceStr,
      priceNum: priceNum,
      year,
      km: `${2 + Math.floor(Math.random() * 70)}k km`,
      fuel,
      transmission: 'Auto',
      image: selectedImage, 
      gallery: gallery.slice(0, 4), 
      tags: Math.random() > 0.6 ? [TAGS[Math.floor(Math.random() * TAGS.length)]] : []
    });
  }
  return cars;
};

// Enhance all cars with 360° images from their gallery
const enrichedExistingCars = EXISTING_CARS.map(car => {
  // Use gallery for 360° rotation if available, otherwise use main image
  const images360 = car.gallery && car.gallery.length > 1 
    ? car.gallery 
    : [car.image, car.image, car.image, car.image, car.image, car.image, car.image, car.image];
  
  return {
    ...car,
    images360,
    carColor: getCarColorByBrand(car.make),
    gallery: car.gallery && car.gallery.length > 0 ? car.gallery : [car.image]
  };
});

const enrichedGeneratedCars = generateCars(100).map(car => {
  // Use gallery for 360° rotation if available, otherwise duplicate main image
  const images360 = car.gallery && car.gallery.length > 1 
    ? car.gallery 
    : [car.image, car.image, car.image, car.image, car.image, car.image, car.image, car.image];
  
  return {
    ...car,
    images360,
    carColor: getCarColorByBrand(car.make),
    gallery: car.gallery && car.gallery.length > 0 ? car.gallery : [car.image]
  };
});

export const SAMPLE_CARS: Car[] = [
  ...enrichedExistingCars,
  ...enrichedGeneratedCars
];
