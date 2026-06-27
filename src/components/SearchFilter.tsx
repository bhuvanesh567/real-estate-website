'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, SlidersHorizontal, RefreshCw, CheckCircle2 } from 'lucide-react';

interface FilterState {
  location: string;
  type: string;
  maxPrice: number;
  beds: number;
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterState, aiText: string) => void;
  minPriceLimit: number;
  maxPriceLimit: number;
}

export default function SearchFilter({
  onFilterChange,
  minPriceLimit,
  maxPriceLimit,
}: SearchFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [nlpText, setNlpText] = useState('');
  
  // Local filter states
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);
  const [beds, setBeds] = useState(0);

  // Client-side AI parser feedback
  const [parsedTokens, setParsedTokens] = useState<{
    location?: string;
    type?: string;
    maxPrice?: number;
    amenity?: string;
  } | null>(null);

  // Run NLP parser whenever nlpText changes
  useEffect(() => {
    if (!nlpText.trim()) {
      setParsedTokens(null);
      triggerFilterUpdate(location, type, maxPrice, beds, '');
      return;
    }

    const text = nlpText.toLowerCase();
    const tokens: typeof parsedTokens = {};
    
    // Parse location
    if (text.includes('malibu') || text.includes('california')) {
      tokens.location = 'Malibu';
    } else if (text.includes('manhattan') || text.includes('new york') || text.includes('nyc')) {
      tokens.location = 'Manhattan';
    } else if (text.includes('aspen') || text.includes('colorado')) {
      tokens.location = 'Aspen';
    } else if (text.includes('tuscany') || text.includes('italy')) {
      tokens.location = 'Tuscany';
    } else if (text.includes('tokyo') || text.includes('japan') || text.includes('kyoto')) {
      tokens.location = 'Japan'; // Matches Kyoto/Tokyo
    }

    // Parse property type
    if (text.includes('mansion') || text.includes('house') || text.includes('estate')) {
      tokens.type = 'mansion';
    } else if (text.includes('penthouse') || text.includes('duplex')) {
      tokens.type = 'penthouse';
    } else if (text.includes('chalet') || text.includes('alpine') || text.includes('ski')) {
      tokens.type = 'chalet';
    } else if (text.includes('villa') || text.includes('estate')) {
      tokens.type = 'villa';
    } else if (text.includes('loft') || text.includes('apartment') || text.includes('skyloft')) {
      tokens.type = 'loft';
    }

    // Parse price
    // e.g. "under 15 million", "under 15M", "below 8 million", "under 10m", "under $10,000,000"
    const millionMatch = text.match(/(?:under|below|max|maximum|less than)\s*([0-9.]+)\s*(?:million|m)/i);
    const rawNumberMatch = text.match(/(?:under|below|max|maximum|less than)\s*\$?([0-9,]{5,10})/i);
    
    if (millionMatch) {
      const value = parseFloat(millionMatch[1]);
      if (!isNaN(value)) {
        tokens.maxPrice = value * 1000000;
      }
    } else if (rawNumberMatch) {
      const value = parseInt(rawNumberMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(value)) {
        tokens.maxPrice = value;
      }
    }

    // Parse common amenities
    if (text.includes('pool') || text.includes('infinity')) {
      tokens.amenity = 'Pool';
    } else if (text.includes('onsen') || text.includes('bath') || text.includes('thermal')) {
      tokens.amenity = 'Onsen/Thermal';
    } else if (text.includes('vineyard') || text.includes('wine')) {
      tokens.amenity = 'Vineyard/Cellar';
    } else if (text.includes('beach') || text.includes('ocean')) {
      tokens.amenity = 'Beachfront';
    }

    setParsedTokens(Object.keys(tokens).length > 0 ? tokens : null);

    // Apply parsed states to UI elements to keep synchronized
    const finalLoc = tokens.location || 'All';
    const finalType = tokens.type || 'All';
    const finalMaxPrice = tokens.maxPrice || maxPriceLimit;
    
    triggerFilterUpdate(finalLoc, finalType, finalMaxPrice, beds, nlpText);
  }, [nlpText]);

  const triggerFilterUpdate = (
    loc: string,
    tp: string,
    pr: number,
    bd: number,
    aiInput: string
  ) => {
    onFilterChange({
      location: loc,
      type: tp,
      maxPrice: pr,
      beds: bd,
    }, aiInput);
  };

  const handleNlpSuggestion = (suggestion: string) => {
    setNlpText(suggestion);
  };

  const handleReset = () => {
    setLocation('All');
    setType('All');
    setMaxPrice(maxPriceLimit);
    setBeds(0);
    setNlpText('');
    setParsedTokens(null);
    onFilterChange({
      location: 'All',
      type: 'All',
      maxPrice: maxPriceLimit,
      beds: 0
    }, '');
  };

  // Sync manual UI changes with filter updates
  const handleManualChange = (field: keyof FilterState, value: any) => {
    let finalLoc = location;
    let finalType = type;
    let finalMaxPrice = maxPrice;
    let finalBeds = beds;

    if (field === 'location') {
      setLocation(value);
      finalLoc = value;
    } else if (field === 'type') {
      setType(value);
      finalType = value;
    } else if (field === 'maxPrice') {
      setMaxPrice(value);
      finalMaxPrice = value;
    } else if (field === 'beds') {
      setBeds(value);
      finalBeds = value;
    }

    // Manual changes override active AI texts
    setNlpText('');
    setParsedTokens(null);
    triggerFilterUpdate(finalLoc, finalType, finalMaxPrice, finalBeds, '');
  };

  return (
    <div id="portfolio" className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-8 space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Curated Residences
        </h2>
        <p className="text-sm font-light text-foreground/60 max-w-xl mx-auto">
          Use our AI Search bar to filter by natural language or toggle precision controls.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        {/* Row 1: Search Inputs */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* AI Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gold-accent">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <input
              type="text"
              placeholder="AI Search: 'a beach villa in Malibu' or 'penthouse under 15 million'..."
              value={nlpText}
              onChange={(e) => setNlpText(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-background border border-foreground/10 rounded-2xl text-sm font-light focus:outline-none focus:border-gold-accent transition-colors text-foreground"
            />
            {nlpText && (
              <button
                onClick={() => setNlpText('')}
                className="absolute inset-y-0 right-4 flex items-center text-xs text-foreground/40 hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-6 h-14 rounded-2xl text-xs font-semibold tracking-widest border transition-all duration-300 ${
                showAdvanced 
                  ? 'bg-gold-accent text-white border-gold-accent' 
                  : 'bg-background hover:bg-foreground/5 border-foreground/10 text-foreground'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showAdvanced ? 'HIDE FILTERS' : 'ADVANCED'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center p-4 h-14 w-14 rounded-2xl bg-background hover:bg-foreground/5 border border-foreground/10 text-foreground/60 hover:text-foreground transition-all duration-300"
              title="Reset Search"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* AI Parse Feedback Badge */}
        {parsedTokens && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-gold-accent/10 rounded-xl text-xs text-gold-500 font-medium animate-fade-in-up border border-gold-accent/20">
            <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] text-gold-600 mr-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-gold-accent" /> AI Filter Activated
            </span>
            {parsedTokens.location && (
              <span className="bg-background px-2.5 py-1 rounded-full border border-gold-accent/20">
                Location: <strong>{parsedTokens.location}</strong>
              </span>
            )}
            {parsedTokens.type && (
              <span className="bg-background px-2.5 py-1 rounded-full border border-gold-accent/20">
                Type: <strong>{parsedTokens.type}</strong>
              </span>
            )}
            {parsedTokens.maxPrice && (
              <span className="bg-background px-2.5 py-1 rounded-full border border-gold-accent/20">
                Price Range: <strong>&lt; ${(parsedTokens.maxPrice / 1000000).toFixed(1)}M</strong>
              </span>
            )}
            {parsedTokens.amenity && (
              <span className="bg-background px-2.5 py-1 rounded-full border border-gold-accent/20">
                Feature: <strong>{parsedTokens.amenity}</strong>
              </span>
            )}
          </div>
        )}

        {/* NLP Search Suggestions */}
        {!nlpText && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-foreground/40 font-light mr-1">Suggestions:</span>
            {[
              'Malibu mansion with private beach',
              'Manhattan penthouse under 15 million',
              'Aspen ski chalet with hot tub',
              'Villa in Tuscany with pool',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleNlpSuggestion(suggestion)}
                className="px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-gold-accent/10 hover:text-gold-accent text-foreground/70 transition-all font-light"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        )}

        {/* Advanced Filters Drawer */}
        <div className={`grid grid-cols-1 sm:grid-cols-4 gap-6 pt-4 border-t border-foreground/5 transition-all duration-500 overflow-hidden ${
          showAdvanced ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none border-none py-0'
        }`}>
          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase">LOCATION</label>
            <select
              value={location}
              onChange={(e) => handleManualChange('location', e.target.value)}
              className="w-full h-11 px-3 bg-background border border-foreground/10 rounded-xl text-xs font-light text-foreground focus:outline-none focus:border-gold-accent"
            >
              <option value="All">All Locations</option>
              <option value="Malibu">Malibu, CA</option>
              <option value="Manhattan">Manhattan, NY</option>
              <option value="Aspen">Aspen, CO</option>
              <option value="Tuscany">Tuscany, Italy</option>
              <option value="Japan">Japan (Kyoto & Tokyo)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase">PROPERTY TYPE</label>
            <select
              value={type}
              onChange={(e) => handleManualChange('type', e.target.value)}
              className="w-full h-11 px-3 bg-background border border-foreground/10 rounded-xl text-xs font-light text-foreground focus:outline-none focus:border-gold-accent"
            >
              <option value="All">All Types</option>
              <option value="mansion">Mansion</option>
              <option value="penthouse">Penthouse</option>
              <option value="chalet">Chalet</option>
              <option value="villa">Villa</option>
              <option value="loft">Loft</option>
            </select>
          </div>

          {/* Beds Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-foreground/50 uppercase">BEDROOMS (MIN)</label>
            <select
              value={beds}
              onChange={(e) => handleManualChange('beds', parseInt(e.target.value, 10))}
              className="w-full h-11 px-3 bg-background border border-foreground/10 rounded-xl text-xs font-light text-foreground focus:outline-none focus:border-gold-accent"
            >
              <option value="0">Any Bedrooms</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
              <option value="6">6+ Beds</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-foreground/50 uppercase">
              <span>MAX PRICE</span>
              <span className="text-gold-accent font-semibold">${(maxPrice / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center h-11 px-2">
              <input
                type="range"
                min={minPriceLimit}
                max={maxPriceLimit}
                step={500000}
                value={maxPrice}
                onChange={(e) => handleManualChange('maxPrice', parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
