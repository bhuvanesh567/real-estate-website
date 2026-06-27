'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, BedDouble, Bath, Maximize, Landmark, Sparkles, MessageCircle, Phone, Mail, Award, Check } from 'lucide-react';
import { Property, mockAgents } from '@/data/mockData';
import { ThreeDViewer } from './ThreeDViewer';
import MortgageCalculator from './MortgageCalculator';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyDetailsModal({
  property,
  onClose,
}: PropertyDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | '3dtour' | 'mortgage'>('details');

  if (!property) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md overflow-y-auto p-4 sm:p-6 animate-fade-in">
      {/* Background close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl glass rounded-[2.5rem] overflow-hidden shadow-2xl border border-foreground/10 bg-background max-h-[90vh] overflow-y-auto z-10 flex flex-col animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors border border-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Photo Banner */}
        <div className="relative h-[250px] sm:h-[350px] w-full overflow-hidden bg-zinc-950 flex-shrink-0">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="1000px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 sm:left-10 text-white space-y-2">
            <div className="flex gap-2">
              <span className="glass px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
                {property.type}
              </span>
              <span className="bg-gold-accent px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
                Premium Collection
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">{property.title}</h2>
            <p className="text-xs sm:text-sm font-light text-zinc-300">{property.location}</p>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="border-b border-foreground/5 bg-foreground/[0.01] sticky top-0 z-10 backdrop-blur-md">
          <div className="flex px-6 sm:px-10 gap-8">
            {[
              { id: 'details', label: 'DETAILS & AMENITIES' },
              { id: '3dtour', label: '3D VIRTUAL TOUR', icon: Sparkles },
              { id: 'mortgage', label: 'MORTGAGE ESTIMATES', icon: Landmark }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-5 text-[10px] font-bold tracking-widest border-b-2 transition-colors flex items-center gap-1.5 ${
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

        {/* Content Pane */}
        <div className="p-6 sm:p-10 flex-1">
          {/* Tab 1: Details & Amenities */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Description & Specs */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-foreground/5">
                  <span className="text-2xl font-serif font-semibold text-gold-accent">
                    {formatPrice(property.price)}
                  </span>
                  <span className="text-xs font-light text-foreground/50">
                    Est. Payment: {formatPrice(Math.round(property.price * 0.0055))} / mo
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Architectural Note</h3>
                  <p className="text-sm font-light text-foreground/80 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-4 py-4 px-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 text-center">
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
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Property Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80 font-light">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2.5">
                        <div className="p-1 rounded-full bg-gold-accent/10 text-gold-accent">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Agent concierge connection */}
              <div className="glass rounded-3xl p-6 border border-foreground/5 space-y-6 bg-foreground/[0.01]">
                <div className="text-center pb-4 border-b border-foreground/5 space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gold-accent flex items-center justify-center gap-1">
                    <Award className="h-3.5 w-3.5" /> Assigned Partner
                  </span>
                  <div className="relative h-20 w-20 rounded-full overflow-hidden bg-zinc-900 mx-auto border-2 border-gold-accent">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-foreground">{agent.name}</h4>
                    <p className="text-[9px] text-foreground/40 font-semibold tracking-wider uppercase">{agent.role}</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-foreground/80 font-light">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 hover:text-gold-accent transition-colors">
                    <Phone className="h-4 w-4 text-gold-accent" /> {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 hover:text-gold-accent transition-colors">
                    <Mail className="h-4 w-4 text-gold-accent" /> {agent.email}
                  </a>
                  <p className="text-[10px] text-foreground/50 leading-relaxed font-light text-center pt-2">
                    "Available for private virtual viewings or on-site inspections by appointment."
                  </p>
                </div>

                <a
                  href={agent.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider transition-colors shadow-md shadow-[#25d366]/10"
                >
                  <MessageCircle className="h-4.5 w-4.5" /> WHATSAPP CONNECT
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: 3D Virtual Tour */}
          {activeTab === '3dtour' && (
            <div className="space-y-6">
              <ThreeDViewer property={property} />
            </div>
          )}

          {/* Tab 3: Mortgage Estimates */}
          {activeTab === 'mortgage' && (
            <div className="space-y-6">
              <MortgageCalculator propertyPrice={property.price} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
