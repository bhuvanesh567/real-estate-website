'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Maximize, Landmark, Sparkles, MessageCircle, Phone, Mail, Award, Check, ChevronLeft, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Property, mockAgents } from '@/data/mockData';
import { ThreeDViewer } from '@/components/ThreeDViewer';
import MortgageCalculator from '@/components/MortgageCalculator';

interface PropertyDetailsClientProps {
  property: Property;
}

export default function PropertyDetailsClient({ property }: PropertyDetailsClientProps) {
  const [activeTab, setActiveTab] = useState<'details' | '3dtour' | 'mortgage'>('details');
  const router = useRouter();

  // Find agent managing this property
  const agent = mockAgents.find((a) => a.id === property.agentId) || mockAgents[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 min-h-screen pb-20 transition-colors duration-300">
      {/* Standalone Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-foreground/60 hover:text-gold-accent transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
          ID: {property.id}
        </span>
      </div>

      {/* Hero Cover Banner */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-zinc-950 flex-shrink-0 border-b border-foreground/5">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        
        <div className="absolute bottom-10 left-6 sm:left-12 max-w-4xl text-white space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="glass px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
              {property.type}
            </span>
            <span className="bg-gold-accent px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
              {property.style}
            </span>
            <span className="glass px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-zinc-300">
              Built {property.yearBuilt}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            {property.title}
          </h1>
          <p className="text-sm font-light text-zinc-300">{property.location}</p>
        </div>
      </div>

      {/* Main details body */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left columns: specifications & tabs */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Top specifications highlights */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-foreground/5">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">
                PURCHASE PRICE
              </span>
              <span className="text-3xl font-serif font-bold text-gold-accent">
                {formatPrice(property.price)}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">
                ESTIMATED MONTHLY
              </span>
              <span className="text-xl font-serif font-medium text-foreground/80">
                {formatPrice(Math.round(property.price * 0.0055))} / mo
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">
                ENERGY CLASS
              </span>
              <span className="inline-block bg-green-500/10 border border-green-500/20 text-green-500 px-3 py-1 rounded-lg text-xs font-bold">
                {property.energyClass}
              </span>
            </div>
          </div>

          {/* Luxury Tab Navigation */}
          <div className="border-b border-foreground/5">
            <div className="flex gap-8 overflow-x-auto">
              {[
                { id: 'details', label: 'DETAILS & AMENITIES' },
                { id: '3dtour', label: '3D VIRTUAL TOUR', icon: Sparkles },
                { id: 'mortgage', label: 'MORTGAGE CALCULATOR', icon: Landmark }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 text-[10px] font-bold tracking-widest border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-gold-accent text-gold-accent'
                      : 'border-transparent text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Panes */}
          <div className="pt-4">
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Architectural Note</h3>
                  <p className="text-sm font-light text-foreground/80 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-4 py-6 px-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 text-center">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">BEDROOMS</span>
                    <span className="text-base font-medium text-foreground flex items-center justify-center gap-1">
                      <BedDouble className="h-4.5 w-4.5 text-gold-accent" /> {property.beds}
                    </span>
                  </div>
                  <div className="border-x border-foreground/5">
                    <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">BATHROOMS</span>
                    <span className="text-base font-medium text-foreground flex items-center justify-center gap-1">
                      <Bath className="h-4.5 w-4.5 text-gold-accent" /> {property.baths}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase block mb-1">LIVING AREA</span>
                    <span className="text-base font-medium text-foreground font-mono">
                      {property.area.toLocaleString()} sqft
                    </span>
                  </div>
                </div>

                {/* Amenities grid */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Premium Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-foreground/80 font-light">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 py-1">
                        <div className="p-1 rounded-full bg-gold-accent/15 text-gold-accent">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === '3dtour' && (
              <div className="space-y-6">
                <div className="space-y-2 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">3D Interactive Staging</h3>
                  <p className="text-xs font-light text-foreground/60 leading-relaxed">
                    Left-click and drag on the interactive scene below to rotate the room. Toggle the controls to stage paint colors and floor types dynamically.
                  </p>
                </div>
                <ThreeDViewer property={property} />
              </div>
            )}

            {activeTab === 'mortgage' && (
              <div className="space-y-6">
                <div className="space-y-2 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Bespoke Financing Assessment</h3>
                  <p className="text-xs font-light text-foreground/60 leading-relaxed">
                    Customize down payment, interest rates, and loan terms to evaluate transaction math instantly.
                  </p>
                </div>
                <MortgageCalculator propertyPrice={property.price} />
              </div>
            )}
          </div>
        </div>

        {/* Right column: Broker contact card & inquiry */}
        <div className="space-y-8">
          {/* Concierge Agent Card */}
          <div className="glass rounded-3xl p-6 border border-foreground/5 space-y-6 bg-foreground/[0.01]">
            <div className="text-center pb-4 border-b border-foreground/5 space-y-3">
              <span className="text-[9px] uppercase tracking-widest font-bold text-gold-accent flex items-center justify-center gap-1">
                <Award className="h-3.5 w-3.5 animate-spin-slow" /> Concierge Partner
              </span>
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-zinc-900 mx-auto border-2 border-gold-accent shadow-lg">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-foreground">{agent.name}</h4>
                <p className="text-[9px] text-foreground/40 font-semibold tracking-widest uppercase">{agent.role}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-foreground/80 font-light">
              <p className="text-[11px] text-foreground/60 leading-relaxed font-light text-center px-2">
                "{agent.bio}"
              </p>
              <div className="border-t border-foreground/5 pt-4 space-y-3">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-3 hover:text-gold-accent transition-colors font-medium">
                  <Phone className="h-4 w-4 text-gold-accent" /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-3 hover:text-gold-accent transition-colors font-medium">
                  <Mail className="h-4 w-4 text-gold-accent" /> {agent.email}
                </a>
              </div>
            </div>

            <a
              href={agent.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider transition-colors shadow-md shadow-[#25d366]/10"
            >
              <MessageCircle className="h-4.5 w-4.5" /> WHATSAPP CONCIERGE
            </a>
          </div>

          {/* Virtual Tour / Schedule Appointment booking widget card */}
          <div className="glass rounded-3xl p-6 border border-foreground/5 space-y-5 bg-foreground/[0.01]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold-accent" /> Schedule Viewings
            </h4>
            <p className="text-xs font-light text-foreground/60 leading-relaxed">
              Book a private virtual 3D walkthrough or coordinate an on-site private inspection with {agent.name}.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => router.push('/contact')}
                className="w-full h-11 rounded-xl bg-foreground hover:bg-gold-accent hover:text-white text-background text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-transparent"
              >
                REQUEST SALON BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
