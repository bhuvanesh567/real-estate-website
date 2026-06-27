'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Landmark, Info } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export default function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(propertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // default 20%
  const [interestRate, setInterestRate] = useState(6.2); // default 6.2%
  const [loanTerm, setLoanTerm] = useState(30); // default 30 years

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [breakdown, setBreakdown] = useState({
    principalAndInterest: 0,
    propertyTax: 0,
    homeInsurance: 0,
    hoa: 250,
  });

  // Recalculate whenever inputs change
  useEffect(() => {
    const downPaymentAmount = price * (downPaymentPercent / 100);
    const loanAmount = price - downPaymentAmount;
    
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;
    
    let piPayment = 0;
    if (monthlyRate === 0) {
      piPayment = loanAmount / totalPayments;
    } else {
      piPayment = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) / 
                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const monthlyTax = (price * 0.01) / 12; // 1% annual tax
    const monthlyInsurance = (price * 0.0025) / 12; // 0.25% annual insurance
    const hoaFee = 250;

    const total = piPayment + monthlyTax + monthlyInsurance + hoaFee;
    
    setMonthlyPayment(isNaN(total) || !isFinite(total) ? 0 : Math.round(total));
    setBreakdown({
      principalAndInterest: isNaN(piPayment) || !isFinite(piPayment) ? 0 : Math.round(piPayment),
      propertyTax: Math.round(monthlyTax),
      homeInsurance: Math.round(monthlyInsurance),
      hoa: hoaFee,
    });
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  // Handle prop price change
  useEffect(() => {
    setPrice(propertyPrice);
  }, [propertyPrice]);

  const downPaymentValue = Math.round(price * (downPaymentPercent / 100));

  // Donut chart calculations
  const totalBreakdown = breakdown.principalAndInterest + breakdown.propertyTax + breakdown.homeInsurance + breakdown.hoa;
  
  const getPercentage = (value: number) => {
    if (totalBreakdown === 0) return 0;
    return (value / totalBreakdown) * 100;
  };

  const piPct = getPercentage(breakdown.principalAndInterest);
  const taxPct = getPercentage(breakdown.propertyTax);
  const insPct = getPercentage(breakdown.homeInsurance);
  const hoaPct = getPercentage(breakdown.hoa);

  // SVG Circular Dasharray calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  const piOffset = circumference - (piPct / 100) * circumference;
  const taxOffset = circumference - ((piPct + taxPct) / 100) * circumference;
  const insOffset = circumference - ((piPct + taxPct + insPct) / 100) * circumference;
  const hoaOffset = circumference - ((piPct + taxPct + insPct + hoaPct) / 100) * circumference;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div id="financials" className="glass rounded-3xl p-6 md:p-8 shadow-2xl border border-foreground/5 bg-background">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-2xl bg-gold-accent/10 text-gold-accent">
          <Landmark className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
            Mortgage Calculator
          </h3>
          <p className="text-xs font-light text-foreground/50">
            Estimate your monthly payments for this luxury listing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Pane: Inputs */}
        <div className="space-y-5">
          {/* Property price input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-foreground/60 uppercase">
              <label>Property Purchase Price</label>
              <span>{formatCurrency(price)}</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-foreground/40">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full h-12 pl-10 pr-4 bg-foreground/5 border border-foreground/10 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-foreground"
              />
            </div>
          </div>

          {/* Down payment input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-foreground/60 uppercase">
              <label>Down Payment ({downPaymentPercent}%)</label>
              <span className="text-gold-accent">{formatCurrency(downPaymentValue)}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-foreground/40">
                  <Percent className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                  className="w-full h-12 pl-10 pr-4 bg-foreground/5 border border-foreground/10 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-foreground"
                />
              </div>
              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value, 10))}
                className="w-1/2"
              />
            </div>
          </div>

          {/* Row: Rate and Term */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-foreground/60 uppercase">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={20}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="w-full h-12 px-4 bg-foreground/5 border border-foreground/10 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-foreground"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/40">%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider text-foreground/60 uppercase">
                Loan Term
              </label>
              <div className="relative">
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
                  className="w-full h-12 px-4 bg-foreground/5 border border-foreground/10 rounded-xl text-sm focus:outline-none focus:border-gold-accent text-foreground"
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground/40">
                  <Calendar className="h-4 w-4 inline ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Output Donut & Legend */}
        <div className="glass rounded-2xl p-6 border border-foreground/5 bg-foreground/5 flex flex-col md:flex-row items-center justify-around gap-6">
          {/* SVG Donut */}
          <div className="relative h-44 w-44 flex items-center justify-center">
            <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-foreground/5 fill-none"
                strokeWidth="10"
              />
              {/* Principal & Interest */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-gold-accent fill-none transition-all duration-500"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={piOffset}
                strokeLinecap="round"
              />
              {/* Property Tax */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-obsidian-600 dark:stroke-obsidian-300 fill-none transition-all duration-500"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={taxOffset}
                strokeLinecap="round"
              />
              {/* Home Insurance */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-obsidian-400 dark:stroke-obsidian-500 fill-none transition-all duration-500"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={insOffset}
                strokeLinecap="round"
              />
              {/* HOA */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-obsidian-300 dark:stroke-obsidian-700 fill-none transition-all duration-500"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={hoaOffset}
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Est. Monthly</span>
              <span className="text-xl font-bold tracking-tight text-foreground mt-0.5">
                {formatCurrency(monthlyPayment)}
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex-1 space-y-3.5 w-full">
            {/* Principal & Interest */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 font-light">
                <span className="h-3 w-3 rounded-full bg-gold-accent" />
                Principal & Interest
              </div>
              <span className="font-semibold">{formatCurrency(breakdown.principalAndInterest)}</span>
            </div>

            {/* Property tax */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 font-light">
                <span className="h-3 w-3 rounded-full bg-obsidian-600 dark:bg-obsidian-300" />
                Property Tax (1% est)
              </div>
              <span className="font-semibold">{formatCurrency(breakdown.propertyTax)}</span>
            </div>

            {/* Home insurance */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 font-light">
                <span className="h-3 w-3 rounded-full bg-obsidian-400 dark:bg-obsidian-500" />
                Home Insurance (est)
              </div>
              <span className="font-semibold">{formatCurrency(breakdown.homeInsurance)}</span>
            </div>

            {/* HOA */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 font-light">
                <span className="h-3 w-3 rounded-full bg-obsidian-300 dark:bg-obsidian-700" />
                HOA Fees
              </div>
              <span className="font-semibold">{formatCurrency(breakdown.hoa)}</span>
            </div>

            <div className="pt-2 border-t border-foreground/5 flex items-center gap-1 text-[9px] font-medium tracking-wide text-foreground/40">
              <Info className="h-3.5 w-3.5 text-gold-accent" /> Calculated using {loanTerm} years fixed rate.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
