import React from 'react';
import { Page, SAMPLE_CARS } from '@/types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onCarSelect: (carId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onCarSelect }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden bg-navy-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx3VK-kSWPf86zUKz1om1jWi0PM3aGfnLxTLa5w6-ccc0stW_ol04bjoKHQ9cNPCnKVNbHQQvPWEY_ftmZrLMgEN2rAc2uxpMUwxqEmMUFfdK7Q7Ktpzi2fcBMCkkSmiVwTMT6pTmmEYrTHYLxleKxz29UiBe05F5MgTQofTQHRvnhgSH1wmLW2wDKAGTMf-MuhmfjCeZzB2YG6As10sXc6yAZWeZIfqBcSxAB4I_IaM7kekkx2bL-3swvUJaspWIY2BqRy6epjJ_B" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/50 to-transparent"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-10 w-[1px] h-40 bg-gradient-to-b from-transparent via-silver-metallic/20 to-transparent hidden lg:block"></div>
        <div className="absolute bottom-1/3 left-10 w-[1px] h-32 bg-gradient-to-b from-transparent via-silver-metallic/20 to-transparent hidden lg:block"></div>

        <div className="relative z-10 container mx-auto px-6 mt-16 sm:mt-0">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 border-l-2 border-silver-metallic text-silver-dark text-[11px] tracking-[0.25em] uppercase mb-10 bg-navy-900/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-silver-metallic rounded-full"></span>
              Now Available in Mumbai & Delhi
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-silver-light mb-8 leading-[1.05]">
              Drive the <br/>
              <span className="text-silver-gradient italic font-bold">Extraordinary.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-silver-dark mb-14 max-w-xl font-light leading-[1.8] border-l border-silver-metallic/20 pl-6">
              {"India\u2019s premier destination for pre-owned luxury vehicles. Verified quality, instant finance, and nationwide delivery."}
            </p>

            <div className="glass-card p-8 max-w-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] gold-line"></div>
              <form className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 border-b border-white/10 pb-3 group">
                  <label className="block text-[10px] text-silver-metallic uppercase tracking-[0.2em] mb-3 font-medium">Make</label>
                  <select className="w-full bg-transparent border-none p-0 text-silver-light focus:ring-0 text-lg font-light cursor-pointer outline-none">
                    <option className="bg-navy-900">Any Make</option>
                    <option className="bg-navy-900">Audi</option>
                    <option className="bg-navy-900">BMW</option>
                    <option className="bg-navy-900">Mercedes-Benz</option>
                  </select>
                </div>
                <div className="flex-1 border-b border-white/10 pb-3">
                  <label className="block text-[10px] text-silver-metallic uppercase tracking-[0.2em] mb-3 font-medium">Model</label>
                  <input type="text" placeholder="e.g. Q8, X5..." className="w-full bg-transparent border-none p-0 text-silver-light placeholder-white/20 focus:ring-0 text-lg font-light outline-none" />
                </div>
                <div className="flex items-end">
                  <button 
                    type="button"
                    onClick={() => onNavigate(Page.INVENTORY)}
                    className="w-full md:w-auto bg-silver-metallic hover:bg-champagne text-navy-900 px-12 py-3.5 font-bold uppercase tracking-[0.15em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                  >
                    <span className="material-icons text-sm">search</span>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.3em] text-silver-dark/50 font-medium">Scroll</span>
          <span className="h-14 w-[1px] bg-gradient-to-b from-silver-metallic/30 to-transparent"></span>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 border-b border-white/5 bg-navy-900 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { icon: 'verified_user', val: '150+', label: 'Checkpoints' },
              { icon: 'currency_rupee', val: 'Zero', label: 'Processing Fees' },
              { icon: 'local_shipping', val: 'Pan-India', label: 'Delivery' },
              { icon: 'history', val: '7-Day', label: 'Return Policy' },
            ].map((stat, idx) => (
              <div key={idx} className="group space-y-4 px-4 relative">
                {idx > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/5 hidden md:block"></div>}
                <span className="material-icons text-silver-metallic text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{stat.icon}</span>
                <h3 className="text-3xl font-serif font-light text-silver-light">{stat.val}</h3>
                <p className="text-[10px] text-silver-dark uppercase tracking-[0.25em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Arrivals */}
      <section className="py-28 bg-navy-800 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-silver-metallic/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-silver-metallic/[0.02] rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-silver-metallic text-[10px] font-medium tracking-[0.3em] uppercase block mb-4">Curated Selection</span>
              <h2 className="text-3xl md:text-5xl font-serif text-silver-light font-bold leading-tight">Featured Arrivals</h2>
              <p className="text-silver-dark text-sm mt-4 font-light max-w-md leading-relaxed">Handpicked luxury for the discerning few.</p>
            </div>
            <button onClick={() => onNavigate(Page.INVENTORY)} className="hidden md:flex items-center text-silver-metallic hover:text-champagne font-medium transition-all duration-500 group text-[11px] uppercase tracking-[0.15em] gap-2">
              View All 
              <span className="material-icons text-sm group-hover:translate-x-2 transition-transform duration-500">east</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_CARS.slice(0, 3).map((car) => (
              <div key={car.id} onClick={() => onCarSelect(car.id)} className="group bg-navy-900 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-700 border border-white/5 hover:border-silver-metallic/20 cursor-pointer overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.model} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out filter saturate-[0.85] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-70"></div>
                  {car.tags && car.tags[0] && (
                    <div className="absolute top-5 left-5 bg-silver-metallic text-navy-900 text-[9px] font-bold px-4 py-1.5 uppercase tracking-[0.2em]">
                      {car.tags[0]}
                    </div>
                  )}
                  <div className="absolute bottom-5 right-5 bg-navy-900/80 backdrop-blur-sm text-silver-metallic text-[10px] font-medium px-3 py-1.5 flex items-center gap-1.5 border border-silver-metallic/20">
                    <span className="material-icons text-[12px]">photo_camera</span> 8
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-silver-light mb-1.5 font-serif">{car.make} {car.model}</h3>
                  <div className="text-[10px] text-silver-dark uppercase tracking-[0.2em] mb-7">{car.year} &middot; {car.variant}</div>
                  
                  <div className="grid grid-cols-3 gap-4 py-5 border-t border-white/5 mb-7">
                    {[
                      { icon: 'speed', val: car.km },
                      { icon: 'local_gas_station', val: car.fuel },
                      { icon: 'settings', val: car.transmission }
                    ].map((feat, i) => (
                      <div key={i} className={`text-center ${i > 0 ? 'border-l border-white/5' : ''}`}>
                        <span className="material-icons text-silver-metallic text-base mb-1.5 block opacity-60">{feat.icon}</span>
                        <span className="text-[11px] font-medium text-silver-dark">{feat.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="text-[9px] text-silver-dark uppercase tracking-[0.25em] block mb-1.5">Price</span>
                      <div className="text-2xl font-serif font-light text-silver-light">{car.price}</div>
                    </div>
                    <button className="border border-silver-metallic/30 text-silver-metallic hover:bg-silver-metallic hover:text-navy-900 px-6 py-2.5 transition-all duration-500 text-[10px] uppercase tracking-[0.15em] font-semibold">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <button onClick={() => onNavigate(Page.INVENTORY)} className="text-silver-metallic text-[11px] uppercase tracking-[0.15em] font-medium flex items-center gap-2 mx-auto">
              View Full Inventory <span className="material-icons text-sm">east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services/Marketing Section */}
      <section className="py-28 bg-navy-900 border-t border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 border border-silver-metallic/10 group-hover:border-silver-metallic/20 transition-all duration-700"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-silver-metallic/10 -z-10"></div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm-JLvK_10HkZ0RFDaLhLbuYw13-DrSg9918KHkJwHfmkGf_u4wXYHhaOWsvbiXIJAlGPWdo18oi4Y9RIVfWgcZl0VoQJiBbphTVUwgkO01n-bf3_BF10FmWbZ4iK99wXw4io-cYYvMGBbVjJE9FZY0Rs-U47usPMAb2X-BR7KNSt_5vNWBetwcpWu6D7hW7RPbnu3ywOYBSbOgNONj7uBKgbCvPnzZ8PI2eDWw929rx2haXWOWwrOFN3D5n_LdjCad4zQTATsK-uL" 
                alt="Luxury Interior" 
                className="relative z-10 w-full object-cover h-[500px] filter contrast-110 group-hover:contrast-125 transition-all duration-700"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-silver-metallic text-[10px] font-medium tracking-[0.3em] uppercase block mb-4">Premium Services</span>
              <h2 className="text-4xl md:text-5xl font-serif text-silver-light mb-8 font-bold leading-tight">The Royal<br/>Treatment</h2>
              <p className="text-silver-dark mb-12 leading-[1.8] font-light text-base">
                At Drive Nation, ownership is an experience, not just a transaction. We offer a comprehensive suite of services designed for the elite.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: 'handshake', title: 'Sell or Trade-In', desc: 'Get the market-leading value for your vehicle with our transparent evaluation.', action: () => onNavigate(Page.SELL) },
                  { icon: 'account_balance', title: 'Premium Finance', desc: 'Exclusive rates and tailored financial solutions from top banking partners.', action: () => onNavigate(Page.FINANCE) },
                  { icon: 'build', title: 'Expert Service', desc: 'State-of-the-art diagnostics and care to keep your machine in peak condition.', action: () => {} },
                ].map((service, idx) => (
                  <div key={idx} className="flex gap-6 group/item cursor-pointer" onClick={service.action}>
                    <div className="bg-silver-metallic/5 p-4 h-fit border border-silver-metallic/10 group-hover/item:border-silver-metallic/40 group-hover/item:bg-silver-metallic/10 transition-all duration-500">
                      <span className="material-icons text-silver-metallic">{service.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-silver-light mb-2 uppercase tracking-[0.1em] group-hover/item:text-silver-metallic transition-colors duration-500">{service.title}</h4>
                      <p className="text-sm text-silver-dark font-light leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Trust Banner */}
      <section className="py-20 bg-navy-800 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-silver-metallic/[0.03] via-transparent to-silver-metallic/[0.03]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="material-icons text-silver-metallic text-3xl mb-6 block opacity-40">format_quote</span>
          <blockquote className="text-2xl md:text-3xl font-serif text-silver-light font-light leading-relaxed max-w-3xl mx-auto italic">
            {"\"The most seamless car buying experience I've ever had. Truly world-class from start to finish.\""}
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="text-silver-light text-sm font-medium uppercase tracking-[0.1em]">Arjun Mehta</span>
            <span className="text-silver-dark text-xs font-light">BMW X7 Owner, Mumbai</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
