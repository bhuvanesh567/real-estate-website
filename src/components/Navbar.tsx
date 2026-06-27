'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, GitCompare, Compass, Landmark, Users, Award, BookOpen, MessageSquare } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalContext';

export default function Navbar() {
  const {
    darkMode,
    setDarkMode,
    compareList,
    setIsCompareOpen,
  } = useGlobalState();
  const pathname = usePathname();

  const navLinks = [
    { name: 'PORTFOLIO', href: '/properties', icon: Compass },
    { name: 'AGENTS', href: '/agents', icon: Users },
    { name: 'SERVICES', href: '/services', icon: Award },
    { name: 'ABOUT', href: '/about', icon: Landmark },
    { name: 'BLOG', href: '/blog', icon: BookOpen },
    { name: 'CONTACT', href: '/contact', icon: MessageSquare },
  ];

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-gold-accent hover:text-gold-hover transition-colors">
              ELITE ESTATES
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-[11px] font-bold tracking-widest text-foreground/80">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 transition-colors py-2 border-b-2 ${
                    isActive
                      ? 'border-gold-accent text-gold-accent'
                      : 'border-transparent hover:text-gold-accent hover:border-gold-accent/40'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="relative p-2.5 rounded-full border border-foreground/10 hover:border-gold-accent hover:bg-gold-accent/10 text-foreground transition-all duration-300"
              title="Compare Properties"
            >
              <GitCompare className="h-5 w-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-accent text-[10px] font-bold text-white animate-pulse">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full border border-foreground/10 hover:border-gold-accent hover:bg-gold-accent/10 text-foreground transition-all duration-300"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Premium CTA */}
            <Link
              href="/properties"
              className="hidden sm:inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-xs font-semibold tracking-widest text-background transition-all duration-300 hover:bg-gold-accent hover:text-white border border-transparent hover:border-gold-accent"
            >
              EXPLORE HOMES
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
