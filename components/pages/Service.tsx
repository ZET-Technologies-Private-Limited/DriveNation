import React from 'react';

const Service: React.FC = () => {
  return (
    <div className="bg-navy-900 min-h-screen pt-28 pb-16">
      {/* Hero */}
      <div className="relative h-80 w-full overflow-hidden mb-20">
        <img 
          src="https://images.unsplash.com/photo-1597762470488-387751f538c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Luxury Garage" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
            <span className="text-silver-metallic text-[10px] font-medium tracking-[0.3em] uppercase block mb-4">Service Center</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-silver-light mb-4 leading-tight">World-Class Care</h1>
            <p className="text-lg text-silver-dark font-light max-w-2xl leading-relaxed">
                Maintain the peak performance of your luxury vehicle with our state-of-the-art service centers.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Services List */}
            <div>
                <h2 className="text-3xl font-serif font-bold text-silver-light mb-10 border-b border-white/5 pb-5">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: 'Periodic Maintenance', desc: 'Comprehensive checks, oil changes, and filter replacements.', icon: 'build' },
                        { title: 'Detailing & Spa', desc: 'Ceramic coating, interior deep cleaning, and paint protection.', icon: 'cleaning_services' },
                        { title: 'Advanced Diagnostics', desc: 'Computerized scanning for engine, transmission, and electronics.', icon: 'monitor_heart' },
                        { title: 'Body & Paint', desc: 'Factory-finish denting and painting services.', icon: 'format_paint' }
                    ].map((svc, idx) => (
                        <div key={idx} className="bg-navy-800 p-7 border border-white/5 hover:border-silver-metallic/20 transition-all duration-500 group">
                            <span className="material-icons text-2xl text-silver-metallic mb-5 group-hover:scale-110 transition-transform duration-500 block opacity-70 group-hover:opacity-100">{svc.icon}</span>
                            <h3 className="text-base font-medium text-silver-light mb-2.5 uppercase tracking-[0.1em]">{svc.title}</h3>
                            <p className="text-sm text-silver-dark leading-relaxed font-light">{svc.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 glass-card p-8 border-l-2 border-silver-metallic relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-silver-metallic/[0.03] rounded-full blur-2xl"></div>
                    <h3 className="text-lg font-serif font-bold text-silver-light mb-3">24/7 Roadside Assistance</h3>
                    <p className="text-silver-dark font-light mb-5 text-sm leading-relaxed">Stuck somewhere? We are just a call away for our premium members.</p>
                    <div className="flex items-center gap-3 text-silver-metallic font-medium text-lg">
                        <span className="material-icons">phone_in_talk</span> +91 92912 58688
                    </div>
                </div>
            </div>

            {/* Booking Form */}
            <div>
                <div className="bg-navy-800 border border-white/5 p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] gold-line"></div>
                    <h2 className="text-2xl font-serif font-bold text-silver-light mb-2">Book an Appointment</h2>
                    <p className="text-silver-dark mb-10 text-sm font-light">Fill in the details below and our service advisor will contact you shortly.</p>

                    <form className="space-y-7">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Full Name</label>
                                <input type="text" className="w-full bg-navy-900 border border-white/10 p-3.5 text-silver-light focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm font-light" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Phone Number</label>
                                <input type="text" className="w-full bg-navy-900 border border-white/10 p-3.5 text-silver-light focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm font-light" placeholder="+91 98765..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Vehicle Details</label>
                            <input type="text" className="w-full bg-navy-900 border border-white/10 p-3.5 text-silver-light focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm font-light" placeholder="e.g. BMW X5 2021" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Service Type</label>
                                <select className="w-full bg-navy-900 border border-white/10 p-3.5 text-silver-light focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm font-light">
                                    <option>General Service</option>
                                    <option>Detailing</option>
                                    <option>Repair</option>
                                    <option>Inspection</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Preferred Date</label>
                                <input type="date" className="w-full bg-navy-900 border border-white/10 p-3.5 text-silver-light focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm" />
                            </div>
                        </div>

                        <button className="w-full bg-silver-metallic hover:bg-champagne text-navy-900 font-bold py-4 transition-all duration-500 uppercase tracking-[0.15em] text-[11px] flex items-center justify-center gap-2.5 hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                            Confirm Booking <span className="material-icons text-sm">east</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
