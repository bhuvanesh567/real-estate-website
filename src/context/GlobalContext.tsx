'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/data/mockData';

interface GlobalContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  compareList: Property[];
  addToCompare: (property: Property) => boolean; // returns true if added, false if maxed
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true); // Premium dark mode by default
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Sync dark mode class with HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const addToCompare = (property: Property): boolean => {
    if (compareList.some((p) => p.id === property.id)) {
      return true; // Already added
    }
    if (compareList.length >= 3) {
      return false; // Limit reached
    }
    setCompareList((prev) => [...prev, property]);
    setIsCompareOpen(true); // Auto-open comparison drawer when a new listing is added
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
}
