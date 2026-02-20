import React, { useState, useMemo } from 'react';
import { SAMPLE_CARS, Car } from '@/types';

interface InventoryProps {
  onCarSelect: (carId: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onCarSelect }) => {
  const [sortBy, setSortBy] = useState<string>('year_new');

  const getKmValue = (kmStr: string) => {
    const val = parseFloat(kmStr.replace(/[^0-9.]/g, ''));
    return kmStr.toLowerCase().includes('k') ? val * 1000 : val;
  };

  const sortedCars = useMemo(() => {
    const cars = [...SAMPLE_CARS];
    switch (sortBy) {
      case 'price_high':
        return cars.sort((a, b) => b.priceNum - a.priceNum);
      case 'price_low':
        return cars.sort((a, b) => a.priceNum - b.priceNum);
      case 'year_new':
        return cars.sort((a, b) => b.year - a.year);
      case 'year_old':
        return cars.sort((a, b) => a.year - b.year);
      case 'mileage_low':
        return cars.sort((a, b) => getKmValue(a.km) - getKmValue(b.km));
      case 'mileage_high':
        return cars.sort((a, b) => getKmValue(b.km) - getKmValue(a.km));
      default:
        return cars;
    }
  }, [sortBy]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-navy-900 pt-28">
      {/* Sidebar Filter */}
      <aside className="w-full lg:w-80 bg-navy-800 text-gray-100 flex-shrink-0 p-8 space-y-10 border-r border-white/5 lg:min-h-screen">
        <div className="flex items-center justify-between pb-5 border-b border-white/5">
          <h2 className="text-sm font-medium flex items-center gap-2.5 text-silver-light uppercase tracking-[0.15em]">
            <span className="material-icons text-silver-metallic text-lg">tune</span> Filters
          </h2>
          <button className="text-[10px] font-medium text-silver-metallic hover:text-champagne uppercase tracking-[0.15em] transition-colors duration-300">Reset</button>
        </div>

        <div className="space-y-5">
          <h3 className="font-medium text-sm text-silver-light uppercase tracking-[0.1em]">Price Range</h3>
          <div className="flex justify-between text-[10px] mb-2 text-silver-dark font-medium tracking-wider">
            <span>{'₹5L'}</span>
            <span>{'₹2Cr+'}</span>
          </div>
          <div className="relative h-[2px] bg-white/10 rounded-full">
            <div className="absolute left-1/4 right-1/4 h-[2px] bg-silver-metallic rounded-full"></div>
            <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 bg-silver-metallic rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)] cursor-pointer border-2 border-navy-900"></div>
            <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 bg-silver-metallic rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)] cursor-pointer border-2 border-navy-900"></div>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="w-1/2">
              <label className="text-[10px] text-silver-dark block mb-2 uppercase tracking-[0.15em]">Min</label>
              <input className="w-full pl-3 py-2.5 text-sm bg-navy-900 text-silver-light border border-white/10 focus:border-silver-metallic/40 outline-none transition-colors duration-300" type="text" defaultValue="15,00,000" />
            </div>
            <div className="w-1/2">
              <label className="text-[10px] text-silver-dark block mb-2 uppercase tracking-[0.15em]">Max</label>
              <input className="w-full pl-3 py-2.5 text-sm bg-navy-900 text-silver-light border border-white/10 focus:border-silver-metallic/40 outline-none transition-colors duration-300" type="text" defaultValue="85,00,000" />
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-8 border-t border-white/5">
          <h3 className="font-medium text-sm text-silver-light uppercase tracking-[0.1em]">Body Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Luxury'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded-sm text-silver-metallic border-white/20 bg-navy-900 focus:ring-silver-metallic/30 w-4 h-4 accent-yellow-600" />
                <span className="text-sm text-silver-dark group-hover:text-silver-light transition-colors duration-300 font-light">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-navy-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-silver-light tracking-tight">Premium Inventory</h1>
            <p className="text-silver-dark text-sm mt-2 font-light">{`Showing ${sortedCars.length} vehicles available`}</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-navy-800 text-silver-light text-sm border border-white/10 py-2.5 pl-4 pr-8 focus:border-silver-metallic/40 outline-none transition-colors duration-300"
            >
              <option value="year_new">Sort by: Newest Year</option>
              <option value="year_old">Sort by: Oldest Year</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="mileage_low">Mileage: Low to High</option>
              <option value="mileage_high">Mileage: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-32">
          {sortedCars.map((car: Car) => (
            <div key={car.id} className="bg-navy-800 overflow-hidden group flex flex-col border border-white/5 hover:border-silver-metallic/20 transition-all duration-700 hover:shadow-[0_16px_50px_rgba(0,0,0,0.3)]">
              <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onCarSelect(car.id)}>
                {car.tags && car.tags.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-silver-metallic text-navy-900 text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]">
                    {car.tags[0]}
                  </div>
                )}
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out" src={car.image} alt={car.model} />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-navy-900 to-transparent"></div>
                <div className="absolute bottom-5 left-6 right-6 text-silver-light">
                  <h3 className="text-xl font-bold leading-none tracking-tight font-serif">{car.make} {car.model}</h3>
                  <p className="text-[10px] text-silver-dark mt-1.5 uppercase tracking-[0.15em]">{car.variant}</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-5">
                  <p className="text-xl font-serif font-bold text-silver-light">{car.price}</p>
                  <div className="text-[10px] font-medium text-silver-dark bg-navy-900 px-3 py-1.5 border border-white/5">{`EMI from ₹${(car.priceNum / 60 / 1000).toFixed(0)}k`}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-t border-b border-white/5">
                  {[
                    { i: 'speed', v: car.km },
                    { i: 'local_gas_station', v: car.fuel },
                    { i: 'settings', v: car.transmission }
                  ].map((spec, idx) => (
                    <div key={idx} className={`flex flex-col items-center justify-center text-center px-2 ${idx < 2 ? 'border-r border-white/5' : ''}`}>
                      <span className="material-icons text-silver-metallic text-base mb-1.5 opacity-60">{spec.i}</span>
                      <span className="text-[11px] font-medium text-silver-dark">{spec.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <button 
                    onClick={() => onCarSelect(car.id)}
                    className="w-full bg-silver-metallic hover:bg-champagne text-navy-900 text-[11px] font-bold py-3 px-5 transition-all duration-500 uppercase tracking-[0.15em] hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Inventory;
