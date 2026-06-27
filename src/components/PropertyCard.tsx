'use client';

import React from 'react';
import Image from 'next/image';
import { BedDouble, Bath, Maximize, Plus, Check } from 'lucide-react';
import { Property } from '@/data/mockData';

interface PropertyCardProps {
  property: Property;
  onSelect: (prop: Property) => void;
  onCompareToggle: (prop: Property, e: React.MouseEvent) => void;
  isCompared: boolean;
}

export default function PropertyCard({
  property,
  onSelect,
  onCompareToggle,
  isCompared,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="glass-card group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Property Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-w-7xl) 33vw, 100vw"
          priority={property.featured}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white">
            {property.type}
          </span>
          {property.featured && (
            <span className="bg-gold-accent px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
        </div>

        {/* Compare Trigger button */}
        <button
          onClick={(e) => onCompareToggle(property, e)}
          className={`absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            isCompared
              ? 'bg-gold-accent border-gold-accent text-white'
              : 'bg-black/30 border-white/20 text-white hover:bg-black/60'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isCompared ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-gold-accent transition-colors">
            {property.title}
          </h3>
          <p className="text-xs text-zinc-300 font-light mt-0.5">
            {property.location}
          </p>
        </div>
      </div>

      {/* Details Box */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-serif font-semibold text-gold-accent">
            {formatPrice(property.price)}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
            ENERGY CLASS {property.energyClass}
          </span>
        </div>

        <p className="text-xs font-light text-foreground/60 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        {/* Specifications row */}
        <div className="flex items-center justify-between pt-4 border-t border-foreground/5 text-xs text-foreground/60 font-light mt-auto">
          <div className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-gold-accent/75" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gold-accent/75" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-gold-accent/75" />
            <span>{property.area.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
