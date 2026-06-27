'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import CompareDashboard from './CompareDashboard';
import { useGlobalState } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';

export default function AppContent({ children }: { children: React.ReactNode }) {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    removeFromCompare,
  } = useGlobalState();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
      <Chatbot />
      
      {isCompareOpen && (
        <CompareDashboard
          compareList={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(p) => removeFromCompare(p.id)}
          onSelect={(p) => {
            setIsCompareOpen(false);
            router.push(`/properties/${p.id}`);
          }}
        />
      )}
    </div>
  );
}
