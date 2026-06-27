'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import AgentSection from '@/components/AgentSection';
import MortgageCalculator from '@/components/MortgageCalculator';
import { mockProperties } from '@/data/mockData';
import { useGlobalState } from '@/context/GlobalContext';
import { ShieldCheck, Award, Globe, ArrowRight, Star, Quote, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { compareList, addToCompare, removeFromCompare } = useGlobalState();

  // Get featured listings
  const featuredProperties = mockProperties.filter((p) => p.featured);

  const handlePropertySelect = (property: any) => {
    router.push(`/properties/${property.id}`);
  };

  const handleCompareToggle = (property: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const exists = compareList.some((p) => p.id === property.id);
    if (exists) {
      removeFromCompare(property.id);
    } else {
      const added = addToCompare(property);
      if (!added) {
        alert('You can compare a maximum of 3 properties side-by-side.');
      }
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 transition-colors duration-300">
      {/* Hero Block */}
      <Hero onExploreClick={() => router.push('/properties')} />

      {/* Brand Philosophy / Core Values */}
      <section className="py-24 px-6 sm:px-8 border-b border-foreground/5 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
            The Elite Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Bespoke Real Estate. Unrivaled Discretion.
          </h2>
          <p className="text-sm font-light text-foreground/60 leading-relaxed">
            Elite Estates bridges the gap between digital innovation and legacy brokerage, serving high-net-worth families, sovereign wealth funds, and real estate professionals globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass p-8 rounded-3xl border border-foreground/5 space-y-6 hover:border-gold-accent/40 transition-colors duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gold-accent/10 text-gold-accent flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Absolute Discretion</h3>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              We specialize in off-market transactions. Our private network ensures your real estate transactions remain entirely private and secure.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass p-8 rounded-3xl border border-foreground/5 space-y-6 hover:border-gold-accent/40 transition-colors duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gold-accent/10 text-gold-accent flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Immersive 3D Tours</h3>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              Every curated listing features state-of-the-art WebGL room customizers, allowing you to stage walls and floors in real time from Geneva or Tokyo.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass p-8 rounded-3xl border border-foreground/5 space-y-6 hover:border-gold-accent/40 transition-colors duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gold-accent/10 text-gold-accent flex items-center justify-center">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground">Global Portfolios</h3>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              From beachfront Malibu estates and Central Park sky penthouses to alpine Aspen chalets, we represent the absolute pinnacle of architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="py-24 px-6 sm:px-8 bg-foreground/[0.01] border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
                The Curated Edit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Featured Masterpieces
              </h2>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-gold-accent hover:text-gold-hover uppercase group transition-colors"
            >
              Browse Full Collection <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="animate-fade-in-up">
                <PropertyCard
                  property={property}
                  onSelect={handlePropertySelect}
                  onCompareToggle={handleCompareToggle}
                  isCompared={compareList.some((p) => p.id === property.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat Bar banner */}
      <section className="py-16 px-6 sm:px-8 border-b border-foreground/5 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gold-accent font-serif">$15B+</div>
            <div className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase">Transaction Volume</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gold-accent font-serif">12+</div>
            <div className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase">Global Offices</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gold-accent font-serif">98%</div>
            <div className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase">Client Retention</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gold-accent font-serif">150+</div>
            <div className="text-[10px] font-bold tracking-widest text-foreground/45 uppercase">Private Listings</div>
          </div>
        </div>
      </section>

      {/* Mortgage Assessment Section */}
      <section className="py-24 px-6 sm:px-8 bg-foreground/[0.01] border-b border-foreground/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
              Bespoke Financing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground animate-fade-in">
              Assessment & Calculation
            </h2>
            <p className="text-xs font-light text-foreground/50 max-w-md mx-auto leading-relaxed">
              Estimate global interest and monthly premium payments instantly for any mock portfolio value.
            </p>
          </div>
          {/* Defaulting to prop-1 (Malibu Mansion $18,500,000) */}
          <MortgageCalculator propertyPrice={18500000} />
        </div>
      </section>

      {/* Bespoke Agent Section */}
      <section className="py-12 border-b border-foreground/5">
        <AgentSection />
      </section>

      {/* HNWIs Testimonials Quote Grid */}
      <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
            Accolades
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            What Our Partners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quote 1 */}
          <div className="glass p-8 rounded-3xl border border-foreground/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-8 text-gold-accent/10">
              <Quote className="h-20 w-20 stroke-[1]" />
            </div>
            <div className="flex items-center gap-1 text-gold-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm font-light text-foreground/80 italic leading-relaxed z-10 relative">
              "Elite Estates restructured how we manage our global portfolio. The interactive 3D tour saved our team multiple flights across continents, and the transaction was finalized with total discretion."
            </p>
            <div className="border-t border-foreground/5 pt-4 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Marcus Sterling</h4>
                <p className="text-[10px] text-foreground/40 font-light">Founder, Sterling Investment Group</p>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="glass p-8 rounded-3xl border border-foreground/5 space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-8 text-gold-accent/10">
              <Quote className="h-20 w-20 stroke-[1]" />
            </div>
            <div className="flex items-center gap-1 text-gold-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm font-light text-foreground/80 italic leading-relaxed z-10 relative">
              "Working with Sarah Sterling was a masterclass in concierge service. She understood our architectural taste and introduced off-market chalets that perfectly reflected our investment requirements."
            </p>
            <div className="border-t border-foreground/5 pt-4 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Dr. Helen Chen</h4>
                <p className="text-[10px] text-foreground/40 font-light">Global Philanthropist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
