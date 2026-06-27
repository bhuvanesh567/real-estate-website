'use client';

import React from 'react';
import Image from 'next/image';
import { X, Check, Eye, Trash2, ArrowRight } from 'lucide-react';
import { Property } from '@/data/mockData';

interface CompareDashboardProps {
  compareList: Property[];
  onClose: () => void;
  onRemove: (prop: Property) => void;
  onSelect: (prop: Property) => void;
}

export default function CompareDashboard({
  compareList,
  onClose,
  onRemove,
  onSelect,
}: CompareDashboardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getBestValue = () => {
    if (compareList.length <= 1) return null;
    // Simple valuation formula: lowest price per sqft
    let best: Property = compareList[0];
    let bestVal = compareList[0].price / compareList[0].area;
    
    for (let i = 1; i < compareList.length; i++) {
      const val = compareList[i].price / compareList[i].area;
      if (val < bestVal) {
        bestVal = val;
        best = compareList[i];
      }
    }
    return best.id;
  };

  const bestValId = getBestValue();

  // Unified list of all unique amenities across compared listings
  const allAmenities = Array.from(
    new Set(compareList.flatMap((p) => p.amenities))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Background click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative w-full max-w-6xl glass rounded-t-[2.5rem] p-6 sm:p-8 shadow-2xl border-t border-foreground/10 bg-background max-h-[85vh] overflow-y-auto z-10 animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-foreground/5 mb-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Compare Properties
            </h3>
            <p className="text-xs font-light text-foreground/50">
              Side-by-side evaluation of your luxury options. {compareList.length}/3 selected.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-foreground/5 border border-foreground/10 text-foreground transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-4 rounded-full bg-gold-accent/10 text-gold-accent">
              <Check className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-foreground">No Properties Selected</h4>
              <p className="text-xs font-light text-foreground/50 max-w-xs leading-relaxed">
                Browse our collection and click the plus (+) button on listing cards to add them to your comparison dashboard.
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-10 px-6 rounded-full bg-foreground text-background text-xs font-semibold tracking-widest hover:bg-gold-accent hover:text-white transition-colors"
            >
              BROWSE PROPERTIES
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-foreground/5">
                  <th className="py-4 text-xs font-bold tracking-widest text-foreground/40 uppercase w-1/4">Specs</th>
                  {compareList.map((property) => (
                    <th key={property.id} className="py-4 px-4 w-1/4 relative align-top">
                      {/* Top Remove Badge */}
                      <button
                        onClick={() => onRemove(property)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/10 hover:bg-red-500 hover:text-white text-foreground/60 transition-all border border-foreground/5"
                        title="Remove listing"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      {/* Photo & Identity details */}
                      <div className="space-y-3">
                        <div className="relative h-28 rounded-xl overflow-hidden bg-zinc-950">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            sizes="200px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif font-bold text-foreground line-clamp-1">{property.title}</h4>
                          <span className="text-[10px] text-foreground/50 font-light block">{property.location}</span>
                          
                          {bestValId === property.id && (
                            <span className="inline-block mt-1 bg-gold-accent/15 text-gold-accent border border-gold-accent/20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                              Best Value (Price/Sqft)
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty spaces up to 3 */}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                    <th key={`empty-${idx}`} className="py-4 px-4 w-1/4 align-middle text-center text-xs font-light text-foreground/30 border border-dashed border-foreground/5 rounded-xl">
                      Select another property
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5 text-xs">
                {/* Price Row */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Price</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-bold text-gold-accent text-sm">
                      {formatPrice(p.price)}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Price per Sqft */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Price / sqft</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light text-foreground/80">
                      {formatPrice(Math.round(p.price / p.area))} / sqft
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Bedrooms & Baths */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Bedrooms & Baths</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light text-foreground/80">
                      {p.beds} Beds / {p.baths} Baths
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Dimensions */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Living Area</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light text-foreground/80 font-mono">
                      {p.area.toLocaleString()} sqft
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Design Style */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Design Style</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light text-foreground/80">
                      {p.style}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Year Built */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Year Built</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light text-foreground/80">
                      {p.yearBuilt}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Energy Rating */}
                <tr>
                  <td className="py-4 font-semibold text-foreground/50">Energy Rating</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="py-4 px-4 font-light">
                      <span className="bg-green-500/10 border border-green-500/20 text-green-500 px-2 py-0.5 rounded font-bold">
                        {p.energyClass}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>

                {/* Unique Amenities comparison */}
                {allAmenities.map((amenity) => (
                  <tr key={amenity}>
                    <td className="py-3 font-light text-foreground/40">{amenity}</td>
                    {compareList.map((p) => {
                      const hasAmenity = p.amenities.includes(amenity);
                      return (
                        <td key={p.id} className="py-3 px-4">
                          {hasAmenity ? (
                            <Check className="h-4.5 w-4.5 text-gold-accent" />
                          ) : (
                            <span className="text-foreground/20">—</span>
                          )}
                        </td>
                      );
                    })}
                    {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                  </tr>
                ))}

                {/* Actions row */}
                <tr>
                  <td className="py-6" />
                  {compareList.map((p) => (
                    <td key={p.id} className="py-6 px-4">
                      <button
                        onClick={() => {
                          onClose();
                          onSelect(p);
                        }}
                        className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-gold-accent hover:text-gold-hover uppercase"
                      >
                        Launch Tour <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
