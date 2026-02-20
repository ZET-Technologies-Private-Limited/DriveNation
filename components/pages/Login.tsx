import React from 'react';
import { Page } from '@/types';

const Login: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex h-screen bg-navy-900">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuANxTdnENSLVIdqiHEW0VfNgSROtw5IbiW-Cn-CzNCXlo0LocR_Vf7YT-w9KvixSpUQ79gUIDAf6AhQByPd0wtEGnMyynPgWyR5TTD9JqKWD8tNefEt3aXgzg5GqjfX7mU4AN5uaE9VHh4UAPgvhMA2Fz4HWFxgRusByaxt8taaJ_vqPrQ4Xk3BPrJr95WpZjqpEUrS_Lc4RGActO8-NOyotFlZeZsIwXeQAoHbU4okq45h8zubZ4GA-dodXp_qjvSn8w-BjpX89YTv" 
          alt="Luxury Car Interior" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-navy-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        
        {/* Decorative line */}
        <div className="absolute top-1/4 right-12 w-[1px] h-32 bg-gradient-to-b from-transparent via-silver-metallic/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-14 text-silver-light">
          <div className="flex items-center gap-2 mb-5 text-silver-metallic font-medium text-[10px] uppercase tracking-[0.3em]">
            <span className="w-6 h-[1px] bg-silver-metallic"></span>
            Premium Experience
          </div>
          <h2 className="text-5xl font-serif font-bold mb-5 leading-tight">{"India\u2019s finest"}<br/>luxury fleet.</h2>
          <p className="text-silver-dark font-light text-lg max-w-md leading-relaxed">Join the elite community of motoring enthusiasts across the nation.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <button onClick={() => onNavigate(Page.HOME)} className="absolute top-8 right-8 text-silver-dark hover:text-silver-light flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors duration-300">
          <span className="material-icons text-sm">close</span> Close
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-serif font-bold text-silver-light mb-3">Namaste! Welcome Back</h1>
          <p className="text-silver-dark mb-10 font-light">Please enter your details to sign in.</p>

          <div className="bg-navy-800 p-1 flex mb-10 border border-white/5">
            <button className="flex-1 py-2.5 bg-silver-metallic text-navy-900 font-bold text-[11px] uppercase tracking-[0.15em]">Sign In</button>
            <button className="flex-1 py-2.5 text-silver-dark hover:text-silver-light font-medium text-[11px] uppercase tracking-[0.15em] transition-colors duration-300">Sign Up</button>
          </div>

          <form className="space-y-7">
            <div>
              <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Mobile or Email</label>
              <div className="relative">
                <span className="material-icons absolute left-4 top-3.5 text-silver-dark/40 text-lg">smartphone</span>
                <input type="text" className="w-full bg-navy-800 border border-white/10 text-silver-light pl-11 pr-4 py-3.5 focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm font-light" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-silver-dark uppercase tracking-[0.2em] mb-3">Password</label>
              <div className="relative">
                <span className="material-icons absolute left-4 top-3.5 text-silver-dark/40 text-lg">lock</span>
                <input type="password" className="w-full bg-navy-800 border border-white/10 text-silver-light pl-11 pr-4 py-3.5 focus:border-silver-metallic/40 outline-none transition-all duration-300 text-sm" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2.5 text-silver-dark cursor-pointer">
                <input type="checkbox" className="rounded bg-navy-800 border-white/10 text-silver-metallic focus:ring-0 accent-yellow-600" />
                <span className="text-[12px] font-light">Remember me</span>
              </label>
              <a href="#" className="text-silver-metallic hover:text-champagne transition-colors duration-300 text-[12px] font-light">Forgot password?</a>
            </div>

            <button type="button" className="w-full bg-silver-metallic hover:bg-champagne text-navy-900 font-bold py-3.5 transition-all duration-500 uppercase tracking-[0.15em] text-[11px] hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
              Sign In to Drive Nation
            </button>
          </form>

          <div className="mt-10 flex gap-4">
             <button className="flex-1 flex items-center justify-center gap-2.5 border border-white/10 py-3 hover:border-silver-metallic/20 hover:bg-white/[0.02] transition-all duration-300 text-silver-light text-[12px] font-light">
               <span className="text-silver-metallic font-bold">G</span> Google
             </button>
             <button className="flex-1 flex items-center justify-center gap-2.5 border border-white/10 py-3 hover:border-silver-metallic/20 hover:bg-white/[0.02] transition-all duration-300 text-silver-light text-[12px] font-light">
               <span className="material-icons text-sm">apple</span> Apple
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
