'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Award, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-obsidian-950 text-obsidian-100 border-t border-white/5 py-16 px-6 sm:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
          {/* Brand Pillar */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-gold-accent">
              ELITE ESTATES
            </span>
            <p className="text-sm text-obsidian-400 leading-relaxed font-light">
              Experience real estate reimagined for the discerning buyer. Curated luxury properties, immersive virtual tours, and white-glove concierge connectivity.
            </p>
            <div className="flex items-center gap-4 pt-4 text-xs text-obsidian-400">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-gold-accent" /> Secured</span>
              <span className="flex items-center gap-1"><Award className="h-4 w-4 text-gold-accent" /> Premium</span>
              <span className="flex items-center gap-1"><Globe className="h-4 w-4 text-gold-accent" /> Global</span>
            </div>
          </div>

          {/* Site Directory */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gold-accent mb-6">PORTFOLIO</h4>
            <ul className="space-y-3 text-sm font-light text-obsidian-400">
              <li><Link href="/properties" className="hover:text-gold-accent transition-colors">All Properties</Link></li>
              <li><Link href="/services" className="hover:text-gold-accent transition-colors">Bespoke Services</Link></li>
              <li><Link href="/agents" className="hover:text-gold-accent transition-colors">Concierge Brokers</Link></li>
              <li><Link href="/about" className="hover:text-gold-accent transition-colors">Corporate Story</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gold-accent mb-6">CONTACT CONCIERGE</h4>
            <ul className="space-y-3 text-sm font-light text-obsidian-400">
              <li>Headquarters: Geneva & Beverly Hills</li>
              <li>Phone: +1 (800) 555-ELITE</li>
              <li>Email: concierge@eliteestates.com</li>
              <li><Link href="/contact" className="hover:text-gold-accent transition-colors underline underline-offset-4">Schedule Salon Appointment</Link></li>
            </ul>
          </div>

          {/* Newsletter / Club */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gold-accent mb-6">THE ELITE CLUB</h4>
            <p className="text-xs text-obsidian-400 mb-4 leading-relaxed font-light">
              Receive off-market opportunities, architectural insights, and luxury real estate reports quarterly.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder={subscribed ? "Thank you for joining" : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 text-sm font-light focus:outline-none focus:border-gold-accent transition-colors text-white placeholder-obsidian-500 pr-12 disabled:bg-gold-accent/15 disabled:text-gold-accent disabled:border-gold-accent/20"
                required
              />
              {!subscribed && (
                <button
                  type="submit"
                  className="absolute right-1 p-2 rounded-full bg-gold-accent hover:bg-gold-hover text-white transition-all duration-300"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-obsidian-500 font-light">
          <p>© {new Date().getFullYear()} Elite Estates. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/about" className="hover:text-gold-accent transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gold-accent transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gold-accent transition-colors">Global Offices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
