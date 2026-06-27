'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchFilter from '@/components/SearchFilter';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties, Property } from '@/data/mockData';
import { useGlobalState } from '@/context/GlobalContext';

export default function PropertiesPage() {
  const router = useRouter();
  const { compareList, addToCompare, removeFromCompare } = useGlobalState();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);

  // Handle NLP & Manual Filter Changes
  const handleFilterChange = (
    filters: { location: string; type: string; maxPrice: number; beds: number },
    aiText: string
  ) => {
    let result = [...mockProperties];

    // 1. Manual/NLP Location match
    if (filters.location !== 'All') {
      const locQuery = filters.location.toLowerCase();
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(locQuery) ||
          p.title.toLowerCase().includes(locQuery)
      );
    }

    // 2. Manual/NLP Type match
    if (filters.type !== 'All') {
      result = result.filter((p) => p.type === filters.type);
    }

    // 3. Manual/NLP Bedrooms match
    if (filters.beds > 0) {
      result = result.filter((p) => p.beds >= filters.beds);
    }

    // 4. Manual/NLP Price match
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // 5. NLP-driven amenity tags match (e.g. searching "pool" or "view")
    if (aiText.trim()) {
      const text = aiText.toLowerCase();
      if (text.includes('pool') || text.includes('infinity')) {
        result = result.filter((p) =>
          p.amenities.some((a) => a.toLowerCase().includes('pool'))
        );
      }
      if (text.includes('onsen') || text.includes('bath') || text.includes('hot tub')) {
        result = result.filter((p) =>
          p.amenities.some(
            (a) =>
              a.toLowerCase().includes('onsen') ||
              a.toLowerCase().includes('bath') ||
              a.toLowerCase().includes('tub')
          )
        );
      }
      if (text.includes('vineyard') || text.includes('cellar') || text.includes('wine')) {
        result = result.filter((p) =>
          p.amenities.some(
            (a) =>
              a.toLowerCase().includes('vineyard') ||
              a.toLowerCase().includes('cellar') ||
              a.toLowerCase().includes('wine')
          )
        );
      }
      if (text.includes('beach') || text.includes('ocean') || text.includes('sea')) {
        result = result.filter(
          (p) =>
            p.amenities.some(
              (a) =>
                a.toLowerCase().includes('beach') ||
                a.toLowerCase().includes('ocean') ||
                a.toLowerCase().includes('vista')
            ) || p.description.toLowerCase().includes('ocean')
        );
      }
    }

    setFilteredProperties(result);
  };

  const handlePropertySelect = (property: Property) => {
    router.push(`/properties/${property.id}`);
  };

  const handleCompareToggle = (property: Property, e: React.MouseEvent) => {
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
    <div className="w-full bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 py-16 transition-colors duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-8 space-y-3">
        <span className="text-[10px] font-bold tracking-widest text-gold-accent uppercase block">
          Elite Estates Collection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          The Portfolio
        </h1>
        <p className="text-sm font-light text-foreground/60 leading-relaxed">
          Discover a curated registry of the world's most architectural and prestigious properties. Use custom options or direct queries.
        </p>
      </div>

      {/* Advanced Filter Panel */}
      <SearchFilter
        onFilterChange={handleFilterChange}
        minPriceLimit={5000000}
        maxPriceLimit={25000000}
      />

      {/* Listings Grid */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-20">
        {filteredProperties.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center space-y-4 border border-foreground/5 max-w-xl mx-auto">
            <span className="text-3xl">🛎️</span>
            <h3 className="font-serif text-lg font-bold text-foreground">No Match Found</h3>
            <p className="text-xs font-light text-foreground/50 leading-relaxed">
              We couldn't locate any listings matching your specific AI search parameters. Please try broadening your tags or resetting your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
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
        )}
      </div>
    </div>
  );
}
