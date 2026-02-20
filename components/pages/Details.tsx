import React from 'react';
import { Page, Car } from '@/types';

interface DetailsProps {
  car: Car;
  onNavigate: (page: Page) => void;
}

const Details: React.FC<DetailsProps> = ({ car, onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-[11px] text-silver-dark tracking-[0.1em]">
          <ol className="flex items-center gap-2">
            <li><span className="hover:text-silver-metallic cursor-pointer transition-colors duration-300" onClick={() => onNavigate(Page.HOME)}>Home</span></li>
            <li><span className="material-icons text-[10px] text-white/20">chevron_right</span></li>
            <li><span className="hover:text-silver-metallic cursor-pointer transition-colors duration-300" onClick={() => onNavigate(Page.INVENTORY)}>Inventory</span></li>
            <li><span className="material-icons text-[10px] text-white/20">chevron_right</span></li>
            <li className="text-silver-light font-medium">{car.make} {car.model}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Images & Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-navy-800 overflow-hidden border border-white/5">
              <div className="relative aspect-video w-full group">
                <img src={car.image} alt={car.model} className="object-cover w-full h-full" />
                <div className="absolute top-5 left-5 bg-navy-900/80 backdrop-blur-sm text-silver-light text-[10px] font-bold px-4 py-1.5 uppercase tracking-[0.15em] border border-white/10">
                  {car.tags?.[0] || 'Verified'}
                </div>
                <button className="absolute bottom-5 right-5 glass-card hover:bg-white/10 text-silver-light px-5 py-2.5 flex items-center gap-2.5 text-[11px] font-medium transition-all duration-300">
                  <span className="material-icons text-base">grid_view</span>
                  View Gallery
                </button>
              </div>
              <div className="flex p-4 gap-2 overflow-x-auto bg-navy-900">
                {car.gallery.map((img, idx) => (
                   <img key={idx} src={img} className="w-24 h-16 object-cover cursor-pointer opacity-50 hover:opacity-100 border border-white/10 hover:border-silver-metallic/30 transition-all duration-300" alt="thumb" />
                ))}
              </div>
            </div>

            <div className="bg-navy-800 p-10 border border-white/5">
              <h2 className="text-lg font-medium text-silver-light mb-8 flex items-center gap-3 border-b border-white/5 pb-5 uppercase tracking-[0.1em]">
                <span className="material-icons text-silver-metallic text-xl">speed</span>
                Technical Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
                {[
                  { l: 'Engine Capacity', v: '1997 cc' },
                  { l: 'Max Power', v: '201 BHP' },
                  { l: 'Max Torque', v: '300 Nm' },
                  { l: 'Transmission', v: `${car.transmission} 9G-Tronic` },
                  { l: 'Fuel Type', v: car.fuel },
                  { l: 'Registration', v: 'MH-02 (Mumbai)' },
                  { l: 'Ownership', v: '1st Owner' },
                  { l: 'Mileage', v: '16.9 kmpl' }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-silver-dark text-[10px] uppercase tracking-[0.2em]">{spec.l}</span>
                    <span className="text-lg font-serif font-bold text-silver-light">{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-800 p-10 border border-white/5">
              <h2 className="text-lg font-medium text-silver-light mb-6 uppercase tracking-[0.1em]">Vehicle Description</h2>
              <div className="text-silver-dark font-light leading-[1.9] text-[15px]">
                <p className="mb-5">
                  Immaculate condition {car.make} {car.model} {car.variant}. This vehicle has been meticulously maintained by a single owner and comes with a full service history from authorized centers. 
                </p>
                <p>
                  Key features include a panoramic sliding sunroof, ambient lighting, and a high-performance sound system. Recently passed our 150-point inspection check.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Actions */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-navy-800 border border-white/5 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] gold-line"></div>
                <div className="mb-6">
                  <p className="text-[11px] text-silver-dark font-medium tracking-[0.15em] uppercase">{car.year} Model</p>
                  <h1 className="text-2xl font-serif font-bold text-silver-light leading-tight mt-2">{car.make} {car.model}</h1>
                  <p className="text-sm text-silver-metallic mt-1.5 font-light">{car.variant}</p>
                </div>
                
                <div className="border-t border-b border-white/5 py-6 my-6">
                  <div className="text-3xl font-serif font-light text-silver-light">{car.price}</div>
                  <p className="text-[11px] text-silver-dark mt-2 flex items-center gap-1.5">
                    <span className="material-icons text-[13px] text-silver-metallic">calendar_month</span>
                    {'EMI starts @'} <span className="font-medium text-silver-metallic">{'₹85,400/mo'}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-silver-metallic hover:bg-champagne text-navy-900 font-bold py-4 px-4 transition-all duration-500 flex items-center justify-center gap-2.5 uppercase tracking-[0.15em] text-[11px] hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <span className="material-icons text-base">directions_car</span>
                    Book Test Drive
                  </button>
                  <button className="w-full border border-white/10 text-silver-light hover:border-silver-metallic/30 hover:bg-white/[0.02] font-medium py-4 px-4 transition-all duration-500 flex items-center justify-center gap-2.5 uppercase tracking-[0.15em] text-[11px]">
                    <span className="material-icons text-base">chat</span>
                    Inquire via WhatsApp
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-[9px] text-silver-dark border-t border-white/5 pt-6 uppercase tracking-[0.15em] font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-icons text-silver-metallic text-lg">verified</span>
                    <span>100-pt Check</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-icons text-silver-metallic text-lg">history</span>
                    <span>History</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-icons text-silver-metallic text-lg">security</span>
                    <span>Warranty</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-navy-700 rounded-full flex-shrink-0 overflow-hidden border border-white/10">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDkDNffse-3aCzfYnxHQMOGni1m6IO9zqrCoSrhFPpbD7Fd7QKv-LD45r9qkVm_6gtnDZ7LfzCIh4d7GcCeBIgwlNuqJQwNRCzBi_HOya8zPBYCv6BGIemfp2RAactMnGjXcCHY9XVeyWcLuODCiKkLZQeJg0oEKU5zWzCctbGv0AmtLbPBWShSCu0yriAANKA6xtZ92EeNOJrMpGMFDRF4xTKK1bKqeylgf9yqvzPGLCfyNy-ezHpRd1cZoXOJ3OhwVicHRvVGetj" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-silver-light">Rajesh Kumar</p>
                  <p className="text-[11px] text-silver-dark font-light">Sales Manager</p>
                </div>
                <button className="p-2.5 text-silver-metallic hover:bg-silver-metallic/10 rounded-full border border-white/10 hover:border-silver-metallic/30 transition-all duration-300">
                  <span className="material-icons text-xl">call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
