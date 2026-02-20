import React, { useState } from 'react';

const Finance: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(6100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(60);

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const emi = loanAmount * r * (Math.pow(1 + r, tenure) / (Math.pow(1 + r, tenure) - 1));
    return Math.round(emi).toLocaleString('en-IN');
  };

  return (
    <div className="bg-navy-900 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <header className="text-center mb-20">
          <span className="text-silver-metallic text-[10px] font-medium tracking-[0.3em] uppercase">Drive Nation Financial Services</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-silver-light mb-6 mt-5 leading-tight">Finance Your Legacy</h1>
          <div className="w-16 h-[1px] gold-line mx-auto mb-6"></div>
          <p className="text-lg text-silver-dark max-w-2xl mx-auto font-light leading-relaxed">
            Sophisticated financing structures tailored for the discerning collector. Competitive rates and transparent terms.
          </p>
        </header>

        <div className="bg-navy-800 border border-white/5 overflow-hidden">
          <div className="flex border-b border-white/5">
            <button className="flex-1 py-5 text-center font-medium text-silver-light border-b-2 border-silver-metallic text-[12px] uppercase tracking-[0.15em]">
              Auto Loan
            </button>
            <button className="flex-1 py-5 text-center font-light text-silver-dark hover:text-silver-light transition-colors duration-300 text-[12px] uppercase tracking-[0.15em]">
              Lease Options
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Controls */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <h2 className="text-2xl font-serif font-bold text-silver-light mb-2">Configure Your Plan</h2>
              <p className="text-silver-dark mb-12 text-sm font-light">Customize your payment structure using the sliders below.</p>

              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-medium text-silver-dark uppercase tracking-[0.15em]">Loan Amount</label>
                    <div className="text-xl font-serif font-bold text-silver-light">{'₹'} {loanAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <input 
                    type="range" 
                    min="500000" 
                    max="20000000" 
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-[2px] bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-medium text-silver-dark uppercase tracking-[0.15em]">Interest Rate</label>
                    <div className="text-xl font-serif font-bold text-silver-light">{interestRate}%</div>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="15" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-[2px] bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-medium text-silver-dark uppercase tracking-[0.15em]">Loan Tenure</label>
                    <div className="text-xl font-serif font-bold text-silver-light">{tenure} Months</div>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="84" 
                    step="12"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-[2px] bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-silver-dark font-medium tracking-wider">
                    <span>1 Year</span>
                    <span>7 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 bg-navy-900 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-medium text-silver-light mb-10 font-serif border-b border-white/5 pb-5 uppercase tracking-[0.1em]">Payment Summary</h3>
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-silver-dark font-light">Principal</span>
                    <span className="font-medium text-silver-light font-mono text-sm">{'₹'} {loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-silver-dark font-light">Total Interest</span>
                    <span className="font-medium text-silver-light font-mono text-sm">{'₹'} {Math.round((parseInt(calculateEMI().replace(/,/g, '')) * tenure) - loanAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-silver-dark font-light">Processing Fee</span>
                    <span className="font-medium text-silver-light font-mono text-sm">{'₹ 5,000'}</span>
                  </div>
                </div>

                <div className="glass-card p-8 mb-10">
                  <p className="text-[10px] text-silver-dark font-medium mb-3 uppercase tracking-[0.25em]">Estimated Monthly EMI</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-serif font-bold text-silver-light">{'₹'} {calculateEMI()}</span>
                    <span className="text-silver-dark text-sm font-light">/ mo</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-silver-metallic hover:bg-champagne text-navy-900 font-bold py-4 px-6 transition-all duration-500 uppercase tracking-[0.15em] text-[11px] flex items-center justify-center gap-2.5 hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                Apply for Loan <span className="material-icons text-sm">east</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[10px] font-medium text-silver-dark uppercase tracking-[0.3em] mb-12">Our Banking Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 hover:opacity-80 transition-all duration-700">
             {['HDFC BANK', 'ICICI Bank', 'SBI', 'AXIS BANK', 'Kotak'].map(bank => (
               <div key={bank} className="h-12 flex items-center justify-center bg-navy-800 px-8 border border-white/5 text-silver-light font-serif font-bold text-lg tracking-wide">
                 {bank}
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Finance;
