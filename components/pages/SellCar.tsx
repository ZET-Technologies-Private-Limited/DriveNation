import React from 'react';

const SellCar: React.FC = () => {
  return (
    <div className="bg-navy-900 min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-silver-metallic text-[10px] font-medium tracking-[0.3em] uppercase block mb-4">Valuation</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-silver-light mb-3">Sell Your Car</h1>
        <p className="text-silver-dark mb-12 font-light">Get the best market price in 3 easy steps.</p>

        <div className="bg-navy-800 border border-white/5 p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] gold-line"></div>
          
          {/* Progress */}
          <div className="flex justify-between mb-14 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-0"></div>
            <div className="absolute top-1/2 left-0 w-1/3 h-[1px] bg-silver-metallic -z-0"></div>
            
            {['Details', 'Photos', 'Valuation'].map((step, idx) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] transition-all duration-500 ${
                  idx === 0 
                    ? 'bg-silver-metallic text-navy-900 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'bg-navy-900 text-silver-dark border border-white/10'
                }`}>
                  {idx === 0 ? <span className="material-icons text-sm">check</span> : idx + 1}
                </div>
                <span className={`mt-3 text-[10px] font-medium uppercase tracking-[0.2em] ${idx === 0 ? 'text-silver-metallic' : 'text-silver-dark'}`}>{step}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="space-y-10">
            <h2 className="text-lg font-medium text-silver-light border-b border-white/5 pb-5 uppercase tracking-[0.1em]">Vehicle Condition</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-medium text-silver-dark mb-4 uppercase tracking-[0.15em]">Accident History</label>
                <div className="flex gap-4">
                  {['None', 'Yes'].map(opt => (
                    <label key={opt} className="flex-1 border border-white/10 p-4 cursor-pointer hover:border-silver-metallic/30 hover:bg-white/[0.02] transition-all duration-300 flex items-center gap-3">
                      <input type="radio" name="accident" className="accent-yellow-600" />
                      <span className="text-silver-light text-sm font-light">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-medium text-silver-dark mb-4 uppercase tracking-[0.15em]">Service History</label>
                <div className="flex gap-4">
                  {['Available', 'Partial/None'].map(opt => (
                    <label key={opt} className="flex-1 border border-white/10 p-4 cursor-pointer hover:border-silver-metallic/30 hover:bg-white/[0.02] transition-all duration-300 flex items-center gap-3">
                      <input type="radio" name="service" className="accent-yellow-600" defaultChecked={opt==='Available'} />
                      <span className="text-silver-light text-sm font-light">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-silver-dark mb-4 uppercase tracking-[0.15em]">Upload Photos (Optional)</label>
              <div className="border border-dashed border-white/10 p-10 flex flex-col items-center justify-center hover:border-silver-metallic/20 hover:bg-white/[0.01] transition-all duration-500 cursor-pointer">
                <span className="material-icons text-3xl text-silver-dark mb-3 opacity-50">add_photo_alternate</span>
                <span className="text-sm text-silver-dark font-light">Click to upload or drag & drop</span>
                <span className="text-[11px] text-silver-dark/50 mt-1.5">JPG, PNG up to 10MB</span>
              </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-white/5">
              <button className="text-silver-dark hover:text-silver-light font-light px-6 py-2.5 transition-colors duration-300 text-sm">Back</button>
              <button className="bg-silver-metallic hover:bg-champagne text-navy-900 font-bold px-10 py-3 uppercase tracking-[0.15em] text-[11px] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCar;
