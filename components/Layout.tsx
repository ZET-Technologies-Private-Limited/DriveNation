import React, { useState, useEffect } from 'react';
import { Page } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<{ activePage: Page; onNavigate: (page: Page) => void }> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (page: Page) => 
    `relative text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer pb-1 ${
      activePage === page 
        ? 'text-silver-metallic' 
        : 'text-silver-dark hover:text-silver-light'
    }`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-navy-900/98 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-20' : 'h-28'}`}>
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate(Page.HOME)}
          >
            <div className="relative">
              <span className="material-icons text-silver-metallic text-3xl group-hover:text-champagne transition-colors duration-500">directions_car</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-silver-metallic transition-all duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-[0.15em] text-silver-light uppercase leading-none">DRIVE</span>
              <span className="font-light text-[9px] tracking-[0.5em] text-silver-metallic uppercase leading-none mt-1.5">NATION</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {[
              { page: Page.INVENTORY, label: 'Inventory' },
              { page: Page.SELL, label: 'Sell / Trade' },
              { page: Page.FINANCE, label: 'Finance' },
              { page: Page.SERVICE, label: 'Service' },
            ].map(({ page, label }) => (
              <span key={page} className={navLinkClass(page)} onClick={() => onNavigate(page)}>
                {label}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-silver-metallic transition-all duration-500 ${activePage === page ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </span>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex">
              <button 
                onClick={() => onNavigate(Page.LOGIN)}
                className="group relative overflow-hidden border border-silver-metallic/40 hover:border-silver-metallic text-silver-light px-7 py-2.5 transition-all duration-500 uppercase tracking-[0.15em] text-[10px] font-medium flex items-center gap-2.5"
              >
                <span className="absolute inset-0 bg-silver-metallic/0 group-hover:bg-silver-metallic/10 transition-all duration-500"></span>
                <span className="material-icons text-sm text-silver-metallic">person_outline</span>
                <span className="relative z-10">Sign In</span>
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-silver-light hover:text-silver-metallic focus:outline-none transition-colors duration-300"
              >
                <span className="material-icons text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full transition-all duration-500 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-navy-900/98 backdrop-blur-xl border-t border-white/5 px-6 py-8">
          <div className="space-y-1">
            {[
              { page: Page.INVENTORY, label: 'Inventory' },
              { page: Page.SELL, label: 'Sell / Trade' },
              { page: Page.FINANCE, label: 'Finance' },
              { page: Page.SERVICE, label: 'Service' },
            ].map(({ page, label }) => (
              <button
                key={page}
                onClick={() => { onNavigate(page); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3.5 text-sm font-light uppercase tracking-[0.2em] transition-all duration-300 border-l-2 ${
                  activePage === page 
                    ? 'border-silver-metallic text-silver-metallic bg-silver-metallic/5' 
                    : 'border-transparent text-silver-dark hover:text-silver-light hover:border-silver-metallic/30 hover:bg-white/[0.02]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <button
              onClick={() => { onNavigate(Page.LOGIN); setIsMobileMenuOpen(false); }}
              className="w-full border border-silver-metallic/30 text-silver-metallic py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-silver-metallic/10 transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] gold-line"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <span className="material-icons text-silver-metallic text-2xl">directions_car</span>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg tracking-[0.15em] text-silver-light uppercase leading-none">DRIVE</span>
                <span className="font-light text-[8px] tracking-[0.5em] text-silver-metallic uppercase leading-none mt-1">NATION</span>
              </div>
            </div>
            <p className="text-silver-dark text-sm leading-[1.8] mb-10 font-light">
              Redefining the pre-owned luxury car market in India with transparency, quality, and unmatched service.
            </p>
            <div className="flex gap-3">
              {['facebook', 'camera_alt', 'alternate_email'].map((icon) => (
                <a key={icon} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-silver-dark hover:text-silver-metallic hover:border-silver-metallic/40 transition-all duration-500 group">
                  <span className="material-icons text-sm group-hover:scale-110 transition-transform duration-300">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-silver-light font-medium mb-10 uppercase tracking-[0.2em] text-[11px]">Quick Links</h4>
            <ul className="space-y-4 text-sm text-silver-dark font-light">
              {['Inventory', 'Sell Your Car', 'Finance Options', 'Service Center', 'About Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-silver-metallic transition-colors duration-300 flex items-center gap-3 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-silver-metallic transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-silver-light font-medium mb-10 uppercase tracking-[0.2em] text-[11px]">Showrooms</h4>
            <ul className="space-y-8 text-sm text-silver-dark font-light">
              <li>
                <strong className="text-silver-light block mb-2 font-medium uppercase tracking-[0.15em] text-xs">Mumbai</strong>
                <span className="leading-relaxed">128, Worli Sea Face, Worli,<br/>Mumbai, Maharashtra 400030</span>
              </li>
              <li>
                <strong className="text-silver-light block mb-2 font-medium uppercase tracking-[0.15em] text-xs">Delhi NCR</strong>
                <span className="leading-relaxed">45, Golf Course Road, Sector 42,<br/>Gurugram, Haryana 122002</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-silver-light font-medium mb-10 uppercase tracking-[0.2em] text-[11px]">Contact</h4>
            <ul className="space-y-5 text-sm text-silver-dark font-light">
              <li className="flex items-center gap-4 group">
                <span className="material-icons text-silver-metallic text-base group-hover:scale-110 transition-transform duration-300">phone</span>
                <span>+91 92912 58688</span>
              </li>
              <li className="flex items-center gap-4 group">
                <span className="material-icons text-silver-metallic text-base group-hover:scale-110 transition-transform duration-300">email</span>
                <span>sadwik1409@gmail.com</span>
              </li>
              <li className="flex items-start gap-4 group">
                <span className="material-icons text-silver-metallic text-base mt-0.5 group-hover:scale-110 transition-transform duration-300">schedule</span>
                <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-silver-dark font-light tracking-[0.1em]">
          <p>{'© 2025 Drive Nation. Luxury Redefined.'}</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-silver-metallic transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-silver-metallic transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppButton: React.FC = () => (
  <a href="https://wa.me/919291258688" target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 z-50 group">
    <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-15"></div>
    <div className="relative bg-[#25D366] hover:bg-[#20b858] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.25)] transition-all duration-500 flex items-center justify-center w-14 h-14 hover:scale-105">
      <span className="material-icons text-2xl">chat</span>
    </div>
    <div className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 w-max px-4 py-2 glass-card text-silver-light text-[10px] font-medium uppercase tracking-[0.15em] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
      WhatsApp Us
    </div>
  </a>
);

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  return (
    <div className="bg-navy-900 min-h-screen text-gray-200 overflow-x-hidden">
      <Navbar activePage={activePage} onNavigate={onNavigate} />
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
