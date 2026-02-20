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

// Precise Model-to-Image Mapping
// These images are chosen to visually match the specific model names above
const MODEL_IMAGES: Record<string, string[]> = {
  // Mercedes-Benz
  'C-Class': ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800'],
  'E-Class': ['https://images.unsplash.com/photo-1618585090159-42b78f44d82b?auto=format&fit=crop&q=80&w=800'],
  'S-Class': ['https://images.unsplash.com/photo-1623697960363-2f0802c2d250?auto=format&fit=crop&q=80&w=800'],
  'G-Wagon': ['https://images.unsplash.com/photo-1520031441872-265149a9e690?auto=format&fit=crop&q=80&w=800'],
  'GLE': ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800'],
  'GLS': ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800'],
  'A-Class Limousine': ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'],

  // BMW
  '3 Series': ['https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&q=80&w=800'],
  '5 Series': ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=800'],
  '7 Series': ['https://images.unsplash.com/photo-1556189250-72ba95452e80?auto=format&fit=crop&q=80&w=800'], 
  'X1': ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=800'], 
  'X3': ['https://images.unsplash.com/photo-1556189250-72ba95452e80?auto=format&fit=crop&q=80&w=800'],
  'X5': ['https://images.unsplash.com/photo-1631215579309-906915152f20?auto=format&fit=crop&q=80&w=800'],
  'X7': ['https://images.unsplash.com/photo-1631215579309-906915152f20?auto=format&fit=crop&q=80&w=800'],
  'Z4': ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800'],
  'M340i': ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=800'],

  // Audi
  'A4': ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800'],
  'A6': ['https://images.unsplash.com/photo-1606152421811-aa91130769d3?auto=format&fit=crop&q=80&w=800'],
  'A8 L': ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800'],
  'Q3': ['https://images.unsplash.com/photo-1614207287498-857a07011d04?auto=format&fit=crop&q=80&w=800'],
  'Q5': ['https://images.unsplash.com/photo-1614207287498-857a07011d04?auto=format&fit=crop&q=80&w=800'],
  'Q7': ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800'],
  'Q8': ['https://images.unsplash.com/photo-1614207287498-857a07011d04?auto=format&fit=crop&q=80&w=800'],
  'RS5': ['https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&q=80&w=800'],
  'e-tron': ['https://images.unsplash.com/photo-1617704548623-29a3055c477d?auto=format&fit=crop&q=80&w=800'],

  // Land Rover
  'Range Rover': ['https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=800'],
  'Range Rover Sport': ['https://images.unsplash.com/photo-1520031441872-265149a9e690?auto=format&fit=crop&q=80&w=800'],
  'Velar': ['https://images.unsplash.com/photo-1679247496291-7221d68377b2?auto=format&fit=crop&q=80&w=800'],
  'Evoque': ['https://images.unsplash.com/photo-1605218427368-35b86d6db8f2?auto=format&fit=crop&q=80&w=800'],
  'Defender': ['https://images.unsplash.com/photo-1658428253106-2182b8214f48?auto=format&fit=crop&q=80&w=800'],
  'Discovery': ['https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&q=80&w=800'],

  // Porsche
  'Macan': ['https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=800'],
  'Cayenne': ['https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800'],
  'Panamera': ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800'],
  '911 Carrera': ['https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800'],
  'Taycan': ['https://images.unsplash.com/photo-1611821064430-0d4104044705?auto=format&fit=crop&q=80&w=800'],

  // Jaguar
  'XE': ['https://images.unsplash.com/photo-1621360841012-376353b174a7?auto=format&fit=crop&q=80&w=800'],
  'XF': ['https://images.unsplash.com/photo-1621360841012-376353b174a7?auto=format&fit=crop&q=80&w=800'],
  'F-PACE': ['https://images.unsplash.com/photo-1549520886-1d1134262b9f?auto=format&fit=crop&q=80&w=800'],
  'F-TYPE': ['https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'],

  // Volvo
  'XC40': ['https://images.unsplash.com/photo-1620882329739-122e26090c23?auto=format&fit=crop&q=80&w=800'],
  'XC60': ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800'],
  'XC90': ['https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800'],
  'S90': ['https://images.unsplash.com/photo-1620882329739-122e26090c23?auto=format&fit=crop&q=80&w=800'], 

  // Lexus
  'ES 300h': ['https://images.unsplash.com/photo-1609520505218-7421da376d75?auto=format&fit=crop&q=80&w=800'],
  'NX 350h': ['https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800'],
  'RX 350h': ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=800'],
  'LS 500h': ['https://images.unsplash.com/photo-1609520505218-7421da376d75?auto=format&fit=crop&q=80&w=800']
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800';

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

export const SAMPLE_CARS: Car[] = [
  ...EXISTING_CARS,
  ...generateCars(100)
];